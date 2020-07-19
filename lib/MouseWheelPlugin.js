"use strict";
/**
 * based on https://github.com/Mwni/pixi-mousewheel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPlugin = exports.MouseWheelPluginEventType = void 0;
var pixi_js_1 = require("pixi.js");
var MouseWheelPluginEventType;
(function (MouseWheelPluginEventType) {
    MouseWheelPluginEventType["WHEEL"] = "wheel";
})(MouseWheelPluginEventType = exports.MouseWheelPluginEventType || (exports.MouseWheelPluginEventType = {}));
var MousewheelPlugin = /** @class */ (function () {
    function MousewheelPlugin(app) {
        var _this = this;
        this.eventHandler = function (e) {
            _this.onMouseWheel(e);
        };
        this.app = app;
        this.app.view.addEventListener("wheel", this.eventHandler, {
            passive: false
        });
    }
    MousewheelPlugin.prototype.onMouseWheel = function (e) {
        var target = this.findScrollTarget({ x: e.offsetX, y: e.offsetY });
        if (!target)
            return;
        e.preventDefault();
        target.emit(MouseWheelPluginEventType.WHEEL, e);
    };
    MousewheelPlugin.prototype.findScrollTarget = function (pos) {
        var hit = this.app.renderer.plugins.interaction.hitTest(pos);
        if (hit && hit["interactiveMousewheel"]) {
            return hit;
        }
    };
    MousewheelPlugin.prototype.destroy = function () {
        this.app.view.removeEventListener("wheel", this.eventHandler);
    };
    return MousewheelPlugin;
}());
function initPlugin() {
    Object.defineProperty(pixi_js_1.DisplayObject.prototype, "interactiveMousewheel", {
        get: function () {
            return this._interactiveMousewheel;
        },
        set: function (enabled) {
            this._interactiveMousewheel = enabled;
            if (enabled && !this.interactive) {
                this.interactive = true;
            }
        }
    });
    pixi_js_1.Application.registerPlugin({
        init: function (options) {
            this._mousewheelPlugin = new MousewheelPlugin(this);
        },
        destroy: function () {
            this._mousewheelPlugin.destroy();
        }
    });
}
exports.initPlugin = initPlugin;
