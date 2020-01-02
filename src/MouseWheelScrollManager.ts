import { ScrollBarView } from "./ScrollBarView";
import { SliderViewUtil } from "./SliderView";

/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export class MouseWheelScrollManager {
  protected scrollBarView: ScrollBarView;
  private updateSliderPositionFunc: Function;
  public delta = 10;

  constructor(
    scrollBarView: ScrollBarView,
    updateSliderPositionFunc: Function
  ) {
    this.scrollBarView = scrollBarView;
    this.updateSliderPositionFunc = updateSliderPositionFunc;

    //TODO support deltaX / deltaY
    //TODO limit on mouseOver
    document.addEventListener("wheel", (e: WheelEvent) => {
      const isDown = e.deltaY > 0;
      const delta = isDown ? -this.delta : this.delta;
      this.scroll(delta);
    });
  }

  private scroll(delta: number): void {
    const target = this.scrollBarView.targetContents;
    const mask = this.scrollBarView.contentsMask;
    const isHorizontal = this.scrollBarView.isHorizontal;

    const getSize = SliderViewUtil.getSize;
    const targetSize = getSize(target, isHorizontal);
    const maskSize = getSize(mask, isHorizontal);
    const minPos = Math.min(-targetSize + maskSize, 0.0);

    let pos = SliderViewUtil.getPosition(target, isHorizontal);
    pos += delta;
    pos = SliderViewUtil.clamp(pos, 0, minPos);
    SliderViewUtil.setPosition(target, isHorizontal, pos);

    this.updateSliderPositionFunc();
  }
}
