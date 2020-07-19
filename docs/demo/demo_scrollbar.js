/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demo_scrollbar": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./demoSrc/demo_scrollbar.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demoSrc/demo_scrollbar.js":
/*!***********************************!*\
  !*** ./demoSrc/demo_scrollbar.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tweenjs/tween.js */ \"./node_modules/@tweenjs/tween.js/dist/tween.esm.js\");\n\n\n\n\nconst onDomContentsLoaded = () => {\n  const app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Application\"]({\n    width: 800,\n    height: 800\n  });\n  document.body.appendChild(app.view);\n  pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Ticker\"].shared.add(e => {\n    _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].update(performance.now());\n  });\n  initScrollBar(app.stage);\n};\n/**\n * スクロールバーの実装サンプル\n * @param stage\n */\n\n\nconst initScrollBar = stage => {\n  const SCROLLBAR_W = 16;\n  const SCROLLBAR_H = 360;\n  const SCROLLBAR_Y = 120;\n  const CONTENTS_W = 240;\n  const container = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Container\"]();\n  stage.addChild(container);\n  container.x = 32;\n  container.y = SCROLLBAR_Y;\n  const scrollbar = new _lib__WEBPACK_IMPORTED_MODULE_1__[\"ScrollBarView\"]({\n    base: getScrollBarBase(SCROLLBAR_W, SCROLLBAR_H, 0x0000ff),\n    button: getScrollBarButton(SCROLLBAR_W, 0xffff00),\n    minPosition: 0,\n    maxPosition: SCROLLBAR_H,\n    rate: 35.0,\n    isHorizontal: false\n  }, getScrollBarOption(CONTENTS_W, SCROLLBAR_H, container));\n  stage.addChild(scrollbar);\n  scrollbar.x = container.x + CONTENTS_W;\n  scrollbar.y = SCROLLBAR_Y;\n  scrollbar.on(_lib__WEBPACK_IMPORTED_MODULE_1__[\"SliderEventType\"].CHANGE, e => {\n    console.log(e);\n  });\n};\n\nconst getScrollBarBase = (w, h, color) => {\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Graphics\"]();\n  g.beginFill(color);\n  g.drawRect(0, 0, w, h);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](0, 0, w, h);\n  return g;\n};\n\nconst getScrollBarButton = (width, color) => {\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Graphics\"]();\n  g.beginFill(color);\n  g.drawRect(-width / 2, -width / 2, width, width);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](-width / 2, -width / 2, width, width);\n  g.x = width / 2;\n  return g;\n};\n\nconst getScrollBarContents = (color, w, h, container, alpha = 1.0) => {\n  const g = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Graphics\"]();\n  g.beginFill(color, alpha);\n  g.drawRect(0, 0, w, h);\n  g.hitArea = new pixi_js__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](0, 0, w, h);\n  container.addChild(g);\n  return g;\n};\n\nconst getScrollBarOption = (contentsW, scrollBarH, container) => {\n  const targetContents = getScrollBarContents(0xff00ff, contentsW, scrollBarH * 2, container);\n  const contentsMask = getScrollBarContents(0x0000ff, contentsW, scrollBarH, container, 0.3); // targetContents.mask = contentsMask;\n\n  return {\n    targetContents,\n    contentsMask\n  };\n};\n/**\n * DOMContentLoaded以降に初期化処理を実行する\n */\n\n\nif (document.readyState !== \"loading\") {\n  onDomContentsLoaded();\n} else {\n  document.addEventListener(\"DOMContentLoaded\", onDomContentsLoaded);\n}\n\n//# sourceURL=webpack:///./demoSrc/demo_scrollbar.js?");

/***/ }),

/***/ "./lib/MouseWheelPlugin.js":
/*!*********************************!*\
  !*** ./lib/MouseWheelPlugin.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * based on https://github.com/Mwni/pixi-mousewheel\n */\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initPlugin = exports.MouseWheelPluginEventType = void 0;\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar MouseWheelPluginEventType;\n\n(function (MouseWheelPluginEventType) {\n  MouseWheelPluginEventType[\"WHEEL\"] = \"wheel\";\n})(MouseWheelPluginEventType = exports.MouseWheelPluginEventType || (exports.MouseWheelPluginEventType = {}));\n\nvar MousewheelPlugin =\n/** @class */\nfunction () {\n  function MousewheelPlugin(app) {\n    var _this = this;\n\n    this.eventHandler = function (e) {\n      _this.onMouseWheel(e);\n    };\n\n    this.app = app;\n    this.app.view.addEventListener(\"wheel\", this.eventHandler, {\n      passive: false\n    });\n  }\n\n  MousewheelPlugin.prototype.onMouseWheel = function (e) {\n    var target = this.findScrollTarget({\n      x: e.offsetX,\n      y: e.offsetY\n    });\n    if (!target) return;\n    e.preventDefault();\n    target.emit(MouseWheelPluginEventType.WHEEL, e);\n  };\n\n  MousewheelPlugin.prototype.findScrollTarget = function (pos) {\n    var hit = this.app.renderer.plugins.interaction.hitTest(pos);\n\n    if (hit && hit[\"interactiveMousewheel\"]) {\n      return hit;\n    }\n  };\n\n  MousewheelPlugin.prototype.destroy = function () {\n    this.app.view.removeEventListener(\"wheel\", this.eventHandler);\n  };\n\n  return MousewheelPlugin;\n}();\n\nfunction initPlugin() {\n  Object.defineProperty(pixi_js_1.DisplayObject.prototype, \"interactiveMousewheel\", {\n    get: function () {\n      return this._interactiveMousewheel;\n    },\n    set: function (enabled) {\n      this._interactiveMousewheel = enabled;\n\n      if (enabled && !this.interactive) {\n        this.interactive = true;\n      }\n    }\n  });\n  pixi_js_1.Application.registerPlugin({\n    init: function (options) {\n      this._mousewheelPlugin = new MousewheelPlugin(this);\n    },\n    destroy: function () {\n      this._mousewheelPlugin.destroy();\n    }\n  });\n}\n\nexports.initPlugin = initPlugin;\n\n//# sourceURL=webpack:///./lib/MouseWheelPlugin.js?");

/***/ }),

