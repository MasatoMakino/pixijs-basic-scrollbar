import { FederatedPointerEvent, EventEmitter } from "pixi.js";
import {
  SliderEventContext,
  SliderView,
  SliderViewOption,
  SliderViewUtil,
} from "../index.js";
import {
  InertialScrollManager,
  MouseWheelScrollManager,
  ScrollBarContents,
  ScrollBarEventTypes,
  ScrollBarViewUtil,
} from "./index.js";

/**
 * スクロールバーを表すクラスです。
 *
 * このクラスは、スライダーに以下の機能を追加したものです。
 *
 * 		1.コンテンツサイズに合わせた、スクロールバーの伸縮
 * 		2.スクロールバーの伸縮にあわせた、移動範囲の制限
 * 		3.スクロールバーの伸縮にあわせた、移動値の取得
 */

export class ScrollBarView extends SliderView {
  readonly contents: ScrollBarContents;

  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = value;
    this.updateSliderVisible();
  }
  private _autoHide: boolean = false;
  readonly wheelManager: MouseWheelScrollManager;
  readonly inertialManager: InertialScrollManager;
  readonly scrollBarEventEmitter = new EventEmitter<ScrollBarEventTypes>();

  constructor(option: SliderViewOption, scrollContents: ScrollBarContents) {
    super(option);

    this.contents = scrollContents;
    this.contents.on("changed_contents_size", this.updateSlider);
    this.sliderEventEmitter.on("slider_change", this.updateContentsPosition);

    this.changeRate(this.rate);

    this.wheelManager = new MouseWheelScrollManager(this);
    this.wheelManager.on("update_target_position", () => {
      this.updateSliderPosition();
    });

    this.inertialManager = new InertialScrollManager(this);
    this.inertialManager.on("update_target_position", () => {
      this.updateSliderPosition();
    });
  }

  /**
   * スライダーボタンの位置を制限する関数
   * @return 制限で切り落とされたスライダーボタンの座標値
   */
  protected override limitSliderButtonPosition(
    evt: FederatedPointerEvent,
  ): number {
    const mousePos: number = SliderViewUtil.getPointerLocalPosition(
      this,
      this.isHorizontal,
      this.dragStartPos,
      evt,
    );
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.clamp(mousePos, range.max, range.min);
  }

  /**
   * スライダーの割合から、スライダーの位置を取得する
   * @param	rate
   * @return
   */
  protected override convertRateToPixel(rate: number): number {
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.convertRateToPixel(rate, range.max, range.min);
  }

  /**
   * スライダーの座標から、スライダーの割合を取得する
   * @param	pixel
   * @return
   */
  protected override convertPixelToRate(pixel: number): number {
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);
  }

  /**
   * スライダーボタンの可動範囲を取得する。単位ピクセル
   */
  private getRangeOfSliderButtonPosition(): { max: number; min: number } {
    const buttonSize: number = this.slideButtonSize;
    const ratio = ScrollBarViewUtil.getRatioOfOrigin(
      this._slideButton,
      this.isHorizontal,
    );

    const max: number = this._maxPosition - (1.0 + ratio) * buttonSize;
    const min: number = this._minPosition - ratio * buttonSize;
    return { max, min };
  }

  /**
   * スライダーボタンのサイズ。
   * @returns {number}
   */
  get slideButtonSize(): number {
    this.updateSliderSize();
    return SliderViewUtil.getSize(this._slideButton, this.isHorizontal);
  }

  /**
   * スクロールバーのボタンサイズ及び位置を更新する。
   * コンテンツサイズが変更された場合の更新にも利用する。
   */
  public updateSlider(): void {
    if (!this.isUpdatableSliderSize()) return;

    this.updateSliderSize();
    this.updateSliderPosition();
  }

  /**
   * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
   * その割合でスライダーの位置を更新する。
   */
  protected updateSliderPosition(): void {
    const rate = this.contents.getScrollPositionAsRate(this.isHorizontal);
    this.changeRate(rate);
  }

  private isUpdatableSliderSize(): boolean {
    return (
      this.contents?.target != null &&
      this.contents?.mask != null &&
      this._slideButton != null
    );
  }
  /**
   * スライダーボタンのサイズの伸縮を行う。
   */
  protected updateSliderSize(): void {
    if (!this.isUpdatableSliderSize()) return;

    const fullSize: number = this._maxPosition - this._minPosition;
    const displayRate: number = this.contents.getDisplayRate(this.isHorizontal);
    const sliderSize: number = fullSize * displayRate;

    SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);
    this.updateSliderVisible();
  }

  /**
   * autoHideの条件に一致するかを判定し、表示を切り替える。
   * @private
   */
  private updateSliderVisible(): void {
    this._slideButton.visible = !this.isHidden;
    this._slideButton.eventMode = this.isHidden ? "none" : "static";
  }

  /**
   * autoHideの条件に一致するかを判定する
   */
  protected get isHidden(): boolean {
    //autoHideが設定されていない場合は常に表示
    if (!this.autoHide) return false;
    return this.contents.getDisplayRate(this.isHorizontal) === 1.0;
  }

  /**
   * スライダーイベントに応じてコンテンツをスクロールする
   * @param {Object} e
   */
  public updateContentsPosition = (e: SliderEventContext) => {
    this.updateContentsPositionWithRate(e.rate);
  };

  /**
   * rate値を元にコンテンツをスクロールする。
   * @param {number} rate
   */
  protected updateContentsPositionWithRate(rate: number): void {
    this.contents.scroll(rate, this.isHorizontal);
  }

  protected override onPressedSliderButton(e: FederatedPointerEvent): void {
    super.onPressedSliderButton(e);
    this.scrollBarEventEmitter.emit("stop_inertial_tween");
  }

  protected override onMoveSlider(e: FederatedPointerEvent) {
    super.onMoveSlider(e);
    this.scrollBarEventEmitter.emit("stop_inertial_tween");
  }

  protected override onPressBase(evt: FederatedPointerEvent): void {
    if (this.isHidden) return;
    super.onPressBase(evt);
    this.scrollBarEventEmitter.emit("stop_inertial_tween");
  }

  protected override onDisposeFunction(): void {
    this.contents.dispose();
    this.inertialManager.dispose();
    super.onDisposeFunction();
  }
}
