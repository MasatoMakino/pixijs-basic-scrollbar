# pixijs-basic-scrollbar

Scrollbar modules for pixi.js

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2bcf782a39a1150ad786/test_coverage)](https://codeclimate.com/github/MasatoMakino/pixijs-basic-scrollbar/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/2bcf782a39a1150ad786/maintainability)](https://codeclimate.com/github/MasatoMakino/pixijs-basic-scrollbar/maintainability)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=pixijs-basic-scrollbar&show_owner=true)](https://github.com/MasatoMakino/pixijs-basic-scrollbar)

## Demo

[Demo Page](https://masatomakino.github.io/pixijs-basic-scrollbar/demo/index.html)

## Getting Started

### Install

pixijs-basic-scrollbar depend on [pixi.js](https://github.com/pixijs/pixi.js) and [@tweenjs/tween.js](https://github.com/tweenjs/tween.js/)

```shell script
npm install pixi.js @tweenjs/tween.js --save-dev
```

and

```shell script
npm install @masatomakino/pixijs-basic-scrollbar.git --save-dev
```

### Import

pixijs-basic-scrollbar is composed of ES6 modules and TypeScript d.ts files.

At first, import classes.

```js
import { SliderView, SliderEventType } from "@masatomakino/pixijs-basic-scrollbar";
```

### Add to stage

```js
const slider = new SliderView({
  base: new Graphics(...),
  bar: new Graphics(...),
  button: new Graphics(...),
  mask: new Graphics(...),
  minPosition: 0,
  maxPosition: SLIDER_W,
  rate: 0.0
});

slider.on(SliderEventType.CHANGE, e => {
  console.log(e.rate);
});
stage.addChild(slider);
```

[API documents](https://masatomakino.github.io/pixijs-basic-scrollbar/api/)

### Option : Scroll bar and Tween

Tween.js needs update in rendering loop.

```js
PIXI.Ticker.shared.add((e) => {
  TWEEN.update(performance.now());
});
```