/***/ "./lib/SliderEvent.js":
/*!****************************!*\
  !*** ./lib/SliderEvent.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SliderEventType = exports.SliderEventContext = void 0;\n/**\n * スライダーが移動した際に発行されるイベントです。\n * 現状のスライダー位置を報告します。\n */\n\nvar SliderEventContext =\n/** @class */\nfunction () {\n  function SliderEventContext(rate) {\n    this.rate = rate;\n  }\n\n  return SliderEventContext;\n}();\n\nexports.SliderEventContext = SliderEventContext;\nvar SliderEventType;\n\n(function (SliderEventType) {\n  SliderEventType[\"CHANGE\"] = \"event_slider_change\";\n  SliderEventType[\"CHANGE_FINISH\"] = \"event_slider_change_finish\";\n})(SliderEventType = exports.SliderEventType || (exports.SliderEventType = {}));\n\n//# sourceURL=webpack:///./lib/SliderEvent.js?");

/***/ }),

/***/ "./lib/SliderView.js":
/*!***************************!*\
  !*** ./lib/SliderView.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SliderViewUtil = exports.SliderView = void 0;\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar SliderEvent_1 = __webpack_require__(/*! ./SliderEvent */ \"./lib/SliderEvent.js\");\n\nvar SliderViewOption_1 = __webpack_require__(/*! ./SliderViewOption */ \"./lib/SliderViewOption.js\");\n/**\n * スライダー用クラスです\n *\n * 使用上の注意 :\n * オブジェクトのサイズの計測にgetLocalBounds関数を使用しています。\n * hitAreaでサイズをあらかじめ与えてください。\n */\n\n\nvar SliderView =\n/** @class */\nfunction (_super) {\n  __extends(SliderView, _super);\n  /**\n   * @param {SliderViewOption} option\n   */\n\n\n  function SliderView(option) {\n    var _this = _super.call(this) || this;\n\n    _this._isHorizontal = true;\n    _this.dragStartPos = new pixi_js_1.Point();\n    _this.isDragging = false; // 現在スライド中か否か\n\n    /**\n     * スライダーのドラッグを開始する\n     * @param {Object} e\n     */\n\n    _this.startMove = function (e) {\n      _this.onPressedSliderButton(e);\n    };\n    /**\n     * スライダーのドラッグ中の処理\n     * @param e\n     */\n\n\n    _this.moveSlider = function (e) {\n      var evt = e;\n\n      var mousePos = _this.limitSliderButtonPosition(evt);\n\n      _this.updateParts(mousePos);\n\n      _this._rate = _this.convertPixelToRate(mousePos);\n\n      _this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(_this.rate));\n    };\n    /**\n     * スライダーのドラッグ終了時の処理\n     * @param\te\n     */\n\n\n    _this.moveSliderFinish = function (e) {\n      _this.isDragging = false;\n\n      _this.removeListener(\"pointermove\", _this.moveSlider);\n\n      _this.removeListener(\"pointerup\", _this.moveSliderFinish);\n\n      _this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(_this.rate));\n    };\n    /**\n     * このインスタンスを破棄する。\n     * @param\te\n     */\n\n\n    _this.dispose = function (e) {\n      _this.onDisposeFunction(e);\n    };\n\n    _this.init(option);\n\n    _this.interactive = true;\n    return _this;\n  }\n\n  Object.defineProperty(SliderView.prototype, \"isHorizontal\", {\n    get: function () {\n      return this._isHorizontal;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * 初期化処理\n   * @param {SliderViewOption} option\n   */\n\n  SliderView.prototype.init = function (option) {\n    option = SliderViewOption_1.SliderViewOption.init(option);\n    this.base = option.base;\n    this._bar = this.initBarAndMask(option.bar);\n    this.slideButton = option.button;\n    this._barMask = this.initBarAndMask(option.mask);\n    if (this._bar && this._barMask) this._bar.mask = this._barMask;\n    this._minPosition = option.minPosition;\n    this._maxPosition = option.maxPosition;\n    this._isHorizontal = option.isHorizontal;\n    this._rate = option.rate;\n    this.changeRate(this._rate);\n  };\n\n  SliderView.prototype.addChildParts = function (obj) {\n    if (!obj) return;\n    if (obj.parent) obj.parent.removeChild(obj);\n    this.addChild(obj);\n  };\n  /**\n   * スライダーの位置を変更する\n   * @param\trate\tスライダーの位置 MIN 0.0 ~ MAX 100.0\n   */\n\n\n  SliderView.prototype.changeRate = function (rate) {\n    //ドラッグ中は外部からの操作を無視する。\n    if (this.isDragging) return;\n    this._rate = rate;\n    var pos = this.convertRateToPixel(this._rate);\n    this.updateParts(pos);\n    this.emit(SliderEvent_1.SliderEventType.CHANGE, new SliderEvent_1.SliderEventContext(this.rate));\n  };\n\n  SliderView.prototype.onPressedSliderButton = function (e) {\n    this.isDragging = true;\n    var target = e.currentTarget;\n    var global = e.data.global;\n    var localPos = this.toLocal(new pixi_js_1.Point(global.x, global.y));\n    this.dragStartPos = new pixi_js_1.Point(localPos.x - target.x, localPos.y - target.y);\n    this.on(\"pointermove\", this.moveSlider);\n    this.on(\"pointerup\", this.moveSliderFinish);\n    this.on(\"pointerupoutside\", this.moveSliderFinish);\n  };\n  /**\n   * スライダーボタンの位置を制限する関数\n   * @return 制限で切り落とされたスライダーボタンの座標値\n   */\n\n\n  SliderView.prototype.limitSliderButtonPosition = function (evt) {\n    var mousePos = this.getMousePosition(this, evt);\n    return SliderViewUtil.clamp(mousePos, this._maxPosition, this._minPosition);\n  };\n  /**\n   * 各MCの位置、サイズをマウスポインタの位置に合わせて更新する\n   * moveSliderの内部処理\n   * @param\tmousePos\n   */\n\n\n  SliderView.prototype.updateParts = function (mousePos) {\n    //バーマスクがなければ、バー自体を伸縮する\n    if (this._bar && !this._barMask) {\n      SliderViewUtil.setSize(this._bar, this._isHorizontal, Math.max(1.0, mousePos - this._minPosition));\n    } //バーマスクがあれば、マスクを伸縮する。\n\n\n    if (this._barMask) {\n      SliderViewUtil.setSize(this._barMask, this._isHorizontal, mousePos - SliderViewUtil.getPosition(this._barMask, this._isHorizontal));\n    } //ボタンの位置を更新する。\n\n\n    if (this._slideButton) {\n      SliderViewUtil.setPosition(this._slideButton, this._isHorizontal, mousePos);\n    }\n  };\n  /**\n   * スライダーの地をクリックした際の処理\n   * その位置までスライダーをジャンプする\n   * @param evt\n   */\n\n\n  SliderView.prototype.onPressBase = function (evt) {\n    this.dragStartPos = new pixi_js_1.Point();\n    this.moveSlider(evt);\n    this.emit(SliderEvent_1.SliderEventType.CHANGE_FINISH, new SliderEvent_1.SliderEventContext(this.rate));\n  };\n  /**\n   * スライダーの割合から、スライダーの位置を取得する\n   * @param\trate\n   * @return\n   */\n\n\n  SliderView.prototype.convertRateToPixel = function (rate) {\n    return SliderViewUtil.convertRateToPixel(rate, this._maxPosition, this._minPosition);\n  };\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   * @param\tpixel\n   * @return\n   */\n\n\n  SliderView.prototype.convertPixelToRate = function (pixel) {\n    return SliderViewUtil.convertPixelToRate(pixel, this._maxPosition, this._minPosition);\n  };\n  /**\n   * ドラッグ中のマウス座標を取得する。\n   * limitSliderButtonPosition内の処理。\n   */\n\n\n  SliderView.prototype.getMousePosition = function (displayObj, evt) {\n    var global = evt.data.global;\n    var localPos = displayObj.toLocal(new pixi_js_1.Point(global.x, global.y));\n\n    if (this._isHorizontal) {\n      return localPos.x - this.dragStartPos.x;\n    } else {\n      return localPos.y - this.dragStartPos.y;\n    }\n  };\n\n  Object.defineProperty(SliderView.prototype, \"base\", {\n    set: function (value) {\n      var _this = this;\n\n      if (!value) return;\n      this._base = value;\n      this._base.interactive = true;\n\n      this._base.on(\"pointertap\", function (e) {\n        _this.onPressBase(e);\n      });\n\n      this.addChildParts(value);\n    },\n    enumerable: false,\n    configurable: true\n  });\n\n  SliderView.prototype.initBarAndMask = function (value) {\n    if (value == null) return;\n    value.interactive = false;\n    this.addChildParts(value);\n    return value;\n  };\n\n  Object.defineProperty(SliderView.prototype, \"slideButton\", {\n    set: function (value) {\n      if (!value) return;\n      this._slideButton = value;\n\n      this._slideButton.on(\"pointerdown\", this.startMove);\n\n      this._slideButton.interactive = true;\n      this.addChildParts(value);\n    },\n    enumerable: false,\n    configurable: true\n  });\n  Object.defineProperty(SliderView.prototype, \"rate\", {\n    get: function () {\n      return this._rate;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * 全てのDisplayObjectとEventListenerを解除する。\n   * @param {Event} e\n   */\n\n  SliderView.prototype.onDisposeFunction = function (e) {\n    this.removeAllListeners();\n\n    this._base.removeAllListeners();\n\n    this._slideButton.removeAllListeners();\n\n    this.removeChildren();\n  };\n\n  SliderView.MAX_RATE = 1.0;\n  return SliderView;\n}(pixi_js_1.Container);\n\nexports.SliderView = SliderView;\n\nvar SliderViewUtil =\n/** @class */\nfunction () {\n  function SliderViewUtil() {}\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   */\n\n\n  SliderViewUtil.convertPixelToRate = function (pixel, max, min) {\n    var rate = (pixel - min) / (max - min) * SliderView.MAX_RATE;\n    return SliderViewUtil.clamp(rate, SliderView.MAX_RATE, 0.0);\n  };\n\n  SliderViewUtil.convertRateToPixel = function (rate, max, min) {\n    var pix = (max - min) * rate / SliderView.MAX_RATE + min;\n    return SliderViewUtil.clamp(pix, max, min);\n  };\n  /**\n   * ディスプレイオブジェクトからスクロール方向の座標値を取り出す\n   * @return displayObjの座標値。単位ピクセル\n   */\n\n\n  SliderViewUtil.getPosition = function (displayObj, isHorizontal) {\n    if (isHorizontal) {\n      return displayObj.x;\n    } else {\n      return displayObj.y;\n    }\n  };\n  /**\n   * ディスプレイオブジェクトにスクロール方向の座標地を設定する\n   */\n\n\n  SliderViewUtil.setPosition = function (displayObj, isHorizontal, position) {\n    if (!displayObj) return;\n\n    if (isHorizontal) {\n      displayObj.x = position;\n    } else {\n      displayObj.y = position;\n    }\n  };\n  /**\n   * スクロール方向の高さ、もしくは幅を取得する。単位ピクセル\n   */\n\n\n  SliderViewUtil.getSize = function (displayObj, isHorizontal) {\n    var size = displayObj.getLocalBounds();\n\n    if (isHorizontal) {\n      return size.width * displayObj.scale.x;\n    } else {\n      return size.height * displayObj.scale.y;\n    }\n  };\n  /**\n   * スクロール方向の高さ、もしくは幅を設定する。単位は0.0 ~ 1.0の割合。\n   */\n\n\n  SliderViewUtil.setSize = function (displayObj, isHorizontal, amount) {\n    var size = displayObj.getLocalBounds();\n\n    if (isHorizontal) {\n      displayObj.scale.x = amount / size.width;\n    } else {\n      displayObj.scale.y = amount / size.height;\n    }\n  };\n\n  SliderViewUtil.clamp = function (num, max, min) {\n    num = Math.max(num, min);\n    num = Math.min(num, max);\n    return num;\n  };\n\n  return SliderViewUtil;\n}();\n\nexports.SliderViewUtil = SliderViewUtil;\n\n//# sourceURL=webpack:///./lib/SliderView.js?");

