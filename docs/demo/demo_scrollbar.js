/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/demo_scrollbar.js":
/*!***********************************!*\
  !*** ./demoSrc/demo_scrollbar.js ***!
  \***********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tweenjs/tween.js */ \"./node_modules/@tweenjs/tween.js/dist/tween.esm.js\");\n/* harmony import */ var _src_scrollBar_ScrollBarContents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/scrollBar/ScrollBarContents */ \"./src/scrollBar/ScrollBarContents.ts\");\n\n\n\n\n\nconst onDomContentsLoaded = () => {\n  const app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({\n    width: 800,\n    height: 800\n  });\n  document.body.appendChild(app.view);\n  pixi_js__WEBPACK_IMPORTED_MODULE_0__.Ticker.shared.add(e => {\n    _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__.default.update(performance.now());\n  });\n  initScrollBar(app.stage);\n};\n/**\n * スクロールバーの実装サンプル\n * @param stage\n */\n\n\nconst initScrollBar = stage => {\n  const SCROLLBAR_W = 16;\n  const SCROLLBAR_H = 360;\n  const SCROLLBAR_Y = 120;\n  const CONTENTS_W = 240;\n  const container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();\n  stage.addChild(container);\n  container.x = 32;\n  container.y = SCROLLBAR_Y;\n  const contents = getScrollBarOption(CONTENTS_W, SCROLLBAR_H, container);\n  const scrollbar = new _lib__WEBPACK_IMPORTED_MODULE_1__.ScrollBarView({\n    base: getScrollBarBase(SCROLLBAR_W, SCROLLBAR_H, 0x0000ff),\n    button: getScrollBarButton(SCROLLBAR_W, 0xffff00),\n    minPosition: 0,\n    maxPosition: SCROLLBAR_H,\n    rate: 35.0,\n    isHorizontal: false\n  }, contents);\n  stage.addChild(scrollbar);\n  scrollbar.x = container.x + CONTENTS_W;\n  scrollbar.y = SCROLLBAR_Y;\n  scrollbar.on(_lib__WEBPACK_IMPORTED_MODULE_1__.SliderEventType.CHANGE, e => {\n    console.log(e);\n  });\n  /**\n   * スクロール動作を確認するために、故意にマスクを外しています。\n   */\n\n  contents.target.mask = null;\n};\n\nconst getScrollBarBase = (w, h, color) => {\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\n  g.beginFill(color);\n  g.drawRect(0, 0, w, h);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Rectangle(0, 0, w, h);\n  return g;\n};\n\nconst getScrollBarButton = (width, color) => {\n  const ratio = 0.5;\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\n  g.beginFill(color);\n  g.drawRect(-width / 2, -width * ratio, width, width);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Rectangle(-width / 2, -width * ratio, width, width);\n  g.x = width / 2;\n  return g;\n};\n\nconst getScrollBarContents = (color, w, h, container, alpha = 1.0) => {\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\n  g.beginFill(color, alpha);\n  g.drawRect(0, 0, w, h);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Rectangle(0, 0, w, h);\n  container.addChild(g);\n  return g;\n};\n\nconst getScrollBarOption = (contentsW, scrollBarH, container) => {\n  const targetContents = getScrollBarContents(0xff00ff, contentsW, scrollBarH * 2, container);\n  const contentsMask = getScrollBarContents(0x0000ff, contentsW, scrollBarH, container, 0.3);\n  return new _src_scrollBar_ScrollBarContents__WEBPACK_IMPORTED_MODULE_3__.ScrollBarContents(targetContents, contentsMask, container);\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./demoSrc/demo_scrollbar.js?");

/***/ }),

/***/ "./lib/MouseWheelPlugin.js":
/*!*********************************!*\
  !*** ./lib/MouseWheelPlugin.js ***!
  \*********************************/
/*! flagged exports */
/*! export MouseWheelPluginEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export initPlugin [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * based on https://github.com/Mwni/pixi-mousewheel\n */\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.initPlugin = exports.MouseWheelPluginEventType = void 0;\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar MouseWheelPluginEventType;\n\n(function (MouseWheelPluginEventType) {\n  MouseWheelPluginEventType[\"WHEEL\"] = \"wheel\";\n})(MouseWheelPluginEventType = exports.MouseWheelPluginEventType || (exports.MouseWheelPluginEventType = {}));\n\nvar MousewheelPlugin =\n/** @class */\nfunction () {\n  function MousewheelPlugin(app) {\n    var _this = this;\n\n    this.eventHandler = function (e) {\n      _this.onMouseWheel(e);\n    };\n\n    this.app = app;\n    this.app.view.addEventListener(\"wheel\", this.eventHandler, {\n      passive: false\n    });\n  }\n\n  MousewheelPlugin.prototype.onMouseWheel = function (e) {\n    var target = this.findScrollTarget({\n      x: e.offsetX,\n      y: e.offsetY\n    });\n    if (!target) return;\n    e.preventDefault();\n    target.emit(MouseWheelPluginEventType.WHEEL, e);\n  };\n\n  MousewheelPlugin.prototype.findScrollTarget = function (pos) {\n    var hit = this.app.renderer.plugins.interaction.hitTest(pos);\n\n    if (hit && hit[\"interactiveMousewheel\"]) {\n      return hit;\n    }\n  };\n\n  MousewheelPlugin.prototype.destroy = function () {\n    this.app.view.removeEventListener(\"wheel\", this.eventHandler);\n  };\n\n  return MousewheelPlugin;\n}();\n\nfunction initPlugin() {\n  Object.defineProperty(pixi_js_1.DisplayObject.prototype, \"interactiveMousewheel\", {\n    get: function () {\n      return this._interactiveMousewheel;\n    },\n    set: function (enabled) {\n      this._interactiveMousewheel = enabled;\n\n      if (enabled && !this.interactive) {\n        this.interactive = true;\n      }\n    }\n  });\n  pixi_js_1.Application.registerPlugin({\n    init: function (options) {\n      this._mousewheelPlugin = new MousewheelPlugin(this);\n    },\n    destroy: function () {\n      this._mousewheelPlugin.destroy();\n    }\n  });\n}\n\nexports.initPlugin = initPlugin;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/MouseWheelPlugin.js?");

/***/ }),

/***/ "./lib/SliderEvent.js":
/*!****************************!*\
  !*** ./lib/SliderEvent.js ***!
  \****************************/
/*! flagged exports */
/*! export SliderEventContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SliderEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.SliderEventType = exports.SliderEventContext = void 0;\n/**\n * スライダーが移動した際に発行されるイベントです。\n * 現状のスライダー位置を報告します。\n */\n\nvar SliderEventContext =\n/** @class */\nfunction () {\n  function SliderEventContext(rate) {\n    this.rate = rate;\n  }\n\n  return SliderEventContext;\n}();\n\nexports.SliderEventContext = SliderEventContext;\nvar SliderEventType;\n\n(function (SliderEventType) {\n  SliderEventType[\"CHANGE\"] = \"event_slider_change\";\n  SliderEventType[\"CHANGE_FINISH\"] = \"event_slider_change_finish\";\n})(SliderEventType = exports.SliderEventType || (exports.SliderEventType = {}));\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/SliderEvent.js?");

/***/ }),

