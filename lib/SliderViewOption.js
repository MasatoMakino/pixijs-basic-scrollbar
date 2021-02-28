"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderViewOption = void 0;
/**
 * スライダーを初期化する際のオプション
 */
var pixi_js_1 = require("pixi.js");
var SliderView_1 = require("./SliderView");
var SliderViewOption = /** @class */ (function () {
    function SliderViewOption() {
    }
    SliderViewOption.init = function (option) {
        var _a, _b, _c;
        if (option.rate != null) {
            option.rate = Math.max(0, option.rate);
            option.rate = Math.min(SliderView_1.SliderView.MAX_RATE, option.rate);
        }
        (_a = option.minPosition) !== null && _a !== void 0 ? _a : (option.minPosition = 0.0);
        (_b = option.rate) !== null && _b !== void 0 ? _b : (option.rate = 0.0);
        (_c = option.isHorizontal) !== null && _c !== void 0 ? _c : (option.isHorizontal = true);
        this.check(option);
        return option;
    };
    SliderViewOption.check = function (option) {
        this.checkParts(option.base, "base");
        this.checkParts(option.button, "button");
        this.checkParts(option.mask, "mask");
        this.checkParts(option.bar, "bar");
    };
    SliderViewOption.checkParts = function (obj, targetName) {
        if (obj == null)
            return;
        var bounds = SliderView_1.SliderViewUtil.getContentsBounds(obj);
        if (bounds.width === 0 &&
            bounds.height === 0 &&
            bounds.type === pixi_js_1.SHAPES.RECT) {
            throw new Error("SliderView : " + targetName + " \u521D\u671F\u5316\u30AA\u30D7\u30B7\u30E7\u30F3\u3067\u6307\u5B9A\u3055\u308C\u305FDisplayObject\u306B\u30D0\u30A6\u30F3\u30C7\u30A3\u30F3\u30B0\u30DC\u30C3\u30AF\u30B9\u304C\u5B58\u5728\u3057\u307E\u305B\u3093\u3002Container\u3092\u5229\u7528\u3059\u308B\u5834\u5408\u306FhitArea\u3092\u5229\u7528\u3057\u3066\u30D0\u30A6\u30F3\u30C7\u30A3\u30F3\u30B0\u30DC\u30C3\u30AF\u30B9\u3092\u624B\u52D5\u3067\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        }
        if (obj.parent) {
            console.warn("\u521D\u671F\u5316\u30AA\u30D7\u30B7\u30E7\u30F3\u3067\u6307\u5B9A\u3055\u308C\u305F\u30D1\u30FC\u30C4\u304C\u3059\u3067\u306B\u5225\u306E\u89AA\u306BaddChild\u3055\u308C\u3066\u3044\u307E\u3059\u3002SliderView\u304A\u3088\u3073ScrollBarView\u306E\u69CB\u6210\u30D1\u30FC\u30C4\u306F\u540C\u4E00\u306E\u30B3\u30F3\u30C6\u30CA\u306BaddChild\u3055\u308C\u308B\u3053\u3068\u3092\u524D\u63D0\u3068\u3057\u3066\u3044\u307E\u3059\u3002");
        }
    };
    return SliderViewOption;
}());
exports.SliderViewOption = SliderViewOption;
