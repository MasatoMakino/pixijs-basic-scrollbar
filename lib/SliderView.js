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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderViewUtil = exports.SliderView = void 0;
var pixi_js_1 = require("pixi.js");
var SliderEvent_1 = require("./SliderEvent");
var SliderViewOption_1 = require("./SliderViewOption");
/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。
 * hitAreaでサイズをあらかじめ与えてください。
 */
var SliderView = /** @class */ (function (_super) {
    __extends(SliderView, _super);
    /**
     * @param {SliderViewOption} option
     */
    function SliderView(option) {
        var _this = _super.call(this) || this;
        _this._isHorizontal = true;
        _this.dragStartPos = new pixi_js_1.Point();
        _this.isDragging = false; // 現在スライド中か否か
        /**
         * スライダーのドラッグを開始する
         * @param {Object} e
         */
        _this.startMove = function (e) {
            _this.onPressedSliderButton(e);
        };
        /**
         * スライダーのドラッグ中の処理
         * @param e
         */
        _this.moveSlider = function (e) {
            var evt = e;
            var mousePos = _this.limitSliderButtonPosition(evt);
            _this.updateParts(mousePos);
            _this._rate = _this.convertPixelToRate(mousePos);
            _this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(_this.rate));
        };
        /**
         * スライダーのドラッグ終了時の処理
         * @param	e
         */
        _this.moveSliderFinish = function (e) {
            _this.isDragging = false;
            _this._slideButton.off("pointermove", _this.moveSlider);
            _this._slideButton.off("pointerup", _this.moveSliderFinish);
            _this._slideButton.off("pointerupoutside", _this.moveSliderFinish);
            _this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(_this.rate));
        };
        /**
         * このインスタンスを破棄する。
         * @param	e
         */
        _this.dispose = function (e) {
            _this.onDisposeFunction(e);
        };
        _this.init(option);
        _this.interactive = true;
        return _this;
    }
    Object.defineProperty(SliderView.prototype, "isHorizontal", {
        get: function () {
            return this._isHorizontal;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初期化処理
     * @param {SliderViewOption} option
     */
    SliderView.prototype.init = function (option) {
        option = SliderViewOption_1.SliderViewOption.init(option);
        this.base = option.base;
        this._bar = this.initBarAndMask(option.bar);
        this.slideButton = option.button;
        this._barMask = this.initBarAndMask(option.mask);
        if (this._bar && this._barMask)
            this._bar.mask = this._barMask;
        this._minPosition = option.minPosition;
        this._maxPosition = option.maxPosition;
        this._isHorizontal = option.isHorizontal;
        this._rate = option.rate;
        this.changeRate(this._rate);
    };
    SliderView.prototype.addChildParts = function (obj) {
        var _a;
        if (!obj)
            return;
        (_a = obj.parent) === null || _a === void 0 ? void 0 : _a.removeChild(obj);
        this.addChild(obj);
    };
    /**
     * スライダーの位置を変更する
     * @param	rate	スライダーの位置 MIN 0.0 ~ MAX 100.0
     */
    SliderView.prototype.changeRate = function (rate) {
        //ドラッグ中は外部からの操作を無視する。
        if (this.isDragging)
            return;
        this._rate = rate;
        var pos = this.convertRateToPixel(this._rate);
        this.updateParts(pos);
        this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(this.rate));
    };
    SliderView.prototype.onPressedSliderButton = function (e) {
        this.isDragging = true;
        var target = e.currentTarget;
        var localPos = this.toLocal(e.data.global);
        this.dragStartPos = new pixi_js_1.Point(localPos.x - target.x, localPos.y - target.y);
        this._slideButton.on("pointermove", this.moveSlider);
        this._slideButton.on("pointerup", this.moveSliderFinish);
        this._slideButton.on("pointerupoutside", this.moveSliderFinish);
    };
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。
     */
    SliderView.prototype.limitSliderButtonPosition = function (evt) {
        var mousePos = this.getMousePosition(this, evt);
        return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);
    };
    /**
     * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
     * moveSliderの内部処理
     * @param	mousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。
     */
    SliderView.prototype.updateParts = function (mousePos) {
        var _this = this;
        var stretch = function (target) {
            SliderViewUtil.setSize(target, _this._isHorizontal, mousePos - SliderViewUtil.getPosition(target, _this._isHorizontal));
        };
        //バーマスクがなければ、バー自体を伸縮する
        if (this._bar && !this._barMask) {
            stretch(this._bar);
        }
        //バーマスクがあれば、マスクを伸縮する。
        if (this._barMask) {
            stretch(this._barMask);
        }
        //ボタンの位置を更新する。
        SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);
    };
    /**
     * スライダーの地をクリックした際の処理
     * その位置までスライダーをジャンプする
     * @param evt
     */
    SliderView.prototype.onPressBase = function (evt) {
        this.dragStartPos = new pixi_js_1.Point();
        this.moveSlider(evt);
        this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(this.rate));
    };
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    SliderView.prototype.convertRateToPixel = function (rate) {
        return SliderViewUtil.convertRateToPixel(rate, this._maxPosition, this._minPosition);
    };
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    SliderView.prototype.convertPixelToRate = function (pixel) {
        return SliderViewUtil.convertPixelToRate(pixel, this._maxPosition, this._minPosition);
    };
    /**
     * ドラッグ中のマウス座標を取得する。
     * limitSliderButtonPosition内の処理。
     */
    SliderView.prototype.getMousePosition = function (displayObj, evt) {
        var localPos = displayObj.toLocal(evt.data.global);
        if (this._isHorizontal) {
            return localPos.x - this.dragStartPos.x;
        }
        else {
            return localPos.y - this.dragStartPos.y;
        }
    };
    Object.defineProperty(SliderView.prototype, "base", {
        set: function (value) {
            var _this = this;
            this._base = value;
            this._base.interactive = true;
            this._base.on("pointertap", function (e) {
                _this.onPressBase(e);
            });
            this.addChildParts(value);
        },
        enumerable: false,
        configurable: true
    });
    SliderView.prototype.initBarAndMask = function (value) {
        if (value == null)
            return;
        value.interactive = false;
        this.addChildParts(value);
        return value;
    };
    Object.defineProperty(SliderView.prototype, "slideButton", {
        set: function (value) {
            this._slideButton = value;
            this._slideButton.on("pointerdown", this.startMove);
            this._slideButton.interactive = true;
            this.addChildParts(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SliderView.prototype, "rate", {
        get: function () {
            return this._rate;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 全てのDisplayObjectとEventListenerを解除する。
     * @param {Event} e
     */
    SliderView.prototype.onDisposeFunction = function (e) {
        this.removeAllListeners();
        this._base.removeAllListeners();
        this._slideButton.removeAllListeners();
        this.removeChildren();
    };
    SliderView.MAX_RATE = 1.0;
    return SliderView;
}(pixi_js_1.Container));
exports.SliderView = SliderView;
var SliderViewUtil = /** @class */ (function () {
    function SliderViewUtil() {
    }
    /**
     * スライダーの座標から、スライダーの割合を取得する
     */
    SliderViewUtil.convertPixelToRate = function (pixel, max, min) {
        var rate = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;
        return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);
    };
    SliderViewUtil.convertRateToPixel = function (rate, max, min) {
        var pix = ((max - min) * rate) / SliderView.MAX_RATE + min;
        return SliderViewUtil.clamp(pix, max, min);
    };
    /**
     * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
     * @return displayObjの座標値。単位ピクセル
     */
    SliderViewUtil.getPosition = function (displayObj, isHorizontal) {
        if (isHorizontal) {
            return displayObj.x;
        }
        else {
            return displayObj.y;
        }
    };
    /**
     * ディスプレイオブジェクトにスクロール方向の座標値を設定する
     */
    SliderViewUtil.setPosition = function (displayObj, isHorizontal, position) {
        if (!displayObj)
            return;
        if (isHorizontal) {
            displayObj.x = position;
        }
        else {
            displayObj.y = position;
        }
    };
    /**
     * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
     */
    SliderViewUtil.getSize = function (displayObj, isHorizontal) {
        var size = displayObj.getLocalBounds();
        if (isHorizontal) {
            return size.width * displayObj.scale.x;
        }
        else {
            return size.height * displayObj.scale.y;
        }
    };
    /**
     * スクロール方向の高さ、もしくは幅を設定する。
     * @param displayObj
     * @param isHorizontal
     * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px
     */
    SliderViewUtil.setSize = function (displayObj, isHorizontal, amount) {
        var size = displayObj.getLocalBounds();
        if (isHorizontal) {
            displayObj.scale.x = amount / size.width;
        }
        else {
            displayObj.scale.y = amount / size.height;
        }
    };
    SliderViewUtil.clamp = function (num, max, min) {
        num = Math.max(num, min);
        num = Math.min(num, max);
        return num;
    };
    return SliderViewUtil;
}());
exports.SliderViewUtil = SliderViewUtil;
