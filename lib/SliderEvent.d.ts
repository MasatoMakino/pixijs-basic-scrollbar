/**
 * スライダーが移動した際に発行されるイベントです。
 * 現状のスライダー位置を報告します。
 */
export declare class SliderEventContext {
    rate: number;
    constructor(rate: number);
}
export declare enum SliderEventType {
    CHANGE = "event_slider_change",
    CHANGE_FINISH = "event_slider_change_finish"
}
//# sourceMappingURL=SliderEvent.d.ts.map