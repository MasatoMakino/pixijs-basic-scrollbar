import { Container } from "pixi.js";

/**
 * ステップバーのオプションです。
 */
export interface StepBarOption {
  base: Container; // 操作を受け付ける範囲
  sliderStartPoint: number;
  sliderMaxPoint: number;
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
 * 初期化済みステップバーオプションです。
 */
export interface InitializedStepBarOption extends StepBarOption {
  step: number;
  minValue: number;
  isHorizontal: boolean;
  initialValue: number;
}

/**
 * ステップバーオプションを初期化します。
 * @param option ステップバーオプション
 * @returns 初期化済みステップバーオプション
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
