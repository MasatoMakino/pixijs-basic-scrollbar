import { Container, Graphics, Rectangle } from "pixi.js";
import { SliderViewOption } from "../src";

export class SliderGeneratorOption {
  hasHitArea?: boolean;
  isHorizontal?: boolean;
  hasMask?: boolean;
  public static init(option?: SliderGeneratorOption): SliderGeneratorOption {
    option ??= {};
    option.hasHitArea ??= true;
    option.isHorizontal ??= true;
    option.hasMask ??= true;
    return option;
  }
}
export class SliderOptionGenerator {
  /**
   * バウンディングボックスが存在しないスライダー初期化オプションを生成する。
   * 異常系テスト用
   */
  public static generateNonBoundsOption() {
    return {
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
    option?: SliderGeneratorOption
  ): SliderViewOption {
    option = SliderGeneratorOption.init(option);

    const maxPos = option.isHorizontal ? w : h;
    return {
      maxPosition: maxPos,
      base: this.getSliderBase(w, h, 0x0000ff, option.hasHitArea),
      button: this.getSliderButton(w, h, 0xffff00, option.hasHitArea),
    };
  }
  public static generateOption(
    w: number,
    h: number,
    option?: SliderGeneratorOption
  ): SliderViewOption {
    option = SliderGeneratorOption.init(option);

    const mask = option.hasMask
      ? this.getSliderBase(w, h, 0xff00ff, option.hasHitArea)
      : undefined;

    return {
      ...this.generateMinimalOption(w, h, option),
      bar: this.getSliderBase(w, h, 0x00ffff, option.hasHitArea),
      mask,
      isHorizontal: option.isHorizontal,
      rate: 1.0,
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
