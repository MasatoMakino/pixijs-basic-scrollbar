import { ScrollBarContents } from "../src/scrollBar/ScrollBarContents";
import { ScrollBarContentsGenerator } from "./ScrollBarContentsGenerator";

describe("ScrollBarContents", function () {
  test("init", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);
    expect(contents.targetContents.mask).toBe(contents.contentsMask);
    expect(contents.targetContents.parent).toBe(contents.container);
    expect(contents.contentsMask.parent).toBe(contents.container);
  });

  test("init with parents", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);

    contents.container.addChild(contents.targetContents);
    contents.container.addChild(contents.contentsMask);

    expect(contents.targetContents.parent).toBe(contents.container);
    expect(contents.contentsMask.parent).toBe(contents.container);
  });

  test("init with mask", () => {
    const contents = ScrollBarContentsGenerator.generate(100, 100, 2.0);

    contents.targetContents.mask = contents.contentsMask;

    expect(contents.targetContents.parent).toBe(contents.container);
    expect(contents.contentsMask.parent).toBe(contents.container);
  });
});
