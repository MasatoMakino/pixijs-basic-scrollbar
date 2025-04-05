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

  /**
   * Refresh the scrollbar and content position after the scroll contents have been resized.
   *
   * When the content size is changed, the following update process must be performed in order:
   * 1. Save the current scroll position
   * 2. Update the scrollbar size and position
   * 3. Restore the scroll position
   *
   * Note: The scroll position will be automatically adjusted to valid range by changeRate.
   * - If content size <= mask size: Will be set to start position (rate = 0)
   * - If content size > mask size:
   *   - Will maintain position if within valid range
   *   - Will adjust to end if position exceeds the end
   *
   * スクロールコンテンツのサイズが変更された後に、スクロールバーとコンテンツ位置をリフレッシュする
   *
   * コンテンツのサイズを変更した場合、以下の順序で更新処理を行う必要があります：
   * 1. 現在のスクロール位置を一時保存
   * 2. スクロールバーのサイズと位置を更新
   * 3. スクロール位置を再設定
   *
   * 注意：スクロール位置は changeRate によって自動的に有効範囲に調整されます。
   * - コンテンツサイズ <= マスクサイズの場合：先頭位置になります（rate = 0）
   * - コンテンツサイズ > マスクサイズの場合：
   *   - 有効範囲内なら位置を維持
   *   - 範囲外なら末尾に自動調整
   */
  public refreshAfterContentsResize(): void {
    const currentY = this.contents.target.y;
    this.updateSlider();
    ScrollBarViewUtil.clampTargetPosition(
      this.contents.target,
      this.contents.mask,
      currentY,
      this.isHorizontal,
    );
    this.updateSliderPosition();
  }

  protected override onDisposeFunction(): void {
    this.contents.dispose();
    this.inertialManager.dispose();
    super.onDisposeFunction();
  }
}
