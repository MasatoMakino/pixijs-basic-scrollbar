import { ScrollBarViewUtil } from "./ScrollBarView";
import { SliderViewUtil } from "../SliderView";
import * as PIXI from "pixi.js";
import { ScrollBarEventType } from "./ScrollBarEvent";
/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export class MouseWheelScrollManager extends PIXI.utils.EventEmitter {
    //TODO スタート、ストップを可能にする。
    constructor(scrollBarView) {
        super();
        this.delta = 16;
        this.scrollBarView = scrollBarView;
        const target = this.scrollBarView.targetContents;
        target.interactive = true;
        target["interactiveMousewheel"] = true;
        //TODO add support deltaX / deltaY
        target.on("mousewheel", (delta, event) => {
            const shift = delta > 0 ? this.delta : -this.delta;
            this.scroll(shift);
        });
    }
    scroll(delta) {
        const target = this.scrollBarView.targetContents;
        const mask = this.scrollBarView.contentsMask;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const pos = SliderViewUtil.getPosition(target, isHorizontal) + delta;
        ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);
        this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
        this.scrollBarView.emit(ScrollBarEventType.STOP_INERTIAL_TWEEN);
    }
}
