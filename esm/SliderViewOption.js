/**
 * スライダーを初期化する際のオプション
 */
import { SHAPES } from "pixi.js";
import { SliderView, SliderViewUtil } from "./SliderView";
export class SliderViewOption {
    static init(option) {
        var _a, _b, _c;
        if (option.rate != null) {
            option.rate = Math.max(0, option.rate);
            option.rate = Math.min(SliderView.MAX_RATE, option.rate);
        }
        (_a = option.minPosition) !== null && _a !== void 0 ? _a : (option.minPosition = 0.0);
        (_b = option.rate) !== null && _b !== void 0 ? _b : (option.rate = 0.0);
        (_c = option.isHorizontal) !== null && _c !== void 0 ? _c : (option.isHorizontal = true);
        this.check(option);
        return option;
    }
    static check(option) {
        this.checkParts(option.base, "base");
        this.checkParts(option.button, "button");
        this.checkParts(option.mask, "mask");
        this.checkParts(option.bar, "bar");
    }
    static checkParts(obj, targetName) {
        if (obj == null)
            return;
        const bounds = SliderViewUtil.getContentsBounds(obj);
        if (bounds.width === 0 &&
            bounds.height === 0 &&
            bounds.type === SHAPES.RECT) {
            throw new Error(`SliderView : ${targetName} 初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません。Containerを利用する場合はhitAreaを利用してバウンディングボックスを手動で設定してください。`);
        }
        if (obj.parent) {
            console.warn(`初期化オプションで指定されたパーツがすでに別の親にaddChildされています。SliderViewおよびScrollBarViewの構成パーツは同一のコンテナにaddChildされることを前提としています。`);
        }
    }
}