/***/ "./lib/SliderView.js":
/*!***************************!*\
  !*** ./lib/SliderView.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:16-20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.SliderViewUtil = exports.SliderView = void 0;\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar SliderEvent_1 = __webpack_require__(/*! ./SliderEvent */ \"./lib/SliderEvent.js\");\n\nvar SliderViewOption_1 = __webpack_require__(/*! ./SliderViewOption */ \"./lib/SliderViewOption.js\");\n/**\n * スライダー用クラスです\n *\n * 使用上の注意 :\n * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。\n * hitAreaでサイズをあらかじめ与えてください。\n */\n\n\nvar SliderView =\n/** @class */\nfunction (_super) {\n  __extends(SliderView, _super);\n  /**\n   * @param {SliderViewOption} option\n   */\n\n\n  function SliderView(option) {\n    var _this = _super.call(this) || this;\n\n    _this._isHorizontal = true;\n    _this.dragStartPos = new pixi_js_1.Point();\n    _this.isDragging = false; // 現在スライド中か否か\n\n    /**\n     * スライダーのドラッグを開始する\n     * @param {Object} e\n     */\n\n    _this.startMove = function (e) {\n      _this.onPressedSliderButton(e);\n    };\n    /**\n     * スライダーのドラッグ中の処理\n     * @param e\n     */\n\n\n    _this.moveSlider = function (e) {\n      var evt = e;\n\n      var mousePos = _this.limitSliderButtonPosition(evt);\n\n      _this.updateParts(mousePos);\n\n      _this._rate = _this.convertPixelToRate(mousePos);\n\n      _this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(_this.rate));\n    };\n    /**\n     * スライダーのドラッグ終了時の処理\n     * @param\te\n     */\n\n\n    _this.moveSliderFinish = function (e) {\n      _this.isDragging = false;\n\n      _this._slideButton.off(\"pointermove\", _this.moveSlider);\n\n      _this._slideButton.off(\"pointerup\", _this.moveSliderFinish);\n\n      _this._slideButton.off(\"pointerupoutside\", _this.moveSliderFinish);\n\n      _this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(_this.rate));\n    };\n    /**\n     * このインスタンスを破棄する。\n     * @param\te\n     */\n\n\n    _this.dispose = function (e) {\n      _this.onDisposeFunction(e);\n    };\n\n    _this.init(option);\n\n    _this.interactive = true;\n    return _this;\n  }\n\n  Object.defineProperty(SliderView.prototype, \"isHorizontal\", {\n    get: function () {\n      return this._isHorizontal;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * 初期化処理\n   * @param {SliderViewOption} option\n   */\n\n  SliderView.prototype.init = function (option) {\n    option = SliderViewOption_1.SliderViewOption.init(option);\n    this.base = option.base;\n    this._bar = this.initBarAndMask(option.bar);\n    this.slideButton = option.button;\n    this._barMask = this.initBarAndMask(option.mask);\n    if (this._bar && this._barMask) this._bar.mask = this._barMask;\n    this._minPosition = option.minPosition;\n    this._maxPosition = option.maxPosition;\n    this._isHorizontal = option.isHorizontal;\n    this._rate = option.rate;\n    this.changeRate(this._rate);\n  };\n\n  SliderView.prototype.addChildParts = function (obj) {\n    var _a;\n\n    if (!obj) return;\n    (_a = obj.parent) === null || _a === void 0 ? void 0 : _a.removeChild(obj);\n    this.addChild(obj);\n  };\n  /**\n   * スライダーの位置を変更する\n   * @param\trate\tスライダーの位置 MIN 0.0 ~ MAX 100.0\n   */\n\n\n  SliderView.prototype.changeRate = function (rate) {\n    //ドラッグ中は外部からの操作を無視する。\n    if (this.isDragging) return;\n    this._rate = rate;\n    var pos = this.convertRateToPixel(this._rate);\n    this.updateParts(pos);\n    this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(this.rate));\n  };\n\n  SliderView.prototype.onPressedSliderButton = function (e) {\n    this.isDragging = true;\n    var target = e.currentTarget;\n    var localPos = this.toLocal(e.data.global);\n    this.dragStartPos = new pixi_js_1.Point(localPos.x - target.x, localPos.y - target.y);\n\n    this._slideButton.on(\"pointermove\", this.moveSlider);\n\n    this._slideButton.on(\"pointerup\", this.moveSliderFinish);\n\n    this._slideButton.on(\"pointerupoutside\", this.moveSliderFinish);\n  };\n  /**\n   * スライダーボタンの位置を制限する関数\n   * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。\n   */\n\n\n  SliderView.prototype.limitSliderButtonPosition = function (evt) {\n    var mousePos = this.getMousePosition(this, evt);\n    return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);\n  };\n  /**\n   * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する\n   * moveSliderの内部処理\n   * @param\tmousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。\n   */\n\n\n  SliderView.prototype.updateParts = function (mousePos) {\n    var _this = this;\n\n    var stretch = function (target) {\n      SliderViewUtil.setSize(target, _this._isHorizontal, mousePos - SliderViewUtil.getPosition(target, _this._isHorizontal));\n    }; //バーマスクがなければ、バー自体を伸縮する\n\n\n    if (this._bar && !this._barMask) {\n      stretch(this._bar);\n    } //バーマスクがあれば、マスクを伸縮する。\n\n\n    if (this._barMask) {\n      stretch(this._barMask);\n    } //ボタンの位置を更新する。\n\n\n    SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);\n  };\n  /**\n   * スライダーの地をクリックした際の処理\n   * その位置までスライダーをジャンプする\n   * @param evt\n   */\n\n\n  SliderView.prototype.onPressBase = function (evt) {\n    this.dragStartPos = new pixi_js_1.Point();\n    this.moveSlider(evt);\n    this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(this.rate));\n  };\n  /**\n   * スライダーの割合から、スライダーの位置を取得する\n   * @param\trate\n   * @return\n   */\n\n\n  SliderView.prototype.convertRateToPixel = function (rate) {\n    return SliderViewUtil.convertRateToPixel(rate, this._maxPosition, this._minPosition);\n  };\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   * @param\tpixel\n   * @return\n   */\n\n\n  SliderView.prototype.convertPixelToRate = function (pixel) {\n    return SliderViewUtil.convertPixelToRate(pixel, this._maxPosition, this._minPosition);\n  };\n  /**\n   * ドラッグ中のマウス座標を取得する。\n   * limitSliderButtonPosition内の処理。\n   */\n\n\n  SliderView.prototype.getMousePosition = function (displayObj, evt) {\n    var localPos = displayObj.toLocal(evt.data.global);\n\n    if (this._isHorizontal) {\n      return localPos.x - this.dragStartPos.x;\n    } else {\n      return localPos.y - this.dragStartPos.y;\n    }\n  };\n\n  Object.defineProperty(SliderView.prototype, \"base\", {\n    set: function (value) {\n      var _this = this;\n\n      this._base = value;\n      this._base.interactive = true;\n\n      this._base.on(\"pointertap\", function (e) {\n        _this.onPressBase(e);\n      });\n\n      this.addChildParts(value);\n    },\n    enumerable: false,\n    configurable: true\n  });\n\n  SliderView.prototype.initBarAndMask = function (value) {\n    if (value == null) return;\n    value.interactive = false;\n    this.addChildParts(value);\n    return value;\n  };\n\n  Object.defineProperty(SliderView.prototype, \"slideButton\", {\n    set: function (value) {\n      this._slideButton = value;\n\n      this._slideButton.on(\"pointerdown\", this.startMove);\n\n      this._slideButton.interactive = true;\n      this.addChildParts(value);\n    },\n    enumerable: false,\n    configurable: true\n  });\n  Object.defineProperty(SliderView.prototype, \"rate\", {\n    get: function () {\n      return this._rate;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * 全てのDisplayObjectとEventListenerを解除する。\n   * @param {Event} e\n   */\n\n  SliderView.prototype.onDisposeFunction = function (e) {\n    this.removeAllListeners();\n\n    this._base.removeAllListeners();\n\n    this._slideButton.removeAllListeners();\n\n    this.removeChildren();\n  };\n\n  SliderView.MAX_RATE = 1.0;\n  return SliderView;\n}(pixi_js_1.Container);\n\nexports.SliderView = SliderView;\n\nvar SliderViewUtil =\n/** @class */\nfunction () {\n  function SliderViewUtil() {}\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   */\n\n\n  SliderViewUtil.convertPixelToRate = function (pixel, max, min) {\n    var rate = (pixel - min) / (max - min) * SliderView.MAX_RATE;\n    return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);\n  };\n\n  SliderViewUtil.convertRateToPixel = function (rate, max, min) {\n    var pix = (max - min) * rate / SliderView.MAX_RATE + min;\n    return SliderViewUtil.clamp(pix, max, min);\n  };\n  /**\n   * ディスプレイオブジェクトからスクロール方向の座標値を取り出す\n   * @return displayObjの座標値。単位ピクセル\n   */\n\n\n  SliderViewUtil.getPosition = function (displayObj, isHorizontal) {\n    if (isHorizontal) {\n      return displayObj.x;\n    } else {\n      return displayObj.y;\n    }\n  };\n  /**\n   * ディスプレイオブジェクトにスクロール方向の座標値を設定する\n   */\n\n\n  SliderViewUtil.setPosition = function (displayObj, isHorizontal, position) {\n    if (!displayObj) return;\n\n    if (isHorizontal) {\n      displayObj.x = position;\n    } else {\n      displayObj.y = position;\n    }\n  };\n  /**\n   * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル\n   */\n\n\n  SliderViewUtil.getSize = function (displayObj, isHorizontal) {\n    var size = displayObj.getLocalBounds();\n\n    if (isHorizontal) {\n      return size.width * displayObj.scale.x;\n    } else {\n      return size.height * displayObj.scale.y;\n    }\n  };\n  /**\n   * スクロール方向の高さ、もしくは幅を設定する。\n   * @param displayObj\n   * @param isHorizontal\n   * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px\n   */\n\n\n  SliderViewUtil.setSize = function (displayObj, isHorizontal, amount) {\n    var size = displayObj.getLocalBounds();\n\n    if (isHorizontal) {\n      displayObj.scale.x = amount / size.width;\n    } else {\n      displayObj.scale.y = amount / size.height;\n    }\n  };\n\n  SliderViewUtil.clamp = function (num, max, min) {\n    num = Math.max(num, min);\n    num = Math.min(num, max);\n    return num;\n  };\n\n  return SliderViewUtil;\n}();\n\nexports.SliderViewUtil = SliderViewUtil;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/SliderView.js?");