/***/ }),

/***/ "./lib/SliderViewOption.js":
/*!*********************************!*\
  !*** ./lib/SliderViewOption.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.SliderViewOption = void 0;\n\nvar SliderView_1 = __webpack_require__(/*! ./SliderView */ \"./lib/SliderView.js\");\n\nvar SliderViewOption =\n/** @class */\nfunction () {\n  function SliderViewOption() {}\n\n  SliderViewOption.init = function (option) {\n    var _a, _b;\n\n    if (option.rate != null) {\n      option.rate = Math.max(0, option.rate);\n      option.rate = Math.min(SliderView_1.SliderView.MAX_RATE, option.rate);\n    }\n\n    option.rate = (_a = option.rate) !== null && _a !== void 0 ? _a : 0.0;\n    option.isHorizontal = (_b = option.isHorizontal) !== null && _b !== void 0 ? _b : true;\n    this.check(option);\n    return option;\n  };\n\n  SliderViewOption.check = function (option) {\n    this.checkParts(option.base, \"base\");\n    this.checkParts(option.button, \"button\");\n    this.checkParts(option.mask, \"mask\");\n    this.checkParts(option.bar, \"bar\");\n  };\n\n  SliderViewOption.checkParts = function (obj, targetName) {\n    if (obj == null) return;\n\n    if (obj.getBounds() === null) {\n      throw new Error(\"SliderView : \" + targetName + \" \\u521D\\u671F\\u5316\\u30AA\\u30D7\\u30B7\\u30E7\\u30F3\\u3067\\u6307\\u5B9A\\u3055\\u308C\\u305FDisplayObject\\u306B\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u304C\\u5B58\\u5728\\u3057\\u307E\\u305B\\u3093\\u3002Shape\\u3084Container\\u3092\\u5229\\u7528\\u3059\\u308B\\u5834\\u5408\\u306FsetBounds\\u95A2\\u6570\\u3092\\u5229\\u7528\\u3057\\u3066\\u30D0\\u30A6\\u30F3\\u30C7\\u30A3\\u30F3\\u30B0\\u30DC\\u30C3\\u30AF\\u30B9\\u3092\\u624B\\u52D5\\u3067\\u8A2D\\u5B9A\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\");\n    }\n\n    if (obj.parent) {\n      console.warn(\"初期化オプションで指定されたパーツがすでに別の親にaddChildされています。\" + \"SliderViewおよびScrollBarViewの構成パーツはインスタンスにaddChildされることを前提としています。\");\n    }\n  };\n\n  return SliderViewOption;\n}();\n\nexports.SliderViewOption = SliderViewOption;\n\n//# sourceURL=webpack:///./lib/SliderViewOption.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./SliderEvent */ \"./lib/SliderEvent.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SliderView */ \"./lib/SliderView.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./scrollBar/ScrollBarView */ \"./lib/scrollBar/ScrollBarView.js\"), exports);\n\n__exportStar(__webpack_require__(/*! ./SliderViewOption */ \"./lib/SliderViewOption.js\"), exports);\n\nvar MouseWheelPlugin_1 = __webpack_require__(/*! ./MouseWheelPlugin */ \"./lib/MouseWheelPlugin.js\");\n\nMouseWheelPlugin_1.initPlugin();\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./lib/scrollBar/InertialScrollManager.js":
