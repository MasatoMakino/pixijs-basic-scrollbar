import { ScrollBarView } from "./ScrollBarView";
import * as PIXI from "pixi.js";
/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export declare class MouseWheelScrollManager extends PIXI.utils.EventEmitter {
    protected scrollBarView: ScrollBarView;
    delta: number;
    private _isStart;
    constructor(scrollBarView: ScrollBarView);
    start(): void;
    stop(): void;
    private wheelHandler;
    private scroll;
}
//# sourceMappingURL=MouseWheelScrollManager.d.ts.map