/***/ }),

/***/ "./lib/SliderViewOption.js":
/*!*********************************!*\
  !*** ./lib/SliderViewOption.js ***!
  \*********************************/
/*! flagged exports */
/*! export SliderViewOption [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.SliderViewOption = void 0;\n/**\n * スライダーを初期化する際のオプション\n */\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ./SliderView */ \"./lib/SliderView.js\");\n\nvar SliderViewOption =\n/** @class */\nfunction () {\n  function SliderViewOption() {}\n\n  SliderViewOption.init = function (option) {\n    var _a, _b, _c;\n\n    if (option.rate != null) {\n      option.rate = Math.max(0, option.rate);\n      option.rate = Math.min(SliderView_1.SliderView.MAX_RATE, option.rate);\n    }\n\n    (_a = option.minPosition) !== null && _a !== void 0 ? _a : option.minPosition = 0.0;\n    (_b = option.rate) !== null && _b !== void 0 ? _b : option.rate = 0.0;\n    (_c = option.isHorizontal) !== null && _c !== void 0 ? _c : option.isHorizontal = true;\n    this.check(option);\n    return option;\n  };\n\n  SliderViewOption.check = function (option) {\n    this.checkParts(option.base, \"base\");\n    this.checkParts(option.button, \"button\");\n    this.checkParts(option.mask, \"mask\");\n    this.checkParts(option.bar, \"bar\");\n  };\n\n  SliderViewOption.checkParts = function (obj, targetName) {\n    if (obj == null) return;\n    var bounds = obj.getLocalBounds();\n\n    if (bounds.width === 0 && bounds.height === 0 && bounds.type === pixi_js_1.SHAPES.RECT) {\n      throw new Error(\"SliderView : \" + targetName + \" \\u521D\\u671F\\u5316\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3\\u3067\\u6307\\u5B9A\\u3055\\u308C\\u305FDisplayObject\\u306B\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u304C\\u5B58\\u5728\\u3057\\u307E\\u305B\\u3093\\u3002Container\\u3092\\u5229\\u7528\\u3059\\u308B\\u5834\\u5408\\u306FhitArea\\u3092\\u5229\\u7528\\u3057\\u3066\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u3092\\u624B\\u52D5\\u3067\\u8A2D\\u5B9A\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\");\n    }\n\n    if (obj.parent) {\n      console.warn(\"\\u521D\\u671F\\u5316\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3\\u3067\\u6307\\u5B9A\\u3055\\u308C\\u305F\\u30D1\\u30FC\\u30C4\\u304C\\u3059\\u3067\\u306B\\u5225\\u306E\\u89AA\\u306BaddChild\\u3055\\u308C\\u3066\\u3044\\u307E\\u3059\\u3002SliderView\\u304A\\u3088\\u3073ScrollBarView\\u306E\\u69CB\\u6210\\u30D1\\u30FC\\u30C4\\u306F\\u540C\\u4E00\\u306E\\u30B3\\u30F3\\u30C6\\u30CA\\u306BaddChild\\u3055\\u308C\\u308B\\u3053\\u3068\\u3092\\u524D\\u63D0\\u3068\\u3057\\u3066\\u3044\\u307E\\u3059\\u3002\");\n    }\n  };\n\n  return SliderViewOption;\n}();\n\nexports.SliderViewOption = SliderViewOption;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/SliderViewOption.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:22-26 */
/*! CommonJS bailout: this is used directly at 16:19-23 */
/*! CommonJS bailout: exports is used directly at 24:39-46 */
/*! CommonJS bailout: exports is used directly at 26:38-45 */
/*! CommonJS bailout: exports is used directly at 28:51-58 */
/*! CommonJS bailout: exports is used directly at 30:44-51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n__exportStar(__webpack_require__(/*! ./SliderEvent */ \"./lib/SliderEvent.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SliderView */ \"./lib/SliderView.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./scrollBar/ScrollBarView */ \"./lib/scrollBar/ScrollBarView.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SliderViewOption */ \"./lib/SliderViewOption.js\"), exports);\n\nvar MouseWheelPlugin_1 = __webpack_require__(/*! ./MouseWheelPlugin */ \"./lib/MouseWheelPlugin.js\");\n\nMouseWheelPlugin_1.initPlugin();\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/index.js?");

/***/ }),

/***/ "./lib/scrollBar/InertialScrollManager.js":
/*!************************************************!*\
  !*** ./lib/scrollBar/InertialScrollManager.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:16-20 */
