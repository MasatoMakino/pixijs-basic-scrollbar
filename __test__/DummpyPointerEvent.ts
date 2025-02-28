import { Container, ContainerChild, ContainerEvents } from "pixi.js";

export class DummyPointerEvent {
  static emit(
    button: Container | EventTarget,
    type: keyof ContainerEvents<ContainerChild>,
    args?: any,
  ): void {
    if (button instanceof Container) {
      button.emit(type, { type, ...args } as any);
    } else {
      button.dispatchEvent({ type, ...args });
    }
  }
}
