import {
  DisplayObject,
  InteractionData,
  InteractionEvent,
  Point,
} from "pixi.js";
import { SliderView } from "../src";
import { SliderGenerator } from "./SliderGenerator";

describe("SliderView", () => {
  const spyLog = jest.spyOn(console, "log").mockImplementation((x) => {
    x;
  });
  const sliderSize = 100;
  const option = SliderGenerator.generateOption(sliderSize, sliderSize);
  const { slider, sliderButton, sliderBase } = SliderGenerator.initSlider(
    option
  );

  beforeEach(() => {
    sliderButton.emit("pointerup");
    slider.changeRate(1.0);
    spyLog.mockReset();
  });

  test("init", () => {
    expect(slider.rate).toBe(1.0);
    expect(slider.isHorizontal).toBe(true);
  });

  const changeRate = (rate: number) => {
    slider.changeRate(rate);
    testRate(rate);
  };
  const testRate = (rate: number, hasChangedEvent: boolean = true) => {
    expect(slider.rate).toBe(rate);
    if (hasChangedEvent) {
      expect(spyLog).toBeCalledWith(rate);
    }
    expect(sliderButton.x).toBe(rate * sliderSize);
  };
  test("set rate", () => {
    changeRate(0.0);
    changeRate(0.5);
    changeRate(1.0);
  });

  const controlButton = (
    target: DisplayObject,
    pos: number,
    type: string,
    hasChangedEvent: boolean = true
  ) => {
    const e = generateInteractionEvent(target, pos, 0);
    target.emit(type, e);
    const rate = pos / sliderSize;
    testRate(rate, hasChangedEvent);
  };
  const tapBase = (pos: number) => {
    controlButton(sliderBase, pos, "pointertap");
  };
  test("tap base", () => {
    tapBase(0.0);
    tapBase(0.5 * sliderSize);
    tapBase(1.0 * sliderSize);
  });

  const dragButton = (
    pos: number,
    type: string,
    hasChangedEvent: boolean = true
  ) => {
    controlButton(sliderButton, pos, type, hasChangedEvent);
  };
  test("drag button", () => {
    dragButton(1.0 * sliderSize, "pointerdown", false);
    dragButton(0.5 * sliderSize, "pointermove");
    dragButton(0.0 * sliderSize, "pointermove");
    dragButton(0.0 * sliderSize, "pointerup");
  });

  test("change rate with drag button", () => {
    /**
     * ドラッグ中のchangeRate()は無視する。
     */
    dragButton(1.0 * sliderSize, "pointerdown", false);
    dragButton(0.5 * sliderSize, "pointermove");
    slider.changeRate(0.0);
    expect(slider.rate).toBe(0.5);
    dragButton(0.0 * sliderSize, "pointermove");
    dragButton(0.0 * sliderSize, "pointerup");
  });

  test("dispose", () => {
    slider.dispose();
    expect(slider.children.length).toBe(0);
    expect(sliderButton.listenerCount("pointerdown")).toBe(0);
  });
});

const generateInteractionEvent = (
  target: DisplayObject,
  globalX: number,
  globalY: number
): InteractionEvent => {
  const e = new InteractionEvent();
  e.currentTarget = target;
  e.data = new InteractionData();
  e.data.global = new Point(globalX, globalY);
  return e;
};
