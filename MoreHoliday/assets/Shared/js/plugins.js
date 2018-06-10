var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function () {
    var aa = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    },
        ba = function (a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        },
        ca = function (a, b, c) {
            ca = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
            return ca.apply(null, arguments)
        };
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    var m = window,
        p = document,
        r = m.location,
        da = function () { },
        ea = /\[native code\]/,
        u = function (a, b, c) {
            return a[b] = a[b] || c
        },
        fa = function (a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return b;
            return -1
        },
        ga = function (a) {
            a = a.sort();
            for (var b = [], c = void 0, d = 0; d < a.length; d++) {
                var e = a[d];
                e != c && b.push(e);
                c = e
            }
            return b
        },
        ha = /&/g,
        ia = /</g,
        ja = />/g,
        ka = /"/g,
        la = /'/g,
        ma = function (a) {
            return String(a).replace(ha, "&amp;").replace(ia, "&lt;").replace(ja, "&gt;").replace(ka, "&quot;").replace(la, "&#39;")
        },
        v = function () {
            var a;
            if ((a = Object.create) &&
                ea.test(a)) a = a(null);
            else {
                a = {};
                for (var b in a) a[b] = void 0
            }
            return a
        },
        x = function (a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        na = function (a) {
            if (ea.test(Object.keys)) return Object.keys(a);
            var b = [],
                c;
            for (c in a) x(a, c) && b.push(c);
            return b
        },
        z = function (a, b) {
            a = a || {};
            for (var c in a) x(a, c) && (b[c] = a[c])
        },
        oa = function (a) {
            return function () {
                m.setTimeout(a, 0)
            }
        },
        A = function (a, b) {
            if (!a) throw Error(b || "");
        },
        B = u(m, "gapi", {});
    var C = function (a, b, c) {
        var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
        b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
        if (a = a && (d.exec(a) || b.exec(a))) try {
            c = decodeURIComponent(a[2])
        } catch (e) { }
        return c
    },
        pa = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source),
        qa = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
        ra = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
            "g"),
        sa = /%([a-f]|[0-9a-fA-F][a-f])/g,
        ua = /^(https?|ftp|file|chrome-extension):$/i,
        D = function (a) {
            a = String(a);
            a = a.replace(qa, function (a) {
                try {
                    return encodeURIComponent(a)
                } catch (f) {
                    return encodeURIComponent(a.replace(/^[^%]+$/g, "\ufffd"))
                }
            }).replace(ra, function (a) {
                return a.replace(/%/g, "%25")
            }).replace(sa, function (a) {
                return a.toUpperCase()
            });
            a = a.match(pa) || [];
            var b = v(),
                c = function (a) {
                    return a.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g,
                        "%7D")
                },
                d = !!(a[1] || "").match(ua);
            b.v = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
            d = function (a) {
                return c(a.replace(/\?/g, "%3F").replace(/\#/g, "%23"))
            };
            b.query = a[5] ? [d(a[5])] : [];
            b.c = a[7] ? [d(a[7])] : [];
            return b
        },
        va = function (a) {
            return a.v + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.c.length ? "#" + a.c.join("&") : "")
        },
        wa = function (a, b) {
            var c = [];
            if (a)
                for (var d in a)
                    if (x(a, d) && null != a[d]) {
                        var e = b ? b(a[d]) : a[d];
                        c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                    }
            return c
        },
        xa = function (a, b, c, d) {
            a = D(a);
            a.query.push.apply(a.query, wa(b, d));
            a.c.push.apply(a.c, wa(c, d));
            return va(a)
        },
        ya = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i"),
        za = function (a, b) {
            var c = D(b);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            var d = "";
            2E3 < b.length && (c = b, b = b.substr(0, 2E3), b = b.replace(ya, ""), d = c.substr(b.length));
            var e = a.createElement("div");
            a = a.createElement("a");
            c = D(b);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            a.href = b;
            e.appendChild(a);
            e.innerHTML = e.innerHTML;
            b = String(e.firstChild.href);
            e.parentNode && e.parentNode.removeChild(e);
            c = D(b + d);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            return b
        },
        Aa = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    var Ba = function (a, b, c, d) {
        if (m[c + "EventListener"]) m[c + "EventListener"](a, b, !1);
        else if (m[d + "tachEvent"]) m[d + "tachEvent"]("on" + a, b)
    },
        Ca = function () {
            var a = p.readyState;
            return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
        },
        Fa = function (a) {
            var b = Da;
            if (!Ca()) try {
                b()
            } catch (c) { }
            Ea(a)
        },
        Ea = function (a) {
            if (Ca()) a();
            else {
                var b = !1,
                    c = function () {
                        if (!b) return b = !0, a.apply(this, arguments)
                    };
                m.addEventListener ? (m.addEventListener("load", c, !1), m.addEventListener("DOMContentLoaded", c, !1)) : m.attachEvent &&
                    (m.attachEvent("onreadystatechange", function () {
                        Ca() && c.apply(this, arguments)
                    }), m.attachEvent("onload", c))
            }
        },
        Ga = function (a) {
            for (; a.firstChild;) a.removeChild(a.firstChild)
        },
        Ha = {
            button: !0,
            div: !0,
            span: !0
        };
    var E;
    E = u(m, "___jsl", v());
    u(E, "I", 0);
    u(E, "hel", 10);
    var Ia = function (a) {
        return E.dpo ? E.h : C(a, "jsh", E.h)
    },
        Ja = function (a) {
            var b = u(E, "sws", []);
            b.push.apply(b, a)
        },
        Ka = function (a) {
            return u(E, "watt", v())[a]
        },
        La = function (a) {
            var b = u(E, "PQ", []);
            E.PQ = [];
            var c = b.length;
            if (0 === c) a();
            else
                for (var d = 0, e = function () {
                        ++d === c && a()
                }, f = 0; f < c; f++) b[f](e)
        },
        Ma = function (a) {
            return u(u(E, "H", v()), a, v())
        };
    var Na = u(E, "perf", v()),
        Oa = u(Na, "g", v()),
        Pa = u(Na, "i", v());
    u(Na, "r", []);
    v();
    v();
    var Qa = function (a, b, c) {
        var d = Na.r;
        "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
    },
        G = function (a, b, c) {
            Oa[a] = !b && Oa[a] || c || (new Date).getTime();
            Qa(a)
        },
        Sa = function (a, b, c) {
            b && 0 < b.length && (b = Ra(b), c && 0 < c.length && (b += "___" + Ra(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = u(Pa, "_p", v()), u(b, c, v())[a] = (new Date).getTime(), Qa(a, "_p", c))
        },
        Ra = function (a) {
            return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/\,/g, "_")
        };
    var Ta = v(),
        I = [],
        J = function (a) {
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    I.push(["jsl", function (a) {
        for (var b in a)
            if (x(a, b)) {
                var c = a[b];
                "object" == typeof c ? E[b] = u(E, b, []).concat(c) : u(E, b, c)
            }
        if (b = a.u) a = u(E, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var Ua = /^(\/[a-zA-Z0-9_\-]+)+$/,
        Va = [/\/amp\//, /\/amp$/, /^\/amp$/],
        Wa = /^[a-zA-Z0-9\-_\.,!]+$/,
        Xa = /^gapi\.loaded_[0-9]+$/,
        Ya = /^[a-zA-Z0-9,._-]+$/,
        bb = function (a, b, c, d) {
            var e = a.split(";"),
                f = e.shift(),
                g = Ta[f],
                h = null;
            g ? h = g(e, b, c, d) : J("no hint processor for: " + f);
            h || J("failed to generate load url");
            b = h;
            c = b.match(Za);
            (d = b.match($a)) && 1 === d.length && ab.test(b) && c && 1 === c.length || J("failed sanity: " + a);
            return h
        },
        eb = function (a, b, c, d) {
            a = cb(a);
            Xa.test(c) || J("invalid_callback");
            b = db(b);
            d = d && d.length ? db(d) : null;
            var e =
                function (a) {
                    return encodeURIComponent(a).replace(/%2C/g, ",")
                };
            return [encodeURIComponent(a.Y).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.K ? "/am=" + e(a.K) : "", a.S ? "/rs=" + e(a.S) : "", a.U ? "/t=" + e(a.U) : "", "/cb=", e(c)].join("")
        },
        cb = function (a) {
            "/" !== a.charAt(0) && J("relative path");
            for (var b = a.substring(1).split("/"), c = []; b.length;) {
                a = b.shift();
                if (!a.length || 0 == a.indexOf(".")) J("empty/relative directory");
                else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c.push(a)
            }
            a = {};
            for (var d = 0, e = b.length; d < e; ++d) {
                var f = b[d].split("="),
                    g = decodeURIComponent(f[0]),
                    h = decodeURIComponent(f[1]);
                2 == f.length && g && h && (a[g] = a[g] || h)
            }
            b = "/" + c.join("/");
            Ua.test(b) || J("invalid_prefix");
            c = 0;
            for (d = Va.length; c < d; ++c) Va[c].test(b) && J("invalid_prefix");
            c = fb(a, "k", !0);
            d = fb(a, "am");
            e = fb(a, "rs");
            a = fb(a, "t");
            return {
                Y: b,
                version: c,
                K: d,
                S: e,
                U: a
            }
        },
        db = function (a) {
            for (var b = [], c = 0, d = a.length; c < d; ++c) {
                var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                Ya.test(e) && b.push(e)
            }
            return b.join(",")
        },
        fb = function (a, b, c) {
            a = a[b];
            !a && c && J("missing: " + b);
            if (a) {
                if (Wa.test(a)) return a;
                J("invalid: " + b)
            }
            return null
        },
        ab = /^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        $a = /\/cb=/g,
        Za = /\/\//g,
        gb = function () {
            var a = Ia(r.href);
            if (!a) throw Error("Bad hint");
            return a
        };
    Ta.m = function (a, b, c, d) {
        (a = a[0]) || J("missing_hint");
        return "https://apis.google.com" + eb(a, b, c, d)
    };
    var K = decodeURI("%73cript"),
        hb = /^[-+_0-9\/A-Za-z]+={0,2}$/,
        ib = function (a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var e = a[d];
                e && 0 > fa.call(b, e) && c.push(e)
            }
            return c
        },
        jb = function () {
            var a = E.nonce;
            if (void 0 !== a) return a && a === String(a) && a.match(hb) ? a : E.nonce = null;
            var b = u(E, "us", []);
            if (!b || !b.length) return E.nonce = null;
            for (var c = p.getElementsByTagName(K), d = 0, e = c.length; d < e; ++d) {
                var f = c[d];
                if (f.src && (a = String(f.nonce || f.getAttribute("nonce") || "") || null)) {
                    for (var g = 0, h = b.length; g < h && b[g] !== f.src; ++g);
                    if (g !== h &&
                        a && a === String(a) && a.match(hb)) return E.nonce = a
                }
            }
            return null
        },
        lb = function (a) {
            if ("loading" != p.readyState) kb(a);
            else {
                var b = jb(),
                    c = "";
                null !== b && (c = ' nonce="' + b + '"');
                p.write("<" + K + ' src="' + encodeURI(a) + '"' + c + "></" + K + ">")
            }
        },
        kb = function (a) {
            var b = p.createElement(K);
            b.setAttribute("src", a);
            a = jb();
            null !== a && b.setAttribute("nonce", a);
            b.async = "true";
            (a = p.getElementsByTagName(K)[0]) ? a.parentNode.insertBefore(b, a) : (p.head || p.body || p.documentElement).appendChild(b)
        },
        mb = function (a, b) {
            var c = b && b._c;
            if (c)
                for (var d =
                        0; d < I.length; d++) {
                    var e = I[d][0],
                        f = I[d][1];
                    f && x(c, e) && f(c[e], a, b)
                }
        },
        ob = function (a, b, c) {
            nb(function () {
                var c = b === Ia(r.href) ? u(B, "_", v()) : v();
                c = u(Ma(b), "_", c);
                a(c)
            }, c)
        },
        L = function (a, b) {
            var c = b || {};
            "function" == typeof b && (c = {}, c.callback = b);
            mb(a, c);
            b = a ? a.split(":") : [];
            var d = c.h || gb(),
                e = u(E, "ah", v());
            if (e["::"] && b.length) {
                a = [];
                for (var f = null; f = b.shift() ;) {
                    var g = f.split("."),
                        g = e[f] || e[g[1] && "ns:" + g[0] || ""] || d,
                        h = a.length && a[a.length - 1] || null,
                        k = h;
                    h && h.hint == g || (k = {
                        hint: g,
                        N: []
                    }, a.push(k));
                    k.N.push(f)
                }
                var l =
                    a.length;
                if (1 < l) {
                    var n = c.callback;
                    n && (c.callback = function () {
                        0 == --l && n()
                    })
                }
                for (; b = a.shift() ;) pb(b.N, c, b.hint)
            } else pb(b || [], c, d)
        },
        pb = function (a, b, c) {
            a = ga(a) || [];
            var d = b.callback,
                e = b.config,
                f = b.timeout,
                g = b.ontimeout,
                h = b.onerror,
                k = void 0;
            "function" == typeof h && (k = h);
            var l = null,
                n = !1;
            if (f && !g || !f && g) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            var h = u(Ma(c), "r", []).sort(),
                w = u(Ma(c), "L", []).sort(),
                q = [].concat(h),
                y = function (a, b) {
                    if (n) return 0;
                    m.clearTimeout(l);
                    w.push.apply(w,
                        t);
                    var d = ((B || {}).config || {}).update;
                    d ? d(e) : e && u(E, "cu", []).push(e);
                    if (b) {
                        Sa("me0", a, q);
                        try {
                            ob(b, c, k)
                        } finally {
                            Sa("me1", a, q)
                        }
                    }
                    return 1
                };
            0 < f && (l = m.setTimeout(function () {
                n = !0;
                g()
            }, f));
            var t = ib(a, w);
            if (t.length) {
                var t = ib(a, h),
                    F = u(E, "CP", []),
                    H = F.length;
                F[H] = function (a) {
                    if (!a) return 0;
                    Sa("ml1", t, q);
                    var b = function (b) {
                        F[H] = null;
                        y(t, a) && La(function () {
                            d && d();
                            b()
                        })
                    },
                        c = function () {
                            var a = F[H + 1];
                            a && a()
                        };
                    0 < H && F[H - 1] ? F[H] = function () {
                        b(c)
                    } : b(c)
                };
                if (t.length) {
                    var ta = "loaded_" + E.I++;
                    B[ta] = function (a) {
                        F[H](a);
                        B[ta] = null
                    };
                    a = bb(c, t, "gapi." + ta, h);
                    h.push.apply(h, t);
                    Sa("ml0", t, q);
                    b.sync || m.___gapisync ? lb(a) : kb(a)
                } else F[H](da)
            } else y(t) && d && d()
        };
    var nb = function (a, b) {
        if (E.hee && 0 < E.hel) try {
            return a()
        } catch (c) {
            b && b(c), E.hel--, L("debug_error", function () {
                try {
                    window.___jsl.hefn(c)
                } catch (d) {
                    throw c;
                }
            })
        } else try {
            return a()
        } catch (c) {
            throw b && b(c), c;
        }
    };
    B.load = function (a, b) {
        return nb(function () {
            return L(a, b)
        })
    };
    var M = function (a) {
        var b = window.___jsl = window.___jsl || {};
        b[a] = b[a] || [];
        return b[a]
    },
        N = function (a) {
            var b = window.___jsl = window.___jsl || {};
            b.cfg = !a && b.cfg || {};
            return b.cfg
        },
        qb = function (a) {
            return "object" === typeof a && /\[native code\]/.test(a.push)
        },
        O = function (a, b, c) {
            if (b && "object" === typeof b)
                for (var d in b) !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !qb(a[d]) && !qb(b[d]) ? O(a[d], b[d]) : b[d] && "object" ===
                    typeof b[d] ? (a[d] = qb(b[d]) ? [] : {}, O(a[d], b[d])) : a[d] = b[d])
        },
        rb = function (a) {
            if (a && !/^\s+$/.test(a)) {
                for (; 0 == a.charCodeAt(a.length - 1) ;) a = a.substring(0, a.length - 1);
                try {
                    var b = window.JSON.parse(a)
                } catch (c) { }
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return (" + a + "\n)"))()
                } catch (c) { }
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return ({" + a + "\n})"))()
                } catch (c) { }
                return "object" === typeof b ? b : {}
            }
        },
        sb = function (a, b) {
            var c = {
                ___goc: void 0
            };
            a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length -
                1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
            O(c, b);
            a.push(c)
        },
        tb = function (a) {
            N(!0);
            var b = window.___gcfg,
                c = M("cu"),
                d = window.___gu;
            b && b !== d && (sb(c, b), window.___gu = b);
            var b = M("cu"),
                e = document.scripts || document.getElementsByTagName("script") || [],
                d = [],
                f = [];
            f.push.apply(f, M("us"));
            for (var g = 0; g < e.length; ++g)
                for (var h = e[g], k = 0; k < f.length; ++k) h.src && 0 == h.src.indexOf(f[k]) && d.push(h);
            0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
            for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") ||
                (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g = f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || f.innerText || f.innerHTML || "") : f = void 0, (f = rb(f)) && b.push(f));
            a && sb(c, a);
            d = M("cd");
            a = 0;
            for (b = d.length; a < b; ++a) O(N(), d[a], !0);
            d = M("ci");
            a = 0;
            for (b = d.length; a < b; ++a) O(N(), d[a], !0);
            a = 0;
            for (b = c.length; a < b; ++a) O(N(), c[a], !0)
        },
        P = function (a) {
            var b = N();
            if (!a) return b;
            a = a.split("/");
            for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
            return c === a.length && void 0 !== b ? b : void 0
        },
        ub = function (a, b) {
            var c;
            if ("string" === typeof a) {
                var d = c = {};
                a = a.split("/");
                for (var e = 0, f = a.length; e < f - 1; ++e) var g = {},
                    d = d[a[e]] = g;
                d[a[e]] = b
            } else c = a;
            tb(c)
        };
    var vb = function () {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), u(E, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    var wb = {
        apppackagename: 1,
        callback: 1,
        clientid: 1,
        cookiepolicy: 1,
        openidrealm: -1,
        includegrantedscopes: -1,
        requestvisibleactions: 1,
        scope: 1
    },
        xb = !1,
        yb = v(),
        zb = function () {
            if (!xb) {
                for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                    var c = a[b].name.toLowerCase();
                    if (0 == c.lastIndexOf("google-signin-", 0)) {
                        var c = c.substring(14),
                            d = a[b].content;
                        wb[c] && d && (yb[c] = d)
                    }
                }
                if (window.self !== window.top) {
                    var a = document.location.toString();
                    for (e in wb) 0 < wb[e] && (b = C(a, e, "")) && (yb[e] = b)
                }
                xb = !0
            }
            var e = v();
            z(yb, e);
            return e
        },
        Ab = function (a) {
            return !!(a.clientid && a.scope && a.callback)
        };
    var Bb = window.console,
        Cb = function (a) {
            Bb && Bb.log && Bb.log(a)
        };
    var Db = function () {
        return !!E.oa
    },
        Eb = function () { };
    var Q = u(E, "rw", v()),
        Fb = function (a) {
            for (var b in Q) a(Q[b])
        },
        Gb = function (a, b) {
            (a = Q[a]) && a.state < b && (a.state = b)
        };
    var Hb;
    var Ib = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,
        Jb = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,21})\//,
        Kb = function (a) {
            var b = P("googleapis.config/sessionIndex");
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (b = window.__X_GOOG_AUTHUSER);
            "string" === typeof b && 254 < b.length && (b = null);
            if (null == b) {
                var c = window.google;
                c && (b = c.authuser)
            }
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (a = a || window.location.href, b = C(a, "authuser") ||
                null, null == b && (b = (b = a.match(Ib)) ? b[1] : null));
            if (null == b) return null;
            b = String(b);
            254 < b.length && (b = null);
            return b
        },
        Lb = function (a) {
            var b = P("googleapis.config/sessionDelegate");
            "string" === typeof b && 21 < b.length && (b = null);
            null == b && (b = (a = (a || window.location.href).match(Jb)) ? a[1] : null);
            if (null == b) return null;
            b = String(b);
            21 < b.length && (b = null);
            return b
        };
    var Mb = function () {
        this.i = -1
    };
    var R = function () {
        this.i = 64;
        this.b = [];
        this.D = [];
        this.V = [];
        this.A = [];
        this.A[0] = 128;
        for (var a = 1; a < this.i; ++a) this.A[a] = 0;
        this.B = this.l = 0;
        this.reset()
    };
    (function () {
        function a() { }
        a.prototype = Mb.prototype;
        R.ea = Mb.prototype;
        R.prototype = new a;
        R.prototype.constructor = R;
        R.v = function (a, c, d) {
            for (var b = Array(arguments.length - 2), f = 2; f < arguments.length; f++) b[f - 2] = arguments[f];
            return Mb.prototype[c].apply(a, b)
        }
    })();
    R.prototype.reset = function () {
        this.b[0] = 1732584193;
        this.b[1] = 4023233417;
        this.b[2] = 2562383102;
        this.b[3] = 271733878;
        this.b[4] = 3285377520;
        this.B = this.l = 0
    };
    var Nb = function (a, b, c) {
        c || (c = 0);
        var d = a.V;
        if ("string" == typeof b)
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.b[0];
        c = a.b[1];
        for (var g = a.b[2], h = a.b[3], k = a.b[4], l, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = h ^ c & (g ^ h), l = 1518500249) : (f = c ^ g ^ h, l = 1859775393) : 60 > e ? (f = c & g | h & (c | g), l = 2400959708) : (f = c ^ g ^ h,
            l = 3395469782), f = (b << 5 | b >>> 27) + f + k + l + d[e] & 4294967295, k = h, h = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.b[0] = a.b[0] + b & 4294967295;
        a.b[1] = a.b[1] + c & 4294967295;
        a.b[2] = a.b[2] + g & 4294967295;
        a.b[3] = a.b[3] + h & 4294967295;
        a.b[4] = a.b[4] + k & 4294967295
    };
    R.prototype.update = function (a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.i, d = 0, e = this.D, f = this.l; d < b;) {
                if (0 == f)
                    for (; d <= c;) Nb(this, a, d), d += this.i;
                if ("string" == typeof a)
                    for (; d < b;) {
                        if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.i) {
                            Nb(this, e);
                            f = 0;
                            break
                        }
                    } else
                    for (; d < b;)
                        if (e[f] = a[d], ++f, ++d, f == this.i) {
                            Nb(this, e);
                            f = 0;
                            break
                        }
            }
            this.l = f;
            this.B += b
        }
    };
    R.prototype.digest = function () {
        var a = [],
            b = 8 * this.B;
        56 > this.l ? this.update(this.A, 56 - this.l) : this.update(this.A, this.i - (this.l - 56));
        for (var c = this.i - 1; 56 <= c; c--) this.D[c] = b & 255, b /= 256;
        Nb(this, this.D);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8) a[b] = this.b[c] >> d & 255, ++b;
        return a
    };
    var Ob = function () {
        this.H = new R
    };
    Ob.prototype.reset = function () {
        this.H.reset()
    };
    var Pb = m.crypto,
        Qb = !1,
        Rb = 0,
        Sb = 0,
        Tb = 1,
        Ub = 0,
        Vb = "",
        Wb = function (a) {
            a = a || m.event;
            var b = a.screenX + a.clientX << 16,
                b = b + (a.screenY + a.clientY),
                b = (new Date).getTime() % 1E6 * b;
            Tb = Tb * b % Ub;
            0 < Rb && ++Sb == Rb && Ba("mousemove", Wb, "remove", "de")
        },
        Xb = function (a) {
            var b = new Ob;
            a = unescape(encodeURIComponent(a));
            for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a.charCodeAt(d));
            b.H.update(c);
            b = b.H.digest();
            a = "";
            for (c = 0; c < b.length; c++) a += "0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) + "0123456789ABCDEF".charAt(b[c] % 16);
            return a
        },
        Qb = !!Pb &&
        "function" == typeof Pb.getRandomValues;
    Qb || (Ub = 1E6 * (screen.width * screen.width + screen.height), Vb = Xb(p.cookie + "|" + p.location + "|" + (new Date).getTime() + "|" + Math.random()), Rb = P("random/maxObserveMousemove") || 0, 0 != Rb && Ba("mousemove", Wb, "add", "at"));
    var Yb = function () {
        var a = Tb,
            a = a + parseInt(Vb.substr(0, 20), 16);
        Vb = Xb(Vb);
        return a / (Ub + Math.pow(16, 20))
    },
        Zb = function () {
            var a = new m.Uint32Array(1);
            Pb.getRandomValues(a);
            return Number("0." + a[0])
        };
    var $b = function () {
        var a = E.onl;
        if (!a) {
            a = v();
            E.onl = a;
            var b = v();
            a.e = function (a) {
                var c = b[a];
                c && (delete b[a], c())
            };
            a.a = function (a, d) {
                b[a] = d
            };
            a.r = function (a) {
                delete b[a]
            }
        }
        return a
    },
        ac = function (a, b) {
            b = b.onload;
            return "function" === typeof b ? ($b().a(a, b), b) : null
        },
        bc = function (a) {
            A(/^\w+$/.test(a), "Unsupported id - " + a);
            $b();
            return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        },
        cc = function (a) {
            $b().r(a)
        };
    var dc = {
        allowtransparency: "true",
        frameborder: "0",
        hspace: "0",
        marginheight: "0",
        marginwidth: "0",
        scrolling: "no",
        style: "",
        tabindex: "0",
        vspace: "0",
        width: "100%"
    },
        ec = {
            allowtransparency: !0,
            onload: !0
        },
        fc = 0,
        gc = function (a) {
            A(!a || Aa.test(a), "Illegal url for new iframe - " + a)
        },
        hc = function (a, b, c, d, e) {
            gc(c.src);
            var f, g = ac(d, c),
                h = g ? bc(d) : "";
            try {
                document.all && (f = a.createElement('<iframe frameborder="' + ma(String(c.frameborder)) + '" scrolling="' + ma(String(c.scrolling)) + '" ' + h + ' name="' + ma(String(c.name)) + '"/>'))
            } catch (l) { } finally {
                f ||
                    (f = a.createElement("iframe"), g && (f.onload = function () {
                        f.onload = null;
                        g.call(this)
                    }, cc(d)))
            }
            f.setAttribute("ng-non-bindable", "");
            for (var k in c) a = c[k], "style" === k && "object" === typeof a ? z(a, f.style) : ec[k] || f.setAttribute(k, String(a));
            (k = e && e.beforeNode || null) || e && e.dontclear || Ga(b);
            b.insertBefore(f, k);
            f = k ? k.previousSibling : b.lastChild;
            c.allowtransparency && (f.allowTransparency = !0);
            return f
        };
    var ic = /^:[\w]+$/,
        jc = /:([a-zA-Z_]+):/g,
        kc = function () {
            var a = Kb() || "0",
                b = Lb();
            var c = Kb(void 0) || a;
            var d = Lb(void 0),
                e = "";
            c && (e += "u/" + encodeURIComponent(String(c)) + "/");
            d && (e += "b/" + encodeURIComponent(String(d)) + "/");
            c = e || null;
            (e = (d = !1 === P("isLoggedIn")) ? "_/im/" : "") && (c = "");
            var f = P("iframes/:socialhost:"),
                g = P("iframes/:im_socialhost:");
            return Hb = {
                socialhost: f,
                ctx_socialhost: d ? g : f,
                session_index: a,
                session_delegate: b,
                session_prefix: c,
                im_prefix: e
            }
        },
        lc = function (a, b) {
            return kc()[b] || ""
        },
        mc = function (a) {
            return function (b,
                c) {
                return a ? kc()[c] || a[c] || "" : kc()[c] || ""
            }
        };
    var S = function (a) {
        return 10 > a ? "0" + a : a
    },
        nc = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        oc = function (a) {
            var b;
            var c = /[\"\\\x00-\x1f\x7f-\x9f]/g;
            if (void 0 !== a) {
                switch (typeof a) {
                    case "string":
                        return c.test(a) ? '"' + a.replace(c, function (a) {
                            var b = nc[a];
                            if (b) return b;
                            b = a.charCodeAt();
                            return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                        }) + '"' : '"' + a + '"';
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "boolean":
                    case "null":
                        return String(a);
                    case "object":
                        if (!a) return "null";
                        c = [];
                        if ("number" === typeof a.length && !a.propertyIsEnumerable("length")) {
                            var d = a.length;
                            for (b = 0; b < d; b += 1) c.push(oc(a[b]) || "null");
                            return "[" + c.join(",") + "]"
                        }
                        for (b in a) !/___$/.test(b) && x(a, b) && "string" === typeof b && (d = oc(a[b])) && c.push(oc(b) + ":" + d);
                        return "{" + c.join(",") + "}"
                }
                return ""
            }
        },
        pc = function (a) {
            if (!a) return !1;
            if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) try {
                return eval("(" +
                    a + ")")
            } catch (b) { }
            return !1
        },
        qc = !1;
    try {
        qc = !!window.JSON && '["a"]' === window.JSON.stringify(["a"]) && "a" === window.JSON.parse('["a"]')[0]
    } catch (a) { }
    var rc = function (a) {
        try {
            return window.JSON.parse(a)
        } catch (b) {
            return !1
        }
    },
        sc = qc ? window.JSON.stringify : oc,
        tc = qc ? rc : pc;
    rc || (Date.prototype.toJSON = function () {
        return [this.getUTCFullYear(), "-", S(this.getUTCMonth() + 1), "-", S(this.getUTCDate()), "T", S(this.getUTCHours()), ":", S(this.getUTCMinutes()), ":", S(this.getUTCSeconds()), "Z"].join("")
    });
    var uc = function (a) {
        var b;
        a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
        return za(document, b ? b : a)
    },
        vc = function (a) {
            a = a || "canonical";
            for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
                var e = b[c],
                    f = e.getAttribute("rel");
                if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = uc(e)) && null != e.match(/^https?:\/\/[\w\-\_\.]+/i)) return e
            }
            return window.location.href
        };
    var wc = {
        se: "0"
    },
        xc = {
            post: !0
        },
        yc = {
            style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
        },
        zc = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),
        Ac = u(E, "WI", v()),
        Bc = function (a, b, c) {
            var d;
            var e = {};
            var f = d = a;
            "plus" == a && b.action && (d = a + "_" + b.action, f = a + "/" + b.action);
            (d = P("iframes/" + d + "/url")) || (d = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + f + "?usegapi=1");
            for (var g in wc) e[g] = g + "/" + (b[g] || wc[g]) + "/";
            e = za(p, d.replace(jc,
                mc(e)));
            g = "iframes/" + a + "/params/";
            f = {};
            z(b, f);
            (d = P("lang") || P("gwidget/lang")) && (f.hl = d);
            xc[a] || (f.origin = window.location.origin || window.location.protocol + "//" + window.location.host);
            f.exp = P(g + "exp");
            if (g = P(g + "location"))
                for (d = 0; d < g.length; d++) {
                    var h = g[d];
                    f[h] = m.location[h]
                }
            switch (a) {
                case "plus":
                case "follow":
                    g = f.href;
                    d = b.action ? void 0 : "publisher";
                    g = (g = "string" == typeof g ? g : void 0) ? uc(g) : vc(d);
                    f.url = g;
                    delete f.href;
                    break;
                case "plusone":
                    g = (g = b.href) ? uc(g) : vc();
                    f.url = g;
                    g = b.db;
                    d = P();
                    null == g && d && (g = d.db,
                        null == g && (g = d.gwidget && d.gwidget.db));
                    f.db = g || void 0;
                    g = b.ecp;
                    d = P();
                    null == g && d && (g = d.ecp, null == g && (g = d.gwidget && d.gwidget.ecp));
                    f.ecp = g || void 0;
                    delete f.href;
                    break;
                case "signin":
                    f.url = vc()
            }
            E.ILI && (f.iloader = "1");
            delete f["data-onload"];
            delete f.rd;
            for (var k in wc) f[k] && delete f[k];
            f.gsrc = P("iframes/:source:");
            k = P("inline/css");
            "undefined" !== typeof k && 0 < c && k >= c && (f.ic = "1");
            k = /^#|^fr-/;
            c = {};
            for (var l in f) x(f, l) && k.test(l) && (c[l.replace(k, "")] = f[l], delete f[l]);
            l = "q" == P("iframes/" + a + "/params/si") ? f :
                c;
            k = zb();
            for (var n in k) !x(k, n) || x(f, n) || x(c, n) || (l[n] = k[n]);
            n = [].concat(zc);
            (l = P("iframes/" + a + "/methods")) && "object" === typeof l && ea.test(l.push) && (n = n.concat(l));
            for (var w in b) x(b, w) && /^on/.test(w) && ("plus" != a || "onconnect" != w) && (n.push(w), delete f[w]);
            delete f.callback;
            c._methods = n.join(",");
            return xa(e, f, c)
        },
        Cc = ["style", "data-gapiscan"],
        Ec = function (a) {
            for (var b = v(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
                var f = a.attributes[d],
                    g = f.name,
                    h = f.value;
                0 <= fa.call(Cc,
                    g) || c && 0 != g.indexOf("data-") || "null" === h || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = h)
            }
            a = a.style;
            (c = Dc(a && a.height)) && (b.height = String(c));
            (a = Dc(a && a.width)) && (b.width = String(a));
            return b
        },
        Dc = function (a) {
            var b = void 0;
            "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
            return b
        },
        Gc = function () {
            var a = E.drw;
            Fb(function (b) {
                if (a !== b.id && 4 != b.state && "share" != b.type) {
                    var c = b.id,
                        d = b.type,
                        e = b.url;
                    b = b.userParams;
                    var f = p.getElementById(c);
                    if (f) {
                        var g = Bc(d, b, 0);
                        g ? (f = f.parentNode,
                            e.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") !== g.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") && (b.dontclear = !0, b.rd = !0, b.ri = !0, b.type = d, Fc(f, b), (d = Q[f.lastChild.id]) && (d.oid = c), Gb(c, 4))) : delete Q[c]
                    } else delete Q[c]
                }
            })
        };
    var T, U, V, Hc, Ic, Jc = /(?:^|\s)g-((\S)*)(?:$|\s)/,
        Kc = {
            plusone: !0,
            autocomplete: !0,
            profile: !0,
            signin: !0,
            signin2: !0
        };
    T = u(E, "SW", v());
    U = u(E, "SA", v());
    V = u(E, "SM", v());
    Hc = u(E, "FW", []);
    Ic = null;
    var Mc = function (a, b) {
        Lc(void 0, !1, a, b)
    },
        Lc = function (a, b, c, d) {
            G("ps0", !0);
            c = ("string" === typeof c ? document.getElementById(c) : c) || p;
            var e = p.documentMode;
            if (c.querySelectorAll && (!e || 8 < e)) {
                e = d ? [d] : na(T).concat(na(U)).concat(na(V));
                for (var f = [], g = 0; g < e.length; g++) {
                    var h = e[g];
                    f.push(".g-" + h, "g\\:" + h)
                }
                e = c.querySelectorAll(f.join(","))
            } else e = c.getElementsByTagName("*");
            c = v();
            for (f = 0; f < e.length; f++) {
                g = e[f];
                var k = g,
                    h = d,
                    l = k.nodeName.toLowerCase(),
                    n = void 0;
                k.getAttribute("data-gapiscan") ? h = null : (0 == l.indexOf("g:") ?
                    n = l.substr(2) : (k = (k = String(k.className || k.getAttribute("class"))) && Jc.exec(k)) && (n = k[1]), h = !n || !(T[n] || U[n] || V[n]) || h && n !== h ? null : n);
                h && (Kc[h] || 0 == g.nodeName.toLowerCase().indexOf("g:") || 0 != na(Ec(g)).length) && (g.setAttribute("data-gapiscan", !0), u(c, h, []).push(g))
            }
            if (b)
                for (var w in c)
                    for (b = c[w], d = 0; d < b.length; d++) b[d].setAttribute("data-onload", !0);
            for (var q in c) Hc.push(q);
            G("ps1", !0);
            if ((w = Hc.join(":")) || a) try {
                B.load(w, a)
            } catch (t) {
                Cb(t);
                return
            }
            if (Nc(Ic || {}))
                for (var y in c) {
                    a = c[y];
                    q = 0;
                    for (b = a.length; q <
                        b; q++) a[q].removeAttribute("data-gapiscan");
                    Oc(y)
                } else {
                d = [];
                for (y in c)
                    for (a = c[y], q = 0, b = a.length; q < b; q++) e = a[q], Pc(y, e, Ec(e), d, b);
                Qc(w, d)
            }
        },
        Rc = function (a) {
            var b = u(B, a, {});
            b.go || (b.go = function (b) {
                return Mc(b, a)
            }, b.render = function (b, d) {
                d = d || {};
                d.type = a;
                return Fc(b, d)
            })
        },
        Sc = function (a) {
            T[a] = !0
        },
        Tc = function (a) {
            U[a] = !0
        },
        Uc = function (a) {
            V[a] = !0
        };
    var Oc = function (a, b) {
        var c = Ka(a);
        b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : B.load(a, function () {
            var c = Ka(a),
                e = b && b.iframeNode,
                f = b && b.userParams;
            e && c ? (c(b), e.setAttribute("data-gapiattached", !0)) : (c = B[a].go, "signin2" == a ? c(e, f) : c(e && e.parentNode, f))
        })
    },
        Nc = function () {
            return !1
        },
        Qc = function () { },
        Pc = function (a, b, c, d, e, f, g) {
            switch (Vc(b, a, f)) {
                case 0:
                    a = V[a] ? a + "_annotation" : a;
                    d = {};
                    d.iframeNode = b;
                    d.userParams = c;
                    Oc(a, d);
                    break;
                case 1:
                    if (b.parentNode) {
                        for (var h in c) {
                            if (f = x(c, h)) f = c[h],
                                f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                            if (f) try {
                                c[h] = sc(c[h])
                            } catch (F) {
                                delete c[h]
                            }
                        }
                        f = !0;
                        c.dontclear && (f = !1);
                        delete c.dontclear;
                        Eb();
                        h = Bc(a, c, e);
                        e = g || {};
                        e.allowPost = 1;
                        e.attributes = yc;
                        e.dontclear = !f;
                        g = {};
                        g.userParams = c;
                        g.url = h;
                        g.type = a;
                        if (c.rd) var k = b;
                        else k = document.createElement("div"), b.setAttribute("data-gapistub", !0), k.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(k, b);
                        g.siteElement =
                            k;
                        k.id || (b = k, u(Ac, a, 0), f = "___" + a + "_" + Ac[a]++, b.id = f);
                        b = v();
                        b[">type"] = a;
                        z(c, b);
                        f = h;
                        c = k;
                        h = e || {};
                        b = h.attributes || {};
                        A(!(h.allowPost || h.forcePost) || !b.onload, "onload is not supported by post iframe (allowPost or forcePost)");
                        e = b = f;
                        ic.test(b) && (e = P("iframes/" + e.substring(1) + "/url"), A(!!e, "Unknown iframe url config for - " + b));
                        f = za(p, e.replace(jc, lc));
                        b = c.ownerDocument || p;
                        k = 0;
                        do e = h.id || ["I", fc++, "_", (new Date).getTime()].join(""); while (b.getElementById(e) && 5 > ++k);
                        A(5 > k, "Error creating iframe id");
                        k = {};
                        var l = {};
                        b.documentMode && 9 > b.documentMode && (k.hostiemode = b.documentMode);
                        z(h.queryParams || {}, k);
                        z(h.fragmentParams || {}, l);
                        var n = h.connectWithQueryParams ? k : l,
                            w = h.pfname,
                            q = v();
                        q.id = e;
                        q.parent = b.location.protocol + "//" + b.location.host;
                        var y = C(b.location.href, "parent"),
                            w = w || "";
                        !w && y && (y = C(b.location.href, "id", ""), w = C(b.location.href, "pfname", ""), w = y ? w + "/" + y : "");
                        q.pfname = w;
                        z(q, n);
                        (q = C(f, "rpctoken") || k.rpctoken || l.rpctoken) || (q = n.rpctoken = h.rpctoken || String(Math.round(1E8 * (Qb ? Zb() : Yb()))));
                        h.rpctoken = q;
                        q = b.location.href;
                        n = v();
                        (y = C(q, "_bsh", E.bsh)) && (n._bsh = y);
                        (q = Ia(q)) && (n.jsh = q);
                        h.hintInFragment ? z(n, l) : z(n, k);
                        f = xa(f, k, l, h.paramsSerializer);
                        l = v();
                        z(dc, l);
                        z(h.attributes, l);
                        l.name = l.id = e;
                        l.src = f;
                        h.eurl = f;
                        k = h || {};
                        n = !!k.allowPost;
                        if (k.forcePost || n && 2E3 < f.length) {
                            k = D(f);
                            l.src = "";
                            l["data-postorigin"] = f;
                            f = hc(b, c, l, e);
                            if (-1 != navigator.userAgent.indexOf("WebKit")) {
                                var t = f.contentWindow.document;
                                t.open();
                                l = t.createElement("div");
                                n = {};
                                q = e + "_inner";
                                n.name = q;
                                n.src = "";
                                n.style = "display:none";
                                hc(b, l, n, q, h)
                            }
                            l = (h =
                                k.query[0]) ? h.split("&") : [];
                            h = [];
                            for (n = 0; n < l.length; n++) q = l[n].split("=", 2), h.push([decodeURIComponent(q[0]), decodeURIComponent(q[1])]);
                            k.query = [];
                            l = va(k);
                            A(Aa.test(l), "Invalid URL: " + l);
                            k = b.createElement("form");
                            k.action = l;
                            k.method = "POST";
                            k.target = e;
                            k.style.display = "none";
                            for (e = 0; e < h.length; e++) l = b.createElement("input"), l.type = "hidden", l.name = h[e][0], l.value = h[e][1], k.appendChild(l);
                            c.appendChild(k);
                            k.submit();
                            k.parentNode.removeChild(k);
                            t && t.close();
                            t = f
                        } else t = hc(b, c, l, e, h);
                        g.iframeNode = t;
                        g.id =
                            t.getAttribute("id");
                        t = g.id;
                        c = v();
                        c.id = t;
                        c.userParams = g.userParams;
                        c.url = g.url;
                        c.type = g.type;
                        c.state = 1;
                        Q[t] = c;
                        t = g
                    } else t = null;
                    t && ((g = t.id) && d.push(g), Oc(a, t))
            }
        },
        Vc = function (a, b, c) {
            if (a && 1 === a.nodeType && b) {
                if (c) return 1;
                if (V[b]) {
                    if (Ha[a.nodeName.toLowerCase()]) return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
                } else {
                    if (U[b]) return 0;
                    if (T[b]) return 1
                }
            }
            return null
        },
        Fc = function (a, b) {
            var c = b.type;
            delete b.type;
            var d = ("string" === typeof a ? document.getElementById(a) : a) || void 0;
            if (d) {
                a = {};
                for (var e in b) x(b,
                    e) && (a[e.toLowerCase()] = b[e]);
                a.rd = 1;
                (b = !!a.ri) && delete a.ri;
                e = [];
                Pc(c, d, a, e, 0, b, void 0);
                Qc(c, e)
            } else Cb("string" === "gapi." + c + ".render: missing element " + typeof a ? a : "")
        };
    u(B, "platform", {}).go = Mc;
    var Nc = function (a) {
        for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++) a = a[b[c]];
        b = Ia(r.href);
        return !a || 0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b
    },
        Qc = function (a, b) {
            Wc(a, b)
        },
        Da = function (a) {
            Lc(a, !0)
        },
        Xc = function (a, b) {
            b = b || [];
            for (var c = 0; c < b.length; ++c) a(b[c]);
            for (a = 0; a < b.length; a++) Rc(b[a])
        };
    I.push(["platform", function (a, b, c) {
        Ic = c;
        b && Hc.push(b);
        Xc(Sc, a);
        Xc(Tc, c._c.annotation);
        Xc(Uc, c._c.bimodal);
        vb();
        tb();
        if ("explicit" != P("parsetags")) {
            Ja(a);
            Ab(zb()) && !P("disableRealtimeCallback") && Eb();
            if (c && (a = c.callback)) {
                var d = oa(a);
                delete c.callback
            }
            Fa(function () {
                Da(d)
            })
        }
    }]);
    B._pl = !0;
    var Yc = function (a) {
        a = (a = Q[a]) ? a.oid : void 0;
        if (a) {
            var b = p.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete Q[a];
            Yc(a)
        }
    };
    var Zc = /^\{h\:'/,
        $c = /^!_/,
        ad = "",
        Wc = function (a, b) {
            function c() {
                Ba("message", d, "remove", "de")
            }

            function d(d) {
                var f = d.data,
                    h = d.origin;
                if (bd(f, b)) {
                    var k = e;
                    e = !1;
                    k && G("rqe");
                    cd(a, function () {
                        k && G("rqd");
                        c();
                        for (var a = u(E, "RPMQ", []), b = 0; b < a.length; b++) a[b]({
                            data: f,
                            origin: h
                        })
                    })
                }
            }
            if (0 !== b.length) {
                ad = C(r.href, "pfname", "");
                var e = !0;
                Ba("message", d, "add", "at");
                L(a, c)
            }
        },
        bd = function (a, b) {
            a = String(a);
            if (Zc.test(a)) return !0;
            var c = !1;
            $c.test(a) && (c = !0, a = a.substr(2));
            if (!/^\{/.test(a)) return !1;
            var d = tc(a);
            if (!d) return !1;
            a = d.f;
            if (d.s && a && -1 != fa.call(b, a)) {
                if ("_renderstart" === d.s || d.s === ad + "/" + a + "::_renderstart")
                    if (d = d.a && d.a[c ? 0 : 1], b = p.getElementById(a), Gb(a, 2), d && b && d.width && d.height) {
                        a: {
                            var c = b.parentNode,
                                e;
                            a = d || {};
                            if (Db() && (e = b.id)) {
                                d = (d = Q[e]) ? d.state : void 0;
                                if (1 === d || 4 === d) break a;
                                Yc(e)
                            } (d = c.nextSibling) && d.getAttribute && d.getAttribute("data-gapistub") && (c.parentNode.removeChild(d), c.style.cssText = "");
                            var d = a.width,
                                f = a.height,
                                g = c.style;
                            g.textIndent = "0";
                            g.margin = "0";
                            g.padding = "0";
                            g.background = "transparent";
                            g.borderStyle =
                                "none";
                            g.cssFloat = "none";
                            g.styleFloat = "none";
                            g.lineHeight = "normal";
                            g.fontSize = "1px";
                            g.verticalAlign = "baseline";
                            c = c.style;
                            c.display = "inline-block";
                            g = b.style;
                            g.position = "static";
                            g.left = "0";
                            g.top = "0";
                            g.visibility = "visible";
                            d && (c.width = g.width = d + "px");
                            f && (c.height = g.height = f + "px");
                            a.verticalAlign && (c.verticalAlign = a.verticalAlign);
                            e && Gb(e, 3)
                        }
                        b["data-csi-wdt"] = (new Date).getTime()
                    }
                return !0
            }
            return !1
        },
        cd = function (a, b) {
            L(a, b)
        };
    var W = function (a, b) {
        this.G = a;
        a = b || {};
        this.X = Number(a.maxAge) || 0;
        this.M = a.domain;
        this.P = a.path;
        this.Z = !!a.secure
    },
        dd = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
        ed = /^[A-Z_][A-Z0-9_]{0,63}$/;
    W.prototype.read = function () {
        for (var a = this.G + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a)) return d.substr(a.length)
        }
    };
    W.prototype.write = function (a, b) {
        if (!ed.test(this.G)) throw "Invalid cookie name";
        if (!dd.test(a)) throw "Invalid cookie value";
        a = this.G + "=" + a;
        this.M && (a += ";domain=" + this.M);
        this.P && (a += ";path=" + this.P);
        b = "number" === typeof b ? b : this.X;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.Z && (a += ";secure");
        document.cookie = a;
        return !0
    };
    W.prototype.clear = function () {
        this.write("", 0)
    };
    W.iterate = function (a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="),
                e = d.shift();
            a(e, d.join("="))
        }
    };
    var X = function (a) {
        this.w = a
    },
        Y = {};
    X.prototype.read = function () {
        if (Y.hasOwnProperty(this.w)) return Y[this.w]
    };
    X.prototype.write = function (a) {
        Y[this.w] = a;
        return !0
    };
    X.prototype.clear = function () {
        delete Y[this.w]
    };
    X.iterate = function (a) {
        for (var b in Y) Y.hasOwnProperty(b) && a(b, Y[b])
    };
    var fd = "https:" === window.location.protocol,
        gd = fd || "http:" === window.location.protocol ? W : X,
        hd = function (a) {
            var b = a.substr(1),
                c = "",
                d = window.location.hostname;
            if ("" !== b) {
                c = parseInt(b, 10);
                if (isNaN(c)) return null;
                b = d.split(".");
                if (b.length < c - 1) return null;
                b.length == c - 1 && (d = "." + d)
            } else d = "";
            return {
                g: "S" == a.charAt(0),
                domain: d,
                j: c
            }
        },
        id = function () {
            var a, b = null;
            gd.iterate(function (c, d) {
                0 === c.indexOf("G_AUTHUSER_") && (c = hd(c.substring(11)), !a || c.g && !a.g || c.g == a.g && c.j > a.j) && (a = c, b = d)
            });
            return {
                W: a,
                C: b
            }
        };
    var jd = function (a) {
        if (0 !== a.indexOf("GCSC")) return null;
        var b = {
            O: !1
        };
        a = a.substr(4);
        if (!a) return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d) return b;
        var e = hd(a.substr(d + 1));
        if (null == e) return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0)) return b;
        d = "E" === c && e.g;
        return !d && ("U" !== c || e.g) || d && !fd ? b : {
            O: !0,
            g: d,
            ba: a.substr(1),
            domain: e.domain,
            j: e.j
        }
    },
        kd = function (a) {
            if (!a) return [];
            a = a.split("=");
            return a[1] ? a[1].split("|") : []
        },
        ld = function (a) {
            a = a.split(":");
            return {
                clientId: a[0].split("=")[1],
                aa: kd(a[1]),
                da: kd(a[2]),
                ca: kd(a[3])
            }
        },
        md = function () {
            var a = id(),
                b = a.W,
                a = a.C;
            if (null !== a) {
                var c;
                gd.iterate(function (a, d) {
                    (a = jd(a)) && a.O && a.g == b.g && a.j == b.j && (c = d)
                });
                if (c) {
                    var d = ld(c),
                        e = d && d.aa[Number(a)],
                        d = d && d.clientId;
                    if (e) return {
                        C: a,
                        $: e,
                        clientId: d
                    }
                }
            }
            return null
        };
    var Z = function (a) {
        this.L = a
    };
    Z.prototype.o = 0;
    Z.prototype.J = 2;
    Z.prototype.L = null;
    Z.prototype.F = !1;
    Z.prototype.T = function () {
        this.F || (this.o = 0, this.F = !0, this.R())
    };
    Z.prototype.R = function () {
        this.F && (this.L() ? this.o = this.J : this.o = Math.min(2 * (this.o || this.J), 120), window.setTimeout(ca(this.R, this), 1E3 * this.o))
    };
    for (var nd = 0; 64 > nd; ++nd);
    var od = null,
        Db = function () {
            return E.oa = !0
        },
        Eb = function () {
            E.oa = !0;
            var a = md();
            (a = a && a.C) && ub("googleapis.config/sessionIndex", a);
            od || (od = u(E, "ss", new Z(pd)));
            a = od;
            a.T && a.T()
        },
        pd = function () {
            var a = md(),
                b = a && a.$ || null,
                c = a && a.clientId;
            L("auth", {
                callback: function () {
                    var a = m.gapi.auth,
                        e = {
                            client_id: c,
                            session_state: b
                        };
                    a.checkSessionState(e, function (b) {
                        var c = e.session_state,
                            d = P("isLoggedIn");
                        b = P("debug/forceIm") ? !1 : c && b || !c && !b;
                        if (d = d != b) ub("isLoggedIn", b), Eb(), Gc(), b || ((b = a.signOut) ? b() : (b = a.setToken) && b(null));
                        b = zb();
                        var f = P("savedUserState"),
                            c = a._guss(b.cookiepolicy),
                            f = f != c && "undefined" != typeof f;
                        ub("savedUserState", c);
                        (d || f) && Ab(b) && !P("disableRealtimeCallback") && a._pimf(b, !0)
                    })
                }
            });
            return !0
        };
    G("bs0", !0, window.gapi._bs);
    G("bs1", !0);
    delete window.gapi._bs;
}).call(this);
gapi.load("plusone", {
    callback: window["gapi_onload"],
    _c: {
        "jsl": {
            "ci": {
                "deviceType": "desktop",
                "oauth-flow": {
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "disableOpt": true,
                    "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                    "usegapi": false
                },
                "debug": {
                    "reportExceptionRate": 0.05,
                    "forceIm": false,
                    "rethrowException": false,
                    "host": "https://apis.google.com"
                },
                "enableMultilogin": true,
                "googleapis.config": {
                    "auth": {
                        "useFirstPartyAuthV2": false
                    }
                },
                "isPlusUser": false,
                "inline": {
                    "css": 1
                },
                "disableRealtimeCallback": false,
                "drive_share": {
                    "skipInitCommand": true
                },
                "csi": {
                    "rate": 0.01
                },
                "client": {
                    "cors": false,
                    "batchPath": {
                        "translate": "batch/translate"
                    },
                    "perApiBatch": false
                },
                "isLoggedIn": false,
                "signInDeprecation": {
                    "rate": 0.0
                },
                "include_granted_scopes": true,
                "llang": "ar",
                "iframes": {
                    "ytsubscribe": {
                        "url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"
                    },
                    "plus_share": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                    },
                    ":source:": "3p",
                    "playemm": {
                        "url": "https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "partnersbadge": {
                        "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"
                    },
                    "dataconnector": {
                        "url": "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"
                    },
                    "shortlists": {
                        "url": ""
                    },
                    "plus_followers": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                    },
                    "post": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                    },
                    "signin": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                        "methods": ["onauth"]
                    },
                    "donation": {
                        "url": "https://onetoday.google.com/home/donationWidget?usegapi\u003d1"
                    },
                    "plusone": {
                        "params": {
                            "count": "",
                            "size": "",
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                    },
                    ":im_socialhost:": "https://plus.googleapis.com",
                    "backdrop": {
                        "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"
                    },
                    "visibility": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                    },
                    "additnow": {
                        "url": "https://apis.google.com/additnow/additnow.html?usegapi\u003d1",
                        "methods": ["launchurl"]
                    },
                    ":signuphost:": "https://plus.google.com",
                    "community": {
                        "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"
                    },
                    "plus": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"
                    },
                    "commentcount": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"
                    },
                    "zoomableimage": {
                        "url": "https://ssl.gstatic.com/microscope/embed/"
                    },
                    "appfinder": {
                        "url": "https://gsuite.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"
                    },
                    "person": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"
                    },
                    "savetodrive": {
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                        "methods": ["save"]
                    },
                    "page": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"
                    },
                    "card": {
                        "url": ":socialhost:/:session_prefix:_/hovercard/card"
                    },
                    "youtube": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "plus_circle": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                    },
                    "rbr_s": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                    },
                    "udc_webconsentflow": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://myaccount.google.com/webconsent?usegapi\u003d1"
                    },
                    "savetoandroidpay": {
                        "url": "https://androidpay.google.com/a/widget/save"
                    },
                    "blogger": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "evwidget": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                    },
                    "surveyoptin": {
                        "url": "https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"
                    },
                    ":socialhost:": "https://apis.google.com",
                    "hangout": {
                        "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                    },
                    ":gplus_url:": "https://plus.google.com",
                    "rbr_i": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                    },
                    "share": {
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"
                    },
                    "comments": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "autocomplete": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                    },
                    "ratingbadge": {
                        "url": "https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"
                    },
                    "appcirclepicker": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                    },
                    "follow": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"
                    },
                    "sharetoclassroom": {
                        "url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"
                    },
                    "ytshare": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                    },
                    "family_creation": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "configurator": {
                        "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"
                    },
                    "savetowallet": {
                        "url": "https://androidpay.google.com/a/widget/save"
                    }
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.ar.ObhJI0Iq8kg.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCMYOW9MqQ2YzZs66EPTKx7WMvZMag",
            "u": "https://apis.google.com/js/plusone.js",
            "hee": true,
            "fp": "cc0b3c32d7a44cc3578c9267d7714ebd3ad930e7",
            "dpo": false
        },
        "platform": ["additnow", "backdrop", "blogger", "comments", "commentcount", "community", "family_creation", "follow", "hangout", "page", "partnersbadge", "person", "playemm", "playreview", "plus", "plusone", "post", "savetoandroidpay", "savetodrive", "savetowallet", "shortlists", "signin2", "udc_webconsentflow", "visibility", "youtube", "ytsubscribe", "zoomableimage", "sharetoclassroom", "donation", "ratingbadge", "surveyoptin"],
        "fp": "cc0b3c32d7a44cc3578c9267d7714ebd3ad930e7",
        "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
        "bimodal": ["signin", "share"]
    }
});