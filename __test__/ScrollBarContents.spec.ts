import { describe, expect, test, vi } from "vitest";
import { ScrollBarContentsGenerator } from "./ScrollBarContentsGenerator.js";
import { Container, Graphics, Rectangle } from "pixi.js";
import { ScrollBarContents } from "../src/index.js";

describe("ScrollBarContents", function () {
  test("init", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);
    expect(contents.target.mask).toBe(contents.mask);
    expect(contents.target.parent).toBe(contents.container);
    expect(contents.mask.parent).toBe(contents.container);
  });

  test("init with parents", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);

    contents.container.addChild(contents.target);
    contents.container.addChild(contents.mask);

    expect(contents.target.parent).toBe(contents.container);
    expect(contents.mask.parent).toBe(contents.container);
  });

  test("init with mask", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);

    contents.target.mask = contents.mask;

    expect(contents.target.parent).toBe(contents.container);
    expect(contents.mask.parent).toBe(contents.container);
  });

  test("init with custom hitArea", () => {
    const spyWarn = vi.spyOn(console, "warn").mockImplementation((x) => x);

    const getScrollBarContents = (color: number, w: number, h: number) => {
      const g = new Graphics().rect(0, 0, w, h).fill(color);
      g.hitArea = new Rectangle(0, 0, w, h);
      return g;
    };

    const contents = new ScrollBarContents(
      getScrollBarContents(0xff00ff, 100, 100),
      getScrollBarContents(0x0000ff, 100, 100),
      new Container(),
    );

    expect(spyWarn).toBeCalledWith(
      expect.stringContaining(
        "Setting a custom hit area on scrollbar contents can lead to a mismatch between the visual area and the interactive area",
      ),
    );
  });
});
