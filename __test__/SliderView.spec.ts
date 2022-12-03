import { SliderView } from "../src";
import { DummyPointerEvent } from "./DummpyPointerEvent";
import { SliderGenerator } from "./SliderGenerator";
import { SliderOptionGenerator } from "./SliderOptionGenerator";
import { SliderViewTester } from "./SliderViewTester";

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
    // expect(sliders.slider.rate).toBe(0.5);
    // SliderViewTester.dragButton(sliders, 0.0 * sliderSize, "pointermove");
    // SliderViewTester.dragButton(sliders, 0.0 * sliderSize, "pointerup");
  });

  test("dispose", () => {
    sliders.slider.dispose();
    expect(sliders.slider.children.length).toBe(0);
    expect(sliders.sliderButton.listenerCount("pointerdown")).toBe(0);
  });
});

describe("Minimal SliderView", () => {
  const sliderSize = 100;
  const option = SliderOptionGenerator.generateMinimalOption(
    sliderSize,
    sliderSize
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
