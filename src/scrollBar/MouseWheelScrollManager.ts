import * as PIXI from "pixi.js";
import {
  MouseWheelDisplayObject,
  MouseWheelPluginEventType,
} from "../MouseWheelPlugin";
import { SliderViewUtil } from "../SliderView";
import { ScrollBarEventType } from "./ScrollBarEvent";
import { ScrollBarView } from "./ScrollBarView";
import { ScrollBarViewUtil } from "./ScrollBarViewUtil";

/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export class MouseWheelScrollManager extends PIXI.utils.EventEmitter {
  protected scrollBarView: ScrollBarView;
  public delta = 16;
  private _isStart: boolean;

  constructor(scrollBarView: ScrollBarView) {
    super();
    this.scrollBarView = scrollBarView;

    const target = this.scrollBarView.targetContents as MouseWheelDisplayObject;
    target.interactive = true;
    target.interactiveMousewheel = true;

    this.start();
  }

  public start(): void {
    if (this._isStart) return;
    const target = this.scrollBarView.targetContents;
    target.on(MouseWheelPluginEventType.WHEEL, this.wheelHandler);
    this._isStart = true;
  }

  public stop(): void {
    const target = this.scrollBarView.targetContents;
    target.off(MouseWheelPluginEventType.WHEEL, this.wheelHandler);
    this._isStart = false;
  }

  //TODO add support deltaX / deltaY
  private wheelHandler = (e: WheelEvent) => {
    const shift = e.deltaY > 0 ? -this.delta : this.delta;
    this.scroll(shift);
  };

  private scroll(delta: number): void {
    const target = this.scrollBarView.targetContents;
    const mask = this.scrollBarView.contentsMask;
    const isHorizontal = this.scrollBarView.isHorizontal;

    const pos = SliderViewUtil.getPosition(target, isHorizontal) + delta;
    ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);

    this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
    this.scrollBarView.emit(ScrollBarEventType.STOP_INERTIAL_TWEEN);
  }
}
