import { SliderView } from "./SliderView";
import { SliderViewOption } from "./SliderViewOption";
import { DisplayObject } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";
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
export declare class ScrollBarView extends SliderView {
    protected _targetContents: DisplayObject;
    protected _contentsMask: DisplayObject;
    autoHide: boolean;
    constructor(option: SliderViewOption, scrollOption: ScrollBarViewInitOption);
    /**
     * 初期化処理
     * スライダーボタンの位置の初期化に加え、サイズの初期化も行う
     * @param {SliderViewOption} option
     */
    protected init(option: SliderViewOption): void;
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
    protected changeRateToPixel(rate: number): number;
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    protected changePixelToRate(pixel: number): number;
    /**
     * スライダーボタンのサイズ。
     * @returns {number}
     */
    get slideButtonSize(): number;
    /**
     * スクロールバーのボタンサイズ及び位置を更新する。
     * コンテンツサイズが変更された場合の更新にも利用する。
     */
    initSliderButtonSize(): void;
    protected initSliderPosition(): void;
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    protected updateSlideButtonSize(): void;
    /**
     * autoHideの条件に一致するかを判定する
     */
    protected get isHide(): boolean;
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
    protected onPressBase(evt: InteractionEvent): void;
    get targetContents(): DisplayObject;
    protected setTargetContents(value: DisplayObject): void;
    get contentsMask(): DisplayObject;
    protected setContentsMask(value: DisplayObject): void;
    protected onDisposeFunction(e?: Event): void;
}
/**
 * スクロールバーの初期化時に必須となる項目をまとめたオブジェクト
 * スクロール対象とスクロールエリアのマスクを指定する。
 */
export declare class ScrollBarViewInitOption {
    targetContents: DisplayObject;
    contentsMask: DisplayObject;
    static check(option: ScrollBarViewInitOption): void;
}
//# sourceMappingURL=ScrollBarView.d.ts.map