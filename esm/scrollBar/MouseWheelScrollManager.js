import * as PIXI from "pixi.js";
import { MouseWheelPluginEventType, } from "../MouseWheelPlugin";
import { SliderViewUtil } from "../SliderView";
import { ScrollBarEventType } from "./ScrollBarEvent";
import { ScrollBarViewUtil } from "./ScrollBarViewUtil";
/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export class MouseWheelScrollManager extends PIXI.utils.EventEmitter {
    constructor(scrollBarView) {
        super();
        this.delta = 16;
        //TODO add support deltaX / deltaY
        this.wheelHandler = (e) => {
            const shift = e.deltaY > 0 ? -this.delta : this.delta;
            this.scroll(shift);
        };
        this.scrollBarView = scrollBarView;
        const target = this.scrollBarView.contents
            .target;
        target.interactive = true;
        target.interactiveMousewheel = true;
        this.start();
    }
    start() {
        if (this._isStart)
            return;
        const target = this.scrollBarView.contents.target;
        target.on(MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = true;
    }
    stop() {
        const target = this.scrollBarView.contents.target;
        target.off(MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = false;
    }
    scroll(delta) {
        const target = this.scrollBarView.contents.target;
        const mask = this.scrollBarView.contents.mask;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const pos = SliderViewUtil.getPosition(target, isHorizontal) + delta;
        ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);
        this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
        this.scrollBarView.emit(ScrollBarEventType.STOP_INERTIAL_TWEEN);
    }
}
