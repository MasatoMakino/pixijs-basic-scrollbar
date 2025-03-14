import { Easing, Tween } from "@tweenjs/tween.js";
import { FederatedPointerEvent, Ticker, EventEmitter } from "pixi.js";
import { SliderViewUtil } from "../index.js";
import { ScrollBarView, ScrollBarViewUtil } from "./index.js";

/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export class InertialScrollManager extends EventEmitter {
  get speed(): number {
    return this._speed;
  }
  private scrollBarView: ScrollBarView;
  /**
   * scrollBarView.contents.target.interactiveChildrenの初期値を保持する。
   * ドラッグ中はfalseに設定し、ドラッグ終了時に元に戻す。
   */
  private defaultScrollTargetChildrenInteractive: boolean | undefined;

  public decelerationRate: number = 0.975;
  public overflowScrollRange: number = 180;
  private _speed: number = 0.0;
  protected isDragging: boolean = false;
  protected dragPos?: number;

  private tween?: Tween;
  private _isStart: boolean = false;

  constructor(scrollBarView: ScrollBarView) {
    super();
    this.scrollBarView = scrollBarView;
    scrollBarView.scrollBarEventEmitter.on(
      "stop_inertial_tween",
      this.stopInertial,
    );

    const target = this.scrollBarView.contents.target;
    target.eventMode = "static";
    this.defaultScrollTargetChildrenInteractive = target.interactiveChildren;

    this.start();
  }

  /**
   * 慣性スクロールのレンダリングループを開始する。
   *
   * コンストラクタ内で自動的に呼び出されるため、通常は直接呼び出す必要はありません。
   * 停止した場合に、再度呼び出すことで慣性スクロールを再開できます。
   *
   * @returns
   */
  public start(): void {
    if (this._isStart) return;
    this._isStart = true;

    const target = this.scrollBarView.contents.target;
    target.on("pointerdown", this.onMouseDown);
    Ticker.shared.add(this.onTick);
  }

  /**
   * 慣性スクロールのレンダリングループを停止する。
   * @returns
   */
  public stop(): void {
    if (!this._isStart) return;
    this._isStart = false;

    const target = this.scrollBarView.contents.target;
    target.off("pointerdown", this.onMouseDown);
    this.removeDragListener();
    this.stopInertial();
    Ticker.shared.remove(this.onTick);
  }

  private onMouseDown = (e: FederatedPointerEvent) => {
    this.updateDragPos(e);

    this.isDragging = true;
    this._speed = 0.0;
    if (this.tween) this.disposeTween();

    this.addDragListener();
  };

  private addDragListener(): void {
    this.switchDragListener(true);
  }

  private removeDragListener(): void {
    this.switchDragListener(false);
  }

  private switchDragListener(shouldAdd: boolean): void {
    const target = this.scrollBarView.contents.target;
    const dragTarget = this.scrollBarView.canvas ?? target;
    const switchListener = SliderViewUtil.toggleEventListener;
    switchListener(shouldAdd, dragTarget, "pointermove", this.onMouseMove);
    switchListener(shouldAdd, target, "pointerup", this.onMouseUp);
    switchListener(shouldAdd, target, "pointerupoutside", this.onMouseUp);
  }

  private getDragPos(e: FederatedPointerEvent | PointerEvent): number {
    return SliderViewUtil.getPointerEventPosition(
      e,
      this.scrollBarView.isHorizontal,
    );
  }

  private updateDragPos(e: FederatedPointerEvent | PointerEvent): void {
    this.dragPos = this.getDragPos(e);
  }

  private onMouseMove = (e: FederatedPointerEvent | PointerEvent) => {
    if (this.dragPos == null) return;

    this.scrollBarView.contents.target.interactiveChildren = false;
    const delta = this.getDragPos(e) - this.dragPos;

    this._speed = delta;
    this.addTargetPosition(delta * this.getOverflowDeceleration());

    this.updateDragPos(e);
  };

  private addTargetPosition(delta: number): void {
    const target = this.scrollBarView.contents.target;
    const isHorizontal = this.scrollBarView.isHorizontal;
    const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
    SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);

    this.emit("update_target_position");
  }

  private onMouseUp = () => {
    this.removeDragListener();
    this.isDragging = false;

    this.scrollBarView.contents.target.interactiveChildren =
      this.defaultScrollTargetChildrenInteractive;
    this.onTick();
  };

  private onTick = () => {
    this.tween?.update();

    if (this.isDragging) return;
    if (this._speed === 0.0 && this.getLeaveRangeFromMask() === 0.0) return;
    if (this.tween?.isPlaying()) return;

    //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
    const overflowDeceleration = this.getOverflowDeceleration();

    this._speed *= this.decelerationRate * overflowDeceleration;
    this.addTargetPosition(this._speed);

    if (Math.abs(this._speed) > 0.1) return;

    //back ease
    this._speed = 0.0;

    const toObj = {
      [this.scrollBarView.isHorizontal ? "x" : "y"]: this.getClampedPos(),
    };

    this.disposeTween();
    this.tween = new Tween(this.scrollBarView.contents.target)
      .to(toObj, 666)
      .onUpdate(() => {
        this.emit("update_target_position");
      })
      .easing(Easing.Cubic.Out)
      .start();
  };

  public stopInertial = () => {
    this._speed = 0.0;
    this.disposeTween();
  };

  private disposeTween = () => {
    if (this.tween) {
      this.tween.stop();
      this.tween = undefined;
    }
  };

  /**
   * スクロールのオーバーフロー量から、減退率を割り出す。
   * overflowScrollRange以上に離れている場合は0.0
   * スクロールエリア内にコンテンツがある場合は1.0を返す。
   */
  private getOverflowDeceleration() {
    const difPos = this.getLeaveRangeFromMask();
    let overflowDeceleration =
      (this.overflowScrollRange - difPos) / this.overflowScrollRange;
    if (overflowDeceleration < 0.0) overflowDeceleration = 0.0;

    return overflowDeceleration;
  }
  /**
   * ターゲットコンテンツがマスク領域からどれだけ離れているか。
   */
  private getLeaveRangeFromMask() {
    const target = this.scrollBarView.contents.target;
    const isHorizontal = this.scrollBarView.isHorizontal;
    const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
    const clampedPos = this.getClampedPos();

    return Math.abs(currentPos - clampedPos);
  }

  private getClampedPos() {
    const target = this.scrollBarView.contents.target;
    const isHorizontal = this.scrollBarView.isHorizontal;
    return ScrollBarViewUtil.getClampedTargetPosition(
      target,
      this.scrollBarView.contents.mask,
      isHorizontal,
    );
  }

  dispose() {
    this.stop();
    this.disposeTween();
  }
}
