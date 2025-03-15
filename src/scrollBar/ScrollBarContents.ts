import { Container, EventEmitter, Graphics } from "pixi.js";
import { SliderView, SliderViewUtil } from "../index.js";
import { ScrollBarContentsEventType } from "./index.js";

/**
 * スクロールバーで操作するコンテンツ
 *
 * コンテンツのサイズを変更した場合"changed_contents_size"イベントをemitすると、スクロールバーが再描画される。
 */
export class ScrollBarContents extends EventEmitter<ScrollBarContentsEventType> {
  readonly target: Container;
  readonly mask: Graphics;

  /**
   * コンストラクタ
   *
   * @param target スクロール操作を受けるコンテンツ
   * @param mask targetを切り抜くマスク
   * @param container targetおよびmaskを格納する親コンテナ
   */
  constructor(
    target: Container,
    mask: Graphics,
    public container: Container,
  ) {
    super();
    this.target = target;
    this.mask = mask;
    ScrollBarContents.init(this);
  }

  private static init(scrollBarContents: ScrollBarContents): void {
    if (scrollBarContents.target.hitArea == null) {
      console.warn(
        `A hit area has not been set for the scrollbar contents.
Without a hit area, drag operations cannot be properly detected.
Therefore, it is recommended to set a custom hit area for scrollbar contents.

ヒットエリアがスクロールバーコンテンツに設定されていません。
ヒットエリアが設定されていないと、ドラッグ中の操作が正常に判定できません。
そのため、スクロールバーコンテンツにはカスタムヒットエリアを設定するよう推奨します。`,
      );
    }

    if (scrollBarContents.target.mask !== scrollBarContents.mask) {
      scrollBarContents.target.mask = scrollBarContents.mask;
    }

    const addToContainer = (displayObject: Container) => {
      if (displayObject.parent === scrollBarContents.container) return;

      displayObject.parent?.removeChild(displayObject);
      scrollBarContents.container.addChild(displayObject);
    };
    addToContainer(scrollBarContents.target);
    addToContainer(scrollBarContents.mask);
  }

  /**
   * 現状のスクロール位置を取得する。単位rate
   * 0.0でコンテンツはTOP, 1.0でBOTTOMに位置している。
   *
   * @param isHorizontal
   */
  public getScrollPositionAsRate(isHorizontal: boolean): number {
    const getPos = SliderViewUtil.getPosition;
    const zeroPos = getPos(this.mask, isHorizontal);
    const contentsPos = getPos(this.target, isHorizontal);
    const contentsPositionDif = zeroPos - contentsPos;

    const movableRange = this.getMovableRange(isHorizontal);

    return (contentsPositionDif / movableRange) * SliderView.MAX_RATE;
  }

  /**
   * スクロールの最大可動領域を取得する。単位px
   * もし可動域がゼロpx以下の場合、極小の正の値を返す。
   *
   * @param isHorizontal
   * @private
   */
  private getMovableRange(isHorizontal: boolean): number {
    const getSize = SliderViewUtil.getSize;
    const targetSize = getSize(this.target, isHorizontal);
    const maskSize = getSize(this.mask, isHorizontal);
    const dif = targetSize - maskSize;
    if (dif <= 0.0) {
      return 1e-128;
    }
    return dif;
  }

  /**
   * コンテンツを、指定されたrateの位置までスクロールする
   *
   * @param rate
   * @param isHorizontal
   */
  public scroll(rate: number, isHorizontal: boolean): void {
    const getPos = SliderViewUtil.getPosition;
    const zeroPos: number = getPos(this.mask, isHorizontal);
    const movableRange = this.getMovableRange(isHorizontal);
    const contentsPos = zeroPos - movableRange * (rate / SliderView.MAX_RATE);

    SliderViewUtil.setPosition(this.target, isHorizontal, contentsPos);
  }

  /**
   * コンテンツが表示領域にどれだけ表示されているかの比率を取得する。
   * この比率は、スクロールバーボタンのスケールとなる。
   *
   * 例 : コンテンツサイズが200、表示領域が100なら0.5
   * コンテンツがすべて表示されているなら1.0
   *
   * @param isHorizontal
   * @return 0.0 ~ 1.0
   */
  public getDisplayRate(isHorizontal: boolean): number {
    const getSize = SliderViewUtil.getSize;
    const contentsSize = getSize(this.target, isHorizontal);
    const maskSize = getSize(this.mask, isHorizontal);
    return SliderViewUtil.clamp(
      maskSize / contentsSize,
      SliderView.MAX_RATE,
      0.0,
    );
  }

  public dispose(): void {
    this.removeAllListeners();
  }
}
