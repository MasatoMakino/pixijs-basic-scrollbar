import { Easing, Tween } from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";
import { Ticker } from "pixi.js";
import { SliderViewUtil } from "../SliderView";
import { ScrollBarEventType } from "./ScrollBarEvent";
import { ScrollBarViewUtil } from "./ScrollBarViewUtil";
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export class InertialScrollManager extends PIXI.utils.EventEmitter {
    constructor(scrollBarView) {
        super();
        this.decelerationRate = 0.975;
        this.overflowScrollRange = 180;
        this._speed = 0.0;
        this.isDragging = false;
        this.onMouseDown = (e) => {
            this.updateDragPos(e);
            this.isDragging = true;
            this._speed = 0.0;
            if (this.tween)
                this.tween.stop();
            this.addDragListener();
        };
        this.onMouseMove = (e) => {
            const delta = this.getDragPos(e) - this.dragPos;
            this._speed = delta;
            this.addTargetPosition(delta * this.getOverflowDeceleration());
            this.updateDragPos(e);
        };
        this.onMouseUp = (e) => {
            this.removeDragListener();
            this.isDragging = false;
            this.onTick();
        };
        this.onTick = () => {
            var _a;
            if (this.isDragging)
                return;
            if (this._speed === 0.0 && this.getLeaveRangeFromMask() === 0.0)
                return;
            if ((_a = this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying())
                return;
            //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
            const overflowDeceleration = this.getOverflowDeceleration();
            this._speed *= this.decelerationRate * overflowDeceleration;
            this.addTargetPosition(this._speed);
            if (Math.abs(this._speed) > 0.1)
                return;
            //back ease
            this._speed = 0.0;
            const toObj = { y: this.getClampedPos() };
            this.tween = new Tween(this.scrollBarView.contents.target)
                .to(toObj, 666)
                .onUpdate(() => {
                this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
            })
                .easing(Easing.Cubic.Out)
                .start();
        };
        this.stopInertial = () => {
            this._speed = 0.0;
            if (this.tween)
                this.tween.stop();
        };
        this.scrollBarView = scrollBarView;
        scrollBarView.on(ScrollBarEventType.STOP_INERTIAL_TWEEN, this.stopInertial);
        const target = this.scrollBarView.contents.target;
        target.interactive = true;
        this.start();
    }
    get speed() {
        return this._speed;
    }
    start() {
        if (this._isStart)
            return;
        this._isStart = true;
        const target = this.scrollBarView.contents.target;
        target.on("pointerdown", this.onMouseDown);
        Ticker.shared.add(this.onTick);
    }
    stop() {
        if (!this._isStart)
            return;
        this._isStart = false;
        const target = this.scrollBarView.contents.target;
        target.off("pointerdown", this.onMouseDown);
        this.removeDragListener();
        this.stopInertial();
        Ticker.shared.remove(this.onTick);
    }
    addDragListener() {
        this.switchDragListener(true);
    }
    removeDragListener() {
        this.switchDragListener(false);
    }
    switchDragListener(isOn) {
        const target = this.scrollBarView.contents.target;
        const switchListener = (isOn, event, listener) => {
            if (isOn) {
                target.on(event, listener);
            }
            else {
                target.off(event, listener);
            }
        };
        switchListener(isOn, "pointermove", this.onMouseMove);
        switchListener(isOn, "pointerup", this.onMouseUp);
        switchListener(isOn, "pointerupoutside", this.onMouseUp);
    }
    getDragPos(e) {
        return SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);
    }
    updateDragPos(e) {
        this.dragPos = this.getDragPos(e);
    }
    addTargetPosition(delta) {
        const target = this.scrollBarView.contents.target;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
        SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);
        this.emit(ScrollBarEventType.UPDATE_TARGET_POSITION);
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
        const target = this.scrollBarView.contents.target;
        const isHorizontal = this.scrollBarView.isHorizontal;
        const currentPos = SliderViewUtil.getPosition(target, isHorizontal);
        const clampedPos = this.getClampedPos();
        return Math.abs(currentPos - clampedPos);
    }
    getClampedPos() {
        const target = this.scrollBarView.contents.target;
        const isHorizontal = this.scrollBarView.isHorizontal;
        return ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contents.mask, isHorizontal);
    }
}
