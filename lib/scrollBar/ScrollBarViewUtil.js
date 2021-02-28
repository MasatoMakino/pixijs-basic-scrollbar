"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarViewUtil = void 0;
var SliderView_1 = require("../SliderView");
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
        var getSize = SliderView_1.SliderViewUtil.getSize;
        var targetSize = getSize(target, isHorizontal);
        var maskSize = getSize(mask, isHorizontal);
        var minPos = Math.min(-targetSize + maskSize, 0.0);
        var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);
        return SliderView_1.SliderViewUtil.clamp(pos, 0, minPos);
    };
    /**
     * ターゲットコンテンツの位置を、マスク領域内に丸め込む。
     * @param target
     * @param mask
     * @param position
     * @param isHorizontal
     */
    ScrollBarViewUtil.clampTargetPosition = function (target, mask, position, isHorizontal) {
        SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, position);
        var clampedPos = this.getClampedTargetPosition(target, mask, isHorizontal);
        SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, clampedPos);
    };
    ScrollBarViewUtil.getRatioOfOrigin = function (displayObj, isHorizontal) {
        var bounds = SliderView_1.SliderViewUtil.getContentsBounds(displayObj);
        var size = isHorizontal ? bounds.width : bounds.height;
        var position = isHorizontal ? bounds.x : bounds.y;
        var ratio = position / size;
        if (ratio > 0) {
            console.warn(displayObj.name + " : \u30DC\u30BF\u30F3\u30B5\u30A4\u30BA\u304C\u4E0D\u9069\u5207\u3067\u3059\u3002\u30DC\u30BF\u30F3\u306E\u77E9\u5F62\u5185\u306B\u539F\u70B9\u304C\u53CE\u307E\u3063\u3066\u3044\u307E\u305B\u3093\u3002\u30B9\u30AF\u30ED\u30FC\u30EB\u30D0\u30FC\u30DC\u30BF\u30F3\u306F\u539F\u70B9\u3092\u56F2\u3080\u77E9\u5F62\u3068\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        }
        return ratio;
    };
    return ScrollBarViewUtil;
}());
exports.ScrollBarViewUtil = ScrollBarViewUtil;
