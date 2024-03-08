import { Container } from "pixi.js";
import { SliderViewUtil } from "../index.js";

export class ScrollBarViewUtil {
  /**
   * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。
   * @param target
   * @param mask
   * @param isHorizontal
   */
  public static getClampedTargetPosition(
    target: Container,
    mask: Container,
    isHorizontal: boolean,
  ): number {
    const getSize = SliderViewUtil.getSize;
    const targetSize = getSize(target, isHorizontal);
    const maskSize = getSize(mask, isHorizontal);
    const minPos = Math.min(-targetSize + maskSize, 0.0);

    const pos = SliderViewUtil.getPosition(target, isHorizontal);
    return SliderViewUtil.clamp(pos, 0, minPos);
  }

  /**
   * ターゲットコンテンツの位置を、マスク領域内に丸め込む。
   * @param target
   * @param mask
   * @param position
   * @param isHorizontal
   */
  public static clampTargetPosition(
    target: Container,
    mask: Container,
    position: number,
    isHorizontal: boolean,
  ): void {
    SliderViewUtil.setPosition(target, isHorizontal, position);
    const clampedPos = this.getClampedTargetPosition(
      target,
      mask,
      isHorizontal,
    );
    SliderViewUtil.setPosition(target, isHorizontal, clampedPos);
  }

  public static getRatioOfOrigin(displayObj: Container, isHorizontal: boolean) {
    const bounds = SliderViewUtil.getContentsBounds(displayObj);
    const size = isHorizontal ? bounds.width : bounds.height;
    const position = isHorizontal ? bounds.x : bounds.y;

    const ratio = position / size;
    if (ratio > 0) {
      console.warn(
        `${displayObj.name} : ボタンサイズが不適切です。ボタンの矩形内に原点が収まっていません。スクロールバーボタンは原点を囲む矩形としてください。`,
      );
    }
    return ratio;
  }
}
