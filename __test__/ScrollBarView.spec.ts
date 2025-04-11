import { Graphics, Rectangle, Ticker } from "pixi.js";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { DummyPointerEvent } from "./DummpyPointerEvent.js";
import { ScrollBarViewGenerator } from "./ScrollBarViewGenerator.js";
import { SliderViewTester } from "./SliderViewTester.js";

describe("ScrollBarView", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 2.0;
  const { sliderOption, scrollBarContents, scrollbar, spyLog } =
    ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView",
    );

  beforeEach(() => {
    DummyPointerEvent.emit(scrollbar.contents.target, "pointerup");

    scrollbar.inertialManager.stopInertial();
    scrollbar.inertialManager.start();

    scrollbar.changeRate(0.0);
    DummyPointerEvent.emit(sliderOption.base, "pointerup");
    DummyPointerEvent.emit(sliderOption.button, "pointerup");
    updateTicker(-1);
    spyLog.mockReset();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(sliderOption.isHorizontal).toBe(false);
    expect(scrollBarContents.target.y).toBe(0);
    expect(sliderOption.button.scale.y).toBe(H / 2 / SCROLL_BAR_W);
    expect(scrollbar.contents.mask).toBe(scrollBarContents.mask);
    expect(scrollbar.autoHide).toBe(false);
  });

  test("change rate", () => {
    scrollbar.changeRate(0.0);
    expect(scrollBarContents.target.y).toBe(0);
    scrollbar.changeRate(0.5);
    expect(scrollBarContents.target.y).toBe(-H * 0.5);
    scrollbar.changeRate(1.0);
    expect(scrollBarContents.target.y).toBe(-H);
  });

  test("tap base", () => {
    const base = sliderOption.base;
    const barH = H / CONTENTS_SCALE;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, base, 0.0, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, barH / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H / 2, "pointertap");
    expect(scrollbar.rate).toBe(0.5);
    SliderViewTester.controlButton(
      isHorizontal,
      base,
      H - barH / 2,
      "pointertap",
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, base, H, "pointertap");
    expect(scrollbar.rate).toBe(1.0);
  });

  test("drag bar", () => {
    const button = sliderOption.button;
    const barH = H / CONTENTS_SCALE;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, button, 0.0, "pointerdown");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      0.0,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      (H - barH) / 4,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.25);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      (H - barH) / 2,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(0.5);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      H - barH,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(
      isHorizontal,
      scrollbar.buttonRootContainer,
      H,
      "pointermove",
    );
    expect(scrollbar.rate).toBe(1.0);
    SliderViewTester.controlButton(isHorizontal, button, H, "pointerup");
    expect(scrollbar.rate).toBe(1.0);
  });

  test("wheel", () => {
    const target = scrollBarContents.target;
    const delta = scrollbar.wheelManager.delta;
    let scroll = 0;
    while (scroll < H) {
      DummyPointerEvent.emit(target, "wheel", { deltaY: 1 });
      scroll += delta;
      expect(scrollbar.rate).toBe(Math.min(1.0, scroll / H));
    }
    scroll = H;
    while (scroll > 0) {
      DummyPointerEvent.emit(target, "wheel", { deltaY: -1 });
      scroll -= delta;
      expect(scrollbar.rate).toBe(Math.max(0.0, scroll / H));
    }
  });

  test("WheelManager : start and stop", () => {
    const target = scrollBarContents.target;
    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);
    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);

    scrollbar.wheelManager.stop();
    expect(target.listenerCount("wheel")).toBe(0);
    scrollbar.wheelManager.stop();
    expect(target.listenerCount("wheel")).toBe(0);

    scrollbar.wheelManager.start();
    expect(target.listenerCount("wheel")).toBe(1);
  });

  describe("InertialScrollManager", () => {
    describe("multi-touch interactions", () => {
      test("during drag with pointer 1, any pointer 2 operations should be ignored", () => {
        const target = scrollBarContents.target;
        const isHorizontal = scrollbar.isHorizontal;
        const inertial = scrollbar.inertialManager;

        // 初期状態の確認
        expect(inertial["activePointerId"]).toBe(null);

        // ポインター1でドラッグ開始
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          0,
          "pointerdown",
          1,
        );
        expect(inertial["activePointerId"]).toBe(1);
        expect(target.y).toBe(0);

        // ポインター1で移動
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -50,
          "pointermove",
          1,
        );
        expect(target.y).toBe(-50);

        // ポインター2でドラッグ開始を試みる
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -100,
          "pointerdown",
          2,
        );
        expect(inertial["activePointerId"]).toBe(1); // ポインター1のまま
        expect(target.y).toBe(-50); // 位置変化なし

        // ポインター2で移動を試みる
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -150,
          "pointermove",
          2,
        );
        expect(target.y).toBe(-50); // 位置変化なし

        // ポインター2でドラッグ終了を試みる
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -150,
          "pointerup",
          2,
        );
        expect(inertial["activePointerId"]).toBe(1); // ポインター1のまま

        // ポインター1で移動を継続
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -75,
          "pointermove",
          1,
        );
        expect(target.y).toBe(-75);

        // ポインター1でドラッグ終了
        SliderViewTester.controlButton(
          isHorizontal,
          target,
          -75,
          "pointerup",
          1,
        );
        expect(inertial["activePointerId"]).toBe(null);
      });
    });

    test("start and stop", () => {
      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);
      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);

      scrollbar.inertialManager.stop();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(0);
      scrollbar.inertialManager.stop();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(0);

      scrollbar.inertialManager.start();
      expect(scrollBarContents.target.listenerCount("pointerdown")).toBe(1);
    });

    test("drag", () => {
      const controlButton = SliderViewTester.controlButton;
      const target = scrollBarContents.target;
      const isHorizontal = scrollbar.isHorizontal;
      const maxPos = -H * (CONTENTS_SCALE - 1);
      const inertial = scrollbar.inertialManager;
      inertial.decelerationRate = 0.975;

      controlButton(isHorizontal, target, 0, "pointerdown");
      expect(scrollbar.rate).toBe(0);
      controlButton(isHorizontal, target, maxPos, "pointermove");
      expect(scrollbar.rate).toBe(1.0);
      controlButton(isHorizontal, target, maxPos, "pointerup");
      expect(scrollbar.rate).toBe(
        1.0 + scrollbar.inertialManager.decelerationRate,
      );
      expect(inertial.speed).toBe(-97.5);

      updateTicker(16);
      expect(scrollbar.rate).toBeCloseTo(2.41);
      expect(inertial.speed).toBeCloseTo(-43.57);

      updateTicker(16 * 2);
      expect(scrollbar.rate).toBeCloseTo(2.502);
      expect(inertial.speed).toBeCloseTo(-9.1876);

      updateTicker(16 * 3);
      expect(scrollbar.rate).toBeCloseTo(2.517);
      expect(inertial.speed).toBeCloseTo(-1.4801);

      updateTicker(16 * 4);
      expect(scrollbar.rate).toBeCloseTo(2.519);
      expect(inertial.speed).toBeCloseTo(-0.2265);

      updateTicker(16 * 5);
      expect(scrollbar.rate).toBeCloseTo(2.519);
      expect(inertial.speed).toBe(0);
    });
  });

  describe("refreshAfterContentsResize", () => {
    test("コンテンツエリアがマスク以下の場合、先頭位置に配置される", () => {
      const W = 100;
      const H = 100;
      const SCROLL_BAR_W = 16;
      // コンテンツがマスクより大きい初期状態
      const CONTENTS_SCALE = 2.0;
      const { scrollBarContents, scrollbar } =
        ScrollBarViewGenerator.generateScrollBarSet(
          W,
          H,
          SCROLL_BAR_W,
          CONTENTS_SCALE,
          "TestScrollBar_refreshAfterContentsResize_small",
        );

      scrollbar.changeRate(0.5); // 中間位置に設定

      // コンテンツを縮小
      const container = scrollBarContents.target;
      container.hitArea = new Rectangle(0, 0, W, H * 0.5);
      scrollbar.refreshAfterContentsResize();

      expect(scrollbar.contents.target.y).toBeCloseTo(0.0); // 先頭位置に配置される
    });

    test("マスク以上かつ中間位置の場合、スクロール位置が維持される", () => {
      const W = 100;
      const H = 100;
      const SCROLL_BAR_W = 16;
      const CONTENTS_SCALE = 2.0;
      const { scrollBarContents, scrollbar } =
        ScrollBarViewGenerator.generateScrollBarSet(
          W,
          H,
          SCROLL_BAR_W,
          CONTENTS_SCALE,
          "TestScrollBar_refreshAfterContentsResize_middle",
        );

      scrollbar.changeRate(0.5); // 中間位置に設定
      const containerPosition = scrollBarContents.target.y;

      // コンテンツサイズを変更（ただし表示範囲を超えたまま）
      const container = scrollBarContents.target;
      container.hitArea = new Rectangle(0, 0, W, H * 1.8);

      scrollbar.refreshAfterContentsResize();
      expect(scrollBarContents.target.y).toBeCloseTo(containerPosition); // 位置が維持される
    });

    test("マスク以上で下端を超える場合、後端に配置される", () => {
      const W = 100;
      const H = 100;
      const SCROLL_BAR_W = 16;
      const CONTENTS_SCALE = 2.0;
      const { scrollBarContents, scrollbar } =
        ScrollBarViewGenerator.generateScrollBarSet(
          W,
          H,
          SCROLL_BAR_W,
          CONTENTS_SCALE,
          "TestScrollBar_refreshAfterContentsResize_exceed",
        );

      scrollbar.changeRate(1.0); // 末尾位置に設定

      // コンテンツを縮小（現在位置が末尾を超えるように）
      const container = scrollBarContents.target;
      container.hitArea = new Rectangle(0, 0, W, H * 1.2);
      container.boundsArea = new Rectangle(0, 0, W, H * 1.2);

      scrollbar.refreshAfterContentsResize();
      expect(scrollbar.rate).toBe(1.0); // 末尾位置に配置される
    });
  });

  test("dispose", () => {
    expect(scrollbar.contents.listeners("changed_contents_size")).not.toEqual(
      [],
    );
    scrollbar.dispose();
    expect(scrollbar.contents.listeners("changed_contents_size")).toEqual([]);
  });
});

