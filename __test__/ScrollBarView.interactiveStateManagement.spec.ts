import { ScrollBarViewGenerator } from "./ScrollBarViewGenerator.js";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { DummyPointerEvent } from "./DummyPointerEvent.js";
import { SliderViewTester } from "./SliderViewTester.js";

describe("ScrollBarView interactive state management", () => {
  it("should disable interactiveChildren during scroll and re-enable after", () => {
    const W = 100;
    const H = 100;
    const SCROLL_BAR_W = 16;
    const CONTENTS_SCALE: number = 2.0;
    const { scrollbar } = ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView",
    );

    const scrollTarget = scrollbar.contents.target;
    expect(scrollTarget.interactiveChildren).toBe(undefined);

    DummyPointerEvent.emit(scrollTarget, "pointerdown");
    DummyPointerEvent.emit(scrollTarget, "pointermove");
    expect(scrollTarget.interactiveChildren).toBe(false);

    // pointerup with velocity 0
    DummyPointerEvent.emit(scrollTarget, "pointerup");
    // interactiveChildren returns to original value after pointerup
    expect(scrollTarget.interactiveChildren).toBe(undefined);

    scrollbar.dispose();
  });

  it("should disable interactiveChildren during inertial Scroll and re-enable after", () => {
    const W = 100;
    const H = 100;
    const SCROLL_BAR_W = 16;
    const CONTENTS_SCALE: number = 2.0;
    const { scrollbar } = ScrollBarViewGenerator.generateScrollBarSet(
      W,
      H,
      SCROLL_BAR_W,
      CONTENTS_SCALE,
      "TestScrollBar_ScrollBarView",
    );

    const scrollTarget = scrollbar.contents.target;
    expect(scrollTarget.interactiveChildren).toBe(undefined);

    const controlButton = SliderViewTester.controlButton;
    controlButton(false, scrollTarget, 0, "pointerdown");
    controlButton(false, scrollTarget, -1, "pointermove");
    controlButton(false, scrollTarget, -1, "pointerup");
    expect(scrollTarget.interactiveChildren).toBe(false);

    scrollbar.inertialManager.stopInertial();
    expect(scrollTarget.interactiveChildren).toBe(undefined);
    scrollbar.dispose();
  });
});
