import { DisplayObject, Graphics, Rectangle } from "pixi.js";
import { SliderEventType, SliderView } from "../src";

export interface SliderSet {
  slider: SliderView;
  sliderButton: DisplayObject;
}
export class SliderGenerator {
  public static initSlider(w, h): SliderSet {
    const option = {
      base: this.getSliderBase(w, h, 0x0000ff),
      bar: this.getSliderBase(w, h, 0x00ffff),
      button: this.getSliderButton(w, h, 0xffff00),
      mask: this.getSliderMask(w, h),
      minPosition: 0,
      maxPosition: w,
      rate: 1.0,
    };
    const slider = new SliderView(option);
    slider.on(SliderEventType.CHANGE, (e) => {
      console.log(e.rate);
    });
    return {
      slider,
      sliderButton: option.button,
    };
  }

  private static getSliderBase(w, h, color): Graphics {
    const g = new Graphics();
    g.beginFill(color);
    g.moveTo(0, 0).lineTo(w, 0).lineTo(w, h).lineTo(0, 0).endFill();
    g.hitArea = new Rectangle(0, 0, w, h);
    return g;
  }

  private static getSliderMask(w, h): Graphics {
    const g = new Graphics();
    g.beginFill(0xff00ff, 0.1);
    g.drawRect(0, 0, w, h);
    g.hitArea = new Rectangle(0, 0, w, h);
    return g;
  }

  private static getSliderButton(w, h, color): Graphics {
    const size = 16;

    const g = new Graphics();
    g.beginFill(color, 0.5);
    g.drawRect(-size / 2, 0, size, h);
    g.hitArea = new Rectangle(-size / 2, 0, size, h);
    return g;
  }
}
