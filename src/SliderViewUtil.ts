import {
  FederatedPointerEvent,
  Point,
  Rectangle,
  Container,
  Bounds,
  EventEmitter,
  ContainerEvents,
  ContainerChild,
} from "pixi.js";
import { SliderView } from "./index.js";

export class SliderViewUtil {
  /**
   * スライダーの座標から、スライダーの割合を取得する
   */
  public static convertPixelToRate(
    pixel: number,
    max: number,
    min: number,
  ): number {
    if (max <= min) {
      return 0.0;
    }
    const rate: number = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;
    return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);
  }

  public static convertRateToPixel(
    rate: number,
    max: number,
    min: number,
  ): number {
    const pix: number = ((max - min) * rate) / SliderView.MAX_RATE + min;
    return SliderViewUtil.clamp(pix, max, min);
  }

  /**
   * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
   * @return displayObjの座標値。単位ピクセル
   */
  public static getPosition(
    displayObj: Container | Point,
    isHorizontal: boolean,
  ): number {
    if (isHorizontal) {
      return displayObj.x;
    }
    return displayObj.y;
  }

  public static getPointerEventPosition(
    e: FederatedPointerEvent | PointerEvent,
    isHorizontal: boolean,
  ) {
    if (e instanceof FederatedPointerEvent) {
      return SliderViewUtil.getPosition(e.global, isHorizontal);
    } else {
      return SliderViewUtil.getPosition(
        new Point(e.offsetX, e.offsetY),
        isHorizontal,
      );
    }
  }

  /**
   * ディスプレイオブジェクトにスクロール方向の座標値を設定する
   */
  public static setPosition(
    displayObj: Container,
    isHorizontal: boolean,
    position: number,
  ): void {
    if (!displayObj) return;

    if (isHorizontal) {
      displayObj.x = position;
    } else {
      displayObj.y = position;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
   */
  public static getSize(displayObj: Container, isHorizontal: boolean): number {
    const size = SliderViewUtil.getContentsBounds(displayObj);
    if (isHorizontal) {
      return size.width * displayObj.scale.x;
    } else {
      return size.height * displayObj.scale.y;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を設定する。
   * @param displayObj
   * @param isHorizontal
   * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px
   */
  public static setSize(
    displayObj: Container,
    isHorizontal: boolean,
    amount: number,
  ): void {
    const size = SliderViewUtil.getContentsBounds(displayObj);

    if (isHorizontal) {
      displayObj.scale.x = amount / size.width;
    } else {
      displayObj.scale.y = amount / size.height;
    }
  }

  public static clamp(num: number, max: number, min: number): number {
    num = Math.max(num, min);
    num = Math.min(num, max);
    return num;
  }

  public static getContentsBounds(displayObj: Container): Bounds | Rectangle {
    if (displayObj.boundsArea) {
      return displayObj.boundsArea;
    }
    if (displayObj.hitArea) {
      return displayObj.hitArea as Rectangle;
    }
    return displayObj.getLocalBounds();
  }

  static getRootContainer(
    canvas: HTMLCanvasElement | undefined,
    button: Container,
  ): Container | HTMLCanvasElement {
    if (canvas) {
      return canvas;
    }

    let parent: Container = button.parent ?? button;
    while (parent.parent) {
      parent = parent.parent;
    }
    return parent;
  }

  static addChildParts(parent: Container, obj?: Container): void {
    if (!obj) return;
    obj.parent?.removeChild(obj);
    parent.addChild(obj);
  }

  static getPointerLocalPoint(
    evt: FederatedPointerEvent | PointerEvent,
    container: Container,
  ): Point {
    if (evt instanceof FederatedPointerEvent) {
      return container.toLocal(evt.global);
    }
    return container.toLocal(new Point(evt.offsetX, evt.offsetY));
  }

  static getPointerLocalPosition(
    displayObj: Container,
    isHorizontal: boolean,
    dragStartPos: Point,
    evt: FederatedPointerEvent | PointerEvent,
  ): number {
    const localPos = this.getPointerLocalPoint(evt, displayObj);

    if (isHorizontal) {
      return localPos.x - dragStartPos.x;
    } else {
      return localPos.y - dragStartPos.y;
    }
  }

  /**
   * リスナー関数を切り替える。
   *
   * @param shouldAdd リスナーを有効にするか否か
   * @param target ターゲットオブジェクト
   * @param event イベント名
   * @param listener リスナー関数
   * @returns
   */
  static toggleEventListener(
    shouldAdd: boolean,
    target: Container | HTMLCanvasElement,
    event: keyof ContainerEvents<ContainerChild>,
    listener: EventEmitter.ListenerFn,
  ): void {
    if (target instanceof HTMLCanvasElement) {
      const method = shouldAdd ? "addEventListener" : "removeEventListener";
      target[method](event as string, listener);
      return;
    }
    const pixiMethod = shouldAdd ? "on" : "off";
    target[pixiMethod](event, listener);
  }

  static addEventListenerToTarget(
    target: Container | HTMLCanvasElement,
    event: keyof ContainerEvents<ContainerChild>,
    listener: EventEmitter.ListenerFn,
  ) {
    this.toggleEventListener(true, target, event, listener);
  }

  static removeEventListenerFromTarget(
    target: Container | HTMLCanvasElement,
    event: keyof ContainerEvents<ContainerChild>,
    listener: EventEmitter.ListenerFn,
  ) {
    this.toggleEventListener(false, target, event, listener);
  }
}