/*! CommonJS bailout: this is used directly at 27:22-26 */
/*! CommonJS bailout: this is used directly at 40:25-29 */
/*! CommonJS bailout: this is used directly at 49:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, \"default\", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o[\"default\"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.InertialScrollManager = void 0;\n\nvar tween_js_1 = __webpack_require__(/*! @tweenjs/tween.js */ \"./node_modules/@tweenjs/tween.js/dist/tween.esm.js\");\n\nvar PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\"));\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n\nvar ScrollBarViewUtil_1 = __webpack_require__(/*! ./ScrollBarViewUtil */ \"./lib/scrollBar/ScrollBarViewUtil.js\");\n/**\n * スクロールバーエリアの慣性スクロールを処理するクラス。\n */\n\n\nvar InertialScrollManager =\n/** @class */\nfunction (_super) {\n  __extends(InertialScrollManager, _super);\n\n  function InertialScrollManager(scrollBarView) {\n    var _this = _super.call(this) || this;\n\n    _this.decelerationRate = 0.975;\n    _this.overflowScrollRange = 180;\n    _this._speed = 0.0;\n    _this.isDragging = false;\n\n    _this.onMouseDown = function (e) {\n      _this.updateDragPos(e);\n\n      _this.isDragging = true;\n      _this._speed = 0.0;\n      if (_this.tween) _this.tween.stop();\n\n      _this.addDragListener();\n    };\n\n    _this.onMouseMove = function (e) {\n      var delta = _this.getDragPos(e) - _this.dragPos;\n\n      _this._speed = delta;\n\n      _this.addTargetPosition(delta * _this.getOverflowDeceleration());\n\n      _this.updateDragPos(e);\n    };\n\n    _this.onMouseUp = function (e) {\n      _this.removeDragListener();\n\n      _this.isDragging = false;\n\n      _this.onTick();\n    };\n\n    _this.onTick = function () {\n      var _a;\n\n      if (_this.isDragging) return;\n      if (_this._speed === 0.0 && _this.getLeaveRangeFromMask() === 0.0) return;\n      if ((_a = _this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying()) return; //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。\n\n      var overflowDeceleration = _this.getOverflowDeceleration();\n\n      _this._speed *= _this.decelerationRate * overflowDeceleration;\n\n      _this.addTargetPosition(_this._speed);\n\n      if (Math.abs(_this._speed) > 0.1) return; //back ease\n\n      _this._speed = 0.0;\n      var toObj = {\n        y: _this.getClampedPos()\n      };\n      _this.tween = new tween_js_1.Tween(_this.scrollBarView.contents.target).to(toObj, 666).onUpdate(function () {\n        _this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n      }).easing(tween_js_1.Easing.Cubic.Out).start();\n    };\n\n    _this.stopInertial = function () {\n      _this._speed = 0.0;\n      if (_this.tween) _this.tween.stop();\n    };\n\n    _this.scrollBarView = scrollBarView;\n    scrollBarView.on(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN, _this.stopInertial);\n    var target = _this.scrollBarView.contents.target;\n    target.interactive = true;\n\n    _this.start();\n\n    return _this;\n  }\n\n  Object.defineProperty(InertialScrollManager.prototype, \"speed\", {\n    get: function () {\n      return this._speed;\n    },\n    enumerable: false,\n    configurable: true\n  });\n\n  InertialScrollManager.prototype.start = function () {\n    if (this._isStart) return;\n    this._isStart = true;\n    var target = this.scrollBarView.contents.target;\n    target.on(\"pointerdown\", this.onMouseDown);\n    pixi_js_1.Ticker.shared.add(this.onTick);\n  };\n\n  InertialScrollManager.prototype.stop = function () {\n    if (!this._isStart) return;\n    this._isStart = false;\n    var target = this.scrollBarView.contents.target;\n    target.off(\"pointerdown\", this.onMouseDown);\n    this.removeDragListener();\n    this.stopInertial();\n    pixi_js_1.Ticker.shared.remove(this.onTick);\n  };\n\n  InertialScrollManager.prototype.addDragListener = function () {\n    this.switchDragListener(true);\n  };\n\n  InertialScrollManager.prototype.removeDragListener = function () {\n    this.switchDragListener(false);\n  };\n\n  InertialScrollManager.prototype.switchDragListener = function (isOn) {\n    var target = this.scrollBarView.contents.target;\n\n    var switchListener = function (isOn, event, listener) {\n      if (isOn) {\n        target.on(event, listener);\n      } else {\n        target.off(event, listener);\n      }\n    };\n\n    switchListener(isOn, \"pointermove\", this.onMouseMove);\n    switchListener(isOn, \"pointerup\", this.onMouseUp);\n    switchListener(isOn, \"pointerupoutside\", this.onMouseUp);\n  };\n\n  InertialScrollManager.prototype.getDragPos = function (e) {\n    return SliderView_1.SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);\n  };\n\n  InertialScrollManager.prototype.updateDragPos = function (e) {\n    this.dragPos = this.getDragPos(e);\n  };\n\n  InertialScrollManager.prototype.addTargetPosition = function (delta) {\n    var target = this.scrollBarView.contents.target;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);\n    SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n  };\n  /**\n   * スクロールのオーバーフロー量から、減退率を割り出す。\n   * overflowScrollRange以上に離れている場合は0.0\n   * スクロールエリア内にコンテンツがある場合は1.0を返す。\n   */\n\n\n  InertialScrollManager.prototype.getOverflowDeceleration = function () {\n    var difPos = this.getLeaveRangeFromMask();\n    var overflowDeceleration = (this.overflowScrollRange - difPos) / this.overflowScrollRange;\n    if (overflowDeceleration < 0.0) overflowDeceleration = 0.0;\n    return overflowDeceleration;\n  };\n  /**\n   * ターゲットコンテンツがマスク領域からどれだけ離れているか。\n   */\n\n\n  InertialScrollManager.prototype.getLeaveRangeFromMask = function () {\n    var target = this.scrollBarView.contents.target;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);\n    var clampedPos = this.getClampedPos();\n    return Math.abs(currentPos - clampedPos);\n  };\n\n  InertialScrollManager.prototype.getClampedPos = function () {\n    var target = this.scrollBarView.contents.target;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    return ScrollBarViewUtil_1.ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contents.mask, isHorizontal);\n  };\n\n  return InertialScrollManager;\n}(PIXI.utils.EventEmitter);\n\nexports.InertialScrollManager = InertialScrollManager;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/InertialScrollManager.js?");

/***/ }),

/***/ "./lib/scrollBar/MouseWheelScrollManager.js":
/*!**************************************************!*\
  !*** ./lib/scrollBar/MouseWheelScrollManager.js ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:16-20 */
/*! CommonJS bailout: this is used directly at 27:22-26 */
/*! CommonJS bailout: this is used directly at 40:25-29 */
/*! CommonJS bailout: this is used directly at 49:19-23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, \"default\", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o[\"default\"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.MouseWheelScrollManager = void 0;\n\nvar PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\"));\n\nvar MouseWheelPlugin_1 = __webpack_require__(/*! ../MouseWheelPlugin */ \"./lib/MouseWheelPlugin.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n\nvar ScrollBarViewUtil_1 = __webpack_require__(/*! ./ScrollBarViewUtil */ \"./lib/scrollBar/ScrollBarViewUtil.js\");\n/**\n * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス\n */\n\n\nvar MouseWheelScrollManager =\n/** @class */\nfunction (_super) {\n  __extends(MouseWheelScrollManager, _super);\n\n  function MouseWheelScrollManager(scrollBarView) {\n    var _this = _super.call(this) || this;\n\n    _this.delta = 16; //TODO add support deltaX / deltaY\n\n    _this.wheelHandler = function (e) {\n      var shift = e.deltaY > 0 ? -_this.delta : _this.delta;\n\n      _this.scroll(shift);\n    };\n\n    _this.scrollBarView = scrollBarView;\n    var target = _this.scrollBarView.contents.target;\n    target.interactive = true;\n    target.interactiveMousewheel = true;\n\n    _this.start();\n\n    return _this;\n  }\n\n  MouseWheelScrollManager.prototype.start = function () {\n    if (this._isStart) return;\n    var target = this.scrollBarView.contents.target;\n    target.on(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);\n    this._isStart = true;\n  };\n\n  MouseWheelScrollManager.prototype.stop = function () {\n    var target = this.scrollBarView.contents.target;\n    target.off(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);\n    this._isStart = false;\n  };\n\n  MouseWheelScrollManager.prototype.scroll = function (delta) {\n    var target = this.scrollBarView.contents.target;\n    var mask = this.scrollBarView.contents.mask;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal) + delta;\n    ScrollBarViewUtil_1.ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n    this.scrollBarView.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  return MouseWheelScrollManager;\n}(PIXI.utils.EventEmitter);\n\nexports.MouseWheelScrollManager = MouseWheelScrollManager;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/MouseWheelScrollManager.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarContentsEventType.js":
/*!*****************************************************!*\
  !*** ./lib/scrollBar/ScrollBarContentsEventType.js ***!
  \*****************************************************/
/*! flagged exports */
/*! export ScrollBarContentsEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.ScrollBarContentsEventType = void 0;\nvar ScrollBarContentsEventType;\n\n(function (ScrollBarContentsEventType) {\n  ScrollBarContentsEventType[\"CHANGED_CONTENTS_SIZE\"] = \"ScrollBarContentsEventType_CHANGED_CONTENTS_SIZE\";\n})(ScrollBarContentsEventType = exports.ScrollBarContentsEventType || (exports.ScrollBarContentsEventType = {}));\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/ScrollBarContentsEventType.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarEvent.js":
/*!*****************************************!*\
  !*** ./lib/scrollBar/ScrollBarEvent.js ***!
  \*****************************************/
