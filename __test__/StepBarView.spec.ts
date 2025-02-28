import { describe, beforeEach, expect, it, vi } from "vitest";
import { Container } from "pixi.js";
import { StepBarView } from "../src/index.js";
import { SliderViewTester } from "./SliderViewTester.js";

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
    vi.restoreAllMocks();
  });

  const getDefaultValue = () => {
    return {
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      step: 10,
      sliderButton,
      incrementButton,
      decrementButton,
      isHorizontal: true,
    };
  };

  it("should set initial value", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    expect(stepBar.value).toBe(20);
    expect(sliderButton.x).toBe(20);
  });

  it("should respect unsnapped initial value without rounding", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 57.37,
      step: 1,
    });
    expect(stepBar.value).toBe(57.37);
    expect(sliderButton.x).toBe(57.37);
  });

  it("should increase value on incrementValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });

    const listener = vi.fn();
    stepBar.stepBarEventEmitter.on("changed", listener);

    stepBar.incrementValue();
    expect(stepBar.value).toBe(30);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(30);

    expect(sliderButton.x).toBe(30);
  });

  it("should decrease value on decrementValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    stepBar.decrementValue();
    expect(stepBar.value).toBe(10);
  });

  it("should not decrease value below minValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 0,
    });
    stepBar.decrementValue();
    expect(stepBar.value).toBe(0);

    stepBar.decrementValue();
    expect(stepBar.value).toBe(0);
  });

  it("should not increase value above maxValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 100,
    });
    stepBar.incrementValue();
    expect(stepBar.value).toBe(100);

    stepBar.incrementValue();
    expect(stepBar.value).toBe(100);
  });

  it("should correctly set value within bounds", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 50,
    });
    stepBar.incrementValue();
    expect(stepBar.value).toBe(60);

    stepBar.decrementValue();
    expect(stepBar.value).toBe(50);
  });

  it("should snap to the nearest step value when incrementing", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 57.37,
    });
    stepBar.incrementValue();
    expect(stepBar.value).toBe(60);
  });

  it("should snap to the nearest step value when decrementing", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 57.37,
    });
    stepBar.decrementValue();
    expect(stepBar.value).toBe(50);
  });
});

describe("StepBarView (vertical)", () => {
  let base: Container, sliderButton: Container;

  beforeEach(() => {
    base = new Container();
    sliderButton = new Container();
    vi.restoreAllMocks();
  });

  const getDefaultValue = () => {
    return {
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      step: 10,
      sliderButton,
      isHorizontal: false,
    };
  };

  it("should create an instance of StepBarView with default values", () => {
    const stepBar = new StepBarView(getDefaultValue());
    expect(stepBar).toBeDefined();
    expect(stepBar.value).toBe(0);
    expect(sliderButton.y).toBe(0);

    stepBar.incrementValue();
    expect(stepBar.value).toBe(10);
    expect(sliderButton.y).toBe(10);
  });
});

describe("StepBarView increment/decrement button", () => {
  let base: Container, incrementButton: Container, decrementButton: Container;

  beforeEach(() => {
    base = new Container();
    incrementButton = new Container();
    decrementButton = new Container();
    vi.restoreAllMocks();
  });

  const getDefaultValue = () => {
    return {
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      step: 10,
      incrementButton,
      decrementButton,
    };
  };
  it("should correctly increase value on incrementValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 30,
    });
    SliderViewTester.controlButton(true, incrementButton, 0, "pointertap");
    expect(stepBar.value).toBe(40);
  });

  it("should correctly decrease value on decrementValue", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 50,
    });
    SliderViewTester.controlButton(true, decrementButton, 0, "pointertap");
    expect(stepBar.value).toBe(40);
  });
});
