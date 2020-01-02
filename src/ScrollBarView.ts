import { SliderEventContext, SliderEventType } from "./SliderEvent";
import { SliderView } from "./SliderView";
import { SliderViewOption } from "./SliderViewOption";
import { DisplayObject } from "pixi.js";
import { InteractionEvent } from "@pixi/interaction";
import { SliderViewUtil } from "./SliderView";

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

export class ScrollBarView extends SliderView {
  protected _targetContents: DisplayObject;
  protected _contentsMask: DisplayObject;
  public autoHide: boolean = false;

  constructor(option: SliderViewOption, scrollOption: ScrollBarViewInitOption) {
    super(option);

    ScrollBarViewInitOption.check(scrollOption);
    this.setTargetContents(scrollOption.targetContents);
    this.setContentsMask(scrollOption.contentsMask);

    this.changeRate(option.rate);
  }

  /**
   * 初期化処理
   * スライダーボタンの位置の初期化に加え、サイズの初期化も行う
   * @param {SliderViewOption} option
   */
  protected init(option: SliderViewOption): void {
    super.init(option);
    this.initSliderButton();
  }

  /**
   * スライダーボタンの位置を制限する関数
   * @return 制限で切り落とされたスライダーボタンの座標値
   */
  protected limitSliderButtonPosition(evt: InteractionEvent): number {
    let mousePos: number = this.getMousePosition(this, evt);
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.clamp(mousePos, range.max, range.min);
  }

  /**
   * スライダーの割合から、スライダーの位置を取得する
   * @param	rate
   * @return
   */
  protected convertRateToPixel(rate: number): number {
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.convertRateToPixel(rate, range.max, range.min);
  }

