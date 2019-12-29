import { DisplayObject, Container, Graphics, Point } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";
import { SliderViewOption } from "./SliderViewOption";
/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetBounds関数を使用しています。
 * shapeおよびContainerクラスでは、getBoundsの自動計測が効かない場合があります。
 * setBounds関数でサイズをあらかじめ与えてください。
 */
export declare class SliderView extends Container {
    protected _base: DisplayObject;
    protected _bar?: DisplayObject;
    protected _barMask?: Graphics;
    protected _slideButton: DisplayObject;
    protected _minPosition: number;
    protected _maxPosition: number;
    protected isHorizontal: boolean;
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
    private addChildMe;
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
    /**
     * スライダーのドラッグ中の処理
     * @param e
     */
    private moveSlider;
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    protected limitSliderButtonPosition(evt: InteractionEvent): number;
    /**
     * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
     * moveSliderの内部処理
     * @param	mousePos
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
    protected changeRateToPixel(rate: number): number;
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    protected changePixelToRate(pixel: number): number;
    /**
     * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
     * @param	displayObj
     * @return
     */
    protected getPosition(displayObj: DisplayObject): number;
    /**
     * ディスプレイオブジェクトにスクロール方向の座標地を設定する
     * @param	displayObj
     * @param	position
     */
    protected setPosition(displayObj: DisplayObject, position: number): void;
    /**
     * スクロール方向のマウス座標を取得する
     * limitSliderButtonPosition内の処理
     * @param displayObj
     * @param evt
     * @return
     */
    protected getMousePosition(displayObj: DisplayObject, evt: InteractionEvent): number;
    /**
     * スクロール方向の高さ、もしくは幅を取得する
     * @param	displayObj
     * @return
     */
    protected getSize(displayObj: DisplayObject): number;
    /**
     * スクロール方向の高さ、もしくは幅を設定する
     * @param displayObj
     * @param {number} amount
     */
    protected setSize(displayObj: DisplayObject, amount: number): void;
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
//# sourceMappingURL=SliderView.d.ts.map