import { Container, Graphics, Rectangle } from "pixi.js";
import { SliderViewOption } from "../src/index.js";

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
   * @param option
   */
  public static generateMinimalOption(
    w: number,
    h: number,
    option?: SliderGeneratorOption,
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
    option?: SliderGeneratorOption,
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

  public static generateScrollBarOption(
    w: number,
    h: number,
    option?: SliderGeneratorOption,
  ): SliderViewOption {
    option = SliderGeneratorOption.init(option);
    const maxPos = option.isHorizontal ? w : h;
    const buttonSize = option.isHorizontal ? h : w;
    return {
      maxPosition: maxPos,
      button: this.getScrollBarButton(buttonSize, 0x00ffff, option.hasHitArea),
      base: this.getSliderBase(w, h, 0x00ffff, option.hasHitArea),
      isHorizontal: option.isHorizontal,
      rate: 0.0,
    };
  }

  private static getSliderBase(
    w: number,
    h: number,
    color: number,
    hasHitArea: boolean = true,
  ): Graphics {
    const g = new Graphics().rect(0, 0, w, h).fill(color);
    if (hasHitArea) {
      g.hitArea = new Rectangle(0, 0, w, h);
    }
    return g;
  }

  private static getSliderButton(
    w: number,
    h: number,
    color: number,
    hasHitArea: boolean = true,
  ): Graphics {
    const size = 16;
    const g = new Graphics()
      .rect(-size / 2, 0, size, h)
      .fill({ color, alpha: 0.5 });
    if (hasHitArea) {
      g.hitArea = new Rectangle(-size / 2, 0, size, h);
    }
    return g;
  }

  private static getScrollBarButton(
    size: number,
    color: number,
    hasHitArea: boolean = true,
  ): Graphics {
    const g = new Graphics()
      .rect(-size / 2, -size / 2, size, size)
      .fill({ color, alpha: 0 });
    if (hasHitArea) {
      g.hitArea = new Rectangle(-size / 2, -size / 2, size, size);
    }
    return g;
  }
}
