import { describe, beforeEach, expect, it, vi } from "vitest";
import { Container, Graphics, Rectangle } from "pixi.js";
import { StepBarView } from "../src/index.js";
import { SliderViewTester } from "./SliderViewTester.js";
import { DummyPointerEvent } from "./DummpyPointerEvent.js";

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

describe("StepBarView.base", () => {
  let base: Graphics;

  beforeEach(() => {
    base?.removeFromParent();
    base = new Graphics();
    base.hitArea = new Rectangle(0, 0, 100, 20);
    vi.restoreAllMocks();
  });

  const getDefaultValue = () => {
    return {
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      step: 10,
    };
  };

  it("should correctly increase value on base tap", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 0, "pointertap");
    expect(stepBar.value).toBe(0);

    SliderViewTester.controlButton(true, base, 50, "pointertap");
    expect(stepBar.value).toBe(50);

    SliderViewTester.controlButton(true, base, 100, "pointertap");
    expect(stepBar.value).toBe(100);
  });

  it("should not go beyond the maximum value", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 120, "pointertap");
    expect(stepBar.value).toBe(100);
  });

  it("should not go below the minimum value", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, -10, "pointertap");
    expect(stepBar.value).toBe(0);
  });

  it("should snap to the nearest step value", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 57.37, "pointertap");
    expect(stepBar.value).toBe(60);

    SliderViewTester.controlButton(true, base, 52.63, "pointertap");
    expect(stepBar.value).toBe(50);

    SliderViewTester.controlButton(true, base, 55, "pointertap");
    expect(stepBar.value).toBe(60);
  });

  it("should correctly increase value on base drag", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 0, "pointerdown");
    expect(stepBar.value).toBe(0);
    SliderViewTester.controlButton(true, base, 50, "pointermove");
    expect(stepBar.value).toBe(50);
    // should not change value when pointerup
    SliderViewTester.controlButton(true, base, 100, "pointerup");
    expect(stepBar.value).toBe(50);

    // should not change value when not dragging
    SliderViewTester.controlButton(true, base, 0, "pointermove");
    expect(stepBar.value).toBe(50);
    SliderViewTester.controlButton(true, base, 100, "pointermove");
    expect(stepBar.value).toBe(50);
  });

  it("shoud stop dragging when pointerupoutside", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 0, "pointerdown");
    expect(stepBar.value).toBe(0);
    SliderViewTester.controlButton(true, base, 50, "pointermove");
    expect(stepBar.value).toBe(50);
    SliderViewTester.controlButton(true, base, 100, "pointerupoutside");
    expect(stepBar.value).toBe(50);

    // should not change value when not dragging
    SliderViewTester.controlButton(true, base, 0, "pointermove");
    expect(stepBar.value).toBe(50);
    SliderViewTester.controlButton(true, base, 100, "pointermove");
    expect(stepBar.value).toBe(50);
  });

  it("should stop dragging when pointercancel", () => {
    const stepBar = new StepBarView(getDefaultValue());
    SliderViewTester.controlButton(true, base, 0, "pointerdown");
    expect(stepBar.value).toBe(0);
    SliderViewTester.controlButton(true, base, 50, "pointermove");
    expect(stepBar.value).toBe(50);
    SliderViewTester.controlButton(true, base, 100, "pointercancel");
    expect(stepBar.value).toBe(50);

    // should not change value when not dragging
    SliderViewTester.controlButton(true, base, 0, "pointermove");
    expect(stepBar.value).toBe(50);
    SliderViewTester.controlButton(true, base, 100, "pointermove");
    expect(stepBar.value).toBe(50);
  });
});

describe("StepBarView wheel", () => {
  let base: Container;

  beforeEach(() => {
    base = new Container();
    vi.restoreAllMocks();
  });

  const getDefaultValue = () => {
    return {
      base,
      sliderStartPoint: 0,
      sliderMaxPoint: 100,
      maxValue: 100,
      step: 10,
    };
  };

  const wheelUp = { deltaY: -1 };
  const wheelDown = { deltaY: 1 };

  it("should increase value on wheel up", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(30);
  });

  it("should increase value on wheel up for reversed horizontal stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      sliderStartPoint: 100,
      sliderMaxPoint: 0,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(30);
  });

  it("should decrease value on wheel down", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(10);
  });

  it("should decrease value on wheel down for reversed horizontal stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      sliderStartPoint: 100,
      sliderMaxPoint: 0,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(10);
  });

  it("should not change value when wheel event is not vertical", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", { deltaX: 1 });
    expect(stepBar.value).toBe(20);
    DummyPointerEvent.emit(base, "wheel", { deltaY: 0 });
    expect(stepBar.value).toBe(20);
  });

  it("should decrease value on wheel up with vertical stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      isHorizontal: false,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(10);
  });

  it("should increase value on wheel up for reversed vertical stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      isHorizontal: false,
      sliderStartPoint: 100,
      sliderMaxPoint: 0,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(30);
  });

  it("should increase value on wheel down with vertical stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      isHorizontal: false,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(30);
  });

  it("should decrease value on wheel down for reversed vertical stepbar", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      isHorizontal: false,
      sliderStartPoint: 100,
      sliderMaxPoint: 0,
      initialValue: 20,
    });
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(10);
  });

  it("should not respond to wheel events when disabled", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    stepBar.disableWheel();
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(20);
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(20);
  });

  it("should respond to wheel events after re-enabling", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
    });
    stepBar.disableWheel();
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(20);

    stepBar.enableWheel();
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(30);
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(20);
  });

  it("should initialize with mousewheel disabled when enableMouseWheel is false", () => {
    const stepBar = new StepBarView({
      ...getDefaultValue(),
      initialValue: 20,
      enableMouseWheel: false,
    });
    DummyPointerEvent.emit(base, "wheel", wheelUp);
    expect(stepBar.value).toBe(20);
    DummyPointerEvent.emit(base, "wheel", wheelDown);
    expect(stepBar.value).toBe(20);
  });
});