/*! flagged exports */
/*! export ScrollBarEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.ScrollBarEventType = void 0;\nvar ScrollBarEventType;\n\n(function (ScrollBarEventType) {\n  ScrollBarEventType[\"UPDATE_TARGET_POSITION\"] = \"ScrollBarEventType_UPDATE_TARGET_POSITION\";\n  ScrollBarEventType[\"STOP_INERTIAL_TWEEN\"] = \"ScrollBarEventType_STOP_INERTIAL_TWEEN\";\n})(ScrollBarEventType = exports.ScrollBarEventType || (exports.ScrollBarEventType = {}));\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/ScrollBarEvent.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarView.js":
/*!****************************************!*\
  !*** ./lib/scrollBar/ScrollBarView.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 3:16-20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.ScrollBarView = void 0;\n\nvar ScrollBarViewUtil_1 = __webpack_require__(/*! ./ScrollBarViewUtil */ \"./lib/scrollBar/ScrollBarViewUtil.js\");\n\nvar SliderEvent_1 = __webpack_require__(/*! ../SliderEvent */ \"./lib/SliderEvent.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar InertialScrollManager_1 = __webpack_require__(/*! ./InertialScrollManager */ \"./lib/scrollBar/InertialScrollManager.js\");\n\nvar MouseWheelScrollManager_1 = __webpack_require__(/*! ./MouseWheelScrollManager */ \"./lib/scrollBar/MouseWheelScrollManager.js\");\n\nvar ScrollBarContentsEventType_1 = __webpack_require__(/*! ./ScrollBarContentsEventType */ \"./lib/scrollBar/ScrollBarContentsEventType.js\");\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n/**\n * スクロールバーを表すクラスです。\n *\n * このクラスは、スライダーに以下の機能を追加したものです。\n *\n * \t\t1.コンテンツサイズに合わせた、スクロールバーの伸縮\n * \t\t2.スクロールバーの伸縮にあわせた、移動範囲の制限\n * \t\t3.スクロールバーの伸縮にあわせた、移動値の取得\n */\n\n\nvar ScrollBarView =\n/** @class */\nfunction (_super) {\n  __extends(ScrollBarView, _super);\n\n  function ScrollBarView(option, scrollContents) {\n    var _this = _super.call(this, option) || this;\n\n    _this._autoHide = false;\n    /**\n     * スライダーイベントに応じてコンテンツをスクロールする\n     * @param {Object} e\n     */\n\n    _this.updateContentsPosition = function (e) {\n      var evt = e;\n\n      _this.updateContentsPositionWithRate(evt.rate);\n    };\n\n    _this._contents = scrollContents;\n\n    _this._contents.on(ScrollBarContentsEventType_1.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE, _this.updateSlider);\n\n    _this.on(SliderEvent_1.SliderEventType.CHANGE, _this.updateContentsPosition);\n\n    _this.changeRate(option.rate);\n\n    _this.wheelManager = new MouseWheelScrollManager_1.MouseWheelScrollManager(_this);\n\n    _this.wheelManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {\n      _this.updateSliderPosition();\n    });\n\n    _this.inertialManager = new InertialScrollManager_1.InertialScrollManager(_this);\n\n    _this.inertialManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {\n      _this.updateSliderPosition();\n    });\n\n    return _this;\n  }\n\n  Object.defineProperty(ScrollBarView.prototype, \"contents\", {\n    get: function () {\n      return this._contents;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  Object.defineProperty(ScrollBarView.prototype, \"autoHide\", {\n    get: function () {\n      return this._autoHide;\n    },\n    set: function (value) {\n      this._autoHide = value;\n      this.updateSliderVisible();\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * スライダーボタンの位置を制限する関数\n   * @return 制限で切り落とされたスライダーボタンの座標値\n   */\n\n  ScrollBarView.prototype.limitSliderButtonPosition = function (evt) {\n    var mousePos = this.getMousePosition(this, evt);\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_1.SliderViewUtil.clamp(mousePos, range.max, range.min);\n  };\n  /**\n   * スライダーの割合から、スライダーの位置を取得する\n   * @param\trate\n   * @return\n   */\n\n\n  ScrollBarView.prototype.convertRateToPixel = function (rate) {\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_1.SliderViewUtil.convertRateToPixel(rate, range.max, range.min);\n  };\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   * @param\tpixel\n   * @return\n   */\n\n\n  ScrollBarView.prototype.convertPixelToRate = function (pixel) {\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_1.SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);\n  };\n  /**\n   * スライダーボタンの可動範囲を取得する。単位ピクセル\n   */\n\n\n  ScrollBarView.prototype.getRangeOfSliderButtonPosition = function () {\n    var buttonSize = this.slideButtonSize;\n    var ratio = ScrollBarViewUtil_1.ScrollBarViewUtil.getRatioOfOrigin(this._slideButton, this.isHorizontal);\n    var max = this._maxPosition - (1.0 + ratio) * buttonSize;\n    var min = this._minPosition - ratio * buttonSize;\n    return {\n      max: max,\n      min: min\n    };\n  };\n\n  Object.defineProperty(ScrollBarView.prototype, \"slideButtonSize\", {\n    /**\n     * スライダーボタンのサイズ。\n     * @returns {number}\n     */\n    get: function () {\n      this.updateSliderSize();\n      return SliderView_1.SliderViewUtil.getSize(this._slideButton, this.isHorizontal);\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * スクロールバーのボタンサイズ及び位置を更新する。\n   * コンテンツサイズが変更された場合の更新にも利用する。\n   */\n\n  ScrollBarView.prototype.updateSlider = function () {\n    if (!this.isUpdatableSliderSize()) return;\n    this.updateSliderSize();\n    this.updateSliderPosition();\n  };\n  /**\n   * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。\n   * その割合でスライダーの位置を更新する。\n   */\n\n\n  ScrollBarView.prototype.updateSliderPosition = function () {\n    var rate = this.contents.getScrollPositionAsRate(this.isHorizontal);\n    this.changeRate(rate);\n  };\n\n  ScrollBarView.prototype.isUpdatableSliderSize = function () {\n    var _a, _b;\n\n    return ((_a = this._contents) === null || _a === void 0 ? void 0 : _a.target) != null && ((_b = this._contents) === null || _b === void 0 ? void 0 : _b.mask) != null && this._slideButton != null;\n  };\n  /**\n   * スライダーボタンのサイズの伸縮を行う。\n   */\n\n\n  ScrollBarView.prototype.updateSliderSize = function () {\n    if (!this.isUpdatableSliderSize()) return;\n    var fullSize = this._maxPosition - this._minPosition;\n\n    var displayRate = this._contents.getDisplayRate(this.isHorizontal);\n\n    var sliderSize = fullSize * displayRate;\n    SliderView_1.SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize);\n    this.updateSliderVisible();\n  };\n  /**\n   * autoHideの条件に一致するかを判定し、表示を切り替える。\n   * @private\n   */\n\n\n  ScrollBarView.prototype.updateSliderVisible = function () {\n    this._slideButton.visible = this._slideButton.interactive = !this.isHidden;\n  };\n\n  Object.defineProperty(ScrollBarView.prototype, \"isHidden\", {\n    /**\n     * autoHideの条件に一致するかを判定する\n     */\n    get: function () {\n      //autoHideが設定されていない場合は常に表示\n      if (!this.autoHide) return false;\n      return this._contents.getDisplayRate(this.isHorizontal) === 1.0;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * rate値を元にコンテンツをスクロールする。\n   * @param {number} rate\n   */\n\n  ScrollBarView.prototype.updateContentsPositionWithRate = function (rate) {\n    this._contents.scroll(rate, this.isHorizontal);\n  };\n\n  ScrollBarView.prototype.onPressedSliderButton = function (e) {\n    _super.prototype.onPressedSliderButton.call(this, e);\n\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  ScrollBarView.prototype.onPressBase = function (evt) {\n    if (this.isHidden) return;\n\n    _super.prototype.onPressBase.call(this, evt);\n\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  ScrollBarView.prototype.onDisposeFunction = function (e) {\n    this._contents.dispose();\n\n    this._contents = null;\n\n    _super.prototype.onDisposeFunction.call(this, e);\n  };\n\n  return ScrollBarView;\n}(SliderView_1.SliderView);\n\nexports.ScrollBarView = ScrollBarView;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/ScrollBarView.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarViewUtil.js":
/*!********************************************!*\
  !*** ./lib/scrollBar/ScrollBarViewUtil.js ***!
  \********************************************/
