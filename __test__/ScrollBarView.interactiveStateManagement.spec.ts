import { ScrollBarViewGenerator } from "./ScrollBarViewGenerator.js";
import { vi, describe, it, expect } from "vitest";
import { DummyPointerEvent } from "./DummpyPointerEvent.js";

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

    DummyPointerEvent.emit(scrollTarget, "pointerup");
    expect(scrollTarget.interactiveChildren).toBe(undefined);
  });
});
