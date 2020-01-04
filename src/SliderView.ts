import { DisplayObject, Container, Graphics, Point } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";

import { SliderEventContext, SliderEventType } from "./SliderEvent";
import { SliderViewOption } from "./SliderViewOption";
import IPoint = PIXI.IPoint;

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

  protected _minPosition: number; // スライダーボタンの座標の最小値
  protected _maxPosition: number; // スライダーボタンの座標の最大値
  private _isHorizontal: boolean = true;
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

  /**
   * @param {SliderViewOption} option
   */
  constructor(option: SliderViewOption) {
    super();
    this.init(option);
    this.interactive = true;
  }

  /**
   * 初期化処理
   * @param {SliderViewOption} option
   */
  protected init(option: SliderViewOption): void {
    option = SliderViewOption.init(option);

    this.base = option.base;
    this._bar = this.initBarAndMask(option.bar);
    this.slideButton = option.button;
    this._barMask = this.initBarAndMask(option.mask) as Graphics;
    if (this._bar && this._barMask) this._bar.mask = this._barMask;

    this._minPosition = option.minPosition;
    this._maxPosition = option.maxPosition;
    this._isHorizontal = option.isHorizontal;
    this._rate = option.rate;

    this.changeRate(this._rate);
  }

  private addChildParts(obj: DisplayObject): void {
    if (!obj) return;
    if (obj.parent) obj.parent.removeChild(obj);
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

    this.emit(SliderEventType.CHANGE, new SliderEventContext(this.rate));
  }

  /**
   * スライダーのドラッグを開始する
   * @param {Object} e
   */
  private startMove = (e: any) => {
    this.onPressedSliderButton(e as InteractionEvent);
  };

  protected onPressedSliderButton(e: InteractionEvent): void {
    this.isDragging = true;
    const target: DisplayObject = e.currentTarget as DisplayObject;

    const global = e.data.global;
    const localPos = this.toLocal(new Point(global.x, global.y));
    this.dragStartPos = new Point(localPos.x - target.x, localPos.y - target.y);

    this.on("pointermove", this.moveSlider);
    this.on("pointerup", this.moveSliderFinish);
    this.on("pointerupoutside", this.moveSliderFinish);
  }

  /**
   * スライダーのドラッグ中の処理
   * @param e
   */
  private moveSlider = (e: any) => {
    const evt = e as InteractionEvent;
    const mousePos: number = this.limitSliderButtonPosition(evt);

    this.updateParts(mousePos);
    this._rate = this.convertPixelToRate(mousePos);

    this.emit(SliderEventType.CHANGE, new SliderEventContext(this.rate));
  };

  /**
   * スライダーボタンの位置を制限する関数
   * @return 制限で切り落とされたスライダーボタンの座標値
   */
  protected limitSliderButtonPosition(evt: InteractionEvent): number {
    let mousePos: number = this.getMousePosition(this, evt);
    return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);
  }

  /**
   * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
   * moveSliderの内部処理
   * @param	mousePos
   */
  private updateParts(mousePos: number): void {
    //バーマスクがなければ、バー自体を伸縮する
    if (this._bar && !this._barMask) {
      SliderViewUtil.setSize(
        this._bar,
        this._isHorizontal,
        Math.max(1.0, mousePos - this._minPosition)
      );
    }
    //バーマスクがあれば、マスクを伸縮する。
    if (this._barMask) {
      SliderViewUtil.setSize(
        this._barMask,
        this._isHorizontal,
        mousePos - SliderViewUtil.getPosition(this._barMask, this._isHorizontal)
      );
    }
    //ボタンの位置を更新する。
    if (this._slideButton) {
      SliderViewUtil.setPosition(
        this._slideButton,
        this._isHorizontal,
        mousePos
      );
    }
  }

  /**
   * スライダーのドラッグ終了時の処理
   * @param	e
   */
  private moveSliderFinish = (e: Object) => {
    this.isDragging = false;
    this.removeListener("pointermove", this.moveSlider);
    this.removeListener("pointerup", this.moveSliderFinish);
    this.emit(SliderEventType.CHANGE_FINISH, new SliderEventContext(this.rate));
  };

  /**
   * スライダーの地をクリックした際の処理
   * その位置までスライダーをジャンプする
   * @param evt
   */
  protected onPressBase(evt: InteractionEvent): void {
    this.dragStartPos = new Point();
    this.moveSlider(evt);
    this.emit(SliderEventType.CHANGE_FINISH, new SliderEventContext(this.rate));
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
    evt: InteractionEvent
  ): number {
    const global = evt.data.global;
    const localPos = displayObj.toLocal(new Point(global.x, global.y));

    if (this._isHorizontal) {
      return localPos.x - this.dragStartPos.x;
    } else {
      return localPos.y - this.dragStartPos.y;
    }
  }

  private set base(value: DisplayObject) {
    if (!value) return;

    this._base = value;
    this._base.interactive = true;
    this._base.on("pointertap", e => {
      this.onPressBase(e);
    });
    this.addChildParts(value);
  }

  private initBarAndMask(value: DisplayObject): DisplayObject {
    if (value == null) return;
    value.interactive = false;
    this.addChildParts(value);
    return value;
  }

  private set slideButton(value: DisplayObject) {
    if (!value) return;

    this._slideButton = value;
    this._slideButton.on("pointerdown", this.startMove);
    this._slideButton.interactive = true;
    this.addChildParts(value);
  }

  get rate() {
    return this._rate;
  }

  /**
   * このインスタンスを破棄する。
   * @param	e
   */
  public dispose = (e?: any) => {
    this.onDisposeFunction(e as Event);
  };

  /**
   * 全てのDisplayObjectとEventListenerを解除する。
   * @param {Event} e
   */
  protected onDisposeFunction(e?: Event): void {
    this.removeAllListeners();
    this._base.removeAllListeners();
    this._slideButton.removeAllListeners();
    this.removeChildren();
  }
}