/*! flagged exports */
/*! export ScrollBarViewUtil [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.ScrollBarViewUtil = void 0;\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar ScrollBarViewUtil =\n/** @class */\nfunction () {\n  function ScrollBarViewUtil() {}\n  /**\n   * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。\n   * @param target\n   * @param mask\n   * @param isHorizontal\n   */\n\n\n  ScrollBarViewUtil.getClampedTargetPosition = function (target, mask, isHorizontal) {\n    var getSize = SliderView_1.SliderViewUtil.getSize;\n    var targetSize = getSize(target, isHorizontal);\n    var maskSize = getSize(mask, isHorizontal);\n    var minPos = Math.min(-targetSize + maskSize, 0.0);\n    var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);\n    return SliderView_1.SliderViewUtil.clamp(pos, 0, minPos);\n  };\n  /**\n   * ターゲットコンテンツの位置を、マスク領域内に丸め込む。\n   * @param target\n   * @param mask\n   * @param position\n   * @param isHorizontal\n   */\n\n\n  ScrollBarViewUtil.clampTargetPosition = function (target, mask, position, isHorizontal) {\n    SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, position);\n    var clampedPos = this.getClampedTargetPosition(target, mask, isHorizontal);\n    SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, clampedPos);\n  };\n\n  ScrollBarViewUtil.getRatioOfOrigin = function (displayObj, isHorizontal) {\n    var bounds = displayObj.getLocalBounds();\n    var size = isHorizontal ? bounds.width : bounds.height;\n    var position = isHorizontal ? bounds.x : bounds.y;\n    var ratio = position / size;\n\n    if (ratio > 0) {\n      console.warn(displayObj.name + \" : \\u30DC\\u30BF\\u30F3\\u30B5\\u30A4\\u30BA\\u304C\\u4E0D\\u9069\\u5207\\u3067\\u3059\\u3002\\u30DC\\u30BF\\u30F3\\u306E\\u77E9\\u5F62\\u5185\\u306B\\u539F\\u70B9\\u304C\\u53CE\\u307E\\u3063\\u3066\\u3044\\u307E\\u305B\\u3093\\u3002\\u30B9\\u30AF\\u30ED\\u30FC\\u30EB\\u30D0\\u30FC\\u30DC\\u30BF\\u30F3\\u306F\\u539F\\u70B9\\u3092\\u56F2\\u3080\\u77E9\\u5F62\\u3068\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\");\n    }\n\n    return ratio;\n  };\n\n  return ScrollBarViewUtil;\n}();\n\nexports.ScrollBarViewUtil = ScrollBarViewUtil;\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./lib/scrollBar/ScrollBarViewUtil.js?");

/***/ }),

/***/ "./src/SliderEvent.ts":
/*!****************************!*\
  !*** ./src/SliderEvent.ts ***!
  \****************************/
/*! namespace exports */
/*! export SliderEventContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SliderEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SliderEventContext\": () => /* binding */ SliderEventContext,\n/* harmony export */   \"SliderEventType\": () => /* binding */ SliderEventType\n/* harmony export */ });\n/**\n * スライダーが移動した際に発行されるイベントです。\n * 現状のスライダー位置を報告します。\n */\nvar SliderEventContext = /** @class */ (function () {\n    function SliderEventContext(rate) {\n        this.rate = rate;\n    }\n    return SliderEventContext;\n}());\n\nvar SliderEventType;\n(function (SliderEventType) {\n    SliderEventType[\"CHANGE\"] = \"event_slider_change\";\n    SliderEventType[\"CHANGE_FINISH\"] = \"event_slider_change_finish\";\n})(SliderEventType || (SliderEventType = {}));\n\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./src/SliderEvent.ts?");

/***/ }),

/***/ "./src/SliderView.ts":
/*!***************************!*\
  !*** ./src/SliderView.ts ***!
  \***************************/
