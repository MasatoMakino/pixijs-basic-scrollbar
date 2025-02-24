import { Application, Graphics, Rectangle } from "pixi.js";
import { StepBarView } from "../esm/index.js";

const onDomContentsLoaded = async () => {
  const app = new Application();
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);

  initStepBar(app.stage, app.canvas);
};
const SLIDER_W = 200;
const SLIDER_H = 16;
/**
 * スライダーの実装サンプル
 * @param stage
 */
const initStepBar = (stage, view) => {
  const sliderButton = getSliderButton(16, 16, 0xff0000);
  sliderButton.y = SLIDER_H;
  const stepUpButton = getUpDonwButton(16, 0x00ff00);
  const stepDownButton = getUpDonwButton(16, 0x00ff00);
  stepDownButton.x = -32;
  stepUpButton.x = 32 + SLIDER_W;
  stepUpButton.y = stepDownButton.y = SLIDER_H / 2;

  const stepBar = new StepBarView({
    base: getSliderBase(SLIDER_W, SLIDER_H, 0x0000ff),
    minPosition: 0,
    maxPosition: SLIDER_W,
    minValue: 0,
    maxValue: 10,
    step: 1,
    stepUpButton: stepUpButton,
    stepDownButton: stepDownButton,
    sliderButton: sliderButton,
    canvas: view,
  });

  stepBar.stepBarEventEmitter.on("changed", (e) => {
    console.log(e);
  });
  stage.addChild(stepBar);
  stepBar.x = 200;
  stepBar.y = 200;

  stepBar.value = 9;
};

const getSliderBase = (w, h, color) => {
  const g = new Graphics();
  g.rect(0, 0, w, h).fill(color);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getSliderButton = (w, h, color) => {
  const g = new Graphics();
  g.moveTo(0, 0)
    .lineTo(w / 2, h)
    .lineTo(-w / 2, h)
    .lineTo(0, 0)
    .fill(color);
  return g;
};

const getUpDonwButton = (r, color) => {
  const g = new Graphics();
  g.circle(0, 0, r).fill(color);
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
