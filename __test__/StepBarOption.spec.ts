import { describe, expect, it } from "vitest";
import { Container } from "pixi.js";
import { initializeStepBarOption } from "../src/stepBar/StepBarOption.js";

describe("StepBarOption", () => {
  it("should initialize step bar option", () => {
    const option = {
      base: new Container(),
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      sliderButton: new Container(),
      incrementButton: new Container(),
      decrementButton: new Container(),
      canvas: document.createElement("canvas"),
    };
    const initializedOption = initializeStepBarOption(option);
    expect(initializedOption).toEqual({
      ...option,
      initialValue: 0,
      minValue: 0,
      step: 1,
      isHorizontal: true,
    });
  });
});
