/**
 * based on https://github.com/Mwni/pixi-mousewheel
 */

import { Application, DisplayObject } from "pixi.js";

class MousewheelPlugin {
  private app: Application;

  //TODO イベントをwheelに一本化
  constructor(app) {
    this.app = app;

    this.app.view.addEventListener("mousewheel", this.eventHandler, {
      passive: false
    });
    this.app.view.addEventListener("DOMMouseScroll", this.eventHandler, {
      passive: false
    });
  }

  eventHandler = e => {
    this.onMouseWheel(e);
  };

  onMouseWheel(e) {
    let target = this.findScrollTarget({ x: e.offsetX, y: e.offsetY });

    if (target) {
      e.preventDefault();
      target.emit("mousewheel", this.deriveNormalizedWheelDelta(e), e);
    }
  }

  findScrollTarget(pos) {
    const hit = this.app.renderer.plugins.interaction.hitTest(pos);

    if (hit && hit["interactiveMousewheel"]) return hit;
  }

  deriveNormalizedWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  destroy() {
    this.app.view.removeEventListener("mousewheel", this.eventHandler);
    this.app.view.removeEventListener("DOMMouseScroll", this.eventHandler);
  }
}

export function initPlugin() {
  Object.defineProperty(DisplayObject.prototype, "interactiveMousewheel", {
    get: function() {
      return this._interactiveMousewheel;
    },
    set: function(enabled) {
      this._interactiveMousewheel = enabled;

      if (enabled && !this.interactive) {
        this.interactive = true;
      }
    }
  });

  Application.registerPlugin({
    init: function(options) {
      this._mousewheelPlugin = new MousewheelPlugin(this);
    },
    destroy: function() {
      this._mousewheelPlugin.destroy();
    }
  });
}