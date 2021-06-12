"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseWheelScrollManager = void 0;
var PIXI = __importStar(require("pixi.js"));
var MouseWheelPlugin_1 = require("../MouseWheelPlugin");
var SliderView_1 = require("../SliderView");
var ScrollBarEvent_1 = require("./ScrollBarEvent");
var ScrollBarViewUtil_1 = require("./ScrollBarViewUtil");
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
        var target = _this.scrollBarView.contents
            .target;
        target.interactive = true;
        target.interactiveMousewheel = true;
        _this.start();
        return _this;
    }
    MouseWheelScrollManager.prototype.start = function () {
        if (this._isStart)
            return;
        var target = this.scrollBarView.contents.target;
        target.on(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = true;
    };
    MouseWheelScrollManager.prototype.stop = function () {
        var target = this.scrollBarView.contents.target;
        target.off(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);
        this._isStart = false;
    };
    MouseWheelScrollManager.prototype.scroll = function (delta) {
        var target = this.scrollBarView.contents.target;
        var mask = this.scrollBarView.contents.mask;
        var isHorizontal = this.scrollBarView.isHorizontal;
        var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal) + delta;
        ScrollBarViewUtil_1.ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);
        this.scrollBarView.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    return MouseWheelScrollManager;
}(PIXI.utils.EventEmitter));
exports.MouseWheelScrollManager = MouseWheelScrollManager;
