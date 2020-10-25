import { DisplayObject } from "pixi.js";
export declare class ScrollBarViewUtil {
    /**
     * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。
     * @param target
     * @param mask
     * @param isHorizontal
     */
    static getClampedTargetPosition(target: DisplayObject, mask: DisplayObject, isHorizontal: boolean): number;
    /**
     * ターゲットコンテンツの位置を、マスク領域内に丸め込む。
     * @param target
     * @param mask
     * @param position
     * @param isHorizontal
     */
    static clampTargetPosition(target: DisplayObject, mask: DisplayObject, position: number, isHorizontal: boolean): void;
}
//# sourceMappingURL=ScrollBarViewUtil.d.ts.map