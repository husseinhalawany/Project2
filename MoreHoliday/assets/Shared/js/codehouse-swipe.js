var codehouseSwipe = function (e, t) {
    function s(e) {
        function E() {
            r = 0;
            i = 0;
            s = 0;
            o = 0;
            u = true;
            g = -1;
            y = null;
            e.removeEventListener(v, x);
            e.removeEventListener(m, T);
            document.documentElement.style.msTouchAction = "auto";
            document.documentElement.style.touchAction = "auto";
            if (c) {
                document.documentElement.removeEventListener(v, x);
                document.documentElement.removeEventListener(m, T)
            }
        }

        function S(t) {
            if (c ? g === -1 && (t.pointerType === "touch" || t.pointerType === 2) : !t.targetTouches[1]) {
                var i = c ? t : t.targetTouches[0];
                r = i.clientX;
                s = i.clientY;
                e.addEventListener(v, x);
                e.addEventListener(m, T);
                if (c) {
                    document.documentElement.addEventListener(v, x);
                    document.documentElement.addEventListener(m, T)
                }
                g = c ? t.pointerId : t.targetTouches[0].identifier;
                document.documentElement.style.msTouchAction = "none";
                document.documentElement.style.touchAction = "none";
                if (typeof n.start == "function") {
                    n.start(e)
                }
            }
        }

        function x(t) {
            if (c ? g === t.pointerId && (t.pointerType === "touch" || t.pointerType === 2) : g === t.targetTouches[0].identifier) {
                var a = c ? t : t.targetTouches[0];
                i = a.clientX - r;
                o = a.clientY - s;
                if (u) {
                    var f = {
                        horizontal: Math.abs(o) > Math.abs(i),
                        vertical: Math.abs(o) < Math.abs(i),
                        all: false
                    };
                    u = f[n.swipeDirection]
                }
                if (!u) {
                    t.preventDefault();
                    if (typeof n.moving == "function") {
                        n.moving(i, o, e)
                    }
                } else {
                    E()
                }
            }
        }

        function T(t) {
            if (c ? g === t.pointerId && (t.pointerType === "touch" || t.pointerType === 2) : !t.targetTouches.length) {
                if (!u) {
                    if (n.swipeDirection === "horizontal") {
                        y = i > n.threshold ? "right" : i < -n.threshold ? "left" : "notReached"
                    } else if (n.swipeDirection === "vertical") {
                        y = o > n.threshold ? "down" : o < -n.threshold ? "up" : "notReached"
                    } else {
                        y = null
                    }
                    switch (y) {
                        case "left":
                            if (typeof n.left == "function") {
                                n.left(i, o, e)
                            }
                            break;
                        case "right":
                            if (typeof n.right == "function") {
                                n.right(i, o, e)
                            }
                            break;
                        case "up":
                            if (typeof n.up == "function") {
                                n.up(i, o, e)
                            }
                            break;
                        case "down":
                            if (typeof n.down == "function") {
                                n.down(i, o, e)
                            }
                            break;
                        case "notReached":
                            if (typeof n.notReached == "function") {
                                n.notReached(i, o, e)
                            }
                            break
                    }
                    if (typeof n.end == "function") {
                        n.end(i, o, e)
                    }
                }
                E()
            }
        }
        var t = {
            start: {
                IEedge: "pointerdown",
                IE10: "MSPointerDown",
                webkit: "touchstart"
            },
            move: {
                IEedge: "pointermove",
                IE10: "MSPointerMove",
                webkit: "touchmove"
            },
            end: {
                IEedge: "pointerup",
                IE10: "MSPointerUp",
                webkit: "touchend"
            },
            cancel: {
                IEedge: "pointercancel",
                IE10: "MSPointerCancel",
                webkit: "touchcancel"
            }
        };
        var r = 0,
            i = 0,
            s = 0,
            o = 0,
            u = true,
            a = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
            f = window.navigator.pointerEnabled,
            l = window.navigator.msPointerEnabled,
            c = a ? f || l : false,
            h = c ? f ? "IEedge" : "IE10" : "webkit",
            p = t.cancel[h],
            d = t.start[h],
            v = t.move[h],
            m = t.end[h],
            g = -1,
            y = null;
        var b = {
            horizontal: "pan-y",
            vertical: "pan-x",
            all: "none"
        },
            w = b[n.swipeDirection];
        e.style.msTouchAction = w;
        e.style.touchAction = w;
        if (e.addEventListener) {
            e.addEventListener(d, S);
            e.addEventListener(p, E)
        }
    }
    var n = {
        threshold: 20,
        swipeDirection: "horizontal",
        start: function (e) { },
        right: function (e, t, n) { },
        left: function (e, t, n) { },
        up: function (e, t, n) { },
        down: function (e, t, n) { },
        moving: function (e, t, n) { },
        notReached: function (e, t, n) { },
        end: function (e, t, n) { }
    };
    for (var r in t) {
        if (n.hasOwnProperty(r)) {
            n[r] = t[r]
        }
    }
    if (e.length === undefined) {
        s(e)
    } else {
        for (var i = 0; i < e.length; i++) {
            s(e[i])
        }
    }
}