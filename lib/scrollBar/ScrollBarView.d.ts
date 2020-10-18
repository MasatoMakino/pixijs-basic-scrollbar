import {InteractionEvent} from "@pixi/interaction";
import {SliderView} from "../SliderView";
import {SliderViewOption} from "../SliderViewOption";
import {InertialScrollManager} from "./InertialScrollManager";
import {MouseWheelScrollManager} from "./MouseWheelScrollManager";
import {ScrollBarContents} from "./ScrollBarContents";

/**
 * スクロールバーを表すクラスです。
 *
 * このクラスは、スライダーに以下の機能を追加したものです。
 *
 * 		1.コンテンツサイズに合わせた、スクロールバーの伸縮
 * 		2.スクロールバーの伸縮にあわせた、移動範囲の制限
 * 		3.スクロールバーの伸縮にあわせた、移動値の取得
 */
export declare class ScrollBarView extends SliderView {
    get contents(): ScrollBarContents;
    private _contents;
    get autoHide(): boolean;
    set autoHide(value: boolean);
    private _autoHide;
    wheelManager: MouseWheelScrollManager;
    inertialManager: InertialScrollManager;
    constructor(option: SliderViewOption, scrollContents: ScrollBarContents);
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    protected limitSliderButtonPosition(evt: InteractionEvent): number;
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    protected convertRateToPixel(rate: number): number;
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    protected convertPixelToRate(pixel: number): number;
    /**
     * スライダーボタンの可動範囲を取得する。単位ピクセル
     */
    private getRangeOfSliderButtonPosition;
    /**
     * スライダーボタンのサイズ。
     * @returns {number}
     */
    get slideButtonSize(): number;
    /**
     * スクロールバーのボタンサイズ及び位置を更新する。
     * コンテンツサイズが変更された場合の更新にも利用する。
     */
    updateSlider(): void;
    /**
     * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
     * その割合でスライダーの位置を更新する。
     */
    protected updateSliderPosition(): void;
    private isUpdatableSliderSize;
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    protected updateSliderSize(): void;
    /**
     * autoHideの条件に一致するかを判定し、表示を切り替える。
     * @private
     */
    private updateSliderVisible;
    /**
     * autoHideの条件に一致するかを判定する
     */
    protected get isHidden(): boolean;
    /**
     * スライダーイベントに応じてコンテンツをスクロールする
     * @param {Object} e
     */
    updateContentsPosition: (e: any) => void;
    /**
     * rate値を元にコンテンツをスクロールする。
     * @param {number} rate
     */
    protected updateContentsPositionWithRate(rate: number): void;
    protected onPressedSliderButton(e: any): void;
    protected onPressBase(evt: InteractionEvent): void;
    protected onDisposeFunction(e?: Event): void;
}
//# sourceMappingURL=ScrollBarView.d.ts.map