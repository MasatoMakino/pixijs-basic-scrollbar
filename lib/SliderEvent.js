"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * スライダーが移動した際に発行されるイベントです。
 * 現状のスライダー位置を報告します。
 */
var SliderEventContext = /** @class */ (function () {
    function SliderEventContext(rate) {
        this.rate = rate;
    }
    return SliderEventContext;
}());
exports.SliderEventContext = SliderEventContext;
var SliderEventType;
(function (SliderEventType) {
    SliderEventType["CHANGE"] = "event_slider_change";
    SliderEventType["CHANGE_FINISH"] = "event_slider_change_finish";
})(SliderEventType = exports.SliderEventType || (exports.SliderEventType = {}));
