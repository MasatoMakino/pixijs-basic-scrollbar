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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarView = void 0;
var ScrollBarViewUtil_1 = require("./ScrollBarViewUtil");
var SliderEvent_1 = require("../SliderEvent");
var SliderView_1 = require("../SliderView");
var InertialScrollManager_1 = require("./InertialScrollManager");
var MouseWheelScrollManager_1 = require("./MouseWheelScrollManager");
var ScrollBarContentsEventType_1 = require("./ScrollBarContentsEventType");
var ScrollBarEvent_1 = require("./ScrollBarEvent");
/**
 * スクロールバーを表すクラスです。
 *
 * このクラスは、スライダーに以下の機能を追加したものです。
 *
 * 		1.コンテンツサイズに合わせた、スクロールバーの伸縮
 * 		2.スクロールバーの伸縮にあわせた、移動範囲の制限
 * 		3.スクロールバーの伸縮にあわせた、移動値の取得
 */
var ScrollBarView = /** @class */ (function (_super) {
    __extends(ScrollBarView, _super);
    function ScrollBarView(option, scrollContents) {
        var _this = _super.call(this, option) || this;
        _this._autoHide = false;
        /**
         * スライダーイベントに応じてコンテンツをスクロールする
         * @param {Object} e
         */
        _this.updateContentsPosition = function (e) {
            var evt = e;
            _this.updateContentsPositionWithRate(evt.rate);
        };
        _this._contents = scrollContents;
        _this._contents.on(ScrollBarContentsEventType_1.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE, _this.updateSlider);
        _this.on(SliderEvent_1.SliderEventType.CHANGE, _this.updateContentsPosition);
        _this.changeRate(option.rate);
        _this.wheelManager = new MouseWheelScrollManager_1.MouseWheelScrollManager(_this);
        _this.wheelManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {
            _this.updateSliderPosition();
        });
        _this.inertialManager = new InertialScrollManager_1.InertialScrollManager(_this);
        _this.inertialManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {
            _this.updateSliderPosition();
        });
        return _this;
    }
    Object.defineProperty(ScrollBarView.prototype, "contents", {
        get: function () {
            return this._contents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollBarView.prototype, "autoHide", {
        get: function () {
            return this._autoHide;
        },
        set: function (value) {
            this._autoHide = value;
            this.updateSliderVisible();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    ScrollBarView.prototype.limitSliderButtonPosition = function (evt) {
        var mousePos = this.getMousePosition(this, evt);
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_1.SliderViewUtil.clamp(mousePos, range.max, range.min);
    };
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    ScrollBarView.prototype.convertRateToPixel = function (rate) {
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_1.SliderViewUtil.convertRateToPixel(rate, range.max, range.min);
    };
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    ScrollBarView.prototype.convertPixelToRate = function (pixel) {
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_1.SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);
    };
    /**
     * スライダーボタンの可動範囲を取得する。単位ピクセル
     */
    ScrollBarView.prototype.getRangeOfSliderButtonPosition = function () {
        var buttonSize = this.slideButtonSize;
        var ratio = ScrollBarViewUtil_1.ScrollBarViewUtil.getRatioOfOrigin(this._slideButton, this.isHorizontal);
        var max = this._maxPosition - (1.0 + ratio) * buttonSize;
        var min = this._minPosition - ratio * buttonSize;
        return { max: max, min: min };
    };
    Object.defineProperty(ScrollBarView.prototype, "slideButtonSize", {
        /**
         * スライダーボタンのサイズ。
         * @returns {number}
         */
        get: function () {
            this.updateSliderSize();
            return SliderView_1.SliderViewUtil.getSize(this._slideButton, this.isHorizontal);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * スクロールバーのボタンサイズ及び位置を更新する。
     * コンテンツサイズが変更された場合の更新にも利用する。
     */
    ScrollBarView.prototype.updateSlider = function () {
        if (!this.isUpdatableSliderSize())
            return;
        this.updateSliderSize();
        this.updateSliderPosition();
    };
    /**
     * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
     * その割合でスライダーの位置を更新する。
     */
    ScrollBarView.prototype.updateSliderPosition = function () {
        var rate = this.contents.getScrollPositionAsRate(this.isHorizontal);
        this.changeRate(rate);
    };
    ScrollBarView.prototype.isUpdatableSliderSize = function () {
        var _a, _b;
        return (((_a = this._contents) === null || _a === void 0 ? void 0 : _a.target) != null &&
            ((_b = this._contents) === null || _b === void 0 ? void 0 : _b.mask) != null &&
            this._slideButton != null);
    };
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    ScrollBarView.prototype.updateSliderSize = function () {
        if (!this.isUpdatableSliderSize())
            return;
        var fullSize = this._maxPosition - this._minPosition;
        var displayRate = this._contents.getDisplayRate(this.isHorizontal);
        var sliderSize = fullSize * displayRate;
        SliderView_1.SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);
        this.updateSliderVisible();
    };
    /**
     * autoHideの条件に一致するかを判定し、表示を切り替える。
     * @private
     */
    ScrollBarView.prototype.updateSliderVisible = function () {
        this._slideButton.visible = this._slideButton.interactive = !this.isHidden;
    };
    Object.defineProperty(ScrollBarView.prototype, "isHidden", {
        /**
         * autoHideの条件に一致するかを判定する
         */
        get: function () {
            //autoHideが設定されていない場合は常に表示
            if (!this.autoHide)
                return false;
            return this._contents.getDisplayRate(this.isHorizontal) === 1.0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * rate値を元にコンテンツをスクロールする。
     * @param {number} rate
     */
    ScrollBarView.prototype.updateContentsPositionWithRate = function (rate) {
        this._contents.scroll(rate, this.isHorizontal);
    };
    ScrollBarView.prototype.onPressedSliderButton = function (e) {
        _super.prototype.onPressedSliderButton.call(this, e);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    ScrollBarView.prototype.onMoveSlider = function (e) {
        _super.prototype.onMoveSlider.call(this, e);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    ScrollBarView.prototype.onPressBase = function (evt) {
        if (this.isHidden)
            return;
        _super.prototype.onPressBase.call(this, evt);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    ScrollBarView.prototype.onDisposeFunction = function (e) {
        this._contents.dispose();
        this._contents = null;
        _super.prototype.onDisposeFunction.call(this, e);
    };
    return ScrollBarView;
}(SliderView_1.SliderView));
exports.ScrollBarView = ScrollBarView;
