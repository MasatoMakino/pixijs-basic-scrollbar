import { describe, expect, test, vi } from "vitest";
import { ScrollBarContentsGenerator } from "./ScrollBarContentsGenerator.js";

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
});
