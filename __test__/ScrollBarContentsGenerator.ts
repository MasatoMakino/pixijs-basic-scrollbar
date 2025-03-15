import { Container, Graphics, Rectangle } from "pixi.js";
import { ScrollBarContents } from "../src/index.js";

export class ScrollBarContentsGenerator {
  /**
   * スクロールバーのコンテンツおよびコンテンツマスクを生成する
   * @param contentsW
   * @param scrollBarH
   * @param contentsScale
   */
  public static generate(
    contentsW: number,
    scrollBarH: number,
    contentsScale: number,
  ): ScrollBarContents {
    const container = new Container();

    const targetContents = new Container();
    targetContents.hitArea = new Rectangle(
      0,
      0,
      contentsW,
      scrollBarH * contentsScale,
    );

    const contentsMask = this.getScrollBarContents(
      0x0000ff,
      contentsW,
      scrollBarH,
    );
    return new ScrollBarContents(targetContents, contentsMask, container);
  }

  /**
   * 任意の色とサイズのGraphicsオブジェクトを生成する。
   * @param color
   * @param w
   * @param h
   * @private
   */
  private static getScrollBarContents(color: number, w: number, h: number) {
    const g = new Graphics().rect(0, 0, w, h).fill(color);
    g.boundsArea = new Rectangle(0, 0, w, h);
    return g;
  }
}
