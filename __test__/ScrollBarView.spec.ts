import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js";
import { ScrollBarView, ScrollBarViewInitOption } from "../src";
import { SliderOptionGenerator } from "./SliderOptionGenerator";

export class ScrollBarTargetSet {
  targetContents: DisplayObject;
  contentsMask: DisplayObject;
  container: Container;
}
export class ScrollBarViewOptionGenerator {
  public static generate(
    contentsW: number,
    scrollBarH: number,
    container: Container
  ): ScrollBarViewInitOption {
    const targetContents = this.getScrollBarContents(
      0xff00ff,
      contentsW,
      scrollBarH * 2,
      container
    );
    const contentsMask = this.getScrollBarContents(
      0x0000ff,
      contentsW,
      scrollBarH,
      container
    );
    targetContents.mask = contentsMask;
    return {
      targetContents,
      contentsMask,
    };
  }
  private static getScrollBarContents(color, w, h, container: Container) {
    const g = new Graphics();
    g.beginFill(color);
    g.drawRect(0, 0, w, h);
    g.hitArea = new Rectangle(0, 0, w, h);
    container.addChild(g);
    return g;
  }
}

export class ScrollBarViewGenerator {
  public static generateTargets(
    contentsW: number,
    scrollBarH: number
  ): ScrollBarTargetSet {
    const container = new Container();
    const option = ScrollBarViewOptionGenerator.generate(
      contentsW,
      scrollBarH,
      container
    );
    return {
      ...option,
      container,
    };
  }
}

describe("ScrollBarView", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;

  const sliderOption = SliderOptionGenerator.generateScrollBarOption(
    SCROLL_BAR_W,
    H,
    { isHorizontal: false }
  );
  const scrollBarContents = ScrollBarViewGenerator.generateTargets(W, H);
  const scrollbar = new ScrollBarView(sliderOption, scrollBarContents);

  const spyLog = jest.spyOn(console, "log").mockImplementation((x) => x);

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(sliderOption.isHorizontal).toBe(false);
    expect(scrollBarContents.targetContents.y).toBe(0);
    expect(sliderOption.button.scale.y).toBe(H / 2 / SCROLL_BAR_W);
  });

  test("change rate", () => {
    scrollbar.changeRate(0.0);
    expect(scrollBarContents.targetContents.y).toBe(0);
    scrollbar.changeRate(0.5);
    expect(scrollBarContents.targetContents.y).toBe(-H * 0.5);
    scrollbar.changeRate(1.0);
    expect(scrollBarContents.targetContents.y).toBe(-H);
  });
});
