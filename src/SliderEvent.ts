/**
 * スライダーが移動した際に発行されるイベントです。
 * 現状のスライダー位置を報告します。
 */
export class SliderEventContext {
  public rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
}

export interface SliderEventTypes {
  slider_change: (e: SliderEventContext) => void;
  slider_change_finished: (e: SliderEventContext) => void;
}
