import { SliderView } from "../SliderView";
import { SliderViewOption } from "../SliderViewOption";
import { DisplayObject } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";
import { MouseWheelScrollManager } from "./MouseWheelScrollManager";
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
    wheelManager: MouseWheelScrollManager;
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
    initSliderButton(): void;
    /**
     * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
     * その割合でスライダーの位置を更新する。
     */
    protected updateSliderPosition(): void;
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    protected updateSliderSize(): void;
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
    protected onPressedSliderButton(e: any): void;
    protected onPressBase(evt: InteractionEvent): void;
    get targetContents(): DisplayObject;
    set targetContents(value: DisplayObject);
    get contentsMask(): DisplayObject;
    set contentsMask(value: DisplayObject);
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
export declare class ScrollBarViewUtil {
    /**
     * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。
     * @param target
     * @param mask
     * @param isHorizontal
     */
    static getClampedTargetPosition(target: DisplayObject, mask: DisplayObject, isHorizontal: boolean): number;
    /**
     * ターゲットコンテンツの位置を、マスク領域内に丸め込む。
     * @param target
     * @param mask
     * @param position
     * @param isHorizontal
     */
    static clampTargetPosition(target: DisplayObject, mask: DisplayObject, position: number, isHorizontal: boolean): void;
}
//# sourceMappingURL=ScrollBarView.d.ts.map