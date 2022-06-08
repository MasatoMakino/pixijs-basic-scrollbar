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

export enum SliderEventType {
  CHANGE = "event_slider_change",
  CHANGE_FINISH = "event_slider_change_finish",
}
