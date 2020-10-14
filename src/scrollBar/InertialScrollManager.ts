import { InteractionEvent } from "@pixi/interaction";
import TWEEN from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";
import { Ticker } from "pixi.js";
import { SliderViewUtil } from "../SliderView";
import { ScrollBarEventType } from "./ScrollBarEvent";
import { ScrollBarView } from "./ScrollBarView";
import { ScrollBarViewUtil } from "./ScrollBarViewUtil";
import Easing = TWEEN.Easing;
import Tween = TWEEN.Tween;

/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export class InertialScrollManager extends PIXI.utils.EventEmitter {
  private scrollBarView: ScrollBarView;

  public decelerationRate: number = 0.975;
  public overflowScrollRange: number = 180;
  protected speed: number = 0.0;
  protected isDragging: boolean = false;
  protected dragPos: number;

  private tween: Tween;
  private _isStart: boolean;

  constructor(scrollBarView: ScrollBarView) {
    super();
    this.scrollBarView = scrollBarView;
    scrollBarView.on(ScrollBarEventType.STOP_INERTIAL_TWEEN, this.stopInertial);

    const target = this.scrollBarView.targetContents;
    target.interactive = true;

    this.start();
  }

  public start(): void {
    if (this._isStart) return;
    this._isStart = true;

    const target = this.scrollBarView.targetContents;
    target.on("pointerdown", this.onMouseDown);
    Ticker.shared.add(this.onTick);
  }

  public stop(): void {
    if (!this._isStart) return;
    this._isStart = false;

    const target = this.scrollBarView.targetContents;
    target.off("pointerdown", this.onMouseDown);
    this.removeDragListener();
    this.stopInertial();
    Ticker.shared.remove(this.onTick);
  }

  private onMouseDown = (e: InteractionEvent) => {
    this.onMouseDownHandler(e);
  };

  private onMouseDownHandler(e: InteractionEvent): void {
    this.updateDragPos(e);

    this.isDragging = true;
    this.speed = 0.0;
    if (this.tween) this.tween.stop();

    this.addDragListener();
  }

  private addDragListener(): void {
    this.switchDragListener(true);
  }

  private removeDragListener(): void {
    this.switchDragListener(false);
  }

  private switchDragListener(isOn: boolean): void {
    const target = this.scrollBarView.targetContents;
    const switchListener = (
      isOn: boolean,
      event: string,
      listener: Function
    ) => {
      if (isOn) {
        target.on(event, listener);
      } else {
        target.off(event, listener);
      }
    };
    switchListener(isOn, "pointermove", this.onMouseMove);
    switchListener(isOn, "pointerup", this.onMouseUp);
    switchListener(isOn, "pointerupoutside", this.onMouseUp);
  }

  private getDragPos(e: InteractionEvent): number {
    return SliderViewUtil.getPosition(
      e.data.global,
      this.scrollBarView.isHorizontal
    );
  }

  private updateDragPos(e: InteractionEvent): void {
    this.dragPos = this.getDragPos(e);
  }

  private onMouseMove = (e: InteractionEvent) => {
    this.onMouseMoveHandler(e);
  };
  private onMouseMoveHandler(e: InteractionEvent): void {
    const delta = this.getDragPos(e) - this.dragPos;

    this.speed = delta;
    this.addTargetPosition(delta * this.getOverflowDeceleration());

    this.updateDragPos(e);
  }

  private addTargetPosition(delta: number): void {
    const target = this.scrollBarView.targetContents;
    const isHorizontal = this.scrollBarView.isHorizontal;
    const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
    SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);

    this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
  }

  private onMouseUp = (e: InteractionEvent) => {
    this.onMouseUpHandler(e);
  };
  private onMouseUpHandler(e: InteractionEvent): void {
    this.removeDragListener();
    this.isDragging = false;
    this.onTick();
  }

  private onTick = () => {
    if (this.isDragging) return;
    if (this.speed === 0.0 && this.getLeaveRangeFromMask() === 0.0) return;
    if (this.tween?.isPlaying()) return;

    //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
    const overflowDeceleration = this.getOverflowDeceleration();

    this.speed *= this.decelerationRate * overflowDeceleration;
    this.addTargetPosition(this.speed);

    if (Math.abs(this.speed) > 0.1) return;

    //back ease
    this.speed = 0.0;
    const toObj = { y: this.getClampedPos() };

    this.tween = new Tween(this.scrollBarView.targetContents)
      .to(toObj, 666)
      .onUpdate(() => {
        this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
      })
      .easing(Easing.Cubic.Out)
      .start();
  };

  private stopInertial = () => {
    this.speed = 0.0;
    if (this.tween) this.tween.stop();
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
    const target = this.scrollBarView.targetContents;
    const isHorizontal = this.scrollBarView.isHorizontal;
    const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
    const clampedPos = this.getClampedPos();

    return Math.abs(currentPos - clampedPos);
  }

  private getClampedPos() {
    const target = this.scrollBarView.targetContents;
    const isHorizontal = this.scrollBarView.isHorizontal;
    return ScrollBarViewUtil.getClampedTargetPosition(
      target,
      this.scrollBarView.contentsMask,
      isHorizontal
    );
  }
}