/*!************************************************!*\
  !*** ./lib/scrollBar/InertialScrollManager.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, \"default\", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o[\"default\"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nvar __importDefault = this && this.__importDefault || function (mod) {\n  return mod && mod.__esModule ? mod : {\n    \"default\": mod\n  };\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.InertialScrollManager = void 0;\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar ScrollBarView_1 = __webpack_require__(/*! ./ScrollBarView */ \"./lib/scrollBar/ScrollBarView.js\");\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n\nvar PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\"));\n\nvar pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\");\n\nvar tween_js_1 = __importDefault(__webpack_require__(/*! @tweenjs/tween.js */ \"./node_modules/@tweenjs/tween.js/dist/tween.esm.js\"));\n\nvar Tween = tween_js_1.default.Tween;\nvar Easing = tween_js_1.default.Easing;\n/**\n * スクロールバーエリアの慣性スクロールを処理するクラス。\n */\n\nvar InertialScrollManager =\n/** @class */\nfunction (_super) {\n  __extends(InertialScrollManager, _super);\n\n  function InertialScrollManager(scrollBarView) {\n    var _this = _super.call(this) || this;\n\n    _this.decelerationRate = 0.975;\n    _this.overflowScrollRange = 180;\n    _this.speed = 0.0;\n    _this.isDragging = false;\n\n    _this.onMouseDown = function (e) {\n      _this.onMouseDownHandler(e);\n    };\n\n    _this.onMouseMove = function (e) {\n      _this.onMouseMoveHandler(e);\n    };\n\n    _this.onMouseUp = function (e) {\n      _this.onMouseUpHandler(e);\n    };\n\n    _this.onTick = function () {\n      var _a;\n\n      if (_this.isDragging) return;\n      if (_this.speed === 0.0 && _this.getLeaveRangeFromMask() === 0.0) return;\n      if ((_a = _this.tween) === null || _a === void 0 ? void 0 : _a.isPlaying()) return; //位置による減速率増加。マスクエリアから離れているなら減速率が大きくなる。\n\n      var overflowDeceleration = _this.getOverflowDeceleration();\n\n      _this.speed *= _this.decelerationRate * overflowDeceleration;\n\n      _this.addTargetPosition(_this.speed);\n\n      if (Math.abs(_this.speed) > 0.1) return; //back ease\n\n      _this.speed = 0.0;\n      var toObj = {\n        y: _this.getClampedPos()\n      };\n      _this.tween = new Tween(_this.scrollBarView.targetContents).to(toObj, 666).onUpdate(function () {\n        _this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n      }).easing(Easing.Cubic.Out).start();\n    };\n\n    _this.stopInertial = function () {\n      _this.speed = 0.0;\n      if (_this.tween) _this.tween.stop();\n    };\n\n    _this.scrollBarView = scrollBarView;\n    scrollBarView.on(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN, _this.stopInertial);\n    var target = _this.scrollBarView.targetContents;\n    target.interactive = true;\n\n    _this.start();\n\n    return _this;\n  }\n\n  InertialScrollManager.prototype.start = function () {\n    if (this._isStart) return;\n    this._isStart = true;\n    var target = this.scrollBarView.targetContents;\n    target.on(\"pointerdown\", this.onMouseDown);\n    pixi_js_1.Ticker.shared.add(this.onTick);\n  };\n\n  InertialScrollManager.prototype.stop = function () {\n    if (!this._isStart) return;\n    this._isStart = false;\n    var target = this.scrollBarView.targetContents;\n    target.off(\"pointerdown\", this.onMouseDown);\n    this.removeDragListener();\n    this.stopInertial();\n    pixi_js_1.Ticker.shared.remove(this.onTick);\n  };\n\n  InertialScrollManager.prototype.onMouseDownHandler = function (e) {\n    this.updateDragPos(e);\n    this.isDragging = true;\n    this.speed = 0.0;\n    if (this.tween) this.tween.stop();\n    this.addDragListener();\n  };\n\n  InertialScrollManager.prototype.addDragListener = function () {\n    var target = this.scrollBarView.targetContents;\n    target.on(\"pointermove\", this.onMouseMove);\n    target.on(\"pointerup\", this.onMouseUp);\n    target.on(\"pointerupoutside\", this.onMouseUp);\n  };\n\n  InertialScrollManager.prototype.removeDragListener = function () {\n    var target = this.scrollBarView.targetContents;\n    target.off(\"pointermove\", this.onMouseMove);\n    target.off(\"pointerup\", this.onMouseUp);\n    target.off(\"pointerupoutside\", this.onMouseUp);\n  };\n\n  InertialScrollManager.prototype.getDragPos = function (e) {\n    return SliderView_1.SliderViewUtil.getPosition(e.data.global, this.scrollBarView.isHorizontal);\n  };\n\n  InertialScrollManager.prototype.updateDragPos = function (e) {\n    this.dragPos = this.getDragPos(e);\n  };\n\n  InertialScrollManager.prototype.onMouseMoveHandler = function (e) {\n    var delta = this.getDragPos(e) - this.dragPos;\n    this.speed = delta;\n    this.addTargetPosition(delta * this.getOverflowDeceleration());\n    this.updateDragPos(e);\n  };\n\n  InertialScrollManager.prototype.addTargetPosition = function (delta) {\n    var target = this.scrollBarView.targetContents;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);\n    SliderView_1.SliderViewUtil.setPosition(target, isHorizontal, currentPos + delta);\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n  };\n\n  InertialScrollManager.prototype.onMouseUpHandler = function (e) {\n    this.removeDragListener();\n    this.isDragging = false;\n    this.onTick();\n  };\n  /**\n   * スクロールのオーバーフロー量から、減退率を割り出す。\n   * overflowScrollRange以上に離れている場合は0.0\n   * スクロールエリア内にコンテンツがある場合は1.0を返す。\n   */\n\n\n  InertialScrollManager.prototype.getOverflowDeceleration = function () {\n    var difPos = this.getLeaveRangeFromMask();\n    var overflowDeceleration = (this.overflowScrollRange - difPos) / this.overflowScrollRange;\n    if (overflowDeceleration < 0.0) overflowDeceleration = 0.0;\n    return overflowDeceleration;\n  };\n  /**\n   * ターゲットコンテンツがマスク領域からどれだけ離れているか。\n   */\n\n\n  InertialScrollManager.prototype.getLeaveRangeFromMask = function () {\n    var target = this.scrollBarView.targetContents;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var currentPos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal);\n    var clampedPos = this.getClampedPos();\n    return Math.abs(currentPos - clampedPos);\n  };\n\n  InertialScrollManager.prototype.getClampedPos = function () {\n    var target = this.scrollBarView.targetContents;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    return ScrollBarView_1.ScrollBarViewUtil.getClampedTargetPosition(target, this.scrollBarView.contentsMask, isHorizontal);\n  };\n\n  return InertialScrollManager;\n}(PIXI.utils.EventEmitter);\n\nexports.InertialScrollManager = InertialScrollManager;\n\n//# sourceURL=webpack:///./lib/scrollBar/InertialScrollManager.js?");

