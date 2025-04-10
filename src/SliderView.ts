import {
  Container,
  FederatedPointerEvent,
  Graphics,
  Point,
  EventEmitter,
} from "pixi.js";
import {
  SliderEventContext,
  SliderEventTypes,
  SliderViewOption,
  SliderViewOptionUtil,
  SliderViewUtil,
} from "./index.js";
import { FederatedWheelEvent } from "pixi.js";

/**
 * スライダー用クラスです
 *
 * 使用上の注意 :
 * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。
 * hitAreaでサイズをあらかじめ与えてください。
 */

export class SliderView extends Container {
  protected readonly _base: Container; // スライダーの地
  protected readonly _bar?: Container; // スライドにあわせて表示されるバー

  protected readonly _barMask?: Graphics; // バーのマスク
  protected readonly _slideButton: Container; // スライドボタン
  readonly buttonRootContainer: Container | HTMLCanvasElement;

  protected _minPosition: number; // スライダーボタンの座標の最小値
  protected _maxPosition: number; // スライダーボタンの座標の最大値
  readonly isHorizontal: boolean = true;
  wheelSpeed: number = 0.0003;

  readonly canvas?: HTMLCanvasElement;

  protected readonly dragStartPos: Point = new Point();
  /**
   * 現在のスライダーの位置の割合。
   * MIN 0.0 ~ SliderView.MAX_RATE。
   */
  private _rate: number;
  get rate() {
    return this._rate;
  }
  public static readonly MAX_RATE: number = 1.0;
  private activePointerId: number | null = null; // ドラッグ操作中のポインターID
  readonly sliderEventEmitter = new EventEmitter<SliderEventTypes>();

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
    this.buttonRootContainer = SliderViewUtil.getRootContainer(
      this.canvas,
      this._slideButton,
    );

    this._minPosition = initOption.minPosition;
    this._maxPosition = initOption.maxPosition;
    this.isHorizontal = initOption.isHorizontal;
    this._rate = initOption.rate;

