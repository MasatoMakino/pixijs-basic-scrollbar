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
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollBarView_1 = require("./ScrollBarView");
var SliderView_1 = require("../SliderView");
var PIXI = __importStar(require("pixi.js"));
var ScrollBarEvent_1 = require("./ScrollBarEvent");
var MouseWheelPlugin_1 = require("../MouseWheelPlugin");
/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
var MouseWheelScrollManager = /** @class */ (function (_super) {
    __extends(MouseWheelScrollManager, _super);
    function MouseWheelScrollManager(scrollBarView) {
        var _this = _super.call(this) || this;
        _this.delta = 16;
        //TODO add support deltaX / deltaY
        _this.wheelHandler = function (e) {
            var shift = e.deltaY > 0 ? -_this.delta : _this.delta;
            _this.scroll(shift);
        };
        _this.scrollBarView = scrollBarView;
        var target = _this.scrollBarView.targetContents;
        target.interactive = true;
        target.interactiveMousewheel = true;
        _this.start();
        return _this;
    }
    MouseWheelScrollManager.prototype.start = function () {
        if (this._isStart)
            return;
        var target = this.scrollBarView.targetContents;
        target.on(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = true;
    };
    MouseWheelScrollManager.prototype.stop = function () {
        var target = this.scrollBarView.targetContents;
        target.off(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = false;
    };
    MouseWheelScrollManager.prototype.scroll = function (delta) {
        var target = this.scrollBarView.targetContents;
        var mask = this.scrollBarView.contentsMask;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal) + delta;
        ScrollBarView_1.ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
        this.scrollBarView.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    return MouseWheelScrollManager;
}(PIXI.utils.EventEmitter));
exports.MouseWheelScrollManager = MouseWheelScrollManager;