describe("ScrollBarView with autoHide", () => {
  const W = 100;
  const H = 100;
  const SCROLL_BAR_W = 16;
  const CONTENTS_SCALE: number = 0.5;
  const { sliderOption, scrollBarContents, scrollbar, spyLog } =
    ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView with autoHide",
    );
  scrollbar.autoHide = true;

  beforeEach(() => {
    updateTicker(-1);
  });

  afterEach(() => {
    scrollbar.changeRate(0.0);
    DummyPointerEvent.emit(sliderOption.base, "pointerup");
    DummyPointerEvent.emit(sliderOption.button, "pointerup");
    spyLog.mockReset();
  });

  afterAll(() => {
    scrollbar.dispose();
  });

  test("init", () => {
    expect(scrollbar).toBeTruthy();
    expect(scrollbar.autoHide).toBe(true);
    expect(scrollBarContents.target.scale.y).toBe(1.0);
    expect(sliderOption.button.visible).toBe(false);
  });

  /**
   * hiddenの場合、SliderのBaseタップは無視する
   */
  test("tap base on hidden", () => {
    const base = sliderOption.base;
    const isHorizontal = scrollbar.isHorizontal;

    SliderViewTester.controlButton(isHorizontal, base, 0.0, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
    SliderViewTester.controlButton(isHorizontal, base, H, "pointertap");
    expect(scrollbar.rate).toBe(0.0);
  });
});

/**
 * ダミーのタイマーを更新し、慣性スクロールのアニメーションを進行させる。
 * @param t アプリケーション実行開始からの総時間（ミリ秒）
 *
 * マルチタッチのテストでは慣性スクロールの影響を考慮する必要がないため、
 * この関数を呼び出す必要はありません。
 */
const updateTicker = (t: number) => {
  Ticker.shared.update(t);
};
