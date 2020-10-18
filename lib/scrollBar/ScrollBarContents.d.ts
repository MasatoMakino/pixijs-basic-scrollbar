import * as PIXI from "pixi.js";
import {Container, DisplayObject, Graphics} from "pixi.js";

/**
 * スクロールバーで操作するコンテンツ
 */
export declare class ScrollBarContents extends PIXI.utils.EventEmitter {
    container: Container;
    get target(): DisplayObject;
    set target(value: DisplayObject);
    private _target;
    get mask(): Graphics;
    set mask(value: Graphics);
    private _mask;
    /**
     * コンストラクタ
     *
     * @param target スクロール操作を受けるコンテンツ
     * @param mask targetを切り抜くマスク
     * @param container targetおよびmaskを格納する親コンテナ
     */
    constructor(target: DisplayObject, mask: Graphics, container: Container);
    private static init;
    /**
     * 現状のスクロール位置を取得する。単位rate
     * 0.0でコンテンツはTOP, 1.0でBOTTOMに位置している。
     *
     * @param isHorizontal
     */
    getScrollPositionAsRate(isHorizontal: boolean): number;
    /**
     * スクロールの最大可動領域を取得する。単位px
     *
     * @param isHorizontal
     * @private
     */
    private getMovableRange;
    /**
     * コンテンツを、指定されたrateの位置までスクロールする
     *
     * @param rate
     * @param isHorizontal
     */
    scroll(rate: number, isHorizontal: boolean): void;
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
    getDisplayRate(isHorizontal: boolean): number;
    dispose(): void;
}
//# sourceMappingURL=ScrollBarContents.d.ts.map