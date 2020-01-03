import { ScrollBarView } from "./ScrollBarView";
import { SliderViewUtil } from "./SliderView";
import { ScrollBarViewUtil } from "./ScrollBarView";

/**
 * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス
 */
export class MouseWheelScrollManager {
  protected scrollBarView: ScrollBarView;
  private updateSliderPositionFunc: Function;
  public delta = 16;

  constructor(
    scrollBarView: ScrollBarView,
    updateSliderPositionFunc: Function
  ) {
    this.scrollBarView = scrollBarView;
    this.updateSliderPositionFunc = updateSliderPositionFunc;

    const target = this.scrollBarView.targetContents;
    target.interactive = true;
    target["interactiveMousewheel"] = true;

    //TODO add support deltaX / deltaY
    target.on("mousewheel", (delta, event) => {
      const shift = delta > 0 ? this.delta : -this.delta;
      this.scroll(shift);
    });
  }

  private scroll(delta: number): void {
    const target = this.scrollBarView.targetContents;
    const mask = this.scrollBarView.contentsMask;
    const isHorizontal = this.scrollBarView.isHorizontal;

    const pos = SliderViewUtil.getPosition(target, isHorizontal) + delta;
    ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);

    this.updateSliderPositionFunc();
  }
}
