import { Easing, Tween } from "@tweenjs/tween.js";
import {
  Container,
  FederatedPointerEvent,
  Ticker,
  EventEmitter,
  ContainerEvents,
} from "pixi.js";
import { SliderViewUtil } from "../index.js";
import {
  ScrollBarEventTypes,
  ScrollBarView,
  ScrollBarViewUtil,
} from "./index.js";

/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export class InertialScrollManager extends EventEmitter<ScrollBarEventTypes> {
  get speed(): number {
    return this._speed;
  }
  private scrollBarView: ScrollBarView;

  public decelerationRate: number = 0.975;
  public overflowScrollRange: number = 180;
  private _speed: number = 0.0;
  protected isDragging: boolean = false;
  protected dragPos?: number;

  private tween?: Tween<Container>;
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

    this.start();
  }

  public start(): void {
    if (this._isStart) return;
    this._isStart = true;

    const target = this.scrollBarView.contents.target;
    target.on("pointerdown", this.onMouseDown);
    Ticker.shared.add(this.onTick);
  }

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

  private switchDragListener(isOn: boolean): void {
    const target = this.scrollBarView.contents.target;
    const dragTarget = this.scrollBarView.canvas ?? target;
    const switchListener = (
      isOn: boolean,
      dragTarget: Container | HTMLCanvasElement,
      event: keyof ContainerEvents,
      listener: EventEmitter.ListenerFn,
    ) => {
      if (dragTarget instanceof HTMLCanvasElement) {
        if (isOn) {
          dragTarget.addEventListener(event as string, listener);
        } else {
          dragTarget.removeEventListener(event as string, listener);
        }
      } else {
        if (isOn) {
          dragTarget.on(event, listener);
        } else {
          dragTarget.off(event, listener);
        }
      }
    };
    switchListener(isOn, dragTarget, "pointermove", this.onMouseMove);
    switchListener(isOn, target, "pointerup", this.onMouseUp);
    switchListener(isOn, target, "pointerupoutside", this.onMouseUp);
  }

  private getDragPos(e: PointerEvent): number {
    return SliderViewUtil.getPointerEventPosition(
      e,
      this.scrollBarView.isHorizontal,
    );
  }

  private updateDragPos(e: PointerEvent): void {
    this.dragPos = this.getDragPos(e);
  }

  private onMouseMove = (e: FederatedPointerEvent) => {
    if (this.dragPos == null) return;
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
    this.onTick();
  };

  private onTick = () => {
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
}
