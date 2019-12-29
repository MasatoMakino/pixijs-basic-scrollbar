import { Application, Graphics, Rectangle } from "pixi.js";
import { SliderEventType, SliderView } from "../bin";

const onDomContentsLoaded = () => {
  const app = new Application({ width: 800, height: 600 });
  document.body.appendChild(app.view);

  initSlider(app.stage);
  initNonMaskSlider(app.stage);
};
const SLIDER_W = 200;
const SLIDER_H = 64;
/**
 * スライダーの実装サンプル
 * @param stage
 */
const initSlider = stage => {
  const slider = new SliderView({
    base: getSliderBase(SLIDER_W, SLIDER_H, 0x0000ff),
    bar: getSliderBase(SLIDER_W, SLIDER_H, 0x00ffff),
    button: getSliderButton(SLIDER_W, SLIDER_H, 0xffff00),
    mask: getSliderMask(SLIDER_W, SLIDER_H),
    minPosition: 0,
    maxPosition: SLIDER_W,
    rate: 25.0
  });

  slider.on(SliderEventType.CHANGE, e => {
    console.log(e.rate);
  });
  stage.addChild(slider);
  slider.x = 200;
  slider.y = 200;
};

const initNonMaskSlider = stage => {
  const slider = new SliderView({
    base: getSliderBase(SLIDER_W, SLIDER_H, 0x0000ff),
    bar: getSliderBase(SLIDER_W, SLIDER_H, 0x00ffff),
    button: getSliderButton(SLIDER_W, SLIDER_H, 0xffff00),
    minPosition: 0,
    maxPosition: SLIDER_W,
    rate: 25.0
  });

  slider.on(SliderEventType.CHANGE, e => {
    console.log(e.rate);
  });
  stage.addChild(slider);
  slider.x = 200;
  slider.y = 400;
};

const getSliderBase = (w, h, color) => {
  const g = new Graphics();
  g.beginFill(color);
  g.moveTo(0, 0)
    .lineTo(w, 0)
    .lineTo(w, h)
    .lineTo(0, 0)
    .endFill();

  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getSliderMask = (w, h) => {
  const g = new Graphics();
  g.beginFill(0xff00ff, 0.1);
  g.drawRect(0, 0, w, h);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getSliderButton = (w, h, color) => {
  const g = new Graphics();
  g.beginFill(color, 0.5);
  g.drawRect(-8, 0, 16, h);
  g.hitArea = new Rectangle(-8, 0, 16, h);
  return g;
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