/*! namespace exports */
/*! export SliderView [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SliderViewUtil [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SliderView\": () => /* binding */ SliderView,\n/* harmony export */   \"SliderViewUtil\": () => /* binding */ SliderViewUtil\n/* harmony export */ });\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n/* harmony import */ var _SliderEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderEvent */ \"./src/SliderEvent.ts\");\n/* harmony import */ var _SliderViewOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SliderViewOption */ \"./src/SliderViewOption.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n/**\n * スライダー用クラスです\n *\n * 使用上の注意 :\n * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。\n * hitAreaでサイズをあらかじめ与えてください。\n */\nvar SliderView = /** @class */ (function (_super) {\n    __extends(SliderView, _super);\n    /**\n     * @param {SliderViewOption} option\n     */\n    function SliderView(option) {\n        var _this = _super.call(this) || this;\n        _this._isHorizontal = true;\n        _this.dragStartPos = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Point();\n        _this.isDragging = false; // 現在スライド中か否か\n        /**\n         * スライダーのドラッグを開始する\n         * @param {Object} e\n         */\n        _this.startMove = function (e) {\n            _this.onPressedSliderButton(e);\n        };\n        /**\n         * スライダーのドラッグ中の処理\n         * @param e\n         */\n        _this.moveSlider = function (e) {\n            var evt = e;\n            var mousePos = _this.limitSliderButtonPosition(evt);\n            _this.updateParts(mousePos);\n            _this._rate = _this.convertPixelToRate(mousePos);\n            _this.emit(_SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventType.CHANGE, new _SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventContext(_this.rate));\n        };\n        /**\n         * スライダーのドラッグ終了時の処理\n         * @param\te\n         */\n        _this.moveSliderFinish = function (e) {\n            _this.isDragging = false;\n            _this._slideButton.off(\"pointermove\", _this.moveSlider);\n            _this._slideButton.off(\"pointerup\", _this.moveSliderFinish);\n            _this._slideButton.off(\"pointerupoutside\", _this.moveSliderFinish);\n            _this.emit(_SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventType.CHANGE_FINISH, new _SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventContext(_this.rate));\n        };\n        /**\n         * このインスタンスを破棄する。\n         * @param\te\n         */\n        _this.dispose = function (e) {\n            _this.onDisposeFunction(e);\n        };\n        _this.init(option);\n        _this.interactive = true;\n        return _this;\n    }\n    Object.defineProperty(SliderView.prototype, \"isHorizontal\", {\n        get: function () {\n            return this._isHorizontal;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    /**\n     * 初期化処理\n     * @param {SliderViewOption} option\n     */\n    SliderView.prototype.init = function (option) {\n        option = _SliderViewOption__WEBPACK_IMPORTED_MODULE_2__.SliderViewOption.init(option);\n        this.base = option.base;\n        this._bar = this.initBarAndMask(option.bar);\n        this.slideButton = option.button;\n        this._barMask = this.initBarAndMask(option.mask);\n        if (this._bar && this._barMask)\n            this._bar.mask = this._barMask;\n        this._minPosition = option.minPosition;\n        this._maxPosition = option.maxPosition;\n        this._isHorizontal = option.isHorizontal;\n        this._rate = option.rate;\n        this.changeRate(this._rate);\n    };\n    SliderView.prototype.addChildParts = function (obj) {\n        var _a;\n        if (!obj)\n            return;\n        (_a = obj.parent) === null || _a === void 0 ? void 0 : _a.removeChild(obj);\n        this.addChild(obj);\n    };\n    /**\n     * スライダーの位置を変更する\n     * @param\trate\tスライダーの位置 MIN 0.0 ~ MAX 100.0\n     */\n    SliderView.prototype.changeRate = function (rate) {\n        //ドラッグ中は外部からの操作を無視する。\n        if (this.isDragging)\n            return;\n        this._rate = rate;\n        var pos = this.convertRateToPixel(this._rate);\n        this.updateParts(pos);\n        this.emit(_SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventType.CHANGE, new _SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventContext(this.rate));\n    };\n    SliderView.prototype.onPressedSliderButton = function (e) {\n        this.isDragging = true;\n        var target = e.currentTarget;\n        var localPos = this.toLocal(e.data.global);\n        this.dragStartPos = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Point(localPos.x - target.x, localPos.y - target.y);\n        this._slideButton.on(\"pointermove\", this.moveSlider);\n        this._slideButton.on(\"pointerup\", this.moveSliderFinish);\n        this._slideButton.on(\"pointerupoutside\", this.moveSliderFinish);\n    };\n    /**\n     * スライダーボタンの位置を制限する関数\n     * @return 制限で切り落とされたスライダーボタンの座標値 座標の原点はSliderViewであり、ボタンやバーではない。\n     */\n    SliderView.prototype.limitSliderButtonPosition = function (evt) {\n        var mousePos = this.getMousePosition(this, evt);\n        return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);\n    };\n    /**\n     * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する\n     * moveSliderの内部処理\n     * @param\tmousePos SliderViewを原点としたローカルのマウス座標、limitSliderButtonPosition関数で可動範囲に制限済み。\n     */\n    SliderView.prototype.updateParts = function (mousePos) {\n        var _this = this;\n        var stretch = function (target) {\n            SliderViewUtil.setSize(target, _this._isHorizontal, mousePos - SliderViewUtil.getPosition(target, _this._isHorizontal));\n        };\n        //バーマスクがなければ、バー自体を伸縮する\n        if (this._bar && !this._barMask) {\n            stretch(this._bar);\n        }\n        //バーマスクがあれば、マスクを伸縮する。\n        if (this._barMask) {\n            stretch(this._barMask);\n        }\n        //ボタンの位置を更新する。\n        SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);\n    };\n    /**\n     * スライダーの地をクリックした際の処理\n     * その位置までスライダーをジャンプする\n     * @param evt\n     */\n    SliderView.prototype.onPressBase = function (evt) {\n        this.dragStartPos = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Point();\n        this.moveSlider(evt);\n        this.emit(_SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventType.CHANGE_FINISH, new _SliderEvent__WEBPACK_IMPORTED_MODULE_1__.SliderEventContext(this.rate));\n    };\n    /**\n     * スライダーの割合から、スライダーの位置を取得する\n     * @param\trate\n     * @return\n     */\n    SliderView.prototype.convertRateToPixel = function (rate) {\n        return SliderViewUtil.convertRateToPixel(rate, this._maxPosition, this._minPosition);\n    };\n    /**\n     * スライダーの座標から、スライダーの割合を取得する\n     * @param\tpixel\n     * @return\n     */\n    SliderView.prototype.convertPixelToRate = function (pixel) {\n        return SliderViewUtil.convertPixelToRate(pixel, this._maxPosition, this._minPosition);\n    };\n    /**\n     * ドラッグ中のマウス座標を取得する。\n     * limitSliderButtonPosition内の処理。\n     */\n    SliderView.prototype.getMousePosition = function (displayObj, evt) {\n        var localPos = displayObj.toLocal(evt.data.global);\n        if (this._isHorizontal) {\n            return localPos.x - this.dragStartPos.x;\n        }\n        else {\n            return localPos.y - this.dragStartPos.y;\n        }\n    };\n    Object.defineProperty(SliderView.prototype, \"base\", {\n        set: function (value) {\n            var _this = this;\n            this._base = value;\n            this._base.interactive = true;\n            this._base.on(\"pointertap\", function (e) {\n                _this.onPressBase(e);\n            });\n            this.addChildParts(value);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    SliderView.prototype.initBarAndMask = function (value) {\n        if (value == null)\n            return;\n        value.interactive = false;\n        this.addChildParts(value);\n        return value;\n    };\n    Object.defineProperty(SliderView.prototype, \"slideButton\", {\n        set: function (value) {\n            this._slideButton = value;\n            this._slideButton.on(\"pointerdown\", this.startMove);\n            this._slideButton.interactive = true;\n            this.addChildParts(value);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(SliderView.prototype, \"rate\", {\n        get: function () {\n            return this._rate;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    /**\n     * 全てのDisplayObjectとEventListenerを解除する。\n     * @param {Event} e\n     */\n    SliderView.prototype.onDisposeFunction = function (e) {\n        this.removeAllListeners();\n        this._base.removeAllListeners();\n        this._slideButton.removeAllListeners();\n        this.removeChildren();\n    };\n    SliderView.MAX_RATE = 1.0;\n    return SliderView;\n}(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container));\n\nvar SliderViewUtil = /** @class */ (function () {\n    function SliderViewUtil() {\n    }\n    /**\n     * スライダーの座標から、スライダーの割合を取得する\n     */\n    SliderViewUtil.convertPixelToRate = function (pixel, max, min) {\n        var rate = ((pixel - min) / (max - min)) * SliderView.MAX_RATE;\n        return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);\n    };\n    SliderViewUtil.convertRateToPixel = function (rate, max, min) {\n        var pix = ((max - min) * rate) / SliderView.MAX_RATE + min;\n        return SliderViewUtil.clamp(pix, max, min);\n    };\n    /**\n     * ディスプレイオブジェクトからスクロール方向の座標値を取り出す\n     * @return displayObjの座標値。単位ピクセル\n     */\n    SliderViewUtil.getPosition = function (displayObj, isHorizontal) {\n        if (isHorizontal) {\n            return displayObj.x;\n        }\n        else {\n            return displayObj.y;\n        }\n    };\n    /**\n     * ディスプレイオブジェクトにスクロール方向の座標値を設定する\n     */\n    SliderViewUtil.setPosition = function (displayObj, isHorizontal, position) {\n        if (!displayObj)\n            return;\n        if (isHorizontal) {\n            displayObj.x = position;\n        }\n        else {\n            displayObj.y = position;\n        }\n    };\n    /**\n     * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル\n     */\n    SliderViewUtil.getSize = function (displayObj, isHorizontal) {\n        var size = displayObj.getLocalBounds();\n        if (isHorizontal) {\n            return size.width * displayObj.scale.x;\n        }\n        else {\n            return size.height * displayObj.scale.y;\n        }\n    };\n    /**\n     * スクロール方向の高さ、もしくは幅を設定する。\n     * @param displayObj\n     * @param isHorizontal\n     * @param amount width or height, range : 0 ~ displayObj.size.width or height, unit : px\n     */\n    SliderViewUtil.setSize = function (displayObj, isHorizontal, amount) {\n        var size = displayObj.getLocalBounds();\n        if (isHorizontal) {\n            displayObj.scale.x = amount / size.width;\n        }\n        else {\n            displayObj.scale.y = amount / size.height;\n        }\n    };\n    SliderViewUtil.clamp = function (num, max, min) {\n        num = Math.max(num, min);\n        num = Math.min(num, max);\n        return num;\n    };\n    return SliderViewUtil;\n}());\n\n\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./src/SliderView.ts?");

/***/ }),

/***/ "./src/SliderViewOption.ts":
/*!*********************************!*\
  !*** ./src/SliderViewOption.ts ***!
  \*********************************/
