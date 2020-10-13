import { SliderView } from "../src";
import { SliderGenerator } from "./SliderGenerator";
import { SliderViewTester } from "./SliderViewTester";

describe("SliderView", () => {
  const sliderSize = 100;
  const option = SliderGenerator.generateOption(sliderSize, sliderSize);
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    sliders.sliderButton.emit("pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider.rate).toBe(1.0);
    expect(sliders.slider.isHorizontal).toBe(true);
  });

  test("set rate", () => {
    SliderViewTester.changeRate(sliders, 0.0);
    SliderViewTester.changeRate(sliders, 0.5);
    SliderViewTester.changeRate(sliders, 1.0);
  });

  test("tap base", () => {
    SliderViewTester.tapBase(sliders, 0.0);
    SliderViewTester.tapBase(sliders, 0.5 * sliderSize);
    SliderViewTester.tapBase(sliders, 1.0 * sliderSize);
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
    SliderViewTester.dragButton(sliders, 1.0 * sliderSize, "pointerdown", {
      hasChangedEvent: false,
    });
    SliderViewTester.dragButton(sliders, 0.5 * sliderSize, "pointermove");
    sliders.slider.changeRate(0.0);
    expect(sliders.slider.rate).toBe(0.5);
    SliderViewTester.dragButton(sliders, 0.0 * sliderSize, "pointermove");
    SliderViewTester.dragButton(sliders, 0.0 * sliderSize, "pointerup");
  });

  test("dispose", () => {
    sliders.slider.dispose();
    expect(sliders.slider.children.length).toBe(0);
    expect(sliders.sliderButton.listenerCount("pointerdown")).toBe(0);
  });
});

describe("Minimal SliderView", () => {
  const sliderSize = 100;
  const option = SliderGenerator.generateMinimalOption(sliderSize, sliderSize);
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    sliders.sliderButton.emit("pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider).toBeTruthy();
  });

  test("set rate", () => {
    SliderViewTester.changeRate(sliders, 0.0);
    SliderViewTester.changeRate(sliders, 0.5);
    SliderViewTester.changeRate(sliders, 1.0);
  });
});

describe("Vertical SliderView", () => {
  const sliderSize = 100;
  const option = SliderGenerator.generateOption(sliderSize, sliderSize, {
    isHorizontal: false,
  });
  const sliders = SliderGenerator.initSlider(option);

  beforeEach(() => {
    sliders.sliderButton.emit("pointerup");
    sliders.slider.changeRate(1.0);
    sliders.spyLog.mockReset();
  });

  test("init", () => {
    expect(sliders.slider).toBeTruthy();
  });
});
