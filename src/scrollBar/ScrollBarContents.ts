import { Container, DisplayObject, Graphics } from "pixi.js";

/**
 * スクロールバーで操作するコンテンツ
 */
export class ScrollBarContents {
  targetContents: DisplayObject; //スクロールバーによって操作されるコンテンツ
  contentsMask: Graphics; //スクロールバーが対象とするコンテンツが表示されるエリア
  container: Container;

  public static init(scrollBarContents: ScrollBarContents): void {
    this.check(scrollBarContents);

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

  private static check(scrollBarContents: ScrollBarContents): void {
    this.checkBounds(scrollBarContents.targetContents, "targetContents");
    this.checkBounds(scrollBarContents.contentsMask, "contentsMask");
  }

  private static checkBounds(target: DisplayObject, targetType: string) {
    if (target.getLocalBounds() === null) {
      throw new Error(
        `ScrollBarView : 初期化オプションで指定された${targetType}にバウンディングボックスが存在しません。
ShapeやContainerを利用する場合はsetBounds関数を利用して、バウンディングボックスを手動で設定してください。`
      );
    }
  }
}
