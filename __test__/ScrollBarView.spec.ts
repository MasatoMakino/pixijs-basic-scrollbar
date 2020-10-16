import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js";
import { ScrollBarView } from "../src";
import { MouseWheelPluginEventType } from "../src/MouseWheelPlugin";
import { ScrollBarViewInitOption } from "../src/scrollBar/ScrollBarViewInitOption";
import { SliderOptionGenerator } from "./SliderOptionGenerator";
import { SliderViewTester } from "./SliderViewTester";

export class ScrollBarTargetSet {
  targetContents: DisplayObject;
  contentsMask: DisplayObject;
  container: Container;
}
export class ScrollBarViewOptionGenerator {
  public static generate(
    contentsW: number,
    scrollBarH: number,
    contentsScale: number,
    container: Container
  ): ScrollBarViewInitOption {
    const targetContents = this.getScrollBarContents(
      0xff00ff,
      contentsW,
      scrollBarH * contentsScale,
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
    scrollBarH: number,
    contentsScale: number
  ): ScrollBarTargetSet {
    const container = new Container();
    const option = ScrollBarViewOptionGenerator.generate(
      contentsW,
      scrollBarH,
      contentsScale,
      container
    );
    return {
      ...option,
      container,
    };
  }

  public static generateScrollBarSet(
    w: number,
    h: number,
    scrollBarW: number,
    contentsScale: number
  ) {
    const sliderOption = SliderOptionGenerator.generateScrollBarOption(
      scrollBarW,
      h,
      { isHorizontal: false }
    );
    const scrollBarContents = ScrollBarViewGenerator.generateTargets(
      w,
      h,
      contentsScale
    );
    const scrollbar = new ScrollBarView(sliderOption, scrollBarContents);
    const spyLog = jest.spyOn(console, "log").mockImplementation((x) => x);
    return {
      sliderOption,
      scrollBarContents,
      scrollbar,
      spyLog,
    };
  }
}

describe("ScrollBarView", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 2.0;
  const {
    sliderOption,
    scrollBarContents,
    scrollbar,
    spyLog,
  } = ScrollBarViewGenerator.generateScrollBarSet(
    W,
    H,
    SCROLL_BAR_W,
    CONTENTS_SCALE
  );

  beforeEach(() => {
    scrollbar.changeRate(0.0);
    sliderOption.base.emit("pointerup");
    sliderOption.button.emit("pointerup");
    spyLog.mockReset();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(sliderOption.isHorizontal).toBe(false);
    expect(scrollBarContents.targetContents.y).toBe(0);
    expect(sliderOption.button.scale.y).toBe(H / 2 / SCROLL_BAR_W);
    expect(scrollbar.contentsMask).toBe(scrollBarContents.contentsMask);
    expect(scrollbar.autoHide).toBe(false);
  });

  test("change rate", () => {
    scrollbar.changeRate(0.0);
    expect(scrollBarContents.targetContents.y).toBe(0);
    scrollbar.changeRate(0.5);
    expect(scrollBarContents.targetContents.y).toBe(-H * 0.5);
    scrollbar.changeRate(1.0);
    expect(scrollBarContents.targetContents.y).toBe(-H);
  });

  test("tap base", () => {
    const base = sliderOption.base;
    const barH = H / CONTENTS_SCALE;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, base, 0.0, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, barH / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.5);
    SliderViewTester.controlButton(
      isHorizontal,
      base,
      H - barH / 2,
      "pointertap"
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, base, H, "pointertap");
    expect(scrollbar.rate).toBe(1.0);
  });

  test("drag bar", () => {
    const button = sliderOption.button;
    const barH = H / CONTENTS_SCALE;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, button, 0.0, "pointerdown");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, button, 0.0, "pointermove");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      button,
      (H - barH) / 4,
      "pointermove"
    );
    expect(scrollbar.rate).toBe(0.25);
    SliderViewTester.controlButton(
      isHorizontal,
      button,
      (H - barH) / 2,
      "pointermove"
    );
    expect(scrollbar.rate).toBe(0.5);
    SliderViewTester.controlButton(
      isHorizontal,
      button,
      H - barH,
      "pointermove"
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointermove");
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointerup");
    expect(scrollbar.rate).toBe(1.0);
  });

  test("wheel", () => {
    const target = scrollBarContents.targetContents;
    const delta = scrollbar.wheelManager.delta;
    let scroll = 0;
    while (scroll < H) {
      target.emit("wheel", { deltaY: 1 });
      scroll += delta;
      expect(scrollbar.rate).toBe(Math.min(1.0, scroll / H));
    }
    scroll = H;
    while (scroll > 0) {
      target.emit("wheel", { deltaY: -1 });
      scroll -= delta;
      expect(scrollbar.rate).toBe(Math.max(0.0, scroll / H));
    }
  });

  test("WheelManager : start and stop", () => {
    const target = scrollBarContents.targetContents;
    scrollbar.wheelManager.start();
    expect(target.listenerCount(MouseWheelPluginEventType.WHEEL)).toBe(1);
    scrollbar.wheelManager.start();
    expect(target.listenerCount(MouseWheelPluginEventType.WHEEL)).toBe(1);

    scrollbar.wheelManager.stop();
    expect(target.listenerCount(MouseWheelPluginEventType.WHEEL)).toBe(0);
    scrollbar.wheelManager.stop();
    expect(target.listenerCount(MouseWheelPluginEventType.WHEEL)).toBe(0);

    scrollbar.wheelManager.start();
    expect(target.listenerCount(MouseWheelPluginEventType.WHEEL)).toBe(1);
  });

  test("dispose", () => {
    scrollbar.dispose();
    expect(scrollbar.targetContents).toBeNull();
    expect(scrollbar.contentsMask).toBeNull();
  });
});

describe("ScrollBarView with autoHide", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 0.5;
  const {
    sliderOption,
    scrollBarContents,
    scrollbar,
    spyLog,
  } = ScrollBarViewGenerator.generateScrollBarSet(
    W,
    H,
    SCROLL_BAR_W,
    CONTENTS_SCALE
  );
  scrollbar.autoHide = true;

  afterEach(() => {
    scrollbar.changeRate(0.0);
    sliderOption.base.emit("pointerup");
    sliderOption.button.emit("pointerup");
    spyLog.mockReset();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(scrollbar.autoHide).toBe(true);
    expect(scrollBarContents.targetContents.scale.y).toBe(1.0);
    expect(sliderOption.button.visible).toBe(false);
  });
});
