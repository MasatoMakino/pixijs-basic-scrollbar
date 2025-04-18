import {
  Application,
  Container,
  Graphics,
  Rectangle,
  sayHello,
  RendererType,
} from "pixi.js";
import { ScrollBarView, ScrollBarContents } from "../esm/index.js";

const onDomContentsLoaded = async () => {
  const app = new Application();
  await app.init({ width: 800, height: 800 });
  sayHello(RendererType[app.renderer.type]);

  document.body.appendChild(app.canvas);

  const { scrollbar, base } = initScrollBar(app.stage, app.canvas);

  const addButton = (label) => {
    const btnPlus = document.createElement("button");
    btnPlus.innerText = label;
    document.body.appendChild(btnPlus);
    return btnPlus;
  };
  const btnPlus = addButton("Contents Size +");
  const btnMinus = addButton("Contents Size -");
  const changeSize = (dif) => {
    overrideContents(base, scrollbar.contents.target, dif);
    scrollbar.refreshAfterContentsResize();
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
 * Scrollbar implementation sample
 * @param stage
 */
const initScrollBar = (stage, view) => {
  const SCROLLBAR_W = 16;
  const SCROLLBAR_H = 360;
  const SCROLLBAR_Y = 120;
  const CONTENTS_W = 240;

  const container = new Container();
  stage.addChild(container);
  container.x = 32;
  container.y = SCROLLBAR_Y;

  const { contents, base } = getScrollBarOption(
    CONTENTS_W,
    SCROLLBAR_H,
    container,
  );
  const scrollbar = new ScrollBarView(
    {
      base: getScrollBarBase(SCROLLBAR_W, SCROLLBAR_H, 0x0000ff),
      button: getScrollBarButton(SCROLLBAR_W, 0xffff00),
      minPosition: 0,
      maxPosition: SCROLLBAR_H,
      rate: 0.0,
      isHorizontal: false,
      canvas: view,
    },
    contents,
  );

  stage.addChild(scrollbar);
  scrollbar.x = container.x + CONTENTS_W;
  scrollbar.y = SCROLLBAR_Y;

  scrollbar.sliderEventEmitter.on("slider_change", (e) => {
    // console.log(e);
  });

  /**
   * Uncomment the following line to verify scrolling behavior outside the mask.
   */
  // contents.target.mask = null;
  return { scrollbar, base };
};

const getScrollBarBase = (w, h, color) => {
  const g = new Graphics();
  g.rect(0, 0, w, h).fill(color);
  g.hitArea = new Rectangle(0, 0, w, h);
  return g;
};

const getScrollBarButton = (width, color) => {
  const ratio = 0.5;
  const g = new Graphics();
  g.rect(-width / 2, -width * ratio, width, width).fill(color);

  g.hitArea = new Rectangle(-width / 2, -width * ratio, width, width);
  g.x = width / 2;
  return g;
};

const getScrollBarContents = (w, h, container, fillStyle) => {
  const g = new Graphics();
  g.rect(0, 0, w, h).fill(fillStyle);

  g.boundsArea = new Rectangle(0, 0, w, h);
  container.addChild(g);
  return g;
};

/**
 *
 * @param {Graphics} g
 * @param {number} difHeight
 */
const overrideContents = (g, container, difHeight) => {
  const fill = g.fillStyle;
  const area = container.hitArea.clone();
  area.height += difHeight;

  g.clear();
  g.rect(area.x, area.y, area.width, area.height).fill({
    color: fill.color,
    alpha: fill.alpha,
  });
  container.hitArea = new Rectangle(area.x, area.y, area.width, area.height);
};

const getScrollBarOption = (contentsW, scrollBarH, container) => {
  const base = getScrollBarContents(contentsW, scrollBarH * 2, container, {
    color: 0xff00ff,
  });
  base.interactive = false;
  base.eventMode = "none";
  const targetContainer = new Container();
  targetContainer.hitArea = new Rectangle(0, 0, contentsW, scrollBarH * 2);
  targetContainer.addChild(base);

  const contentsMask = getScrollBarContents(contentsW, scrollBarH, container, {
    color: 0x0000ff,
    alpha: 0.3,
  });

  const button = getTestButton();
  targetContainer.addChild(button);
  button.y = 64;
  button.x = 64;

  return {
    contents: new ScrollBarContents(targetContainer, contentsMask, container),
    base,
  };
};

const getTestButton = () => {
  const button = new Graphics().rect(0, 0, 128, 48).fill(0x00ff00);
  const redrawButton = (color) => {
    button.clear();
    button.rect(0, 0, 128, 48).fill(color);
  };

  button.cursor = "pointer";
  button.eventMode = "dynamic"; // If button.eventMode is set to "static", pointerout events will not be triggered during scrolling and interruption.
  button.on("pointerdown", (e) => {
    redrawButton(0xffffff);
    console.log("  pointer down");
  });
  button.on("pointerup", (e) => {
    redrawButton(0x00ff00);
    console.log("  pointer up");
  });
  button.on("pointerout", (e) => {
    redrawButton(0x00ff00);
    console.log("pointer out");
  });
  button.on("pointerover", (e) => {
    redrawButton(0x77ff77);
    console.log("pointerover");
  });
  button.on("pointertap", (e) => {
    redrawButton(0xffff77);
    console.log("pointer tap");
  });
  return button;
};

/**
 * Execute initialization process after DOMContentLoaded
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}
