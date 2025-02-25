import { FederatedPointerEvent, EventEmitter, Container, Point } from "pixi.js";
import { SliderViewUtil } from "../SliderViewUtil.js";
import {
  StepBarOption,
  InitializedStepBarOption,
  initializeStepBarOption,
} from "./StepBarOption.js";

export interface StepBarEventTypes {
  changed: (newValue: number) => void;
}

/**
 * ステップバーを表すクラスです。
 */
export class StepBarView extends Container {
  private option: InitializedStepBarOption;
  readonly stepBarEventEmitter = new EventEmitter<StepBarEventTypes>();

  protected _value: number;
  set value(value: number) {
    const prev = this._value;
    const next = SliderViewUtil.clamp(
      value,
      this.option.maxValue,
      this.option.minValue,
    );
    this._value = next;

    if (prev !== this._value) {
      this.updateSliderPosition();
      this.stepBarEventEmitter.emit("changed", this._value);
    }
  }
  get value(): number {
    return this._value;
  }

  /**
   * コンストラクタ
   * @param option ステップバーオプション
   */
  constructor(option: StepBarOption) {
    super();
    this.option = initializeStepBarOption(option);
    this._value = this.option.initialValue;
    this.init();
  }

  protected init() {
    this.initParts();
    this.updateSliderPosition();

    this.initSliderButton();

    const listenStepButtonInteraction = (
      listener: () => void,
      button?: Container,
    ) => {
      if (button) {
        button.interactive = true;
        button.interactiveChildren = false;
        button.eventMode = "static";
        button.cursor = "pointer";
        button.on("pointertap", listener);
      }
    };
    listenStepButtonInteraction(this.stepUp, this.option.stepUpButton);
    listenStepButtonInteraction(this.stepDown, this.option.stepDownButton);

    this.initBaseEventHandlers();
  }

  /**
   * ステップバーのパーツを初期化します。
   */
  protected initParts = (): void => {
    const { base, sliderButton, stepUpButton, stepDownButton } = this.option;
    SliderViewUtil.addChildParts(this, base);
    SliderViewUtil.addChildParts(this, sliderButton);
    SliderViewUtil.addChildParts(this, stepUpButton);
    SliderViewUtil.addChildParts(this, stepDownButton);
  };

  /**
   * Initializes the slider button properties.
   * @returns void
   */
  protected initSliderButton = (): void => {
    const { sliderButton } = this.option;
    if (!sliderButton) return;

    sliderButton.eventMode = "none";
    sliderButton.interactive = false;
    sliderButton.interactiveChildren = false;
  };

  /**
   * ステップバーの地のポインターイベントハンドラを初期化します。
   */
  protected initBaseEventHandlers = (): void => {
    const { canvas, base } = this.option;

    base.interactive = true;
    base.interactiveChildren = false;
    base.eventMode = "static";
    base.cursor = "pointer";
    base.alpha = 0;
    base.on("pointertap", this.updateValueFromPointerEvent);

    const dragTarget = canvas || base;
    const addEventListenerToTarget = (): void => {
      SliderViewUtil.addEventListenerToTarget(
        dragTarget,
        "pointermove",
        this.updateValueFromPointerEvent,
      );
    };
    const removeEventListenerFromTarget = (): void => {
      SliderViewUtil.removeEventListenerFromTarget(
        dragTarget,
        "pointermove",
        this.updateValueFromPointerEvent,
      );
    };

    // ドラッグ中の処理
    base.on("pointerdown", () => {
      addEventListenerToTarget();
    });
    base.on("pointerup", () => {
      removeEventListenerFromTarget();
    });
    base.on("pointerupoutside", () => {
      removeEventListenerFromTarget();
    });
    base.on("pointercancel", () => {
      removeEventListenerFromTarget();
    });
  };

  /**
   * ポインターイベントから座標を取得し、valueを更新します。
   * @param e ポインターイベント
   */
  protected updateValueFromPointerEvent = (
    e: FederatedPointerEvent | PointerEvent,
  ) => {
    const {
      minValue,
      maxValue,
      sliderStartPoint,
      sliderMaxPoint,
      isHorizontal,
      step,
    } = this.option;

    const localPosition = SliderViewUtil.getPointerLocalPoint(e, this);
    const positionKey = isHorizontal ? "x" : "y";
    const valueRange = maxValue - minValue;

    const range = sliderMaxPoint - sliderStartPoint;
    const diff = localPosition[positionKey] - sliderStartPoint;

    const rate = (diff / range) * valueRange;
    const newValue = minValue + rate;

    const roundedValue = StepBarView.snap(newValue, step, minValue);
    this.value = roundedValue;
  };

  private static snap(value: number, step: number, minValue: number): number {
    return Math.round((value - minValue) / step) * step + minValue;
  }

  /**
   * stepUpButtonをクリックしたときに呼び出される関数です。
   * 現在の値から最も近い、stepにスナップした値に更新します。
   */
  stepUp = () => {
    this.value = StepBarView.snapUp(
      this.value,
      this.option.step,
      this.option.minValue,
    );
  };

  /**
   * stepDownButtonをクリックしたときに呼び出される関数です。
   * 現在の値から最も近い、stepにスナップした値に更新します。
   */
  stepDown = () => {
    this.value = StepBarView.snapDown(
      this.value,
      this.option.step,
      this.option.minValue,
    );
  };

  /**
   * Returns the next snapped value above the current value.
   */
  protected static snapUp(
    value: number,
    step: number,
    minValue: number,
  ): number {
    const diff = value - minValue;
    // すでにスナップ済みなら次のスナップ値へ
    if (diff % step === 0) {
      return value + step;
    }
    // スナップ値に合わせて切り上げ
    return Math.ceil(diff / step) * step + minValue;
  }

  /**
   * Returns the next snapped value below the current value.
   */
  protected static snapDown(
    value: number,
    step: number,
    minValue: number,
  ): number {
    const diff = value - minValue;
    // すでにスナップ済みなら前のスナップ値へ
    if (diff % step === 0) {
      return value - step;
    }
    // スナップ値に合わせて切り捨て
    return Math.floor(diff / step) * step + minValue;
  }

  /**
   * スライダーボタンの位置を、valueに合わせて更新する
   */
  protected updateSliderPosition = (): void => {
    const slider = this.option.sliderButton;
    if (slider) {
      const positionKey = this.option.isHorizontal ? "x" : "y";
      slider.position[positionKey] = this.getSliderButtonPosition();
    }
  };

  /**
   * valueから、現在のスライダーボタンの位置を取得します。
   * @returns スライダーボタンの位置
   */
  private getSliderButtonPosition = (): number => {
    const { sliderStartPoint, sliderMaxPoint, maxValue, minValue } =
      this.option;
    const rate = (this.value - minValue) / (maxValue - minValue);
    return sliderStartPoint + (sliderMaxPoint - sliderStartPoint) * rate;
  };
}