/***/ }),

/***/ "./lib/scrollBar/MouseWheelScrollManager.js":
/*!**************************************************!*\
  !*** ./lib/scrollBar/MouseWheelScrollManager.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {\n  Object.defineProperty(o, \"default\", {\n    enumerable: true,\n    value: v\n  });\n} : function (o, v) {\n  o[\"default\"] = v;\n});\n\nvar __importStar = this && this.__importStar || function (mod) {\n  if (mod && mod.__esModule) return mod;\n  var result = {};\n  if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n\n  __setModuleDefault(result, mod);\n\n  return result;\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.MouseWheelScrollManager = void 0;\n\nvar ScrollBarView_1 = __webpack_require__(/*! ./ScrollBarView */ \"./lib/scrollBar/ScrollBarView.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/pixi.es.js\"));\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n\nvar MouseWheelPlugin_1 = __webpack_require__(/*! ../MouseWheelPlugin */ \"./lib/MouseWheelPlugin.js\");\n/**\n * ScrollBarViewを受け取り、マウスホイールによる操作を行うクラス\n */\n\n\nvar MouseWheelScrollManager =\n/** @class */\nfunction (_super) {\n  __extends(MouseWheelScrollManager, _super);\n\n  function MouseWheelScrollManager(scrollBarView) {\n    var _this = _super.call(this) || this;\n\n    _this.delta = 16; //TODO add support deltaX / deltaY\n\n    _this.wheelHandler = function (e) {\n      var shift = e.deltaY > 0 ? -_this.delta : _this.delta;\n\n      _this.scroll(shift);\n    };\n\n    _this.scrollBarView = scrollBarView;\n    var target = _this.scrollBarView.targetContents;\n    target.interactive = true;\n    target.interactiveMousewheel = true;\n\n    _this.start();\n\n    return _this;\n  }\n\n  MouseWheelScrollManager.prototype.start = function () {\n    if (this._isStart) return;\n    var target = this.scrollBarView.targetContents;\n    target.on(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);\n    this._isStart = true;\n  };\n\n  MouseWheelScrollManager.prototype.stop = function () {\n    var target = this.scrollBarView.targetContents;\n    target.off(MouseWheelPlugin_1.MouseWheelPluginEventType.WHEEL, this.wheelHandler);\n    this._isStart = false;\n  };\n\n  MouseWheelScrollManager.prototype.scroll = function (delta) {\n    var target = this.scrollBarView.targetContents;\n    var mask = this.scrollBarView.contentsMask;\n    var isHorizontal = this.scrollBarView.isHorizontal;\n    var pos = SliderView_1.SliderViewUtil.getPosition(target, isHorizontal) + delta;\n    ScrollBarView_1.ScrollBarViewUtil.clampTargetPosition(target, mask, pos, isHorizontal);\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION);\n    this.scrollBarView.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  return MouseWheelScrollManager;\n}(PIXI.utils.EventEmitter);\n\nexports.MouseWheelScrollManager = MouseWheelScrollManager;\n\n//# sourceURL=webpack:///./lib/scrollBar/MouseWheelScrollManager.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarEvent.js":
