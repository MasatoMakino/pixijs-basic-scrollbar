import { vi } from "vitest";
import { ScrollBarView } from "../src/index.js";
import { ScrollBarContentsGenerator } from "./ScrollBarContentsGenerator.js";
import { SliderOptionGenerator } from "./SliderOptionGenerator.js";

export class ScrollBarViewGenerator {
  public static generateScrollBarSet(
    w: number,
    h: number,
    scrollBarW: number,
    contentsScale: number,
    label?: string,
  ) {
    label ??= "name";

    const spyWarn = vi.spyOn(console, "warn").mockImplementation((x) => x);
    const sliderOption = SliderOptionGenerator.generateScrollBarOption(
      scrollBarW,
      h,
      { isHorizontal: false },
    );
    const scrollBarContents = ScrollBarContentsGenerator.generate(
      w,
      h,
      contentsScale,
    );
    const scrollbar = new ScrollBarView(sliderOption, scrollBarContents);
    scrollbar.label = label;
    const spyLog = vi.spyOn(console, "log").mockImplementation((x) => x);
    return {
      sliderOption,
      scrollBarContents,
      scrollbar,
      spyLog,
    };
  }
}
