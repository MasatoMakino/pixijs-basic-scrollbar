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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarContents = void 0;
var PIXI = __importStar(require("pixi.js"));
var SliderView_1 = require("../SliderView");
var ScrollBarContentsEventType_1 = require("./ScrollBarContentsEventType");
/**
 * スクロールバーで操作するコンテンツ
 */
var ScrollBarContents = /** @class */ (function (_super) {
    __extends(ScrollBarContents, _super);
    /**
     * コンストラクタ
     *
     * @param target スクロール操作を受けるコンテンツ
     * @param mask targetを切り抜くマスク
     * @param container targetおよびmaskを格納する親コンテナ
     */
    function ScrollBarContents(target, mask, container) {
        var _this = _super.call(this) || this;
        _this.container = container;
        _this._target = target;
        _this._mask = mask;
        ScrollBarContents.init(_this);
        return _this;
    }
    Object.defineProperty(ScrollBarContents.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
            this.emit(ScrollBarContentsEventType_1.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScrollBarContents.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this._mask = value;
            this.emit(ScrollBarContentsEventType_1.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    ScrollBarContents.init = function (scrollBarContents) {
        if (scrollBarContents._target.mask !== scrollBarContents._mask) {
            scrollBarContents._target.mask = scrollBarContents._mask;
        }
        var addToContainer = function (displayObject) {
            var _a;
            if (displayObject.parent === scrollBarContents.container)
                return;
            (_a = displayObject.parent) === null || _a === void 0 ? void 0 : _a.removeChild(displayObject);
            scrollBarContents.container.addChild(displayObject);
        };
        addToContainer(scrollBarContents._target);
        addToContainer(scrollBarContents._mask);
    };
    /**
     * 現状のスクロール位置を取得する。単位rate
     * 0.0でコンテンツはTOP, 1.0でBOTTOMに位置している。
     *
     * @param isHorizontal
     */
    ScrollBarContents.prototype.getScrollPositionAsRate = function (isHorizontal) {
        var getPos = SliderView_1.SliderViewUtil.getPosition;
        var zeroPos = getPos(this.mask, isHorizontal);
        var contentsPos = getPos(this.target, isHorizontal);
        var contentsPositionDif = zeroPos - contentsPos;
        var movableRange = this.getMovableRange(isHorizontal);
        return (contentsPositionDif / movableRange) * SliderView_1.SliderView.MAX_RATE;
    };
    /**
     * スクロールの最大可動領域を取得する。単位px
     *
     * @param isHorizontal
     * @private
     */
    ScrollBarContents.prototype.getMovableRange = function (isHorizontal) {
        var getSize = SliderView_1.SliderViewUtil.getSize;
        var targetSize = getSize(this._target, isHorizontal);
        var maskSize = getSize(this._mask, isHorizontal);
        return targetSize - maskSize;
    };
    /**
     * コンテンツを、指定されたrateの位置までスクロールする
     *
     * @param rate
     * @param isHorizontal
     */
    ScrollBarContents.prototype.scroll = function (rate, isHorizontal) {
        var getPos = SliderView_1.SliderViewUtil.getPosition;
        var zeroPos = getPos(this._mask, isHorizontal);
        var movableRange = this.getMovableRange(isHorizontal);
        var contentsPos = zeroPos - movableRange * (rate / SliderView_1.SliderView.MAX_RATE);
        SliderView_1.SliderViewUtil.setPosition(this._target, isHorizontal, contentsPos);
    };
    /**
     * コンテンツが表示領域にどれだけ表示されているかの比率を取得する。
     * この比率は、スクロールバーボタンのスケールとなる。
     *
     * 例 : コンテンツサイズが200、表示領域が100なら0.5
     * コンテンツがすべて表示されているなら1.0
     *
     * @param isHorizontal
     * @return 0.0 ~ 1.0
     */
    ScrollBarContents.prototype.getDisplayRate = function (isHorizontal) {
        var getSize = SliderView_1.SliderViewUtil.getSize;
        var contentsSize = getSize(this.target, isHorizontal);
        var maskSize = getSize(this.mask, isHorizontal);
        return SliderView_1.SliderViewUtil.clamp(maskSize / contentsSize, SliderView_1.SliderView.MAX_RATE, 0.0);
    };
    ScrollBarContents.prototype.dispose = function () {
        this.removeAllListeners();
        this.container = null;
        this._mask = null;
        this._target = null;
    };
    return ScrollBarContents;
}(PIXI.utils.EventEmitter));
exports.ScrollBarContents = ScrollBarContents;
