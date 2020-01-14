/**
 * スライダーが移動した際に発行されるイベントです。
 * 現状のスライダー位置を報告します。
 */
export class SliderEventContext {
    constructor(rate) {
        this.rate = rate;
    }
}
export var SliderEventType;
(function (SliderEventType) {
    SliderEventType["CHANGE"] = "event_slider_change";
    SliderEventType["CHANGE_FINISH"] = "event_slider_change_finish";
})(SliderEventType || (SliderEventType = {}));
