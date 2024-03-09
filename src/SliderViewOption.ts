/**
 * スライダーを初期化する際のオプション
 */
import { Container, Graphics } from "pixi.js";
import { SliderView, SliderViewUtil } from "./index.js";

export interface SliderViewOption {
  /**
   * スライダーボタンの座標の最小値
   * @default 0.0
   */
  minPosition?: number;
  maxPosition: number; //スライダーボタンの座標の最大値
  /**
   * @default 0.0
   */
  rate?: number;
  base: Container; //スライダーの地
  /**
   * スライドボタン
   */
  button: Container;
  mask?: Graphics; //バーのマスク
  bar?: Container; //スライドにあわせて表示されるバー
  /**
   * 水平スクロールか否か
   * @default true
   */
  isHorizontal?: boolean;

  canvas?: HTMLCanvasElement;
}

export interface InitializedSliderViewOption extends SliderViewOption {
  minPosition: number;
  rate: number;
  isHorizontal: boolean;
}

export class SliderViewOptionUtil {
  public static init(option: SliderViewOption): InitializedSliderViewOption {
    this.check(option);

    if (option.rate != null) {
      option.rate = Math.max(0, option.rate);
      option.rate = Math.min(SliderView.MAX_RATE, option.rate);
    }
    option.rate ??= 0.0;

    option.minPosition ??= 0.0;
    option.isHorizontal ??= true;

    return option as InitializedSliderViewOption;
  }

  protected static check(option: SliderViewOption): void {
    this.checkParts(option.base, "base");
    this.checkParts(option.button, "button");
    this.checkParts(option.mask, "mask");
    this.checkParts(option.bar, "bar");
  }

  private static checkParts(
    obj: Container | undefined,
    targetName: string,
  ): void {
    if (obj == null) return;

    const bounds = SliderViewUtil.getContentsBounds(obj);
    if (bounds.width === 0 && bounds.height === 0) {
      throw new Error(
        `SliderView : ${targetName} 初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません。Containerを利用する場合はhitAreaを利用してバウンディングボックスを手動で設定してください。`,
      );
    }

    if (obj.parent) {
      console.warn(
        `初期化オプションで指定されたパーツがすでに別の親にaddChildされています。SliderViewおよびScrollBarViewの構成パーツは同一のコンテナにaddChildされることを前提としています。`,
      );
    }
  }
}
