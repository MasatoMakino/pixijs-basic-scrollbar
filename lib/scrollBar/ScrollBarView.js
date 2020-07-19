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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarViewUtil = exports.ScrollBarViewInitOption = exports.ScrollBarView = void 0;
var SliderEvent_1 = require("../SliderEvent");
var SliderView_1 = require("../SliderView");
var SliderView_2 = require("../SliderView");
var MouseWheelScrollManager_1 = require("./MouseWheelScrollManager");
var InertialScrollManager_1 = require("./InertialScrollManager");
var ScrollBarEvent_1 = require("./ScrollBarEvent");
/**
 * スクロールバーを表すクラスです。
 *
 * このクラスは、スライダーに以下の機能を追加したものです。
 *
 * 		1.コンテンツサイズに合わせた、スクロールバーの伸縮
 * 		2.スクロールバーの伸縮にあわせた、移動範囲の制限
 * 		3.スクロールバーの伸縮にあわせた、移動値の取得
 *
 * 初期設定の注意
 * 		 スクロール対象とマスクは同一の親をもつこと。
 * 		 ローカル、グローバルの座標変換は行っていないので別の親をもつとスクロールが破たんします。
 */
var ScrollBarView = /** @class */ (function (_super) {
    __extends(ScrollBarView, _super);
    function ScrollBarView(option, scrollOption) {
        var _this = _super.call(this, option) || this;
        _this.autoHide = false;
        /**
         * スライダーイベントに応じてコンテンツをスクロールする
         * @param {Object} e
         */
        _this.updateContentsPosition = function (e) {
            var evt = e;
            _this.updateContentsPositionWithRate(evt.rate);
        };
        ScrollBarViewInitOption.check(scrollOption);
        _this.targetContents = scrollOption.targetContents;
        _this.contentsMask = scrollOption.contentsMask;
        _this.changeRate(option.rate);
        _this.wheelManager = new MouseWheelScrollManager_1.MouseWheelScrollManager(_this);
        _this.wheelManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {
            _this.updateSliderPosition();
        });
        var inertial = new InertialScrollManager_1.InertialScrollManager(_this);
        inertial.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {
            _this.updateSliderPosition();
        });
        return _this;
    }
    /**
     * 初期化処理
     * スライダーボタンの位置の初期化に加え、サイズの初期化も行う
     * @param {SliderViewOption} option
     */
    ScrollBarView.prototype.init = function (option) {
        _super.prototype.init.call(this, option);
        this.initSliderButton();
    };
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    ScrollBarView.prototype.limitSliderButtonPosition = function (evt) {
        var mousePos = this.getMousePosition(this, evt);
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_2.SliderViewUtil.clamp(mousePos, range.max, range.min);
    };
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    ScrollBarView.prototype.convertRateToPixel = function (rate) {
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_2.SliderViewUtil.convertRateToPixel(rate, range.max, range.min);
    };
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    ScrollBarView.prototype.convertPixelToRate = function (pixel) {
        var range = this.getRangeOfSliderButtonPosition();
        return SliderView_2.SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);
    };
    /**
     * スライダーボタンの可動範囲を取得する。単位ピクセル
     */
    ScrollBarView.prototype.getRangeOfSliderButtonPosition = function () {
        var buttonSize = this.slideButtonSize;
        var max = this._maxPosition - buttonSize / 2;
        var min = this._minPosition + buttonSize / 2;
        return { max: max, min: min };
    };
    Object.defineProperty(ScrollBarView.prototype, "slideButtonSize", {
        /**
         * スライダーボタンのサイズ。
         * @returns {number}
         */
        get: function () {
            this.updateSliderSize();
            return SliderView_2.SliderViewUtil.getSize(this._slideButton, this.isHorizontal);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * スクロールバーのボタンサイズ及び位置を更新する。
     * コンテンツサイズが変更された場合の更新にも利用する。
     */
    ScrollBarView.prototype.initSliderButton = function () {
        if (!this._slideButton || !this._targetContents || !this._contentsMask) {
            return;
        }
        this.updateSliderSize();
        this.updateSliderPosition();
        if (this.listeners(SliderEvent_1.SliderEventType.CHANGE).length != 0)
            return;
        this.on(SliderEvent_1.SliderEventType.CHANGE, this.updateContentsPosition);
    };
    /**
     * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
     * その割合でスライダーの位置を更新する。
     */
    ScrollBarView.prototype.updateSliderPosition = function () {
        var getPos = SliderView_2.SliderViewUtil.getPosition;
        var zeroPos = getPos(this._contentsMask, this.isHorizontal);
        var contentsPos = getPos(this._targetContents, this.isHorizontal);
        var posDif = zeroPos - contentsPos;
        var getSize = SliderView_2.SliderViewUtil.getSize;
        var targetSize = getSize(this._targetContents, this.isHorizontal);
        var maskSize = getSize(this._contentsMask, this.isHorizontal);
        var sizeDif = targetSize - maskSize;
        var rate = (posDif / sizeDif) * SliderView_1.SliderView.MAX_RATE;
        this.changeRate(rate);
    };
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    ScrollBarView.prototype.updateSliderSize = function () {
        if (!this._targetContents || !this._contentsMask || !this._slideButton) {
            return;
        }
        var fullSize = this._maxPosition - this._minPosition;
        var contentsSize = SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal);
        var maskSize = SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal);
        var sliderSize = (fullSize * maskSize) / contentsSize;
        if (sliderSize > fullSize) {
            sliderSize = fullSize;
        }
        SliderView_2.SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);
        //autoHideの条件に一致するかを判定し、表示を切り替える。
        this._slideButton.visible = this._slideButton.interactive = !this.isHide;
    };
    Object.defineProperty(ScrollBarView.prototype, "isHide", {
        /**
         * autoHideの条件に一致するかを判定する
         */
        get: function () {
            //autoHideが設定されていない場合は常に表示
            if (!this.autoHide)
                return false;
            var fullSize = this._maxPosition - this._minPosition;
            var contentsSize = SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal);
            var maskSize = SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal);
            //マスク、コンテンツ、スクロール幅のいずれかが0以下の場合スライダーを隠す
            if (contentsSize < 0 || maskSize < 0 || fullSize < 0) {
                return true;
            }
            //マスクサイズとコンテンツサイズが同一の場合スライダーを隠す
            return (SliderView_2.SliderViewUtil.getSize(this._slideButton, this.isHorizontal) == fullSize);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * rate値を元にコンテンツをスクロールする。
     * @param {number} rate
     */
    ScrollBarView.prototype.updateContentsPositionWithRate = function (rate) {
        var zeroPos = SliderView_2.SliderViewUtil.getPosition(this._contentsMask, this.isHorizontal);
        var nextPos = zeroPos -
            (rate / SliderView_1.SliderView.MAX_RATE) *
                (SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal) -
                    SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal));
        SliderView_2.SliderViewUtil.setPosition(this._targetContents, this.isHorizontal, nextPos);
    };
    ScrollBarView.prototype.onPressedSliderButton = function (e) {
        _super.prototype.onPressedSliderButton.call(this, e);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    ScrollBarView.prototype.onPressBase = function (evt) {
        if (this.isHide)
            return;
        _super.prototype.onPressBase.call(this, evt);
        this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);
    };
    Object.defineProperty(ScrollBarView.prototype, "targetContents", {
        get: function () {
            return this._targetContents;
        },
        set: function (value) {
            this._targetContents = value;
            this.initSliderButton();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollBarView.prototype, "contentsMask", {
        get: function () {
            return this._contentsMask;
        },
        set: function (value) {
            this._contentsMask = value;
            this.initSliderButton();
        },
        enumerable: false,
        configurable: true
    });
    ScrollBarView.prototype.onDisposeFunction = function (e) {
        this.removeListener(SliderEvent_1.SliderEventType.CHANGE, this.updateContentsPosition);
        this._targetContents = null;
        this._contentsMask = null;
        _super.prototype.onDisposeFunction.call(this, e);
    };
    return ScrollBarView;
}(SliderView_1.SliderView));
exports.ScrollBarView = ScrollBarView;
/**
 * スクロールバーの初期化時に必須となる項目をまとめたオブジェクト
 * スクロール対象とスクロールエリアのマスクを指定する。
 */
