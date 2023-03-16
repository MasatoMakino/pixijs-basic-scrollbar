import { Container, DisplayObject } from "@pixi/display";
import { FederatedPointerEvent } from "@pixi/events";
import { Graphics } from "@pixi/graphics";
import { Point } from "@pixi/math";
import { EventEmitter } from "@pixi/utils";
import {
  SliderEventContext,
  SliderEventTypes,
  SliderViewOption,
  SliderViewOptionUtil,
  SliderViewUtil,
} from "./";

/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。
 * hitAreaでサイズをあらかじめ与えてください。
 */

export class SliderView extends Container {
  protected _base: DisplayObject; // スライダーの地
  protected _bar?: DisplayObject; // スライドにあわせて表示されるバー

  protected _barMask?: Graphics; // バーのマスク
  protected _slideButton: DisplayObject; // スライドボタン
  protected _buttonRootContainer: Container | HTMLCanvasElement;
  get buttonRootContainer(): Container | HTMLCanvasElement {
    return this._buttonRootContainer;
  }

  protected _minPosition: number; // スライダーボタンの座標の最小値
  protected _maxPosition: number; // スライダーボタンの座標の最大値
  private readonly _isHorizontal: boolean = true;

  readonly canvas?: HTMLCanvasElement;

  get isHorizontal(): boolean {
    return this._isHorizontal;
  }

  protected dragStartPos: Point = new Point();
  /**
   * 現在のスライダーの位置の割合。
   * MIN 0.0 ~ SliderView.MAX_RATE。
   */
  private _rate: number;
  public static readonly MAX_RATE: number = 1.0;
  private isDragging: Boolean = false; // 現在スライド中か否か
  protected _sliderEventEmitter = new EventEmitter<SliderEventTypes>();
  get sliderEventEmitter(): EventEmitter<SliderEventTypes> {
    return this._sliderEventEmitter;
  }

  /**
   * @param option
   */
  constructor(option: SliderViewOption) {
    super();

    const initOption = SliderViewOptionUtil.init(option);

    this.canvas = initOption.canvas;
    this._base = this.initBase(initOption.base);
    this._bar = this.initBarAndMask(initOption?.bar);
    this._barMask = this.initBarAndMask(initOption?.mask) as Graphics;
    if (this._bar && this._barMask) this._bar.mask = this._barMask;

    this._slideButton = this.initSliderButton(initOption.button);
    this._buttonRootContainer = SliderView.getRootContainer(
      this.canvas,
      this._slideButton
    );

    this._minPosition = initOption.minPosition;
    this._maxPosition = initOption.maxPosition;
    this._isHorizontal = initOption.isHorizontal;
    this._rate = initOption.rate;

    this.changeRate(this._rate);
  }

  private addChildParts(obj?: DisplayObject): void {
    if (!obj) return;
    obj.parent?.removeChild(obj);
    this.addChild(obj);
  }

  /**
   * スライダーの位置を変更する
   * @param	rate	スライダーの位置 MIN 0.0 ~ MAX 100.0
   */
  public changeRate(rate: number): void {
    //ドラッグ中は外部からの操作を無視する。
    if (this.isDragging) return;

    this._rate = rate;
    const pos: number = this.convertRateToPixel(this._rate);
    this.updateParts(pos);

    this._sliderEventEmitter.emit(
      "slider_change",
      new SliderEventContext(this.rate)
    );
  }

  /**
   * スライダーのドラッグを開始する
   * @param {Object} e
   */
  private startMove = (e: FederatedPointerEvent) => {
    this.onPressedSliderButton(e as FederatedPointerEvent);
  };

  protected onPressedSliderButton(e: FederatedPointerEvent): void {
    this.isDragging = true;
    const target: DisplayObject = e.currentTarget as DisplayObject;

    const localPos = this.toLocal(e.global);
    this.dragStartPos = new Point(localPos.x - target.x, localPos.y - target.y);

    this._buttonRootContainer.addEventListener("pointermove", this.moveSlider);
    this._slideButton.on("pointerup", this.moveSliderFinish);
    this._slideButton.on("pointerupoutside", this.moveSliderFinish);
  }

  private static getRootContainer(
    canvas: HTMLCanvasElement | undefined,
    button: DisplayObject
  ): Container | HTMLCanvasElement {
    if (canvas) {
      return canvas;
    }

    let parent = button.parent;
    while (parent.parent) {
      parent = parent.parent;
    }
    return parent;
  }

