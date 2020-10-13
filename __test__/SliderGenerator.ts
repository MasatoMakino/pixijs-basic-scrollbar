import { Container, DisplayObject, Graphics, Rectangle } from "pixi.js";
import { SliderEventType, SliderView, SliderViewOption } from "../src";
import SpyInstance = jest.SpyInstance;

export interface SliderSet {
  slider: SliderView;
  sliderButton: DisplayObject;
  sliderBase: DisplayObject;
  spyLog: SpyInstance;
  size: number;
}
export class SliderGenerator {
  /**
   * バウンディングボックスが存在しないスライダー初期化オプションを生成する。
   * 異常系テスト用
   */
  public static generateNonBoundsOption() {
    return {
      minPosition: 0,
      maxPosition: 100,
      base: new Container(),
      button: new Container(),
    };
  }

  /**
   * 最小限のスライダー初期化オプションを生成する。
   * @param w
   * @param h
   * @param hasHitArea
   */
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
    option?: { hasHitArea?: boolean; isHorizontal?: boolean }
  ): SliderViewOption {
    option ??= {};
    option.hasHitArea ??= true;
    option.isHorizontal ??= true;
    return {
      ...this.generateMinimalOption(w, h, option.hasHitArea),
      bar: this.getSliderBase(w, h, 0x00ffff, option.hasHitArea),
      mask: this.getSliderBase(w, h, 0xff00ff, option.hasHitArea),
      isHorizontal: option.isHorizontal,
      rate: 1.0,
    };
  }

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
      spyLog,
      size: option.maxPosition - option.minPosition,
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
