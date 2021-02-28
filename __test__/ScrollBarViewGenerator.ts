import { ScrollBarContentsGenerator } from "./ScrollBarContentsGenerator";
import { SliderOptionGenerator } from "./SliderOptionGenerator";
import { ScrollBarView } from "../src";

export class ScrollBarViewGenerator {
  public static generateScrollBarSet(
    w: number,
    h: number,
    scrollBarW: number,
    contentsScale: number,
    name?: string
  ) {
    name ??= "name";

    const sliderOption = SliderOptionGenerator.generateScrollBarOption(
      scrollBarW,
      h,
      { isHorizontal: false }
    );
    const scrollBarContents = ScrollBarContentsGenerator.generate(
      w,
      h,
      contentsScale
    );
    const scrollbar = new ScrollBarView(sliderOption, scrollBarContents);
    scrollbar.name = name;
    const spyLog = jest.spyOn(console, "log").mockImplementation((x) => x);
    return {
      sliderOption,
      scrollBarContents,
      scrollbar,
      spyLog,
    };
  }
}
