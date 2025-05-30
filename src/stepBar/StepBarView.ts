import { Container, EventEmitter, FederatedPointerEvent } from "pixi.js";
import { SliderViewUtil } from "../SliderViewUtil.js";
import {
  InitializedStepBarOption,
  initializeStepBarOption,
  StepBarOption,
} from "./StepBarOption.js";

export interface StepBarEventTypes {
  changed: (newValue: number) => void;
}

/**
 * Class representing a step bar component.
 */
export class StepBarView extends Container {
  private option: InitializedStepBarOption;
  private activePointerId: number | null = null;
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
   * Constructor.
   * @param option StepBar option configuration.
   */
  constructor(option: StepBarOption) {
    super();
    this.option = initializeStepBarOption(option);
    this._value = this.option.initialValue;
    this.init();
  }

  /**
   * Initializes the component parts.
   */
  protected init() {
    this.initParts();
    this.updateSliderPosition();

    this.initSliderButton();
    this.initStepButtons();
    this.initBaseEventHandlers();
    if (this.option.enableMouseWheel) {
      this.enableWheel();
    }
  }

  /**
   * Initializes the step bar's parts.
   */
  protected initParts = (): void => {
    const {
      base,
      sliderButton,
      incrementButton: stepUpButton,
      decrementButton: stepDownButton,
    } = this.option;
    SliderViewUtil.addChildParts(this, base);
    SliderViewUtil.addChildParts(this, sliderButton);
    SliderViewUtil.addChildParts(this, stepUpButton);
    SliderViewUtil.addChildParts(this, stepDownButton);
  };

  /**
   * Initializes event listeners for the increment and decrement buttons.
   */
  protected initStepButtons = (): void => {
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
    listenStepButtonInteraction(
      this.incrementValue,
      this.option.incrementButton,
    );
    listenStepButtonInteraction(
      this.decrementValue,
      this.option.decrementButton,
    );
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
   * Initializes pointer event handlers for the base component.
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
    base.on("pointerdown", (e: FederatedPointerEvent) => {
      // すでに別のポインターでドラッグ中の場合は無視
      if (this.activePointerId !== null) return;
      this.activePointerId = e.pointerId;
      addEventListenerToTarget();
    });
    base.on("pointerup", (e: FederatedPointerEvent) => {
      // イベントがIDを持ち、かつそのIDが記録中のIDと異なる場合は無視
      if (e.pointerId != null && e.pointerId !== this.activePointerId) return;
      this.activePointerId = null;
      removeEventListenerFromTarget();
    });
    base.on("pointerupoutside", (e: FederatedPointerEvent) => {
      if (e.pointerId != null && e.pointerId !== this.activePointerId) return;
      this.activePointerId = null;
      removeEventListenerFromTarget();
    });
    base.on("pointercancel", (e: FederatedPointerEvent) => {
      if (e.pointerId != null && e.pointerId !== this.activePointerId) return;
      this.activePointerId = null;
      removeEventListenerFromTarget();
    });
  };

  /**
   * Retrieves coordinates from the pointer event and updates the value.
   * @param e Pointer event.
   */
  protected updateValueFromPointerEvent = (
    e: FederatedPointerEvent | PointerEvent,
  ) => {
    // 記録したIDと異なる場合は無視
    if (this.activePointerId !== null && e.pointerId !== this.activePointerId) {
      return;
    }
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
   * Called when the increment button is clicked.
   * Updates the value by snapping to the next step.
   */
  incrementValue = () => {
    this.value = StepBarView.getNextStepValue(
      this.value,
      this.option.step,
      this.option.minValue,
    );
  };

  /**
   * Called when the decrement button is clicked.
   * Updates the value by snapping to the previous step.
   */
  decrementValue = () => {
    this.value = StepBarView.getPreviousStepValue(
      this.value,
      this.option.step,
      this.option.minValue,
    );
  };

  /**
   * Returns the next snapped value above the current value.
   */
  protected static getNextStepValue(
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
   * Returns the previous snapped value below the current value.
   */
  protected static getPreviousStepValue(
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
   * Updates the slider button position based on the current value.
   */
  protected updateSliderPosition = (): void => {
    const slider = this.option.sliderButton;
    if (slider) {
      const positionKey = this.option.isHorizontal ? "x" : "y";
      slider.position[positionKey] = this.getSliderButtonPosition();
    }
  };

  /**
   * Calculates the slider button's position based on the current value.
   * @returns Slider button position.
   */
  private getSliderButtonPosition = (): number => {
    const { sliderStartPoint, sliderMaxPoint, maxValue, minValue } =
      this.option;
    const rate = (this.value - minValue) / (maxValue - minValue);
    return sliderStartPoint + (sliderMaxPoint - sliderStartPoint) * rate;
  };

  private _isWheelEnabled: boolean = false;
  /**
   * マウスホイール操作の有効/無効を取得します。
   */
  get isWheelEnabled(): boolean {
    return this._isWheelEnabled;
  }

  /**
   * マウスホイール操作を有効化します。
   */
  public enableWheel(): void {
    if (this._isWheelEnabled) return;
    const { base } = this.option;
    base.eventMode = "static";
    base.on("wheel", this.wheelHandler);
    this._isWheelEnabled = true;
  }

  /**
   * マウスホイール操作を無効化します。
   */
  public disableWheel(): void {
    if (!this._isWheelEnabled) return;
    const { base } = this.option;
    base.off("wheel", this.wheelHandler);
    this._isWheelEnabled = false;
  }

  private wheelHandler = (e: WheelEvent): void => {
    if (e.deltaY === 0 || e.deltaY === undefined) return;

    const { isHorizontal, sliderStartPoint, sliderMaxPoint } = this.option;

    const isPositiveDelta = e.deltaY > 0;
    if (isHorizontal) {
      isPositiveDelta ? this.decrementValue() : this.incrementValue();
    } else {
      const isNormalDirection = sliderStartPoint < sliderMaxPoint;
      const shouldIncrement = isPositiveDelta === isNormalDirection;
      shouldIncrement ? this.incrementValue() : this.decrementValue();
    }
  };
}
