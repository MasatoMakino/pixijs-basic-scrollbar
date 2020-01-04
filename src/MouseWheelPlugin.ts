/**
 * based on https://github.com/Mwni/pixi-mousewheel
 */

import { Application, DisplayObject } from "pixi.js";

export enum MouseWheelPluginEventType {
  WHEEL = "wheel"
}

export interface MouseWheelDisplayObject extends DisplayObject {
  interactiveMousewheel: boolean;
}

class MousewheelPlugin {
  private app: Application;

  constructor(app) {
    this.app = app;
    this.app.view.addEventListener("wheel", this.eventHandler, {
      passive: false
    });
  }

  eventHandler = e => {
    this.onMouseWheel(e);
  };

  onMouseWheel(e) {
    const target = this.findScrollTarget({ x: e.offsetX, y: e.offsetY });

    if (!target) return;
    e.preventDefault();
    target.emit(MouseWheelPluginEventType.WHEEL, e);
  }

  findScrollTarget(pos): MouseWheelDisplayObject {
    const hit = this.app.renderer.plugins.interaction.hitTest(pos);

    if (hit && hit["interactiveMousewheel"]) {
      return hit as MouseWheelDisplayObject;
    }
  }

  destroy() {
    this.app.view.removeEventListener("wheel", this.eventHandler);
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
