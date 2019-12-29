/**
 * スライダーを初期化する際のオプション
 */
import { DisplayObject, Graphics } from "pixi.js";
export declare class SliderViewOption {
    minPosition: number;
    maxPosition: number;
    rate?: number;
    base: DisplayObject;
    button: DisplayObject;
    mask?: Graphics;
    bar?: DisplayObject;
    isHorizontal?: boolean;
    static init(option: SliderViewOption): SliderViewOption;
    protected static check(option: SliderViewOption): void;
    private static checkParts;
}
//# sourceMappingURL=SliderViewOption.d.ts.map