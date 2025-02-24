import { FederatedPointerEvent, EventEmitter, Container } from "pixi.js";

/**
 * ステップバーの初期化オプションです。
 */
export interface StepBarOption {
  base: Container; // 操作を受け付ける範囲
  maxPosition: number;
  minPosition: number;
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
    const next = Math.max(
      this.option.minValue,
      Math.min(this.option.maxValue, value),
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

    const initStepButton = (listener: () => void, button?: Container) => {
      if (button) {
        button.interactive = true;
        button.interactiveChildren = false;
        button.eventMode = "static";
        button.on("pointertap", listener);
      }
    };
    initStepButton(this.stepUp, this.option.stepUpButton);
    initStepButton(this.stepDown, this.option.stepDownButton);
  }

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
    const { maxPosition, minPosition, maxValue, minValue } = this.option;
    const value = this._value;
    const rate = (value - minValue) / (maxValue - minValue);
    return minPosition + (maxPosition - minPosition) * rate;
  };
}
