import * as PIXI from "pixi.js";
import {SliderView, SliderViewUtil} from "../SliderView";
import {ScrollBarContentsEventType} from "./ScrollBarContentsEventType";

/**
 * スクロールバーで操作するコンテンツ
 */
export class ScrollBarContents extends PIXI.utils.EventEmitter {
    /**
     * コンストラクタ
     *
     * @param target スクロール操作を受けるコンテンツ
     * @param mask targetを切り抜くマスク
     * @param container targetおよびmaskを格納する親コンテナ
     */
    constructor(target, mask, container) {
        super();
        this.container = container;
        this._target = target;
        this._mask = mask;
        ScrollBarContents.init(this);
    }
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
        this.emit(ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
    }
    get mask() {
        return this._mask;
    }
    set mask(value) {
        this._mask = value;
        this.emit(ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
    }
    static init(scrollBarContents) {
        if (scrollBarContents._target.mask !== scrollBarContents._mask) {
            scrollBarContents._target.mask = scrollBarContents._mask;
        }
        const addToContainer = (displayObject) => {
            var _a;
            if (displayObject.parent === scrollBarContents.container)
                return;
            (_a = displayObject.parent) === null || _a === void 0 ? void 0 : _a.removeChild(displayObject);
            scrollBarContents.container.addChild(displayObject);
        };
        addToContainer(scrollBarContents._target);
        addToContainer(scrollBarContents._mask);
    }
    /**
     * 現状のスクロール位置を取得する。単位rate
     * 0.0でコンテンツはTOP, 1.0でBOTTOMに位置している。
     *
     * @param isHorizontal
     */
    getScrollPositionAsRate(isHorizontal) {
        const getPos = SliderViewUtil.getPosition;
        const zeroPos = getPos(this.mask, isHorizontal);
        const contentsPos = getPos(this.target, isHorizontal);
        const contentsPositionDif = zeroPos - contentsPos;
        const movableRange = this.getMovableRange(isHorizontal);
        return (contentsPositionDif / movableRange) * SliderView.MAX_RATE;
    }
    /**
     * スクロールの最大可動領域を取得する。単位px
     *
     * @param isHorizontal
     * @private
     */
    getMovableRange(isHorizontal) {
        const getSize = SliderViewUtil.getSize;
        const targetSize = getSize(this._target, isHorizontal);
        const maskSize = getSize(this._mask, isHorizontal);
        return targetSize - maskSize;
    }
    /**
     * コンテンツを、指定されたrateの位置までスクロールする
     *
     * @param rate
     * @param isHorizontal
     */
    scroll(rate, isHorizontal) {
        const getPos = SliderViewUtil.getPosition;
        const zeroPos = getPos(this._mask, isHorizontal);
        const movableRange = this.getMovableRange(isHorizontal);
        const contentsPos = zeroPos - movableRange * (rate / SliderView.MAX_RATE);
        SliderViewUtil.setPosition(this._target, isHorizontal, contentsPos);
    }
    /**
     * コンテンツが表示領域にどれだけ表示されているかの比率を取得する。
     * この比率は、スクロールバーボタンのスケールとなる。
     *
     * 例 : コンテンツサイズが200、表示領域が100なら0.5
     * コンテンツがすべて表示されているなら1.0
     *
     * @param isHorizontal
     * @return 0.0 ~ 1.0
     */
    getDisplayRate(isHorizontal) {
        const getSize = SliderViewUtil.getSize;
        const contentsSize = getSize(this.target, isHorizontal);
        const maskSize = getSize(this.mask, isHorizontal);
        return SliderViewUtil.clamp(maskSize / contentsSize, SliderView.MAX_RATE, 0.0);
    }
    dispose() {
        this.removeAllListeners();
        this.container = null;
        this._mask = null;
        this._target = null;
    }
}
