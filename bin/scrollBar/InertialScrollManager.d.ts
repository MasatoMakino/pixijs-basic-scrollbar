import { ScrollBarView } from "./ScrollBarView";
import * as PIXI from "pixi.js";
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export declare class InertialScrollManager extends PIXI.utils.EventEmitter {
    private scrollBarView;
    decelerationRate: number;
    overflowScrollRange: number;
    protected speed: number;
    protected isDragging: boolean;
    protected dragPos: number;
    private tween;
    constructor(scrollBarView: ScrollBarView);
    private onMouseDown;
    private onMouseDownHandler;
    private getDragPos;
    private updateDragPos;
    private onMouseMove;
    private onMouseMoveHandler;
    private addTargetPosition;
    private onMouseUp;
    private onMouseUpHandler;
    private onTick;
    private stopInertial;
    /**
     * スクロールのオーバーフロー量から、減退率を割り出す。
     * overflowScrollRange以上に離れている場合は0.0
     * スクロールエリア内にコンテンツがある場合は1.0を返す。
     */
    private getOverflowDeceleration;
    /**
     * ターゲットコンテンツがマスク領域からどれだけ離れているか。
     */
    private getLeaveRangeFromMask;
    private getClampedPos;
}
//# sourceMappingURL=InertialScrollManager.d.ts.map