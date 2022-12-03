import { utils } from "pixi.js";

export interface ScrollBarEventTypes {
  update_target_position: [];
  stop_inertial_tween: [];
}
export class ScrollBarEventEmitter extends utils.EventEmitter<ScrollBarEventTypes> {}
