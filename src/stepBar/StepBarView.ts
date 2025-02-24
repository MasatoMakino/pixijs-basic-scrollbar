import { FederatedPointerEvent, EventEmitter, Container } from "pixi.js";
import { SliderViewUtil } from "../SliderViewUtil.js";

/**
 * ステップバーの初期化オプションです。
 */
export interface StepBarOption {
  base: Container; // 操作を受け付ける範囲
  leftTop: number;
  rightBottom: number;
  maxValue: number;
  minValue?: number; // default : 0
  initialValue?: number; //default : 0
  step?: number; // default : 1
  sliderButton?: Container;
  stepUpButton?: Container;
  stepDownButton?: Container;
  isHorizontal?: boolean; // default : true
  canvas?: HTMLCanvasElement;
}

/**
 * 初期化済みステップバーの初期化オプションです。
 */
export interface InitializedStepBarOption extends StepBarOption {
  step: number;
  minValue: number;
  isHorizontal: boolean;
  initialValue: number;
}

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
   *
   * @param option ステップバーの初期化オプション
   */
  constructor(option: StepBarOption) {
    super();
    this.option = {
      ...option,
      initialValue: option.initialValue ?? 0,
      minValue: option.minValue ?? 0,
      step: option.step ?? 1,
      isHorizontal: option.isHorizontal ?? true,
    };
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
    const { minValue, maxValue, leftTop, rightBottom, isHorizontal, step } =
      this.option;
    const localPosition = e.getLocalPosition(this);
    const positionKey = isHorizontal ? "x" : "y";
    const valueRange = maxValue - minValue;

    const range = rightBottom - leftTop;
    const diff = localPosition[positionKey] - leftTop;

    const rate = (diff / range) * valueRange;
    const newValue = minValue + rate;

    const roundedValue =
      Math.round((newValue - minValue) / step) * step + minValue;

    this.value = roundedValue;
  };

  stepUp = () => {
    this.value += this.option.step;
  };

  stepDown = () => {
    this.value -= this.option.step;
  };

  private updateSliderPosition = (): void => {
    const slider = this.option.sliderButton;
    if (slider) {
      const positionKey = this.option.isHorizontal ? "x" : "y";
      slider.position[positionKey] = this.getSliderButtonPosition();
    }
  };

  private getSliderButtonPosition = (): number => {
    const { leftTop, rightBottom, maxValue, minValue } = this.option;
    const value = this._value;
    const rate = (value - minValue) / (maxValue - minValue);
    return leftTop + (rightBottom - leftTop) * rate;
  };
}
