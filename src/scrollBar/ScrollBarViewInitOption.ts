import { DisplayObject } from "pixi.js";

/**
 * スクロールバーの初期化時に必須となる項目をまとめたオブジェクト
 * スクロール対象とスクロールエリアのマスクを指定する。
 */
export class ScrollBarViewInitOption {
  targetContents: DisplayObject; //スクロールバーによって操作されるコンテンツ
  contentsMask: DisplayObject; //スクロールバーが対象とするコンテンツが表示されるエリア

  public static check(option: ScrollBarViewInitOption) {
    this.checkTargetMask(option);
    this.checkTargetMaskParent(option);
    this.checkBounds(option.targetContents, "targetContents");
    this.checkBounds(option.contentsMask, "contentsMask");
  }

  private static checkTargetMask(option: ScrollBarViewInitOption) {
    if (option.targetContents.mask !== option.contentsMask) {
      console.warn(
        "ScrollBarView : スクロールするコンテンツにマスクが設定されていません。",
        option.targetContents,
        option.contentsMask
      );
    }
  }

  private static checkTargetMaskParent(option: ScrollBarViewInitOption) {
    if (option.contentsMask.parent != option.contentsMask.parent) {
      console.warn(
        "ScrollBarView : スクロールするコンテンツと、そのマスクは表示ツリー上で同一の親Containerを持っている必要があります。",
        option.targetContents,
        option.contentsMask
      );
    }
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
