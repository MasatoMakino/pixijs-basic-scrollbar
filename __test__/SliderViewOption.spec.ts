import { Container } from "pixi.js";
import { SliderViewOption, SliderViewOptionUtil } from "../src";
import { SliderOptionGenerator } from "./SliderOptionGenerator";

describe("SliderViewOption", () => {
  const spyWarn = jest.spyOn(console, "warn").mockImplementation((x) => x);
  beforeEach(() => {
    spyWarn.mockClear();
  });
  afterAll(() => {
    spyWarn.mockRestore();
  });

  test("default value", () => {
    const size = 100;
    const option = SliderOptionGenerator.generateMinimalOption(size, size);
    const initializedOption = SliderViewOptionUtil.init(option);
    expect(initializedOption.isHorizontal).toBe(true);
    expect(initializedOption.rate).toBe(0.0);
    expect(initializedOption.minPosition).toBe(0.0);
  });

  test("non hitArea", () => {
    const option = SliderOptionGenerator.generateNonBoundsOption();
    expect(() => {
      SliderViewOptionUtil.init(option);
    }).toThrowError(
      "初期化オプションで指定されたDisplayObjectにバウンディングボックスが存在しません"
    );
  });

  test("has parent", () => {
    const size = 100;
    const option = SliderOptionGenerator.generateMinimalOption(size, size);
    const parent = new Container();
    parent.addChild(option.button);
    SliderViewOptionUtil.init(option);
    expect(spyWarn).toBeCalledTimes(1);
  });
});
