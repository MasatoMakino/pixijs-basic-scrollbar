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
    return ScrollBarViewUtil;
}());
exports.ScrollBarViewUtil = ScrollBarViewUtil;
