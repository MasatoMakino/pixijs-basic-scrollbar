import * as PIXI from "pixi.js";
import { ScrollBarView } from "./ScrollBarView";
/**
 * スクロールバーエリアの慣性スクロールを処理するクラス。
 */
export declare class InertialScrollManager extends PIXI.utils.EventEmitter {
    get speed(): number;
    private scrollBarView;
    decelerationRate: number;
    overflowScrollRange: number;
    private _speed;
    protected isDragging: boolean;
    protected dragPos: number;
    private tween;
    private _isStart;
    constructor(scrollBarView: ScrollBarView);
    start(): void;
    stop(): void;
    private onMouseDown;
    private addDragListener;
    private removeDragListener;
    private switchDragListener;
    private getDragPos;
    private updateDragPos;
    private onMouseMove;
    private addTargetPosition;
    private onMouseUp;
    private onTick;
    stopInertial: () => void;
    private disposeTween;
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