"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SliderView_1 = require("../SliderView");
var ScrollBarView_1 = require("./ScrollBarView");
var ScrollBarEvent_1 = require("./ScrollBarEvent");
var PIXI = __importStar(require("pixi.js"));
var pixi_js_1 = require("pixi.js");
var tween_js_1 = __importDefault(require("@tweenjs/tween.js"));
var Tween = tween_js_1.default.Tween;
var Easing = tween_js_1.default.Easing;
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
var InertialScrollManager = /** @class */ (function (_super) {
    __extends(InertialScrollManager, _super);
    function InertialScrollManager(scrollBarView) {
        var _this = _super.call(this) || this;
        _this.decelerationRate = 0.975;
        _this.overflowScrollRange = 180;
        _this.speed = 0.0;
        _this.isDragging = false;
        _this.onMouseDown = function (e) {
            _this.onMouseDownHandler(e);
        };
        _this.onMouseMove = function (e) {
            _this.onMouseMoveHandler(e);
        };
        _this.onMouseUp = function (e) {
            _this.onMouseUpHandler(e);
        };
        _this.onTick = function () {
            var _a;
            if (_this.isDragging)
                return;
            if (_this.speed === 0.0 && _this.getLeaveRangeFromMask() === 0.0)
                return;
            if ((_a = _this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying())
                return;
            //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
            var overflowDeceleration = _this.getOverflowDeceleration();
            _this.speed *= _this.decelerationRate * overflowDeceleration;
            _this.addTargetPosition(_this.speed);
            if (Math.abs(_this.speed) > 0.1)
                return;
            //back ease
            _this.speed = 0.0;
            var toObj = { y: _this.getClampedPos() };
            _this.tween = new Tween(_this.scrollBarView.targetContents)
                .to(toObj, 666)
                .onUpdate(function () {
                _this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
            })
                .easing(Easing.Cubic.Out)
                .start();
        };
        _this.stopInertial = function () {
            _this.speed = 0.0;
            if (_this.tween)
                _this.tween.stop();
        };
        _this.scrollBarView = scrollBarView;
        scrollBarView.on(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN, _this.stopInertial);
        var target = _this.scrollBarView.targetContents;
        target.interactive = true;
        _this.start();
        return _this;
    }
    InertialScrollManager.prototype.start = function () {
        if (this._isStart)
            return;
        this._isStart = true;
        var target = this.scrollBarView.targetContents;
        target.on("pointerdown", this.onMouseDown);
        pixi_js_1.Ticker.shared.add(this.onTick);
    };
    InertialScrollManager.prototype.stop = function () {
        if (!this._isStart)
            return;
        this._isStart = false;
        var target = this.scrollBarView.targetContents;
        target.off("pointerdown", this.onMouseDown);
        this.removeDragListener();
        this.stopInertial();
        pixi_js_1.Ticker.shared.remove(this.onTick);
    };
    InertialScrollManager.prototype.onMouseDownHandler = function (e) {
        this.updateDragPos(e);
        this.isDragging = true;
        this.speed = 0.0;
        if (this.tween)
            this.tween.stop();
        this.addDragListener();
    };
    InertialScrollManager.prototype.addDragListener = function () {
        var target = this.scrollBarView.targetContents;
        target.on("pointermove", this.onMouseMove);
        target.on("pointerup", this.onMouseUp);
        target.on("pointerupoutside", this.onMouseUp);
    };
    InertialScrollManager.prototype.removeDragListener = function () {
        var target = this.scrollBarView.targetContents;
        target.off("pointermove", this.onMouseMove);
        target.off("pointerup", this.onMouseUp);
        target.off("pointerupoutside", this.onMouseUp);
    };
    InertialScrollManager.prototype.getDragPos = function (e) {
        return SliderView_1.SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);
    };
    InertialScrollManager.prototype.updateDragPos = function (e) {
        this.dragPos = this.getDragPos(e);
    };
    InertialScrollManager.prototype.onMouseMoveHandler = function (e) {
        var delta = this.getDragPos(e) - this.dragPos;
        this.speed = delta;
        this.addTargetPosition(delta * this.getOverflowDeceleration());
        this.updateDragPos(e);
    };
    InertialScrollManager.prototype.addTargetPosition = function (delta) {
        var target = this.scrollBarView.targetContents;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);
        SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
    };
    InertialScrollManager.prototype.onMouseUpHandler = function (e) {
        this.removeDragListener();
        this.isDragging = false;
        this.onTick();
    };
    /**
     * スクロールのオーバーフロー量から、減退率を割り出す。
     * overflowScrollRange以上に離れている場合は0.0
     * スクロールエリア内にコンテンツがある場合は1.0を返す。
     */
    InertialScrollManager.prototype.getOverflowDeceleration = function () {
        var difPos = this.getLeaveRangeFromMask();
        var overflowDeceleration = (this.overflowScrollRange - difPos) / this.overflowScrollRange;
        if (overflowDeceleration < 0.0)
            overflowDeceleration = 0.0;
        return overflowDeceleration;
    };
    /**
     * ターゲットコンテンツがマスク領域からどれだけ離れているか。
     */
    InertialScrollManager.prototype.getLeaveRangeFromMask = function () {
        var target = this.scrollBarView.targetContents;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);
        var clampedPos = this.getClampedPos();
        return Math.abs(currentPos - clampedPos);
    };
    InertialScrollManager.prototype.getClampedPos = function () {
        var target = this.scrollBarView.targetContents;
        var isHorizontal = this.scrollBarView.isHorizontal;
        return ScrollBarView_1.ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contentsMask, isHorizontal);
    };
    return InertialScrollManager;
}(PIXI.utils.EventEmitter));
exports.InertialScrollManager = InertialScrollManager;
