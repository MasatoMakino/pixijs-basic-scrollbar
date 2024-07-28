import { Ticker } from "pixi.js";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { DummyPointerEvent } from "./DummpyPointerEvent.js";
import { ScrollBarViewGenerator } from "./ScrollBarViewGenerator.js";
import { SliderViewTester } from "./SliderViewTester.js";

describe("ScrollBarView", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 2.0;
  const { sliderOption, scrollBarContents, scrollbar, spyLog } =
    ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView",
    );

  beforeEach(() => {
    DummyPointerEvent.emit(scrollbar.contents.target, "pointerup");

    scrollbar.inertialManager.stopInertial();
    scrollbar.inertialManager.start();

    scrollbar.changeRate(0.0);
    DummyPointerEvent.emit(sliderOption.base, "pointerup");
    DummyPointerEvent.emit(sliderOption.button, "pointerup");
    updateTicker(-1);
    spyLog.mockReset();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(sliderOption.isHorizontal).toBe(false);
    expect(scrollBarContents.target.y).toBe(0);
    expect(sliderOption.button.scale.y).toBe(H / 2 / SCROLL_BAR_W);
    expect(scrollbar.contents.mask).toBe(scrollBarContents.mask);
    expect(scrollbar.autoHide).toBe(false);
  });

  test("change rate", () => {
    scrollbar.changeRate(0.0);
    expect(scrollBarContents.target.y).toBe(0);
    scrollbar.changeRate(0.5);
    expect(scrollBarContents.target.y).toBe(-H * 0.5);
    scrollbar.changeRate(1.0);
    expect(scrollBarContents.target.y).toBe(-H);
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
      "pointertap",
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
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      0.0,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      (H - barH) / 4,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.25);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      (H - barH) / 2,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.5);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      H - barH,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      H,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointerup");
    expect(scrollbar.rate).toBe(1.0);
  });

  test("wheel", () => {
    const target = scrollBarContents.target;
    const delta = scrollbar.wheelManager.delta;
    let scroll = 0;
    while (scroll < H) {
      DummyPointerEvent.emit(target, "wheel", { deltaY: 1 });
      scroll += delta;
      expect(scrollbar.rate).toBe(Math.min(1.0, scroll / H));
    }
    scroll = H;
    while (scroll > 0) {
      DummyPointerEvent.emit(target, "wheel", { deltaY: -1 });
      scroll -= delta;
      expect(scrollbar.rate).toBe(Math.max(0.0, scroll / H));
    }
  });

  test("WheelManager : start and stop", () => {
    const target = scrollBarContents.target;
    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);
    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);

    scrollbar.wheelManager.stop();
    expect(target.listenerCount("wheel")).toBe(0);
    scrollbar.wheelManager.stop();
    expect(target.listenerCount("wheel")).toBe(0);

    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);
  });

  describe("InertialScrollManager", () => {
    test("start and stop", () => {
      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);
      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);

      scrollbar.inertialManager.stop();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(0);
      scrollbar.inertialManager.stop();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(0);

      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);
    });

    test("drag", () => {
      const controlButton = SliderViewTester.controlButton;
      const target = scrollBarContents.target;
      const isHorizontal = scrollbar.isHorizontal;
      const maxPos = -H * (CONTENTS_SCALE - 1);
      const inertial = scrollbar.inertialManager;
      inertial.decelerationRate = 0.975;

      controlButton(isHorizontal, target, 0, "pointerdown");
      expect(scrollbar.rate).toBe(0);
      controlButton(isHorizontal, target, maxPos, "pointermove");
      expect(scrollbar.rate).toBe(1.0);
      controlButton(isHorizontal, target, maxPos, "pointerup");
      expect(scrollbar.rate).toBe(
        1.0 + scrollbar.inertialManager.decelerationRate,
      );
      expect(inertial.speed).toBe(-97.5);

      updateTicker(16);
      expect(scrollbar.rate).toBeCloseTo(2.41);
      expect(inertial.speed).toBeCloseTo(-43.57);

      updateTicker(16 * 2);
      expect(scrollbar.rate).toBeCloseTo(2.502);
      expect(inertial.speed).toBeCloseTo(-9.1876);

      updateTicker(16 * 3);
      expect(scrollbar.rate).toBeCloseTo(2.517);
      expect(inertial.speed).toBeCloseTo(-1.4801);

      updateTicker(16 * 4);
      expect(scrollbar.rate).toBeCloseTo(2.519);
      expect(inertial.speed).toBeCloseTo(-0.2265);

      updateTicker(16 * 5);
      expect(scrollbar.rate).toBeCloseTo(2.519);
      expect(inertial.speed).toBe(0);
    });
  });

  test("dispose", () => {
    expect(scrollbar.contents.listeners("changed_contents_size")).not.toEqual(
      [],
    );
    scrollbar.dispose();
    expect(scrollbar.contents.listeners("changed_contents_size")).toEqual([]);
  });
});

describe("ScrollBarView with autoHide", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 0.5;
  const { sliderOption, scrollBarContents, scrollbar, spyLog } =
    ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView with autoHide",
    );
  scrollbar.autoHide = true;

  beforeEach(() => {
    updateTicker(-1);
  });

  afterEach(() => {
    scrollbar.changeRate(0.0);
    DummyPointerEvent.emit(sliderOption.base, "pointerup");
    DummyPointerEvent.emit(sliderOption.button, "pointerup");
    spyLog.mockReset();
  });

  afterAll(() => {
    scrollbar.dispose();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(scrollbar.autoHide).toBe(true);
    expect(scrollBarContents.target.scale.y).toBe(1.0);
    expect(sliderOption.button.visible).toBe(false);
  });

  /**
   * hiddenの場合、SliderのBaseタップは無視する
   */
  test("tap base on hidden", () => {
    const base = sliderOption.base;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, base, 0.0, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
  });
});

const updateTicker = (t: number) => {
  Ticker.shared.update(t);
};
