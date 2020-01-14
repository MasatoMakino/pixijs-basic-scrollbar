/**
 * based on https://github.com/Mwni/pixi-mousewheel
 */
import { DisplayObject } from "pixi.js";
export declare enum MouseWheelPluginEventType {
    WHEEL = "wheel"
}
export interface MouseWheelDisplayObject extends DisplayObject {
    interactiveMousewheel: boolean;
}
export declare function initPlugin(): void;
//# sourceMappingURL=MouseWheelPlugin.d.ts.map