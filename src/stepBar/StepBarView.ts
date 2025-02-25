import { FederatedPointerEvent, EventEmitter, Container } from "pixi.js";
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
    const addParts = (target: Container | undefined) => {
      if (target) {
        if (target.parent) {
          console.log("target.parent", target.parent);
          target.parent.removeChild(target);
        }
        this.addChild(target);
      }
    };
    addParts(this.option.base);
    addParts(this.option.sliderButton);
    addParts(this.option.stepUpButton);
    addParts(this.option.stepDownButton);
    this.updateSliderPosition();

    if (this.option.sliderButton) {
      this.option.sliderButton.eventMode = "none";
      this.option.sliderButton.interactive = false;
      this.option.sliderButton.interactiveChildren = false;
    }

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

    this.option.base.interactive = true;
    this.option.base.interactiveChildren = false;
    this.option.base.eventMode = "static";
    this.option.base.cursor = "pointer";
    this.option.base.alpha = 0;
    this.option.base.on("pointertap", this.updateValueOnBaseClick);

    // ドラッグ中の処理
    this.option.base.on("pointerdown", () => {
      this.option.base.on("pointermove", this.updateValueOnBaseClick);
    });
    this.option.base.on("pointerup", () => {
      this.option.base.off("pointermove", this.updateValueOnBaseClick);
    });
    this.option.base.on("pointerupoutside", () => {
      this.option.base.off("pointermove", this.updateValueOnBaseClick);
    });
  }

  protected updateValueOnBaseClick = (e: FederatedPointerEvent) => {
    const {
      minValue,
      maxValue,
      sliderStartPoint,
      sliderMaxPoint,
      isHorizontal,
      step,
    } = this.option;
    const localPosition = e.getLocalPosition(this);
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
