! function (e) {
    function t(e, t, s) {
        var n = e[0],
            r = /er/.test(s) ? v : /bl/.test(s) ? p : f,
            o = s == g ? {
                checked: n[f],
                disabled: n[p],
                indeterminate: "true" == e.attr(v) || "false" == e.attr(b)
            } : n[r];
        if (/^(ch|di|in)/.test(s) && !o) i(e, r);
        else if (/^(un|en|de)/.test(s) && o) a(e, r);
        else if (s == g)
            for (var r in o) o[r] ? i(e, r, !0) : a(e, r, !0);
        else t && "toggle" != s || (t || e[x]("ifClicked"), o ? n[y] !== u && a(e, r) : i(e, r))
    }

    function i(t, i, s) {
        var l = t[0],
            g = t.parent(),
            k = i == f,
            m = i == v,
            x = i == p,
            A = m ? b : k ? h : "enabled",
            j = n(t, A + r(l[y])),
            D = n(t, i + r(l[y]));
        if (l[i] !== !0) {
            if (!s && i == f && l[y] == u && l.name) {
                var P = t.closest("form"),
                    T = 'input[name="' + l.name + '"]';
                T = P.length ? P.find(T) : e(T), T.each(function () {
                    this !== l && e(this).data(d) && a(e(this), i)
                })
            }
            m ? (l[i] = !0, l[f] && a(t, f, "force")) : (s || (l[i] = !0), k && l[v] && a(t, v, !1)), o(t, k, i, s)
        }
        l[p] && n(t, H, !0) && g.find("." + c).css(H, "default"), g[C](D || n(t, i) || ""), x ? g.attr("aria-disabled", "true") : g.attr("aria-checked", m ? "mixed" : "true"), g[w](j || n(t, A) || "")
    }

    function a(e, t, i) {
        var a = e[0],
            s = e.parent(),
            d = t == f,
            l = t == v,
            u = t == p,
            g = l ? b : d ? h : "enabled",
            k = n(e, g + r(a[y])),
            m = n(e, t + r(a[y]));
        a[t] !== !1 && ((l || !i || "force" == i) && (a[t] = !1), o(e, d, g, i)), !a[p] && n(e, H, !0) && s.find("." + c).css(H, "pointer"), s[w](m || n(e, t) || ""), u ? s.attr("aria-disabled", "false") : s.attr("aria-checked", "false"), s[C](k || n(e, g) || "")
    }

    function s(t, i) {
        t.data(d) && (t.parent().html(t.attr("style", t.data(d).s || "")), i && t[x](i), t.off(".i").unwrap(), e(A + '[for="' + t[0].id + '"]').add(t.closest(A)).off(".i"))
    }

    function n(e, t, i) {
        return e.data(d) ? e.data(d).o[t + (i ? "" : "Class")] : void 0
    }

    function r(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function o(e, t, i, a) {
        a || (t && e[x]("ifToggled"), e[x]("ifChanged")[x]("if" + r(i)))
    }
    var d = "iCheck",
        c = d + "-helper",
        l = "checkbox",
        u = "radio",
        f = "checked",
        h = "un" + f,
        p = "disabled",
        b = "determinate",
        v = "in" + b,
        g = "update",
        y = "type",
        k = "click",
        m = "touchbegin.i touchend.i",
        C = "addClass",
        w = "removeClass",
        x = "trigger",
        A = "label",
        H = "cursor",
        j = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
    e.fn[d] = function (n, r) {
        var o = 'input[type="' + l + '"], input[type="' + u + '"]',
            h = e(),
            b = function (t) {
                t.each(function () {
                    var t = e(this);
                    h = h.add(t.is(o) ? t : t.find(o))
                })
            };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(n)) return n = n.toLowerCase(), b(this), h.each(function () {
            var i = e(this);
            "destroy" == n ? s(i, "ifDestroyed") : t(i, !0, n), e.isFunction(r) && r()
        });
        if ("object" != typeof n && n) return this;
        var H = e.extend({
                checkedClass: f,
                disabledClass: p,
                indeterminateClass: v,
                labelHover: !0,
                aria: !1
            }, n),
            D = H.handle,
            P = H.hoverClass || "hover",
            T = H.focusClass || "focus",
            F = H.activeClass || "active",
            I = !!H.labelHover,
            L = H.labelHoverClass || "hover",
            M = 0 | ("" + H.increaseArea).replace("%", "");
        return (D == l || D == u) && (o = 'input[type="' + D + '"]'), -50 > M && (M = -50), b(this), h.each(function () {
            var n = e(this);
            s(n);
            var r, o = this,
                h = o.id,
                b = -M + "%",
                v = 100 + 2 * M + "%",
                D = {
                    position: "absolute",
                    top: b,
                    left: b,
                    display: "block",
                    width: v,
                    height: v,
                    margin: 0,
                    padding: 0,
                    background: "#fff",
                    border: 0,
                    opacity: 0
                },
                N = j ? {
                    position: "absolute",
                    visibility: "hidden"
                } : M ? D : {
                    position: "absolute",
                    opacity: 0
                },
                Q = o[y] == l ? H.checkboxClass || "i" + l : H.radioClass || "i" + u,
                S = e(A + '[for="' + h + '"]').add(n.closest(A)),
                U = !!H.aria,
                Z = d + "-" + Math.random().toString(36).substr(2, 6),
                $ = '<div class="' + Q + '" ' + (U ? 'role="' + o[y] + '" ' : "");
            U && S.each(function () {
                $ += 'aria-labelledby="', this.id ? $ += this.id : (this.id = Z, $ += Z), $ += '"'
            }), $ = n.wrap($ + "/>")[x]("ifCreated").parent().append(H.insert), r = e('<ins class="' + c + '"/>').css(D).appendTo($), n.data(d, {
                o: H,
                s: n.attr("style")
            }).css(N), !!H.inheritClass && $[C](o.className || ""), !!H.inheritID && h && $.attr("id", d + "-" + h), "static" == $.css("position") && $.css("position", "relative"), t(n, !0, g), S.length && S.on(k + ".i mouseover.i mouseout.i " + m, function (i) {
                var a = i[y],
                    s = e(this);
                if (!o[p]) {
                    if (a == k) {
                        if (e(i.target).is("a")) return;
                        t(n, !1, !0)
                    } else I && (/ut|nd/.test(a) ? ($[w](P), s[w](L)) : ($[C](P), s[C](L)));
                    if (!j) return !1;
                    i.stopPropagation()
                }
            }), n.on(k + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (e) {
                var t = e[y],
                    s = e.keyCode;
                return t == k ? !1 : "keydown" == t && 32 == s ? (o[y] == u && o[f] || (o[f] ? a(n, f) : i(n, f)), !1) : void("keyup" == t && o[y] == u ? !o[f] && i(n, f) : /us|ur/.test(t) && $["blur" == t ? w : C](T))
            }), r.on(k + " mousedown mouseup mouseover mouseout " + m, function (e) {
                var i = e[y],
                    a = /wn|up/.test(i) ? F : P;
                if (!o[p]) {
                    if (i == k ? t(n, !1, !0) : (/wn|er|in/.test(i) ? $[C](a) : $[w](a + " " + F), S.length && I && a == P && S[/ut|nd/.test(i) ? w : C](L)), !j) return !1;
                    e.stopPropagation()
                }
            })
        })
    }
}(window.jQuery || window.Zepto);