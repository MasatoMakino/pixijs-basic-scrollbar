"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InertialScrollManager = void 0;
var tween_js_1 = __importDefault(require("@tweenjs/tween.js"));
var PIXI = __importStar(require("pixi.js"));
var pixi_js_1 = require("pixi.js");
var SliderView_1 = require("../SliderView");
var ScrollBarEvent_1 = require("./ScrollBarEvent");
var ScrollBarViewUtil_1 = require("./ScrollBarViewUtil");
var Easing = tween_js_1.default.Easing;
var Tween = tween_js_1.default.Tween;
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
var InertialScrollManager = /** @class */ (function (_super) {
    __extends(InertialScrollManager, _super);
    function InertialScrollManager(scrollBarView) {
        var _this = _super.call(this) || this;
        _this.decelerationRate = 0.975;
        _this.overflowScrollRange = 180;
        _this._speed = 0.0;
        _this.isDragging = false;
        _this.onMouseDown = function (e) {
            _this.updateDragPos(e);
            _this.isDragging = true;
            _this._speed = 0.0;
            if (_this.tween)
                _this.tween.stop();
            _this.addDragListener();
        };
        _this.onMouseMove = function (e) {
            var delta = _this.getDragPos(e) - _this.dragPos;
            _this._speed = delta;
            _this.addTargetPosition(delta * _this.getOverflowDeceleration());
            _this.updateDragPos(e);
        };
        _this.onMouseUp = function (e) {
            _this.removeDragListener();
            _this.isDragging = false;
            _this.onTick();
        };
        _this.onTick = function () {
            var _a;
            if (_this.isDragging)
                return;
            if (_this._speed === 0.0 && _this.getLeaveRangeFromMask() === 0.0)
                return;
            if ((_a = _this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying())
                return;
            //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。
            var overflowDeceleration = _this.getOverflowDeceleration();
            _this._speed *= _this.decelerationRate * overflowDeceleration;
            _this.addTargetPosition(_this._speed);
            if (Math.abs(_this._speed) > 0.1)
                return;
            //back ease
            _this._speed = 0.0;
            var toObj = { y: _this.getClampedPos() };
            _this.tween = new Tween(_this.scrollBarView.contents.target)
                .to(toObj, 666)
                .onUpdate(function () {
                _this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
            })
                .easing(Easing.Cubic.Out)
                .start();
        };
        _this.stopInertial = function () {
            _this._speed = 0.0;
            if (_this.tween)
                _this.tween.stop();
        };
        _this.scrollBarView = scrollBarView;
        scrollBarView.on(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN, _this.stopInertial);
        var target = _this.scrollBarView.contents.target;
        target.interactive = true;
        _this.start();
        return _this;
    }
    Object.defineProperty(InertialScrollManager.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        enumerable: false,
        configurable: true
    });
    InertialScrollManager.prototype.start = function () {
        if (this._isStart)
            return;
        this._isStart = true;
        var target = this.scrollBarView.contents.target;
        target.on("pointerdown", this.onMouseDown);
        pixi_js_1.Ticker.shared.add(this.onTick);
    };
    InertialScrollManager.prototype.stop = function () {
        if (!this._isStart)
            return;
        this._isStart = false;
        var target = this.scrollBarView.contents.target;
        target.off("pointerdown", this.onMouseDown);
        this.removeDragListener();
        this.stopInertial();
        pixi_js_1.Ticker.shared.remove(this.onTick);
    };
    InertialScrollManager.prototype.addDragListener = function () {
        this.switchDragListener(true);
    };
    InertialScrollManager.prototype.removeDragListener = function () {
        this.switchDragListener(false);
    };
    InertialScrollManager.prototype.switchDragListener = function (isOn) {
        var target = this.scrollBarView.contents.target;
        var switchListener = function (isOn, event, listener) {
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
    };
    InertialScrollManager.prototype.getDragPos = function (e) {
        return SliderView_1.SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);
    };
    InertialScrollManager.prototype.updateDragPos = function (e) {
        this.dragPos = this.getDragPos(e);
    };
    InertialScrollManager.prototype.addTargetPosition = function (delta) {
        var target = this.scrollBarView.contents.target;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);
        SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
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
        var target = this.scrollBarView.contents.target;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);
        var clampedPos = this.getClampedPos();
        return Math.abs(currentPos - clampedPos);
    };
    InertialScrollManager.prototype.getClampedPos = function () {
        var target = this.scrollBarView.contents.target;
        var isHorizontal = this.scrollBarView.isHorizontal;
        return ScrollBarViewUtil_1.ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contents.mask, isHorizontal);
    };
    return InertialScrollManager;
}(PIXI.utils.EventEmitter));
exports.InertialScrollManager = InertialScrollManager;