  /**
   * スライダーの座標から、スライダーの割合を取得する
   * @param	pixel
   * @return
   */
  protected convertPixelToRate(pixel: number): number {
    const range = this.getRangeOfSliderButtonPosition();
    return SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);
  }

  /**
   * スライダーボタンの可動範囲を取得する。単位ピクセル
   */
  private getRangeOfSliderButtonPosition(): { max: number; min: number } {
    const buttonSize: number = this.slideButtonSize;
    const max: number = this._maxPosition - buttonSize / 2;
    const min: number = this._minPosition + buttonSize / 2;
    return { max, min };
  }

  /**
   * スライダーボタンのサイズ。
   * @returns {number}
   */
  get slideButtonSize(): number {
    this.updateSlideButtonSize();
    return SliderViewUtil.getSize(this._slideButton, this.isHorizontal);
  }

  /**
   * スクロールバーのボタンサイズ及び位置を更新する。
   * コンテンツサイズが変更された場合の更新にも利用する。
   */
  public initSliderButton(): void {
    if (!this._slideButton || !this._targetContents || !this._contentsMask) {
      return;
    }

    this.updateSlideButtonSize();
    this.initSliderPosition();

    if (this.listeners(SliderEventType.CHANGE).length != 0) return;

    this.on(SliderEventType.CHANGE, this.updateContentsPosition);
  }

  protected initSliderPosition(): void {
    const zeroPos: number = SliderViewUtil.getPosition(
      this._contentsMask,
      this.isHorizontal
    );
    const contentsPos: number = SliderViewUtil.getPosition(
      this._targetContents,
      this.isHorizontal
    );

    const posDif: number = zeroPos - contentsPos;
    const sizeDif: number =
      SliderViewUtil.getSize(this._targetContents, this.isHorizontal) -
      SliderViewUtil.getSize(this._contentsMask, this.isHorizontal);

    this.changeRate((posDif / sizeDif) * SliderView.MAX_RATE);
  }

  /**
   * スライダーボタンのサイズの伸縮を行う。
   */
  protected updateSlideButtonSize(): void {
    if (!this._targetContents || !this._contentsMask || !this._slideButton) {
      return;
    }

    const fullSize: number = this._maxPosition - this._minPosition;

    const contentsSize: number = SliderViewUtil.getSize(
      this._targetContents,
      this.isHorizontal
    );
    const maskSize: number = SliderViewUtil.getSize(
      this._contentsMask,
      this.isHorizontal
    );

    let sliderSize: number = (fullSize * maskSize) / contentsSize;
    if (sliderSize > fullSize) {
      sliderSize = fullSize;
    }

    SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);

    //autoHideの条件に一致するかを判定し、表示を切り替える。
    this._slideButton.visible = this._slideButton.interactive = !this.isHide;
  }

  /**
   * autoHideの条件に一致するかを判定する
   */
  protected get isHide(): boolean {
    //autoHideが設定されていない場合は常に表示
    if (!this.autoHide) return false;

    const fullSize: number = this._maxPosition - this._minPosition;
    const contentsSize: number = SliderViewUtil.getSize(
      this._targetContents,
      this.isHorizontal
    );
    const maskSize: number = SliderViewUtil.getSize(
      this._contentsMask,
      this.isHorizontal
    );

    //マスク、コンテンツ、スクロール幅のいずれかが0以下の場合スライダーを隠す
    if (contentsSize < 0 || maskSize < 0 || fullSize < 0) {
      return true;
    }

    //マスクサイズとコンテンツサイズが同一の場合スライダーを隠す
    return (
      SliderViewUtil.getSize(this._slideButton, this.isHorizontal) == fullSize
    );
  }

  /**
   * スライダーイベントに応じてコンテンツをスクロールする
   * @param {Object} e
   */
  public updateContentsPosition = (e: any) => {
    const evt = e as SliderEventContext;
    this.updateContentsPositionWithRate(evt.rate);
  };

  /**
   * rate値を元にコンテンツをスクロールする。
   * @param {number} rate
   */
  protected updateContentsPositionWithRate(rate: number): void {
    const zeroPos: number = SliderViewUtil.getPosition(
      this._contentsMask,
      this.isHorizontal
    );
    const nextPos: number =
      zeroPos -
      (rate / SliderView.MAX_RATE) *
        (SliderViewUtil.getSize(this._targetContents, this.isHorizontal) -
          SliderViewUtil.getSize(this._contentsMask, this.isHorizontal));
    SliderViewUtil.setPosition(
      this._targetContents,
      this.isHorizontal,
      nextPos
    );
  }

  protected onPressBase(evt: InteractionEvent): void {
    if (this.isHide) return;
    super.onPressBase(evt);
  }

  public get targetContents(): DisplayObject {
    return this._targetContents;
  }

  protected setTargetContents(value: DisplayObject) {
    this._targetContents = value;
    this.initSliderButton();
  }

  public get contentsMask(): DisplayObject {
    return this._contentsMask;
  }

  protected setContentsMask(value: DisplayObject) {
    this._contentsMask = value;
    this.initSliderButton();
  }

  protected onDisposeFunction(e?: Event): void {
    this.removeListener(SliderEventType.CHANGE, this.updateContentsPosition);
    this._targetContents = null;
    this._contentsMask = null;
    super.onDisposeFunction(e);
  }
}

/**
 * スクロールバーの初期化時に必須となる項目をまとめたオブジェクト
 * スクロール対象とスクロールエリアのマスクを指定する。
 */
export class ScrollBarViewInitOption {
  targetContents: DisplayObject; //スクロールバーによって操作されるコンテンツ
  contentsMask: DisplayObject; //スクロールバーが対象とするコンテンツが表示されるエリア

  public static check(option: ScrollBarViewInitOption) {
    if (option.targetContents.mask !== option.contentsMask) {
      console.warn(
        "ScrollBarView : スクロールするコンテンツにマスクが設定されていません。",
        option.targetContents,
        option.contentsMask
      );
    }

    if (option.contentsMask.parent != option.contentsMask.parent) {
      console.warn(
        "ScrollBarView : スクロールするコンテンツと、そのマスクは表示ツリー上で同一の親Containerを持っている必要があります。",
        option.targetContents,
        option.contentsMask
      );
    }

    if (option.targetContents.getLocalBounds() === null) {
      throw new Error(
        "ScrollBarView : 初期化オプションで指定されたtargetContentsにバウンディングボックスが存在しません。" +
          "ShapeやContainerを利用する場合はsetBounds関数を利用して" +
          "バウンディングボックスを手動で設定してください。"
      );
    }

    if (option.contentsMask.getLocalBounds() === null) {
      throw new Error(
        "ScrollBarView : 初期化オプションで指定されたcontentsMaskにバウンディングボックスが存在しません。" +
          "Shapeを利用する場合はsetBounds関数を利用して" +
          "バウンディングボックスを手動で設定してください。"
      );
    }
  }
}
