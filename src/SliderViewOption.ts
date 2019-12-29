/**
 * スライダーを初期化する際のオプション
 */
import { DisplayObject, Graphics } from "pixi.js";
import { SliderView } from "./SliderView";

export class SliderViewOption {
  minPosition: number; //スライダーボタンの座標の最小値
  maxPosition: number; //スライダーボタンの座標の最大値
  rate?: number;
  base: DisplayObject; //スライダーの地
  button: DisplayObject; //スライドボタン
  mask?: Graphics; //バーのマスク
  bar?: DisplayObject; //スライドにあわせて表示されるバー
  isHorizontal?: boolean; //水平スクロールか否か 既定値 true

  public static init(option: SliderViewOption): SliderViewOption {
    if (option.rate != null) {
      option.rate = Math.max(0, option.rate);
      option.rate = Math.min(SliderView.MAX_RATE, option.rate);
    }
    option.rate = option.rate ?? 0.0;
    option.isHorizontal = option.isHorizontal ?? true;

    this.check(option);
    return option;
  }

  protected static check(option: SliderViewOption): void {
    this.checkParts(option.base, "base");
    this.checkParts(option.button, "button");
    this.checkParts(option.mask, "mask");
    this.checkParts(option.bar, "bar");
  }

  private static checkParts(obj: DisplayObject, targetName: string): void {
    if (obj == null) return;

    if (obj.getBounds() === null) {
      throw new Error(
        `SliderView : ${targetName} 初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません。ShapeやContainerを利用する場合はsetBounds関数を利用してバウンディングボックスを手動で設定してください。`
      );
    }

    if (obj.parent) {
      console.warn(
        "初期化オプションで指定されたパーツがすでに別の親にaddChildされています。" +
          "SliderViewおよびScrollBarViewの構成パーツはインスタンスにaddChildされることを前提としています。"
      );
    }
  }
}
