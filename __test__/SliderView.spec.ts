import { describe, beforeEach, test, expect } from "vitest";
import { DummyPointerEvent } from "./DummyPointerEvent.js";
import { SliderGenerator } from "./SliderGenerator.js";
import { SliderOptionGenerator } from "./SliderOptionGenerator.js";
import { SliderViewTester } from "./SliderViewTester.js";

describe("SliderView", () => {
  const sliderSize = 100;
  const option = SliderOptionGenerator.generateOption(sliderSize, sliderSize);
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    DummyPointerEvent.emit(sliders.sliderButton, "pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider.rate).toBe(1.0);
    expect(sliders.slider.isHorizontal).toBe(true);
  });

  test("set rate", () => {
    SliderViewTester.changeRateTest(sliders);
  });

  test("tap base", () => {
    SliderViewTester.tabBaseTest(sliders);
  });

  test("drag button", () => {
    SliderViewTester.dragButton(sliders, 1.0 * sliderSize, "pointerdown", {
      hasChangedEvent: false,
    });
    SliderViewTester.dragButton(sliders, 0.5 * sliderSize, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointerup");
  });

  test("change rate with drag button", () => {
    /**
     * ドラッグ中のchangeRate()は無視する。
     */
    SliderViewTester.dragButton(sliders, 1 * sliderSize, "pointerdown", {
      hasChangedEvent: false,
    });
    SliderViewTester.dragButton(sliders, 0.5 * sliderSize, "pointermove");
    sliders.slider.changeRate(0.0);
  });

  test("wheel on base", () => {
    sliders.slider.changeRate(0.5);
    const delta = -1;
    DummyPointerEvent.emit(sliders.sliderBase, "wheel", { deltaY: delta });
    expect(sliders.slider.rate).toBe(0.5 + sliders.slider.wheelSpeed * delta);
  });

  test("wheel on button", () => {
    sliders.slider.changeRate(0.5);
    const delta = -1;
    DummyPointerEvent.emit(sliders.sliderButton, "wheel", { deltaY: delta });
    expect(sliders.slider.rate).toBe(0.5 + sliders.slider.wheelSpeed * delta);
  });

  test("wheel overflow", () => {
    sliders.slider.changeRate(0.5);
    const delta = Number.MAX_SAFE_INTEGER;
    DummyPointerEvent.emit(sliders.sliderBase, "wheel", {
      deltaY: Number.POSITIVE_INFINITY,
    });
    expect(sliders.slider.rate).toBe(1);

    DummyPointerEvent.emit(sliders.sliderBase, "wheel", {
      deltaY: Number.NEGATIVE_INFINITY,
    });
    expect(sliders.slider.rate).toBe(0);
  });

  test("dispose", () => {
    sliders.slider.dispose();
    expect(sliders.slider.children.length).toBe(0);
    expect(sliders.sliderButton.listenerCount("pointerdown")).toBe(0);
  });

  describe("multi-touch interactions", () => {
    const sliderSize = 100;
    const option = SliderOptionGenerator.generateOption(sliderSize, sliderSize);
    const sliders = SliderGenerator.initSlider(option);

    beforeEach(() => {
      DummyPointerEvent.emit(sliders.sliderButton, "pointerup");
      // Start from rate 0.0 for multi-touch tests
      sliders.slider.changeRate(0.0);
      sliders.spyLog.mockReset();
    });

    test("during drag with pointer 1, tap base with pointer 2 should be ignored", () => {
      // 1. Start drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        0,
        "pointerdown",
        { hasChangedEvent: false },
        1,
      );

      // 2. Move drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.3,
        "pointermove",
        { hasChangedEvent: false },
        1,
      );

      // 3. Tap base with pointer 2 (should be ignored)
      SliderViewTester.controlButton(
        sliders.slider.isHorizontal,
        sliders.sliderBase,
        sliders.size * 0.8,
        "pointertap",
        2,
      );
      // Rate should NOT change due to pointer 2 tap
      expect(sliders.slider.rate).toBe(0.3);

      // 4. Continue move drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.6,
        "pointermove",
        { hasChangedEvent: false },
        1,
      );

      // 5. End drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.6,
        "pointerup",
        { hasChangedEvent: false },
        1,
      );
    });

    test("during drag with pointer 1, attempt to drag with pointer 2 should be ignored", () => {
      // 1. Start drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        0,
        "pointerdown",
        { hasChangedEvent: false },
        1,
      );

      // 2. Move drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.3,
        "pointermove",
        { hasChangedEvent: false },
        1,
      );

      // 3. Attempt to start drag with pointer 2 (should be ignored)
      SliderViewTester.controlButton(
        sliders.slider.isHorizontal,
        sliders.sliderButton,
        sliders.size * 0.7,
        "pointerdown",
        2,
      );
      expect(sliders.slider.rate).toBe(0.3); // Rate should not change

      // 4. Attempt to move with pointer 2 (should be ignored)
      SliderViewTester.controlButton(
        sliders.slider.isHorizontal,
        sliders.slider.buttonRootContainer,
        sliders.size * 0.9,
        "pointermove",
        2,
      );
      expect(sliders.slider.rate).toBe(0.3); // Rate should not change

      // 5. Continue move with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.6,
        "pointermove",
        { hasChangedEvent: false },
        1,
      );

      // 6. End drag with pointer 1
      SliderViewTester.dragButton(
        sliders,
        sliders.size * 0.6,
        "pointerup",
        { hasChangedEvent: false },
        1,
      );
    });
  });
});

describe("Minimal SliderView", () => {
  const sliderSize = 100;
  const option = SliderOptionGenerator.generateMinimalOption(
    sliderSize,
    sliderSize,
  );
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    DummyPointerEvent.emit(sliders.sliderButton, "pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider).toBeTruthy();
  });

  test("set rate", () => {
    SliderViewTester.changeRateTest(sliders);
  });

  test("tap base", () => {
    SliderViewTester.tabBaseTest(sliders);
  });

  test("drag button", () => {
    SliderViewTester.dragButton(sliders, sliderSize, "pointerdown", {
      hasChangedEvent: false,
    });
    SliderViewTester.dragButton(sliders, 0.5 * sliderSize, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointerup");
  });
});

describe("Vertical SliderView", () => {
  const sliderSize = 100;
  const option = SliderOptionGenerator.generateOption(sliderSize, sliderSize, {
    isHorizontal: false,
  });
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    DummyPointerEvent.emit(sliders.sliderButton, "pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider).toBeTruthy();
    expect(sliders.slider.isHorizontal).toBe(false);
  });

  test("tap base", () => {
    SliderViewTester.tabBaseTest(sliders);
  });

  test("drag button", () => {
    SliderViewTester.dragButton(sliders, sliderSize, "pointerdown", {
      hasChangedEvent: false,
    });
    SliderViewTester.dragButton(sliders, 0.5 * sliderSize, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointermove");
    SliderViewTester.dragButton(sliders, 0, "pointerup");
  });
});

describe("Slider without mask", () => {
  const sliderSize = 1000;
  const option = SliderOptionGenerator.generateOption(sliderSize, sliderSize, {
    hasMask: false,
  });
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    DummyPointerEvent.emit(sliders.sliderButton, "pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider).toBeTruthy();
  });

  test("tap base", () => {
    SliderViewTester.tabBaseTest(sliders);
  });
});