  /**
   * スライダーのドラッグ中の処理
   * @param e
   */
  private moveSlider = (e: Event): void => {
    this.onMoveSlider(e as PointerEvent);
  };

  protected onMoveSlider(e: PointerEvent): void {
    const mousePos: number = this.limitSliderButtonPosition(e);

    this.updateParts(mousePos);
    this._rate = this.convertPixelToRate(mousePos);

    this._sliderEventEmitter.emit(
      "slider_change",
      new SliderEventContext(this.rate)
    );
  }

  /**
   * スライダーボタンの位置を制限する関数
   * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。
   */
  protected limitSliderButtonPosition(evt: PointerEvent): number {
    const mousePos: number = this.getMousePosition(this, evt);
    return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);
  }

  /**
   * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
   * moveSliderの内部処理
   * @param	mousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。
   */
  private updateParts(mousePos: number): void {
    const stretch = (target: DisplayObject) => {
      SliderViewUtil.setSize(
        target,
        this._isHorizontal,
        mousePos - SliderViewUtil.getPosition(target, this._isHorizontal)
      );
    };
    //バーマスクがなければ、バー自体を伸縮する
    if (this._bar && !this._barMask) {
      stretch(this._bar);
    }
    //バーマスクがあれば、マスクを伸縮する。
    if (this._barMask) {
      stretch(this._barMask);
    }
    //ボタンの位置を更新する。
    SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);
  }

  /**
   * スライダーのドラッグ終了時の処理
   */
  private moveSliderFinish = () => {
    this.isDragging = false;
    this._buttonRootContainer.removeEventListener(
      "pointermove",
      this.moveSlider
    );
    this._slideButton.off("pointerup", this.moveSliderFinish);
    this._slideButton.off("pointerupoutside", this.moveSliderFinish);
    this._sliderEventEmitter.emit(
      "slider_change_finished",
      new SliderEventContext(this.rate)
    );
  };

  /**
   * スライダーの地をクリックした際の処理
   * その位置までスライダーをジャンプする
   * @param evt
   */
  protected onPressBase(evt: PointerEvent): void {
    this.dragStartPos = new Point();
    this.moveSlider(evt);
    this._sliderEventEmitter.emit(
      "slider_change_finished",
      new SliderEventContext(this.rate)
    );
  }

  /**
   * スライダーの割合から、スライダーの位置を取得する
   * @param	rate
   * @return
   */
  protected convertRateToPixel(rate: number): number {
    return SliderViewUtil.convertRateToPixel(
      rate,
      this._maxPosition,
      this._minPosition
    );
  }

  /**
   * スライダーの座標から、スライダーの割合を取得する
   * @param	pixel
   * @return
   */
  protected convertPixelToRate(pixel: number): number {
    return SliderViewUtil.convertPixelToRate(
      pixel,
      this._maxPosition,
      this._minPosition
    );
  }

  /**
   * ドラッグ中のマウス座標を取得する。
   * limitSliderButtonPosition内の処理。
   */
  protected getMousePosition(
    displayObj: DisplayObject,
    evt: PointerEvent
  ): number {
    let localPos;
    if (evt instanceof FederatedPointerEvent) {
      localPos = displayObj.toLocal(evt.global);
    } else {
      localPos = displayObj.toLocal(new Point(evt.offsetX, evt.offsetY));
    }

    if (this._isHorizontal) {
      return localPos.x - this.dragStartPos.x;
    } else {
      return localPos.y - this.dragStartPos.y;
    }
  }

  private initBase(value: DisplayObject): DisplayObject {
    value.eventMode = "static";
    value.on("pointertap", (e) => {
      this.onPressBase(e);
    });
    this.addChildParts(value);
    return value;
  }

  private initBarAndMask(value?: DisplayObject): DisplayObject | undefined {
    if (value == null) return;
    value.eventMode = "none";
    this.addChildParts(value);
    return value;
  }

  private initSliderButton(value: DisplayObject): DisplayObject {
    value.on("pointerdown", this.startMove);
    value.eventMode = "static";
    this.addChildParts(value);
    return value;
  }

  get rate() {
    return this._rate;
  }

  /**
   * このインスタンスを破棄する。
   * @param	e
   */
  public dispose = (e?: Event) => {
    this.onDisposeFunction(e as Event);
  };

  /**
   * 全てのDisplayObjectとEventListenerを解除する。
   */
  protected onDisposeFunction(e?: Event): void {
    this.removeAllListeners();
    this._base.removeAllListeners();
    this._slideButton.removeAllListeners();
    this.removeChildren();
  }
}
