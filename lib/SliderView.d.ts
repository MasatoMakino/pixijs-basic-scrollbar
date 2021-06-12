import { InteractionEvent } from "@pixi/interaction";
import * as PIXI from "pixi.js";
import { Container, DisplayObject, Graphics, Point, Rectangle } from "pixi.js";
import { SliderViewOption } from "./SliderViewOption";
import IPoint = PIXI.IPoint;
/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。
 * hitAreaでサイズをあらかじめ与えてください。
 */
export declare class SliderView extends Container {
    protected _base: DisplayObject;
    protected _bar?: DisplayObject;
    protected _barMask?: Graphics;
    protected _slideButton: DisplayObject;
    protected _minPosition: number;
    protected _maxPosition: number;
    private _isHorizontal;
    get isHorizontal(): boolean;
    protected dragStartPos: Point;
    /**
     * 現在のスライダーの位置の割合。
     * MIN 0.0 ~ SliderView.MAX_RATE。
     */
    private _rate;
    static readonly MAX_RATE: number;
    private isDragging;
    /**
     * @param {SliderViewOption} option
     */
    constructor(option: SliderViewOption);
    /**
     * 初期化処理
     * @param {SliderViewOption} option
     */
    protected init(option: SliderViewOption): void;
    private addChildParts;
    /**
     * スライダーの位置を変更する
     * @param	rate	スライダーの位置 MIN 0.0 ~ MAX 100.0
     */
    changeRate(rate: number): void;
    /**
     * スライダーのドラッグを開始する
     * @param {Object} e
     */
    private startMove;
    protected onPressedSliderButton(e: InteractionEvent): void;
    /**
     * スライダーのドラッグ中の処理
     * @param e
     */
    private moveSlider;
    protected onMoveSlider(e: InteractionEvent): void;
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。
     */
    protected limitSliderButtonPosition(evt: InteractionEvent): number;
    /**
     * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
     * moveSliderの内部処理
     * @param	mousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。
     */
    private updateParts;
    /**
     * スライダーのドラッグ終了時の処理
     * @param	e
     */
    private moveSliderFinish;
    /**
     * スライダーの地をクリックした際の処理
     * その位置までスライダーをジャンプする
     * @param evt
     */
    protected onPressBase(evt: InteractionEvent): void;
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
     * ドラッグ中のマウス座標を取得する。
     * limitSliderButtonPosition内の処理。
     */
    protected getMousePosition(displayObj: DisplayObject, evt: InteractionEvent): number;
    private set base(value);
    private initBarAndMask;
    private set slideButton(value);
    get rate(): number;
    /**
     * このインスタンスを破棄する。
     * @param	e
     */
    dispose: (e?: any) => void;
    /**
     * 全てのDisplayObjectとEventListenerを解除する。
     * @param {Event} e
     */
    protected onDisposeFunction(e?: Event): void;
}
export declare class SliderViewUtil {
    /**
     * スライダーの座標から、スライダーの割合を取得する
     */
    static convertPixelToRate(pixel: number, max: number, min: number): number;
    static convertRateToPixel(rate: number, max: number, min: number): number;
    /**
     * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
     * @return displayObjの座標値。単位ピクセル
     */
    static getPosition(displayObj: DisplayObject | IPoint, isHorizontal: boolean): number;
    /**
     * ディスプレイオブジェクトにスクロール方向の座標値を設定する
     */
    static setPosition(displayObj: DisplayObject, isHorizontal: boolean, position: number): void;
    /**
     * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
     */
    static getSize(displayObj: DisplayObject, isHorizontal: boolean): number;
    /**
     * スクロール方向の高さ、もしくは幅を設定する。
     * @param displayObj
     * @param isHorizontal
     * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px
     */
    static setSize(displayObj: DisplayObject, isHorizontal: boolean, amount: number): void;
    static clamp(num: number, max: number, min: number): number;
    static getContentsBounds(displayObj: DisplayObject): Rectangle;
}
//# sourceMappingURL=SliderView.d.ts.map