export class SliderViewUtil {
  /**
   * スライダーの座標から、スライダーの割合を取得する
   */
  public static convertPixelToRate(
    pixel: number,
    max: number,
    min: number
  ): number {
    let rate: number = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;
    return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);
  }

  public static convertRateToPixel(
    rate: number,
    max: number,
    min: number
  ): number {
    let pix: number = ((max - min) * rate) / SliderView.MAX_RATE + min;
    return SliderViewUtil.clamp(pix, max, min);
  }

  /**
   * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
   * @return displayObjの座標値。単位ピクセル
   */
  public static getPosition(
    displayObj: DisplayObject | IPoint,
    isHorizontal: boolean
  ): number {
    if (isHorizontal) {
      return displayObj.x;
    } else {
      return displayObj.y;
    }
  }

  /**
   * ディスプレイオブジェクトにスクロール方向の座標地を設定する
   */
  public static setPosition(
    displayObj: DisplayObject,
    isHorizontal: boolean,
    position: number
  ): void {
    if (!displayObj) return;

    if (isHorizontal) {
      displayObj.x = position;
    } else {
      displayObj.y = position;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
   */
  public static getSize(
    displayObj: DisplayObject,
    isHorizontal: boolean
  ): number {
    const size = displayObj.getLocalBounds();
    if (isHorizontal) {
      return size.width * displayObj.scale.x;
    } else {
      return size.height * displayObj.scale.y;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を設定する。単位は0.0 ~ 1.0の割合。
   */
  public static setSize(
    displayObj: DisplayObject,
    isHorizontal: boolean,
    amount: number
  ): void {
    const size = displayObj.getLocalBounds();

    if (isHorizontal) {
      displayObj.scale.x = amount / size.width;
    } else {
      displayObj.scale.y = amount / size.height;
    }
  }

  public static clamp(num: number, max: number, min: number): number {
    num = Math.max(num, min);
    num = Math.min(num, max);
    return num;
  }
}
