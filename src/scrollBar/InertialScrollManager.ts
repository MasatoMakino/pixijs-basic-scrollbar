import { InteractionEvent } from "@pixi/interaction";
import { ScrollBarView } from "./ScrollBarView";
import { SliderViewUtil } from "../SliderView";
import { Ticker } from "pixi.js";

import TWEEN from "@tweenjs/tween.js";
import Tween = TWEEN.Tween;
import Easing = TWEEN.Easing;

import { ScrollBarViewUtil } from "./ScrollBarView";
import * as PIXI from "pixi.js";
import { ScrollBarEventType } from "./ScrollBarEvent";

export class InertialScrollManager extends PIXI.utils.EventEmitter {
  private scrollBarView: ScrollBarView;

  public decelerationRate: number = 0.975;
  protected speed: number = 0.0;
  protected isDragging: boolean = false;
  protected dragPos: number;

  private tween: Tween;

  constructor(scrollBarView: ScrollBarView) {
    super();
    this.scrollBarView = scrollBarView;
    scrollBarView.on(ScrollBarEventType.STOP_INERTIAL_TWEEN, this.stopInertial);

    const target = this.scrollBarView.targetContents;
    target.interactive = true;
    target.on("mousedown", this.onMouseDown);

    Ticker.shared.add(this.onTick);
  }

  private onMouseDown = (e: InteractionEvent) => {
    this.onMouseDownHandler(e);
  };

  private onMouseDownHandler(e: InteractionEvent): void {
    this.updateDragPos(e);

    this.isDragging = true;
    this.speed = 0.0;
    if (this.tween) this.tween.stop();

    const target = this.scrollBarView.targetContents;
    target.on("mousemove", this.onMouseMove);
    target.on("mouseup", this.onMouseUp);
    target.on("mouseupoutside", this.onMouseUp);
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

    //TODO decrease delta on out range

    this.speed = delta;
    this.addTargetPosition(delta);

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
    const target = this.scrollBarView.targetContents;
    target.removeListener("mousemove", this.onMouseMove);
    target.removeListener("mouseup", this.onMouseUp);
    target.removeListener("mouseupoutside", this.onMouseUp);

    this.isDragging = false;
  }

  private onTick = () => {
    if (this.isDragging) return;
    if (this.speed == 0.0) return;

    //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
    const difPos = this.getLeaveRangeFromMask();
    let positionDeceleration = (180 - difPos) / 180;
    if (positionDeceleration < 0.0) positionDeceleration = 0.0;

    this.speed *= this.decelerationRate * positionDeceleration;
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

  //TODO targetContentsが別の要素から位置更新された場合、tweenを停止する。
}
