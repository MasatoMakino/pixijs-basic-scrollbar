/**
 * スライダーを初期化する際のオプション
 */
import {DisplayObject, Graphics} from "pixi.js";

export declare class SliderViewOption {
    /**
     * スライダーボタンの座標の最小値
     * @default 0.0
     */
    minPosition?: number;
    maxPosition: number;
    /**
     * @default 0.0
     */
    rate?: number;
    base: DisplayObject;
    /**
     * スライドボタン
     */
    button: DisplayObject;
    mask?: Graphics;
    bar?: DisplayObject;
    /**
     * 水平スクロールか否か
     * @default true
     */
    isHorizontal?: boolean;
    static init(option: SliderViewOption): SliderViewOption;
    protected static check(option: SliderViewOption): void;
    private static checkParts;
}
//# sourceMappingURL=SliderViewOption.d.ts.map