/*! namespace exports */
/*! export SliderViewOption [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SliderViewOption\": () => /* binding */ SliderViewOption\n/* harmony export */ });\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n/* harmony import */ var _SliderView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderView */ \"./src/SliderView.ts\");\n/**\n * スライダーを初期化する際のオプション\n */\n\n\nvar SliderViewOption = /** @class */ (function () {\n    function SliderViewOption() {\n    }\n    SliderViewOption.init = function (option) {\n        var _a, _b, _c;\n        if (option.rate != null) {\n            option.rate = Math.max(0, option.rate);\n            option.rate = Math.min(_SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderView.MAX_RATE, option.rate);\n        }\n        (_a = option.minPosition) !== null && _a !== void 0 ? _a : (option.minPosition = 0.0);\n        (_b = option.rate) !== null && _b !== void 0 ? _b : (option.rate = 0.0);\n        (_c = option.isHorizontal) !== null && _c !== void 0 ? _c : (option.isHorizontal = true);\n        this.check(option);\n        return option;\n    };\n    SliderViewOption.check = function (option) {\n        this.checkParts(option.base, \"base\");\n        this.checkParts(option.button, \"button\");\n        this.checkParts(option.mask, \"mask\");\n        this.checkParts(option.bar, \"bar\");\n    };\n    SliderViewOption.checkParts = function (obj, targetName) {\n        if (obj == null)\n            return;\n        var bounds = obj.getLocalBounds();\n        if (bounds.width === 0 &&\n            bounds.height === 0 &&\n            bounds.type === pixi_js__WEBPACK_IMPORTED_MODULE_0__.SHAPES.RECT) {\n            throw new Error(\"SliderView : \" + targetName + \" \\u521D\\u671F\\u5316\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3\\u3067\\u6307\\u5B9A\\u3055\\u308C\\u305FDisplayObject\\u306B\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u304C\\u5B58\\u5728\\u3057\\u307E\\u305B\\u3093\\u3002Container\\u3092\\u5229\\u7528\\u3059\\u308B\\u5834\\u5408\\u306FhitArea\\u3092\\u5229\\u7528\\u3057\\u3066\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u3092\\u624B\\u52D5\\u3067\\u8A2D\\u5B9A\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\");\n        }\n        if (obj.parent) {\n            console.warn(\"\\u521D\\u671F\\u5316\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3\\u3067\\u6307\\u5B9A\\u3055\\u308C\\u305F\\u30D1\\u30FC\\u30C4\\u304C\\u3059\\u3067\\u306B\\u5225\\u306E\\u89AA\\u306BaddChild\\u3055\\u308C\\u3066\\u3044\\u307E\\u3059\\u3002SliderView\\u304A\\u3088\\u3073ScrollBarView\\u306E\\u69CB\\u6210\\u30D1\\u30FC\\u30C4\\u306F\\u540C\\u4E00\\u306E\\u30B3\\u30F3\\u30C6\\u30CA\\u306BaddChild\\u3055\\u308C\\u308B\\u3053\\u3068\\u3092\\u524D\\u63D0\\u3068\\u3057\\u3066\\u3044\\u307E\\u3059\\u3002\");\n        }\n    };\n    return SliderViewOption;\n}());\n\n\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./src/SliderViewOption.ts?");

/***/ }),

/***/ "./src/scrollBar/ScrollBarContents.ts":
/*!********************************************!*\
  !*** ./src/scrollBar/ScrollBarContents.ts ***!
  \********************************************/
/*! namespace exports */
/*! export ScrollBarContents [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScrollBarContents\": () => /* binding */ ScrollBarContents\n/* harmony export */ });\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n/* harmony import */ var _SliderView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SliderView */ \"./src/SliderView.ts\");\n/* harmony import */ var _ScrollBarContentsEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScrollBarContentsEventType */ \"./src/scrollBar/ScrollBarContentsEventType.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n/**\n * スクロールバーで操作するコンテンツ\n */\nvar ScrollBarContents = /** @class */ (function (_super) {\n    __extends(ScrollBarContents, _super);\n    /**\n     * コンストラクタ\n     *\n     * @param target スクロール操作を受けるコンテンツ\n     * @param mask targetを切り抜くマスク\n     * @param container targetおよびmaskを格納する親コンテナ\n     */\n    function ScrollBarContents(target, mask, container) {\n        var _this = _super.call(this) || this;\n        _this.container = container;\n        _this._target = target;\n        _this._mask = mask;\n        ScrollBarContents.init(_this);\n        return _this;\n    }\n    Object.defineProperty(ScrollBarContents.prototype, \"target\", {\n        get: function () {\n            return this._target;\n        },\n        set: function (value) {\n            this._target = value;\n            this.emit(_ScrollBarContentsEventType__WEBPACK_IMPORTED_MODULE_2__.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(ScrollBarContents.prototype, \"mask\", {\n        get: function () {\n            return this._mask;\n        },\n        set: function (value) {\n            this._mask = value;\n            this.emit(_ScrollBarContentsEventType__WEBPACK_IMPORTED_MODULE_2__.ScrollBarContentsEventType.CHANGED_CONTENTS_SIZE);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ScrollBarContents.init = function (scrollBarContents) {\n        if (scrollBarContents._target.mask !== scrollBarContents._mask) {\n            scrollBarContents._target.mask = scrollBarContents._mask;\n        }\n        var addToContainer = function (displayObject) {\n            var _a;\n            if (displayObject.parent === scrollBarContents.container)\n                return;\n            (_a = displayObject.parent) === null || _a === void 0 ? void 0 : _a.removeChild(displayObject);\n            scrollBarContents.container.addChild(displayObject);\n        };\n        addToContainer(scrollBarContents._target);\n        addToContainer(scrollBarContents._mask);\n    };\n    /**\n     * 現状のスクロール位置を取得する。単位rate\n     * 0.0でコンテンツはTOP, 1.0でBOTTOMに位置している。\n     *\n     * @param isHorizontal\n     */\n    ScrollBarContents.prototype.getScrollPositionAsRate = function (isHorizontal) {\n        var getPos = _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.getPosition;\n        var zeroPos = getPos(this.mask, isHorizontal);\n        var contentsPos = getPos(this.target, isHorizontal);\n        var contentsPositionDif = zeroPos - contentsPos;\n        var movableRange = this.getMovableRange(isHorizontal);\n        return (contentsPositionDif / movableRange) * _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderView.MAX_RATE;\n    };\n    /**\n     * スクロールの最大可動領域を取得する。単位px\n     *\n     * @param isHorizontal\n     * @private\n     */\n    ScrollBarContents.prototype.getMovableRange = function (isHorizontal) {\n        var getSize = _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.getSize;\n        var targetSize = getSize(this._target, isHorizontal);\n        var maskSize = getSize(this._mask, isHorizontal);\n        return targetSize - maskSize;\n    };\n    /**\n     * コンテンツを、指定されたrateの位置までスクロールする\n     *\n     * @param rate\n     * @param isHorizontal\n     */\n    ScrollBarContents.prototype.scroll = function (rate, isHorizontal) {\n        var getPos = _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.getPosition;\n        var zeroPos = getPos(this._mask, isHorizontal);\n        var movableRange = this.getMovableRange(isHorizontal);\n        var contentsPos = zeroPos - movableRange * (rate / _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderView.MAX_RATE);\n        _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.setPosition(this._target, isHorizontal, contentsPos);\n    };\n    /**\n     * コンテンツが表示領域にどれだけ表示されているかの比率を取得する。\n     * この比率は、スクロールバーボタンのスケールとなる。\n     *\n     * 例 : コンテンツサイズが200、表示領域が100なら0.5\n     * コンテンツがすべて表示されているなら1.0\n     *\n     * @param isHorizontal\n     * @return 0.0 ~ 1.0\n     */\n    ScrollBarContents.prototype.getDisplayRate = function (isHorizontal) {\n        var getSize = _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.getSize;\n        var contentsSize = getSize(this.target, isHorizontal);\n        var maskSize = getSize(this.mask, isHorizontal);\n        return _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderViewUtil.clamp(maskSize / contentsSize, _SliderView__WEBPACK_IMPORTED_MODULE_1__.SliderView.MAX_RATE, 0.0);\n    };\n    ScrollBarContents.prototype.dispose = function () {\n        this.removeAllListeners();\n        this.container = null;\n        this._mask = null;\n        this._target = null;\n    };\n    return ScrollBarContents;\n}(pixi_js__WEBPACK_IMPORTED_MODULE_0__.utils.EventEmitter));\n\n\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./src/scrollBar/ScrollBarContents.ts?");

/***/ }),

/***/ "./src/scrollBar/ScrollBarContentsEventType.ts":
/*!*****************************************************!*\
  !*** ./src/scrollBar/ScrollBarContentsEventType.ts ***!
  \*****************************************************/
/*! namespace exports */
/*! export ScrollBarContentsEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScrollBarContentsEventType\": () => /* binding */ ScrollBarContentsEventType\n/* harmony export */ });\nvar ScrollBarContentsEventType;\n(function (ScrollBarContentsEventType) {\n    ScrollBarContentsEventType[\"CHANGED_CONTENTS_SIZE\"] = \"ScrollBarContentsEventType_CHANGED_CONTENTS_SIZE\";\n})(ScrollBarContentsEventType || (ScrollBarContentsEventType = {}));\n\n\n//# sourceURL=webpack://pixijs-basic-scrollbar/./src/scrollBar/ScrollBarContentsEventType.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo_scrollbar": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./demoSrc/demo_scrollbar.js","vendor"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = () => {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = () => {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = () => {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpixijs_basic_scrollbar"] = self["webpackChunkpixijs_basic_scrollbar"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;