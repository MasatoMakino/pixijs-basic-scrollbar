import { Application, Container, Graphics, Rectangle, Ticker } from "pixi.js";
import { ScrollBarView, SliderEventType } from "../lib";
import TWEEN from "@tweenjs/tween.js";
import { ScrollBarContents } from "../src/scrollBar/ScrollBarContents";

const onDomContentsLoaded = () => {
  const app = new Application({ width: 800, height: 800 });
  document.body.appendChild(app.view);

  Ticker.shared.add((e) => {
    TWEEN.update(performance.now());
  });

  initScrollBar(app.stage);
};

/**
 * スクロールバーの実装サンプル
 * @param stage
 */
const initScrollBar = (stage) => {
  const SCROLLBAR_W = 16;
  const SCROLLBAR_H = 360;
  const SCROLLBAR_Y = 120;
  const CONTENTS_W = 240;

  const container = new Container();
  stage.addChild(container);
  container.x = 32;
  container.y = SCROLLBAR_Y;

  const contents = getScrollBarOption(CONTENTS_W, SCROLLBAR_H, container);
  const scrollbar = new ScrollBarView(
    {
      base: getScrollBarBase(SCROLLBAR_W, SCROLLBAR_H, 0x0000ff),
      button: getScrollBarButton(SCROLLBAR_W, 0xffff00),
      minPosition: 0,
      maxPosition: SCROLLBAR_H,
      rate: 35.0,
      isHorizontal: false,
    },
    contents
  );

  stage.addChild(scrollbar);
  scrollbar.x = container.x + CONTENTS_W;
  scrollbar.y = SCROLLBAR_Y;

  scrollbar.on(SliderEventType.CHANGE, (e) => {
    console.log(e);
  });

  /**
   * スクロール動作を確認するために、故意にマスクを外しています。
   */
  contents.targetContents.mask = null;
};

const getScrollBarBase = (w, h, color) => {
  const g = new Graphics();
  g.beginFill(color);
  g.drawRect(0, 0, w, h);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getScrollBarButton = (width, color) => {
  const g = new Graphics();
  g.beginFill(color);
  g.drawRect(-width / 2, -width / 2, width, width);
  g.hitArea = new Rectangle(-width / 2, -width / 2, width, width);
  g.x = width / 2;
  return g;
};

const getScrollBarContents = (color, w, h, container, alpha = 1.0) => {
  const g = new Graphics();
  g.beginFill(color, alpha);
  g.drawRect(0, 0, w, h);
  g.hitArea = new Rectangle(0, 0, w, h);
  container.addChild(g);
  return g;
};

const getScrollBarOption = (contentsW, scrollBarH, container) => {
  const targetContents = getScrollBarContents(
    0xff00ff,
    contentsW,
    scrollBarH * 2,
    container
  );
  const contentsMask = getScrollBarContents(
    0x0000ff,
    contentsW,
    scrollBarH,
    container,
    0.3
  );
  return new ScrollBarContents(targetContents, contentsMask, container);
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
