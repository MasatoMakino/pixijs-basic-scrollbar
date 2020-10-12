import { SliderViewOption } from "../src";
import { SliderGenerator } from "./SliderGenerator";

describe("SliderViewOption", () => {
  test("default value", () => {
    const size = 100;
    const option = SliderGenerator.generateMinimalOption(size, size);
    const initializedOption = SliderViewOption.init(option);
    expect(initializedOption.isHorizontal).toBe(true);
    expect(initializedOption.rate).toBe(0.0);
  });

  test("non hitArea", () => {
    const option = SliderGenerator.generateNonBoundsOption();
    expect(() => {
      SliderViewOption.init(option);
    }).toThrowError(
      "初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません"
    );
  });
});
