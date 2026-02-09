import { Container, ContainerChild, ContainerEvents, Point } from "pixi.js";
import { expect } from "vitest";
import { DummyPointerEvent } from "./DummyPointerEvent.js";
import { SliderSet } from "./SliderGenerator.js";

/**
 * SliderViewのテストヘルパークラス
 *
 * このクラスには2種類のヘルパー関数が含まれる：
 *
 * 1. 低レベル操作関数
 *    - controlButton, generateInteractionEvent
 *    - 単純なイベント発火のみを行い、テストは含まない
 *    - マルチタッチテストなどで使用
 *
 * 2. 高レベルテスト関数
 *    - dragButton, tapBase, changeRate, changeRateTest, tabBaseTest
 *    - 内部でtestRateを呼び出し、rateの変化を自動的に検証
 *    - 通常の単一操作のテストで使用
 */

export class TestRateOption {
  hasChangedEvent?: boolean;

  public static initOption(option?: TestRateOption) {
    option ??= {};
    option.hasChangedEvent ??= true;
    return option;
  }
}

export class SliderViewTester {
  public static generateInteractionEvent(
    target: Container,
    globalX: number,
    globalY: number,
    pointerId: number = 1, // Add pointerId option, default to 1
  ) {
    return {
      pointerId: pointerId, // Always include pointerId
      currentTarget: target,
      globalX: globalX,
      globalY: globalY,
      offsetX: globalX,
      offsetY: globalY,
      global: new Point(globalX, globalY),
    };
  }

  public static controlButton(
    isHorizontal: boolean,
    target: Container | HTMLCanvasElement,
    pos: number,
    type: keyof ContainerEvents<ContainerChild>,
    pointerId: number = 1, // Add pointerId option
  ) {
    const globalX = isHorizontal ? pos : 0;
    const globalY = isHorizontal ? 0 : pos;
    const e = SliderViewTester.generateInteractionEvent(
      target as Container,
      globalX,
      globalY,
      pointerId, // Pass pointerId correctly
    );
    DummyPointerEvent.emit(target, type, e);
  }

  public static testRate(
    targets: SliderSet,
    rate: number,
    option?: TestRateOption,
  ) {
    option = TestRateOption.initOption(option);
    expect(targets.slider.rate).toBe(rate);

    if (option.hasChangedEvent) {
      expect(targets.spyLog).toBeCalledWith(rate);
    }

    const isHorizontal = targets.slider.isHorizontal;

    const buttonPos = isHorizontal
      ? targets.sliderButton.x
      : targets.sliderButton.y;
    expect(buttonPos).toBe(rate * targets.size);

    if (targets.sliderBar && targets.sliderBarMask) {
      const maskScale = targets.sliderBarMask.scale;
      const scale = targets.slider.isHorizontal ? maskScale.x : maskScale.y;
      expect(scale).toBe(rate);
    }

    if (targets.sliderBar && !targets.sliderBarMask) {
      const barScale = targets.sliderBar.scale;
      const scale = targets.slider.isHorizontal ? barScale.x : barScale.y;
      expect(scale).toBe(rate);
    }
  }

  /**
   * rateを変更し、その結果をテストする高レベルヘルパー関数
   */
  public static changeRate(
    sliders: SliderSet,
    rate: number,
    option?: TestRateOption,
  ) {
    sliders.slider.changeRate(rate);
    SliderViewTester.testRate(sliders, rate, option);
  }

  /**
   * ベースをタップする高レベルヘルパー関数
   */
  public static tapBase(
    sliders: SliderSet,
    pos: number,
    option?: TestRateOption,
    pointerId: number = 1, // Add pointerId option
  ) {
    SliderViewTester.controlButton(
      sliders.slider.isHorizontal,
      sliders.sliderBase,
      pos,
      "pointertap",
      pointerId, // Pass pointerId
    );
    // SliderViewTester.testRate(...) call remains unchanged below
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }

  /**
   * ボタンをドラッグする高レベルヘルパー関数
   */
  public static dragButton(
    sliders: SliderSet,
    pos: number,
    type: keyof ContainerEvents<ContainerChild>,
    option?: TestRateOption,
    pointerId: number = 1, // Add pointerId option
  ) {
    SliderViewTester.controlButton(
      sliders.slider.isHorizontal,
      type === "pointermove"
        ? sliders.slider.buttonRootContainer
        : sliders.sliderButton,
      pos,
      type,
      pointerId,
    );
    SliderViewTester.testRate(sliders, pos / sliders.size, option);
  }

  /**
   * 基本的なrate変更テストを実行する高レベルヘルパー関数
   */
  public static changeRateTest(sliders: SliderSet) {
    SliderViewTester.changeRate(sliders, 0.0);
    SliderViewTester.changeRate(sliders, 0.5);
    SliderViewTester.changeRate(sliders, 1.0);
  }

  /**
   * ベースタップテストを実行する高レベルヘルパー関数
   */
  public static tabBaseTest(sliders: SliderSet) {
    SliderViewTester.tapBase(sliders, 0.0);
    SliderViewTester.tapBase(sliders, 0.5 * sliders.size);
    SliderViewTester.tapBase(sliders, sliders.size);
  }
}
