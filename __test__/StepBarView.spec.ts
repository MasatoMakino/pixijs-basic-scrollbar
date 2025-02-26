import { describe, beforeEach, expect, it } from "vitest";
import { Container } from "pixi.js";
import { StepBarView } from "../src/index.js";

describe("StepBarView", () => {
  let base: Container,
    sliderButton: Container,
    stepUpButton: Container,
    stepDownButton: Container;

  beforeEach(() => {
    base = new Container();
    sliderButton = new Container();
    stepUpButton = new Container();
    stepDownButton = new Container();
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
      stepUpButton,
      stepDownButton,
      isHorizontal: true,
    });
    expect(stepBar.value).toBe(20);
  });

  it("should increase value on stepUp", () => {
    const stepBar = new StepBarView({
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      initialValue: 20,
      step: 10,
      sliderButton,
      stepUpButton,
      stepDownButton,
      isHorizontal: true,
    });
    stepBar.stepUp();
    expect(stepBar.value).toBe(30);
  });

  it("should decrease value on stepDown", () => {
    const stepBar = new StepBarView({
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      initialValue: 20,
      step: 10,
      sliderButton,
      stepUpButton,
      stepDownButton,
      isHorizontal: true,
    });
    stepBar.stepDown();
    expect(stepBar.value).toBe(10);
  });
});
