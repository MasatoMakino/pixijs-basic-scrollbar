import { Container } from "pixi.js";

/**
 * Step bar options.
 *
 * The step bar uses the screen coordinate system according to Pixi.js.
 * Therefore, when the value is incremented, the slider's position moves to the right or down.
 *
 * To invert the movement direction, configure as follows:
 * - Specify sliderStartPoint and sliderMaxPoint in reverse order.
 * - Swap the incrementButton and decrementButton.
 *
 * @param base The area for receiving drag operations.
 * @param sliderStartPoint The slider position corresponding to minValue.
 * @param sliderMaxPoint The slider position corresponding to maxValue.
 * @param maxValue Maximum value.
 * @param minValue Minimum value.
 * @param initialValue Initial value.
 * @param step Step value.
 * @param sliderButton Slider button.
 * @param incrementButton Increment button.
 * @param decrementButton Decrement button.
 * @param isHorizontal Whether the orientation is horizontal.
 * @param canvas Canvas element.
 */
export interface StepBarOption {
  base: Container;
  sliderStartPoint: number;
  sliderMaxPoint: number;
  maxValue: number;
  minValue?: number;
  initialValue?: number;
  step?: number;
  sliderButton?: Container;
  incrementButton?: Container;
  decrementButton?: Container;
  isHorizontal?: boolean;
  canvas?: HTMLCanvasElement;
}

/**
 * Initialized step bar options.
 *
 * @default minValue 0
 * @default step 1
 * @default isHorizontal true
 * @default initialValue 0
 */
export interface InitializedStepBarOption extends StepBarOption {
  step: number;
  minValue: number;
  isHorizontal: boolean;
  initialValue: number;
}

/**
 * Initializes the step bar options.
 * @param option Step bar options.
 * @returns Initialized step bar options.
 */
export function initializeStepBarOption(
  option: StepBarOption,
): InitializedStepBarOption {
  return {
    ...option,
    initialValue: option.initialValue ?? 0,
    minValue: option.minValue ?? 0,
    step: option.step ?? 1,
    isHorizontal: option.isHorizontal ?? true,
  };
}
