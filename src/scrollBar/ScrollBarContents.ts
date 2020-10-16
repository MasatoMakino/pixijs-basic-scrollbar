import { Container, DisplayObject, Graphics } from "pixi.js";

/**
 * スクロールバーで操作するコンテンツ
 */
export class ScrollBarContents {
  targetContents: DisplayObject; //スクロールバーによって操作されるコンテンツ
  contentsMask: Graphics; //スクロールバーが対象とするコンテンツが表示されるエリア
  container: Container;

  public static init(scrollBarContents: ScrollBarContents): void {
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
