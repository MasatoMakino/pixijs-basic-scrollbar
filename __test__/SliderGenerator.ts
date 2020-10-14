import { DisplayObject } from "pixi.js";
import { SliderEventType, SliderView, SliderViewOption } from "../src";
import SpyInstance = jest.SpyInstance;

export interface SliderSet {
  slider: SliderView;
  sliderButton: DisplayObject;
  sliderBase: DisplayObject;
  sliderBar?: DisplayObject;
  sliderBarMask?: DisplayObject;
  spyLog: SpyInstance;
  size: number;
}

export class SliderGenerator {
  public static initSlider(option: SliderViewOption): SliderSet {
    const slider = new SliderView(option);
    slider.on(SliderEventType.CHANGE, (e) => {
      console.log(e.rate);
    });
    const spyLog = jest.spyOn(console, "log").mockImplementation((x) => x);
    return {
      slider,
      sliderButton: option.button,
      sliderBase: option.base,
      sliderBar: option.bar,
      sliderBarMask: option.mask,
      spyLog,
      size: option.maxPosition - option.minPosition,
    };
  }
}
