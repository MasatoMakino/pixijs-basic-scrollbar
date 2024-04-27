import { Application, Container, Graphics, Rectangle, Ticker } from "pixi.js";
import { ScrollBarView, ScrollBarContents } from "../esm/index.js";
import TWEEN from "@tweenjs/tween.js";

const onDomContentsLoaded = async () => {
  const app = new Application();
  await app.init({ width: 800, height: 800 });
  document.body.appendChild(app.canvas);

  Ticker.shared.add((e) => {
    TWEEN.update(performance.now());
  });

  const scrollbar = initScrollBar(app.stage, app.canvas);
};

/**
 * スクロールバーの実装サンプル
 * @param stage
 */
const initScrollBar = (stage, view) => {
  const SCROLLBAR_W = 360;
  const SCROLLBAR_H = 16;
  const SCROLLBAR_Y = 120;
  const CONTENTS_SIZE = 160;

  const container = new Container();
  stage.addChild(container);
  container.x = 32;
  container.y = SCROLLBAR_Y;

  const contents = getScrollBarOption(CONTENTS_SIZE, SCROLLBAR_W, container);
  const scrollbar = new ScrollBarView(
    {
      base: getScrollBarBase(SCROLLBAR_W, SCROLLBAR_H, 0x0000ff),
      button: getScrollBarButton(SCROLLBAR_H, 0xffff00),
      minPosition: 0,
      maxPosition: SCROLLBAR_W,
      rate: 35.0,
      isHorizontal: true,
      canvas: view,
    },
    contents,
  );

  stage.addChild(scrollbar);
  scrollbar.x = container.x;
  scrollbar.y = SCROLLBAR_Y + CONTENTS_SIZE;

  /**
   * スクロール動作を確認するために、故意にマスクを外しています。
   */
  contents.target.mask = null;
  return scrollbar;
};

const getScrollBarBase = (w, h, color) => {
  const g = new Graphics().rect(0, 0, w, h).fill(color);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getScrollBarButton = (size, color) => {
  const ratio = 0.5;
  const g = new Graphics()
    .rect(-size * ratio, -size / 2, size, size)
    .fill(color);

  g.hitArea = new Rectangle(-size * ratio, -size / 2, size, size);
  g.y = size / 2;
  return g;
};

const getScrollBarContents = (color, w, h, container, alpha = 1.0) => {
  const g = new Graphics().rect(0, 0, w, h).fill({ color, alpha });
  g.boundsArea = new Rectangle(0, 0, w, h);
  container.addChild(g);
  return g;
};

const getScrollBarOption = (contentsSize, scrollBarSize, container) => {
  const targetContents = getScrollBarContents(
    0xff00ff,
    scrollBarSize * 2,
    contentsSize,
    container,
  );
  const contentsMask = getScrollBarContents(
    0x0000ff,
    scrollBarSize,
    contentsSize,
    container,
    0.3,
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
