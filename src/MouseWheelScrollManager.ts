import { ScrollBarView } from "./ScrollBarView";
import { SliderViewUtil } from "./SliderView";

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

    this.scrollBarView.targetContents.interactive = true;
    this.scrollBarView.targetContents["interactiveMousewheel"] = true;

    //TODO add support deltaX / deltaY
    this.scrollBarView.targetContents.on("mousewheel", (delta, event) => {
      const shift = delta > 0 ? this.delta : -this.delta;
      this.scroll(shift);
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
