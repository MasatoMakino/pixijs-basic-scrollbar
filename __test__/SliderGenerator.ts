import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js";
import { SliderEventType, SliderView, SliderViewOption } from "../src";

export interface SliderSet {
  slider: SliderView;
  sliderButton: DisplayObject;
  sliderBase: DisplayObject;
}
export class SliderGenerator {
  public static generateNonBoundsOption() {
    return {
      minPosition: 0,
      maxPosition: 100,
      base: new Container(),
      button: new Container(),
    };
  }

  public static generateMinimalOption(
    w: number,
    h: number,
    hasHitArea: boolean = true
  ): SliderViewOption {
    return {
      minPosition: 0,
      maxPosition: w,
      base: this.getSliderBase(w, h, 0x0000ff, hasHitArea),
      button: this.getSliderButton(w, h, 0xffff00, hasHitArea),
    };
  }

  public static generateOption(
    w: number,
    h: number,
    hasHitArea: boolean = true
  ): SliderViewOption {
    return {
      ...this.generateMinimalOption(w, h, hasHitArea),
      bar: this.getSliderBase(w, h, 0x00ffff, hasHitArea),
      mask: this.getSliderBase(w, h, 0xff00ff, hasHitArea),
      rate: 1.0,
    };
  }

  public static initSlider(option: SliderViewOption): SliderSet {
    const slider = new SliderView(option);
    slider.on(SliderEventType.CHANGE, (e) => {
      console.log(e.rate);
    });
    return {
      slider,
      sliderButton: option.button,
      sliderBase: option.base,
    };
  }

  private static getSliderBase(
    w,
    h,
    color,
    hasHitArea: boolean = true
  ): Graphics {
    const g = new Graphics();
    g.beginFill(color);
    g.drawRect(0, 0, w, h);
    if (hasHitArea) {
      g.hitArea = new Rectangle(0, 0, w, h);
    }
    return g;
  }

  private static getSliderButton(
    w: number,
    h: number,
    color: number,
    hasHitArea: boolean = true
  ): Graphics {
    const size = 16;
    const g = new Graphics();
    g.beginFill(color, 0.5);
    g.drawRect(-size / 2, 0, size, h);
    if (hasHitArea) {
      g.hitArea = new Rectangle(-size / 2, 0, size, h);
    }
    return g;
  }
}
