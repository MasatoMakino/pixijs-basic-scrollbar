import { SliderView } from "../src";
import { SliderGenerator } from "./SliderGenerator";

describe("SliderView", () => {
  const spyLog = jest.spyOn(console, "log").mockImplementation((x) => {
    x;
  });
  const size = 100;
  const { slider, sliderButton } = SliderGenerator.initSlider(size, size);

  beforeEach(() => {
    spyLog.mockReset();
  });

  afterEach(() => {});

  test("init", () => {
    expect(slider).toBeTruthy();
    expect(slider.rate).toBe(1.0);
  });

  test("set rate", () => {
    slider.changeRate(0.0);
    expect(slider.rate).toBe(0.0);
    expect(spyLog).toBeCalledWith(0);
    expect(sliderButton.x).toBe(0.0);
  });
});
