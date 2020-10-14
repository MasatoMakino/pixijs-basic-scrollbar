import { Container } from "pixi.js";
import { SliderViewOption } from "../src";
import { SliderGenerator } from "./SliderGenerator";

describe("SliderViewOption", () => {
  const spyWarn = jest.spyOn(console, "warn").mockImplementation((x) => {
    x;
  });

  beforeEach(() => {
    spyWarn.mockReset();
  });

  test("default value", () => {
    const size = 100;
    const option = SliderGenerator.generateMinimalOption(size, size);
    const initializedOption = SliderViewOption.init(option);
    expect(initializedOption.isHorizontal).toBe(true);
    expect(initializedOption.rate).toBe(0.0);
    expect(initializedOption.minPosition).toBe(0.0);
  });

  test("non hitArea", () => {
    const option = SliderGenerator.generateNonBoundsOption();
    expect(() => {
      SliderViewOption.init(option);
    }).toThrowError(
      "初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません"
    );
  });

  test("has parent", () => {
    const size = 100;
    const option = SliderGenerator.generateMinimalOption(size, size);
    const parent = new Container();
    parent.addChild(option.button);
    SliderViewOption.init(option);
    expect(spyWarn).toBeCalledTimes(1);
  });
});
