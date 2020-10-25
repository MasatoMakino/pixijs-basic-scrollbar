import { SliderEventType } from "../SliderEvent";
import { SliderView, SliderViewUtil } from "../SliderView";
import { InertialScrollManager } from "./InertialScrollManager";
import { MouseWheelScrollManager } from "./MouseWheelScrollManager";
import { ScrollBarContentsEventType } from "./ScrollBarContentsEventType";
import { ScrollBarEventType } from "./ScrollBarEvent";
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
    constructor(option, scrollContents) {
        super(option);
        this._autoHide = false;
        /**
         * スライダーイベントに応じてコンテンツをスクロールする
         * @param {Object} e
         */
        this.updateContentsPosition = (e) => {
            const evt = e;
            this.updateContentsPositionWithRate(evt.rate);
        };
        this._contents = scrollContents;
        this._contents.on(ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE, this.updateSlider);
        this.on(SliderEventType.CHANGE, this.updateContentsPosition);
        this.changeRate(option.rate);
        this.wheelManager = new MouseWheelScrollManager(this);
        this.wheelManager.on(ScrollBarEventType.UPDATE_TARGET_POSITION, () => {
            this.updateSliderPosition();
        });
        this.inertialManager = new InertialScrollManager(this);
        this.inertialManager.on(ScrollBarEventType.UPDATE_TARGET_POSITION, () => {
            this.updateSliderPosition();
        });
    }
    get contents() {
        return this._contents;
    }
    get autoHide() {
        return this._autoHide;
    }
    set autoHide(value) {
        this._autoHide = value;
        this.updateSliderVisible();
    }
    /**
     * スライダーボタンの位置を制限する関数
     * @return 制限で切り落とされたスライダーボタンの座標値
     */
    limitSliderButtonPosition(evt) {
        const mousePos = this.getMousePosition(this, evt);
        const range = this.getRangeOfSliderButtonPosition();
        return SliderViewUtil.clamp(mousePos, range.max, range.min);
    }
    /**
     * スライダーの割合から、スライダーの位置を取得する
     * @param	rate
     * @return
     */
    convertRateToPixel(rate) {
        const range = this.getRangeOfSliderButtonPosition();
        return SliderViewUtil.convertRateToPixel(rate, range.max, range.min);
    }
    /**
     * スライダーの座標から、スライダーの割合を取得する
     * @param	pixel
     * @return
     */
    convertPixelToRate(pixel) {
        const range = this.getRangeOfSliderButtonPosition();
        return SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);
    }
    /**
     * スライダーボタンの可動範囲を取得する。単位ピクセル
     */
    getRangeOfSliderButtonPosition() {
        const buttonSize = this.slideButtonSize;
        /**
         * TODO : ここで`buttonSize / 2`を修正に使っている。
         * そのためボタンが中心から偏った場合、対応できない。
         * this._sliderButton.getLocalBounds()で中心位置を調べて、動的に補正する修正を検討。
         */
        const sizeHalf = buttonSize / 2;
        const max = this._maxPosition - sizeHalf;
        const min = this._minPosition + sizeHalf;
        return { max, min };
    }
    /**
     * スライダーボタンのサイズ。
     * @returns {number}
     */
    get slideButtonSize() {
        this.updateSliderSize();
        return SliderViewUtil.getSize(this._slideButton, this.isHorizontal);
    }
    /**
     * スクロールバーのボタンサイズ及び位置を更新する。
     * コンテンツサイズが変更された場合の更新にも利用する。
     */
    updateSlider() {
        if (!this.isUpdatableSliderSize())
            return;
        this.updateSliderSize();
        this.updateSliderPosition();
    }
    /**
     * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。
     * その割合でスライダーの位置を更新する。
     */
    updateSliderPosition() {
        const rate = this.contents.getScrollPositionAsRate(this.isHorizontal);
        this.changeRate(rate);
    }
    isUpdatableSliderSize() {
        var _a, _b;
        return (((_a = this._contents) === null || _a === void 0 ? void 0 : _a.target) != null &&
            ((_b = this._contents) === null || _b === void 0 ? void 0 : _b.mask) != null &&
            this._slideButton != null);
    }
    /**
     * スライダーボタンのサイズの伸縮を行う。
     */
    updateSliderSize() {
        if (!this.isUpdatableSliderSize())
            return;
        const fullSize = this._maxPosition - this._minPosition;
        const displayRate = this._contents.getDisplayRate(this.isHorizontal);
        const sliderSize = fullSize * displayRate;
        SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);
        this.updateSliderVisible();
    }
    /**
     * autoHideの条件に一致するかを判定し、表示を切り替える。
     * @private
     */
    updateSliderVisible() {
        this._slideButton.visible = this._slideButton.interactive = !this.isHidden;
    }
    /**
     * autoHideの条件に一致するかを判定する
     */
    get isHidden() {
        //autoHideが設定されていない場合は常に表示
        if (!this.autoHide)
            return false;
        return this._contents.getDisplayRate(this.isHorizontal) === 1.0;
    }
    /**
     * rate値を元にコンテンツをスクロールする。
     * @param {number} rate
     */
    updateContentsPositionWithRate(rate) {
        this._contents.scroll(rate, this.isHorizontal);
    }
    onPressedSliderButton(e) {
        super.onPressedSliderButton(e);
        this.emit(ScrollBarEventType.STOP_INERTIAL_TWEEN);
    }
    onPressBase(evt) {
        if (this.isHidden)
            return;
        super.onPressBase(evt);
        this.emit(ScrollBarEventType.STOP_INERTIAL_TWEEN);
    }
    onDisposeFunction(e) {
        this._contents.dispose();
        this._contents = null;
        super.onDisposeFunction(e);
    }
}