var ScrollBarViewInitOption = /** @class */ (function () {
    function ScrollBarViewInitOption() {
    }
    ScrollBarViewInitOption.check = function (option) {
        if (option.targetContents.mask !== option.contentsMask) {
            console.warn("ScrollBarView : スクロールするコンテンツにマスクが設定されていません。", option.targetContents, option.contentsMask);
        }
        if (option.contentsMask.parent != option.contentsMask.parent) {
            console.warn("ScrollBarView : スクロールするコンテンツと、そのマスクは表示ツリー上で同一の親Containerを持っている必要があります。", option.targetContents, option.contentsMask);
        }
        if (option.targetContents.getLocalBounds() === null) {
            throw new Error("ScrollBarView : 初期化オプションで指定されたtargetContentsにバウンディングボックスが存在しません。" +
                "ShapeやContainerを利用する場合はsetBounds関数を利用して" +
                "バウンディングボックスを手動で設定してください。");
        }
        if (option.contentsMask.getLocalBounds() === null) {
            throw new Error("ScrollBarView : 初期化オプションで指定されたcontentsMaskにバウンディングボックスが存在しません。" +
                "Shapeを利用する場合はsetBounds関数を利用して" +
                "バウンディングボックスを手動で設定してください。");
        }
    };
    return ScrollBarViewInitOption;
}());
exports.ScrollBarViewInitOption = ScrollBarViewInitOption;
var ScrollBarViewUtil = /** @class */ (function () {
    function ScrollBarViewUtil() {
    }
    /**
     * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。
     * @param target
     * @param mask
     * @param isHorizontal
     */
    ScrollBarViewUtil.getClampedTargetPosition = function (target, mask, isHorizontal) {
        var getSize = SliderView_2.SliderViewUtil.getSize;
        var targetSize = getSize(target, isHorizontal);
        var maskSize = getSize(mask, isHorizontal);
        var minPos = Math.min(-targetSize + maskSize, 0.0);
        var pos = SliderView_2.SliderViewUtil.getPosition(target, isHorizontal);
        return SliderView_2.SliderViewUtil.clamp(pos, 0, minPos);
    };
    /**
     * ターゲットコンテンツの位置を、マスク領域内に丸め込む。
     * @param target
     * @param mask
     * @param position
     * @param isHorizontal
     */
    ScrollBarViewUtil.clampTargetPosition = function (target, mask, position, isHorizontal) {
        SliderView_2.SliderViewUtil.setPosition(target, isHorizontal, position);
        var clampedPos = this.getClampedTargetPosition(target, mask, isHorizontal);
        SliderView_2.SliderViewUtil.setPosition(target, isHorizontal, clampedPos);
    };
    return ScrollBarViewUtil;
}());
exports.ScrollBarViewUtil = ScrollBarViewUtil;