    this.changeRate(this._rate);
  }

  /**
   * スライダーの位置を変更する
   * @param	rate	スライダーの位置 MIN 0.0 ~ MAX [SliderView.MAX_RATE]
   */
  public changeRate(rate: number): void {
    //ドラッグ中は外部からの操作を無視する。
    if (this.activePointerId !== null) return;

    this._rate = rate;
    const pos: number = this.convertRateToPixel(this._rate);
    this.updateParts(pos);

    this.sliderEventEmitter.emit(
      "slider_change",
      new SliderEventContext(this.rate),
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
    // すでに別のポインターでドラッグ中の場合は無視
    if (this.activePointerId !== null) return;
    this.activePointerId = e.pointerId; // ポインターIDを記録

    const target: Container = e.currentTarget as Container;

    const localPos = this.toLocal(e.global);
    this.dragStartPos.set(localPos.x - target.x, localPos.y - target.y);

    SliderViewUtil.addEventListenerToTarget(
      this.buttonRootContainer,
      "pointermove",
      this.moveSlider,
    );

    this._slideButton.on("pointerup", this.moveSliderFinish);
    this._slideButton.on("pointerupoutside", this.moveSliderFinish);
  }

  /**
   * スライダーのドラッグ中の処理
   * @param e
   * @param skipPointerCheck ポインターIDのチェックをスキップするかどうか (ベースタップ時に使用)
   */
  private moveSlider = (
    e: FederatedPointerEvent | PointerEvent,
    skipPointerCheck: boolean = false, // デフォルトはチェックする
  ): void => {
    // ポインターチェックをスキップしない場合、記録したIDと異なるかドラッグ中でなければ無視
    if (
      !skipPointerCheck &&
      (this.activePointerId === null || e.pointerId !== this.activePointerId)
    )
      return;
    this.onMoveSlider(e);
  };

  protected onMoveSlider(e: FederatedPointerEvent | PointerEvent): void {
    const mousePos: number = this.limitSliderButtonPosition(e);

    this.updateParts(mousePos);
    this._rate = this.convertPixelToRate(mousePos);

    this.sliderEventEmitter.emit(
      "slider_change",
      new SliderEventContext(this.rate),
    );
  }

  /**
   * スライダーボタンの位置を制限する関数
   * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。
   */
  protected limitSliderButtonPosition(
    evt: FederatedPointerEvent | PointerEvent,
  ): number {
    const mousePos: number = SliderViewUtil.getPointerLocalPosition(
      this,
      this.isHorizontal,
      this.dragStartPos,
      evt,
    );
    return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);
  }

  /**
   * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する
   * moveSliderの内部処理
   * @param	mousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。
   */
  private updateParts(mousePos: number): void {
    const stretch = (target: Container) => {
      SliderViewUtil.setSize(
        target,
        this.isHorizontal,
        mousePos - SliderViewUtil.getPosition(target, this.isHorizontal),
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
    SliderViewUtil.setPosition(this._slideButton, this.isHorizontal, mousePos);
  }

  /**
   * スライダーのドラッグ終了時の処理
   */
  private moveSliderFinish = (e?: FederatedPointerEvent | PointerEvent) => {
    // 終了イベントを発行したポインターが、記録中のポインターIDと異なる場合は無視
    // (pointerupoutsideなど、pointerIdが取得できない場合も考慮してnullチェックはしない)
    if (e && e.pointerId !== this.activePointerId) return;

    this.activePointerId = null; // ポインターIDをクリア

    SliderViewUtil.removeEventListenerFromTarget(
      this.buttonRootContainer,
      "pointermove",
      this.moveSlider,
    );

    this._slideButton.off("pointerup", this.moveSliderFinish);
    this._slideButton.off("pointerupoutside", this.moveSliderFinish);
    this.sliderEventEmitter.emit(
      "slider_change_finished",
      new SliderEventContext(this.rate),
    );
  };

  /**
   * スライダーの地をクリックした際の処理
   * その位置までスライダーをジャンプする
   * @param evt
   */
  protected onPressBase(evt: FederatedPointerEvent): void {
    // すでに別のポインターでドラッグ中の場合は無視
    if (this.activePointerId !== null) return;

    this.dragStartPos.set(0, 0); // タップジャンプ用にドラッグ開始位置をリセット

    // moveSliderを呼び出す（ポインターチェックをスキップ）
    this.moveSlider(evt, true);

    // 終了イベントを発行
    this.sliderEventEmitter.emit(
      "slider_change_finished",
      new SliderEventContext(this.rate),
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
      this._minPosition,
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
      this._minPosition,
    );
  }

  /**
   * ドラッグ中のマウス座標を取得する。
   * limitSliderButtonPosition内の処理。
   */

  private initBase(value: Container): Container {
    value.eventMode = "static";
    value.on("pointertap", (e) => {
      this.onPressBase(e);
    });
    value.on("wheel", this.onWheel);
    SliderViewUtil.addChildParts(this, value);
    return value;
  }

  private onWheel = (e: FederatedWheelEvent) => {
    const nextRate = SliderViewUtil.clamp(
      this.rate + e.deltaY * this.wheelSpeed,
      SliderView.MAX_RATE,
      0.0,
    );
    this.changeRate(nextRate);
  };

  private initBarAndMask(value?: Container): Container | undefined {
    if (value == null) return;
    value.eventMode = "none";
    SliderViewUtil.addChildParts(this, value);
    return value;
  }

  private initSliderButton(value: Container): Container {
    value.on("pointerdown", this.startMove);
    value.on("wheel", this.onWheel);
    value.eventMode = "static";
    SliderViewUtil.addChildParts(this, value);
    return value;
  }

  /**
   * このインスタンスを破棄する。
   * @param	e
   */
  public dispose(): void {
    this.onDisposeFunction();
  }

  /**
   * 全てのDisplayObjectとEventListenerを解除する。
   */
  protected onDisposeFunction(): void {
    this.removeAllListeners();
    this._base.removeAllListeners();
    this._slideButton.removeAllListeners();
    this.removeChildren();
  }
}