/*!*****************************************!*\
  !*** ./lib/scrollBar/ScrollBarEvent.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ScrollBarEventType = void 0;\nvar ScrollBarEventType;\n\n(function (ScrollBarEventType) {\n  ScrollBarEventType[\"UPDATE_TARGET_POSITION\"] = \"ScrollBarEventType_UPDATE_TARGET_POSITION\";\n  ScrollBarEventType[\"STOP_INERTIAL_TWEEN\"] = \"ScrollBarEventType_STOP_INERTIAL_TWEEN\";\n})(ScrollBarEventType = exports.ScrollBarEventType || (exports.ScrollBarEventType = {}));\n\n//# sourceURL=webpack:///./lib/scrollBar/ScrollBarEvent.js?");

/***/ }),

/***/ "./lib/scrollBar/ScrollBarView.js":
/*!****************************************!*\
  !*** ./lib/scrollBar/ScrollBarView.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ScrollBarViewUtil = exports.ScrollBarViewInitOption = exports.ScrollBarView = void 0;\n\nvar SliderEvent_1 = __webpack_require__(/*! ../SliderEvent */ \"./lib/SliderEvent.js\");\n\nvar SliderView_1 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar SliderView_2 = __webpack_require__(/*! ../SliderView */ \"./lib/SliderView.js\");\n\nvar MouseWheelScrollManager_1 = __webpack_require__(/*! ./MouseWheelScrollManager */ \"./lib/scrollBar/MouseWheelScrollManager.js\");\n\nvar InertialScrollManager_1 = __webpack_require__(/*! ./InertialScrollManager */ \"./lib/scrollBar/InertialScrollManager.js\");\n\nvar ScrollBarEvent_1 = __webpack_require__(/*! ./ScrollBarEvent */ \"./lib/scrollBar/ScrollBarEvent.js\");\n/**\n * スクロールバーを表すクラスです。\n *\n * このクラスは、スライダーに以下の機能を追加したものです。\n *\n * \t\t1.コンテンツサイズに合わせた、スクロールバーの伸縮\n * \t\t2.スクロールバーの伸縮にあわせた、移動範囲の制限\n * \t\t3.スクロールバーの伸縮にあわせた、移動値の取得\n *\n * 初期設定の注意\n * \t\t スクロール対象とマスクは同一の親をもつこと。\n * \t\t ローカル、グローバルの座標変換は行っていないので別の親をもつとスクロールが破たんします。\n */\n\n\nvar ScrollBarView =\n/** @class */\nfunction (_super) {\n  __extends(ScrollBarView, _super);\n\n  function ScrollBarView(option, scrollOption) {\n    var _this = _super.call(this, option) || this;\n\n    _this.autoHide = false;\n    /**\n     * スライダーイベントに応じてコンテンツをスクロールする\n     * @param {Object} e\n     */\n\n    _this.updateContentsPosition = function (e) {\n      var evt = e;\n\n      _this.updateContentsPositionWithRate(evt.rate);\n    };\n\n    ScrollBarViewInitOption.check(scrollOption);\n    _this.targetContents = scrollOption.targetContents;\n    _this.contentsMask = scrollOption.contentsMask;\n\n    _this.changeRate(option.rate);\n\n    _this.wheelManager = new MouseWheelScrollManager_1.MouseWheelScrollManager(_this);\n\n    _this.wheelManager.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {\n      _this.updateSliderPosition();\n    });\n\n    var inertial = new InertialScrollManager_1.InertialScrollManager(_this);\n    inertial.on(ScrollBarEvent_1.ScrollBarEventType.UPDATE_TARGET_POSITION, function () {\n      _this.updateSliderPosition();\n    });\n    return _this;\n  }\n  /**\n   * 初期化処理\n   * スライダーボタンの位置の初期化に加え、サイズの初期化も行う\n   * @param {SliderViewOption} option\n   */\n\n\n  ScrollBarView.prototype.init = function (option) {\n    _super.prototype.init.call(this, option);\n\n    this.initSliderButton();\n  };\n  /**\n   * スライダーボタンの位置を制限する関数\n   * @return 制限で切り落とされたスライダーボタンの座標値\n   */\n\n\n  ScrollBarView.prototype.limitSliderButtonPosition = function (evt) {\n    var mousePos = this.getMousePosition(this, evt);\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_2.SliderViewUtil.clamp(mousePos, range.max, range.min);\n  };\n  /**\n   * スライダーの割合から、スライダーの位置を取得する\n   * @param\trate\n   * @return\n   */\n\n\n  ScrollBarView.prototype.convertRateToPixel = function (rate) {\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_2.SliderViewUtil.convertRateToPixel(rate, range.max, range.min);\n  };\n  /**\n   * スライダーの座標から、スライダーの割合を取得する\n   * @param\tpixel\n   * @return\n   */\n\n\n  ScrollBarView.prototype.convertPixelToRate = function (pixel) {\n    var range = this.getRangeOfSliderButtonPosition();\n    return SliderView_2.SliderViewUtil.convertPixelToRate(pixel, range.max, range.min);\n  };\n  /**\n   * スライダーボタンの可動範囲を取得する。単位ピクセル\n   */\n\n\n  ScrollBarView.prototype.getRangeOfSliderButtonPosition = function () {\n    var buttonSize = this.slideButtonSize;\n    var max = this._maxPosition - buttonSize / 2;\n    var min = this._minPosition + buttonSize / 2;\n    return {\n      max: max,\n      min: min\n    };\n  };\n\n  Object.defineProperty(ScrollBarView.prototype, \"slideButtonSize\", {\n    /**\n     * スライダーボタンのサイズ。\n     * @returns {number}\n     */\n    get: function () {\n      this.updateSliderSize();\n      return SliderView_2.SliderViewUtil.getSize(this._slideButton, this.isHorizontal);\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * スクロールバーのボタンサイズ及び位置を更新する。\n   * コンテンツサイズが変更された場合の更新にも利用する。\n   */\n\n  ScrollBarView.prototype.initSliderButton = function () {\n    if (!this._slideButton || !this._targetContents || !this._contentsMask) {\n      return;\n    }\n\n    this.updateSliderSize();\n    this.updateSliderPosition();\n    if (this.listeners(SliderEvent_1.SliderEventType.CHANGE).length != 0) return;\n    this.on(SliderEvent_1.SliderEventType.CHANGE, this.updateContentsPosition);\n  };\n  /**\n   * 現状のコンテンツおよびマスク位置から、スライダーの割合を算出する。\n   * その割合でスライダーの位置を更新する。\n   */\n\n\n  ScrollBarView.prototype.updateSliderPosition = function () {\n    var getPos = SliderView_2.SliderViewUtil.getPosition;\n    var zeroPos = getPos(this._contentsMask, this.isHorizontal);\n    var contentsPos = getPos(this._targetContents, this.isHorizontal);\n    var posDif = zeroPos - contentsPos;\n    var getSize = SliderView_2.SliderViewUtil.getSize;\n    var targetSize = getSize(this._targetContents, this.isHorizontal);\n    var maskSize = getSize(this._contentsMask, this.isHorizontal);\n    var sizeDif = targetSize - maskSize;\n    var rate = posDif / sizeDif * SliderView_1.SliderView.MAX_RATE;\n    this.changeRate(rate);\n  };\n  /**\n   * スライダーボタンのサイズの伸縮を行う。\n   */\n\n\n  ScrollBarView.prototype.updateSliderSize = function () {\n    if (!this._targetContents || !this._contentsMask || !this._slideButton) {\n      return;\n    }\n\n    var fullSize = this._maxPosition - this._minPosition;\n    var contentsSize = SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal);\n    var maskSize = SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal);\n    var sliderSize = fullSize * maskSize / contentsSize;\n\n    if (sliderSize > fullSize) {\n      sliderSize = fullSize;\n    }\n\n    SliderView_2.SliderViewUtil.setSize(this._slideButton, this.isHorizontal, sliderSize); //autoHideの条件に一致するかを判定し、表示を切り替える。\n\n    this._slideButton.visible = this._slideButton.interactive = !this.isHide;\n  };\n\n  Object.defineProperty(ScrollBarView.prototype, \"isHide\", {\n    /**\n     * autoHideの条件に一致するかを判定する\n     */\n    get: function () {\n      //autoHideが設定されていない場合は常に表示\n      if (!this.autoHide) return false;\n      var fullSize = this._maxPosition - this._minPosition;\n      var contentsSize = SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal);\n      var maskSize = SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal); //マスク、コンテンツ、スクロール幅のいずれかが0以下の場合スライダーを隠す\n\n      if (contentsSize < 0 || maskSize < 0 || fullSize < 0) {\n        return true;\n      } //マスクサイズとコンテンツサイズが同一の場合スライダーを隠す\n\n\n      return SliderView_2.SliderViewUtil.getSize(this._slideButton, this.isHorizontal) == fullSize;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * rate値を元にコンテンツをスクロールする。\n   * @param {number} rate\n   */\n\n  ScrollBarView.prototype.updateContentsPositionWithRate = function (rate) {\n    var zeroPos = SliderView_2.SliderViewUtil.getPosition(this._contentsMask, this.isHorizontal);\n    var nextPos = zeroPos - rate / SliderView_1.SliderView.MAX_RATE * (SliderView_2.SliderViewUtil.getSize(this._targetContents, this.isHorizontal) - SliderView_2.SliderViewUtil.getSize(this._contentsMask, this.isHorizontal));\n    SliderView_2.SliderViewUtil.setPosition(this._targetContents, this.isHorizontal, nextPos);\n  };\n\n  ScrollBarView.prototype.onPressedSliderButton = function (e) {\n    _super.prototype.onPressedSliderButton.call(this, e);\n\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  ScrollBarView.prototype.onPressBase = function (evt) {\n    if (this.isHide) return;\n\n    _super.prototype.onPressBase.call(this, evt);\n\n    this.emit(ScrollBarEvent_1.ScrollBarEventType.STOP_INERTIAL_TWEEN);\n  };\n\n  Object.defineProperty(ScrollBarView.prototype, \"targetContents\", {\n    get: function () {\n      return this._targetContents;\n    },\n    set: function (value) {\n      this._targetContents = value;\n      this.initSliderButton();\n    },\n    enumerable: false,\n    configurable: true\n  });\n  Object.defineProperty(ScrollBarView.prototype, \"contentsMask\", {\n    get: function () {\n      return this._contentsMask;\n    },\n    set: function (value) {\n      this._contentsMask = value;\n      this.initSliderButton();\n    },\n    enumerable: false,\n    configurable: true\n  });\n\n  ScrollBarView.prototype.onDisposeFunction = function (e) {\n    this.removeListener(SliderEvent_1.SliderEventType.CHANGE, this.updateContentsPosition);\n    this._targetContents = null;\n    this._contentsMask = null;\n\n    _super.prototype.onDisposeFunction.call(this, e);\n  };\n\n  return ScrollBarView;\n}(SliderView_1.SliderView);\n\nexports.ScrollBarView = ScrollBarView;\n/**\n * スクロールバーの初期化時に必須となる項目をまとめたオブジェクト\n * スクロール対象とスクロールエリアのマスクを指定する。\n */\n\nvar ScrollBarViewInitOption =\n/** @class */\nfunction () {\n  function ScrollBarViewInitOption() {}\n\n  ScrollBarViewInitOption.check = function (option) {\n    if (option.targetContents.mask !== option.contentsMask) {\n      console.warn(\"ScrollBarView : スクロールするコンテンツにマスクが設定されていません。\", option.targetContents, option.contentsMask);\n    }\n\n    if (option.contentsMask.parent != option.contentsMask.parent) {\n      console.warn(\"ScrollBarView : スクロールするコンテンツと、そのマスクは表示ツリー上で同一の親Containerを持っている必要があります。\", option.targetContents, option.contentsMask);\n    }\n\n    if (option.targetContents.getLocalBounds() === null) {\n      throw new Error(\"ScrollBarView : 初期化オプションで指定されたtargetContentsにバウンディングボックスが存在しません。\" + \"ShapeやContainerを利用する場合はsetBounds関数を利用して\" + \"バウンディングボックスを手動で設定してください。\");\n    }\n\n    if (option.contentsMask.getLocalBounds() === null) {\n      throw new Error(\"ScrollBarView : 初期化オプションで指定されたcontentsMaskにバウンディングボックスが存在しません。\" + \"Shapeを利用する場合はsetBounds関数を利用して\" + \"バウンディングボックスを手動で設定してください。\");\n    }\n  };\n\n  return ScrollBarViewInitOption;\n}();\n\nexports.ScrollBarViewInitOption = ScrollBarViewInitOption;\n\nvar ScrollBarViewUtil =\n/** @class */\nfunction () {\n  function ScrollBarViewUtil() {}\n  /**\n   * ターゲットコンテンツが、マスク領域内に収まる座標値を取得する。\n   * @param target\n   * @param mask\n   * @param isHorizontal\n   */\n\n\n  ScrollBarViewUtil.getClampedTargetPosition = function (target, mask, isHorizontal) {\n    var getSize = SliderView_2.SliderViewUtil.getSize;\n    var targetSize = getSize(target, isHorizontal);\n    var maskSize = getSize(mask, isHorizontal);\n    var minPos = Math.min(-targetSize + maskSize, 0.0);\n    var pos = SliderView_2.SliderViewUtil.getPosition(target, isHorizontal);\n    return SliderView_2.SliderViewUtil.clamp(pos, 0, minPos);\n  };\n  /**\n   * ターゲットコンテンツの位置を、マスク領域内に丸め込む。\n   * @param target\n   * @param mask\n   * @param position\n   * @param isHorizontal\n   */\n\n\n  ScrollBarViewUtil.clampTargetPosition = function (target, mask, position, isHorizontal) {\n    SliderView_2.SliderViewUtil.setPosition(target, isHorizontal, position);\n    var clampedPos = this.getClampedTargetPosition(target, mask, isHorizontal);\n    SliderView_2.SliderViewUtil.setPosition(target, isHorizontal, clampedPos);\n  };\n\n  return ScrollBarViewUtil;\n}();\n\nexports.ScrollBarViewUtil = ScrollBarViewUtil;\n\n//# sourceURL=webpack:///./lib/scrollBar/ScrollBarView.js?");

/***/ })

/******/ });