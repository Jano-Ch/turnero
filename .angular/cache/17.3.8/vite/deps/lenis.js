import "./chunk-LJ4VCL4A.js";

// node_modules/lenis/dist/lenis.mjs
function clamp(t2, i, e) {
  return Math.max(t2, Math.min(i, e));
}
var Animate = class {
  constructor() {
    this.isRunning = false, this.value = 0, this.from = 0, this.to = 0, this.duration = 0, this.currentTime = 0;
  }
  advance(t2) {
    var i;
    if (!this.isRunning)
      return;
    let e = false;
    if (this.duration && this.easing) {
      this.currentTime += t2;
      const i2 = clamp(0, this.currentTime / this.duration, 1);
      e = i2 >= 1;
      const s = e ? 1 : this.easing(i2);
      this.value = this.from + (this.to - this.from) * s;
    } else
      this.lerp ? (this.value = function damp(t3, i2, e2, s) {
        return function lerp(t4, i3, e3) {
          return (1 - e3) * t4 + e3 * i3;
        }(t3, i2, 1 - Math.exp(-e2 * s));
      }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e = true)) : (this.value = this.to, e = true);
    e && this.stop(), null === (i = this.onUpdate) || void 0 === i || i.call(this, this.value, e);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, i, { lerp: e, duration: s, easing: o, onStart: n, onUpdate: l }) {
    this.from = this.value = t2, this.to = i, this.lerp = e, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, null == n || n(), this.onUpdate = l;
  }
};
var Dimensions = class {
  constructor({ wrapper: t2, content: i, autoResize: e = true, debounce: s = 250 } = {}) {
    this.width = 0, this.height = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : this.wrapper instanceof HTMLElement && (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : this.wrapper instanceof HTMLElement && (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    }, this.wrapper = t2, this.content = i, e && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, i2) {
      let e2;
      return function() {
        let s2 = arguments, o = this;
        clearTimeout(e2), e2 = setTimeout(function() {
          t3.apply(o, s2);
        }, i2);
      };
    }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var t2, i;
    null === (t2 = this.wrapperResizeObserver) || void 0 === t2 || t2.disconnect(), null === (i = this.contentResizeObserver) || void 0 === i || i.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var Emitter = class {
  constructor() {
    this.events = {};
  }
  emit(t2, ...i) {
    let e = this.events[t2] || [];
    for (let t3 = 0, s = e.length; t3 < s; t3++)
      e[t3](...i);
  }
  on(t2, i) {
    var e;
    return (null === (e = this.events[t2]) || void 0 === e ? void 0 : e.push(i)) || (this.events[t2] = [i]), () => {
      var e2;
      this.events[t2] = null === (e2 = this.events[t2]) || void 0 === e2 ? void 0 : e2.filter((t3) => i !== t3);
    };
  }
  off(t2, i) {
    var e;
    this.events[t2] = null === (e = this.events[t2]) || void 0 === e ? void 0 : e.filter((t3) => i !== t3);
  }
  destroy() {
    this.events = {};
  }
};
var t = 100 / 6;
var VirtualScroll = class {
  constructor(i, { wheelMultiplier: e = 1, touchMultiplier: s = 1 }) {
    this.lastDelta = { x: 0, y: 0 }, this.windowWidth = 0, this.windowHeight = 0, this.onTouchStart = (t2) => {
      const { clientX: i2, clientY: e2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = i2, this.touchStart.y = e2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    }, this.onTouchMove = (t2) => {
      var i2, e2, s2, o;
      const { clientX: n, clientY: l } = t2.targetTouches ? t2.targetTouches[0] : t2, r = -(n - (null !== (e2 = null === (i2 = this.touchStart) || void 0 === i2 ? void 0 : i2.x) && void 0 !== e2 ? e2 : 0)) * this.touchMultiplier, h = -(l - (null !== (o = null === (s2 = this.touchStart) || void 0 === s2 ? void 0 : s2.y) && void 0 !== o ? o : 0)) * this.touchMultiplier;
      this.touchStart.x = n, this.touchStart.y = l, this.lastDelta = { x: r, y: h }, this.emitter.emit("scroll", { deltaX: r, deltaY: h, event: t2 });
    }, this.onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    }, this.onWheel = (i2) => {
      let { deltaX: e2, deltaY: s2, deltaMode: o } = i2;
      e2 *= 1 === o ? t : 2 === o ? this.windowWidth : 1, s2 *= 1 === o ? t : 2 === o ? this.windowHeight : 1, e2 *= this.wheelMultiplier, s2 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e2, deltaY: s2, event: i2 });
    }, this.onWindowResize = () => {
      this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    }, this.element = i, this.wheelMultiplier = e, this.touchMultiplier = s, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }
  on(t2, i) {
    return this.emitter.on(t2, i);
  }
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel), this.element.removeEventListener("touchstart", this.onTouchStart), this.element.removeEventListener("touchmove", this.onTouchMove), this.element.removeEventListener("touchend", this.onTouchEnd);
  }
};
var Lenis = class {
  constructor({ wrapper: t2 = window, content: i = document.documentElement, wheelEventsTarget: e = t2, eventsTarget: s = e, smoothWheel: o = true, syncTouch: n = false, syncTouchLerp: l = 0.075, touchInertiaMultiplier: r = 35, duration: h, easing: a = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c = 0.1, infinite: d = false, orientation: u = "vertical", gestureOrientation: p = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f = false } = {}) {
    this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.onPointerDown = (t3) => {
      1 === t3.button && this.reset();
    }, this.onVirtualScroll = (t3) => {
      if ("function" == typeof this.options.virtualScroll && false === this.options.virtualScroll(t3))
        return;
      const { deltaX: i2, deltaY: e2, event: s2 } = t3;
      if (this.emitter.emit("virtual-scroll", { deltaX: i2, deltaY: e2, event: s2 }), s2.ctrlKey)
        return;
      const o2 = s2.type.includes("touch"), n2 = s2.type.includes("wheel");
      this.isTouching = "touchstart" === s2.type || "touchmove" === s2.type;
      if (this.options.syncTouch && o2 && "touchstart" === s2.type && !this.isStopped && !this.isLocked)
        return void this.reset();
      const l2 = 0 === i2 && 0 === e2, r2 = "vertical" === this.options.gestureOrientation && 0 === e2 || "horizontal" === this.options.gestureOrientation && 0 === i2;
      if (l2 || r2)
        return;
      let h2 = s2.composedPath();
      h2 = h2.slice(0, h2.indexOf(this.rootElement));
      const a2 = this.options.prevent;
      if (h2.find((t4) => {
        var i3, e3, s3, l3, r3;
        return t4 instanceof Element && ("function" == typeof a2 && (null == a2 ? void 0 : a2(t4)) || (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent")) || o2 && (null === (e3 = t4.hasAttribute) || void 0 === e3 ? void 0 : e3.call(t4, "data-lenis-prevent-touch")) || n2 && (null === (s3 = t4.hasAttribute) || void 0 === s3 ? void 0 : s3.call(t4, "data-lenis-prevent-wheel")) || (null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis")) && !(null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis-stopped")));
      }))
        return;
      if (this.isStopped || this.isLocked)
        return void s2.preventDefault();
      if (!(this.options.syncTouch && o2 || this.options.smoothWheel && n2))
        return this.isScrolling = "native", void this.animate.stop();
      s2.preventDefault();
      let c2 = e2;
      "both" === this.options.gestureOrientation ? c2 = Math.abs(e2) > Math.abs(i2) ? e2 : i2 : "horizontal" === this.options.gestureOrientation && (c2 = i2);
      const d2 = o2 && this.options.syncTouch, u2 = o2 && "touchend" === s2.type && Math.abs(c2) > 5;
      u2 && (c2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + c2, Object.assign({ programmatic: false }, d2 ? { lerp: u2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
    }, this.onNativeScroll = () => {
      if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent)
        delete this.__preventNextNativeScrollEvent;
      else if (false === this.isScrolling || "native" === this.isScrolling) {
        const t3 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t3, this.direction = Math.sign(this.animatedScroll - t3), this.isScrolling = "native", this.emit(), 0 !== this.velocity && (this.__resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400));
      }
    }, window.lenisVersion = "1.1.8", t2 && t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: i, wheelEventsTarget: e, eventsTarget: s, smoothWheel: o, syncTouch: n, syncTouchLerp: l, touchInertiaMultiplier: r, duration: h, easing: a, lerp: c, infinite: d, gestureOrientation: p, orientation: u, touchMultiplier: m, wheelMultiplier: v, autoResize: g, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: i, autoResize: g }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new VirtualScroll(s, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
  }
  on(t2, i) {
    return this.emitter.on(t2, i);
  }
  off(t2, i) {
    return this.emitter.off(t2, i);
  }
  setScroll(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped && (this.isStopped = false, this.reset());
  }
  stop() {
    this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
  }
  raf(t2) {
    const i = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * i);
  }
  scrollTo(t2, { offset: i = 0, immediate: e = false, lock: s = false, duration: o = this.options.duration, easing: n = this.options.easing, lerp: l = this.options.lerp, onStart: r, onComplete: h, force: a = false, programmatic: c = true, userData: d = {} } = {}) {
    if (!this.isStopped && !this.isLocked || a) {
      if ("string" == typeof t2 && ["top", "left", "start"].includes(t2))
        t2 = 0;
      else if ("string" == typeof t2 && ["bottom", "right", "end"].includes(t2))
        t2 = this.limit;
      else {
        let e2;
        if ("string" == typeof t2 ? e2 = document.querySelector(t2) : t2 instanceof HTMLElement && (null == t2 ? void 0 : t2.nodeType) && (e2 = t2), e2) {
          if (this.options.wrapper !== window) {
            const t3 = this.rootElement.getBoundingClientRect();
            i -= this.isHorizontal ? t3.left : t3.top;
          }
          const s2 = e2.getBoundingClientRect();
          t2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2 && (t2 += i, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), t2 !== this.targetScroll)) {
        if (this.userData = d, e)
          return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {});
        c || (this.targetScroll = t2), this.animate.fromTo(this.animatedScroll, t2, { duration: o, easing: n, lerp: l, onStart: () => {
          s && (this.isLocked = true), this.isScrolling = "smooth", null == r || r(this);
        }, onUpdate: (t3, i2) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), i2 || this.emit(), i2 && (this.reset(), this.emit(), null == h || h(this), this.userData = {}, this.preventNextNativeScrollEvent());
        } });
      }
    }
  }
  preventNextNativeScrollEvent() {
    this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
      delete this.__preventNextNativeScrollEvent;
    });
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return "horizontal" === this.options.orientation;
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? function modulo(t2, i) {
      return (t2 % i + i) % i;
    }(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t2) {
    this.__isScrolling !== t2 && (this.__isScrolling = t2, this.updateClassName());
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t2) {
    this.__isStopped !== t2 && (this.__isStopped = t2, this.updateClassName());
  }
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(t2) {
    this.__isLocked !== t2 && (this.__isLocked = t2, this.updateClassName());
  }
  get isSmooth() {
    return "smooth" === this.isScrolling;
  }
  get className() {
    let t2 = "lenis";
    return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};
export {
  Lenis as default
};
//# sourceMappingURL=lenis.js.map
