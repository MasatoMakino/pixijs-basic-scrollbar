import { DisplayObject, DisplayObjectEvents, Point } from "pixi.js";
import { DummyPointerEvent } from "./DummpyPointerEvent.js";
import { SliderSet } from "./SliderGenerator.js";

export class TestRateOption {
  hasChangedEvent?: boolean;

  public static initOption(option?: TestRateOption) {
    option ??= {};
    option.hasChangedEvent ??= true;
    return option;
  }
}

export class SliderViewTester {
  public static generateInteractionEvent(
    target: DisplayObject,
    globalX: number,
    globalY: number,
  ) {
    return {
      currentTarget: target,
      globalX: globalX,
      globalY: globalY,
      offsetX: globalX,
      offsetY: globalY,
      global: new Point(globalX, globalY),
    };
  }

  public static controlButton(
    isHorizontal: boolean,
    target: DisplayObject | HTMLCanvasElement,
    pos: number,
    type: keyof DisplayObjectEvents,
  ) {
    const globalX = isHorizontal ? pos : 0;
    const globalY = isHorizontal ? 0 : pos;
    const e = SliderViewTester.generateInteractionEvent(
      target as DisplayObject,
      globalX,
      globalY,
    );
    DummyPointerEvent.emit(target, type, e);
  }

  public static testRate(
    targets: SliderSet,
    rate: number,
    option?: TestRateOption,
  ) {
    option = TestRateOption.initOption(option);
    expect(targets.slider.rate).toBe(rate);

    if (option.hasChangedEvent) {
      expect(targets.spyLog).toBeCalledWith(rate);
    }

    const isHorizontal = targets.slider.isHorizontal;

    const buttonPos = isHorizontal
      ? targets.sliderButton.x
      : targets.sliderButton.y;
    expect(buttonPos).toBe(rate * targets.size);

    if (targets.sliderBar && targets.sliderBarMask) {
      const maskScale = targets.sliderBarMask.scale;
      const scale = targets.slider.isHorizontal ? maskScale.x : maskScale.y;
      expect(scale).toBe(rate);
    }

    if (targets.sliderBar && !targets.sliderBarMask) {
      const barScale = targets.sliderBar.scale;
      const scale = targets.slider.isHorizontal ? barScale.x : barScale.y;
      expect(scale).toBe(rate);
    }
  }

  public static changeRate(
    sliders: SliderSet,
    rate: number,
    option?: TestRateOption,
  ) {
    sliders.slider.changeRate(rate);
    SliderViewTester.testRate(sliders, rate, option);
  }

  public static tapBase(
    sliders: SliderSet,
    pos: number,
    option?: TestRateOption,
  ) {
    SliderViewTester.controlButton(
      sliders.slider.isHorizontal,
      sliders.sliderBase,
      pos,
      "pointertap",
    );
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }

  public static dragButton(
    sliders: SliderSet,
    pos: number,
    type: keyof DisplayObjectEvents,
    option?: TestRateOption,
  ) {
    SliderViewTester.controlButton(
      sliders.slider.isHorizontal,
      type === "pointermove"
        ? sliders.slider.buttonRootContainer
        : sliders.sliderButton,
      pos,
      type,
    );
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }

  public static changeRateTest(sliders: SliderSet) {
    SliderViewTester.changeRate(sliders, 0.0);
    SliderViewTester.changeRate(sliders, 0.5);
    SliderViewTester.changeRate(sliders, 1.0);
  }

  public static tabBaseTest(sliders: SliderSet) {
    SliderViewTester.tapBase(sliders, 0.0);
    SliderViewTester.tapBase(sliders, 0.5 * sliders.size);
    SliderViewTester.tapBase(sliders, sliders.size);
  }
}
