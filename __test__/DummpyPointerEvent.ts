import { DisplayObject, DisplayObjectEvents } from "pixi.js";

export class DummyPointerEvent {
  static emit(
    button: DisplayObject | HTMLCanvasElement,
    type: keyof DisplayObjectEvents,
    args?: any
  ): void {
    if (button instanceof DisplayObject) {
      button.emit(type, { type, ...args } as any);
    } else {
      button.dispatchEvent({ type, ...args });
    }
  }
}
