import * as PIXI from "pixi.js";
import { Container, DisplayObject, Graphics } from "pixi.js";
import { ScrollBarContentsEventType } from "./ScrollBarContentsEventType";

/**
 * スクロールバーで操作するコンテンツ
 */
export class ScrollBarContents extends PIXI.utils.EventEmitter {
  private _targetContents: DisplayObject;
  private _contentsMask: Graphics;

  /**
   * コンストラクタ
   * @param targetContents スクロール操作を受けるコンテンツ
   * @param contentsMask targetContentsを切り抜くマスク
   * @param container targetContentsおよびcontentsMaskのマスク
   */
  constructor(
    targetContents: DisplayObject,
    contentsMask: Graphics,
    public container: Container
  ) {
    super();
    this._targetContents = targetContents;
    this._contentsMask = contentsMask;
    ScrollBarContents.init(this);
  }

  private static init(scrollBarContents: ScrollBarContents): void {
    if (
      scrollBarContents._targetContents.mask !== scrollBarContents._contentsMask
    ) {
      scrollBarContents._targetContents.mask = scrollBarContents._contentsMask;
    }

    const addToContainer = (displayObject: DisplayObject) => {
      if (displayObject.parent === scrollBarContents.container) return;

      displayObject.parent?.removeChild(displayObject);
      scrollBarContents.container.addChild(displayObject);
    };
    addToContainer(scrollBarContents._targetContents);
    addToContainer(scrollBarContents._contentsMask);
  }

  get targetContents(): DisplayObject {
    return this._targetContents;
  }

  set targetContents(value: DisplayObject) {
    this._targetContents = value;
    this.emit(ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
  }

  get contentsMask(): Graphics {
    return this._contentsMask;
  }

  set contentsMask(value: Graphics) {
    this._contentsMask = value;
    this.emit(ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);
  }

  public dispose(): void {
    this.removeAllListeners();
    this.container = null;
    this._contentsMask = null;
    this._targetContents = null;
  }
}
