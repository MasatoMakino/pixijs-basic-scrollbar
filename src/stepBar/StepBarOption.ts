import { Container } from "pixi.js";

/**
 * ステップバーのオプションです。
 *
 * ステップバーは、Pixi.jsの座標系に合わせてスクリーン座標系を使用します。
 * 従って値が加算されると、スライダーの位置は右か下に移動します。
 *
 * 移動方向を逆転させたい場合は、以下のように設定してください。
 * - sliderStartPointとsliderMaxPointを逆に指定する
 * - incrementButtonとdecrementButtonを入れ替えて指定する。
 *
 * @param base ドラッグ操作を受け付ける範囲
 * @param sliderStartPoint minValueに対応するスライダーの座標
 * @param sliderMaxPoint maxValueに対応するスライダーの座標
 * @param maxValue 最大値
 * @param minValue 最小値
 * @param initialValue 初期値
 * @param step ステップ
 * @param sliderButton スライダーボタン
 * @param incrementButton ステップアップボタン
 * @param decrementButton ステップダウンボタン
 * @param isHorizontal 水平方向かどうか
 * @param canvas キャンバス
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
  incrementButton?: Container;
  decrementButton?: Container;
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
