import { ScrollBarView } from "./ScrollBarView";
import * as PIXI from "pixi.js";
/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export declare class MouseWheelScrollManager extends PIXI.utils.EventEmitter {
    protected scrollBarView: ScrollBarView;
    delta: number;
    constructor(scrollBarView: ScrollBarView);
    private scroll;
}
//# sourceMappingURL=MouseWheelScrollManager.d.ts.map