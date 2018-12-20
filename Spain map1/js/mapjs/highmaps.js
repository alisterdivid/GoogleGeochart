
(function (I, a) {
    "object" === typeof module && module.exports ? module.exports = I.document ? a(I) : a : I.Highcharts = a(I)
})("undefined" !== typeof window ? window : this, function (I) {
    I = function () {
        var a = window, y = a.document, F = a.navigator && a.navigator.userAgent || "", A = y && y.createElementNS && !!y.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, D = /(edge|msie|trident)/i.test(F) && !window.opera, f = !A, k = /Firefox/.test(F), r = k && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
                product: "Highmaps",
                version: "5.0.7",
                deg2rad: 2 * Math.PI / 360,
                doc: y,
                hasBidiBug: r,
                hasTouch: y && void 0 !== y.documentElement.ontouchstart,
                isMS: D,
                isWebKit: /AppleWebKit/.test(F),
                isFirefox: k,
                isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
                SVG_NS: "http://www.w3.org/2000/svg",
                chartCount: 0,
                seriesTypes: {},
                symbolSizes: {},
                svg: A,
                vml: f,
                win: a,
                charts: [],
                marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
                noop: function () {
                }
            }
    }();
    (function (a) {
        var y = [], F = a.charts, A = a.doc, D = a.win;
        a.error = function (f, k) {
            f = a.isNumber(f) ? "Highcharts error #" +
                f + "/errors/" + f : f;
            if (k)throw Error(f);
            D.console && console.log(f)
        };
        a.Fx = function (a, k, r) {
            this.options = k;
            this.elem = a;
            this.prop = r
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], k = this.paths[1], r = [], t = this.now, e = a.length, p;
                if (1 === t) r = this.toD; else if (e === k.length && 1 > t)for (; e--;)p = parseFloat(a[e]), r[e] = isNaN(p) ? a[e] : t * parseFloat(k[e] - p) + p; else r = k;
                this.elem.attr("d", r, null, !0)
            }, update: function () {
                var a = this.elem, k = this.prop, r = this.now, t = this.options.step;
                if (this[k + "Setter"]) this[k +
                "Setter"](); else a.attr ? a.element && a.attr(k, r, null, !0) : a.style[k] = r + this.unit;
                t && t.call(a, r, this)
            }, run: function (a, k, r) {
                var f = this, e = function (a) {
                    return e.stopped ? !1 : f.step(a)
                }, p;
                this.startTime = +new Date;
                this.start = a;
                this.end = k;
                this.unit = r;
                this.now = this.start;
                this.pos = 0;
                e.elem = this.elem;
                e.prop = this.prop;
                e() && 1 === y.push(e) && (e.timerId = setInterval(function () {
                    for (p = 0; p < y.length; p++)y[p]() || y.splice(p--, 1);
                    y.length || clearInterval(e.timerId)
                }, 13))
            }, step: function (a) {
                var f = +new Date, r, t = this.options;
                r = this.elem;
                var e = t.complete, p = t.duration, d = t.curAnim, q;
                if (r.attr && !r.element) r = !1; else if (a || f >= p + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = d[this.prop] = !0;
                    for (q in d)!0 !== d[q] && (a = !1);
                    a && e && e.call(r);
                    r = !1
                } else this.pos = t.easing((f - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), r = !0;
                return r
            }, initPath: function (f, k, r) {
                function t(a) {
                    var g, c;
                    for (b = a.length; b--;)g = "M" === a[b] || "L" === a[b], c = /[a-zA-Z]/.test(a[b + 3]), g && c && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b +
                    2])
                }

                function e(a, g) {
                    for (; a.length < m;) {
                        a[0] = g[m - a.length];
                        var c = a.slice(0, n);
                        [].splice.apply(a, [0, 0].concat(c));
                        E && (c = a.slice(a.length - n), [].splice.apply(a, [a.length, 0].concat(c)), b--)
                    }
                    a[0] = "M"
                }

                function p(a, b) {
                    for (var g = (m - a.length) / n; 0 < g && g--;)c = a.slice().splice(a.length / u - n, n * u), c[0] = b[m - n - g * n], v && (c[n - 6] = c[n - 2], c[n - 5] = c[n - 1]), [].splice.apply(a, [a.length / u, 0].concat(c)), E && g--
                }

                k = k || "";
                var d, q = f.startX, x = f.endX, v = -1 < k.indexOf("C"), n = v ? 7 : 3, m, c, b;
                k = k.split(" ");
                r = r.slice();
                var E = f.isArea, u = E ? 2 : 1, g;
                v && (t(k), t(r));
                if (q && x) {
                    for (b = 0; b < q.length; b++)if (q[b] === x[0]) {
                        d = b;
                        break
                    } else if (q[0] === x[x.length - q.length + b]) {
                        d = b;
                        g = !0;
                        break
                    }
                    void 0 === d && (k = [])
                }
                k.length && a.isNumber(d) && (m = r.length + d * u * n, g ? (e(k, r), p(r, k)) : (e(r, k), p(k, r)));
                return [k, r]
            }
        };
        a.extend = function (a, k) {
            var f;
            a || (a = {});
            for (f in k)a[f] = k[f];
            return a
        };
        a.merge = function () {
            var f, k = arguments, r, t = {}, e = function (p, d) {
                var f, k;
                "object" !== typeof p && (p = {});
                for (k in d)d.hasOwnProperty(k) && (f = d[k], a.isObject(f, !0) && "renderTo" !== k && "number" !== typeof f.nodeType ?
                    p[k] = e(p[k] || {}, f) : p[k] = d[k]);
                return p
            };
            !0 === k[0] && (t = k[1], k = Array.prototype.slice.call(k, 2));
            r = k.length;
            for (f = 0; f < r; f++)t = e(t, k[f]);
            return t
        };
        a.pInt = function (a, k) {
            return parseInt(a, k || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (f, k) {
            return f && "object" === typeof f && (!k || !a.isArray(f))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase =
            function (a, k) {
                for (var f = a.length; f--;)if (a[f] === k) {
                    a.splice(f, 1);
                    break
                }
            };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (f, k, r) {
            var t, e;
            if (a.isString(k)) a.defined(r) ? f.setAttribute(k, r) : f && f.getAttribute && (e = f.getAttribute(k)); else if (a.defined(k) && a.isObject(k))for (t in k)f.setAttribute(t, k[t]);
            return e
        };
        a.splat = function (f) {
            return a.isArray(f) ? f : [f]
        };
        a.syncTimeout = function (a, k, r) {
            if (k)return setTimeout(a, k, r);
            a.call(0, r)
        };
        a.pick = function () {
            var a = arguments, k, r, t = a.length;
            for (k =
                     0; k < t; k++)if (r = a[k], void 0 !== r && null !== r)return r
        };
        a.css = function (f, k) {
            a.isMS && !a.svg && k && void 0 !== k.opacity && (k.filter = "alpha(opacity\x3d" + 100 * k.opacity + ")");
            a.extend(f.style, k)
        };
        a.createElement = function (f, k, r, t, e) {
            f = A.createElement(f);
            var p = a.css;
            k && a.extend(f, k);
            e && p(f, {padding: 0, border: "none", margin: 0});
            r && p(f, r);
            t && t.appendChild(f);
            return f
        };
        a.extendClass = function (f, k) {
            var r = function () {
            };
            r.prototype = new f;
            a.extend(r.prototype, k);
            return r
        };
        a.pad = function (a, k, r) {
            return Array((k || 2) + 1 - String(a).length).join(r ||
                    0) + a
        };
        a.relativeLength = function (a, k) {
            return /%$/.test(a) ? k * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a, k, r) {
            var f = a[k];
            a[k] = function () {
                var a = Array.prototype.slice.call(arguments), p = arguments, d = this;
                d.proceed = function () {
                    f.apply(d, arguments.length ? arguments : p)
                };
                a.unshift(f);
                a = r.apply(this, a);
                d.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (f) {
            var k = a.Date;
            return 6E4 * (k.hcGetTimezoneOffset && k.hcGetTimezoneOffset(f) || k.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (f, k, r) {
            if (!a.defined(k) || isNaN(k))return a.defaultOptions.lang.invalidDate ||
                "";
            f = a.pick(f, "%Y-%m-%d %H:%M:%S");
            var t = a.Date, e = new t(k - a.getTZOffset(k)), p, d = e[t.hcGetHours](), q = e[t.hcGetDay](), x = e[t.hcGetDate](), v = e[t.hcGetMonth](), n = e[t.hcGetFullYear](), m = a.defaultOptions.lang, c = m.weekdays, b = m.shortWeekdays, E = a.pad, t = a.extend({
                a: b ? b[q] : c[q].substr(0, 3),
                A: c[q],
                d: E(x),
                e: E(x, 2, " "),
                w: q,
                b: m.shortMonths[v],
                B: m.months[v],
                m: E(v + 1),
                y: n.toString().substr(2, 2),
                Y: n,
                H: E(d),
                k: d,
                I: E(d % 12 || 12),
                l: d % 12 || 12,
                M: E(e[t.hcGetMinutes]()),
                p: 12 > d ? "AM" : "PM",
                P: 12 > d ? "am" : "pm",
                S: E(e.getSeconds()),
                L: E(Math.round(k %
                    1E3), 3)
            }, a.dateFormats);
            for (p in t)for (; -1 !== f.indexOf("%" + p);)f = f.replace("%" + p, "function" === typeof t[p] ? t[p](k) : t[p]);
            return r ? f.substr(0, 1).toUpperCase() + f.substr(1) : f
        };
        a.formatSingle = function (f, k) {
            var r = /\.([0-9])/, t = a.defaultOptions.lang;
            /f$/.test(f) ? (r = (r = f.match(r)) ? r[1] : -1, null !== k && (k = a.numberFormat(k, r, t.decimalPoint, -1 < f.indexOf(",") ? t.thousandsSep : ""))) : k = a.dateFormat(f, k);
            return k
        };
        a.format = function (f, k) {
            for (var r = "{", t = !1, e, p, d, q, x = [], v; f;) {
                r = f.indexOf(r);
                if (-1 === r)break;
                e = f.slice(0,
                    r);
                if (t) {
                    e = e.split(":");
                    p = e.shift().split(".");
                    q = p.length;
                    v = k;
                    for (d = 0; d < q; d++)v = v[p[d]];
                    e.length && (v = a.formatSingle(e.join(":"), v));
                    x.push(v)
                } else x.push(e);
                f = f.slice(r + 1);
                r = (t = !t) ? "}" : "{"
            }
            x.push(f);
            return x.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (f, k, r, t, e) {
            var p, d = f;
            r = a.pick(r, 1);
            p = f / r;
            k || (k = e ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === r ? k = a.grep(k, function (a) {
                    return 0 === a % 1
                }) : .1 >= r && (k = [1 / r])));
            for (t = 0; t < k.length && !(d = k[t], e && d * r >= f || !e && p <= (k[t] + (k[t + 1] || k[t])) / 2); t++);
            return d = a.correctFloat(d * r, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, k) {
            var f = a.length, t, e;
            for (e = 0; e < f; e++)a[e].safeI = e;
            a.sort(function (a, d) {
                t = k(a, d);
                return 0 === t ? a.safeI - d.safeI : t
            });
            for (e = 0; e < f; e++)delete a[e].safeI
        };
        a.arrayMin = function (a) {
            for (var k = a.length, f = a[0]; k--;)a[k] < f && (f = a[k]);
            return f
        };
        a.arrayMax = function (a) {
            for (var k = a.length, f = a[0]; k--;)a[k] > f && (f = a[k]);
            return f
        };
        a.destroyObjectProperties =
            function (a, k) {
                for (var f in a)a[f] && a[f] !== k && a[f].destroy && a[f].destroy(), delete a[f]
            };
        a.discardElement = function (f) {
            var k = a.garbageBin;
            k || (k = a.createElement("div"));
            f && k.appendChild(f);
            k.innerHTML = ""
        };
        a.correctFloat = function (a, k) {
            return parseFloat(a.toPrecision(k || 14))
        };
        a.setAnimation = function (f, k) {
            k.renderer.globalAnimation = a.pick(f, k.options.chart.animation, !0)
        };
        a.animObject = function (f) {
            return a.isObject(f) ? a.merge(f) : {duration: f ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5,
            day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5
        };
        a.numberFormat = function (f, k, r, t) {
            f = +f || 0;
            k = +k;
            var e = a.defaultOptions.lang, p = (f.toString().split(".")[1] || "").length, d, q;
            -1 === k ? k = Math.min(p, 20) : a.isNumber(k) || (k = 2);
            q = (Math.abs(f) + Math.pow(10, -Math.max(k, p) - 1)).toFixed(k);
            p = String(a.pInt(q));
            d = 3 < p.length ? p.length % 3 : 0;
            r = a.pick(r, e.decimalPoint);
            t = a.pick(t, e.thousandsSep);
            f = (0 > f ? "-" : "") + (d ? p.substr(0, d) + t : "");
            f += p.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + t);
            k && (f += r + q.slice(-k));
            return f
        };
        Math.easeInOutSine =
            function (a) {
                return -.5 * (Math.cos(Math.PI * a) - 1)
            };
        a.getStyle = function (f, k) {
            return "width" === k ? Math.min(f.offsetWidth, f.scrollWidth) - a.getStyle(f, "padding-left") - a.getStyle(f, "padding-right") : "height" === k ? Math.min(f.offsetHeight, f.scrollHeight) - a.getStyle(f, "padding-top") - a.getStyle(f, "padding-bottom") : (f = D.getComputedStyle(f, void 0)) && a.pInt(f.getPropertyValue(k))
        };
        a.inArray = function (a, k) {
            return k.indexOf ? k.indexOf(a) : [].indexOf.call(k, a)
        };
        a.grep = function (a, k) {
            return [].filter.call(a, k)
        };
        a.find = function (a,
                           k) {
            return [].find.call(a, k)
        };
        a.map = function (a, k) {
            for (var f = [], t = 0, e = a.length; t < e; t++)f[t] = k.call(a[t], a[t], t, a);
            return f
        };
        a.offset = function (a) {
            var k = A.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (D.pageYOffset || k.scrollTop) - (k.clientTop || 0),
                left: a.left + (D.pageXOffset || k.scrollLeft) - (k.clientLeft || 0)
            }
        };
        a.stop = function (a, k) {
            for (var f = y.length; f--;)y[f].elem !== a || k && k !== y[f].prop || (y[f].stopped = !0)
        };
        a.each = function (a, k, r) {
            return Array.prototype.forEach.call(a, k, r)
        };
        a.addEvent = function (f,
                               k, r) {
            function t(a) {
                a.target = a.srcElement || D;
                r.call(f, a)
            }

            var e = f.hcEvents = f.hcEvents || {};
            f.addEventListener ? f.addEventListener(k, r, !1) : f.attachEvent && (f.hcEventsIE || (f.hcEventsIE = {}), f.hcEventsIE[r.toString()] = t, f.attachEvent("on" + k, t));
            e[k] || (e[k] = []);
            e[k].push(r);
            return function () {
                a.removeEvent(f, k, r)
            }
        };
        a.removeEvent = function (f, k, r) {
            function t(a, d) {
                f.removeEventListener ? f.removeEventListener(a, d, !1) : f.attachEvent && (d = f.hcEventsIE[d.toString()], f.detachEvent("on" + a, d))
            }

            function e() {
                var a, e;
                if (f.nodeName)for (e in k ?
                    (a = {}, a[k] = !0) : a = d, a)if (d[e])for (a = d[e].length; a--;)t(e, d[e][a])
            }

            var p, d = f.hcEvents, q;
            d && (k ? (p = d[k] || [], r ? (q = a.inArray(r, p), -1 < q && (p.splice(q, 1), d[k] = p), t(k, r)) : (e(), d[k] = [])) : (e(), f.hcEvents = {}))
        };
        a.fireEvent = function (f, k, r, t) {
            var e;
            e = f.hcEvents;
            var p, d;
            r = r || {};
            if (A.createEvent && (f.dispatchEvent || f.fireEvent)) e = A.createEvent("Events"), e.initEvent(k, !0, !0), a.extend(e, r), f.dispatchEvent ? f.dispatchEvent(e) : f.fireEvent(k, e); else if (e)for (e = e[k] || [], p = e.length, r.target || a.extend(r, {
                preventDefault: function () {
                    r.defaultPrevented = !0
                }, target: f, type: k
            }), k = 0; k < p; k++)(d = e[k]) && !1 === d.call(f, r) && r.preventDefault();
            t && !r.defaultPrevented && t(r)
        };
        a.animate = function (f, k, r) {
            var t, e = "", p, d, q;
            a.isObject(r) || (t = arguments, r = {duration: t[2], easing: t[3], complete: t[4]});
            a.isNumber(r.duration) || (r.duration = 400);
            r.easing = "function" === typeof r.easing ? r.easing : Math[r.easing] || Math.easeInOutSine;
            r.curAnim = a.merge(k);
            for (q in k)a.stop(f, q), d = new a.Fx(f, r, q), p = null, "d" === q ? (d.paths = d.initPath(f, f.d, k.d), d.toD = k.d, t = 0, p = 1) : f.attr ? t = f.attr(q) : (t = parseFloat(a.getStyle(f,
                            q)) || 0, "opacity" !== q && (e = "px")), p || (p = k[q]), p.match && p.match("px") && (p = p.replace(/px/g, "")), d.run(t, p, e)
        };
        a.seriesType = function (f, k, r, t, e) {
            var p = a.getOptions(), d = a.seriesTypes;
            p.plotOptions[f] = a.merge(p.plotOptions[k], r);
            d[f] = a.extendClass(d[k] || function () {
                }, t);
            d[f].prototype.type = f;
            e && (d[f].prototype.pointClass = a.extendClass(a.Point, e));
            return d[f]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), k = 0;
            return function () {
                return "highcharts-" + a + "-" + k++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts =
            function () {
                var f = [].slice.call(arguments);
                if (this[0])return f[0] ? (new (a[a.isString(f[0]) ? f.shift() : "Chart"])(this[0], f[0], f[1]), this) : F[a.attr(this[0], "data-highcharts-chart")]
            });
        A && !A.defaultView && (a.getStyle = function (f, k) {
            var r = {width: "clientWidth", height: "clientHeight"}[k];
            if (f.style[k])return a.pInt(f.style[k]);
            "opacity" === k && (k = "filter");
            if (r)return f.style.zoom = 1, Math.max(f[r] - 2 * a.getStyle(f, "padding"), 0);
            f = f.currentStyle[k.replace(/\-(\w)/g, function (a, e) {
                return e.toUpperCase()
            })];
            "filter" ===
            k && (f = f.replace(/alpha\(opacity=([0-9]+)\)/, function (a, e) {
                return e / 100
            }));
            return "" === f ? 1 : a.pInt(f)
        });
        Array.prototype.forEach || (a.each = function (a, k, r) {
            for (var f = 0, e = a.length; f < e; f++)if (!1 === k.call(r, a[f], f, a))return f
        });
        Array.prototype.indexOf || (a.inArray = function (a, k) {
            var f, t = 0;
            if (k)for (f = k.length; t < f; t++)if (k[t] === a)return t;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, k) {
            for (var f = [], t = 0, e = a.length; t < e; t++)k(a[t], t) && f.push(a[t]);
            return f
        });
        Array.prototype.find || (a.find = function (a, k) {
            var f,
                t = a.length;
            for (f = 0; f < t; f++)if (k(a[f], f))return a[f]
        })
    })(I);
    (function (a) {
        var y = a.each, F = a.isNumber, A = a.map, D = a.merge, f = a.pInt;
        a.Color = function (k) {
            if (!(this instanceof a.Color))return new a.Color(k);
            this.init(k)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function (a) {
                    return [f(a[1],
                        16), f(a[2], 16), f(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
                    return [f(a[1]), f(a[2]), f(a[3]), 1]
                }
            }], names: {white: "#ffffff", black: "#000000"}, init: function (f) {
                var k, t, e, p;
                if ((this.input = f = this.names[f] || f) && f.stops) this.stops = A(f.stops, function (d) {
                    return new a.Color(d[1])
                }); else for (e = this.parsers.length; e-- && !t;)p = this.parsers[e], (k = p.regex.exec(f)) && (t = p.parse(k));
                this.rgba = t || []
            }, get: function (a) {
                var f = this.input, k = this.rgba, e;
                this.stops ?
                    (e = D(f), e.stops = [].concat(e.stops), y(this.stops, function (p, d) {
                        e.stops[d] = [e.stops[d][0], p.get(a)]
                    })) : e = k && F(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : f;
                return e
            }, brighten: function (a) {
                var k, t = this.rgba;
                if (this.stops) y(this.stops, function (e) {
                    e.brighten(a)
                }); else if (F(a) && 0 !== a)for (k = 0; 3 > k; k++)t[k] += f(255 * a), 0 > t[k] && (t[k] = 0), 255 < t[k] && (t[k] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function (f) {
            return new a.Color(f)
        }
    })(I);
    (function (a) {
        function y() {
            var e = a.defaultOptions.global, p = t.moment;
            if (e.timezone) {
                if (p)return function (a) {
                    return -p.tz(a, e.timezone).utcOffset()
                };
                a.error(25)
            }
            return e.useUTC && e.getTimezoneOffset
        }

        function F() {
            var e = a.defaultOptions.global, p, d = e.useUTC, q = d ? "getUTC" : "get", k = d ? "setUTC" : "set";
            a.Date = p = e.Date || t.Date;
            p.hcTimezoneOffset = d && e.timezoneOffset;
            p.hcGetTimezoneOffset = y();
            p.hcMakeTime = function (a, n, m, c, b, e) {
                var u;
                d ? (u = p.UTC.apply(0, arguments), u += f(u)) : u = (new p(a, n, r(m, 1), r(c, 0), r(b, 0), r(e, 0))).getTime();
                return u
            };
            D("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                p["hcGet" + a] = q + a
            });
            D("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                p["hcSet" + a] = k + a
            })
        }
        var A = a.color, D = a.each, f = a.getTZOffset, k = a.merge, r = a.pick, t = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0, VMLRadialGradientURL: ""},
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {zIndex: 20},
                    position: {align: "right", x: -10, y: 10}
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold"},
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: A("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: ""
            }
        };
        a.setOptions = function (e) {
            a.defaultOptions = k(!0, a.defaultOptions, e);
            F();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        F()
    })(I);
    (function (a) {
        var y, F, A = a.addEvent, D = a.animate, f = a.attr, k = a.charts, r = a.color, t = a.css, e = a.createElement, p = a.defined, d = a.deg2rad, q = a.destroyObjectProperties, x = a.doc, v = a.each, n = a.extend, m = a.erase, c = a.grep, b = a.hasTouch, E = a.inArray, u = a.isArray, g = a.isFirefox, z = a.isMS, G = a.isObject, H = a.isString, l = a.isWebKit, B = a.merge, K = a.noop, L = a.pick, J = a.pInt, h = a.removeEvent, C = a.stop, M = a.svg, N = a.SVG_NS, R = a.symbolSizes, S = a.win;
        y = a.SVGElement = function () {
            return this
        };
        y.prototype = {
            opacity: 1,
            SVG_NS: N,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
            init: function (a, h) {
                this.element = "span" === h ? e(h) : x.createElementNS(this.SVG_NS, h);
                this.renderer = a
            },
            animate: function (w, h, b) {
                h = a.animObject(L(h, this.renderer.globalAnimation, !0));
                0 !== h.duration ? (b && (h.complete = b), D(this, w, h)) : this.attr(w, null, b);
                return this
            },
            colorGradient: function (w, h, b) {
                var g = this.renderer, c, C, l, m, z, n, Q, d, e, G, q, f = [], H;
                w.linearGradient ? C = "linearGradient" : w.radialGradient && (C = "radialGradient");
                if (C) {
                    l = w[C];
                    z = g.gradients;
                    Q = w.stops;
                    G = b.radialReference;
                    u(l) && (w[C] = l = {
                        x1: l[0], y1: l[1], x2: l[2],
                        y2: l[3], gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === C && G && !p(l.gradientUnits) && (m = l, l = B(l, g.getRadialAttr(G, m), {gradientUnits: "userSpaceOnUse"}));
                    for (q in l)"id" !== q && f.push(q, l[q]);
                    for (q in Q)f.push(Q[q]);
                    f = f.join(",");
                    z[f] ? G = z[f].attr("id") : (l.id = G = a.uniqueKey(), z[f] = n = g.createElement(C).attr(l).add(g.defs), n.radAttr = m, n.stops = [], v(Q, function (w) {
                            0 === w[1].indexOf("rgba") ? (c = a.color(w[1]), d = c.get("rgb"), e = c.get("a")) : (d = w[1], e = 1);
                            w = g.createElement("stop").attr({
                                offset: w[0], "stop-color": d,
                                "stop-opacity": e
                            }).add(n);
                            n.stops.push(w)
                        }));
                    H = "url(" + g.url + "#" + G + ")";
                    b.setAttribute(h, H);
                    b.gradient = f;
                    w.toString = function () {
                        return H
                    }
                }
            },
            applyTextOutline: function (a) {
                var w = this.element, h, b, g, c;
                -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(w.style.fill)));
                this.fakeTS = !0;
                this.ySetter = this.xSetter;
                h = [].slice.call(w.getElementsByTagName("tspan"));
                a = a.split(" ");
                b = a[a.length - 1];
                (g = a[0]) && "none" !== g && (g = g.replace(/(^[\d\.]+)(.*?)$/g, function (a, w, h) {
                    return 2 * w + h
                }), v(h, function (a) {
                    "highcharts-text-outline" ===
                    a.getAttribute("class") && m(h, w.removeChild(a))
                }), c = w.firstChild, v(h, function (a, h) {
                    0 === h && (a.setAttribute("x", w.getAttribute("x")), h = w.getAttribute("y"), a.setAttribute("y", h || 0), null === h && w.setAttribute("y", 0));
                    a = a.cloneNode(1);
                    f(a, {
                        "class": "highcharts-text-outline",
                        fill: b,
                        stroke: b,
                        "stroke-width": g,
                        "stroke-linejoin": "round"
                    });
                    w.insertBefore(a, c)
                }))
            },
            attr: function (a, h, b, g) {
                var w, c = this.element, l, m = this, z;
                "string" === typeof a && void 0 !== h && (w = a, a = {}, a[w] = h);
                if ("string" === typeof a) m = (this[a + "Getter"] ||
                this._defaultGetter).call(this, a, c); else {
                    for (w in a)h = a[w], z = !1, g || C(this, w), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(w) && (l || (this.symbolAttr(a), l = !0), z = !0), !this.rotation || "x" !== w && "y" !== w || (this.doTransform = !0), z || (z = this[w + "Setter"] || this._defaultSetter, z.call(this, h, w, c), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(w) && this.updateShadows(w, h, z));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                b && b();
                return m
            },
            updateShadows: function (a,
                                     h, b) {
                for (var w = this.shadows, g = w.length; g--;)b.call(w[g], "height" === a ? Math.max(h - (w[g].cutHeight || 0), 0) : "d" === a ? this.d : h, a, w[g])
            },
            addClass: function (a, h) {
                var w = this.attr("class") || "";
                -1 === w.indexOf(a) && (h || (a = (w + (w ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== f(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                f(this.element, "class", (f(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var w = this;
                v("x y r start end width height innerR anchorX anchorY".split(" "),
                    function (h) {
                        w[h] = L(a[h], w[h])
                    });
                w.attr({d: w.renderer.symbols[w.symbolName](w.x, w.y, w.width, w.height, w)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, h) {
                var w, b = {}, g;
                h = h || a.strokeWidth || 0;
                g = Math.round(h) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + g;
                a.y = Math.floor(a.y || this.y || 0) + g;
                a.width = Math.floor((a.width || this.width || 0) - 2 * g);
                a.height = Math.floor((a.height || this.height || 0) - 2 * g);
                p(a.strokeWidth) && (a.strokeWidth = h);
                for (w in a)this[w] !== a[w] &&
                (this[w] = b[w] = a[w]);
                return b
            },
            css: function (a) {
                var w = this.styles, h = {}, b = this.element, g, c, l = "";
                g = !w;
                var C = ["textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                if (w)for (c in a)a[c] !== w[c] && (h[c] = a[c], g = !0);
                if (g) {
                    g = this.textWidth = a && a.width && "text" === b.nodeName.toLowerCase() && J(a.width) || this.textWidth;
                    w && (a = n(w, h));
                    this.styles = a;
                    g && !M && this.renderer.forExport && delete a.width;
                    if (z && !M) t(this.element, a); else {
                        w = function (a, w) {
                            return "-" + w.toLowerCase()
                        };
                        for (c in a)-1 === E(c, C) && (l += c.replace(/([A-Z])/g, w) +
                            ":" + a[c] + ";");
                        l && f(b, "style", l)
                    }
                    this.added && (g && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, h) {
                var w = this, g = w.element;
                b && "click" === a ? (g.ontouchstart = function (a) {
                        w.touchEventFired = Date.now();
                        a.preventDefault();
                        h.call(g, a)
                    }, g.onclick = function (a) {
                        (-1 === S.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (w.touchEventFired || 0)) && h.call(g, a)
                    }) : g["on" + a] = h;
                return this
            },
            setRadialReference: function (a) {
                var w =
                    this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                w && w.radAttr && w.animate(this.renderer.getRadialAttr(a, w.radAttr));
                return this
            },
            translate: function (a, h) {
                return this.attr({translateX: a, translateY: h})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, h = this.translateY || 0, b = this.scaleX, g = this.scaleY, c = this.inverted, l = this.rotation, C = this.element;
                c && (a += this.width, h += this.height);
                a = ["translate(" + a + "," +
                h + ")"];
                c ? a.push("rotate(90) scale(-1,1)") : l && a.push("rotate(" + l + " " + (C.getAttribute("x") || 0) + " " + (C.getAttribute("y") || 0) + ")");
                (p(b) || p(g)) && a.push("scale(" + L(b, 1) + " " + L(g, 1) + ")");
                a.length && C.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, h, b) {
                var w, g, c, l, C = {};
                g = this.renderer;
                c = g.alignedObjects;
                var z, n;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = h, !b || H(b)) this.alignTo = w = b || "renderer", m(c, this), c.push(this),
                        b = null
                } else a = this.alignOptions, h = this.alignByTranslate, w = this.alignTo;
                b = L(b, g[w], g);
                w = a.align;
                g = a.verticalAlign;
                c = (b.x || 0) + (a.x || 0);
                l = (b.y || 0) + (a.y || 0);
                "right" === w ? z = 1 : "center" === w && (z = 2);
                z && (c += (b.width - (a.width || 0)) / z);
                C[h ? "translateX" : "x"] = Math.round(c);
                "bottom" === g ? n = 1 : "middle" === g && (n = 2);
                n && (l += (b.height - (a.height || 0)) / n);
                C[h ? "translateY" : "y"] = Math.round(l);
                this[this.placed ? "animate" : "attr"](C);
                this.placed = !0;
                this.alignAttr = C;
                return this
            },
            getBBox: function (a, h) {
                var w, b = this.renderer, g, c = this.element,
                    l = this.styles, C, m = this.textStr, z, e = b.cache, B = b.cacheKeys, G;
                h = L(h, this.rotation);
                g = h * d;
                C = l && l.fontSize;
                void 0 !== m && (G = m.toString(), -1 === G.indexOf("\x3c") && (G = G.replace(/[0-9]/g, "0")), G += ["", h || 0, C, l && l.width, l && l.textOverflow].join());
                G && !a && (w = e[G]);
                if (!w) {
                    if (c.namespaceURI === this.SVG_NS || b.forExport) {
                        try {
                            (z = this.fakeTS && function (a) {
                                    v(c.querySelectorAll(".highcharts-text-outline"), function (w) {
                                        w.style.display = a
                                    })
                                }) && z("none"), w = c.getBBox ? n({}, c.getBBox()) : {
                                    width: c.offsetWidth,
                                    height: c.offsetHeight
                                },
                            z && z("")
                        } catch (V) {
                        }
                        if (!w || 0 > w.width) w = {width: 0, height: 0}
                    } else w = this.htmlGetBBox();
                    b.isSVG && (a = w.width, b = w.height, l && "11px" === l.fontSize && 17 === Math.round(b) && (w.height = b = 14), h && (w.width = Math.abs(b * Math.sin(g)) + Math.abs(a * Math.cos(g)), w.height = Math.abs(b * Math.cos(g)) + Math.abs(a * Math.sin(g))));
                    if (G && 0 < w.height) {
                        for (; 250 < B.length;)delete e[B.shift()];
                        e[G] || B.push(G);
                        e[G] = w
                    }
                }
                return w
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var w = this;
                w.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        w.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var w = this.renderer, h = this.element, b;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && w.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
                b || (a ? a.element : w.box).appendChild(h);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var w = a.parentNode;
                w && w.removeChild(a)
            },
            destroy: function () {
                var a =
                    this.element || {}, h = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup, b, g;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                C(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (g = 0; g < this.stops.length; g++)this.stops[g] = this.stops[g].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); h && h.div && 0 === h.div.childNodes.length;)a = h.parentGroup, this.safeRemoveChild(h.div), delete h.div, h = a;
                this.alignTo && m(this.renderer.alignedObjects,
                    this);
                for (b in this)delete this[b];
                return null
            },
            shadow: function (a, h, b) {
                var w = [], g, c, l = this.element, C, m, z, n;
                if (!a) this.destroyShadows(); else if (!this.shadows) {
                    m = L(a.width, 3);
                    z = (a.opacity || .15) / m;
                    n = this.parentInverted ? "(-1,-1)" : "(" + L(a.offsetX, 1) + ", " + L(a.offsetY, 1) + ")";
                    for (g = 1; g <= m; g++)c = l.cloneNode(0), C = 2 * m + 1 - 2 * g, f(c, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": z * g,
                        "stroke-width": C,
                        transform: "translate" + n,
                        fill: "none"
                    }), b && (f(c, "height", Math.max(f(c, "height") - C, 0)), c.cutHeight = C), h ?
                        h.element.appendChild(c) : l.parentNode.insertBefore(c, l), w.push(c);
                    this.shadows = w
                }
                return this
            },
            destroyShadows: function () {
                v(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = L(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, h, b) {
                a && a.join && (a =
                    a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                b.setAttribute(h, a);
                this[h] = a
            },
            dashstyleSetter: function (a) {
                var w, h = this["stroke-width"];
                "inherit" === h && (h = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (w = a.length; w--;)a[w] = J(a[w]) * h;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray",
                        a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, h, b) {
                this[h] = a;
                b.setAttribute(h, a)
            },
            titleSetter: function (a) {
                var w = this.element.getElementsByTagName("title")[0];
                w || (w = x.createElementNS(this.SVG_NS, "title"), this.element.appendChild(w));
                w.firstChild && w.removeChild(w.firstChild);
                w.appendChild(x.createTextNode(String(L(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox,
                    this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, h, b) {
                "string" === typeof a ? b.setAttribute(h, a) : a && this.colorGradient(a, h, b)
            },
            visibilitySetter: function (a, h, b) {
                "inherit" === a ? b.removeAttribute(h) : b.setAttribute(h, a)
            },
            zIndexSetter: function (a, h) {
                var w = this.renderer, b = this.parentGroup, g = (b || w).element || w.box, c, l = this.element, C;
                c = this.added;
                var m;
                p(a) && (l.zIndex = a, a = +a, this[h] === a && (c = !1), this[h] = a);
                if (c) {
                    (a = this.zIndex) && b && (b.handleZ = !0);
                    h = g.childNodes;
                    for (m = 0; m < h.length && !C; m++)b = h[m], c = b.zIndex, b !== l && (J(c) > a || !p(a) && p(c) || 0 > a && !p(c) && g !== w.box) && (g.insertBefore(l, b), C = !0);
                    C || g.appendChild(l)
                }
                return C
            },
            _defaultSetter: function (a, h, b) {
                b.setAttribute(h, a)
            }
        };
        y.prototype.yGetter = y.prototype.xGetter;
        y.prototype.translateXSetter = y.prototype.translateYSetter = y.prototype.rotationSetter = y.prototype.verticalAlignSetter = y.prototype.scaleXSetter = y.prototype.scaleYSetter = function (a, h) {
            this[h] = a;
            this.doTransform = !0
        };
        y.prototype["stroke-widthSetter"] = y.prototype.strokeSetter = function (a,
                                                                                 h, b) {
            this[h] = a;
            this.stroke && this["stroke-width"] ? (y.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === h && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        F.prototype = {
            Element: y, SVG_NS: N, init: function (a, h, b, c, C, m) {
                var w;
                c = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"}).css(this.getStyle(c));
                w = c.element;
                a.appendChild(w);
                -1 === a.innerHTML.indexOf("xmlns") && f(w, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = w;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (g || l) && x.getElementsByTagName("base").length ? S.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highmaps 5.0.7"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = m;
                this.forExport = C;
                this.gradients =
                    {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(h, b, !1);
                var z;
                g && a.getBoundingClientRect && (h = function () {
                    t(a, {left: 0, top: 0});
                    z = a.getBoundingClientRect();
                    t(a, {left: Math.ceil(z.left) - z.left + "px", top: Math.ceil(z.top) - z.top + "px"})
                }, h(), this.unSubPixelFix = A(S, "resize", h))
            }, getStyle: function (a) {
                return this.style = n({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            }, setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            }, isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                q(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (a) {
                var h = new this.Element;
                h.init(this, a);
                return h
            }, draw: K, getRadialAttr: function (a, h) {
                return {cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2]}
            }, buildText: function (a) {
                var h = a.element, w = this, b = w.forExport, g = L(a.textStr, "").toString(),
                    l = -1 !== g.indexOf("\x3c"), C = h.childNodes, m, z, n, e, d = f(h, "x"), B = a.styles, G = a.textWidth, p = B && B.lineHeight, u = B && B.textOutline, q = B && "ellipsis" === B.textOverflow, H = B && "nowrap" === B.whiteSpace, E = B && B.fontSize, k, K = C.length, B = G && !a.added && this.box, r = function (a) {
                        var b;
                        b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : E || w.style.fontSize || 12;
                        return p ? J(p) : w.fontMetrics(b, a.getAttribute("style") ? a : h).h
                    };
                k = [g, q, H, p, u, E, G].join();
                if (k !== a.textCache) {
                    for (a.textCache = k; K--;)h.removeChild(C[K]);
                    l || u || q || G || -1 !==
                    g.indexOf(" ") ? (m = /<.*class="([^"]+)".*>/, z = /<.*style="([^"]+)".*>/, n = /<.*href="(http[^"]+)".*>/, B && B.appendChild(h), g = l ? g.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [g], g = c(g, function (a) {
                            return "" !== a
                        }), v(g, function (g, c) {
                            var l, C = 0;
                            g = g.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            l = g.split("|||");
                            v(l, function (g) {
                                if ("" !== g || 1 === l.length) {
                                    var B = {}, u = x.createElementNS(w.SVG_NS, "tspan"), p, v;
                                    m.test(g) && (p = g.match(m)[1], f(u, "class", p));
                                    z.test(g) && (v = g.match(z)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), f(u, "style", v));
                                    n.test(g) && !b && (f(u, "onclick", 'location.href\x3d"' + g.match(n)[1] + '"'), t(u, {cursor: "pointer"}));
                                    g = (g.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                                    if (" " !== g) {
                                        u.appendChild(x.createTextNode(g));
                                        C ? B.dx = 0 : c && null !== d && (B.x = d);
                                        f(u, B);
                                        h.appendChild(u);
                                        !C && c && (!M && b && t(u, {display: "block"}), f(u, "dy", r(u)));
                                        if (G) {
                                            B = g.replace(/([^\^])-/g, "$1- ").split(" ");
                                            p = 1 < l.length || c || 1 < B.length && !H;
                                            for (var k, E, L = [], K = r(u), Q = a.rotation, J = g, O = J.length; (p || q) && (B.length || L.length);)a.rotation = 0, k = a.getBBox(!0), E = k.width, !M && w.forExport && (E = w.measureSpanWidth(u.firstChild.data, a.styles)), k = E > G, void 0 === e && (e = k), q && e ? (O /= 2, "" === J || !k && .5 > O ? B = [] : (J = g.substring(0, J.length + (k ? -1 : 1) * Math.ceil(O)), B = [J + (3 < G ? "\u2026" : "")], u.removeChild(u.firstChild))) :
                                                k && 1 !== B.length ? (u.removeChild(u.firstChild), L.unshift(B.pop())) : (B = L, L = [], B.length && !H && (u = x.createElementNS(N, "tspan"), f(u, {
                                                        dy: K,
                                                        x: d
                                                    }), v && f(u, "style", v), h.appendChild(u)), E > G && (G = E)), B.length && u.appendChild(x.createTextNode(B.join(" ").replace(/- /g, "-")));
                                            a.rotation = Q
                                        }
                                        C++
                                    }
                                }
                            })
                        }), e && a.attr("title", a.textStr), B && B.removeChild(h), u && a.applyTextOutline && a.applyTextOutline(u)) : h.appendChild(x.createTextNode(g.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
                }
            }, getContrast: function (a) {
                a = r(a).rgba;
                return 510 <
                a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a, h, b, g, c, l, C, m, e) {
                var w = this.label(a, h, b, e, null, null, null, null, "button"), d = 0;
                w.attr(B({padding: 8, r: 2}, c));
                var G, u, p, q;
                c = B({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                }, c);
                G = c.style;
                delete c.style;
                l = B(c, {fill: "#e6e6e6"}, l);
                u = l.style;
                delete l.style;
                C = B(c, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, C);
                p = C.style;
                delete C.style;
                m = B(c, {style: {color: "#cccccc"}}, m);
                q = m.style;
                delete m.style;
                A(w.element, z ? "mouseover" : "mouseenter", function () {
                    3 !== d && w.setState(1)
                });
                A(w.element, z ? "mouseout" : "mouseleave", function () {
                    3 !== d && w.setState(d)
                });
                w.setState = function (a) {
                    1 !== a && (w.state = d = a);
                    w.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    w.attr([c, l, C, m][a || 0]).css([G, u, p, q][a || 0])
                };
                w.attr(c).css(n({cursor: "default"}, G));
                return w.on("click", function (a) {
                    3 !== d && g.call(w, a)
                })
            }, crispLine: function (a,
                                    h) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
                return a
            }, path: function (a) {
                var h = {fill: "none"};
                u(a) ? h.d = a : G(a) && n(h, a);
                return this.createElement("path").attr(h)
            }, circle: function (a, h, b) {
                a = G(a) ? a : {x: a, y: h, r: b};
                h = this.createElement("circle");
                h.xSetter = h.ySetter = function (a, h, b) {
                    b.setAttribute("c" + h, a)
                };
                return h.attr(a)
            }, arc: function (a, h, b, g, c, l) {
                G(a) && (h = a.y, b = a.r, g = a.innerR, c = a.start, l = a.end, a = a.x);
                a = this.symbol("arc", a || 0, h || 0, b || 0, b || 0, {
                    innerR: g ||
                    0, start: c || 0, end: l || 0
                });
                a.r = b;
                return a
            }, rect: function (a, h, b, g, c, l) {
                c = G(a) ? a.r : c;
                var w = this.createElement("rect");
                a = G(a) ? a : void 0 === a ? {} : {x: a, y: h, width: Math.max(b, 0), height: Math.max(g, 0)};
                void 0 !== l && (a.strokeWidth = l, a = w.crisp(a));
                a.fill = "none";
                c && (a.r = c);
                w.rSetter = function (a, h, b) {
                    f(b, {rx: a, ry: a})
                };
                return w.attr(a)
            }, setSize: function (a, h, b) {
                var g = this.alignedObjects, c = g.length;
                this.width = a;
                this.height = h;
                for (this.boxWrapper.animate({width: a, height: h}, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") +
                            " " + this.attr("height")
                        })
                    }, duration: L(b, !0) ? void 0 : 0
                }); c--;)g[c].align()
            }, g: function (a) {
                var h = this.createElement("g");
                return a ? h.attr({"class": "highcharts-" + a}) : h
            }, image: function (a, h, b, g, c) {
                var w = {preserveAspectRatio: "none"};
                1 < arguments.length && n(w, {x: h, y: b, width: g, height: c});
                w = this.createElement("image").attr(w);
                w.element.setAttributeNS ? w.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : w.element.setAttribute("hc-svg-href", a);
                return w
            }, symbol: function (a, h, b, g, c, l) {
                var w = this, C, m = this.symbols[a],
                    z = p(h) && m && this.symbols[a](Math.round(h), Math.round(b), g, c, l), B = /^url\((.*?)\)$/, d, G;
                m ? (C = this.path(z), C.attr("fill", "none"), n(C, {
                        symbolName: a,
                        x: h,
                        y: b,
                        width: g,
                        height: c
                    }), l && n(C, l)) : B.test(a) && (d = a.match(B)[1], C = this.image(d), C.imgwidth = L(R[d] && R[d].width, l && l.width), C.imgheight = L(R[d] && R[d].height, l && l.height), G = function () {
                        C.attr({width: C.width, height: C.height})
                    }, v(["width", "height"], function (a) {
                        C[a + "Setter"] = function (a, h) {
                            var b = {}, g = this["img" + h], c = "width" === h ? "translateX" : "translateY";
                            this[h] = a;
                            p(g) && (this.element && this.element.setAttribute(h, g), this.alignByTranslate || (b[c] = ((this[h] || 0) - g) / 2, this.attr(b)))
                        }
                    }), p(h) && C.attr({
                        x: h,
                        y: b
                    }), C.isImg = !0, p(C.imgwidth) && p(C.imgheight) ? G() : (C.attr({width: 0, height: 0}), e("img", {
                            onload: function () {
                                var a = k[w.chartIndex];
                                0 === this.width && (t(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), x.body.appendChild(this));
                                R[d] = {width: this.width, height: this.height};
                                C.imgwidth = this.width;
                                C.imgheight = this.height;
                                C.element && G();
                                this.parentNode && this.parentNode.removeChild(this);
                                w.imgCount--;
                                if (!w.imgCount && a && a.onload) a.onload()
                            }, src: d
                        }), this.imgCount++));
                return C
            }, symbols: {
                circle: function (a, h, b, g) {
                    return this.arc(a + b / 2, h + g / 2, b / 2, g / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, h, b, g) {
                    return ["M", a, h, "L", a + b, h, a + b, h + g, a, h + g, "Z"]
                }, triangle: function (a, h, b, g) {
                    return ["M", a + b / 2, h, "L", a + b, h + g, a, h + g, "Z"]
                }, "triangle-down": function (a, h, b, g) {
                    return ["M", a, h, "L", a + b, h, a + b / 2, h + g, "Z"]
                }, diamond: function (a, h, b, g) {
                    return ["M", a + b / 2, h, "L", a + b, h + g / 2, a + b / 2, h + g, a, h + g / 2, "Z"]
                }, arc: function (a,
                                  h, b, g, c) {
                    var C = c.start, l = c.r || b, w = c.r || g || b, m = c.end - .001;
                    b = c.innerR;
                    g = c.open;
                    var z = Math.cos(C), n = Math.sin(C), B = Math.cos(m), m = Math.sin(m);
                    c = c.end - C < Math.PI ? 0 : 1;
                    l = ["M", a + l * z, h + w * n, "A", l, w, 0, c, 1, a + l * B, h + w * m];
                    p(b) && l.push(g ? "M" : "L", a + b * B, h + b * m, "A", b, b, 0, c, 0, a + b * z, h + b * n);
                    l.push(g ? "" : "Z");
                    return l
                }, callout: function (a, h, b, g, c) {
                    var l = Math.min(c && c.r || 0, b, g), C = l + 6, m = c && c.anchorX;
                    c = c && c.anchorY;
                    var w;
                    w = ["M", a + l, h, "L", a + b - l, h, "C", a + b, h, a + b, h, a + b, h + l, "L", a + b, h + g - l, "C", a + b, h + g, a + b, h + g, a + b - l, h + g, "L", a + l, h + g, "C",
                        a, h + g, a, h + g, a, h + g - l, "L", a, h + l, "C", a, h, a, h, a + l, h];
                    m && m > b ? c > h + C && c < h + g - C ? w.splice(13, 3, "L", a + b, c - 6, a + b + 6, c, a + b, c + 6, a + b, h + g - l) : w.splice(13, 3, "L", a + b, g / 2, m, c, a + b, g / 2, a + b, h + g - l) : m && 0 > m ? c > h + C && c < h + g - C ? w.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, h + l) : w.splice(33, 3, "L", a, g / 2, m, c, a, g / 2, a, h + l) : c && c > g && m > a + C && m < a + b - C ? w.splice(23, 3, "L", m + 6, h + g, m, h + g + 6, m - 6, h + g, a + l, h + g) : c && 0 > c && m > a + C && m < a + b - C && w.splice(3, 3, "L", m - 6, h, m, h - 6, m + 6, h, b - l, h);
                    return w
                }
            }, clipRect: function (h, b, g, c) {
                var l = a.uniqueKey(), C = this.createElement("clipPath").attr({id: l}).add(this.defs);
                h = this.rect(h, b, g, c, 0).add(C);
                h.id = l;
                h.clipPath = C;
                h.count = 0;
                return h
            }, text: function (a, h, b, g) {
                var c = !M && this.forExport, l = {};
                if (g && (this.allowHTML || !this.forExport))return this.html(a, h, b);
                l.x = Math.round(h || 0);
                b && (l.y = Math.round(b));
                if (a || 0 === a) l.text = a;
                a = this.createElement("text").attr(l);
                c && a.css({position: "absolute"});
                g || (a.xSetter = function (a, h, b) {
                    var g = b.getElementsByTagName("tspan"), c, l = b.getAttribute(h), C;
                    for (C = 0; C < g.length; C++)c = g[C], c.getAttribute(h) === l && c.setAttribute(h, a);
                    b.setAttribute(h,
                        a)
                });
                return a
            }, fontMetrics: function (a, h) {
                a = a || h && h.style && h.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? J(a) : /em/.test(a) ? parseFloat(a) * (h ? this.fontMetrics(null, h.parentNode).f : 16) : 12;
                h = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: h, b: Math.round(.8 * h), f: a}
            }, rotCorr: function (a, h, b) {
                var g = a;
                h && b && (g = Math.max(g * Math.cos(h * d), 4));
                return {x: -a / 3 * Math.sin(h * d), y: g}
            }, label: function (a, b, g, c, l, C, m, z, d) {
                var w = this, e = w.g("button" !== d && "label"), G = e.text = w.text("", 0, 0, m).attr({zIndex: 1}), u, q, f = 0, k = 3,
                    E = 0, H, N, M, L, K, x = {}, J, t, r = /^url\((.*?)\)$/.test(c), R = r, Q, S, O, P;
                d && e.addClass("highcharts-" + d);
                R = r;
                Q = function () {
                    return (J || 0) % 2 / 2
                };
                S = function () {
                    var a = G.element.style, h = {};
                    q = (void 0 === H || void 0 === N || K) && p(G.textStr) && G.getBBox();
                    e.width = (H || q.width || 0) + 2 * k + E;
                    e.height = (N || q.height || 0) + 2 * k;
                    t = k + w.fontMetrics(a && a.fontSize, G).b;
                    R && (u || (e.box = u = w.symbols[c] || r ? w.symbol(c) : w.rect(), u.addClass(("button" === d ? "" : "highcharts-label-box") + (d ? " highcharts-" + d + "-box" : "")), u.add(e), a = Q(), h.x = a, h.y = (z ? -t : 0) + a), h.width =
                        Math.round(e.width), h.height = Math.round(e.height), u.attr(n(h, x)), x = {})
                };
                O = function () {
                    var a = E + k, h;
                    h = z ? 0 : t;
                    p(H) && q && ("center" === K || "right" === K) && (a += {center: .5, right: 1}[K] * (H - q.width));
                    if (a !== G.x || h !== G.y) G.attr("x", a), void 0 !== h && G.attr("y", h);
                    G.x = a;
                    G.y = h
                };
                P = function (a, h) {
                    u ? u.attr(a, h) : x[a] = h
                };
                e.onAdd = function () {
                    G.add(e);
                    e.attr({text: a || 0 === a ? a : "", x: b, y: g});
                    u && p(l) && e.attr({anchorX: l, anchorY: C})
                };
                e.widthSetter = function (a) {
                    H = a
                };
                e.heightSetter = function (a) {
                    N = a
                };
                e["text-alignSetter"] = function (a) {
                    K = a
                };
                e.paddingSetter = function (a) {
                    p(a) && a !== k && (k = e.padding = a, O())
                };
                e.paddingLeftSetter = function (a) {
                    p(a) && a !== E && (E = a, O())
                };
                e.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== f && (f = a, q && e.attr({x: M}))
                };
                e.textSetter = function (a) {
                    void 0 !== a && G.textSetter(a);
                    S();
                    O()
                };
                e["stroke-widthSetter"] = function (a, h) {
                    a && (R = !0);
                    J = this["stroke-width"] = a;
                    P(h, a)
                };
                e.strokeSetter = e.fillSetter = e.rSetter = function (a, h) {
                    "fill" === h && a && (R = !0);
                    P(h, a)
                };
                e.anchorXSetter = function (a, h) {
                    l = a;
                    P(h, Math.round(a) - Q() - M)
                };
                e.anchorYSetter =
                    function (a, h) {
                        C = a;
                        P(h, a - L)
                    };
                e.xSetter = function (a) {
                    e.x = a;
                    f && (a -= f * ((H || q.width) + 2 * k));
                    M = Math.round(a);
                    e.attr("translateX", M)
                };
                e.ySetter = function (a) {
                    L = e.y = Math.round(a);
                    e.attr("translateY", L)
                };
                var D = e.css;
                return n(e, {
                    css: function (a) {
                        if (a) {
                            var h = {};
                            a = B(a);
                            v(e.textProps, function (b) {
                                void 0 !== a[b] && (h[b] = a[b], delete a[b])
                            });
                            G.css(h)
                        }
                        return D.call(e, a)
                    }, getBBox: function () {
                        return {width: q.width + 2 * k, height: q.height + 2 * k, x: q.x - k, y: q.y - k}
                    }, shadow: function (a) {
                        a && (S(), u && u.shadow(a));
                        return e
                    }, destroy: function () {
                        h(e.element,
                            "mouseenter");
                        h(e.element, "mouseleave");
                        G && (G = G.destroy());
                        u && (u = u.destroy());
                        y.prototype.destroy.call(e);
                        e = w = S = O = P = null
                    }
                })
            }
        };
        a.Renderer = F
    })(I);
    (function (a) {
        var y = a.attr, F = a.createElement, A = a.css, D = a.defined, f = a.each, k = a.extend, r = a.isFirefox, t = a.isMS, e = a.isWebKit, p = a.pInt, d = a.SVGRenderer, q = a.win, x = a.wrap;
        k(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var n = this.element;
                if (n = a && "SPAN" === n.tagName && a.width) delete a.width, this.textWidth = n, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace =
                    "nowrap", a.overflow = "hidden");
                this.styles = k(this.styles, a);
                A(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, n = this.element, m = this.translateX || 0, c = this.translateY || 0, b = this.x || 0, d = this.y || 0, u = this.textAlign || "left", g = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[u], z = this.styles;
                    A(n, {marginLeft: m, marginTop: c});
                    this.shadows && f(this.shadows, function (a) {
                        A(a, {marginLeft: m + 1, marginTop: c + 1})
                    });
                    this.inverted && f(n.childNodes, function (b) {
                        a.invertChild(b, n)
                    });
                    if ("SPAN" === n.tagName) {
                        var G = this.rotation, q = p(this.textWidth), l = z && z.whiteSpace, B = [G, u, n.innerHTML, this.textWidth, this.textAlign].join();
                        B !== this.cTT && (z = a.fontMetrics(n.style.fontSize).b, D(G) && this.setSpanRotation(G, g, z), A(n, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), n.offsetWidth > q && /[ \-]/.test(n.textContent || n.innerText) && A(n, {
                            width: q + "px", display: "block", whiteSpace: l ||
                            "normal"
                        }), this.getSpanCorrection(n.offsetWidth, z, g, G, u));
                        A(n, {left: b + (this.xCorr || 0) + "px", top: d + (this.yCorr || 0) + "px"});
                        e && (z = n.offsetHeight);
                        this.cTT = B
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, n, m) {
                var c = {}, b = t ? "-ms-transform" : e ? "-webkit-transform" : r ? "MozTransform" : q.opera ? "-o-transform" : "";
                c[b] = c.transform = "rotate(" + a + "deg)";
                c[b + (r ? "Origin" : "-origin")] = c.transformOrigin = 100 * n + "% " + m + "px";
                A(this.element, c)
            }, getSpanCorrection: function (a, n, m) {
                this.xCorr = -a * m;
                this.yCorr = -n
            }
        });
        k(d.prototype,
            {
                html: function (a, n, m) {
                    var c = this.createElement("span"), b = c.element, e = c.renderer, d = e.isSVG, g = function (a, b) {
                        f(["opacity", "visibility"], function (g) {
                            x(a, g + "Setter", function (a, g, c, m) {
                                a.call(this, g, c, m);
                                b[c] = g
                            })
                        })
                    };
                    c.textSetter = function (a) {
                        a !== b.innerHTML && delete this.bBox;
                        b.innerHTML = this.textStr = a;
                        c.htmlUpdateTransform()
                    };
                    d && g(c, c.element.style);
                    c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) {
                        "align" === b && (b = "textAlign");
                        c[b] = a;
                        c.htmlUpdateTransform()
                    };
                    c.attr({
                        text: a, x: Math.round(n),
                        y: Math.round(m)
                    }).css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute"});
                    b.style.whiteSpace = "nowrap";
                    c.css = c.htmlCss;
                    d && (c.add = function (a) {
                        var m, z = e.box.parentNode, l = [];
                        if (this.parentGroup = a) {
                            if (m = a.div, !m) {
                                for (; a;)l.push(a), a = a.parentGroup;
                                f(l.reverse(), function (a) {
                                    var b, n = y(a.element, "class");
                                    n && (n = {className: n});
                                    m = a.div = a.div || F("div", n, {
                                            position: "absolute",
                                            left: (a.translateX || 0) + "px",
                                            top: (a.translateY || 0) + "px",
                                            display: a.display,
                                            opacity: a.opacity,
                                            pointerEvents: a.styles &&
                                            a.styles.pointerEvents
                                        }, m || z);
                                    b = m.style;
                                    k(a, {
                                        on: function () {
                                            c.on.apply({element: l[0].div}, arguments);
                                            return a
                                        }, translateXSetter: function (g, h) {
                                            b.left = g + "px";
                                            a[h] = g;
                                            a.doTransform = !0
                                        }, translateYSetter: function (g, h) {
                                            b.top = g + "px";
                                            a[h] = g;
                                            a.doTransform = !0
                                        }
                                    });
                                    g(a, b)
                                })
                            }
                        } else m = z;
                        m.appendChild(b);
                        c.added = !0;
                        c.alignOnAdd && c.htmlUpdateTransform();
                        return c
                    });
                    return c
                }
            })
    })(I);
    (function (a) {
        var y, F, A = a.createElement, D = a.css, f = a.defined, k = a.deg2rad, r = a.discardElement, t = a.doc, e = a.each, p = a.erase, d = a.extend;
        y = a.extendClass;
        var q = a.isArray, x = a.isNumber, v = a.isObject, n = a.merge;
        F = a.noop;
        var m = a.pick, c = a.pInt, b = a.SVGElement, E = a.SVGRenderer, u = a.win;
        a.svg || (F = {
            docMode8: t && 8 === t.documentMode, init: function (a, b) {
                var g = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'], c = ["position: ", "absolute", ";"], l = "div" === b;
                ("shape" === b || l) && c.push("left:0;top:0;width:1px;height:1px;");
                c.push("visibility: ", l ? "hidden" : "visible");
                g.push(' style\x3d"', c.join(""), '"/\x3e');
                b && (g = l || "span" === b || "img" === b ? g.join("") : a.prepVML(g), this.element = A(g));
                this.renderer =
                    a
            }, add: function (a) {
                var b = this.renderer, g = this.element, c = b.box, l = a && a.inverted, c = a ? a.element || a : c;
                a && (this.parentGroup = a);
                l && b.invertChild(g, c);
                c.appendChild(g);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            }, updateTransform: b.prototype.htmlUpdateTransform, setSpanRotation: function () {
                var a = this.rotation, b = Math.cos(a * k), c = Math.sin(a * k);
                D(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",
                            b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"
                })
            }, getSpanCorrection: function (a, b, c, n, l) {
                var g = n ? Math.cos(n * k) : 1, z = n ? Math.sin(n * k) : 0, e = m(this.elemHeight, this.element.offsetHeight), d;
                this.xCorr = 0 > g && -a;
                this.yCorr = 0 > z && -e;
                d = 0 > g * z;
                this.xCorr += z * b * (d ? 1 - c : c);
                this.yCorr -= g * b * (n ? d ? c : 1 - c : 1);
                l && "left" !== l && (this.xCorr -= a * c * (0 > g ? -1 : 1), n && (this.yCorr -= e * c * (0 > z ? -1 : 1)), D(this.element, {textAlign: l}))
            }, pathToVML: function (a) {
                for (var b = a.length, g = []; b--;)x(a[b]) ? g[b] =
                        Math.round(10 * a[b]) - 5 : "Z" === a[b] ? g[b] = "x" : (g[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (g[b + 5] === g[b + 7] && (g[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), g[b + 6] === g[b + 8] && (g[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return g.join(" ") || "x"
            }, clip: function (a) {
                var b = this, g;
                a ? (g = a.members, p(g, b), g.push(b), b.destroyClip = function () {
                        p(g, b)
                    }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {clip: b.docMode8 ? "inherit" : "rect(auto)"});
                return b.css(a)
            }, css: b.prototype.htmlCss, safeRemoveChild: function (a) {
                a.parentNode && r(a)
            }, destroy: function () {
                this.destroyClip &&
                this.destroyClip();
                return b.prototype.destroy.apply(this)
            }, on: function (a, b) {
                this.element["on" + a] = function () {
                    var a = u.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            }, cutOffPath: function (a, b) {
                var g;
                a = a.split(/[ ,]/);
                g = a.length;
                if (9 === g || 11 === g) a[g - 4] = a[g - 2] = c(a[g - 2]) - 10 * b;
                return a.join(" ")
            }, shadow: function (a, b, n) {
                var g = [], l, e = this.element, z = this.renderer, d, u = e.style, h, C = e.path, q, p, G, k;
                C && "string" !== typeof C.value && (C = "x");
                p = C;
                if (a) {
                    G = m(a.width, 3);
                    k = (a.opacity || .15) / G;
                    for (l = 1; 3 >= l; l++)q = 2 * G + 1 - 2 * l, n &&
                    (p = this.cutOffPath(C.value, q + .5)), h = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', q, '" filled\x3d"false" path\x3d"', p, '" coordsize\x3d"10 10" style\x3d"', e.style.cssText, '" /\x3e'], d = A(z.prepVML(h), null, {
                        left: c(u.left) + m(a.offsetX, 1),
                        top: c(u.top) + m(a.offsetY, 1)
                    }), n && (d.cutOff = q + 1), h = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', k * l, '"/\x3e'], A(z.prepVML(h), null, null, d), b ? b.element.appendChild(d) : e.parentNode.insertBefore(d, e), g.push(d);
                    this.shadows = g
                }
                return this
            }, updateShadows: F,
            setAttr: function (a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            }, classSetter: function (a) {
                (this.added ? this.element : this).className = a
            }, dashstyleSetter: function (a, b, c) {
                (c.getElementsByTagName("stroke")[0] || A(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
                this[b] = a
            }, dSetter: function (a, b, c) {
                var g = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (g)for (c = g.length; c--;)g[c].path = g[c].cutOff ? this.cutOffPath(a, g[c].cutOff) : a;
                this.setAttr(b,
                    a)
            }, fillSetter: function (a, b, c) {
                var g = c.nodeName;
                "SPAN" === g ? c.style.color = a : "IMG" !== g && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            }, "fill-opacitySetter": function (a, b, c) {
                A(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
            }, opacitySetter: F, rotationSetter: function (a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * k) + 1) + "px";
                c.top = Math.round(Math.cos(a * k)) + "px"
            }, strokeSetter: function (a, b, c) {
                this.setAttr("strokecolor",
                    this.renderer.color(a, c, b, this))
            }, "stroke-widthSetter": function (a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                x(a) && (a += "px");
                this.setAttr("strokeweight", a)
            }, titleSetter: function (a, b) {
                this.setAttr(b, a)
            }, visibilitySetter: function (a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && e(this.shadows, function (c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            }, xSetter: function (a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ?
                    (this[b] = a, this.updateClipping()) : c.style[b] = a
            }, zIndexSetter: function (a, b, c) {
                c.style[b] = a
            }
        }, F["stroke-opacitySetter"] = F["fill-opacitySetter"], a.VMLElement = F = y(b, F), F.prototype.ySetter = F.prototype.widthSetter = F.prototype.heightSetter = F.prototype.xSetter, F = {
            Element: F, isIE8: -1 < u.navigator.userAgent.indexOf("MSIE 8.0"), init: function (a, b, c) {
                var g, l;
                this.alignedObjects = [];
                g = this.createElement("div").css({position: "relative"});
                l = g.element;
                a.appendChild(g.element);
                this.isVML = !0;
                this.box = l;
                this.boxWrapper =
                    g;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, c, !1);
                if (!t.namespaces.hcv) {
                    t.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        t.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (B) {
                        t.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            }, isHidden: function () {
                return !this.box.offsetWidth
            },
            clipRect: function (a, b, c, m) {
                var g = this.createElement(), n = v(a);
                return d(g, {
                    members: [],
                    count: 0,
                    left: (n ? a.x : a) + 1,
                    top: (n ? a.y : b) + 1,
                    width: (n ? a.width : c) - 1,
                    height: (n ? a.height : m) - 1,
                    getCSS: function (a) {
                        var b = a.element, c = b.nodeName, h = a.inverted, g = this.top - ("shape" === c ? b.offsetTop : 0), l = this.left, b = l + this.width, m = g + this.height, g = {clip: "rect(" + Math.round(h ? l : g) + "px," + Math.round(h ? m : b) + "px," + Math.round(h ? b : m) + "px," + Math.round(h ? g : l) + "px)"};
                        !h && a.docMode8 && "DIV" === c && d(g, {width: b + "px", height: m + "px"});
                        return g
                    },
                    updateClipping: function () {
                        e(g.members,
                            function (a) {
                                a.element && a.css(g.getCSS(a))
                            })
                    }
                })
            }, color: function (b, c, m, n) {
                var g = this, d, u = /^rgba/, z, q, h = "none";
                b && b.linearGradient ? q = "gradient" : b && b.radialGradient && (q = "pattern");
                if (q) {
                    var C, p, k = b.linearGradient || b.radialGradient, f, E, w, v, G, H = "";
                    b = b.stops;
                    var x, t = [], r = function () {
                        z = ['\x3cfill colors\x3d"' + t.join(",") + '" opacity\x3d"', w, '" o:opacity2\x3d"', E, '" type\x3d"', q, '" ', H, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                        A(g.prepVML(z), null, null, c)
                    };
                    f = b[0];
                    x = b[b.length - 1];
                    0 < f[0] && b.unshift([0, f[1]]);
                    1 >
                    x[0] && b.push([1, x[1]]);
                    e(b, function (h, b) {
                        u.test(h[1]) ? (d = a.color(h[1]), C = d.get("rgb"), p = d.get("a")) : (C = h[1], p = 1);
                        t.push(100 * h[0] + "% " + C);
                        b ? (w = p, v = C) : (E = p, G = C)
                    });
                    if ("fill" === m)if ("gradient" === q) m = k.x1 || k[0] || 0, b = k.y1 || k[1] || 0, f = k.x2 || k[2] || 0, k = k.y2 || k[3] || 0, H = 'angle\x3d"' + (90 - 180 * Math.atan((k - b) / (f - m)) / Math.PI) + '"', r(); else {
                        var h = k.r, D = 2 * h, y = 2 * h, F = k.cx, U = k.cy, I = c.radialReference, T, h = function () {
                            I && (T = n.getBBox(), F += (I[0] - T.x) / T.width - .5, U += (I[1] - T.y) / T.height - .5, D *= I[2] / T.width, y *= I[2] / T.height);
                            H =
                                'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + D + "," + y + '" origin\x3d"0.5,0.5" position\x3d"' + F + "," + U + '" color2\x3d"' + G + '" ';
                            r()
                        };
                        n.added ? h() : n.onAdd = h;
                        h = v
                    } else h = C
                } else u.test(b) && "IMG" !== c.tagName ? (d = a.color(b), n[m + "-opacitySetter"](d.get("a"), m, c), h = d.get("rgb")) : (h = c.getElementsByTagName(m), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = b);
                return h
            }, prepVML: function (a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a =
                        -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            }, text: E.prototype.html, path: function (a) {
                var b = {coordsize: "10 10"};
                q(a) ? b.d = a : v(a) && d(b, a);
                return this.createElement("shape").attr(b)
            }, circle: function (a, b, c) {
                var g = this.symbol("circle");
                v(a) && (c = a.r, b = a.y, a = a.x);
                g.isCircle = !0;
                g.r = c;
                return g.attr({x: a, y: b})
            }, g: function (a) {
                var b;
                a && (b = {className: "highcharts-" + a, "class": "highcharts-" + a});
                return this.createElement("div").attr(b)
            }, image: function (a, b, c, m, l) {
                var g = this.createElement("img").attr({src: a});
                1 < arguments.length && g.attr({x: b, y: c, width: m, height: l});
                return g
            }, createElement: function (a) {
                return "rect" === a ? this.symbol(a) : E.prototype.createElement.call(this, a)
            }, invertChild: function (a, b) {
                var g = this;
                b = b.style;
                var m = "IMG" === a.tagName && a.style;
                D(a, {
                    flip: "x",
                    left: c(b.width) - (m ? c(m.top) : 1),
                    top: c(b.height) - (m ? c(m.left) : 1),
                    rotation: -90
                });
                e(a.childNodes, function (b) {
                    g.invertChild(b, a)
                })
            }, symbols: {
                arc: function (a, b, c, m, l) {
                    var g = l.start, n = l.end, e = l.r || c || m;
                    c = l.innerR;
                    m = Math.cos(g);
                    var d = Math.sin(g), h = Math.cos(n), C = Math.sin(n);
                    if (0 === n - g)return ["x"];
                    g = ["wa", a - e, b - e, a + e, b + e, a + e * m, b + e * d, a + e * h, b + e * C];
                    l.open && !c && g.push("e", "M", a, b);
                    g.push("at", a - c, b - c, a + c, b + c, a + c * h, b + c * C, a + c * m, b + c * d, "x", "e");
                    g.isArc = !0;
                    return g
                }, circle: function (a, b, c, m, l) {
                    l && f(l.r) && (c = m = 2 * l.r);
                    l && l.isCircle && (a -= c / 2, b -= m / 2);
                    return ["wa", a, b, a + c, b + m, a + c, b + m / 2, a + c, b + m / 2, "e"]
                },
                rect: function (a, b, c, m, l) {
                    return E.prototype.symbols[f(l) && l.r ? "callout" : "square"].call(0, a, b, c, m, l)
                }
            }
        }, a.VMLRenderer = y = function () {
            this.init.apply(this, arguments)
        }, y.prototype = n(E.prototype, F), a.Renderer = y);
        E.prototype.measureSpanWidth = function (a, b) {
            var c = t.createElement("span");
            a = t.createTextNode(a);
            c.appendChild(a);
            D(c, b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            r(c);
            return b
        }
    })(I);
    (function (a) {
        var y = a.correctFloat, F = a.defined, A = a.destroyObjectProperties, D = a.isNumber, f = a.merge, k = a.pick, r = a.deg2rad;
        a.Tick = function (a, e, p, d) {
            this.axis = a;
            this.pos = e;
            this.type = p || "";
            this.isNew = !0;
            p || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, e = a.options, p = a.chart, d = a.categories, q = a.names, x = this.pos, v = e.labels, n = a.tickPositions, m = x === n[0], c = x === n[n.length - 1], q = d ? k(d[x], q[x], x) : x, d = this.label, n = n.info, b;
                a.isDatetimeAxis && n && (b = e.dateTimeLabelFormats[n.higherRanks[x] || n.unitName]);
                this.isFirst = m;
                this.isLast = c;
                e = a.labelFormatter.call({
                    axis: a, chart: p, isFirst: m, isLast: c, dateTimeLabelFormat: b,
                    value: a.isLog ? y(a.lin2log(q)) : q
                });
                F(d) ? d && d.attr({text: e}) : (this.labelLength = (this.label = d = F(e) && v.enabled ? p.renderer.text(e, 0, 0, v.useHTML).css(f(v.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var e = this.axis, p = a.x, d = e.chart.chartWidth, q = e.chart.spacing, f = k(e.labelLeft, Math.min(e.pos, q[3])), q = k(e.labelRight, Math.max(e.pos + e.len, d - q[1])), v = this.label,
                    n = this.rotation, m = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[e.labelAlign], c = v.getBBox().width, b = e.getSlotWidth(), E = b, u = 1, g, z = {};
                if (n) 0 > n && p - m * c < f ? g = Math.round(p / Math.cos(n * r) - f) : 0 < n && p + m * c > q && (g = Math.round((d - p) / Math.cos(n * r))); else if (d = p + (1 - m) * c, p - m * c < f ? E = a.x + E * (1 - m) - f : d > q && (E = q - a.x + E * m, u = -1), E = Math.min(b, E), E < b && "center" === e.labelAlign && (a.x += u * (b - E - m * (b - Math.min(c, E)))), c > E || e.autoRotation && (v.styles || {}).width) g = E;
                g && (z.width = g, (e.options.labels.style || {}).textOverflow || (z.textOverflow = "ellipsis"), v.css(z))
            },
            getPosition: function (a, e, p, d) {
                var q = this.axis, k = q.chart, f = d && k.oldChartHeight || k.chartHeight;
                return {
                    x: a ? q.translate(e + p, null, null, d) + q.transB : q.left + q.offset + (q.opposite ? (d && k.oldChartWidth || k.chartWidth) - q.right - q.left : 0),
                    y: a ? f - q.bottom + q.offset - (q.opposite ? q.height : 0) : f - q.translate(e + p, null, null, d) - q.transB
                }
            }, getLabelPosition: function (a, e, p, d, q, k, f, n) {
                var m = this.axis, c = m.transA, b = m.reversed, E = m.staggerLines, u = m.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, g = q.y;
                F(g) || (g = 0 === m.side ? p.rotation ? -8 : -p.getBBox().height : 2 ===
                    m.side ? u.y + 8 : Math.cos(p.rotation * r) * (u.y - p.getBBox(!1, 0).height / 2));
                a = a + q.x + u.x - (k && d ? k * c * (b ? -1 : 1) : 0);
                e = e + g - (k && !d ? k * c * (b ? 1 : -1) : 0);
                E && (p = f / (n || 1) % E, m.opposite && (p = E - p - 1), e += m.labelOffset / E * p);
                return {x: a, y: Math.round(e)}
            }, getMarkPath: function (a, e, p, d, q, k) {
                return k.crispLine(["M", a, e, "L", a + (q ? 0 : -p), e + (q ? p : 0)], d)
            }, render: function (a, e, p) {
                var d = this.axis, q = d.options, f = d.chart.renderer, v = d.horiz, n = this.type, m = this.label, c = this.pos, b = q.labels, E = this.gridLine, u = n ? n + "Tick" : "tick", g = d.tickSize(u), z = this.mark,
                    G = !z, H = b.step, l = {}, B = !0, K = d.tickmarkOffset, L = this.getPosition(v, c, K, e), J = L.x, L = L.y, h = v && J === d.pos + d.len || !v && L === d.pos ? -1 : 1, C = n ? n + "Grid" : "grid", M = q[C + "LineWidth"], N = q[C + "LineColor"], r = q[C + "LineDashStyle"], C = k(q[u + "Width"], !n && d.isXAxis ? 1 : 0), u = q[u + "Color"];
                p = k(p, 1);
                this.isActive = !0;
                E || (l.stroke = N, l["stroke-width"] = M, r && (l.dashstyle = r), n || (l.zIndex = 1), e && (l.opacity = 0), this.gridLine = E = f.path().attr(l).addClass("highcharts-" + (n ? n + "-" : "") + "grid-line").add(d.gridGroup));
                if (!e && E && (c = d.getPlotLinePath(c +
                        K, E.strokeWidth() * h, e, !0))) E[this.isNew ? "attr" : "animate"]({d: c, opacity: p});
                g && (d.opposite && (g[0] = -g[0]), G && (this.mark = z = f.path().addClass("highcharts-" + (n ? n + "-" : "") + "tick").add(d.axisGroup), z.attr({
                    stroke: u,
                    "stroke-width": C
                })), z[G ? "attr" : "animate"]({
                    d: this.getMarkPath(J, L, g[0], z.strokeWidth() * h, v, f),
                    opacity: p
                }));
                m && D(J) && (m.xy = L = this.getLabelPosition(J, L, m, v, b, K, a, H), this.isFirst && !this.isLast && !k(q.showFirstLabel, 1) || this.isLast && !this.isFirst && !k(q.showLastLabel, 1) ? B = !1 : !v || d.isRadial || b.step ||
                    b.rotation || e || 0 === p || this.handleOverflow(L), H && a % H && (B = !1), B && D(L.y) ? (L.opacity = p, m[this.isNew ? "attr" : "animate"](L)) : m.attr("y", -9999), this.isNew = !1)
            }, destroy: function () {
                A(this, this.axis)
            }
        }
    })(I);
    (function (a) {
        var y = a.arrayMax, F = a.arrayMin, A = a.defined, D = a.destroyObjectProperties, f = a.each, k = a.erase, r = a.merge, t = a.pick;
        a.PlotLineOrBand = function (a, p) {
            this.axis = a;
            p && (this.options = p, this.id = p.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this, p = a.axis, d = p.horiz, q = a.options, k = q.label, f = a.label,
                    n = q.to, m = q.from, c = q.value, b = A(m) && A(n), E = A(c), u = a.svgElem, g = !u, z = [], G, H = q.color, l = t(q.zIndex, 0), B = q.events, z = {"class": "highcharts-plot-" + (b ? "band " : "line ") + (q.className || "")}, K = {}, L = p.chart.renderer, J = b ? "bands" : "lines", h = p.log2lin;
                p.isLog && (m = h(m), n = h(n), c = h(c));
                E ? (z = {
                        stroke: H,
                        "stroke-width": q.width
                    }, q.dashStyle && (z.dashstyle = q.dashStyle)) : b && (H && (z.fill = H), q.borderWidth && (z.stroke = q.borderColor, z["stroke-width"] = q.borderWidth));
                K.zIndex = l;
                J += "-" + l;
                (H = p[J]) || (p[J] = H = L.g("plot-" + J).attr(K).add());
                g && (a.svgElem = u = L.path().attr(z).add(H));
                if (E) z = p.getPlotLinePath(c, u.strokeWidth()); else if (b) z = p.getPlotBandPath(m, n, q); else return;
                if (g && z && z.length) {
                    if (u.attr({d: z}), B)for (G in q = function (b) {
                        u.on(b, function (h) {
                            B[b].apply(a, [h])
                        })
                    }, B)q(G)
                } else u && (z ? (u.show(), u.animate({d: z})) : (u.hide(), f && (a.label = f = f.destroy())));
                k && A(k.text) && z && z.length && 0 < p.width && 0 < p.height && !z.flat ? (k = r({
                        align: d && b && "center",
                        x: d ? !b && 4 : 10,
                        verticalAlign: !d && b && "middle",
                        y: d ? b ? 16 : 10 : b ? 6 : -4,
                        rotation: d && !b && 90
                    }, k), this.renderLabel(k,
                        z, b, l)) : f && f.hide();
                return a
            }, renderLabel: function (a, p, d, q) {
                var e = this.label, k = this.axis.chart.renderer;
                e || (e = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, e.zIndex = q, this.label = e = k.text(a.text, 0, 0, a.useHTML).attr(e).add(), e.css(a.style));
                q = [p[1], p[4], d ? p[6] : p[1]];
                p = [p[2], p[5], d ? p[7] : p[2]];
                d = F(q);
                k = F(p);
                e.align(a, !1, {x: d, y: k, width: y(q) - d, height: y(p) - k});
                e.show()
            }, destroy: function () {
                k(this.axis.plotLinesAndBands, this);
                delete this.axis;
                D(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, k) {
                k = this.getPlotLinePath(k, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && k ? (a.flat = a.toString() === k.toString(), a.push(k[4], k[5], k[1], k[2], "z")) : a = null;
                return a
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (e, k) {
                var d = (new a.PlotLineOrBand(this, e)).render(), q = this.userOptions;
                d && (k && (q[k] = q[k] || [], q[k].push(e)),
                    this.plotLinesAndBands.push(d));
                return d
            }, removePlotBandOrLine: function (a) {
                for (var e = this.plotLinesAndBands, d = this.options, q = this.userOptions, x = e.length; x--;)e[x].id === a && e[x].destroy();
                f([d.plotLines || [], q.plotLines || [], d.plotBands || [], q.plotBands || []], function (d) {
                    for (x = d.length; x--;)d[x].id === a && k(d, d[x])
                })
            }
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animObject, A = a.arrayMax, D = a.arrayMin, f = a.AxisPlotLineOrBandExtension, k = a.color, r = a.correctFloat, t = a.defaultOptions, e = a.defined, p = a.deg2rad, d = a.destroyObjectProperties,
            q = a.each, x = a.extend, v = a.fireEvent, n = a.format, m = a.getMagnitude, c = a.grep, b = a.inArray, E = a.isArray, u = a.isNumber, g = a.isString, z = a.merge, G = a.normalizeTickInterval, H = a.pick, l = a.PlotLineOrBand, B = a.removeEvent, K = a.splat, L = a.syncTimeout, J = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0, style: {
                        color: "#666666",
                        cursor: "default", fontSize: "11px"
                    }, x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    enabled: !1, formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }, style: {fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                }, title: {rotation: 0}
            },
            init: function (a, c) {
                var h = c.isX;
                this.chart = a;
                this.horiz = a.inverted ? !h : h;
                this.isXAxis = h;
                this.coll = this.coll || (h ? "xAxis" : "yAxis");
                this.opposite = c.opposite;
                this.side = c.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(c);
                var l = this.options, m = l.type;
                this.labelFormatter = l.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = c;
                this.minPixelPadding = 0;
                this.reversed = l.reversed;
                this.visible = !1 !== l.visible;
                this.zoomEnabled = !1 !== l.zoomEnabled;
                this.hasNames =
                    "category" === m || !0 === l.categories;
                this.categories = l.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === m;
                this.isDatetimeAxis = "datetime" === m;
                this.isLinked = e(l.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = l.minRange || l.maxZoom;
                this.range = l.range;
                this.offset = l.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = H(l.crosshair,
                    K(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                var g;
                c = this.options.events;
                -1 === b(this, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && h && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (g in c)y(this, g, c[g]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = z(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions,
                    [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], z(t[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis, c = this.value, l = b.categories, m = this.dateTimeLabelFormat, g = t.lang, d = g.numericSymbols, g = g.numericSymbolMagnitude || 1E3, w = d && d.length, e, u = b.options.labels.format, b = b.isLog ? c : b.tickInterval;
                if (u) e = n(u, this); else if (l) e = c; else if (m) e = a.dateFormat(m, c); else if (w && 1E3 <= b)for (; w-- && void 0 === e;)l = Math.pow(g, w + 1), b >=
                l && 0 === 10 * c % l && null !== d[w] && 0 !== c && (e = a.numberFormat(c / l, -1) + d[w]);
                void 0 === e && (e = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return e
            },
            getSeriesExtremes: function () {
                var a = this, b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                q(a.series, function (h) {
                    if (h.visible || !b.options.chart.ignoreHiddenSeries) {
                        var l = h.options, g = l.threshold, m;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= g && (g = null);
                        if (a.isXAxis) l = h.xData,
                        l.length && (h = D(l), u(h) || h instanceof Date || (l = c(l, function (a) {
                            return u(a)
                        }), h = D(l)), a.dataMin = Math.min(H(a.dataMin, l[0]), h), a.dataMax = Math.max(H(a.dataMax, l[0]), A(l))); else if (h.getExtremes(), m = h.dataMax, h = h.dataMin, e(h) && e(m) && (a.dataMin = Math.min(H(a.dataMin, h), h), a.dataMax = Math.max(H(a.dataMax, m), m)), e(g) && (a.threshold = g), !l.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, c, l, g, m) {
                var h = this.linkedParent || this, C = 1, n = 0, d = l ? h.oldTransA : h.transA;
                l = l ? h.oldMin : h.min;
                var e = h.minPixelPadding;
                g = (h.isOrdinal || h.isBroken || h.isLog && g) && h.lin2val;
                d || (d = h.transA);
                c && (C *= -1, n = h.len);
                h.reversed && (C *= -1, n -= C * (h.sector || h.len));
                b ? (a = (a * C + n - e) / d + l, g && (a = h.lin2val(a))) : (g && (a = h.val2lin(a)), a = C * (a - l) * d + n + C * e + (u(m) ? d * m : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, c, l, g) {
                var h = this.chart, m = this.left, C = this.top, n, d, e = c && h.oldChartHeight ||
                    h.chartHeight, k = c && h.oldChartWidth || h.chartWidth, q;
                n = this.transB;
                var f = function (a, b, h) {
                    if (a < b || a > h) l ? a = Math.min(Math.max(b, a), h) : q = !0;
                    return a
                };
                g = H(g, this.translate(a, null, null, c));
                a = c = Math.round(g + n);
                n = d = Math.round(e - g - n);
                u(g) ? this.horiz ? (n = C, d = e - this.bottom, a = c = f(a, m, m + this.width)) : (a = m, c = k - this.right, n = d = f(n, C, C + this.height)) : q = !0;
                return q && !l ? null : h.renderer.crispLine(["M", a, n, "L", c, d], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var h, l = r(Math.floor(b / a) * a), g = r(Math.ceil(c / a) * a), m = [];
                if (b ===
                    c && u(b))return [b];
                for (b = l; b <= g;) {
                    m.push(b);
                    b = r(b + a);
                    if (b === h)break;
                    h = b
                }
                return m
            },
            getMinorTickPositions: function () {
                var a = this.options, b = this.tickPositions, c = this.minorTickInterval, l = [], g, m = this.pointRangePadding || 0;
                g = this.min - m;
                var m = this.max + m, n = m - g;
                if (n && n / c < this.len / 3)if (this.isLog)for (m = b.length, g = 1; g < m; g++)l = l.concat(this.getLogTickPositions(c, b[g - 1], b[g], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) l = l.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), g, m, a.startOfWeek));
                else for (b = g + (b[0] - g) % c; b <= m && b !== l[0]; b += c)l.push(b);
                0 !== l.length && this.trimTicks(l, a.startOnTick, a.endOnTick);
                return l
            },
            adjustForMinRange: function () {
                var a = this.options, b = this.min, c = this.max, l, g = this.dataMax - this.dataMin >= this.minRange, m, n, d, u, k, f;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (e(a.min) || e(a.max) ? this.minRange = null : (q(this.series, function (a) {
                        u = a.xData;
                        for (n = k = a.xIncrement ? 1 : u.length - 1; 0 < n; n--)if (d = u[n] - u[n - 1], void 0 === m || d < m) m = d
                    }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
                c - b < this.minRange && (f = this.minRange, l = (f - c + b) / 2, l = [b - l, H(a.min, b - l)], g && (l[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = A(l), c = [b + f, H(a.max, b + f)], g && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = D(c), c - b < f && (l[0] = c - f, l[1] = H(a.min, c - f), b = A(l)));
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : q(this.series, function (b) {
                        var h = b.closestPointRange, c = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                        !b.noSharedTooltip && e(h) && c && (a = e(a) ? Math.min(a, h) : h)
                    });
                return a
            },
            nameToX: function (a) {
                var h = E(this.categories), c = h ? this.categories : this.names, l = a.options.x, g;
                a.series.requireSorting = !1;
                e(l) || (l = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b(a.name, c));
                -1 === l ? h || (g = c.length) : g = l;
                this.names[g] = a.name;
                return g
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, q(this.series || [], function (b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                    q(b.points, function (h, c) {
                        var l;
                        h.options && (l = a.nameToX(h), l !== h.x && (h.x = l, b.xData[c] = l))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this, h = b.max - b.min, c = b.axisPointRange || 0, l, m = 0, n = 0, d = b.linkedParent, e = !!b.categories, u = b.transA, k = b.isXAxis;
                if (k || e || c) l = b.getClosest(), d ? (m = d.minPointOffset, n = d.pointRangePadding) : q(b.series, function (a) {
                        var h = e ? 1 : k ? H(a.options.pointRange, l, 0) : b.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        c = Math.max(c, h);
                        b.single || (m = Math.max(m, g(a) ? 0 : h / 2), n = Math.max(n, "on" === a ? 0 : h))
                    }), d = b.ordinalSlope && l ? b.ordinalSlope /
                    l : 1, b.minPointOffset = m *= d, b.pointRangePadding = n *= d, b.pointRange = Math.min(c, h), k && (b.closestPointRange = l);
                a && (b.oldTransA = u);
                b.translationSlope = b.transA = u = b.len / (h + n || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = u * m
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var h = this, c = h.chart, l = h.options, g = h.isLog, n = h.log2lin, d = h.isDatetimeAxis, k = h.isXAxis, f = h.isLinked, B = l.maxPadding, p = l.minPadding, z = l.tickInterval, E = l.tickPixelInterval, L = h.categories, K = h.threshold,
                    x = h.softThreshold, J, t, D, y;
                d || L || f || this.getTickAmount();
                D = H(h.userMin, l.min);
                y = H(h.userMax, l.max);
                f ? (h.linkedParent = c[h.coll][l.linkedTo], c = h.linkedParent.getExtremes(), h.min = H(c.min, c.dataMin), h.max = H(c.max, c.dataMax), l.type !== h.linkedParent.options.type && a.error(11, 1)) : (!x && e(K) && (h.dataMin >= K ? (J = K, p = 0) : h.dataMax <= K && (t = K, B = 0)), h.min = H(D, J, h.dataMin), h.max = H(y, t, h.dataMax));
                g && (!b && 0 >= Math.min(h.min, H(h.dataMin, h.min)) && a.error(10, 1), h.min = r(n(h.min), 15), h.max = r(n(h.max), 15));
                h.range && e(h.max) &&
                (h.userMin = h.min = D = Math.max(h.min, h.minFromRange()), h.userMax = y = h.max, h.range = null);
                v(h, "foundExtremes");
                h.beforePadding && h.beforePadding();
                h.adjustForMinRange();
                !(L || h.axisPointRange || h.usePercentage || f) && e(h.min) && e(h.max) && (n = h.max - h.min) && (!e(D) && p && (h.min -= n * p), !e(y) && B && (h.max += n * B));
                u(l.floor) ? h.min = Math.max(h.min, l.floor) : u(l.softMin) && (h.min = Math.min(h.min, l.softMin));
                u(l.ceiling) ? h.max = Math.min(h.max, l.ceiling) : u(l.softMax) && (h.max = Math.max(h.max, l.softMax));
                x && e(h.dataMin) && (K = K || 0, !e(D) &&
                h.min < K && h.dataMin >= K ? h.min = K : !e(y) && h.max > K && h.dataMax <= K && (h.max = K));
                h.tickInterval = h.min === h.max || void 0 === h.min || void 0 === h.max ? 1 : f && !z && E === h.linkedParent.options.tickPixelInterval ? z = h.linkedParent.tickInterval : H(z, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, L ? 1 : (h.max - h.min) * E / Math.max(h.len, E));
                k && !b && q(h.series, function (a) {
                    a.processData(h.min !== h.oldMin || h.max !== h.oldMax)
                });
                h.setAxisTranslation(!0);
                h.beforeSetTickPositions && h.beforeSetTickPositions();
                h.postProcessTickInterval &&
                (h.tickInterval = h.postProcessTickInterval(h.tickInterval));
                h.pointRange && !z && (h.tickInterval = Math.max(h.pointRange, h.tickInterval));
                b = H(l.minTickInterval, h.isDatetimeAxis && h.closestPointRange);
                !z && h.tickInterval < b && (h.tickInterval = b);
                d || g || z || (h.tickInterval = G(h.tickInterval, null, m(h.tickInterval), H(l.allowDecimals, !(.5 < h.tickInterval && 5 > h.tickInterval && 1E3 < h.max && 9999 > h.max)), !!this.tickAmount));
                this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a =
                    this.options, b, c = a.tickPositions, l = a.tickPositioner, g = a.startOnTick, m = a.endOnTick, n;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange,
                        !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, l && (l = l.apply(this, [this.min, this.max]))) && (this.tickPositions = b = l);
                this.trimTicks(b, g, m);
                this.isLinked || (this.min === this.max && e(this.min) && !this.tickAmount && (n = !0, this.min -= .5, this.max += .5), this.single = n, c || l || this.adjustTickAmount())
            },
            trimTicks: function (a, b, c) {
                var h = a[0], l = a[a.length - 1], g = this.minPointOffset ||
                    0;
                if (!this.isLinked) {
                    if (b) this.min = h; else for (; this.min - g > a[0];)a.shift();
                    if (c) this.max = l; else for (; this.max + g < a[a.length - 1];)a.pop();
                    0 === a.length && e(h) && a.push((l + h) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || q(this.chart[this.coll], function (h) {
                    var c = h.options, c = [h.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
                    h.series.length && (a[c] ? b = !0 : a[c] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount,
                    c = a.tickPixelInterval;
                !e(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, l = this.finalTickAmt, g = b && b.length;
                if (g < c) {
                    for (; b.length < c;)b.push(r(b[b.length - 1] + a));
                    this.transA *= (g - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else g > c && (this.tickInterval *= 2, this.setTickPositions());
                if (e(l)) {
                    for (a = c = b.length; a--;)(3 === l && 1 === a % 2 || 2 >= l && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                q(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, c, l, g) {
                var h = this, m = h.chart;
                c = H(c, !0);
                q(h.series, function (a) {
                    delete a.kdTree
                });
                g = x(g, {min: a, max: b});
                v(h, "setExtremes", g, function () {
                    h.userMin = a;
                    h.userMax = b;
                    h.eventArgs = g;
                    c && m.redraw(l)
                })
            },
            zoom: function (a, b) {
                var h = this.dataMin, c = this.dataMax, l = this.options,
                    g = Math.min(h, H(l.min, h)), l = Math.max(c, H(l.max, c));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (e(h) && (a < g && (a = g), a > l && (a = l)), e(c) && (b < g && (b = g), b > l && (b = l))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var a = this.chart, b = this.options, c = b.offsets || [0, 0, 0, 0], l = this.horiz, g = H(b.width, a.plotWidth - c[3] + c[1]), m = H(b.height, a.plotHeight - c[0] + c[2]), n = H(b.top, a.plotTop + c[0]), b = H(b.left, a.plotLeft + c[3]), c = /%$/;
                c.test(m) && (m =
                    Math.round(parseFloat(m) / 100 * a.plotHeight));
                c.test(n) && (n = Math.round(parseFloat(n) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = n;
                this.width = g;
                this.height = m;
                this.bottom = a.chartHeight - m - n;
                this.right = a.chartWidth - g - b;
                this.len = Math.max(l ? g : m, 0);
                this.pos = l ? b : n
            },
            getExtremes: function () {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? r(b(this.min)) : this.min,
                    max: a ? r(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b =
                    this.isLog, h = this.lin2log, c = b ? h(this.min) : this.min, b = b ? h(this.max) : this.max;
                null === a ? a = c : c > a ? a = c : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, h = b[a + "Length"], c = H(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (c && h)return "inside" === b[a + "Position"] && (h = -h), [h, c]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, c = this.tickInterval, l = c, g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), m, n = a.rotation, d = this.labelMetrics(), u, k = Number.MAX_VALUE, f, B = function (a) {
                    a /= g || 1;
                    a = 1 < a ? Math.ceil(a) : 1;
                    return a * c
                };
                b ? (f = !a.staggerLines && !a.step && (e(n) ? [n] : g < H(a.autoRotationLimit, 80) && a.autoRotation)) && q(f, function (a) {
                        var b;
                        if (a === n || a && -90 <= a && 90 >= a) u = B(Math.abs(d.h / Math.sin(p * a))), b = u +
                            Math.abs(a / 360), b < k && (k = b, m = a, l = u)
                    }) : a.step || (l = B(d.h));
                this.autoRotation = f;
                this.labelRotation = H(m, n);
                return l
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, c = this.options.labels, l = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), g = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / l || !b && (g && g - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, c = this.tickPositions, l = this.ticks, m = this.options.labels, n = this.horiz,
                    d = this.getSlotWidth(), e = Math.max(1, Math.round(d - 2 * (m.padding || 5))), u = {}, k = this.labelMetrics(), f = m.style && m.style.textOverflow, B, p = 0, E, v;
                g(m.rotation) || (u.rotation = m.rotation || 0);
                q(c, function (a) {
                    (a = l[a]) && a.labelLength > p && (p = a.labelLength)
                });
                this.maxLabelLength = p;
                if (this.autoRotation) p > e && p > k.h ? u.rotation = this.labelRotation : this.labelRotation = 0; else if (d && (B = {width: e + "px"}, !f))for (B.textOverflow = "clip", E = c.length; !n && E--;)if (v = c[E], e = l[v].label) e.styles && "ellipsis" === e.styles.textOverflow ? e.css({textOverflow: "clip"}) :
                    l[v].labelLength > d && e.css({width: d + "px"}), e.getBBox().height > this.len / c.length - (k.h - k.f) && (e.specCss = {textOverflow: "ellipsis"});
                u.rotation && (B = {width: (p > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, f || (B.textOverflow = "ellipsis"));
                if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) u.align = this.labelAlign;
                q(c, function (a) {
                    var b = (a = l[a]) && a.label;
                    b && (b.attr(u), B && b.css(z(B, b.specCss)), delete b.specCss, a.rotation = u.rotation)
                });
                this.tickRotCorr = b.rotCorr(k.b, this.labelRotation ||
                    0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || e(this.min) && e(this.max) && !!this.tickPositions
            },
            addTitle: function (a) {
                var b = this.chart.renderer, c = this.horiz, h = this.opposite, l = this.options.title, g;
                this.axisTitle || ((g = l.textAlign) || (g = (c ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: h ? "right" : "left",
                        middle: "center",
                        high: h ? "left" : "right"
                    })[l.align]), this.axisTitle = b.text(l.text, 0, 0, l.useHTML).attr({
                    zIndex: 7,
                    rotation: l.rotation || 0,
                    align: g
                }).addClass("highcharts-axis-title").css(l.style).add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new J(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, c = b.renderer, l = a.options, g = a.tickPositions, m = a.ticks, n = a.horiz, d = a.side, u = b.inverted ? [1, 0, 3, 2][d] : d, k, f, B = 0, p, z = 0, E = l.title, v = l.labels, G = 0, K = b.axisOffset, b = b.clipOffset, L = [-1, 1, 1, -1][d], x, J = l.className, r = a.axisParent, t = this.tickSize("tick");
                k = a.hasData();
                a.showAxis = f = k || H(l.showEmpty, !0);
                a.staggerLines = a.horiz && v.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: l.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (J || "")).add(r), a.axisGroup = c.g("axis").attr({zIndex: l.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (J || "")).add(r), a.labelGroup = c.g("axis-labels").attr({zIndex: v.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (J || "")).add(r));
                if (k || a.isLinked) q(g, function (b, c) {
                    a.generateTick(b, c)
                }), a.renderUnsquish(), !1 === v.reserveSpace || 0 !== d && 2 !== d &&
                {1: "left", 3: "right"}[d] !== a.labelAlign && "center" !== a.labelAlign || q(g, function (a) {
                    G = Math.max(m[a].getLabelSize(), G)
                }), a.staggerLines && (G *= a.staggerLines, a.labelOffset = G * (a.opposite ? -1 : 1)); else for (x in m)m[x].destroy(), delete m[x];
                E && E.text && !1 !== E.enabled && (a.addTitle(f), f && (B = a.axisTitle.getBBox()[n ? "height" : "width"], p = E.offset, z = e(p) ? 0 : H(E.margin, n ? 5 : 10)));
                a.renderLine();
                a.offset = L * H(l.offset, K[d]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                c = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
                z = Math.abs(G) +
                    z;
                G && (z = z - c + L * (n ? H(v.y, a.tickRotCorr.y + 8 * L) : v.x));
                a.axisTitleMargin = H(p, z);
                K[d] = Math.max(K[d], a.axisTitleMargin + B + L * a.offset, z, k && g.length && t ? t[0] : 0);
                l = l.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[u] = Math.max(b[u], l)
            },
            getLinePath: function (a) {
                var b = this.chart, c = this.opposite, h = this.offset, l = this.horiz, g = this.left + (c ? this.width : 0) + h, h = b.chartHeight - this.bottom - (c ? this.height : 0) + h;
                c && (a *= -1);
                return b.renderer.crispLine(["M", l ? this.left : g, l ? h : this.top, "L", l ? b.chartWidth - this.right : g, l ? h : b.chartHeight -
                    this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, c = this.top, l = this.len, g = this.options.title, m = a ? b : c, n = this.opposite, d = this.offset, e = g.x || 0, u = g.y || 0, k = this.chart.renderer.fontMetrics(g.style && g.style.fontSize, this.axisTitle).f, l = {
                    low: m + (a ? 0 : l),
                    middle: m + l / 2, high: m + (a ? l : 0)
                }[g.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? k : 0);
                return {
                    x: a ? l + e : b + (n ? this.width : 0) + d + e,
                    y: a ? b + u - (n ? this.height : 0) + d : l + u
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && u(this.oldMin), c = this.minorTicks;
                c[a] || (c[a] = new J(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var c = this.isLinked, h = this.ticks, l = this.chart.hasRendered && u(this.oldMin);
                if (!c || a >= this.min && a <= this.max) h[a] ||
                (h[a] = new J(this, a)), l && h[a].isNew && h[a].render(b, !0, .1), h[a].render(b)
            },
            render: function () {
                var a = this, b = a.chart, c = a.options, g = a.isLog, m = a.lin2log, n = a.isLinked, d = a.tickPositions, e = a.axisTitle, u = a.ticks, k = a.minorTicks, f = a.alternateBands, B = c.stackLabels, p = c.alternateGridColor, z = a.tickmarkOffset, E = a.axisLine, v = a.showAxis, G = F(b.renderer.globalAnimation), K, H;
                a.labelEdge.length = 0;
                a.overlap = !1;
                q([u, k, f], function (a) {
                    for (var b in a)a[b].isActive = !1
                });
                if (a.hasData() || n) a.minorTickInterval && !a.categories && q(a.getMinorTickPositions(),
                    function (b) {
                        a.renderMinorTick(b)
                    }), d.length && (q(d, function (b, c) {
                    a.renderTick(b, c)
                }), z && (0 === a.min || a.single) && (u[-1] || (u[-1] = new J(a, -1, null, !0)), u[-1].render(-1))), p && q(d, function (c, h) {
                    H = void 0 !== d[h + 1] ? d[h + 1] + z : a.max - z;
                    0 === h % 2 && c < a.max && H <= a.max + (b.polar ? -z : z) && (f[c] || (f[c] = new l(a)), K = c + z, f[c].options = {
                        from: g ? m(K) : K,
                        to: g ? m(H) : H,
                        color: p
                    }, f[c].render(), f[c].isActive = !0)
                }), a._addedPlotLB || (q((c.plotLines || []).concat(c.plotBands || []), function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                q([u, k, f],
                    function (a) {
                        var c, h, l = [], g = G.duration;
                        for (c in a)a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, l.push(c));
                        L(function () {
                            for (h = l.length; h--;)a[l[h]] && !a[l[h]].isActive && (a[l[h]].destroy(), delete a[l[h]])
                        }, a !== f && b.hasRendered && g ? g : 0)
                    });
                E && (E[E.isPlaced ? "animate" : "attr"]({d: this.getLinePath(E.strokeWidth())}), E.isPlaced = !0, E[v ? "show" : "hide"](!0));
                e && v && (e[e.isNew ? "attr" : "animate"](a.getTitlePosition()), e.isNew = !1);
                B && B.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible &&
                (this.render(), q(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                q(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var c = this, h = c.stacks, l, g = c.plotLinesAndBands, m;
                a || B(c);
                for (l in h)d(h[l]), h[l] = null;
                q([c.ticks, c.minorTicks, c.alternateBands], function (a) {
                    d(a)
                });
                if (g)for (a = g.length; a--;)g[a].destroy();
                q("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                for (m in c)c.hasOwnProperty(m) && -1 === b(m, c.keepProps) && delete c[m]
            },
            drawCrosshair: function (a, b) {
                var c, l = this.crosshair, h = H(l.snap, !0), g, m = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (e(b) || !h) ? (h ? e(b) && (g = this.isXAxis ? b.plotX : this.len - b.plotY) : g = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), e(g) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : H(b.stackY, b.y)), null, null, null, g) || null), e(c) ? (b = this.categories && !this.isRadial, m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                            (b ? "category " : "thin ") + l.className).attr({zIndex: H(l.zIndex, 2)}).add(), m.attr({
                            stroke: l.color || (b ? k("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                            "stroke-width": H(l.width, 1)
                        }), l.dashStyle && m.attr({dashstyle: l.dashStyle})), m.show().attr({d: c}), b && !l.width && m.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        };
        x(a.Axis.prototype, f)
    })(I);
    (function (a) {
        var y = a.Axis, F = a.getMagnitude, A = a.map, D = a.normalizeTickInterval,
            f = a.pick;
        y.prototype.getLogTickPositions = function (a, r, t, e) {
            var k = this.options, d = this.len, q = this.lin2log, x = this.log2lin, v = [];
            e || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), v = this.getLinearTickPositions(a, r, t); else if (.08 <= a)for (var d = Math.floor(r), n, m, c, b, E, k = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; d < t + 1 && !E; d++)for (m = k.length, n = 0; n < m && !E; n++)c = x(q(d) * k[n]), c > r && (!e || b <= t) && void 0 !== b && v.push(b), b > t && (E = !0), b = c; else r = q(r), t = q(t), a = k[e ? "minorTickInterval" : "tickInterval"], a = f("auto" ===
            a ? null : a, this._minorAutoInterval, k.tickPixelInterval / (e ? 5 : 1) * (t - r) / ((e ? d / this.tickPositions.length : d) || 1)), a = D(a, null, F(a)), v = A(this.getLinearTickPositions(a, r, t), x), e || (this._minorAutoInterval = a / 5);
            e || (this.tickInterval = a);
            return v
        };
        y.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        y.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(I);
    (function (a) {
        var y = a.dateFormat, F = a.each, A = a.extend, D = a.format, f = a.isNumber, k = a.map, r = a.merge, t = a.pick, e = a.splat, p = a.syncTimeout, d = a.timeUnits;
        a.Tooltip =
            function () {
                this.init.apply(this, arguments)
            };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            }, cleanSplit: function (a) {
                F(this.chart.series, function (d) {
                    var e = d && d.tt;
                    e && (!e.isActive || a ? d.tt = e.destroy() : e.isActive = !1)
                })
            }, getLabel: function () {
                var a = this.chart.renderer, d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape ||
                        "callout", null, null, d.useHTML, null, "tooltip").attr({
                        padding: d.padding,
                        r: d.borderRadius
                    }), this.label.attr({
                        fill: d.backgroundColor,
                        "stroke-width": d.borderWidth
                    }).css(d.style).shadow(d.shadow)), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                this.init(this.chart, r(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function (a, d, e, n) {
                var m = this, c = m.now, b = !1 !== m.options.animation && !m.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)), k = m.followPointer || 1 < m.len;
                A(c, {
                    x: b ? (2 * c.x + a) / 3 : a,
                    y: b ? (c.y + d) / 2 : d,
                    anchorX: k ? void 0 : b ? (2 * c.anchorX + e) / 3 : e,
                    anchorY: k ? void 0 : b ? (c.anchorY + n) / 2 : n
                });
                m.getLabel().attr(c);
                b && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    m && m.move(a, d, e, n)
                }, 32))
            }, hide: function (a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer =
                    p(function () {
                        d.getLabel()[a ? "fadeOut" : "hide"]();
                        d.isHidden = !0
                    }, a))
            }, getAnchor: function (a, d) {
                var f, n = this.chart, m = n.inverted, c = n.plotTop, b = n.plotLeft, p = 0, u = 0, g, z;
                a = e(a);
                f = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = n.pointer.normalize(d)), f = [d.chartX - n.plotLeft, d.chartY - c]);
                f || (F(a, function (a) {
                    g = a.series.yAxis;
                    z = a.series.xAxis;
                    p += a.plotX + (!m && z ? z.left - b : 0);
                    u += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!m && g ? g.top - c : 0)
                }), p /= a.length, u /= a.length, f = [m ? n.plotWidth - u : p, this.shared && !m && 1 < a.length && d ? d.chartY - c : m ? n.plotHeight - p : u]);
                return k(f, Math.round)
            }, getPosition: function (a, d, e) {
                var n = this.chart, m = this.distance, c = {}, b = e.h || 0, k, u = ["y", n.chartHeight, d, e.plotY + n.plotTop, n.plotTop, n.plotTop + n.plotHeight], g = ["x", n.chartWidth, a, e.plotX + n.plotLeft, n.plotLeft, n.plotLeft + n.plotWidth], f = !this.followPointer && t(e.ttBelow, !n.inverted === !!e.negative), p = function (a, l, g, h, n, d) {
                    var e = g < h - m, u = h + m + g < l, k = h - m - g;
                    h += m;
                    if (f && u) c[a] = h; else if (!f && e) c[a] = k; else if (e) c[a] = Math.min(d - g, 0 > k - b ? k : k - b);
                    else if (u) c[a] = Math.max(n, h + b + g > l ? h : h + b); else return !1
                }, q = function (a, b, l, h) {
                    var g;
                    h < m || h > b - m ? g = !1 : c[a] = h < l / 2 ? 1 : h > b - l / 2 ? b - l - 2 : h - l / 2;
                    return g
                }, l = function (a) {
                    var b = u;
                    u = g;
                    g = b;
                    k = a
                }, B = function () {
                    !1 !== p.apply(0, u) ? !1 !== q.apply(0, g) || k || (l(!0), B()) : k ? c.x = c.y = 0 : (l(!0), B())
                };
                (n.inverted || 1 < this.len) && l();
                B();
                return c
            }, defaultFormatter: function (a) {
                var d = this.points || e(this), k;
                k = [a.tooltipFooterHeaderFormatter(d[0])];
                k = k.concat(a.bodyFormatter(d));
                k.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return k
            }, refresh: function (a,
                                  d) {
                var k = this.chart, n, m = this.options, c, b, f = {}, u = [];
                n = m.formatter || this.defaultFormatter;
                var f = k.hoverPoints, g = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = e(a)[0].series.tooltipOptions.followPointer;
                b = this.getAnchor(a, d);
                d = b[0];
                c = b[1];
                !g || a.series && a.series.noSharedTooltip ? f = a.getLabelConfig() : (k.hoverPoints = a, f && F(f, function (a) {
                        a.setState()
                    }), F(a, function (a) {
                        a.setState("hover");
                        u.push(a.getLabelConfig())
                    }), f = {x: a[0].category, y: a[0].y}, f.points = u, a = a[0]);
                this.len = u.length;
                f = n.call(f,
                    this);
                g = a.series;
                this.distance = t(g.tooltipOptions.distance, 16);
                !1 === f ? this.hide() : (n = this.getLabel(), this.isHidden && n.attr({opacity: 1}).show(), this.split ? this.renderSplit(f, k.hoverPoints) : (n.attr({text: f && f.join ? f.join("") : f}), n.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, g.colorIndex)), n.attr({stroke: m.borderColor || a.color || g.color || "#666666"}), this.updatePosition({
                            plotX: d,
                            plotY: c,
                            negative: a.negative,
                            ttBelow: a.ttBelow,
                            h: b[2] || 0
                        })), this.isHidden = !1)
            }, renderSplit: function (d,
                                      e) {
                var k = this, n = [], m = this.chart, c = m.renderer, b = !0, f = this.options, u, g = this.getLabel();
                F(d.slice(0, e.length + 1), function (a, d) {
                    d = e[d - 1] || {isHeader: !0, plotX: e[0].plotX};
                    var p = d.series || k, l = p.tt, B = d.series || {}, z = "highcharts-color-" + t(d.colorIndex, B.colorIndex, "none");
                    l || (p.tt = l = c.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + z).attr({
                        padding: f.padding,
                        r: f.borderRadius,
                        fill: f.backgroundColor,
                        stroke: d.color || B.color || "#333333",
                        "stroke-width": f.borderWidth
                    }).add(g));
                    l.isActive = !0;
                    l.attr({text: a});
                    l.css(f.style);
                    a = l.getBBox();
                    B = a.width + l.strokeWidth();
                    d.isHeader ? (u = a.height, B = Math.max(0, Math.min(d.plotX + m.plotLeft - B / 2, m.chartWidth - B))) : B = d.plotX + m.plotLeft - t(f.distance, 16) - B;
                    0 > B && (b = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= m.plotTop;
                    n.push({
                        target: d.isHeader ? m.plotHeight + u : a,
                        rank: d.isHeader ? 1 : 0,
                        size: p.tt.getBBox().height + 1,
                        point: d,
                        x: B,
                        tt: l
                    })
                });
                this.cleanSplit();
                a.distribute(n, m.plotHeight + u);
                F(n, function (a) {
                    var c = a.point, g = c.series;
                    a.tt.attr({
                        visibility: void 0 ===
                        a.pos ? "hidden" : "inherit",
                        x: b || c.isHeader ? a.x : c.plotX + m.plotLeft + t(f.distance, 16),
                        y: a.pos + m.plotTop,
                        anchorX: c.isHeader ? c.plotX + m.plotLeft : c.plotX + g.xAxis.pos,
                        anchorY: c.isHeader ? a.pos + m.plotTop - 15 : c.plotY + g.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var d = this.chart, e = this.getLabel(), e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            }, getDateFormat: function (a, e, f, n) {
                var m = y("%m-%d %H:%M:%S.%L",
                    e), c, b, k = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, u = "millisecond";
                for (b in d) {
                    if (a === d.week && +y("%w", e) === f && "00:00:00.000" === m.substr(6)) {
                        b = "week";
                        break
                    }
                    if (d[b] > a) {
                        b = u;
                        break
                    }
                    if (k[b] && m.substr(k[b]) !== "01-01 00:00:00.000".substr(k[b]))break;
                    "week" !== b && (u = b)
                }
                b && (c = n[b]);
                return c
            }, getXDateFormat: function (a, d, e) {
                d = d.dateTimeLabelFormats;
                var n = e && e.closestPointRange;
                return (n ? this.getDateFormat(n, a.x, e.options.startOfWeek, d) : d.day) || d.year
            }, tooltipFooterHeaderFormatter: function (a, d) {
                var e = d ? "footer" :
                    "header";
                d = a.series;
                var n = d.tooltipOptions, m = n.xDateFormat, c = d.xAxis, b = c && "datetime" === c.options.type && f(a.key), e = n[e + "Format"];
                b && !m && (m = this.getXDateFormat(a, n, c));
                b && m && (e = e.replace("{point.key}", "{point.key:" + m + "}"));
                return D(e, {point: a, series: d})
            }, bodyFormatter: function (a) {
                return k(a, function (a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat)
                })
            }
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.attr, A = a.charts, D = a.color, f = a.css, k = a.defined, r =
            a.doc, t = a.each, e = a.extend, p = a.fireEvent, d = a.offset, q = a.pick, x = a.removeEvent, v = a.splat, n = a.Tooltip, m = a.win;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                n && b.tooltip.enabled && (a.tooltip = new n(a, b.tooltip), this.followTouchMove = q(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, m = c.zoomType ||
                    "", b = b.inverted;
                /touch/.test(a.type) && (m = q(c.pinchType, m));
                this.zoomX = a = /x/.test(m);
                this.zoomY = m = /y/.test(m);
                this.zoomHor = a && !b || m && b;
                this.zoomVert = m && !b || a && b;
                this.hasZoom = a || m
            }, normalize: function (a, b) {
                var c, n;
                a = a || m.event;
                a.target || (a.target = a.srcElement);
                n = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = d(this.chart.container));
                void 0 === n.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = n.pageX - b.left, b = n.pageY - b.top);
                return e(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(b)
                })
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                t(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, runPointActions: function (c) {
                var b = this.chart, m = b.series, d = b.tooltip, g = d ? d.shared : !1, n = !0, e = b.hoverPoint, f = b.hoverSeries, l, k, p, v = [], J;
                if (!g && !f)for (l = 0; l < m.length; l++)if (m[l].directTouch || !m[l].options.stickyTracking) m = [];
                f && (g ? f.noSharedTooltip : f.directTouch) && e ? v = [e] : (g || !f || f.options.stickyTracking ||
                    (m = [f]), t(m, function (a) {
                        k = a.noSharedTooltip && g;
                        p = !g && a.directTouch;
                        a.visible && !k && !p && q(a.options.enableMouseTracking, !0) && (J = a.searchPoint(c, !k && 1 === a.kdDimensions)) && J.series && v.push(J)
                    }), v.sort(function (a, b) {
                        var c = a.distX - b.distX, l = a.dist - b.dist, h = (b.series.group && b.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                        return 0 !== c && g ? c : 0 !== l ? l : 0 !== h ? h : a.series.index > b.series.index ? -1 : 1
                    }));
                if (g)for (l = v.length; l--;)(v[l].x !== v[0].x || v[l].series.noSharedTooltip) && v.splice(l, 1);
                if (v[0] && (v[0] !==
                    this.prevKDPoint || d && d.isHidden)) {
                    if (g && !v[0].series.noSharedTooltip) {
                        for (l = 0; l < v.length; l++)v[l].onMouseOver(c, v[l] !== (f && f.directTouch && e || v[0]));
                        v.length && d && d.refresh(v.sort(function (a, b) {
                            return a.series.index - b.series.index
                        }), c)
                    } else if (d && d.refresh(v[0], c), !f || !f.directTouch) v[0].onMouseOver(c);
                    this.prevKDPoint = v[0];
                    n = !1
                }
                n && (m = f && f.tooltipOptions.followPointer, d && m && !d.isHidden && (m = d.getAnchor([{}], c), d.updatePosition({
                    plotX: m[0],
                    plotY: m[1]
                })));
                this.unDocMouseMove || (this.unDocMouseMove = y(r,
                    "mousemove", function (b) {
                        if (A[a.hoverChartIndex]) A[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                    }));
                t(g ? v : [q(e, v[0])], function (a) {
                    t(b.axes, function (b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a)
                    })
                })
            }, reset: function (a, b) {
                var c = this.chart, m = c.hoverSeries, g = c.hoverPoint, d = c.hoverPoints, n = c.tooltip, e = n && n.shared ? d : g;
                a && e && t(v(e), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) n && e && (n.refresh(e), g && (g.setState(g.state, !0), t(c.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null,
                        g)
                }))); else {
                    if (g) g.onMouseOut();
                    d && t(d, function (a) {
                        a.setState()
                    });
                    if (m) m.onMouseOut();
                    n && n.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(c.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null
                }
            }, scaleGroups: function (a, b) {
                var c = this.chart, m;
                t(c.series, function (g) {
                    m = a || g.getPlotBox();
                    g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(m), g.markerGroup && (g.markerGroup.attr(m), g.markerGroup.clip(b ? c.clipRect : null)), g.dataLabelsGroup &&
                    g.dataLabelsGroup.attr(m))
                });
                c.clipRect.attr(b || c.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, m = a.chartX, g = a.chartY, d = this.zoomHor, n = this.zoomVert, e = b.plotLeft, l = b.plotTop, f = b.plotWidth, k = b.plotHeight, p, q = this.selectionMarker, h = this.mouseDownX, v = this.mouseDownY, r = c.panKey && a[c.panKey + "Key"];
                q && q.touch || (m < e ? m = e : m > e + f && (m = e + f), g <
                l ? g = l : g > l + k && (g = l + k), this.hasDragged = Math.sqrt(Math.pow(h - m, 2) + Math.pow(v - g, 2)), 10 < this.hasDragged && (p = b.isInsidePlot(h - e, v - l), b.hasCartesianSeries && (this.zoomX || this.zoomY) && p && !r && !q && (this.selectionMarker = q = b.renderer.rect(e, l, d ? 1 : f, n ? 1 : k, 0).attr({
                    fill: c.selectionMarkerFill || D("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), q && d && (m -= h, q.attr({
                    width: Math.abs(m),
                    x: (0 < m ? 0 : m) + h
                })), q && n && (m = g - v, q.attr({
                    height: Math.abs(m),
                    y: (0 < m ? 0 : m) + v
                })), p && !q && c.panning && b.pan(a,
                    c.panning)))
            }, drop: function (a) {
                var b = this, c = this.chart, m = this.hasPinched;
                if (this.selectionMarker) {
                    var g = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, d = this.selectionMarker, n = d.attr ? d.attr("x") : d.x, q = d.attr ? d.attr("y") : d.y, l = d.attr ? d.attr("width") : d.width, B = d.attr ? d.attr("height") : d.height, v;
                    if (this.hasDragged || m) t(c.axes, function (c) {
                        if (c.zoomEnabled && k(c.min) && (m || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var d = c.horiz, h = "touchend" === a.type ? c.minPixelPadding : 0, e = c.toValue((d ? n : q) + h), d = c.toValue((d ? n + l : q +
                                    B) - h);
                            g[c.coll].push({axis: c, min: Math.min(e, d), max: Math.max(e, d)});
                            v = !0
                        }
                    }), v && p(c, "selection", g, function (a) {
                        c.zoom(e(a, m ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    m && this.scaleGroups()
                }
                c && (f(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (c) {
                A[a.hoverChartIndex] &&
                A[a.hoverChartIndex].pointer.drop(c)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (c) {
                var b = A[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            }, onContainerMouseMove: function (c) {
                var b = this.chart;
                k(a.hoverChartIndex) && A[a.hoverChartIndex] && A[a.hoverChartIndex].mouseIsDown ||
                (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            }, inClass: function (a, b) {
                for (var c; a;) {
                    if (c = F(a, "class")) {
                        if (-1 !== c.indexOf(b))return !0;
                        if (-1 !== c.indexOf("highcharts-container"))return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a ||
                    b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, m = b.plotLeft, g = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (p(c.series, "click", e(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (e(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - m, a.chartY - g) && p(b, "click", a)))
            }, setDOMEvents: function () {
                var c =
                    this, b = c.chart.container;
                b.onmousedown = function (a) {
                    c.onContainerMouseDown(a)
                };
                b.onmousemove = function (a) {
                    c.onContainerMouseMove(a)
                };
                b.onclick = function (a) {
                    c.onContainerClick(a)
                };
                y(b, "mouseleave", c.onContainerMouseLeave);
                1 === a.chartCount && y(r, "mouseup", c.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function (a) {
                    c.onContainerTouchStart(a)
                }, b.ontouchmove = function (a) {
                    c.onContainerTouchMove(a)
                }, 1 === a.chartCount && y(r, "touchend", c.onDocumentTouchEnd))
            }, destroy: function () {
                var c;
                x(this.chart.container, "mouseleave",
                    this.onContainerMouseLeave);
                a.chartCount || (x(r, "mouseup", this.onDocumentMouseUp), x(r, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (c in this)this[c] = null
            }
        }
    })(I);
    (function (a) {
        var y = a.charts, F = a.each, A = a.extend, D = a.map, f = a.noop, k = a.pick;
        A(a.Pointer.prototype, {
            pinchTranslate: function (a, f, e, k, d, q) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, f, e, k, d, q);
                this.zoomVert && this.pinchTranslateDirection(!1, a, f, e, k, d, q)
            }, pinchTranslateDirection: function (a, f, e, k, d, q, x, v) {
                var n =
                    this.chart, m = a ? "x" : "y", c = a ? "X" : "Y", b = "chart" + c, p = a ? "width" : "height", u = n["plot" + (a ? "Left" : "Top")], g, z, G = v || 1, H = n.inverted, l = n.bounds[a ? "h" : "v"], B = 1 === f.length, K = f[0][b], r = e[0][b], J = !B && f[1][b], h = !B && e[1][b], t;
                e = function () {
                    !B && 20 < Math.abs(K - J) && (G = v || Math.abs(r - h) / Math.abs(K - J));
                    z = (u - r) / G + K;
                    g = n["plot" + (a ? "Width" : "Height")] / G
                };
                e();
                f = z;
                f < l.min ? (f = l.min, t = !0) : f + g > l.max && (f = l.max - g, t = !0);
                t ? (r -= .8 * (r - x[m][0]), B || (h -= .8 * (h - x[m][1])), e()) : x[m] = [r, h];
                H || (q[m] = z - u, q[p] = g);
                q = H ? 1 / G : G;
                d[p] = g;
                d[m] = f;
                k[H ? a ? "scaleY" :
                        "scaleX" : "scale" + c] = G;
                k["translate" + c] = q * u + (r - q * K)
            }, pinch: function (a) {
                var r = this, e = r.chart, p = r.pinchDown, d = a.touches, q = d.length, x = r.lastValidTouch, v = r.hasZoom, n = r.selectionMarker, m = {}, c = 1 === q && (r.inClass(a.target, "highcharts-tracker") && e.runTrackerClick || r.runChartClick), b = {};
                1 < q && (r.initiated = !0);
                v && r.initiated && !c && a.preventDefault();
                D(d, function (a) {
                    return r.normalize(a)
                });
                "touchstart" === a.type ? (F(d, function (a, b) {
                        p[b] = {chartX: a.chartX, chartY: a.chartY}
                    }), x.x = [p[0].chartX, p[1] && p[1].chartX], x.y = [p[0].chartY,
                        p[1] && p[1].chartY], F(e.axes, function (a) {
                        if (a.zoomEnabled) {
                            var b = e.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, m = a.toPixels(k(a.options.min, a.dataMin)), d = a.toPixels(k(a.options.max, a.dataMax)), n = Math.max(m, d);
                            b.min = Math.min(a.pos, Math.min(m, d) - c);
                            b.max = Math.max(a.pos + a.len, n + c)
                        }
                    }), r.res = !0) : r.followTouchMove && 1 === q ? this.runPointActions(r.normalize(a)) : p.length && (n || (r.selectionMarker = n = A({
                            destroy: f,
                            touch: !0
                        }, e.plotBox)), r.pinchTranslate(p, d, m, n, b, x), r.hasPinched = v, r.scaleGroups(m, b), r.res && (r.res = !1, this.reset(!1, 0)))
            }, touch: function (f, t) {
                var e = this.chart, p, d;
                if (e.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = e.index;
                1 === f.touches.length ? (f = this.normalize(f), (d = e.isInsidePlot(f.chartX - e.plotLeft, f.chartY - e.plotTop)) && !e.openMenu ? (t && this.runPointActions(f), "touchmove" === f.type && (t = this.pinchDown, p = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - f.chartX, 2) + Math.pow(t[0].chartY - f.chartY, 2)) : !1), k(p, !0) && this.pinch(f)) : t && this.reset()) : 2 === f.touches.length &&
                    this.pinch(f)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (f) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.charts, A = a.css, D = a.doc, f = a.extend, k = a.noop, r = a.Pointer, t = a.removeEvent, e = a.win, p = a.wrap;
        if (e.PointerEvent || e.MSPointerEvent) {
            var d = {}, q = !!e.PointerEvent, x = function () {
                var a, m = [];
                m.item = function (a) {
                    return this[a]
                };
                for (a in d)d.hasOwnProperty(a) &&
                m.push({pageX: d[a].pageX, pageY: d[a].pageY, target: d[a].target});
                return m
            }, v = function (d, m, c, b) {
                "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (b(d), b = F[a.hoverChartIndex].pointer, b[m]({
                    type: c,
                    target: d.currentTarget,
                    preventDefault: k,
                    touches: x()
                }))
            };
            f(r.prototype, {
                onContainerPointerDown: function (a) {
                    v(a, "onContainerTouchStart", "touchstart", function (a) {
                        d[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    v(a, "onContainerTouchMove",
                        "touchmove", function (a) {
                            d[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                            d[a.pointerId].target || (d[a.pointerId].target = a.currentTarget)
                        })
                }, onDocumentPointerUp: function (a) {
                    v(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete d[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, q ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, q ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(D, q ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            p(r.prototype,
                "init", function (a, m, c) {
                    a.call(this, m, c);
                    this.hasZoom && A(m.container, {"-ms-touch-action": "none", "touch-action": "none"})
                });
            p(r.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            });
            p(r.prototype, "destroy", function (a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(I);
    (function (a) {
        var y, F = a.addEvent, A = a.css, D = a.discardElement, f = a.defined, k = a.each, r = a.extend, t = a.isFirefox, e = a.marginNames, p = a.merge, d = a.pick, q = a.setAnimation, x = a.stableSort, v = a.win, n = a.wrap;
        y = a.Legend = function (a, c) {
            this.init(a, c)
        };
        y.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), F(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            }, setOptions: function (a) {
                var c = d(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = p(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = d(a.symbolWidth,
                    16);
                this.pages = []
            }, update: function (a, c) {
                var b = this.chart;
                this.setOptions(p(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                d(c, !0) && b.redraw()
            }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options, m = a.legendItem, d = a.legendLine, g = a.legendSymbol, n = this.itemHiddenStyle.color, b = c ? b.itemStyle.color : n, e = c ? a.color || n : n, f = a.options && a.options.marker, l = {fill: e}, k;
                m && m.css({fill: b, color: b});
                d && d.attr({stroke: e});
                if (g) {
                    if (f &&
                        g.isMarker && (l = a.pointAttribs(), !c))for (k in l)l[k] = n;
                    g.attr(l)
                }
            }, positionItem: function (a) {
                var c = this.options, b = c.symbolPadding, c = !c.rtl, m = a._legendItemPos, d = m[0], m = m[1], g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? d : this.legendWidth - d - 2 * b - 4, m);
                g && (g.x = d, g.y = m)
            }, destroyItem: function (a) {
                var c = a.checkbox;
                k(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                c && D(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                k(this.getAllItems(), function (c) {
                    k(["legendItem", "legendGroup"], a, c)
                });
                k(["box", "title", "group"], a, this);
                this.display = null
            }, positionCheckboxes: function (a) {
                var c = this.group && this.group.alignAttr, b, m = this.clipHeight || this.legendHeight, d = this.titleHeight;
                c && (b = c.translateY, k(this.allItems, function (g) {
                    var n = g.checkbox, e;
                    n && (e = b + d + n.y + (a || 0) + 3, A(n, {
                        left: c.translateX + g.checkboxOffset + n.x - 20 + "px",
                        top: e + "px",
                        display: e > b - 6 && e < b + m - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.padding, c = this.options.title,
                    b = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(c.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: b}));
                this.titleHeight = b
            }, setText: function (m) {
                var c = this.options;
                m.legendItem.attr({text: c.labelFormat ? a.format(c.labelFormat, m) : c.labelFormatter.call(m)})
            }, renderItem: function (a) {
                var c = this.chart, b = c.renderer, m = this.options, n = "horizontal" ===
                    m.layout, g = this.symbolWidth, e = m.symbolPadding, f = this.itemStyle, k = this.itemHiddenStyle, l = this.padding, B = n ? d(m.itemDistance, 20) : 0, q = !m.rtl, v = m.width, r = m.itemMarginBottom || 0, h = this.itemMarginTop, C = this.initialItemX, t = a.legendItem, x = !a.series, D = !x && a.series.drawLegendSymbol ? a.series : a, y = D.options, y = this.createCheckboxForItem && y && y.showCheckbox, w = m.useHTML;
                t || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + D.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ? " " + a.options.className :
                        "") + (x ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = t = b.text("", q ? g + e : -e, this.baseline || 0, w).css(p(a.visible ? f : k)).attr({
                    align: q ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (f = f.fontSize, this.fontMetrics = b.fontMetrics(f, t), this.baseline = this.fontMetrics.f + 3 + h, t.attr("y", this.baseline)), this.symbolHeight = m.symbolHeight || this.fontMetrics.f, D.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, t, w), y && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = t.getBBox();
                g = a.checkboxOffset = m.itemWidth || a.legendItemWidth || g + e + b.width + B + (y ? 20 : 0);
                this.itemHeight = e = Math.round(a.legendItemHeight || b.height);
                n && this.itemX - C + g > (v || c.chartWidth - 2 * l - C - m.x) && (this.itemX = C, this.itemY += h + this.lastLineHeight + r, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, g);
                this.lastItemY = h + this.itemY + r;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                n ? this.itemX += g :
                    (this.itemY += h + e + r, this.lastLineHeight = e);
                this.offsetWidth = v || Math.max((n ? this.itemX - C - B : g) + l, this.offsetWidth)
            }, getAllItems: function () {
                var a = [];
                k(this.chart.series, function (c) {
                    var b = c && c.options;
                    c && d(b.showInLegend, f(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            }, adjustMargins: function (a, c) {
                var b = this.chart, m = this.options, n = m.align.charAt(0) + m.verticalAlign.charAt(0) + m.layout.charAt(0);
                m.floating || k([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/,
                    /(lbv|lm|ltv)/], function (g, k) {
                    g.test(n) && !f(a[k]) && (b[e[k]] = Math.max(b[e[k]], b.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * m[k % 2 ? "x" : "y"] + d(m.margin, 12) + c[k]))
                })
            }, render: function () {
                var a = this, c = a.chart, b = c.renderer, d = a.group, n, g, e, f, p = a.box, l = a.options, B = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                d || (a.group = d = b.g("legend").attr({zIndex: 7}).add(), a.contentGroup = b.g().attr({zIndex: 1}).add(d), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                n = a.getAllItems();
                x(n, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                l.reversed && n.reverse();
                a.allItems = n;
                a.display = g = !!n.length;
                a.lastLineHeight = 0;
                k(n, function (b) {
                    a.renderItem(b)
                });
                e = (l.width || a.offsetWidth) + B;
                f = a.lastItemY + a.lastLineHeight + a.titleHeight;
                f = a.handleOverflow(f);
                f += B;
                p || (a.box = p = b.rect().addClass("highcharts-legend-box").attr({r: l.borderRadius}).add(d), p.isNew = !0);
                p.attr({
                    stroke: l.borderColor, "stroke-width": l.borderWidth || 0, fill: l.backgroundColor ||
                    "none"
                }).shadow(l.shadow);
                0 < e && 0 < f && (p[p.isNew ? "attr" : "animate"](p.crisp({
                    x: 0,
                    y: 0,
                    width: e,
                    height: f
                }, p.strokeWidth())), p.isNew = !1);
                p[g ? "show" : "hide"]();
                a.legendWidth = e;
                a.legendHeight = f;
                k(n, function (b) {
                    a.positionItem(b)
                });
                g && d.align(r({width: e, height: f}, l), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var c = this, b = this.chart, m = b.renderer, n = this.options, g = n.y, b = b.spacingBox.height + ("top" === n.verticalAlign ? -g : g) - this.padding, g = n.maxHeight, e, f = this.clipRect, p = n.navigation,
                    l = d(p.animation, !0), B = p.arrowSize || 12, q = this.nav, v = this.pages, r = this.padding, h, t = this.allItems, x = function (a) {
                        a ? f.attr({height: a}) : f && (c.clipRect = f.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + r + "px,9999px," + (r + a) + "px,0)" : "auto")
                    };
                "horizontal" !== n.layout || "middle" === n.verticalAlign || n.floating || (b /= 2);
                g && (b = Math.min(b, g));
                v.length = 0;
                a > b && !1 !== p.enabled ? (this.clipHeight = e = Math.max(b - 20 - this.titleHeight - r, 0), this.currentPage = d(this.currentPage, 1), this.fullHeight =
                        a, k(t, function (a, b) {
                        var c = a._legendItemPos[1];
                        a = Math.round(a.legendItem.getBBox().height);
                        var l = v.length;
                        if (!l || c - v[l - 1] > e && (h || c) !== v[l - 1]) v.push(h || c), l++;
                        b === t.length - 1 && c + a - v[l - 1] > e && v.push(c);
                        c !== h && (h = c)
                    }), f || (f = c.clipRect = m.clipRect(0, r, 9999, 0), c.contentGroup.clip(f)), x(e), q || (this.nav = q = m.g().attr({zIndex: 1}).add(this.group), this.up = m.symbol("triangle", 0, 0, B, B).on("click", function () {
                        c.scroll(-1, l)
                    }).add(q), this.pager = m.text("", 15, 10).addClass("highcharts-legend-navigation").css(p.style).add(q),
                        this.down = m.symbol("triangle-down", 0, 0, B, B).on("click", function () {
                            c.scroll(1, l)
                        }).add(q)), c.scroll(0), a = b) : q && (x(), q.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, c) {
                var b = this.pages, d = b.length;
                a = this.currentPage + a;
                var m = this.clipHeight, g = this.options.navigation, n = this.pager, e = this.padding;
                a > d && (a = d);
                0 < a && (void 0 !== c && q(c, this.chart), this.nav.attr({
                    translateX: e,
                    translateY: m + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 ===
                    a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), n.attr({text: a + "/" + d}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({fill: 1 === a ? g.inactiveColor : g.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a === d ? g.inactiveColor : g.activeColor}).css({cursor: a === d ? "default" : "pointer"}), c = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage =
                    a, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, c) {
                var b = a.symbolHeight, m = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(m ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, m ? b : a.symbolWidth, b, d(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(c.legendGroup)
            }, drawLineMarker: function (a) {
                var c = this.options, b = c.marker, m = a.symbolWidth, n = a.symbolHeight, g = n / 2, e = this.chart.renderer, f = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k;
                k = {"stroke-width": c.lineWidth || 0};
                c.dashStyle && (k.dashstyle = c.dashStyle);
                this.legendLine = e.path(["M", 0, a, "L", m, a]).addClass("highcharts-graph").attr(k).add(f);
                b && !1 !== b.enabled && (c = Math.min(d(b.radius, g), g), 0 === this.symbol.indexOf("url") && (b = p(b, {
                    width: n,
                    height: n
                }), c = 0), this.legendSymbol = b = e.symbol(this.symbol, m / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(f), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(v.navigator.userAgent) || t) && n(y.prototype, "positionItem", function (a, c) {
            var b = this, d = function () {
                c._legendItemPos &&
                a.call(b, c)
            };
            d();
            setTimeout(d)
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animate, A = a.animObject, D = a.attr, f = a.doc, k = a.Axis, r = a.createElement, t = a.defaultOptions, e = a.discardElement, p = a.charts, d = a.css, q = a.defined, x = a.each, v = a.extend, n = a.find, m = a.fireEvent, c = a.getStyle, b = a.grep, E = a.isNumber, u = a.isObject, g = a.isString, z = a.Legend, G = a.marginNames, H = a.merge, l = a.Pointer, B = a.pick, K = a.pInt, L = a.removeEvent, J = a.seriesTypes, h = a.splat, C = a.svg, M = a.syncTimeout, N = a.win, R = a.Renderer, S = a.Chart = function () {
            this.getArgs.apply(this,
                arguments)
        };
        a.chart = function (a, b, c) {
            return new S(a, b, c)
        };
        S.prototype = {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (g(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var l, h = b.series;
                b.series = null;
                l = H(t, b);
                l.series = b.series = h;
                this.userOptions = b;
                this.respRules = [];
                b = l.chart;
                h = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.callback = c;
                this.isResizing = 0;
                this.options = l;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var g;
                this.index = p.length;
                p.push(this);
                a.chartCount++;
                if (h)for (g in h)y(this, g, h[g]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            }, initSeries: function (b) {
                var c = this.options.chart;
                (c = J[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++)b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            }, isInsidePlot: function (a, b, c) {
                var l = c ?
                    b : a;
                a = c ? a : b;
                return 0 <= l && l <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var c = this.axes, l = this.series, h = this.pointer, g = this.legend, d = this.isDirtyLegend, n, e, f = this.hasCartesianSeries, k = this.isDirtyBox, p = l.length, B = p, q = this.renderer, w = q.isHidden(), u = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                w && this.cloneRenderTo();
                for (this.layOutTitles(); B--;)if (b = l[B], b.options.stacking && (n = !0, b.isDirty)) {
                    e = !0;
                    break
                }
                if (e)for (B = p; B--;)b = l[B], b.options.stacking && (b.isDirty = !0);
                x(l, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), d = !0);
                    a.isDirtyData && m(a, "updatedData")
                });
                d && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
                n && this.getStacks();
                f && x(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                f && (x(c, function (a) {
                    a.isDirty && (k = !0)
                }), x(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, u.push(function () {
                        m(a, "afterSetExtremes", v(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (k || n) && a.redraw()
                }));
                k && this.drawChartBox();
                m(this, "predraw");
                x(l, function (a) {
                    (k || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                h && h.reset(!0);
                q.draw();
                m(this, "redraw");
                m(this, "render");
                w && this.cloneRenderTo(!0);
                x(u, function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }

                var c, l = this.series, h;
                c = n(this.axes, b) || n(this.series, b);
                for (h = 0; !c && h < l.length; h++)c = n(l[h].points || [], b);
                return c
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = h(b.xAxis || {}), b = b.yAxis = h(b.yAxis ||
                    {});
                x(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                x(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                x(c, function (b) {
                    new k(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                x(this.series, function (c) {
                    a = a.concat(b(c.points || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return b(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var l = this, h = l.options, g;
                g = h.title = H({style: {color: "#333333", fontSize: h.isStock ? "16px" : "18px"}}, h.title, a);
                h = h.subtitle = H({style: {color: "#666666"}},
                    h.subtitle, b);
                x([["title", a, g], ["subtitle", b, h]], function (a, b) {
                    var c = a[0], h = l[c], g = a[1];
                    a = a[2];
                    h && g && (l[c] = h = h.destroy());
                    a && a.text && !h && (l[c] = l.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), l[c].update = function (a) {
                        l.setTitle(!b && a, b && a)
                    }, l[c].css(a.style))
                });
                l.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, c, l = this.renderer, h = this.spacingBox;
                x(["title", "subtitle"], function (a) {
                    var c = this[a], g = this.options[a], d;
                    c && (d = g.style.fontSize,
                        d = l.fontMetrics(d, c).b, c.css({width: (g.width || h.width + g.widthAdjust) + "px"}).align(v({y: b + d + ("title" === a ? -3 : 2)}, g), !1, "spacingBox"), g.floating || g.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && B(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var a = this.options.chart, b = a.width, a = a.height, l = this.renderToClone || this.renderTo;
                q(b) || (this.containerWidth = c(l, "width"));
                q(a) || (this.containerHeight =
                    c(l, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a || this.containerHeight || 400)
            }, cloneRenderTo: function (a) {
                var b = this.renderToClone, c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
                        e(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), d(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty &&
                b.style.setProperty("display", "block", "important"), f.body.appendChild(b), c && b.appendChild(c)
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, c = this.options, l = c.chart, h, d;
                b = this.renderTo;
                var m = a.uniqueKey(), n;
                b || (this.renderTo = b = l.renderTo);
                g(b) && (this.renderTo = b = f.getElementById(b));
                b || a.error(13, !0);
                h = K(D(b, "data-highcharts-chart"));
                E(h) && p[h] && p[h].hasRendered && p[h].destroy();
                D(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                l.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                h = this.chartWidth;
                d = this.chartHeight;
                n = v({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: d + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, l.style);
                this.container = b = r("div", {id: m}, n, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[l.renderer] || R)(b, h, d, null, l.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(l.className);
                this.renderer.setStyle(l.style);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, c = this.margin, l = this.titleOffset;
                this.resetMargins();
                l && !q(c[0]) && (this.plotTop = Math.max(this.plotTop, l + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset =
                    [0, 0, 0, 0], c = a.margin;
                a.hasCartesianSeries && x(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                x(G, function (l, h) {
                    q(c[h]) || (a[l] += b[h])
                });
                a.setChartSize()
            }, reflow: function (a) {
                var b = this, l = b.options.chart, h = b.renderTo, g = q(l.width), d = l.width || c(h, "width"), l = l.height || c(h, "height"), h = a ? a.target : N;
                if (!g && !b.isPrinting && d && l && (h === N || h === f)) {
                    if (d !== b.containerWidth || l !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = M(function () {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth =
                        d;
                    b.containerHeight = l
                }
            }, initReflow: function () {
                var a = this, b;
                b = y(N, "resize", function (b) {
                    a.reflow(b)
                });
                y(a, "destroy", b)
            }, setSize: function (b, c, l) {
                var h = this, g = h.renderer;
                h.isResizing += 1;
                a.setAnimation(l, h);
                h.oldChartHeight = h.chartHeight;
                h.oldChartWidth = h.chartWidth;
                void 0 !== b && (h.options.chart.width = b);
                void 0 !== c && (h.options.chart.height = c);
                h.getChartSize();
                b = g.globalAnimation;
                (b ? F : d)(h.container, {width: h.chartWidth + "px", height: h.chartHeight + "px"}, b);
                h.setChartSize(!0);
                g.setSize(h.chartWidth, h.chartHeight,
                    l);
                x(h.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                h.isDirtyLegend = !0;
                h.isDirtyBox = !0;
                h.layOutTitles();
                h.getMargins();
                h.redraw(l);
                h.oldChartHeight = null;
                m(h, "resize");
                M(function () {
                    h && m(h, "endResize", null, function () {
                        --h.isResizing
                    })
                }, A(b).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, l = this.chartWidth, h = this.chartHeight, g = this.options.chart, d = this.spacing, m = this.clipOffset, n, e, f, k;
                this.plotLeft = n = Math.round(this.plotLeft);
                this.plotTop = e = Math.round(this.plotTop);
                this.plotWidth =
                    f = Math.max(0, Math.round(l - n - this.marginRight));
                this.plotHeight = k = Math.max(0, Math.round(h - e - this.marginBottom));
                this.plotSizeX = b ? k : f;
                this.plotSizeY = b ? f : k;
                this.plotBorderWidth = g.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: d[3], y: d[0], width: l - d[3] - d[1], height: h - d[0] - d[2]};
                this.plotBox = c.plotBox = {x: n, y: e, width: f, height: k};
                l = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(l, m[3]) / 2);
                c = Math.ceil(Math.max(l, m[0]) / 2);
                this.clipBox = {
                    x: b, y: c, width: Math.floor(this.plotSizeX - Math.max(l, m[1]) /
                        2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(l, m[2]) / 2 - c))
                };
                a || x(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                x(["margin", "spacing"], function (c) {
                    var l = b[c], h = u(l) ? l : [l, l, l, l];
                    x(["Top", "Right", "Bottom", "Left"], function (l, g) {
                        a[c][g] = B(b[c + l], h[g])
                    })
                });
                x(G, function (b, c) {
                    a[b] = B(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, c =
                    this.chartWidth, l = this.chartHeight, h = this.chartBackground, g = this.plotBackground, d = this.plotBorder, m, n = this.plotBGImage, e = a.backgroundColor, f = a.plotBackgroundColor, k = a.plotBackgroundImage, p, B = this.plotLeft, q = this.plotTop, u = this.plotWidth, v = this.plotHeight, z = this.plotBox, r = this.clipRect, K = this.clipBox, J = "animate";
                h || (this.chartBackground = h = b.rect().addClass("highcharts-background").add(), J = "attr");
                m = a.borderWidth || 0;
                p = m + (a.shadow ? 8 : 0);
                e = {fill: e || "none"};
                if (m || h["stroke-width"]) e.stroke = a.borderColor,
                    e["stroke-width"] = m;
                h.attr(e).shadow(a.shadow);
                h[J]({x: p / 2, y: p / 2, width: c - p - m % 2, height: l - p - m % 2, r: a.borderRadius});
                J = "animate";
                g || (J = "attr", this.plotBackground = g = b.rect().addClass("highcharts-plot-background").add());
                g[J](z);
                g.attr({fill: f || "none"}).shadow(a.plotShadow);
                k && (n ? n.animate(z) : this.plotBGImage = b.image(k, B, q, u, v).add());
                r ? r.animate({width: K.width, height: K.height}) : this.clipRect = b.clipRect(K);
                J = "animate";
                d || (J = "attr", this.plotBorder = d = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                d.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                d[J](d.crisp({x: B, y: q, width: u, height: v}, -d.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, l = a.options.series, h, g;
                x(["inverted", "angular", "polar"], function (d) {
                    c = J[b.type || b.defaultSeriesType];
                    g = b[d] || c && c.prototype[d];
                    for (h = l && l.length; !g && h--;)(c = J[l[h].type]) && c.prototype[d] && (g = !0);
                    a[d] = g
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                x(b, function (a) {
                    a.linkedSeries.length =
                        0
                });
                x(b, function (b) {
                    var c = b.options.linkedTo;
                    g(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = B(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                x(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && x(b.items, function (c) {
                    var l = v(b.style, c.style), h = K(l.left) + a.plotLeft, g = K(l.top) + a.plotTop + 12;
                    delete l.left;
                    delete l.top;
                    a.renderer.text(c.html,
                        h, g).attr({zIndex: 2}).css(l).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, l, h, g;
                this.setTitle();
                this.legend = new z(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                l = this.plotHeight -= 21;
                x(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                h = 1.1 < c / this.plotWidth;
                g = 1.05 < l / this.plotHeight;
                if (h || g) x(a, function (a) {
                    (a.horiz && h || !a.horiz && g) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries &&
                x(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = H(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this, c = b.axes, l = b.series, h = b.container, g, d = h && h.parentNode;
                m(b, "destroy");
                p[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                L(b);
                for (g = c.length; g--;)c[g] = c[g].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (g = l.length; g--;)l[g] = l[g].destroy();
                x("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function (a) {
                        var c = b[a];
                        c && c.destroy && (b[a] = c.destroy())
                    });
                h && (h.innerHTML = "", L(h), d && e(h));
                for (g in b)delete b[g]
            }, isReadyToRender: function () {
                var a = this;
                return C || N != N.top || "complete" === f.readyState ? !0 : (f.attachEvent("onreadystatechange", function () {
                        f.detachEvent("onreadystatechange", a.firstRender);
                        "complete" === f.readyState && a.firstRender()
                    }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    m(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    x(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    m(a, "beforeRender");
                    l && (a.pointer = new l(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            }, onload: function () {
                x([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                m(this, "load");
                m(this, "render");
                q(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(I);
    (function (a) {
        var y, F = a.each, A = a.extend, D = a.erase, f = a.fireEvent,
            k = a.format, r = a.isArray, t = a.isNumber, e = a.pick, p = a.removeEvent;
        y = a.Point = function () {
        };
        y.prototype = {
            init: function (a, f, k) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(f, k);
                a.options.colorByPoint ? (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length, k = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : k = a.colorIndex;
                this.colorIndex = e(this.colorIndex, k);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, f) {
                var d = this.series, k = d.options.pointValKey ||
                    d.pointValKey;
                a = y.prototype.optionsToObject.call(this, a);
                A(this, a);
                this.options = this.options ? A(this.options, a) : a;
                a.group && delete this.group;
                k && (this.y = this[k]);
                this.isNull = e(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === f && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === f ? d.autoIncrement(this) : f);
                return this
            }, optionsToObject: function (a) {
                var d = {}, e = this.series, f = e.options.keys,
                    n = f || e.pointArrayMap || ["y"], m = n.length, c = 0, b = 0;
                if (t(a) || null === a) d[n[0]] = a; else if (r(a))for (!f && a.length > m && (e = typeof a[0], "string" === e ? d.name = a[0] : "number" === e && (d.x = a[0]), c++); b < m;)f && void 0 === a[c] || (d[n[b]] = a[c]), c++, b++; else"object" === typeof a && (d = a, a.dataLabels && (e._hasPointLabels = !0), a.marker && (e._hasPointMarkers = !0));
                return d
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" :
                        "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }, getZone: function () {
                var a = this.series, e = a.zones, a = a.zoneAxis || "y", f = 0, k;
                for (k = e[f]; this[a] >= k.value;)k = e[++f];
                k && k.color && !this.options.color && (this.color = k.color);
                return k
            }, destroy: function () {
                var a = this.series.chart, e = a.hoverPoints, f;
                a.pointCount--;
                e && (this.setState(), D(e, this), e.length ||
                (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) p(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (f in this)this[f] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, f = 6; f--;)e = a[f], this[e] && (this[e] = this[e].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var d = this.series, f = d.tooltipOptions, p = e(f.valueDecimals, ""), n = f.valuePrefix || "", m = f.valueSuffix || "";
                F(d.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (n || m) a = a.replace(c + "}", n + c + "}" + m);
                    a = a.replace(c + "}", c + ":,." + p + "f}")
                });
                return k(a, {point: this, series: this.series})
            }, firePointEvent: function (a, e, k) {
                var d = this, n = this.series.options;
                (n.point.events[a] || d.options && d.options.events && d.options.events[a]) &&
                this.importEvents();
                "click" === a && n.allowPointSelect && (k = function (a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                f(this, a, e, k)
            }, visible: !0
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animObject, A = a.arrayMax, D = a.arrayMin, f = a.correctFloat, k = a.Date, r = a.defaultOptions, t = a.defaultPlotOptions, e = a.defined, p = a.each, d = a.erase, q = a.extend, x = a.fireEvent, v = a.grep, n = a.isArray, m = a.isNumber, c = a.isString, b = a.merge, E = a.pick, u = a.removeEvent, g = a.splat, z = a.SVGElement, G = a.syncTimeout, H = a.win;
        a.Series = a.seriesType("line",
            null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                marker: {
                    lineWidth: 0,
                    lineColor: "#ffffff",
                    radius: 4,
                    states: {
                        hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                        select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y ? "" : a.numberFormat(this.y, -1)
                    },
                    style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}}, select: {marker: {}}},
                stickyTracking: !0,
                turboThreshold: 1E3
            }, {
                isCartesian: !0,
                pointClass: a.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                init: function (a, b) {
                    var c = this, l, g, h = a.series, d;
                    c.chart = a;
                    c.options = b = c.setOptions(b);
                    c.linkedSeries = [];
                    c.bindAxes();
                    q(c, {
                        name: b.name, state: "", visible: !1 !==
                        b.visible, selected: !0 === b.selected
                    });
                    g = b.events;
                    for (l in g)y(c, l, g[l]);
                    if (g && g.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                    c.getColor();
                    c.getSymbol();
                    p(c.parallelArrays, function (a) {
                        c[a + "Data"] = []
                    });
                    c.setData(b.data, !1);
                    c.isCartesian && (a.hasCartesianSeries = !0);
                    h.length && (d = h[h.length - 1]);
                    c._i = E(d && d._i, -1) + 1;
                    a.orderSeries(this.insert(h))
                },
                insert: function (a) {
                    var b = this.options.index, c;
                    if (m(b)) {
                        for (c = a.length; c--;)if (b >= E(a[c].options.index, a[c]._i)) {
                            a.splice(c +
                                1, 0, this);
                            break
                        }
                        -1 === c && a.unshift(this);
                        c += 1
                    } else a.push(this);
                    return E(c, a.length - 1)
                },
                bindAxes: function () {
                    var b = this, c = b.options, g = b.chart, d;
                    p(b.axisTypes || [], function (l) {
                        p(g[l], function (a) {
                            d = a.options;
                            if (c[l] === d.index || void 0 !== c[l] && c[l] === d.id || void 0 === c[l] && 0 === d.index) b.insert(a.series), b[l] = a, a.isDirty = !0
                        });
                        b[l] || b.optionalAxis === l || a.error(18, !0)
                    })
                },
                updateParallelArrays: function (a, b) {
                    var c = a.series, l = arguments, g = m(b) ? function (l) {
                            var h = "y" === l && c.toYData ? c.toYData(a) : a[l];
                            c[l + "Data"][b] =
                                h
                        } : function (a) {
                            Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(l, 2))
                        };
                    p(c.parallelArrays, g)
                },
                autoIncrement: function () {
                    var a = this.options, b = this.xIncrement, c, g = a.pointIntervalUnit, b = E(b, a.pointStart, 0);
                    this.pointInterval = c = E(this.pointInterval, a.pointInterval, 1);
                    g && (a = new k(b), "day" === g ? a = +a[k.hcSetDate](a[k.hcGetDate]() + c) : "month" === g ? a = +a[k.hcSetMonth](a[k.hcGetMonth]() + c) : "year" === g && (a = +a[k.hcSetFullYear](a[k.hcGetFullYear]() + c)), c = a - b);
                    this.xIncrement = b + c;
                    return b
                },
                setOptions: function (a) {
                    var c =
                        this.chart, l = c.options.plotOptions, c = c.userOptions || {}, g = c.plotOptions || {}, d = l[this.type];
                    this.userOptions = a;
                    l = b(d, l.series, a);
                    this.tooltipOptions = b(r.tooltip, r.plotOptions[this.type].tooltip, c.tooltip, g.series && g.series.tooltip, g[this.type] && g[this.type].tooltip, a.tooltip);
                    null === d.marker && delete l.marker;
                    this.zoneAxis = l.zoneAxis;
                    a = this.zones = (l.zones || []).slice();
                    !l.negativeColor && !l.negativeFillColor || l.zones || a.push({
                        value: l[this.zoneAxis + "Threshold"] || l.threshold || 0, className: "highcharts-negative",
                        color: l.negativeColor, fillColor: l.negativeFillColor
                    });
                    a.length && e(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                    return l
                },
                getCyclic: function (a, b, c) {
                    var l, g = this.chart, h = this.userOptions, d = a + "Index", m = a + "Counter", n = c ? c.length : E(g.options.chart[a + "Count"], g[a + "Count"]);
                    b || (l = E(h[d], h["_" + d]), e(l) || (g.series.length || (g[m] = 0), h["_" + d] = l = g[m] % n, g[m] += 1), c && (b = c[l]));
                    void 0 !== l && (this[d] = l);
                    this[a] = b
                },
                getColor: function () {
                    this.options.colorByPoint ? this.options.color = null : this.getCyclic("color",
                            this.options.color || t[this.type].color, this.chart.options.colors)
                },
                getSymbol: function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
                setData: function (b, g, d, e) {
                    var l = this, h = l.points, f = h && h.length || 0, k, u = l.options, B = l.chart, q = null, z = l.xAxis, v = u.turboThreshold, r = this.xData, H = this.yData, t = (k = l.pointArrayMap) && k.length;
                    b = b || [];
                    k = b.length;
                    g = E(g, !0);
                    if (!1 !== e && k && f === k && !l.cropped && !l.hasGroupedData && l.visible) p(b, function (a,
                                                                                                                 b) {
                        h[b].update && a !== u.data[b] && h[b].update(a, !1, null, !1)
                    }); else {
                        l.xIncrement = null;
                        l.colorCounter = 0;
                        p(this.parallelArrays, function (a) {
                            l[a + "Data"].length = 0
                        });
                        if (v && k > v) {
                            for (d = 0; null === q && d < k;)q = b[d], d++;
                            if (m(q))for (d = 0; d < k; d++)r[d] = this.autoIncrement(), H[d] = b[d]; else if (n(q))if (t)for (d = 0; d < k; d++)q = b[d], r[d] = q[0], H[d] = q.slice(1, t + 1); else for (d = 0; d < k; d++)q = b[d], r[d] = q[0], H[d] = q[1]; else a.error(12)
                        } else for (d = 0; d < k; d++)void 0 !== b[d] && (q = {series: l}, l.pointClass.prototype.applyOptions.apply(q, [b[d]]), l.updateParallelArrays(q,
                            d));
                        c(H[0]) && a.error(14, !0);
                        l.data = [];
                        l.options.data = l.userOptions.data = b;
                        for (d = f; d--;)h[d] && h[d].destroy && h[d].destroy();
                        z && (z.minRange = z.userMinRange);
                        l.isDirty = B.isDirtyBox = !0;
                        l.isDirtyData = !!h;
                        d = !1
                    }
                    "point" === u.legendType && (this.processData(), this.generatePoints());
                    g && B.redraw(d)
                },
                processData: function (b) {
                    var c = this.xData, l = this.yData, g = c.length, d;
                    d = 0;
                    var h, m, e = this.xAxis, n, f = this.options;
                    n = f.cropThreshold;
                    var k = this.getExtremesFromAll || f.getExtremesFromAll, p = this.isCartesian, f = e && e.val2lin, u = e &&
                        e.isLog, q, z;
                    if (p && !this.isDirty && !e.isDirty && !this.yAxis.isDirty && !b)return !1;
                    e && (b = e.getExtremes(), q = b.min, z = b.max);
                    if (p && this.sorted && !k && (!n || g > n || this.forceCrop))if (c[g - 1] < q || c[0] > z) c = [], l = []; else if (c[0] < q || c[g - 1] > z) d = this.cropData(this.xData, this.yData, q, z), c = d.xData, l = d.yData, d = d.start, h = !0;
                    for (n = c.length || 1; --n;)g = u ? f(c[n]) - f(c[n - 1]) : c[n] - c[n - 1], 0 < g && (void 0 === m || g < m) ? m = g : 0 > g && this.requireSorting && a.error(15);
                    this.cropped = h;
                    this.cropStart = d;
                    this.processedXData = c;
                    this.processedYData = l;
                    this.closestPointRange =
                        m
                },
                cropData: function (a, b, c, g) {
                    var l = a.length, h = 0, d = l, m = E(this.cropShoulder, 1), n;
                    for (n = 0; n < l; n++)if (a[n] >= c) {
                        h = Math.max(0, n - m);
                        break
                    }
                    for (c = n; c < l; c++)if (a[c] > g) {
                        d = c + m;
                        break
                    }
                    return {xData: a.slice(h, d), yData: b.slice(h, d), start: h, end: d}
                },
                generatePoints: function () {
                    var a = this.options.data, b = this.data, c, d = this.processedXData, m = this.processedYData, h = this.pointClass, n = d.length, e = this.cropStart || 0, f, k = this.hasGroupedData, p, u = [], q;
                    b || k || (b = [], b.length = a.length, b = this.data = b);
                    for (q = 0; q < n; q++)f = e + q, k ? (p = (new h).init(this,
                            [d[q]].concat(g(m[q]))), p.dataGroup = this.groupMap[q]) : (p = b[f]) || void 0 === a[f] || (b[f] = p = (new h).init(this, a[f], d[q])), p.index = f, u[q] = p;
                    if (b && (n !== (c = b.length) || k))for (q = 0; q < c; q++)q !== e || k || (q += n), b[q] && (b[q].destroyElements(), b[q].plotX = void 0);
                    this.data = b;
                    this.points = u
                },
                getExtremes: function (a) {
                    var b = this.yAxis, c = this.processedXData, l, g = [], h = 0;
                    l = this.xAxis.getExtremes();
                    var d = l.min, e = l.max, f, k, p, u;
                    a = a || this.stackedYData || this.processedYData || [];
                    l = a.length;
                    for (u = 0; u < l; u++)if (k = c[u], p = a[u], f = (m(p, !0) ||
                            n(p)) && (!b.isLog || p.length || 0 < p), k = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[u + 1] || k) >= d && (c[u - 1] || k) <= e, f && k)if (f = p.length)for (; f--;)null !== p[f] && (g[h++] = p[f]); else g[h++] = p;
                    this.dataMin = D(g);
                    this.dataMax = A(g)
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options, b = a.stacking, c = this.xAxis, g = c.categories, d = this.yAxis, h = this.points, n = h.length, k = !!this.modifyValue, p = a.pointPlacement, u = "between" === p || m(p), q = a.threshold,
                        z = a.startFromThreshold ? q : 0, v, r, H, t, G = Number.MAX_VALUE;
                    "between" === p && (p = .5);
                    m(p) && (p *= E(a.pointRange || c.pointRange));
                    for (a = 0; a < n; a++) {
                        var x = h[a], D = x.x, y = x.y;
                        r = x.low;
                        var A = b && d.stacks[(this.negStacks && y < (z ? 0 : q) ? "-" : "") + this.stackKey], F;
                        d.isLog && null !== y && 0 >= y && (x.isNull = !0);
                        x.plotX = v = f(Math.min(Math.max(-1E5, c.translate(D, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                        b && this.visible && !x.isNull && A && A[D] && (t = this.getStackIndicator(t, D, this.index), F = A[D], y = F.points[t.key], r = y[0], y = y[1], r === z && t.key === A[D].base &&
                        (r = E(q, d.min)), d.isLog && 0 >= r && (r = null), x.total = x.stackTotal = F.total, x.percentage = F.total && x.y / F.total * 100, x.stackY = y, F.setOffset(this.pointXOffset || 0, this.barW || 0));
                        x.yBottom = e(r) ? d.translate(r, 0, 1, 0, 1) : null;
                        k && (y = this.modifyValue(y, x));
                        x.plotY = r = "number" === typeof y && Infinity !== y ? Math.min(Math.max(-1E5, d.translate(y, 0, 1, 0, 1)), 1E5) : void 0;
                        x.isInside = void 0 !== r && 0 <= r && r <= d.len && 0 <= v && v <= c.len;
                        x.clientX = u ? f(c.translate(D, 0, 0, 0, 1, p)) : v;
                        x.negative = x.y < (q || 0);
                        x.category = g && void 0 !== g[x.x] ? g[x.x] : x.x;
                        x.isNull ||
                        (void 0 !== H && (G = Math.min(G, Math.abs(v - H))), H = v);
                        x.zone = this.zones.length && x.getZone()
                    }
                    this.closestPointRangePx = G
                },
                getValidPoints: function (a, b) {
                    var c = this.chart;
                    return v(a || this.points || [], function (a) {
                        return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                    })
                },
                setClip: function (a) {
                    var b = this.chart, c = this.options, l = b.renderer, g = b.inverted, h = this.clipBox, d = h || b.clipBox, n = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, d.height, c.xAxis, c.yAxis].join(), m = b[n], e = b[n + "m"];
                    m || (a && (d.width =
                        0, b[n + "m"] = e = l.clipRect(-99, g ? -b.plotLeft : -b.plotTop, 99, g ? b.chartWidth : b.chartHeight)), b[n] = m = l.clipRect(d), m.count = {length: 0});
                    a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                    !1 !== c.clip && (this.group.clip(a || h ? m : b.clipRect), this.markerGroup.clip(e), this.sharedClipKey = n);
                    a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && n && b[n] && (h || (b[n] = b[n].destroy()), b[n + "m"] && (this.markerGroup.clip(), b[n + "m"] = b[n + "m"].destroy())))
                },
                animate: function (a) {
                    var b =
                        this.chart, c = F(this.options.animation), l;
                    a ? this.setClip(c) : (l = this.sharedClipKey, (a = b[l]) && a.animate({width: b.plotSizeX}, c), b[l + "m"] && b[l + "m"].animate({width: b.plotSizeX + 99}, c), this.animate = null)
                },
                afterAnimate: function () {
                    this.setClip();
                    x(this, "afterAnimate")
                },
                drawPoints: function () {
                    var a = this.points, b = this.chart, c, g, d, h, n = this.options.marker, e, f, k, p, u = this.markerGroup, q = E(n.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * n.radius);
                    if (!1 !== n.enabled || this._hasPointMarkers)for (g = 0; g < a.length; g++)d =
                        a[g], c = d.plotY, h = d.graphic, e = d.marker || {}, f = !!d.marker, k = q && void 0 === e.enabled || e.enabled, p = d.isInside, k && m(c) && null !== d.y ? (c = E(e.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), k = this.markerAttribs(d, d.selected && "select"), h ? h[p ? "show" : "hide"](!0).animate(k) : p && (0 < k.width || d.hasImage) && (d.graphic = h = b.renderer.symbol(c, k.x, k.y, k.width, k.height, f ? e : n).add(u)), h && h.attr(this.pointAttribs(d, d.selected && "select")), h && h.addClass(d.getClassName(), !0)) : h && (d.graphic = h.destroy())
                },
                markerAttribs: function (a,
                                         b) {
                    var c = this.options.marker, l = a.marker || {}, g = E(l.radius, c.radius);
                    b && (c = c.states[b], b = l.states && l.states[b], g = E(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0)));
                    a.hasImage && (g = 0);
                    a = {x: Math.floor(a.plotX) - g, y: a.plotY - g};
                    g && (a.width = a.height = 2 * g);
                    return a
                },
                pointAttribs: function (a, b) {
                    var c = this.options.marker, l = a && a.options, g = l && l.marker || {}, h = this.color, d = l && l.color, n = a && a.color, l = E(g.lineWidth, c.lineWidth);
                    a = a && a.zone && a.zone.color;
                    h = d || a || n || h;
                    a = g.fillColor || c.fillColor || h;
                    h = g.lineColor || c.lineColor ||
                        h;
                    b && (c = c.states[b], b = g.states && g.states[b] || {}, l = E(b.lineWidth, c.lineWidth, l + E(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, h = b.lineColor || c.lineColor || h);
                    return {stroke: h, "stroke-width": l, fill: a}
                },
                destroy: function () {
                    var a = this, b = a.chart, c = /AppleWebKit\/533/.test(H.navigator.userAgent), g, n = a.data || [], h, m, e;
                    x(a, "destroy");
                    u(a);
                    p(a.axisTypes || [], function (b) {
                        (e = a[b]) && e.series && (d(e.series, a), e.isDirty = e.forceRedraw = !0)
                    });
                    a.legendItem && a.chart.legend.destroyItem(a);
                    for (g = n.length; g--;)(h =
                        n[g]) && h.destroy && h.destroy();
                    a.points = null;
                    clearTimeout(a.animationTimeout);
                    for (m in a)a[m] instanceof z && !a[m].survive && (g = c && "group" === m ? "hide" : "destroy", a[m][g]());
                    b.hoverSeries === a && (b.hoverSeries = null);
                    d(b.series, a);
                    b.orderSeries();
                    for (m in a)delete a[m]
                },
                getGraphPath: function (a, b, c) {
                    var g = this, l = g.options, h = l.step, d, n = [], m = [], f;
                    a = a || g.points;
                    (d = a.reversed) && a.reverse();
                    (h = {right: 1, center: 2}[h] || h && 3) && d && (h = 4 - h);
                    !l.connectNulls || b || c || (a = this.getValidPoints(a));
                    p(a, function (d, k) {
                        var p = d.plotX,
                            u = d.plotY, q = a[k - 1];
                        (d.leftCliff || q && q.rightCliff) && !c && (f = !0);
                        d.isNull && !e(b) && 0 < k ? f = !l.connectNulls : d.isNull && !b ? f = !0 : (0 === k || f ? k = ["M", d.plotX, d.plotY] : g.getPointSpline ? k = g.getPointSpline(a, d, k) : h ? (k = 1 === h ? ["L", q.plotX, u] : 2 === h ? ["L", (q.plotX + p) / 2, q.plotY, "L", (q.plotX + p) / 2, u] : ["L", p, q.plotY], k.push("L", p, u)) : k = ["L", p, u], m.push(d.x), h && m.push(d.x), n.push.apply(n, k), f = !1)
                    });
                    n.xMap = m;
                    return g.graphPath = n
                },
                drawGraph: function () {
                    var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this),
                        g = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                    p(this.zones, function (c, h) {
                        g.push(["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                    });
                    p(g, function (g, h) {
                        var l = g[0], d = a[l];
                        d ? (d.endX = c.xMap, d.animate({d: c})) : c.length && (a[l] = a.chart.renderer.path(c).addClass(g[1]).attr({zIndex: 1}).add(a.group), d = {
                                stroke: g[2],
                                "stroke-width": b.lineWidth,
                                fill: a.fillGraph && a.color || "none"
                            }, g[3] ? d.dashstyle = g[3] : "square" !== b.linecap &&
                                (d["stroke-linecap"] = d["stroke-linejoin"] = "round"), d = a[l].attr(d).shadow(2 > h && b.shadow));
                        d && (d.startX = c.xMap, d.isArea = c.isArea)
                    })
                },
                applyZones: function () {
                    var a = this, b = this.chart, c = b.renderer, g = this.zones, d, h, n = this.clips || [], m, e = this.graph, f = this.area, k = Math.max(b.chartWidth, b.chartHeight), u = this[(this.zoneAxis || "y") + "Axis"], q, z, v = b.inverted, r, H, t, G, x = !1;
                    g.length && (e || f) && u && void 0 !== u.min && (z = u.reversed, r = u.horiz, e && e.hide(), f && f.hide(), q = u.getExtremes(), p(g, function (g, l) {
                        d = z ? r ? b.plotWidth : 0 : r ? 0 :
                                u.toPixels(q.min);
                        d = Math.min(Math.max(E(h, d), 0), k);
                        h = Math.min(Math.max(Math.round(u.toPixels(E(g.value, q.max), !0)), 0), k);
                        x && (d = h = u.toPixels(q.max));
                        H = Math.abs(d - h);
                        t = Math.min(d, h);
                        G = Math.max(d, h);
                        u.isXAxis ? (m = {
                                x: v ? G : t,
                                y: 0,
                                width: H,
                                height: k
                            }, r || (m.x = b.plotHeight - m.x)) : (m = {
                                x: 0,
                                y: v ? G : t,
                                width: k,
                                height: H
                            }, r && (m.y = b.plotWidth - m.y));
                        v && c.isVML && (m = u.isXAxis ? {
                                x: 0,
                                y: z ? t : G,
                                height: m.width,
                                width: b.chartWidth
                            } : {x: m.y - b.plotLeft - b.spacingBox.x, y: 0, width: m.height, height: b.chartHeight});
                        n[l] ? n[l].animate(m) : (n[l] =
                                c.clipRect(m), e && a["zone-graph-" + l].clip(n[l]), f && a["zone-area-" + l].clip(n[l]));
                        x = g.value > q.max
                    }), this.clips = n)
                },
                invertGroups: function (a) {
                    function b() {
                        p(["group", "markerGroup"], function (b) {
                            c[b] && (c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                        })
                    }

                    var c = this, g;
                    c.xAxis && (g = y(c.chart, "resize", b), y(c, "destroy", g), b(a), c.invertGroups = b)
                },
                plotGroup: function (a, b, c, g, d) {
                    var h = this[a], l = !h;
                    l && (this[a] = h = this.chart.renderer.g(b).attr({zIndex: g || .1}).add(d), h.addClass("highcharts-series-" + this.index +
                        " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                    h.attr({visibility: c})[l ? "attr" : "animate"](this.getPlotBox());
                    return h
                },
                getPlotBox: function () {
                    var a = this.chart, b = this.xAxis, c = this.yAxis;
                    a.inverted && (b = c, c = this.xAxis);
                    return {
                        translateX: b ? b.left : a.plotLeft,
                        translateY: c ? c.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                render: function () {
                    var a = this, b = a.chart, c, g = a.options, d = !!a.animate && b.renderer.isSVG && F(g.animation).duration, h = a.visible ? "inherit" : "hidden", n =
                        g.zIndex, m = a.hasRendered, e = b.seriesGroup, f = b.inverted;
                    c = a.plotGroup("group", "series", h, n, e);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", h, n, e);
                    d && a.animate(!0);
                    c.inverted = a.isCartesian ? f : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.drawDataLabels && a.drawDataLabels();
                    a.visible && a.drawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(f);
                    !1 === g.clip || a.sharedClipKey || m || c.clip(b.clipRect);
                    d && a.animate();
                    m || (a.animationTimeout = G(function () {
                            a.afterAnimate()
                        },
                        d));
                    a.isDirty = !1;
                    a.hasRendered = !0
                },
                redraw: function () {
                    var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, g = this.xAxis, d = this.yAxis;
                    c && (a.inverted && c.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), c.animate({translateX: E(g && g.left, a.plotLeft), translateY: E(d && d.top, a.plotTop)}));
                    this.translate();
                    this.render();
                    b && delete this.kdTree
                },
                kdDimensions: 1,
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, b) {
                    var c = this.xAxis, g = this.yAxis, d = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: d ?
                            c.len - a.chartY + c.pos : a.chartX - c.pos,
                        plotY: d ? g.len - a.chartX + g.pos : a.chartY - g.pos
                    }, b)
                },
                buildKDTree: function () {
                    function a(c, g, h) {
                        var d, l;
                        if (l = c && c.length)return d = b.kdAxisArray[g % h], c.sort(function (a, b) {
                            return a[d] - b[d]
                        }), l = Math.floor(l / 2), {
                            point: c[l],
                            left: a(c.slice(0, l), g + 1, h),
                            right: a(c.slice(l + 1), g + 1, h)
                        }
                    }

                    this.buildingKdTree = !0;
                    var b = this, c = b.kdDimensions;
                    delete b.kdTree;
                    G(function () {
                        b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                        b.buildingKdTree = !1
                    }, b.options.kdNow ? 0 : 1)
                },
                searchKDTree: function (a,
                                        b) {
                    function c(a, b, n, m) {
                        var f = b.point, k = g.kdAxisArray[n % m], p, u, q = f;
                        u = e(a[d]) && e(f[d]) ? Math.pow(a[d] - f[d], 2) : null;
                        p = e(a[h]) && e(f[h]) ? Math.pow(a[h] - f[h], 2) : null;
                        p = (u || 0) + (p || 0);
                        f.dist = e(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                        f.distX = e(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                        k = a[k] - f[k];
                        p = 0 > k ? "left" : "right";
                        u = 0 > k ? "right" : "left";
                        b[p] && (p = c(a, b[p], n + 1, m), q = p[l] < q[l] ? p : f);
                        b[u] && Math.sqrt(k * k) < q[l] && (a = c(a, b[u], n + 1, m), q = a[l] < q[l] ? a : q);
                        return q
                    }

                    var g = this, d = this.kdAxisArray[0], h = this.kdAxisArray[1], l = b ? "distX" : "dist";
                    this.kdTree || this.buildingKdTree || this.buildKDTree();
                    if (this.kdTree)return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
                }
            })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animate, A = a.Axis, D = a.createElement, f = a.css, k = a.defined, r = a.each, t = a.erase, e = a.extend, p = a.fireEvent, d = a.inArray, q = a.isNumber, x = a.isObject, v = a.merge, n = a.pick, m = a.Point, c = a.Series, b = a.seriesTypes, E = a.setAnimation, u = a.splat;
        e(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var g, d = this;
                a && (b = n(b, !0), p(d, "addSeries", {options: a}, function () {
                    g =
                        d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    b && d.redraw(c)
                }));
                return g
            },
            addAxis: function (a, b, c, d) {
                var g = b ? "xAxis" : "yAxis", m = this.options;
                a = v(a, {index: this[g].length, isX: b});
                new A(this, a);
                m[g] = u(m[g] || {});
                m[g].push(a);
                n(c, !0) && this.redraw(d)
            },
            showLoading: function (a) {
                var b = this, c = b.options, g = b.loadingDiv, d = c.loading, m = function () {
                    g && f(g, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                g || (b.loadingDiv = g = D("div", {className: "highcharts-loading highcharts-loading-hidden"},
                    null, b.container), b.loadingSpan = D("span", {className: "highcharts-loading-inner"}, null, g), y(b, "redraw", m));
                g.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                f(g, e(d.style, {zIndex: 10}));
                f(b.loadingSpan, d.labelStyle);
                b.loadingShown || (f(g, {
                    opacity: 0,
                    display: ""
                }), F(g, {opacity: d.style.opacity || .5}, {duration: d.showDuration || 0}));
                b.loadingShown = !0;
                m()
            },
            hideLoading: function () {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", F(b, {opacity: 0},
                    {
                        duration: a.loading.hideDuration || 100, complete: function () {
                        f(b, {display: "none"})
                    }
                    }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
            update: function (a, b) {
                var c, g = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, l = a.chart, m, e;
                if (l) {
                    v(!0, this.options.chart, l);
                    "className" in l && this.setClassName(l.className);
                    if ("inverted" in l || "polar" in l) this.propFromSeries(), m = !0;
                    for (c in l)l.hasOwnProperty(c) && (-1 !== d("chart." + c, this.propsRequireUpdateSeries) && (e = !0), -1 !== d(c, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in l && this.renderer.setStyle(l.style)
                }
                for (c in a) {
                    if (this[c] && "function" === typeof this[c].update) this[c].update(a[c],
                        !1); else if ("function" === typeof this[g[c]]) this[g[c]](a[c]);
                    "chart" !== c && -1 !== d(c, this.propsRequireUpdateSeries) && (e = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && v(!0, this.options.plotOptions, a.plotOptions);
                r(["xAxis", "yAxis", "series"], function (b) {
                    a[b] && r(u(a[b]), function (a, c) {
                        (c = k(a.id) && this.get(a.id) || this[b][c]) && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                m && r(this.axes, function (a) {
                    a.update({}, !1)
                });
                e && r(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && v(!0, this.options.loading,
                    a.loading);
                c = l && l.width;
                l = l && l.height;
                q(c) && c !== this.chartWidth || q(l) && l !== this.chartHeight ? this.setSize(c, l) : n(b, !0) && this.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        e(m.prototype, {
            update: function (a, b, c, d) {
                function g() {
                    m.applyOptions(a);
                    null === m.y && f && (m.graphic = f.destroy());
                    x(a, !0) && (f && f.element && a && a.marker && a.marker.symbol && (m.graphic = f.destroy()), a && a.dataLabels && m.dataLabel && (m.dataLabel = m.dataLabel.destroy()));
                    k = m.index;
                    e.updateParallelArrays(m, k);
                    p.data[k] = x(p.data[k], !0) ?
                        m.options : a;
                    e.isDirty = e.isDirtyData = !0;
                    !e.fixedBox && e.hasCartesianSeries && (h.isDirtyBox = !0);
                    "point" === p.legendType && (h.isDirtyLegend = !0);
                    b && h.redraw(c)
                }

                var m = this, e = m.series, f = m.graphic, k, h = e.chart, p = e.options;
                b = n(b, !0);
                !1 === d ? g() : m.firePointEvent("update", {options: a}, g)
            }, remove: function (a, b) {
                this.series.removePoint(d(this, this.series.data), a, b)
            }
        });
        e(c.prototype, {
            addPoint: function (a, b, c, d) {
                var g = this.options, m = this.data, e = this.chart, f = this.xAxis, f = f && f.hasNames && f.names, k = g.data, h, p, u = this.xData,
                    q, v;
                b = n(b, !0);
                h = {series: this};
                this.pointClass.prototype.applyOptions.apply(h, [a]);
                v = h.x;
                q = u.length;
                if (this.requireSorting && v < u[q - 1])for (p = !0; q && u[q - 1] > v;)q--;
                this.updateParallelArrays(h, "splice", q, 0, 0);
                this.updateParallelArrays(h, q);
                f && h.name && (f[v] = h.name);
                k.splice(q, 0, a);
                p && (this.data.splice(q, 0, null), this.processData());
                "point" === g.legendType && this.generatePoints();
                c && (m[0] && m[0].remove ? m[0].remove(!1) : (m.shift(), this.updateParallelArrays(h, "shift"), k.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && e.redraw(d)
            }, removePoint: function (a, b, c) {
                var g = this, d = g.data, m = d[a], e = g.points, f = g.chart, k = function () {
                    e && e.length === d.length && e.splice(a, 1);
                    d.splice(a, 1);
                    g.options.data.splice(a, 1);
                    g.updateParallelArrays(m || {series: g}, "splice", a, 1);
                    m && m.destroy();
                    g.isDirty = !0;
                    g.isDirtyData = !0;
                    b && f.redraw()
                };
                E(c, f);
                b = n(b, !0);
                m ? m.firePointEvent("remove", null, k) : k()
            }, remove: function (a, b, c) {
                function g() {
                    d.destroy();
                    m.isDirtyLegend = m.isDirtyBox = !0;
                    m.linkSeries();
                    n(a, !0) && m.redraw(b)
                }

                var d = this, m = d.chart;
                !1 !== c ? p(d,
                        "remove", null, g) : g()
            }, update: function (a, c) {
                var g = this, d = this.chart, l = this.userOptions, m = this.type, f = a.type || l.type || d.options.chart.type, k = b[m].prototype, p = ["group", "markerGroup", "dataLabelsGroup"], h;
                if (f && f !== m || void 0 !== a.zIndex) p.length = 0;
                r(p, function (a) {
                    p[a] = g[a];
                    delete g[a]
                });
                a = v(l, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
                this.remove(!1, null, !1);
                for (h in k)this[h] = void 0;
                e(this, b[f || m].prototype);
                r(p, function (a) {
                    g[a] = p[a]
                });
                this.init(d, a);
                d.linkSeries();
                n(c, !0) && d.redraw(!1)
            }
        });
        e(A.prototype, {
            update: function (a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = v(this.userOptions, a);
                this.destroy(!0);
                this.init(c, e(a, {events: void 0}));
                c.isDirtyBox = !0;
                n(b, !0) && c.redraw()
            }, remove: function (a) {
                for (var b = this.chart, c = this.coll, d = this.series, g = d.length; g--;)d[g] && d[g].remove(!1);
                t(b.axes, this);
                t(b[c], this);
                b.options[c].splice(this.options.index, 1);
                r(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                n(a, !0) && b.redraw()
            }, setTitle: function (a,
                                   b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(I);
    (function (a) {
        var y = a.animObject, F = a.color, A = a.each, D = a.extend, f = a.isNumber, k = a.merge, r = a.pick, t = a.Series, e = a.seriesType, p = a.svg;
        e("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {halo: !1, brightness: .1, shadow: !1},
                select: {color: "#cccccc", borderColor: "#000000", shadow: !1}
            },
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                t.prototype.init.apply(this, arguments);
                var a = this, e = a.chart;
                e.hasRendered && A(e.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, e = a.options, f = a.xAxis, k = a.yAxis, n = f.reversed, m, c = {}, b = 0;
                !1 === e.grouping ? b = 1 : A(a.chart.series, function (g) {
                        var d = g.options,
                            e = g.yAxis, l;
                        g.type === a.type && g.visible && k.len === e.len && k.pos === e.pos && (d.stacking ? (m = g.stackKey, void 0 === c[m] && (c[m] = b++), l = c[m]) : !1 !== d.grouping && (l = b++), g.columnIndex = l)
                    });
                var p = Math.min(Math.abs(f.transA) * (f.ordinalSlope || e.pointRange || f.closestPointRange || f.tickInterval || 1), f.len), u = p * e.groupPadding, g = (p - 2 * u) / (b || 1), e = Math.min(e.maxPointWidth || f.len, r(e.pointWidth, g * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (g - e) / 2 + (u + ((a.columnIndex || 0) + (n ? 1 : 0)) * g - p / 2) * (n ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, e, f, k) {
                var d = this.chart, m = this.borderWidth, c = -(m % 2 ? .5 : 0), m = m % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (m += 1);
                f = Math.round(a + f) + c;
                a = Math.round(a) + c;
                k = Math.round(e + k) + m;
                c = .5 >= Math.abs(e) && .5 < k;
                e = Math.round(e) + m;
                k -= e;
                c && k && (--e, k += 1);
                return {x: a, y: e, width: f - a, height: k}
            },
            translate: function () {
                var a = this, e = a.chart, f = a.options, k = a.dense = 2 > a.closestPointRange * a.xAxis.transA, k = a.borderWidth = r(f.borderWidth, k ? 0 : 1), n = a.yAxis, m = a.translatedThreshold = n.getThreshold(f.threshold), c = r(f.minPointLength,
                    5), b = a.getColumnMetrics(), p = b.width, u = a.barW = Math.max(p, 1 + 2 * k), g = a.pointXOffset = b.offset;
                e.inverted && (m -= .5);
                f.pointPadding && (u = Math.ceil(u));
                t.prototype.translate.apply(a);
                A(a.points, function (b) {
                    var d = r(b.yBottom, m), f = 999 + Math.abs(d), f = Math.min(Math.max(-f, b.plotY), n.len + f), l = b.plotX + g, k = u, q = Math.min(f, d), v, z = Math.max(f, d) - q;
                    Math.abs(z) < c && c && (z = c, v = !n.reversed && !b.negative || n.reversed && b.negative, q = Math.abs(q - m) > c ? d - c : m - (v ? c : 0));
                    b.barX = l;
                    b.pointWidth = p;
                    b.tooltipPos = e.inverted ? [n.len + n.pos - e.plotLeft -
                        f, a.xAxis.len - l - k / 2, z] : [l + k / 2, f + n.pos - e.plotTop, z];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [b.plotX, n.len / 2, 0, 0] : [l, q, k, z])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, e) {
                var d = this.options, f, n = this.pointAttrToOptions || {};
                f = n.stroke || "borderColor";
                var m = n["stroke-width"] || "borderWidth", c = a && a.color || this.color, b = a[f] || d[f] || this.color ||
                    c, k = a[m] || d[m] || this[m] || 0, n = d.dashStyle;
                a && this.zones.length && (c = (c = a.getZone()) && c.color || a.options.color || this.color);
                e && (a = d.states[e], e = a.brightness, c = a.color || void 0 !== e && F(c).brighten(a.brightness).get() || c, b = a[f] || b, k = a[m] || k, n = a.dashStyle || n);
                f = {fill: c, stroke: b, "stroke-width": k};
                d.borderRadius && (f.r = d.borderRadius);
                n && (f.dashstyle = n);
                return f
            },
            drawPoints: function () {
                var a = this, e = this.chart, p = a.options, v = e.renderer, n = p.animationLimit || 250, m;
                A(a.points, function (c) {
                    var b = c.graphic;
                    if (f(c.plotY) &&
                        null !== c.y) {
                        m = c.shapeArgs;
                        if (b) b[e.pointCount < n ? "animate" : "attr"](k(m)); else c.graphic = b = v[c.shapeType](m).attr({"class": c.getClassName()}).add(c.group || a.group);
                        b.attr(a.pointAttribs(c, c.selected && "select")).shadow(p.shadow, null, p.stacking && !p.borderRadius)
                    } else b && (c.graphic = b.destroy())
                })
            },
            animate: function (a) {
                var d = this, e = this.yAxis, f = d.options, n = this.chart.inverted, m = {};
                p && (a ? (m.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(f.threshold))), n ? m.translateX = a - e.len : m.translateY = a, d.group.attr(m)) :
                    (m[n ? "translateX" : "translateY"] = e.pos, d.group.animate(m, D(y(d.options.animation), {
                        step: function (a, b) {
                            d.group.attr({scaleY: Math.max(.001, b.pos)})
                        }
                    })), d.animate = null))
            },
            remove: function () {
                var a = this, e = a.chart;
                e.hasRendered && A(e.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                t.prototype.remove.apply(a, arguments)
            }
        })
    })(I);
    (function (a) {
        var y = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0, marker: {enabled: !0}, tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function () {
                this.options.lineWidth && y.prototype.drawGraph.call(this)
            }
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.arrayMax, A = a.defined, D = a.each, f = a.extend, k = a.format, r = a.map, t = a.merge, e = a.noop, p = a.pick, d = a.relativeLength, q = a.Series, x = a.seriesTypes, v = a.stableSort;
        a.distribute = function (a, d) {
            function c(a, b) {
                return a.target - b.target
            }

            var b, m = !0, e = a, g = [], f;
            f = 0;
            for (b = a.length; b--;)f += a[b].size;
            if (f > d) {
                v(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (f = b = 0; f <= d;)f += a[b].size, b++;
                g = a.splice(b - 1, a.length)
            }
            v(a, c);
            for (a = r(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); m;) {
                for (b = a.length; b--;)m = a[b], f = (Math.min.apply(0, m.targets) + Math.max.apply(0, m.targets)) / 2, m.pos = Math.min(Math.max(0, f - m.size / 2), d - m.size);
                b = a.length;
                for (m = !1; b--;)0 < b && a[b - 1].pos + a[b - 1].size >
                a[b].pos && (a[b - 1].size += a[b].size, a[b - 1].targets = a[b - 1].targets.concat(a[b].targets), a[b - 1].pos + a[b - 1].size > d && (a[b - 1].pos = d - a[b - 1].size), a.splice(b, 1), m = !0)
            }
            b = 0;
            D(a, function (a) {
                var c = 0;
                D(a.targets, function () {
                    e[b].pos = a.pos + c;
                    c += e[b].size;
                    b++
                })
            });
            e.push.apply(e, g);
            v(e, c)
        };
        q.prototype.drawDataLabels = function () {
            var a = this, d = a.options, c = d.dataLabels, b = a.points, e, f, g = a.hasRendered || 0, q, v, r = p(c.defer, !0), l = a.chart.renderer;
            if (c.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(c), v = a.plotGroup("dataLabelsGroup",
                "data-labels", r && !g ? "hidden" : "visible", c.zIndex || 6), r && (v.attr({opacity: +g}), g || y(a, "afterAnimate", function () {
                a.visible && v.show(!0);
                v[d.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), f = c, D(b, function (b) {
                var g, m = b.dataLabel, n, h, u, r = b.connector, z = !m, H;
                e = b.dlOptions || b.options && b.options.dataLabels;
                if (g = p(e && e.enabled, f.enabled) && null !== b.y)for (h in c = t(f, e), n = b.getLabelConfig(), q = c.format ? k(c.format, n) : c.formatter.call(n, c), H = c.style, u = c.rotation, H.color = p(c.color, H.color, a.color, "#000000"),
                "contrast" === H.color && (H.color = c.inside || 0 > c.distance || d.stacking ? l.getContrast(b.color || a.color) : "#000000"), d.cursor && (H.cursor = d.cursor), n = {
                    fill: c.backgroundColor,
                    stroke: c.borderColor,
                    "stroke-width": c.borderWidth,
                    r: c.borderRadius || 0,
                    rotation: u,
                    padding: c.padding,
                    zIndex: 1
                }, n)void 0 === n[h] && delete n[h];
                !m || g && A(q) ? g && A(q) && (m ? n.text = q : (m = b.dataLabel = l[u ? "text" : "label"](q, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label"), m.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (c.className ||
                            "") + (c.useHTML ? "highcharts-tracker" : ""))), m.attr(n), m.css(H).shadow(c.shadow), m.added || m.add(v), a.alignDataLabel(b, m, c, null, z)) : (b.dataLabel = m.destroy(), r && (b.connector = r.destroy()))
            })
        };
        q.prototype.alignDataLabel = function (a, d, c, b, e) {
            var m = this.chart, g = m.inverted, n = p(a.plotX, -9999), k = p(a.plotY, -9999), q = d.getBBox(), l, v = c.rotation, r = c.align, t = this.visible && (a.series.forceDL || m.isInsidePlot(n, Math.round(k), g) || b && m.isInsidePlot(n, g ? b.x + 1 : b.y + b.height - 1, g)), x = "justify" === p(c.overflow, "justify");
            t && (l =
                c.style.fontSize, l = m.renderer.fontMetrics(l, d).b, b = f({
                x: g ? m.plotWidth - k : n,
                y: Math.round(g ? m.plotHeight - n : k),
                width: 0,
                height: 0
            }, b), f(c, {
                width: q.width,
                height: q.height
            }), v ? (x = !1, g = m.renderer.rotCorr(l, v), g = {
                    x: b.x + c.x + b.width / 2 + g.x,
                    y: b.y + c.y + {top: 0, middle: .5, bottom: 1}[c.verticalAlign] * b.height
                }, d[e ? "attr" : "animate"](g).attr({align: r}), n = (v + 720) % 360, n = 180 < n && 360 > n, "left" === r ? g.y -= n ? q.height : 0 : "center" === r ? (g.x -= q.width / 2, g.y -= q.height / 2) : "right" === r && (g.x -= q.width, g.y -= n ? 0 : q.height)) : (d.align(c, null, b),
                    g = d.alignAttr), x ? this.justifyDataLabel(d, c, g, q, b, e) : p(c.crop, !0) && (t = m.isInsidePlot(g.x, g.y) && m.isInsidePlot(g.x + q.width, g.y + q.height)), c.shape && !v && d.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            t || (d.attr({y: -9999}), d.placed = !1)
        };
        q.prototype.justifyDataLabel = function (a, d, c, b, e, f) {
            var g = this.chart, m = d.align, n = d.verticalAlign, k, l, p = a.box ? 0 : a.padding || 0;
            k = c.x + p;
            0 > k && ("right" === m ? d.align = "left" : d.x = -k, l = !0);
            k = c.x + b.width - p;
            k > g.plotWidth && ("left" === m ? d.align = "right" : d.x = g.plotWidth - k, l = !0);
            k = c.y + p;
            0 > k &&
            ("bottom" === n ? d.verticalAlign = "top" : d.y = -k, l = !0);
            k = c.y + b.height - p;
            k > g.plotHeight && ("top" === n ? d.verticalAlign = "bottom" : d.y = g.plotHeight - k, l = !0);
            l && (a.placed = !f, a.align(d, null, e))
        };
        x.pie && (x.pie.prototype.drawDataLabels = function () {
            var d = this, e = d.data, c, b = d.chart, f = d.options.dataLabels, k = p(f.connectorPadding, 10), g = p(f.connectorWidth, 1), v = b.plotWidth, t = b.plotHeight, x, l = f.distance, B = d.center, y = B[2] / 2, A = B[1], J = 0 < l, h, C, M, N, R = [[], []], I, w, Q, O, P = [0, 0, 0, 0];
            d.visible && (f.enabled || d._hasPointLabels) && (q.prototype.drawDataLabels.apply(d),
                D(e, function (a) {
                    a.dataLabel && a.visible && (R[a.half].push(a), a.dataLabel._pos = null)
                }), D(R, function (g, e) {
                var m, n, p = g.length, u, q, z;
                if (p)for (d.sortByAngle(g, e - .5), 0 < l && (m = Math.max(0, A - y - l), n = Math.min(A + y + l, b.plotHeight), u = r(g, function (a) {
                    if (a.dataLabel)return z = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - m + z / 2,
                        size: z,
                        rank: a.y
                    }
                }), a.distribute(u, n + z - m)), O = 0; O < p; O++)c = g[O], M = c.labelPos, h = c.dataLabel, Q = !1 === c.visible ? "hidden" : "inherit", q = M[1], u ? void 0 === u[O].pos ? Q = "hidden" : (N = u[O].size, w = m + u[O].pos) :
                    w = q, I = f.justify ? B[0] + (e ? -1 : 1) * (y + l) : d.getX(w < m + 2 || w > n - 2 ? q : w, e), h._attr = {
                    visibility: Q,
                    align: M[6]
                }, h._pos = {
                    x: I + f.x + ({left: k, right: -k}[M[6]] || 0),
                    y: w + f.y - 10
                }, M.x = I, M.y = w, null === d.options.size && (C = h.width, I - C < k ? P[3] = Math.max(Math.round(C - I + k), P[3]) : I + C > v - k && (P[1] = Math.max(Math.round(I + C - v + k), P[1])), 0 > w - N / 2 ? P[0] = Math.max(Math.round(-w + N / 2), P[0]) : w + N / 2 > t && (P[2] = Math.max(Math.round(w + N / 2 - t), P[2])))
            }), 0 === F(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), J && g && D(this.points, function (a) {
                var c;
                x = a.connector;
                if ((h = a.dataLabel) && h._pos && a.visible) {
                    Q = h._attr.visibility;
                    if (c = !x) a.connector = x = b.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(d.dataLabelsGroup), x.attr({
                        "stroke-width": g,
                        stroke: f.connectorColor || a.color || "#666666"
                    });
                    x[c ? "attr" : "animate"]({d: d.connectorPath(a.labelPos)});
                    x.attr("visibility", Q)
                } else x && (a.connector = x.destroy())
            }))
        }, x.pie.prototype.connectorPath = function (a) {
            var d = a.x, c = a.y;
            return p(this.options.dataLabels.softConnector,
                !0) ? ["M", d + ("left" === a[6] ? 5 : -5), c, "C", d, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", d + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, x.pie.prototype.placeDataLabels = function () {
            D(this.points, function (a) {
                var d = a.dataLabel;
                d && a.visible && ((a = d._pos) ? (d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({y: -9999}))
            })
        }, x.pie.prototype.alignDataLabel = e, x.pie.prototype.verifyDataLabelOverflow = function (a) {
            var e = this.center, c = this.options, b = c.center, f = c.minSize || 80, k, g;
            null !==
            b[0] ? k = Math.max(e[2] - Math.max(a[1], a[3]), f) : (k = Math.max(e[2] - a[1] - a[3], f), e[0] += (a[3] - a[1]) / 2);
            null !== b[1] ? k = Math.max(Math.min(k, e[2] - Math.max(a[0], a[2])), f) : (k = Math.max(Math.min(k, e[2] - a[0] - a[2]), f), e[1] += (a[0] - a[2]) / 2);
            k < e[2] ? (e[2] = k, e[3] = Math.min(d(c.innerSize || 0, k), k), this.translate(e), this.drawDataLabels && this.drawDataLabels()) : g = !0;
            return g
        });
        x.column && (x.column.prototype.alignDataLabel = function (a, d, c, b, e) {
            var m = this.chart.inverted, g = a.series, f = a.dlBox || a.shapeArgs, k = p(a.below, a.plotY > p(this.translatedThreshold,
                    g.yAxis.len)), n = p(c.inside, !!this.options.stacking);
            f && (b = t(f), 0 > b.y && (b.height += b.y, b.y = 0), f = b.y + b.height - g.yAxis.len, 0 < f && (b.height -= f), m && (b = {
                x: g.yAxis.len - b.y - b.height,
                y: g.xAxis.len - b.x - b.width,
                width: b.height,
                height: b.width
            }), n || (m ? (b.x += k ? 0 : b.width, b.width = 0) : (b.y += k ? b.height : 0, b.height = 0)));
            c.align = p(c.align, !m || n ? "center" : k ? "right" : "left");
            c.verticalAlign = p(c.verticalAlign, m || n ? "middle" : k ? "top" : "bottom");
            q.prototype.alignDataLabel.call(this, a, d, c, b, e)
        })
    })(I);
    (function (a) {
        var y = a.Chart, F = a.each,
            A = a.pick, D = a.addEvent;
        y.prototype.callbacks.push(function (a) {
            function f() {
                var f = [];
                F(a.series, function (a) {
                    var e = a.options.dataLabels, k = a.dataLabelCollections || ["dataLabel"];
                    (e.enabled || a._hasPointLabels) && !e.allowOverlap && a.visible && F(k, function (d) {
                        F(a.points, function (a) {
                            a[d] && (a[d].labelrank = A(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[d]))
                        })
                    })
                });
                a.hideOverlappingLabels(f)
            }

            f();
            D(a, "redraw", f)
        });
        y.prototype.hideOverlappingLabels = function (a) {
            var f = a.length, r, t, e, p, d, q, x, v, n, m = function (a,
                                                                       b, d, e, g, m, f, k) {
                return !(g > a + d || g + f < a || m > b + e || m + k < b)
            };
            for (t = 0; t < f; t++)if (r = a[t]) r.oldOpacity = r.opacity, r.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (t = 0; t < f; t++)for (e = a[t], r = t + 1; r < f; ++r)if (p = a[r], e && p && e.placed && p.placed && 0 !== e.newOpacity && 0 !== p.newOpacity && (d = e.alignAttr, q = p.alignAttr, x = e.parentGroup, v = p.parentGroup, n = 2 * (e.box ? 0 : e.padding), d = m(d.x + x.translateX, d.y + x.translateY, e.width - n, e.height - n, q.x + v.translateX, q.y + v.translateY, p.width - n, p.height - n))) (e.labelrank <
            p.labelrank ? e : p).newOpacity = 0;
            F(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                        a.hide()
                    }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.Chart, A = a.createElement, D = a.css, f = a.defaultOptions, k = a.defaultPlotOptions, r = a.each, t = a.extend, e = a.fireEvent, p = a.hasTouch, d = a.inArray, q = a.isObject, x = a.Legend, v = a.merge, n = a.pick, m = a.Point, c = a.Series, b = a.seriesTypes, E = a.svg;
        a = a.TrackerMixin =
            {
                drawTrackerPoint: function () {
                    var a = this, b = a.chart, c = b.pointer, d = function (a) {
                        for (var c = a.target, d; c && !d;)d = c.point, c = c.parentNode;
                        if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
                    };
                    r(a.points, function (a) {
                        a.graphic && (a.graphic.element.point = a);
                        a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                    });
                    a._hasTracking || (r(a.trackerGroups, function (b) {
                        if (a[b]) {
                            a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
                                c.onTrackerMouseOut(a)
                            });
                            if (p) a[b].on("touchstart",
                                d);
                            a.options.cursor && a[b].css(D).css({cursor: a.options.cursor})
                        }
                    }), a._hasTracking = !0)
                }, drawTrackerGraph: function () {
                var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, l = a.chart, m = l.pointer, f = l.renderer, k = l.options.tooltip.snap, n = a.tracker, h, q = function () {
                    if (l.hoverSeries !== a) a.onMouseOver()
                }, v = "rgba(192,192,192," + (E ? .0001 : .002) + ")";
                if (e && !c)for (h = e + 1; h--;)"M" === d[h] && d.splice(h + 1, 0, d[h + 1] - k, d[h + 2], "L"), (h && "M" === d[h] || h === e) && d.splice(h, 0, "L", d[h - 2] + k, d[h - 1]);
                n ?
                    n.attr({d: d}) : a.graph && (a.tracker = f.path(d).attr({
                        "stroke-linejoin": "round",
                        visibility: a.visible ? "visible" : "hidden",
                        stroke: v,
                        fill: c ? v : "none",
                        "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k),
                        zIndex: 2
                    }).add(a.group), r([a.tracker, a.markerGroup], function (a) {
                        a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function (a) {
                            m.onTrackerMouseOut(a)
                        });
                        b.cursor && a.css({cursor: b.cursor});
                        if (p) a.on("touchstart", q)
                    }))
            }
            };
        b.column && (b.column.prototype.drawTracker = a.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker =
            a.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = a.drawTrackerPoint);
        t(x.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this, g = d.chart, l = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    g.seriesGroup.addClass(l);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    g.seriesGroup.removeClass(l);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible &&
                        a.setVisible()
                    };
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : e(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = A("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                y(a.checkbox, "click", function (b) {
                    e(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        f.legend.itemStyle.cursor = "pointer";
        t(F.prototype, {
            showResetZoom: function () {
                var a =
                    this, b = f.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, l = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, l)
            }, zoomOut: function () {
                var a = this;
                e(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, e;
                !a || a.resetSelection ? r(this.axes, function (a) {
                        b =
                            a.zoom()
                    }) : r(a.xAxis.concat(a.yAxis), function (a) {
                        var g = a.axis;
                        c[g.isXAxis ? "zoomX" : "zoomY"] && (b = g.zoom(a.min, a.max), g.displayBtn && (d = !0))
                    });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && q(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(n(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, g;
                d && r(d, function (a) {
                    a.setState()
                });
                r("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, e = a[d ? "chartX" : "chartY"], d = d ?
                        "mouseDownX" : "mouseDownY", l = c[d], m = (b.pointRange || 0) / 2, h = b.getExtremes(), f = b.toValue(l - e, !0) + m, m = b.toValue(l + b.len - e, !0) - m, k = m < f, l = k ? m : f, f = k ? f : m, m = Math.min(h.dataMin, h.min) - l, h = f - Math.max(h.dataMax, h.max);
                    b.series.length && 0 > m && 0 > h && (b.setExtremes(l, f, !1, !1, {trigger: "pan"}), g = !0);
                    c[d] = e
                });
                g && c.redraw(!1);
                D(c.container, {cursor: "move"})
            }
        });
        t(m.prototype, {
            select: function (a, b) {
                var c = this, g = c.series, e = g.chart;
                a = n(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    c.selected =
                        c.options.selected = a;
                    g.options.data[d(c, g.data)] = c.options;
                    c.setState(a && "select");
                    b || r(e.getSelectedPoints(), function (a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, g.options.data[d(a, g.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a, b) {
                var c = this.series, d = c.chart, g = d.tooltip, e = d.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (e && e !== this) e.onMouseOut();
                        if (d.hoverSeries !== c) c.onMouseOver();
                        d.hoverPoint = this
                    }
                    !g || g.shared && !c.noSharedTooltip ? g || this.setState("hover") :
                        (this.setState("hover"), g.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            }, onMouseOut: function () {
                var a = this.series.chart, b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== d(this, b) || (this.setState(), a.hoverPoint = null)
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = v(this.series.options.point, this.options).events, b;
                    this.events = a;
                    for (b in a)y(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, g = this.series, e = g.options.states[a] ||
                    {}, m = k[g.type].marker && g.options.marker, f = m && !1 === m.enabled, p = m && m.states && m.states[a] || {}, q = !1 === p.enabled, h = g.stateMarkerGraphic, v = this.marker || {}, r = g.chart, u = g.halo, x, E = m && g.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === e.enabled || a && (q || f && !1 === p.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
                    E && (x = g.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" +
                        a), this.graphic.attr(g.pointAttribs(this, a)), x && this.graphic.animate(x, n(r.options.chart.animation, p.animation, m.animation)), h && h.hide(); else {
                        if (a && p) {
                            m = v.symbol || g.symbol;
                            h && h.currentSymbol !== m && (h = h.destroy());
                            if (h) h[b ? "animate" : "attr"]({
                                x: x.x,
                                y: x.y
                            }); else m && (g.stateMarkerGraphic = h = r.renderer.symbol(m, x.x, x.y, x.width, x.height).add(g.markerGroup), h.currentSymbol = m);
                            h && h.attr(g.pointAttribs(this, a))
                        }
                        h && (h[a && r.isInsidePlot(c, d, r.inverted) ? "show" : "hide"](), h.element.point = this)
                    }
                    (c = e.halo) && c.size ?
                        (u || (g.halo = u = r.renderer.path().add(E ? g.markerGroup : g.group)), u[b ? "animate" : "attr"]({d: this.haloPath(c.size)}), u.attr({"class": "highcharts-halo highcharts-color-" + n(this.colorIndex, g.colorIndex)}), u.point = this, u.attr(t({
                            fill: this.color || g.color,
                            "fill-opacity": c.opacity,
                            zIndex: -1
                        }, c.attributes))) : u && u.point && u.point.haloPath && u.animate({d: u.point.haloPath(0)});
                    this.state = a
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(c.prototype,
            {
                onMouseOver: function () {
                    var a = this.chart, b = a.hoverSeries;
                    if (b && b !== this) b.onMouseOut();
                    this.options.events.mouseOver && e(this, "mouseOver");
                    this.setState("hover");
                    a.hoverSeries = this
                }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && e(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this, c = b.options, d = b.graph, e = c.states, m = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (r([b.group, b.markerGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (m = e[a].lineWidth || m + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))for (e = {"stroke-width": m}, d.attr(e); b["zone-graph-" + c];)b["zone-graph-" + c].attr(e), c += 1
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, g = c.legendItem, m, f = d.options.chart.ignoreHiddenSeries, k = c.visible;
                m = (c.visible = a = c.options.visible =
                    c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                r(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][m]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                g && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && r(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                r(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                e(c, m)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            },
                select: function (a) {
                    this.selected = a = void 0 === a ? !this.selected : a;
                    this.checkbox && (this.checkbox.checked = a);
                    e(this, a ? "select" : "unselect")
                }, drawTracker: a.drawTrackerGraph
            })
    })(I);
    (function (a) {
        var y = a.Chart, F = a.each, A = a.inArray, D = a.isObject, f = a.pick, k = a.splat;
        y.prototype.setResponsive = function (a) {
            var f = this.options.responsive;
            f && f.rules && F(f.rules, function (e) {
                this.matchResponsiveRule(e, a)
            }, this)
        };
        y.prototype.matchResponsiveRule = function (k, t) {
            var e = this.respRules, p = k.condition, d;
            d = p.callback || function () {
                    return this.chartWidth <=
                        f(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= f(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= f(p.minWidth, 0) && this.chartHeight >= f(p.minHeight, 0)
                };
            void 0 === k._id && (k._id = a.uniqueKey());
            d = d.call(this);
            !e[k._id] && d ? k.chartOptions && (e[k._id] = this.currentOptions(k.chartOptions), this.update(k.chartOptions, t)) : e[k._id] && !d && (this.update(e[k._id], t), delete e[k._id])
        };
        y.prototype.currentOptions = function (a) {
            function f(a, d, e, r) {
                var p, n;
                for (p in a)if (!r && -1 < A(p, ["series", "xAxis", "yAxis"]))for (a[p] = k(a[p]),
                                                                                       e[p] = [], n = 0; n < a[p].length; n++)e[p][n] = {}, f(a[p][n], d[p][n], e[p][n], r + 1); else D(a[p]) ? (e[p] = {}, f(a[p], d[p] || {}, e[p], r + 1)) : e[p] = d[p] || null
            }

            var e = {};
            f(a, this.options, e, 0);
            return e
        }
    })(I);
    (function (a) {
        var y = a.Axis, F = a.each, A = a.pick;
        a = a.wrap;
        a(y.prototype, "getSeriesExtremes", function (a) {
            var f = this.isXAxis, k, r, t = [], e;
            f && F(this.series, function (a, d) {
                a.useMapGeometry && (t[d] = a.xData, a.xData = [])
            });
            a.call(this);
            f && (k = A(this.dataMin, Number.MAX_VALUE), r = A(this.dataMax, -Number.MAX_VALUE), F(this.series, function (a,
                                                                                                                          d) {
                a.useMapGeometry && (k = Math.min(k, A(a.minX, k)), r = Math.max(r, A(a.maxX, k)), a.xData = t[d], e = !0)
            }), e && (this.dataMin = k, this.dataMax = r))
        });
        a(y.prototype, "setAxisTranslation", function (a) {
            var f = this.chart, k = f.plotWidth / f.plotHeight, f = f.xAxis[0], r;
            a.call(this);
            "yAxis" === this.coll && void 0 !== f.transA && F(this.series, function (a) {
                a.preserveAspectRatio && (r = !0)
            });
            if (r && (this.transA = f.transA = Math.min(this.transA, f.transA), a = k / ((f.max - f.min) / (this.max - this.min)), a = 1 > a ? this : f, k = (a.max - a.min) * a.transA, a.pixelPadding =
                    a.len - k, a.minPixelPadding = a.pixelPadding / 2, k = a.fixTo)) {
                k = k[1] - a.toValue(k[0], !0);
                k *= a.transA;
                if (Math.abs(k) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) k = 0;
                a.minPixelPadding -= k
            }
        });
        a(y.prototype, "render", function (a) {
            a.call(this);
            this.fixTo = null
        })
    })(I);
    (function (a) {
        var y = a.Axis, F = a.Chart, A = a.color, D, f = a.each, k = a.extend, r = a.isNumber, t = a.Legend, e = a.LegendSymbolMixin, p = a.noop, d = a.merge, q = a.pick, x = a.wrap;
        D = a.ColorAxis = function () {
            this.init.apply(this, arguments)
        };
        k(D.prototype, y.prototype);
        k(D.prototype,
            {
                defaultColorAxisOptions: {
                    lineWidth: 0,
                    minPadding: 0,
                    maxPadding: 0,
                    gridLineWidth: 1,
                    tickPixelInterval: 72,
                    startOnTick: !0,
                    endOnTick: !0,
                    offset: 0,
                    marker: {animation: {duration: 50}, width: .01, color: "#999999"},
                    labels: {overflow: "justify", rotation: 0},
                    minColor: "#ff0000",
                    maxColor: "#00ff00",
                    tickLength: 5,
                    showInLegend: !0
                },
                keepProps: ["legendGroup", "legendItem", "legendSymbol"].concat(y.prototype.keepProps),
                init: function (a, e) {
                    var m = "vertical" !== a.options.legend.layout, c;
                    this.coll = "colorAxis";
                    c = d(this.defaultColorAxisOptions,
                        {side: m ? 2 : 1, reversed: !m}, e, {opposite: !m, showEmpty: !1, title: null});
                    y.prototype.init.call(this, a, c);
                    e.dataClasses && this.initDataClasses(e);
                    this.initStops(e);
                    this.horiz = m;
                    this.zoomEnabled = !1;
                    this.defaultLegendLength = 200
                },
                tweenColors: function (a, d, e) {
                    var c;
                    d.rgba.length && a.rgba.length ? (a = a.rgba, d = d.rgba, c = 1 !== d[3] || 1 !== a[3], a = (c ? "rgba(" : "rgb(") + Math.round(d[0] + (a[0] - d[0]) * (1 - e)) + "," + Math.round(d[1] + (a[1] - d[1]) * (1 - e)) + "," + Math.round(d[2] + (a[2] - d[2]) * (1 - e)) + (c ? "," + (d[3] + (a[3] - d[3]) * (1 - e)) : "") + ")") : a = d.input ||
                            "none";
                    return a
                },
                initDataClasses: function (a) {
                    var e = this, m = this.chart, c, b = 0, k = m.options.chart.colorCount, p = this.options, g = a.dataClasses.length;
                    this.dataClasses = c = [];
                    this.legendItems = [];
                    f(a.dataClasses, function (a, f) {
                        a = d(a);
                        c.push(a);
                        a.color || ("category" === p.dataClassColor ? (f = m.options.colors, k = f.length, a.color = f[b], a.colorIndex = b, b++, b === k && (b = 0)) : a.color = e.tweenColors(A(p.minColor), A(p.maxColor), 2 > g ? .5 : f / (g - 1)))
                    })
                },
                initStops: function (a) {
                    this.stops = a.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
                    f(this.stops, function (a) {
                        a.color = A(a[1])
                    })
                },
                setOptions: function (a) {
                    y.prototype.setOptions.call(this, a);
                    this.options.crosshair = this.options.marker
                },
                setAxisSize: function () {
                    var a = this.legendSymbol, d = this.chart, e = d.options.legend || {}, c, b;
                    a ? (this.left = e = a.attr("x"), this.top = c = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - b, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? e : c) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) ||
                            this.defaultLegendLength
                },
                toColor: function (a, d) {
                    var e = this.stops, c, b, f = this.dataClasses, k, g;
                    if (f)for (g = f.length; g--;) {
                        if (k = f[g], c = k.from, e = k.to, (void 0 === c || a >= c) && (void 0 === e || a <= e)) {
                            b = k.color;
                            d && (d.dataClass = g, d.colorIndex = k.colorIndex);
                            break
                        }
                    } else {
                        this.isLog && (a = this.val2lin(a));
                        a = 1 - (this.max - a) / (this.max - this.min || 1);
                        for (g = e.length; g-- && !(a > e[g][0]););
                        c = e[g] || e[g + 1];
                        e = e[g + 1] || c;
                        a = 1 - (e[0] - a) / (e[0] - c[0] || 1);
                        b = this.tweenColors(c.color, e.color, a)
                    }
                    return b
                },
                getOffset: function () {
                    var a = this.legendGroup,
                        d = this.chart.axisOffset[this.side];
                    a && (this.axisParent = a, y.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
                },
                setLegendColor: function () {
                    var a, d = this.options, e = this.reversed;
                    a = e ? 1 : 0;
                    e = e ? 0 : 1;
                    a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a];
                    this.legendColor = {
                        linearGradient: {x1: a[0], y1: a[1], x2: a[2], y2: a[3]},
                        stops: d.stops || [[0, d.minColor], [1, d.maxColor]]
                    }
                },
                drawLegendSymbol: function (a, d) {
                    var e = a.padding, c = a.options, b = this.horiz, f =
                        q(c.symbolWidth, b ? this.defaultLegendLength : 12), k = q(c.symbolHeight, b ? 12 : this.defaultLegendLength), g = q(c.labelPadding, b ? 16 : 30), c = q(c.itemDistance, 10);
                    this.setLegendColor();
                    d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, k).attr({zIndex: 1}).add(d.legendGroup);
                    this.legendItemWidth = f + e + (b ? c : g);
                    this.legendItemHeight = k + e + (b ? g : 0)
                },
                setState: p,
                visible: !0,
                setVisible: p,
                getSeriesExtremes: function () {
                    var a = this.series, d = a.length;
                    this.dataMin = Infinity;
                    for (this.dataMax = -Infinity; d--;)void 0 !== a[d].valueMin &&
                    (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax = Math.max(this.dataMax, a[d].valueMax))
                },
                drawCrosshair: function (a, d) {
                    var e = d && d.plotX, c = d && d.plotY, b, f = this.pos, k = this.len;
                    d && (b = this.toPixels(d[d.series.colorKey]), b < f ? b = f - 2 : b > f + k && (b = f + k + 2), d.plotX = b, d.plotY = this.len - b, y.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = c, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({fill: this.crosshair.color})))
                },
                getPlotLinePath: function (a,
                                           d, e, c, b) {
                    return r(b) ? this.horiz ? ["M", b - 4, this.top - 6, "L", b + 4, this.top - 6, b, this.top, "Z"] : ["M", this.left, b, "L", this.left - 6, b + 6, this.left - 6, b - 6, "Z"] : y.prototype.getPlotLinePath.call(this, a, d, e, c)
                },
                update: function (a, e) {
                    var m = this.chart, c = m.legend;
                    f(this.series, function (a) {
                        a.isDirtyData = !0
                    });
                    a.dataClasses && c.allItems && (f(c.allItems, function (a) {
                        a.isDataClass && a.legendGroup.destroy()
                    }), m.isDirtyLegend = !0);
                    m.options[this.coll] = d(this.userOptions, a);
                    y.prototype.update.call(this, a, e);
                    this.legendItem && (this.setLegendColor(),
                        c.colorizeItem(this, !0))
                },
                getDataClassLegendSymbols: function () {
                    var d = this, n = this.chart, m = this.legendItems, c = n.options.legend, b = c.valueDecimals, q = c.valueSuffix || "", r;
                    m.length || f(this.dataClasses, function (c, u) {
                        var g = !0, v = c.from, l = c.to;
                        r = "";
                        void 0 === v ? r = "\x3c " : void 0 === l && (r = "\x3e ");
                        void 0 !== v && (r += a.numberFormat(v, b) + q);
                        void 0 !== v && void 0 !== l && (r += " - ");
                        void 0 !== l && (r += a.numberFormat(l, b) + q);
                        m.push(k({
                            chart: n,
                            name: r,
                            options: {},
                            drawLegendSymbol: e.drawRectangle,
                            visible: !0,
                            setState: p,
                            isDataClass: !0,
                            setVisible: function () {
                                g = this.visible = !g;
                                f(d.series, function (a) {
                                    f(a.points, function (a) {
                                        a.dataClass === u && a.setVisible(g)
                                    })
                                });
                                n.legend.colorizeItem(this, g)
                            }
                        }, c))
                    });
                    return m
                },
                name: ""
            });
        f(["fill", "stroke"], function (d) {
            a.Fx.prototype[d + "Setter"] = function () {
                this.elem.attr(d, D.prototype.tweenColors(A(this.start), A(this.end), this.pos), null, !0)
            }
        });
        x(F.prototype, "getAxes", function (a) {
            var d = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            d && new D(this, d)
        });
        x(t.prototype, "getAllItems", function (a) {
            var d =
                [], e = this.chart.colorAxis[0];
            e && e.options && (e.options.showInLegend && (e.options.dataClasses ? d = d.concat(e.getDataClassLegendSymbols()) : d.push(e)), f(e.series, function (a) {
                a.options.showInLegend = !1
            }));
            return d.concat(a.call(this))
        });
        x(t.prototype, "colorizeItem", function (a, d, e) {
            a.call(this, d, e);
            e && d.legendColor && d.legendSymbol.attr({fill: d.legendColor})
        })
    })(I);
    (function (a) {
        var y = a.defined, F = a.each, A = a.noop, D = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function () {
                return null !== this.value
            }, setVisible: function (a) {
                var f =
                    this, r = a ? "show" : "hide";
                F(["graphic", "dataLabel"], function (a) {
                    if (f[a]) f[a][r]()
                })
            }, setState: function (f) {
                a.Point.prototype.setState.call(this, f);
                this.graphic && this.graphic.attr({zIndex: "hover" === f ? 1 : 0})
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: A,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: D.column.prototype.pointAttribs,
            translateColors: function () {
                var a =
                    this, k = this.options.nullColor, r = this.colorAxis, t = this.colorKey;
                F(this.data, function (e) {
                    var f = e[t];
                    if (f = e.options.color || (e.isNull ? k : r && void 0 !== f ? r.toColor(f, e) : e.color || a.color)) e.color = f
                })
            },
            colorAttribs: function (a) {
                var f = {};
                y(a.color) && (f[this.colorProp || "fill"] = a.color);
                return f
            }
        }
    })(I);
    (function (a) {
        function y(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        var F = a.addEvent, A = a.Chart, D = a.doc, f = a.each, k = a.extend, r = a.merge, t = a.pick;
        a = a.wrap;
        k(A.prototype,
            {
                renderMapNavigation: function () {
                    var a = this, f = this.options.mapNavigation, d = f.buttons, q, x, v, n, m, c = function (b) {
                        this.handler.call(a, b);
                        y(b)
                    };
                    if (t(f.enableButtons, f.enabled) && !a.renderer.forExport)for (q in a.mapNavButtons = [], d)d.hasOwnProperty(q) && (v = r(f.buttonOptions, d[q]), x = v.theme, x.style = r(v.theme.style, v.style), m = (n = x.states) && n.hover, n = n && n.select, x = a.renderer.button(v.text, 0, 0, c, x, m, n, 0, "zoomIn" === q ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                        width: v.width, height: v.height,
                        title: a.options.lang[q], padding: v.padding, zIndex: 5
                    }).add(), x.handler = v.onclick, x.align(k(v, {
                        width: x.width,
                        height: 2 * x.height
                    }), null, v.alignTo), F(x.element, "dblclick", y), a.mapNavButtons.push(x))
                }, fitToBox: function (a, k) {
                f([["x", "width"], ["y", "height"]], function (d) {
                    var e = d[0];
                    d = d[1];
                    a[e] + a[d] > k[e] + k[d] && (a[d] > k[d] ? (a[d] = k[d], a[e] = k[e]) : a[e] = k[e] + k[d] - a[d]);
                    a[d] > k[d] && (a[d] = k[d]);
                    a[e] < k[e] && (a[e] = k[e])
                });
                return a
            }, mapZoom: function (a, f, d, k, r) {
                var e = this.xAxis[0], n = e.max - e.min, m = t(f, e.min + n / 2), c = n * a, n = this.yAxis[0],
                    b = n.max - n.min, p = t(d, n.min + b / 2), b = b * a, m = this.fitToBox({
                        x: m - c * (k ? (k - e.pos) / e.len : .5),
                        y: p - b * (r ? (r - n.pos) / n.len : .5),
                        width: c,
                        height: b
                    }, {
                        x: e.dataMin,
                        y: n.dataMin,
                        width: e.dataMax - e.dataMin,
                        height: n.dataMax - n.dataMin
                    }), c = m.x <= e.dataMin && m.width >= e.dataMax - e.dataMin && m.y <= n.dataMin && m.height >= n.dataMax - n.dataMin;
                k && (e.fixTo = [k - e.pos, f]);
                r && (n.fixTo = [r - n.pos, d]);
                void 0 === a || c ? (e.setExtremes(void 0, void 0, !1), n.setExtremes(void 0, void 0, !1)) : (e.setExtremes(m.x, m.x + m.width, !1), n.setExtremes(m.y, m.y + m.height, !1));
                this.redraw()
            }
            });
        a(A.prototype, "render", function (a) {
            var e = this, d = e.options.mapNavigation;
            e.renderMapNavigation();
            a.call(e);
            (t(d.enableDoubleClickZoom, d.enabled) || d.enableDoubleClickZoomTo) && F(e.container, "dblclick", function (a) {
                e.pointer.onContainerDblClick(a)
            });
            t(d.enableMouseWheelZoom, d.enabled) && F(e.container, void 0 === D.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) {
                e.pointer.onContainerMouseWheel(a);
                y(a);
                return !1
            })
        })
    })(I);
    (function (a) {
        var y = a.extend, F = a.pick, A = a.Pointer;
        a = a.wrap;
        y(A.prototype,
            {
                onContainerDblClick: function (a) {
                    var f = this.chart;
                    a = this.normalize(a);
                    f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(a.target, "highcharts-tracker") && f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop) && f.mapZoom(.5, f.xAxis[0].toValue(a.chartX), f.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
                }, onContainerMouseWheel: function (a) {
                var f = this.chart, k;
                a = this.normalize(a);
                k = a.detail || -(a.wheelDelta / 120);
                f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop) &&
                f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity, k), f.xAxis[0].toValue(a.chartX), f.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
            });
        a(A.prototype, "zoomOption", function (a) {
            var f = this.chart.options.mapNavigation;
            F(f.enableTouchZoom, f.enabled) && (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments, 1))
        });
        a(A.prototype, "pinchTranslate", function (a, f, k, r, t, e, p) {
            a.call(this, f, k, r, t, e, p);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = r.scaleX > r.scaleY, this.pinchTranslateDirection(!a,
                f, k, r, t, e, p, a ? r.scaleX : r.scaleY))
        })
    })(I);
    (function (a) {
        var y = a.color, F = a.ColorAxis, A = a.colorPointMixin, D = a.each, f = a.extend, k = a.isNumber, r = a.map, t = a.merge, e = a.noop, p = a.pick, d = a.isArray, q = a.Point, x = a.Series, v = a.seriesType, n = a.seriesTypes, m = a.splat, c = void 0 !== a.doc.documentElement.style.vectorEffect;
        v("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            },
            turboThreshold: 0,
            tooltip: {followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"},
            states: {normal: {animation: !0}, hover: {brightness: .2, halo: null}, select: {color: "#cccccc"}}
        }, t(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: e,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function (b) {
                var c = Number.MAX_VALUE, d = -c, g = c, e = -c, f = c, m = c, l = this.xAxis,
                    n = this.yAxis, q;
                D(b || [], function (b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var l = b.path || [], h = l.length, n = !1, r = -c, u = c, t = -c, v = c, x = b.properties;
                        if (!b._foundBox) {
                            for (; h--;)k(l[h]) && (n ? (r = Math.max(r, l[h]), u = Math.min(u, l[h])) : (t = Math.max(t, l[h]), v = Math.min(v, l[h])), n = !n);
                            b._midX = u + (r - u) * (b.middleX || x && x["hc-middle-x"] || .5);
                            b._midY = v + (t - v) * (b.middleY || x && x["hc-middle-y"] || .5);
                            b._maxX = r;
                            b._minX = u;
                            b._maxY = t;
                            b._minY = v;
                            b.labelrank = p(b.labelrank, (r - u) * (t - v));
                            b._foundBox = !0
                        }
                        d = Math.max(d,
                            b._maxX);
                        g = Math.min(g, b._minX);
                        e = Math.max(e, b._maxY);
                        f = Math.min(f, b._minY);
                        m = Math.min(b._maxX - b._minX, b._maxY - b._minY, m);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(f, p(this.minY, c)), this.maxY = Math.max(e, p(this.maxY, -c)), this.minX = Math.min(g, p(this.minX, c)), this.maxX = Math.max(d, p(this.maxX, -c)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * m, (this.maxX - this.minX) / 5, l.minRange || c)), n && void 0 === n.options.minRange && (n.minRange = Math.min(5 * m, (this.maxY - this.minY) / 5, n.minRange || c)))
            },
            getExtremes: function () {
                x.prototype.getExtremes.call(this,
                    this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function (a) {
                var b = !1, c = this.xAxis, d = this.yAxis, e = c.min, f = c.transA, c = c.minPixelPadding, m = d.min, l = d.transA, d = d.minPixelPadding, n, p = [];
                if (a)for (n = a.length; n--;)k(a[n]) ? (p[n] = b ? (a[n] - e) * f + c : (a[n] - m) * l + d, b = !b) : p[n] = a[n];
                return p
            },
            setData: function (b, c, e, g) {
                var f = this.options, n = this.chart.options.chart,
                    p = n && n.map, l = f.mapData, q = f.joinBy, u = null === q, v = f.keys || this.pointArrayMap, y = [], h = {}, E, A = this.chart.mapTransforms;
                !l && p && (l = "string" === typeof p ? a.maps[p] : p);
                u && (q = "_i");
                q = this.joinBy = m(q);
                q[1] || (q[1] = q[0]);
                b && D(b, function (a, c) {
                    var e = 0;
                    if (k(a)) b[c] = {value: a}; else if (d(a)) {
                        b[c] = {};
                        !f.keys && a.length > v.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++e);
                        for (var g = 0; g < v.length; ++g, ++e)v[g] && (b[c][v[g]] = a[e])
                    }
                    u && (b[c]._i = c)
                });
                this.getBox(b);
                if (this.chart.mapTransforms = A = n && n.mapTransforms || l && l["hc-transform"] ||
                        A)for (E in A)A.hasOwnProperty(E) && E.rotation && (E.cosAngle = Math.cos(E.rotation), E.sinAngle = Math.sin(E.rotation));
                if (l) {
                    "FeatureCollection" === l.type && (this.mapTitle = l.title, l = a.geojson(l, this.type, this));
                    this.mapData = l;
                    this.mapMap = {};
                    for (E = 0; E < l.length; E++)n = l[E], p = n.properties, n._i = E, q[0] && p && p[q[0]] && (n[q[0]] = p[q[0]]), h[n[q[0]]] = n;
                    this.mapMap = h;
                    b && q[1] && D(b, function (a) {
                        h[a[q[1]]] && y.push(h[a[q[1]]])
                    });
                    f.allAreas ? (this.getBox(l), b = b || [], q[1] && D(b, function (a) {
                            y.push(a[q[1]])
                        }), y = "|" + r(y, function (a) {
                                return a &&
                                    a[q[0]]
                            }).join("|") + "|", D(l, function (a) {
                            q[0] && -1 !== y.indexOf("|" + a[q[0]] + "|") || (b.push(t(a, {value: null})), g = !1)
                        })) : this.getBox(y)
                }
                x.prototype.setData.call(this, b, c, e, g)
            },
            drawGraph: e,
            drawDataLabels: e,
            doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function () {
                var a = this, c = a.xAxis, d = a.yAxis, e = a.doFullTranslate();
                a.generatePoints();
                D(a.data, function (b) {
                    b.plotX = c.toPixels(b._midX, !0);
                    b.plotY = d.toPixels(b._midY, !0);
                    e && (b.shapeType =
                        "path", b.shapeArgs = {d: a.translatePath(b.path)})
                });
                a.translateColors()
            },
            pointAttribs: function (a, d) {
                d = n.column.prototype.pointAttribs.call(this, a, d);
                a.isFading && delete d.fill;
                c ? d["vector-effect"] = "non-scaling-stroke" : d["stroke-width"] = "inherit";
                return d
            },
            drawPoints: function () {
                var a = this, d = a.xAxis, e = a.yAxis, g = a.group, f = a.chart, m = f.renderer, k, l, p, q, r = this.baseTrans, t, h, v, x, y;
                a.transformGroup || (a.transformGroup = m.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(g), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (f.hasRendered &&
                    D(a.points, function (b) {
                        b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                    }), a.group = a.transformGroup, n.column.prototype.drawPoints.apply(a), a.group = g, D(a.points, function (a) {
                        a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                    }), this.baseTrans = {
                        originX: d.min - d.minPixelPadding / d.transA,
                        originY: e.min - e.minPixelPadding / e.transA + (e.reversed ?
                            0 : e.len / e.transA),
                        transAX: d.transA,
                        transAY: e.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    })) : (k = d.transA / r.transAX, l = e.transA / r.transAY, p = d.toPixels(r.originX, !0), q = e.toPixels(r.originY, !0), .99 < k && 1.01 > k && .99 < l && 1.01 > l && (l = k = 1, p = Math.round(p), q = Math.round(q)), t = this.transformGroup, f.renderer.globalAnimation ? (h = t.attr("translateX"), v = t.attr("translateY"), x = t.attr("scaleX"), y = t.attr("scaleY"), t.attr({animator: 0}).animate({animator: 1}, {
                            step: function (a, b) {
                                t.attr({
                                    translateX: h +
                                    (p - h) * b.pos,
                                    translateY: v + (q - v) * b.pos,
                                    scaleX: x + (k - x) * b.pos,
                                    scaleY: y + (l - y) * b.pos
                                })
                            }
                        })) : t.attr({translateX: p, translateY: q, scaleX: k, scaleY: l}));
                c || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (k || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function () {
                x.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function () {
                var a = this, c = x.prototype.render;
                a.chart.renderer.isVML &&
                3E3 < a.data.length ? setTimeout(function () {
                        c.call(a)
                    }) : c.call(a)
            },
            animate: function (a) {
                var b = this.options.animation, c = this.group, d = this.xAxis, e = this.yAxis, f = d.pos, k = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {duration: 1E3}), a ? c.attr({
                        translateX: f + d.len / 2,
                        translateY: k + e.len / 2,
                        scaleX: .001,
                        scaleY: .001
                    }) : (c.animate({translateX: f, translateY: k, scaleX: 1, scaleY: 1}, b), this.animate = null))
            },
            animateDrilldown: function (a) {
                var b = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox, e = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, D(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function (a) {
                n.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function (a) {
                n.column.prototype.animateDrillupTo.call(this,
                    a)
            }
        }), f({
            applyOptions: function (a, c) {
                a = q.prototype.applyOptions.call(this, a, c);
                c = this.series;
                var b = c.joinBy;
                c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), f(a, b)) : a.value = a.value || null);
                return a
            }, onMouseOver: function (a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) q.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a)
            }, onMouseOut: function () {
                var a = this, c = +new Date, d = y(this.series.pointAttribs(a).fill), e = y(this.series.pointAttribs(a,
                    "hover").fill), f = a.series.options.states.normal.animation, k = f && (f.duration || 500);
                k && 4 === d.rgba.length && 4 === e.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function () {
                    var b = (new Date - c) / k, g = a.graphic;
                    1 < b && (b = 1);
                    g && g.attr("fill", F.prototype.tweenColors.call(0, e, d, b));
                    1 <= b && clearTimeout(a.colorInterval)
                }, 13), a.isFading = !0);
                q.prototype.onMouseOut.call(a);
                a.isFading = null
            }, zoomTo: function () {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY,
                    this._maxY, !1);
                a.chart.redraw()
            }
        }, A))
    })(I);
    (function (a) {
        var y = a.seriesType, F = a.seriesTypes;
        y("mapline", "map", {lineWidth: 1, fillColor: "none"}, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"},
            pointAttribs: function (a, y) {
                a = F.map.prototype.pointAttribs.call(this, a, y);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: F.line.prototype.drawLegendSymbol
        })
    })(I);
    (function (a) {
        var y = a.merge, F = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function () {
                    return this.point.name
                }, crop: !1, defer: !1, overflow: !1, style: {color: "#000000"}
            }
        }, {type: "mappoint", forceDL: !0}, {
            applyOptions: function (a, D) {
                a = void 0 !== a.lat && void 0 !== a.lon ? y(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return F.prototype.applyOptions.call(this, a, D)
            }
        })
    })(I);
    (function (a) {
        var y = a.arrayMax, F = a.arrayMin, A = a.Axis, D = a.color, f = a.each, k = a.isNumber, r = a.noop, t = a.pick, e = a.pInt, p = a.Point, d = a.Series, q = a.seriesType, x = a.seriesTypes;
        q("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                },
                inside: !0, verticalAlign: "middle"
            },
            marker: {lineColor: null, lineWidth: 1, radius: null, states: {hover: {radiusPlus: 0}}, symbol: "circle"},
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {hover: {halo: {size: 5}}},
            tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["markerGroup", "dataLabelsGroup"],
            bubblePadding: !0,
            zoneAxis: "z",
            pointAttribs: function (a, e) {
                var f = t(this.options.marker.fillOpacity,
                    .5);
                a = d.prototype.pointAttribs.call(this, a, e);
                1 !== f && (a.fill = D(a.fill).setOpacity(f).get("rgba"));
                return a
            },
            getRadii: function (a, d, e, c) {
                var b, f, k, g = this.zData, m = [], n = this.options, p = "width" !== n.sizeBy, l = n.zThreshold, q = d - a;
                f = 0;
                for (b = g.length; f < b; f++)k = g[f], n.sizeByAbsoluteValue && null !== k && (k = Math.abs(k - l), d = Math.max(d - l, Math.abs(a - l)), a = 0), null === k ? k = null : k < a ? k = e / 2 - 1 : (k = 0 < q ? (k - a) / q : .5, p && 0 <= k && (k = Math.sqrt(k)), k = Math.ceil(e + k * (c - e)) / 2), m.push(k);
                this.radii = m
            },
            animate: function (a) {
                var d = this.options.animation;
                a || (f(this.points, function (a) {
                    var c = a.graphic, b;
                    c && c.width && (b = {x: c.x, y: c.y, width: c.width, height: c.height}, c.attr({
                        x: a.plotX,
                        y: a.plotY,
                        width: 1,
                        height: 1
                    }), c.animate(b, d))
                }), this.animate = null)
            },
            translate: function () {
                var a, d = this.data, e, c, b = this.radii;
                x.scatter.prototype.translate.call(this);
                for (a = d.length; a--;)e = d[a], c = b ? b[a] : 0, k(c) && c >= this.minPxSize / 2 ? (e.marker = {
                        radius: c,
                        width: 2 * c,
                        height: 2 * c
                    }, e.dlBox = {
                        x: e.plotX - c,
                        y: e.plotY - c,
                        width: 2 * c,
                        height: 2 * c
                    }) : e.shapeArgs = e.plotY = e.dlBox = void 0
            },
            alignDataLabel: x.column.prototype.alignDataLabel,
            buildKDTree: r,
            applyZones: r
        }, {
            haloPath: function (a) {
                return p.prototype.haloPath.call(this, 0 === a ? 0 : this.marker.radius + a)
            }, ttBelow: !1
        });
        A.prototype.beforePadding = function () {
            var a = this, d = this.len, m = this.chart, c = 0, b = d, p = this.isXAxis, q = p ? "xData" : "yData", g = this.min, r = {}, x = Math.min(m.plotWidth, m.plotHeight), A = Number.MAX_VALUE, l = -Number.MAX_VALUE, B = this.max - g, D = d / B, I = [];
            f(this.series, function (b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && m.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, I.push(b),
                p && (f(["minSize", "maxSize"], function (a) {
                    var b = c[a], d = /%$/.test(b), b = e(b);
                    r[a] = d ? x * b / 100 : b
                }), b.minPxSize = r.minSize, b.maxPxSize = Math.max(r.maxSize, r.minSize), b = b.zData, b.length && (A = t(c.zMin, Math.min(A, Math.max(F(b), !1 === c.displayNegative ? c.zThreshold : -Number.MAX_VALUE))), l = t(c.zMax, Math.max(l, y(b))))))
            });
            f(I, function (d) {
                var e = d[q], f = e.length, m;
                p && d.getRadii(A, l, d.minPxSize, d.maxPxSize);
                if (0 < B)for (; f--;)k(e[f]) && a.dataMin <= e[f] && e[f] <= a.dataMax && (m = d.radii[f], c = Math.min((e[f] - g) * D - m, c), b = Math.max((e[f] -
                    g) * D + m, b))
            });
            I.length && 0 < B && !this.isLog && (b -= d, D *= (d + c - b) / d, f([["min", "userMin", c], ["max", "userMax", b]], function (b) {
                void 0 === t(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / D)
            }))
        }
    })(I);
    (function (a) {
        var y = a.merge, F = a.Point, A = a.seriesType, D = a.seriesTypes;
        D.bubble && A("mapbubble", "bubble", {
                animationLimit: 500,
                tooltip: {pointFormat: "{point.name}: {point.z}"}
            }, {
                xyFromShape: !0,
                type: "mapbubble",
                pointArrayMap: ["z"],
                getMapData: D.map.prototype.getMapData,
                getBox: D.map.prototype.getBox,
                setData: D.map.prototype.setData
            },
            {
                applyOptions: function (a, k) {
                    return a && void 0 !== a.lat && void 0 !== a.lon ? F.prototype.applyOptions.call(this, y(a, this.series.chart.fromLatLonToPoint(a)), k) : D.map.prototype.pointClass.prototype.applyOptions.call(this, a, k)
                }, ttBelow: !1
            })
    })(I);
    (function (a) {
        var y = a.colorPointMixin, F = a.each, A = a.merge, D = a.noop, f = a.pick, k = a.Series, r = a.seriesType, t = a.seriesTypes;
        r("heatmap", "scatter", {
                animation: !1,
                borderWidth: 0,
                nullColor: "#f7f7f7",
                dataLabels: {
                    formatter: function () {
                        return this.point.value
                    }, inside: !0, verticalAlign: "middle",
                    crop: !1, overflow: !1, padding: 0
                },
                marker: null,
                pointRange: null,
                tooltip: {pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},
                states: {normal: {animation: !0}, hover: {halo: !1, brightness: .2}}
            }, A(a.colorSeriesMixin, {
                pointArrayMap: ["y", "value"],
                hasPointSpecificOptions: !0,
                supportsDrilldown: !0,
                getExtremesFromAll: !0,
                directTouch: !0,
                init: function () {
                    var a;
                    t.scatter.prototype.init.apply(this, arguments);
                    a = this.options;
                    a.pointRange = f(a.pointRange, a.colsize || 1);
                    this.yAxis.axisPointRange = a.rowsize || 1
                },
                translate: function () {
                    var a =
                        this.options, f = this.xAxis, d = this.yAxis, k = function (a, d, e) {
                        return Math.min(Math.max(d, a), e)
                    };
                    this.generatePoints();
                    F(this.points, function (e) {
                        var p = (a.colsize || 1) / 2, n = (a.rowsize || 1) / 2, m = k(Math.round(f.len - f.translate(e.x - p, 0, 1, 0, 1)), -f.len, 2 * f.len), p = k(Math.round(f.len - f.translate(e.x + p, 0, 1, 0, 1)), -f.len, 2 * f.len), c = k(Math.round(d.translate(e.y - n, 0, 1, 0, 1)), -d.len, 2 * d.len), n = k(Math.round(d.translate(e.y + n, 0, 1, 0, 1)), -d.len, 2 * d.len);
                        e.plotX = e.clientX = (m + p) / 2;
                        e.plotY = (c + n) / 2;
                        e.shapeType = "rect";
                        e.shapeArgs =
                            {x: Math.min(m, p), y: Math.min(c, n), width: Math.abs(p - m), height: Math.abs(n - c)}
                    });
                    this.translateColors()
                },
                drawPoints: function () {
                    t.column.prototype.drawPoints.call(this);
                    F(this.points, function (a) {
                        a.graphic.attr(this.colorAttribs(a))
                    }, this)
                },
                animate: D,
                getBox: D,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                alignDataLabel: t.column.prototype.alignDataLabel,
                getExtremes: function () {
                    k.prototype.getExtremes.call(this, this.valueData);
                    this.valueMin = this.dataMin;
                    this.valueMax = this.dataMax;
                    k.prototype.getExtremes.call(this)
                }
            }),
            y)
    })(I);
    (function (a) {
        function y(a, f) {
            var d, e, k, p = !1, n = a.x, m = a.y;
            a = 0;
            for (d = f.length - 1; a < f.length; d = a++)e = f[a][1] > m, k = f[d][1] > m, e !== k && n < (f[d][0] - f[a][0]) * (m - f[a][1]) / (f[d][1] - f[a][1]) + f[a][0] && (p = !p);
            return p
        }

        var F = a.Chart, A = a.each, D = a.extend, f = a.format, k = a.merge, r = a.win, t = a.wrap;
        F.prototype.transformFromLatLon = function (e, f) {
            if (void 0 === r.proj4)return a.error(21), {x: 0, y: null};
            e = r.proj4(f.crs, [e.lon, e.lat]);
            var d = f.cosAngle || f.rotation && Math.cos(f.rotation), k = f.sinAngle || f.rotation && Math.sin(f.rotation);
            e = f.rotation ? [e[0] * d + e[1] * k, -e[0] * k + e[1] * d] : e;
            return {
                x: ((e[0] - (f.xoffset || 0)) * (f.scale || 1) + (f.xpan || 0)) * (f.jsonres || 1) + (f.jsonmarginX || 0),
                y: (((f.yoffset || 0) - e[1]) * (f.scale || 1) + (f.ypan || 0)) * (f.jsonres || 1) - (f.jsonmarginY || 0)
            }
        };
        F.prototype.transformToLatLon = function (e, f) {
            if (void 0 === r.proj4) a.error(21); else {
                e = {
                    x: ((e.x - (f.jsonmarginX || 0)) / (f.jsonres || 1) - (f.xpan || 0)) / (f.scale || 1) + (f.xoffset || 0),
                    y: ((-e.y - (f.jsonmarginY || 0)) / (f.jsonres || 1) + (f.ypan || 0)) / (f.scale || 1) + (f.yoffset || 0)
                };
                var d = f.cosAngle || f.rotation &&
                    Math.cos(f.rotation), k = f.sinAngle || f.rotation && Math.sin(f.rotation);
                f = r.proj4(f.crs, "WGS84", f.rotation ? {x: e.x * d + e.y * -k, y: e.x * k + e.y * d} : e);
                return {lat: f.y, lon: f.x}
            }
        };
        F.prototype.fromPointToLatLon = function (e) {
            var f = this.mapTransforms, d;
            if (f) {
                for (d in f)if (f.hasOwnProperty(d) && f[d].hitZone && y({
                        x: e.x,
                        y: -e.y
                    }, f[d].hitZone.coordinates[0]))return this.transformToLatLon(e, f[d]);
                return this.transformToLatLon(e, f["default"])
            }
            a.error(22)
        };
        F.prototype.fromLatLonToPoint = function (e) {
            var f = this.mapTransforms, d, k;
            if (!f)return a.error(22), {x: 0, y: null};
            for (d in f)if (f.hasOwnProperty(d) && f[d].hitZone && (k = this.transformFromLatLon(e, f[d]), y({
                    x: k.x,
                    y: -k.y
                }, f[d].hitZone.coordinates[0])))return k;
            return this.transformFromLatLon(e, f["default"])
        };
        a.geojson = function (a, k, d) {
            var e = [], p = [], r = function (a) {
                var d, c = a.length;
                p.push("M");
                for (d = 0; d < c; d++)1 === d && p.push("L"), p.push(a[d][0], -a[d][1])
            };
            k = k || "map";
            A(a.features, function (a) {
                var d = a.geometry, c = d.type, d = d.coordinates;
                a = a.properties;
                var b;
                p = [];
                "map" === k || "mapbubble" ===
                k ? ("Polygon" === c ? (A(d, r), p.push("Z")) : "MultiPolygon" === c && (A(d, function (a) {
                            A(a, r)
                        }), p.push("Z")), p.length && (b = {path: p})) : "mapline" === k ? ("LineString" === c ? r(d) : "MultiLineString" === c && A(d, r), p.length && (b = {path: p})) : "mappoint" === k && "Point" === c && (b = {
                            x: d[0],
                            y: -d[1]
                        });
                b && e.push(D(b, {name: a.name || a.NAME, properties: a}))
            });
            // d && a.copyrightShort && (d.chart.mapCredits = f(d.chart.options.credits.mapText, {geojson: a}), d.chart.mapCreditsFull = f(d.chart.options.credits.mapTextFull, {geojson: a}));
            return e
        };
        t(F.prototype,
            "addCredits", function (a, f) {
                f = k(!0, this.options.credits, f);
                this.mapCredits && (f.href = null);
                a.call(this, f);
                this.credits && this.mapCreditsFull && this.credits.attr({title: this.mapCreditsFull})
            })
    })(I);
    (function (a) {
        function y(a, e, f, k, n, m, c, b) {
            return ["M", a + n, e, "L", a + f - m, e, "C", a + f - m / 2, e, a + f, e + m / 2, a + f, e + m, "L", a + f, e + k - c, "C", a + f, e + k - c / 2, a + f - c / 2, e + k, a + f - c, e + k, "L", a + b, e + k, "C", a + b / 2, e + k, a, e + k - b / 2, a, e + k - b, "L", a, e + n, "C", a, e + n / 2, a + n / 2, e, a + n, e, "Z"]
        }

        var F = a.Chart, A = a.defaultOptions, D = a.each, f = a.extend, k = a.merge, r = a.pick,
            t = a.Renderer, e = a.SVGRenderer, p = a.VMLRenderer;
        f(A.lang, {zoomIn: "Zoom in", zoomOut: "Zoom out"});
        A.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {fontSize: "15px", fontWeight: "bold"},
                theme: {"stroke-width": 1, "text-align": "center"}
            }, buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    }, text: "+", y: 0
                }, zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    }, text: "-", y: 28
                }
            }, mouseWheelSensitivity: 1.1
        };
        a.splitPath = function (a) {
            var d;
            a = a.replace(/([A-Za-z])/g,
                " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++)/[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        e.prototype.symbols.topbutton = function (a, e, f, k, n) {
            return y(a - 1, e - 1, f, k, n.r, n.r, 0, 0)
        };
        e.prototype.symbols.bottombutton = function (a, e, f, k, n) {
            return y(a - 1, e - 1, f, k, 0, 0, n.r, n.r)
        };
        t === p && D(["topbutton", "bottombutton"], function (a) {
            p.prototype.symbols[a] = e.prototype.symbols[a]
        });
        a.Map = a.mapChart = function (d, e, f) {
            var p = "string" === typeof d || d.nodeName,
                n = arguments[p ? 1 : 0], m = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                }, c, b = a.getOptions().credits;
            c = n.series;
            n.series = null;
            n = k({
                chart: {panning: "xy", type: "map"},
                credits: {
                    mapText: r(b.mapText, ' '),
                    mapTextFull: r(b.mapTextFull, "")
                },
                tooltip: {followTouchMove: !1},
                xAxis: m,
                yAxis: k(m, {reversed: !0})
            }, n, {chart: {inverted: !1, alignTicks: !1}});
            n.series = c;
            return p ? new F(d, n, f) : new F(n, e)
        }
    })(I);
    return I
});
