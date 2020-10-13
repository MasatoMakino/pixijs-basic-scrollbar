import {
  DisplayObject,
  InteractionData,
  InteractionEvent,
  Point,
} from "pixi.js";
import { SliderSet } from "./SliderGenerator";

export class TestRateOption {
  hasChangedEvent?: boolean;
  isHorizontal?: boolean;

  public static initOption(option?: TestRateOption) {
    option ??= {};
    option.hasChangedEvent ??= true;
    option.isHorizontal ??= true;
    return option;
  }
}

export class SliderViewTester {
  public static generateInteractionEvent(
    target: DisplayObject,
    globalX: number,
    globalY: number
  ): InteractionEvent {
    const e = new InteractionEvent();
    e.currentTarget = target;
    e.data = new InteractionData();
    e.data.global = new Point(globalX, globalY);
    return e;
  }

  public static controlButton(
    target: DisplayObject,
    pos: number,
    type: string
  ) {
    const e = SliderViewTester.generateInteractionEvent(target, pos, 0);
    target.emit(type, e);
  }

  public static testRate(
    targets: SliderSet,
    rate: number,
    option?: TestRateOption
  ) {
    option = TestRateOption.initOption(option);

    expect(targets.slider.rate).toBe(rate);
    if (option.hasChangedEvent) {
      expect(targets.spyLog).toBeCalledWith(rate);
    }
    if (option.isHorizontal) {
      expect(targets.sliderButton.x).toBe(rate * targets.size);
    } else {
      expect(targets.sliderButton.y).toBe(rate * targets.size);
    }
  }

  public static changeRate(
    sliders: SliderSet,
    rate: number,
    option?: TestRateOption
  ) {
    sliders.slider.changeRate(rate);
    this.testRate(sliders, rate, option);
  }

  public static tapBase(
    sliders: SliderSet,
    pos: number,
    option?: TestRateOption
  ) {
    SliderViewTester.controlButton(sliders.sliderBase, pos, "pointertap");
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }

  public static dragButton(
    sliders: SliderSet,
    pos: number,
    type: string,
    option?: TestRateOption
  ) {
    SliderViewTester.controlButton(sliders.sliderButton, pos, type);
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }
}
