import { Container } from "pixi.js";
import { Mock, vi } from "vitest";
import { SliderView, SliderViewOption } from "../src/index.js";

export interface SliderSet {
  slider: SliderView;
  sliderButton: Container;
  sliderBase: Container;
  sliderBar?: Container;
  sliderBarMask?: Container;
  spyLog: Mock;
  size: number;
}

export class SliderGenerator {
  public static initSlider(option: SliderViewOption): SliderSet {
    const slider = new SliderView(option);
    const spyLog = vi.fn((rate) => {
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
