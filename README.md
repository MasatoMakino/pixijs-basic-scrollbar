# pixijs-basic-scrollbar

Scrollbar modules for pixi.js

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CI](https://github.com/MasatoMakino/pixijs-basic-scrollbar/actions/workflows/ci_main.yml/badge.svg)](https://github.com/MasatoMakino/pixijs-basic-scrollbar/actions/workflows/ci_main.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2bcf782a39a1150ad786/test_coverage)](https://codeclimate.com/github/MasatoMakino/pixijs-basic-scrollbar/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/2bcf782a39a1150ad786/maintainability)](https://codeclimate.com/github/MasatoMakino/pixijs-basic-scrollbar/maintainability)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=pixijs-basic-scrollbar&show_owner=true)](https://github.com/MasatoMakino/pixijs-basic-scrollbar)

## Demo

[Demo Page](https://masatomakino.github.io/pixijs-basic-scrollbar/demo/index.html)

## Getting Started

### Install

```shell script
npm install @masatomakino/pixijs-basic-scrollbar --save-dev
```

pixijs-basic-scrollbar depend on [pixi.js](https://github.com/pixijs/pixi.js) and [@tweenjs/tween.js](https://github.com/tweenjs/tween.js/)

### Import

pixijs-basic-scrollbar is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { SliderView } from "@masatomakino/pixijs-basic-scrollbar";
```

### Add to stage

```js
const slider = new SliderView({
  base: new Graphics(...),
  bar: new Graphics(...),
  button: new Graphics(...),
  mask: new Graphics(...),
  minPosition: 0,
  maxPosition: 320, //slider width
  rate: 0.0,
  canvas : app.canvas // Option : global drag on canvas element
});

slider.on("slider_change", e => {
  console.log(e.rate);
});
stage.addChild(slider);
```

### Initialize ScrollBar with Contents

Initialize a scrollbar with scrollable contents:

```js
// Create parent container that will hold both contents and mask
const parentContainer = new Container();
stage.addChild(parentContainer);

// Create scroll contents
const scrollContents = new Container();
// Set hitArea for proper drag operation (Required)
scrollContents.hitArea = new Rectangle(0, 0, contentsWidth, contentsHeight);
// Add your content to scrollContents here

// Create mask
const contentsMask = new Graphics()
  .rect(0, 0, maskWidth, maskHeight)
  .fill(color);

// Create ScrollBarContents with:
// 1. Scroll contents
// 2. Mask
// 3. Parent container
const contents = new ScrollBarContents(
  scrollContents, // Scroll contents with hitArea
  contentsMask, // Mask
  parentContainer, // Parent container that holds both contents and mask
);

// Initialize ScrollBarView
const scrollbar = new ScrollBarView(
  {
    base: new Graphics()
      .rect(0, 0, scrollbarWidth, scrollbarHeight)
      .fill(color),
    button: new Graphics()
      .rect(-width / 2, -width / 2, width, width)
      .fill(color),
    minPosition: 0,
    maxPosition: scrollbarHeight,
    rate: 0.0,
    isHorizontal: false,
    canvas: app.canvas,
  },
  contents,
);

stage.addChild(scrollbar);
```

> **Note**: Setting hitArea for scroll contents is required. Without hitArea, drag operations will not work properly.

#### Set eventMode to "dynamic" for interactive objects in scroll contents

When adding interactive objects to scroll contents, set their `eventMode` property to "dynamic". This ensures that interactive events are properly handled.

```js
const button = new Graphics().rect(0, 0, 128, 48).fill(0x00ff00);
button.eventMode = "dynamic";
button.on("pointerdown", () => {
  console.log("Button clicked!");
});
scrollContents.addChild(button);
```

During scrolling, the ScrollBarContents automatically manages the interactivity of child objects to ensure smooth scrolling behavior. After the scroll operation is complete, the interactivity is restored to its original state.

For more details about event modes, see [PixiJS Interaction Guide](https://pixijs.com/8.x/guides/components/interaction).

[API documents](https://masatomakino.github.io/pixijs-basic-scrollbar/api/)

### remove from stage

```js
slider.dispose();
```

If you want to remove the slider, call the dispose method. SliderView has a reference to PixiJS's ticker, so it is necessary to call the dispose method to remove the reference.

### Option : global drag on canvas element

Since v7, pixi.js does not get pointer events where nothing is drawn. Give a canvas element as an argument so that dragging continues outside the slider.

```js
const slider = new SliderView(
  ...,
  canvas: app.canvas
});
```
