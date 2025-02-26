import { describe, beforeEach, expect, it } from "vitest";
import { Container } from "pixi.js";
import { StepBarView } from "../src/index.js";

describe("StepBarView", () => {
  let base: Container,
    sliderButton: Container,
    incrementButton: Container,
    decrementButton: Container;

  beforeEach(() => {
    base = new Container();
    sliderButton = new Container();
    incrementButton = new Container();
    decrementButton = new Container();
  });

  it("should set initial value", () => {
    const stepBar = new StepBarView({
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      initialValue: 20,
      step: 10,
      sliderButton,
      incrementButton,
      decrementButton,
      isHorizontal: true,
    });
    expect(stepBar.value).toBe(20);
  });

  it("should increase value on incrementValue", () => {
    const stepBar = new StepBarView({
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      initialValue: 20,
      step: 10,
      sliderButton,
      incrementButton,
      decrementButton,
      isHorizontal: true,
    });
    stepBar.incrementValue();
    expect(stepBar.value).toBe(30);
  });

  it("should decrease value on decrementValue", () => {
    const stepBar = new StepBarView({
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      initialValue: 20,
      step: 10,
      sliderButton,
      incrementButton,
      decrementButton,
      isHorizontal: true,
    });
    stepBar.decrementValue();
    expect(stepBar.value).toBe(10);
  });
});
