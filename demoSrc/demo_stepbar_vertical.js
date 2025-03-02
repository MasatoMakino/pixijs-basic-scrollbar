import { Application, Graphics, Rectangle } from "pixi.js";
import { StepBarView } from "../esm/index.js";

const onDomContentsLoaded = async () => {
  const app = new Application();
  await app.init({ width: 800, height: 600 });
  document.body.appendChild(app.canvas);

  initStepBar(app.stage, app.canvas);
};
const SLIDER_W = 16;
const SLIDER_H = 200;
const SLIDER_X = 0;

/**
 * ステップバーの実装サンプル
 * @param stage
 */
const initStepBar = (stage, view) => {
  const spriteBar = getSpriteBar(SLIDER_W, SLIDER_H, 0x00ff00, 10);
  spriteBar.eventMode = "none";

  const margin = 8;
  const base = getSliderBase(SLIDER_W, SLIDER_H + margin * 2, 0xff00ff);
  base.y = -margin;
  spriteBar.x = SLIDER_X;

  const sliderButton = getSliderButton(16, 16, 0xffff00);
  sliderButton.x = SLIDER_W;

  const incrementButton = getUpDonwButton(16, 0x00ff00);
  const decrementButton = getUpDonwButton(16, 0x00ff00);

  decrementButton.y = -32;
  incrementButton.y = SLIDER_H + 32;
  incrementButton.x = decrementButton.x = SLIDER_W / 2;

  const stepBar = new StepBarView({
    base,
    sliderStartPoint: SLIDER_X + SLIDER_H,
    sliderMaxPoint: SLIDER_X,
    minValue: 0,
    maxValue: 10,
    step: 1,
    incrementButton,
    decrementButton,
    sliderButton,
    isHorizontal: false,
    canvas: view,
  });
  stepBar.addChild(spriteBar);

  stepBar.stepBarEventEmitter.on("changed", (e) => {
    console.log(e);
  });
  stage.addChild(stepBar);
  stepBar.x = 200;
  stepBar.y = 200;

  stepBar.value = 9;
};

const getSpriteBar = (w, h, color, step) => {
  const g = new Graphics();
  const stepH = h / step;
  for (let i = 0; i < step; i++) {
    g.rect(0, i * stepH, w, stepH).fill({
      color: color,
      alpha: i % 2 === 0 ? 0.5 : 1,
    });
  }
  return g;
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
  g.rotation = -Math.PI / 2;
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
