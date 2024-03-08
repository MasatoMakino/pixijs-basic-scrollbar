import { Application, Graphics, Rectangle } from "pixi.js";
import { SliderView } from "../esm/index.js";

const onDomContentsLoaded = async () => {
  const app = new Application();
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);

  initSlider(app.stage, app.canvas);
  initNonMaskSlider(app.stage, app.canvas);
};
const SLIDER_W = 200;
const SLIDER_H = 64;
/**
 * スライダーの実装サンプル
 * @param stage
 */
const initSlider = (stage, view) => {
  const slider = new SliderView({
    base: getSliderBase(SLIDER_W, SLIDER_H, 0x0000ff),
    bar: getSliderBase(SLIDER_W, SLIDER_H, 0x00ffff),
    button: getSliderButton(SLIDER_W, SLIDER_H, 0xffff00),
    mask: getSliderMask(SLIDER_W, SLIDER_H),
    minPosition: 0,
    maxPosition: SLIDER_W,
    rate: 25.0,
    canvas: view,
  });

  slider.sliderEventEmitter.on("ch", (e) => {
    console.log(e.rate);
  });
  stage.addChild(slider);
  slider.x = 200;
  slider.y = 200;
};

const initNonMaskSlider = (stage, view) => {
  const slider = new SliderView({
    base: getSliderBase(SLIDER_W, SLIDER_H, 0x0000ff),
    bar: getSliderBase(SLIDER_W, SLIDER_H, 0x00ffff),
    button: getSliderButton(SLIDER_W, SLIDER_H, 0xffff00),
    minPosition: 0,
    maxPosition: SLIDER_W,
    rate: 25.0,
    canvas: view,
  });

  slider.on("slider_change", (e) => {
    console.log(e.rate);
  });
  stage.addChild(slider);
  slider.x = 200;
  slider.y = 400;
};

const getSliderBase = (w, h, color) => {
  const g = new Graphics();
  g.moveTo(0, 0).lineTo(w, 0).lineTo(w, h).lineTo(0, 0).fill(color);

  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getSliderMask = (w, h) => {
  const g = new Graphics();
  g.rect(0, 0, w, h).fill(0xff00ff, 0.1);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getSliderButton = (w, h, color) => {
  const g = new Graphics();
  g.rect(-8, 0, 16, h).fill(color, 0.5);
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
