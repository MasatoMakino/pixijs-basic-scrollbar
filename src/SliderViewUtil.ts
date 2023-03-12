import { DisplayObject } from "@pixi/display";
import { IPoint, Rectangle } from "@pixi/math";
import { SliderView } from "./";

export class SliderViewUtil {
  /**
   * スライダーの座標から、スライダーの割合を取得する
   */
  public static convertPixelToRate(
    pixel: number,
    max: number,
    min: number
  ): number {
    if (max <= min) {
      return 0.0;
    }
    const rate: number = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;
    return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);
  }

  public static convertRateToPixel(
    rate: number,
    max: number,
    min: number
  ): number {
    const pix: number = ((max - min) * rate) / SliderView.MAX_RATE + min;
    return SliderViewUtil.clamp(pix, max, min);
  }

  /**
   * ディスプレイオブジェクトからスクロール方向の座標値を取り出す
   * @return displayObjの座標値。単位ピクセル
   */
  public static getPosition(
    displayObj: DisplayObject | IPoint,
    isHorizontal: boolean
  ): number {
    if (isHorizontal) {
      return displayObj.x;
    }
    return displayObj.y;
  }

  /**
   * ディスプレイオブジェクトにスクロール方向の座標値を設定する
   */
  public static setPosition(
    displayObj: DisplayObject,
    isHorizontal: boolean,
    position: number
  ): void {
    if (!displayObj) return;

    if (isHorizontal) {
      displayObj.x = position;
    } else {
      displayObj.y = position;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル
   */
  public static getSize(
    displayObj: DisplayObject,
    isHorizontal: boolean
  ): number {
    const size = SliderViewUtil.getContentsBounds(displayObj);
    if (isHorizontal) {
      return size.width * displayObj.scale.x;
    } else {
      return size.height * displayObj.scale.y;
    }
  }

  /**
   * スクロール方向の高さ、もしくは幅を設定する。
   * @param displayObj
   * @param isHorizontal
   * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px
   */
  public static setSize(
    displayObj: DisplayObject,
    isHorizontal: boolean,
    amount: number
  ): void {
    const size = SliderViewUtil.getContentsBounds(displayObj);

    if (isHorizontal) {
      displayObj.scale.x = amount / size.width;
    } else {
      displayObj.scale.y = amount / size.height;
    }
  }

  public static clamp(num: number, max: number, min: number): number {
    num = Math.max(num, min);
    num = Math.min(num, max);
    return num;
  }

  public static getContentsBounds(displayObj: DisplayObject): Rectangle {
    if (displayObj.hitArea) return displayObj.hitArea as Rectangle;
    return displayObj.getLocalBounds();
  }
}
