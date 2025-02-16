"use strict";(self.webpackChunk_masatomakino_pixijs_basic_scrollbar=self.webpackChunk_masatomakino_pixijs_basic_scrollbar||[]).push([[643],{4643:(e,t,i)=>{var n=i(8507),o=i(5815),s=i(7566),r=/iPhone/i,a=/iPod/i,h=/iPad/i,l=/\biOS-universal(?:.+)Mac\b/i,c=/\bAndroid(?:.+)Mobile\b/i,d=/Android/i,p=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,u=/Silk/i,v=/Windows Phone/i,m=/\bWindows(?:.+)ARM\b/i,g=/BlackBerry/i,y=/BB10/i,_=/Opera Mini/i,b=/\b(CriOS|Chrome)(?:.+)Mobile/i,E=/Mobile(?:.+)Firefox\b/i,f=function(e){return void 0!==e&&"MacIntel"===e.platform&&"number"==typeof e.maxTouchPoints&&e.maxTouchPoints>1&&"undefined"==typeof MSStream};function T(e){var t={userAgent:"",platform:"",maxTouchPoints:0};e||"undefined"==typeof navigator?"string"==typeof e?t.userAgent=e:e&&e.userAgent&&(t={userAgent:e.userAgent,platform:e.platform,maxTouchPoints:e.maxTouchPoints||0}):t={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0};var i=t.userAgent,n=i.split("[FBAN");void 0!==n[1]&&(i=n[0]),void 0!==(n=i.split("Twitter"))[1]&&(i=n[0]);var o=function(e){return function(t){return t.test(e)}}(i),s={apple:{phone:o(r)&&!o(v),ipod:o(a),tablet:!o(r)&&(o(h)||f(t))&&!o(v),universal:o(l),device:(o(r)||o(a)||o(h)||o(l)||f(t))&&!o(v)},amazon:{phone:o(p),tablet:!o(p)&&o(u),device:o(p)||o(u)},android:{phone:!o(v)&&o(p)||!o(v)&&o(c),tablet:!o(v)&&!o(p)&&!o(c)&&(o(u)||o(d)),device:!o(v)&&(o(p)||o(u)||o(c)||o(d))||o(/\bokhttp\b/i)},windows:{phone:o(v),tablet:o(m),device:o(v)||o(m)},other:{blackberry:o(g),blackberry10:o(y),opera:o(_),firefox:o(E),chrome:o(b),device:o(g)||o(y)||o(_)||o(E)||o(b)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}const P=(T.default??T)(globalThis.navigator);var w=i(9903);const M=class e{constructor(e,t=P){this._mobileInfo=t,this.debug=!1,this._activateOnTab=!0,this._deactivateOnMouseMove=!0,this._isActive=!1,this._isMobileAccessibility=!1,this._div=null,this._pool=[],this._renderId=0,this._children=[],this._androidUpdateCount=0,this._androidUpdateFrequency=500,this._hookDiv=null,(t.tablet||t.phone)&&this._createTouchHook(),this._renderer=e}get isActive(){return this._isActive}get isMobileAccessibility(){return this._isMobileAccessibility}get hookDiv(){return this._hookDiv}_createTouchHook(){const e=document.createElement("button");e.style.width="1px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.left="-1000px",e.style.zIndex=2..toString(),e.style.backgroundColor="#FF0000",e.title="select to enable accessibility for this content",e.addEventListener("focus",(()=>{this._isMobileAccessibility=!0,this._activate(),this._destroyTouchHook()})),document.body.appendChild(e),this._hookDiv=e}_destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}_activate(){if(this._isActive)return;this._isActive=!0,this._div||(this._div=document.createElement("div"),this._div.style.width="100px",this._div.style.height="100px",this._div.style.position="absolute",this._div.style.top="0px",this._div.style.left="0px",this._div.style.zIndex=2..toString(),this._div.style.pointerEvents="none"),this._activateOnTab&&(this._onKeyDown=this._onKeyDown.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)),this._deactivateOnMouseMove&&(this._onMouseMove=this._onMouseMove.bind(this),globalThis.document.addEventListener("mousemove",this._onMouseMove,!0));const e=this._renderer.view.canvas;if(e.parentNode)e.parentNode.appendChild(this._div),this._initAccessibilitySetup();else{const t=new MutationObserver((()=>{e.parentNode&&(e.parentNode.appendChild(this._div),t.disconnect(),this._initAccessibilitySetup())}));t.observe(document.body,{childList:!0,subtree:!0})}}_initAccessibilitySetup(){this._renderer.runners.postrender.add(this),this._renderer.lastObjectRendered&&this._updateAccessibleObjects(this._renderer.lastObjectRendered)}_deactivate(){if(this._isActive&&!this._isMobileAccessibility){this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),this._activateOnTab&&globalThis.addEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.remove(this);for(const e of this._children)e._accessibleDiv&&e._accessibleDiv.parentNode&&(e._accessibleDiv.parentNode.removeChild(e._accessibleDiv),e._accessibleDiv=null),e._accessibleActive=!1;this._pool.forEach((e=>{e.parentNode&&e.parentNode.removeChild(e)})),this._div&&this._div.parentNode&&this._div.parentNode.removeChild(this._div),this._pool=[],this._children=[]}}_updateAccessibleObjects(e){if(!e.visible||!e.accessibleChildren)return;e.accessible&&(e._accessibleActive||this._addChild(e),e._renderId=this._renderId);const t=e.children;if(t)for(let e=0;e<t.length;e++)this._updateAccessibleObjects(t[e])}init(t){const i={accessibilityOptions:{...e.defaultOptions,...t?.accessibilityOptions||{}}};this.debug=i.accessibilityOptions.debug,this._activateOnTab=i.accessibilityOptions.activateOnTab,this._deactivateOnMouseMove=i.accessibilityOptions.deactivateOnMouseMove,i.accessibilityOptions.enabledByDefault?this._activate():this._activateOnTab&&(this._onKeyDown=this._onKeyDown.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)),this._renderer.runners.postrender.remove(this)}postrender(){const e=performance.now();if(this._mobileInfo.android.device&&e<this._androidUpdateCount)return;if(this._androidUpdateCount=e+this._androidUpdateFrequency,!this._renderer.renderingToScreen||!this._renderer.view.canvas)return;const t=new Set;if(this._renderer.lastObjectRendered){this._updateAccessibleObjects(this._renderer.lastObjectRendered);for(const e of this._children)e._renderId===this._renderId&&t.add(this._children.indexOf(e))}for(let e=this._children.length-1;e>=0;e--){const i=this._children[e];t.has(e)||(i._accessibleDiv&&i._accessibleDiv.parentNode&&(i._accessibleDiv.parentNode.removeChild(i._accessibleDiv),this._pool.push(i._accessibleDiv),i._accessibleDiv=null),i._accessibleActive=!1,(0,w.d)(this._children,e,1))}if(this._renderer.renderingToScreen){const{x:e,y:t,width:i,height:n}=this._renderer.screen,o=this._div;o.style.left=`${e}px`,o.style.top=`${t}px`,o.style.width=`${i}px`,o.style.height=`${n}px`}for(let e=0;e<this._children.length;e++){const t=this._children[e];if(!t._accessibleActive||!t._accessibleDiv)continue;const i=t._accessibleDiv,n=t.hitArea||t.getBounds().rectangle;if(t.hitArea){const e=t.worldTransform,o=this._renderer.resolution,s=this._renderer.resolution;i.style.left=(e.tx+n.x*e.a)*o+"px",i.style.top=(e.ty+n.y*e.d)*s+"px",i.style.width=n.width*e.a*o+"px",i.style.height=n.height*e.d*s+"px"}else{this._capHitArea(n);const e=this._renderer.resolution,t=this._renderer.resolution;i.style.left=n.x*e+"px",i.style.top=n.y*t+"px",i.style.width=n.width*e+"px",i.style.height=n.height*t+"px"}}this._renderId++}_updateDebugHTML(e){e.innerHTML=`type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`}_capHitArea(e){e.x<0&&(e.width+=e.x,e.x=0),e.y<0&&(e.height+=e.y,e.y=0);const{width:t,height:i}=this._renderer;e.x+e.width>t&&(e.width=t-e.x),e.y+e.height>i&&(e.height=i-e.y)}_addChild(e){let t=this._pool.pop();t||("button"===e.accessibleType?t=document.createElement("button"):(t=document.createElement(e.accessibleType),t.style.cssText="\n                        color: transparent;\n                        pointer-events: none;\n                        padding: 0;\n                        margin: 0;\n                        border: 0;\n                        outline: 0;\n                        background: transparent;\n                        box-sizing: border-box;\n                        user-select: none;\n                        -webkit-user-select: none;\n                        -moz-user-select: none;\n                        -ms-user-select: none;\n                    ",e.accessibleText&&(t.innerText=e.accessibleText)),t.style.width="100px",t.style.height="100px",t.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",t.style.position="absolute",t.style.zIndex=2..toString(),t.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?t.setAttribute("aria-live","off"):t.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?t.setAttribute("aria-relevant","additions"):t.setAttribute("aria-relevant","text"),t.addEventListener("click",this._onClick.bind(this)),t.addEventListener("focus",this._onFocus.bind(this)),t.addEventListener("focusout",this._onFocusOut.bind(this))),t.style.pointerEvents=e.accessiblePointerEvents,t.type=e.accessibleType,e.accessibleTitle&&null!==e.accessibleTitle?t.title=e.accessibleTitle:e.accessibleHint&&null!==e.accessibleHint||(t.title=`container ${e.tabIndex}`),e.accessibleHint&&null!==e.accessibleHint&&t.setAttribute("aria-label",e.accessibleHint),this.debug&&this._updateDebugHTML(t),e._accessibleActive=!0,e._accessibleDiv=t,t.container=e,this._children.push(e),this._div.appendChild(e._accessibleDiv),e.interactive&&(e._accessibleDiv.tabIndex=e.tabIndex)}_dispatchEvent(e,t){const{container:i}=e.target,n=this._renderer.events.rootBoundary,o=Object.assign(new s.N(n),{target:i});n.rootTarget=this._renderer.lastObjectRendered,t.forEach((e=>n.dispatchEvent(o,e)))}_onClick(e){this._dispatchEvent(e,["click","pointertap","tap"])}_onFocus(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","assertive"),this._dispatchEvent(e,["mouseover"])}_onFocusOut(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","polite"),this._dispatchEvent(e,["mouseout"])}_onKeyDown(e){9===e.keyCode&&this._activateOnTab&&this._activate()}_onMouseMove(e){0===e.movementX&&0===e.movementY||this._deactivate()}destroy(){this._deactivate(),this._destroyTouchHook(),this._div=null,this._pool=null,this._children=null,this._renderer=null,this._activateOnTab&&globalThis.removeEventListener("keydown",this._onKeyDown)}setAccessibilityEnabled(e){e?this._activate():this._deactivate()}};M.extension={type:[n.Ag.WebGLSystem,n.Ag.WebGPUSystem],name:"accessibility"},M.defaultOptions={enabledByDefault:!1,debug:!1,activateOnTab:!0,deactivateOnMouseMove:!0};let A=M;n.XO.add(A),n.XO.mixin(o.mc,{accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:null,accessibleType:"button",accessibleText:null,accessiblePointerEvents:"auto",accessibleChildren:!0,_renderId:-1}),i(4732);var O=i(8875),D=i(5101),k=i(268),x=i(4458),I=i(7309);const L=new class{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){!this._tickerAdded&&this.domElement&&(I.R.system.add(this._tickerUpdate,this,x.d.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(I.R.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove)return void(this._didMove=!1);const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&"touch"===e.pointerType||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY,pointerType:e.pointerType,pointerId:e.pointerId}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,this._deltaTime<this.interactionFrequency||(this._deltaTime=0,this._update())}};var B=i(3285),C=i(4935);class S extends B._{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}S.DOM_DELTA_PIXEL=0,S.DOM_DELTA_LINE=1,S.DOM_DELTA_PAGE=2;const U=new D.b,R=new D.b;class F{constructor(e){this.dispatch=new O.A,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort(((e,t)=>e.priority-t.priority))}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let i=0,n=t.length;i<n;i++)t[i].fn(e);else(0,k.R)(`[EventBoundary]: Event mapping not defined for ${e.type}`)}hitTest(e,t){L.pauseUpdate=!0;const i=this[this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive"](this.rootTarget,this.rootTarget.eventMode,U.set(e,t),this.hitTestFn,this.hitPruneFn);return i&&i[0]}propagate(e,t){if(!e.target)return;const i=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let n=0,o=i.length-1;n<o;n++)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!e.propagationStopped&&!e.propagationImmediatelyStopped){e.eventPhase=e.BUBBLING_PHASE;for(let n=i.length-2;n>=0;n--)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,i=this._allInteractiveElements){if(0===i.length)return;e.eventPhase=e.BUBBLING_PHASE;const n=Array.isArray(t)?t:[t];for(let t=i.length-1;t>=0;t--)n.forEach((n=>{e.currentTarget=i[t],this.notifyTarget(e,n)}))}propagationPath(e){const t=[e];for(let i=0;i<2048&&e!==this.rootTarget&&e.parent;i++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,i,n,o,s=!1){let r=!1;if(this._interactivePrune(e))return null;if("dynamic"!==e.eventMode&&"dynamic"!==t||(L.pauseUpdate=!1),e.interactiveChildren&&e.children){const a=e.children;for(let h=a.length-1;h>=0;h--){const l=a[h],c=this.hitTestMoveRecursive(l,this._isInteractive(t)?t:l.eventMode,i,n,o,s||o(e,i));if(c){if(c.length>0&&!c[c.length-1].parent)continue;const t=e.isInteractive();(c.length>0||t)&&(t&&this._allInteractiveElements.push(e),c.push(e)),0===this._hitElements.length&&(this._hitElements=c),r=!0}}}const a=this._isInteractive(t),h=e.isInteractive();return h&&h&&this._allInteractiveElements.push(e),s||this._hitElements.length>0?null:r?this._hitElements:a&&!o(e,i)&&n(e,i)?h?[e]:[]:null}hitTestRecursive(e,t,i,n,o){if(this._interactivePrune(e)||o(e,i))return null;if("dynamic"!==e.eventMode&&"dynamic"!==t||(L.pauseUpdate=!1),e.interactiveChildren&&e.children){const s=e.children,r=i;for(let i=s.length-1;i>=0;i--){const a=s[i],h=this.hitTestRecursive(a,this._isInteractive(t)?t:a.eventMode,r,n,o);if(h){if(h.length>0&&!h[h.length-1].parent)continue;const t=e.isInteractive();return(h.length>0||t)&&h.push(e),h}}}const s=this._isInteractive(t),r=e.isInteractive();return s&&n(e,i)?r?[e]:[]:null}_isInteractive(e){return"static"===e||"dynamic"===e}_interactivePrune(e){return!(e&&e.visible&&e.renderable&&e.measurable)||"none"===e.eventMode||"passive"===e.eventMode&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,R),!e.hitArea.contains(R.x,R.y)))return!0;if(e.effects&&e.effects.length)for(let i=0;i<e.effects.length;i++){const n=e.effects[i];if(n.containsPoint&&!n.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){return!!e.hitArea||!!e?.containsPoint&&(e.worldTransform.applyInverse(t,R),e.containsPoint(R))}notifyTarget(e,t){if(!e.currentTarget.isInteractive())return;t??(t=e.type);const i=`on${t}`;e.currentTarget[i]?.(e);const n=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,n),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),"touch"===t.pointerType)this.dispatchEvent(t,"touchstart");else if("mouse"===t.pointerType||"pen"===t.pointerType){const e=2===t.button;this.dispatchEvent(t,e?"rightdown":"mousedown")}this.trackingData(e.pointerId).pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const t=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const i="mouse"===t.pointerType||"pen"===t.pointerType,n=this.trackingData(e.pointerId),o=this.findMountedTarget(n.overTargets);if(n.overTargets?.length>0&&o!==t.target){const n="mousemove"===e.type?"mouseout":"pointerout",s=this.createPointerEvent(e,n,o);if(this.dispatchEvent(s,"pointerout"),i&&this.dispatchEvent(s,"mouseout"),!t.composedPath().includes(o)){const n=this.createPointerEvent(e,"pointerleave",o);for(n.eventPhase=n.AT_TARGET;n.target&&!t.composedPath().includes(n.target);)n.currentTarget=n.target,this.notifyTarget(n),i&&this.notifyTarget(n,"mouseleave"),n.target=n.target.parent;this.freeEvent(n)}this.freeEvent(s)}if(o!==t.target){const n="mousemove"===e.type?"mouseover":"pointerover",s=this.clonePointerEvent(t,n);this.dispatchEvent(s,"pointerover"),i&&this.dispatchEvent(s,"mouseover");let r=o?.parent;for(;r&&r!==this.rootTarget.parent&&r!==t.target;)r=r.parent;if(!r||r===this.rootTarget.parent){const e=this.clonePointerEvent(t,"pointerenter");for(e.eventPhase=e.AT_TARGET;e.target&&e.target!==o&&e.target!==this.rootTarget.parent;)e.currentTarget=e.target,this.notifyTarget(e),i&&this.notifyTarget(e,"mouseenter"),e.target=e.target.parent;this.freeEvent(e)}this.freeEvent(s)}const s=[],r=this.enableGlobalMoveEvents??!0;this.moveOnAll?s.push("pointermove"):this.dispatchEvent(t,"pointermove"),r&&s.push("globalpointermove"),"touch"===t.pointerType&&(this.moveOnAll?s.splice(1,0,"touchmove"):this.dispatchEvent(t,"touchmove"),r&&s.push("globaltouchmove")),i&&(this.moveOnAll?s.splice(1,0,"mousemove"):this.dispatchEvent(t,"mousemove"),r&&s.push("globalmousemove"),this.cursor=t.target?.cursor),s.length>0&&this.all(t,s),this._allInteractiveElements.length=0,this._hitElements.length=0,n.overTargets=t.composedPath(),this.freeEvent(t)}mapPointerOver(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");const t=this.trackingData(e.pointerId),i=this.createPointerEvent(e),n="mouse"===i.pointerType||"pen"===i.pointerType;this.dispatchEvent(i,"pointerover"),n&&this.dispatchEvent(i,"mouseover"),"mouse"===i.pointerType&&(this.cursor=i.target?.cursor);const o=this.clonePointerEvent(i,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),n&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;t.overTargets=i.composedPath(),this.freeEvent(i),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");const t=this.trackingData(e.pointerId);if(t.overTargets){const i="mouse"===e.pointerType||"pen"===e.pointerType,n=this.findMountedTarget(t.overTargets),o=this.createPointerEvent(e,"pointerout",n);this.dispatchEvent(o),i&&this.dispatchEvent(o,"mouseout");const s=this.createPointerEvent(e,"pointerleave",n);for(s.eventPhase=s.AT_TARGET;s.target&&s.target!==this.rootTarget.parent;)s.currentTarget=s.target,this.notifyTarget(s),i&&this.notifyTarget(s,"mouseleave"),s.target=s.target.parent;t.overTargets=null,this.freeEvent(o),this.freeEvent(s)}this.cursor=null}mapPointerUp(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");const t=performance.now(),i=this.createPointerEvent(e);if(this.dispatchEvent(i,"pointerup"),"touch"===i.pointerType)this.dispatchEvent(i,"touchend");else if("mouse"===i.pointerType||"pen"===i.pointerType){const e=2===i.button;this.dispatchEvent(i,e?"rightup":"mouseup")}const n=this.trackingData(e.pointerId),o=this.findMountedTarget(n.pressTargetsByButton[e.button]);let s=o;if(o&&!i.composedPath().includes(o)){let t=o;for(;t&&!i.composedPath().includes(t);){if(i.currentTarget=t,this.notifyTarget(i,"pointerupoutside"),"touch"===i.pointerType)this.notifyTarget(i,"touchendoutside");else if("mouse"===i.pointerType||"pen"===i.pointerType){const e=2===i.button;this.notifyTarget(i,e?"rightupoutside":"mouseupoutside")}t=t.parent}delete n.pressTargetsByButton[e.button],s=t}if(s){const o=this.clonePointerEvent(i,"click");o.target=s,o.path=null,n.clicksByButton[e.button]||(n.clicksByButton[e.button]={clickCount:0,target:o.target,timeStamp:t});const r=n.clicksByButton[e.button];if(r.target===o.target&&t-r.timeStamp<200?++r.clickCount:r.clickCount=1,r.target=o.target,r.timeStamp=t,o.detail=r.clickCount,"mouse"===o.pointerType){const e=2===o.button;this.dispatchEvent(o,e?"rightclick":"click")}else"touch"===o.pointerType&&this.dispatchEvent(o,"tap");this.dispatchEvent(o,"pointertap"),this.freeEvent(o)}this.freeEvent(i)}mapPointerUpOutside(e){if(!(e instanceof C.A))return void(0,k.R)("EventBoundary cannot map a non-pointer event as a pointer event");const t=this.trackingData(e.pointerId),i=this.findMountedTarget(t.pressTargetsByButton[e.button]),n=this.createPointerEvent(e);if(i){let o=i;for(;o;)n.currentTarget=o,this.notifyTarget(n,"pointerupoutside"),"touch"===n.pointerType?this.notifyTarget(n,"touchendoutside"):"mouse"!==n.pointerType&&"pen"!==n.pointerType||this.notifyTarget(n,2===n.button?"rightupoutside":"mouseupoutside"),o=o.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(n)}mapWheel(e){if(!(e instanceof S))return void(0,k.R)("EventBoundary cannot map a non-wheel event as a wheel event");const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let i=1;i<e.length&&e[i].parent===t;i++)t=e[i];return t}createPointerEvent(e,t,i){const n=this.allocateEvent(C.A);return this.copyPointerData(e,n),this.copyMouseData(e,n),this.copyData(e,n),n.nativeEvent=e.nativeEvent,n.originalEvent=e,n.target=i??this.hitTest(n.global.x,n.global.y)??this._hitElements[0],"string"==typeof t&&(n.type=t),n}createWheelEvent(e){const t=this.allocateEvent(S);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const i=this.allocateEvent(C.A);return i.nativeEvent=e.nativeEvent,i.originalEvent=e.originalEvent,this.copyPointerData(e,i),this.copyMouseData(e,i),this.copyData(e,i),i.target=e.target,i.path=e.composedPath().slice(),i.type=t??i.type,i}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof C.A&&t instanceof C.A&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof B._&&t instanceof B._&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.defaultPrevented=!1,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const i=e.currentTarget._events[t];if(i)if("fn"in i)i.once&&e.currentTarget.removeListener(t,i.fn,void 0,!0),i.fn.call(i.context,e);else for(let n=0,o=i.length;n<o&&!e.propagationImmediatelyStopped;n++)i[n].once&&e.currentTarget.removeListener(t,i[n].fn,void 0,!0),i[n].fn.call(i[n].context,e)}}const X={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},N=class e{constructor(t){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=t,this.rootBoundary=new F(null),L.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new C.A(null),this._rootWheelEvent=new S(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...e.defaultEventFeatures},{set:(e,t,i)=>("globalMove"===t&&(this.rootBoundary.enableGlobalMoveEvents=i),e[t]=i,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(t){const{canvas:i,resolution:n}=this.renderer;this.setTargetElement(i),this.resolution=n,e._defaultEventMode=t.eventMode??"passive",Object.assign(this.features,t.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(e){this.resolution=e}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(e){e||(e="default");let t=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(t=!1),this._currentCursor===e)return;this._currentCursor=e;const i=this.cursorStyles[e];if(i)switch(typeof i){case"string":t&&(this.domElement.style.cursor=i);break;case"function":i(e);break;case"object":t&&Object.assign(this.domElement.style,i)}else t&&"string"==typeof e&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,e)&&(this.domElement.style.cursor=e)}get pointer(){return this._rootPointerEvent}_onPointerDown(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const t=this._normalizeToPointerData(e);this.autoPreventDefault&&t[0].isNormalized&&(e.cancelable||!("cancelable"in e))&&e.preventDefault();for(let e=0,i=t.length;e<i;e++){const i=t[e],n=this._bootstrapEvent(this._rootPointerEvent,i);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(e){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,L.pointerMoved();const t=this._normalizeToPointerData(e);for(let e=0,i=t.length;e<i;e++){const i=this._bootstrapEvent(this._rootPointerEvent,t[e]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let t=e.target;e.composedPath&&e.composedPath().length>0&&(t=e.composedPath()[0]);const i=t!==this.domElement?"outside":"",n=this._normalizeToPointerData(e);for(let e=0,t=n.length;e<t;e++){const t=this._bootstrapEvent(this._rootPointerEvent,n[e]);t.type+=i,this.rootBoundary.mapEvent(t)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(e){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const t=this._normalizeToPointerData(e);for(let e=0,i=t.length;e<i;e++){const i=this._bootstrapEvent(this._rootPointerEvent,t[e]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onWheel(e){if(!this.features.wheel)return;const t=this.normalizeWheelEvent(e);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(t)}setTargetElement(e){this._removeEvents(),this.domElement=e,L.domElement=e,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;L.addTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="none",e.msTouchAction="none"):this.supportsPointerEvents&&(e.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;L.removeTickerListener();const e=this.domElement.style;e&&(globalThis.navigator.msPointerEnabled?(e.msContentZooming="",e.msTouchAction=""):this.supportsPointerEvents&&(e.touchAction="")),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(e,t,i){const n=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},o=1/this.resolution;e.x=(t-n.left)*(this.domElement.width/n.width)*o,e.y=(i-n.top)*(this.domElement.height/n.height)*o}_normalizeToPointerData(e){const t=[];if(this.supportsTouchEvents&&e instanceof TouchEvent)for(let i=0,n=e.changedTouches.length;i<n;i++){const n=e.changedTouches[i];void 0===n.button&&(n.button=0),void 0===n.buttons&&(n.buttons=1),void 0===n.isPrimary&&(n.isPrimary=1===e.touches.length&&"touchstart"===e.type),void 0===n.width&&(n.width=n.radiusX||1),void 0===n.height&&(n.height=n.radiusY||1),void 0===n.tiltX&&(n.tiltX=0),void 0===n.tiltY&&(n.tiltY=0),void 0===n.pointerType&&(n.pointerType="touch"),void 0===n.pointerId&&(n.pointerId=n.identifier||0),void 0===n.pressure&&(n.pressure=n.force||.5),void 0===n.twist&&(n.twist=0),void 0===n.tangentialPressure&&(n.tangentialPressure=0),void 0===n.layerX&&(n.layerX=n.offsetX=n.clientX),void 0===n.layerY&&(n.layerY=n.offsetY=n.clientY),n.isNormalized=!0,n.type=e.type,t.push(n)}else if(!globalThis.MouseEvent||e instanceof MouseEvent&&!(this.supportsPointerEvents&&e instanceof globalThis.PointerEvent)){const i=e;void 0===i.isPrimary&&(i.isPrimary=!0),void 0===i.width&&(i.width=1),void 0===i.height&&(i.height=1),void 0===i.tiltX&&(i.tiltX=0),void 0===i.tiltY&&(i.tiltY=0),void 0===i.pointerType&&(i.pointerType="mouse"),void 0===i.pointerId&&(i.pointerId=1),void 0===i.pressure&&(i.pressure=.5),void 0===i.twist&&(i.twist=0),void 0===i.tangentialPressure&&(i.tangentialPressure=0),i.isNormalized=!0,t.push(i)}else t.push(e);return t}normalizeWheelEvent(e){const t=this._rootWheelEvent;return this._transferMouseData(t,e),t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ,t.deltaMode=e.deltaMode,this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.nativeEvent=e,t.type=e.type,t}_bootstrapEvent(e,t){return e.originalEvent=null,e.nativeEvent=t,e.pointerId=t.pointerId,e.width=t.width,e.height=t.height,e.isPrimary=t.isPrimary,e.pointerType=t.pointerType,e.pressure=t.pressure,e.tangentialPressure=t.tangentialPressure,e.tiltX=t.tiltX,e.tiltY=t.tiltY,e.twist=t.twist,this._transferMouseData(e,t),this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.isTrusted=t.isTrusted,"pointerleave"===e.type&&(e.type="pointerout"),e.type.startsWith("mouse")&&(e.type=e.type.replace("mouse","pointer")),e.type.startsWith("touch")&&(e.type=X[e.type]||e.type),e}_transferMouseData(e,t){e.isTrusted=t.isTrusted,e.srcElement=t.srcElement,e.timeStamp=performance.now(),e.type=t.type,e.altKey=t.altKey,e.button=t.button,e.buttons=t.buttons,e.client.x=t.clientX,e.client.y=t.clientY,e.ctrlKey=t.ctrlKey,e.metaKey=t.metaKey,e.movement.x=t.movementX,e.movement.y=t.movementY,e.page.x=t.pageX,e.page.y=t.pageY,e.relatedTarget=null,e.shiftKey=t.shiftKey}};N.extension={name:"events",type:[n.Ag.WebGLSystem,n.Ag.CanvasSystem,n.Ag.WebGPUSystem],priority:-1},N.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};let j=N;const K={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return"dynamic"===this.eventMode||"static"===this.eventMode},set interactive(e){this.eventMode=e?"static":"passive"},_internalEventMode:void 0,get eventMode(){return this._internalEventMode??j.defaultEventMode},set eventMode(e){this._internalEventMode=e},isInteractive(){return"static"===this.eventMode||"dynamic"===this.eventMode},interactiveChildren:!0,hitArea:null,addEventListener(e,t,i){const n="boolean"==typeof i&&i||"object"==typeof i&&i.capture,o="object"==typeof i?i.signal:void 0,s="object"==typeof i&&!0===i.once,r="function"==typeof t?void 0:t;e=n?`${e}capture`:e;const a="function"==typeof t?t:t.handleEvent,h=this;o&&o.addEventListener("abort",(()=>{h.off(e,a,r)})),s?h.once(e,a,r):h.on(e,a,r)},removeEventListener(e,t,i){const n="function"==typeof t?void 0:t;e="boolean"==typeof i&&i||"object"==typeof i&&i.capture?`${e}capture`:e,t="function"==typeof t?t:t.handleEvent,this.off(e,t,n)},dispatchEvent(e){if(!(e instanceof s.N))throw new Error("Container cannot propagate events outside of the Federated Events API");return e.defaultPrevented=!1,e.path=null,e.target=this,e.manager.dispatchEvent(e),!e.defaultPrevented}};n.XO.add(j),n.XO.mixin(o.mc,K),i(6312),i(5753),i(8928),i(5285),i(9305),i(6958),i(23),i(9147),i(8723),i(7252),i(4980)}}]);