import { Container, DisplayObject, Graphics } from "pixi.js";

/**
 * スクロールバーで操作するコンテンツ
 */
export class ScrollBarContents {
  /**
   * コンストラクタ
   * @param targetContents スクロール操作を受けるコンテンツ
   * @param contentsMask targetContentsを切り抜くマスク
   * @param container targetContentsおよびcontentsMaskのマスク
   */
  constructor(
    public targetContents: DisplayObject,
    public contentsMask: Graphics,
    public container: Container
  ) {
    ScrollBarContents.init(this);
  }

  private static init(scrollBarContents: ScrollBarContents): void {
    if (
      scrollBarContents.targetContents.mask !== scrollBarContents.contentsMask
    ) {
      scrollBarContents.targetContents.mask = scrollBarContents.contentsMask;
    }

    const addToContainer = (displayObject: DisplayObject) => {
      if (displayObject.parent === scrollBarContents.container) return;

      displayObject.parent?.removeChild(displayObject);
      scrollBarContents.container.addChild(displayObject);
    };
    addToContainer(scrollBarContents.targetContents);
    addToContainer(scrollBarContents.contentsMask);
  }
}
