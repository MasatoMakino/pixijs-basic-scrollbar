import TWEEN from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";
import { DummyPointerEvent } from "./DummpyPointerEvent";
import { ScrollBarViewGenerator } from "./ScrollBarViewGenerator";
import { SliderViewTester } from "./SliderViewTester";

describe("ScrollBarView with content shorter than the mask", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 0.8;

  const { sliderOption, scrollBarContents, scrollbar, spyLog } =
    ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView with autoHide"
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

  /**
   * スクロールバーのyスケールは、baseに対して100%になる
   */
  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(sliderOption.isHorizontal).toBe(false);
    expect(scrollBarContents.target.y).toBe(0);
    expect(sliderOption.button.scale.y).toBe(H / SCROLL_BAR_W);
    expect(scrollbar.contents.mask).toBe(scrollBarContents.mask);
    expect(scrollbar.autoHide).toBe(false);
  });

  /**
   * コンテンツはマスクエリア内に収まっているので、スライダーバーベースのどこをタップしてもrateは0.0になる
   */
  test("tap base", () => {
    const base = sliderOption.base;
    const barH = H / CONTENTS_SCALE;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, base, 0.0, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, barH / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      base,
      H - barH / 2,
      "pointertap"
    );
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
  });

  /**
   * バーをドラッグしてもコンテンツは動かない
   */
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
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      button,
      (H - barH) / 2,
      "pointermove"
    );
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      button,
      H - barH,
      "pointermove"
    );
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointermove");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointerup");
    expect(scrollbar.rate).toBe(0.0);
  });

  describe("InertialScrollManager", () => {
    test("drag", () => {
      const controlButton = SliderViewTester.controlButton;
      const target = scrollBarContents.target;
      const isHorizontal = scrollbar.isHorizontal;
      const maxPos = 100;
      const inertial = scrollbar.inertialManager;
      inertial.decelerationRate = 0.975;

      controlButton(isHorizontal, target, 0, "pointerdown");
      expect(scrollbar.rate).toBe(0);
      expect(scrollbar.contents.target.y).toBe(0);

      controlButton(isHorizontal, target, maxPos, "pointermove");
      expect(scrollbar.contents.target.y).toBe(maxPos);

      controlButton(isHorizontal, target, maxPos, "pointerup");
      expect(scrollbar.contents.target.y).toBe(maxPos + inertial.speed);
      expect(inertial.speed).toBeCloseTo(43.33333333333333);

      updateTicker(16);
      expect(scrollbar.contents.target.y).toBeCloseTo(151.9398148148148);
      expect(inertial.speed).toBeCloseTo(8.606481481481485);

      updateTicker(16 * 2);
      expect(scrollbar.contents.target.y).toBeCloseTo(153.24793691236567);
      expect(inertial.speed).toBeCloseTo(1.3081220975508696);

      updateTicker(16 * 3);
      expect(scrollbar.contents.target.y).toBeCloseTo(153.4374929721324);
      expect(inertial.speed).toBeCloseTo(0.1895560597667176);

      updateTicker(16 * 4);
      expect(scrollbar.contents.target.y).toBeCloseTo(153.4647663447184);
      expect(inertial.speed).toBeCloseTo(0);

      updateTicker(Infinity);
      expect(scrollbar.contents.target.y).toBeCloseTo(0.0);
      expect(scrollbar.rate).toBe(0.0);
    });
  });
});

const updateTicker = (t: number) => {
  PIXI.Ticker.shared.update(t);
  TWEEN.update(t);
};
