import { SliderViewUtil } from "../SliderView";
import { ScrollBarViewUtil } from "./ScrollBarView";
import { ScrollBarEventType } from "./ScrollBarEvent";
import * as PIXI from "pixi.js";
import { Ticker } from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
var Tween = TWEEN.Tween;
var Easing = TWEEN.Easing;
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export class InertialScrollManager extends PIXI.utils.EventEmitter {
    constructor(scrollBarView) {
        super();
        this.decelerationRate = 0.975;
        this.overflowScrollRange = 180;
        this.speed = 0.0;
        this.isDragging = false;
        this.onMouseDown = (e) => {
            this.onMouseDownHandler(e);
        };
        this.onMouseMove = (e) => {
            this.onMouseMoveHandler(e);
        };
        this.onMouseUp = (e) => {
            this.onMouseUpHandler(e);
        };
        this.onTick = () => {
            var _a;
            if (this.isDragging)
                return;
            if (this.speed === 0.0 && this.getLeaveRangeFromMask() === 0.0)
                return;
            if ((_a = this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying())
                return;
            //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
            const overflowDeceleration = this.getOverflowDeceleration();
            this.speed *= this.decelerationRate * overflowDeceleration;
            this.addTargetPosition(this.speed);
            if (Math.abs(this.speed) > 0.1)
                return;
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
        this.stopInertial = () => {
            this.speed = 0.0;
            if (this.tween)
                this.tween.stop();
        };
        this.scrollBarView = scrollBarView;
        scrollBarView.on(ScrollBarEventType.STOP_INERTIAL_TWEEN, this.stopInertial);
        const target = this.scrollBarView.targetContents;
        target.interactive = true;
        this.start();
    }
    start() {
        if (this._isStart)
            return;
        this._isStart = true;
        const target = this.scrollBarView.targetContents;
        target.on("mousedown", this.onMouseDown);
        Ticker.shared.add(this.onTick);
    }
    stop() {
        if (!this._isStart)
            return;
        this._isStart = false;
        const target = this.scrollBarView.targetContents;
        target.off("mousedown", this.onMouseDown);
        this.removeDragListener();
        this.stopInertial();
        Ticker.shared.remove(this.onTick);
    }
    onMouseDownHandler(e) {
        this.updateDragPos(e);
        this.isDragging = true;
        this.speed = 0.0;
        if (this.tween)
            this.tween.stop();
        this.addDragListener();
    }
    addDragListener() {
        const target = this.scrollBarView.targetContents;
        target.on("mousemove", this.onMouseMove);
        target.on("mouseup", this.onMouseUp);
        target.on("mouseupoutside", this.onMouseUp);
    }
    removeDragListener() {
        const target = this.scrollBarView.targetContents;
        target.off("mousemove", this.onMouseMove);
        target.off("mouseup", this.onMouseUp);
        target.off("mouseupoutside", this.onMouseUp);
    }
    getDragPos(e) {
        return SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);
    }
    updateDragPos(e) {
        this.dragPos = this.getDragPos(e);
    }
    onMouseMoveHandler(e) {
        const delta = this.getDragPos(e) - this.dragPos;
        this.speed = delta;
        this.addTargetPosition(delta * this.getOverflowDeceleration());
        this.updateDragPos(e);
    }
    addTargetPosition(delta) {
        const target = this.scrollBarView.targetContents;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
        SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);
        this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
    }
    onMouseUpHandler(e) {
        this.removeDragListener();
        this.isDragging = false;
        this.onTick();
    }
    /**
     * スクロールのオーバーフロー量から、減退率を割り出す。
     * overflowScrollRange以上に離れている場合は0.0
     * スクロールエリア内にコンテンツがある場合は1.0を返す。
     */
    getOverflowDeceleration() {
        const difPos = this.getLeaveRangeFromMask();
        let overflowDeceleration = (this.overflowScrollRange - difPos) / this.overflowScrollRange;
        if (overflowDeceleration < 0.0)
            overflowDeceleration = 0.0;
        return overflowDeceleration;
    }
    /**
     * ターゲットコンテンツがマスク領域からどれだけ離れているか。
     */
    getLeaveRangeFromMask() {
        const target = this.scrollBarView.targetContents;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
        const clampedPos = this.getClampedPos();
        return Math.abs(currentPos - clampedPos);
    }
    getClampedPos() {
        const target = this.scrollBarView.targetContents;
        const isHorizontal = this.scrollBarView.isHorizontal;
        return ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contentsMask, isHorizontal);
    }
}
