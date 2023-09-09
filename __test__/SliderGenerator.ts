import { DisplayObject } from "pixi.js";
import { SliderView, SliderViewOption } from "../src/index.js";
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
    const spyLog = jest.fn((rate) => {
      return rate;
    });
    slider.sliderEventEmitter.on("slider_change", (e) => {
      spyLog(e.rate);
    });
    return {
      slider,
      sliderButton: option.button,
      sliderBase: option.base,
      sliderBar: option.bar,
      sliderBarMask: option.mask,
      spyLog,
      size: option.maxPosition - (option.minPosition ?? 0),
    };
  }
}
