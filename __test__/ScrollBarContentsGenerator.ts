import { Container, Graphics, Rectangle } from "pixi.js";
import { ScrollBarContents } from "../src/scrollBar/ScrollBarContents";

export class ScrollBarContentsGenerator {
  public static generate(
    contentsW: number,
    scrollBarH: number,
    contentsScale: number
  ): ScrollBarContents {
    const container = new Container();
    const targetContents = this.getScrollBarContents(
      0xff00ff,
      contentsW,
      scrollBarH * contentsScale
    );
    const contentsMask = this.getScrollBarContents(
      0x0000ff,
      contentsW,
      scrollBarH
    );
    return {
      targetContents,
      contentsMask,
      container,
    };
  }
  private static getScrollBarContents(color, w, h) {
    const g = new Graphics();
    g.beginFill(color);
    g.drawRect(0, 0, w, h);
    g.hitArea = new Rectangle(0, 0, w, h);
    return g;
  }
}
