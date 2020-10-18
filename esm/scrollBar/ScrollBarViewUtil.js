import {SliderViewUtil} from "../SliderView";

export class ScrollBarViewUtil {
    /**
     * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。
     * @param target
     * @param mask
     * @param isHorizontal
     */
    static getClampedTargetPosition(target, mask, isHorizontal) {
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
    static clampTargetPosition(target, mask, position, isHorizontal) {
        SliderViewUtil.setPosition(target, isHorizontal, position);
        const clampedPos = this.getClampedTargetPosition(target, mask, isHorizontal);
        SliderViewUtil.setPosition(target, isHorizontal, clampedPos);
    }
}
