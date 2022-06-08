import { Application, Container, Graphics, Rectangle, Ticker } from "pixi.js";
import { ScrollBarView, SliderEventType, ScrollBarContents } from "..";
import TWEEN from "@tweenjs/tween.js";

const onDomContentsLoaded = () => {
  const app = new Application({ width: 800, height: 800 });
  document.body.appendChild(app.view);

  Ticker.shared.add((e) => {
    TWEEN.update(performance.now());
  });

  const scrollbar = initScrollBar(app.stage);

  const addButton = (label) => {
    const btnPlus = document.createElement("button");
    btnPlus.innerText = label;
    document.body.appendChild(btnPlus);
    return btnPlus;
  };
  const btnPlus = addButton("Contents Size +");
  const btnMinus = addButton("Contents Size -");
  const changeSize = (dif) => {
    const scrollPosition = scrollbar.rate;
    overrideContents(scrollbar.contents.target, dif);
    scrollbar.updateSlider();
    scrollbar.changeRate(scrollPosition);
  };
  const onPlus = () => {
    changeSize(64);
  };
  const onMinus = () => {
    changeSize(-64);
  };
  btnPlus.addEventListener("click", onPlus);
  btnMinus.addEventListener("click", onMinus);
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
    // console.log(e);
  });

  /**
   * スクロール動作を確認するために、故意にマスクを外しています。
   */
  contents.target.mask = null;
  return scrollbar;
};

const getScrollBarBase = (w, h, color) => {
  const g = new Graphics();
  g.beginFill(color);
  g.drawRect(0, 0, w, h);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getScrollBarButton = (width, color) => {
  const ratio = 0.5;
  const g = new Graphics();
  g.beginFill(color);
  g.drawRect(-width / 2, -width * ratio, width, width);
  g.hitArea = new Rectangle(-width / 2, -width * ratio, width, width);
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

const overrideContents = (g, difHeight) => {
  const fill = g.fill.clone();
  console.log(fill);
  const hitArea = g.hitArea.clone();
  hitArea.height += difHeight;
  g.clear();
  g.beginFill(fill.color, fill.alpha);
  g.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
  g.hitArea = new Rectangle(
    hitArea.x,
    hitArea.y,
    hitArea.width,
    hitArea.height
  );
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
