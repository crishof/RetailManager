/*! jQuery v4.0.0 | (c) OpenJS Foundation and other contributors | jquery.com/license */
!(function(e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, true) : t(e);
})("undefined" != typeof window ? window : this, function(e, t) {
  "use strict";
  if (!e.document) throw Error("jQuery requires a window with a document");
  var n = [], r = Object.getPrototypeOf, i = n.slice, o = n.flat ? function(e10) {
    return n.flat.call(e10);
  } : function(e10) {
    return n.concat.apply([], e10);
  }, a = n.push, s = n.indexOf, u = {}, l = u.toString, c = u.hasOwnProperty, f = c.toString, p = f.call(Object), d = {};
  function h(e10) {
    return null == e10 ? e10 + "" : "object" == typeof e10 ? u[l.call(e10)] || "object" : typeof e10;
  }
  function g(e10) {
    return null != e10 && e10 === e10.window;
  }
  function v(e10) {
    var t10 = !!e10 && e10.length, n2 = h(e10);
    return !("function" == typeof e10 || g(e10)) && ("array" === n2 || 0 === t10 || "number" == typeof t10 && t10 > 0 && t10 - 1 in e10);
  }
  var y = e.document, m = { type: true, src: true, nonce: true, noModule: true };
  function x(e10, t10, n2) {
    var r2, i2 = (n2 = n2 || y).createElement("script");
    for (r2 in i2.text = e10, m) t10 && t10[r2] && (i2[r2] = t10[r2]);
    n2.head.appendChild(i2).parentNode && i2.parentNode.removeChild(i2);
  }
  var b = "4.0.0", w = /HTML$/i, T = function(e10, t10) {
    return new T.fn.init(e10, t10);
  };
  function C(e10, t10) {
    return e10.nodeName && e10.nodeName.toLowerCase() === t10.toLowerCase();
  }
  T.fn = T.prototype = { jquery: b, constructor: T, length: 0, toArray: function() {
    return i.call(this);
  }, get: function(e10) {
    return null == e10 ? i.call(this) : e10 < 0 ? this[e10 + this.length] : this[e10];
  }, pushStack: function(e10) {
    var t10 = T.merge(this.constructor(), e10);
    return t10.prevObject = this, t10;
  }, each: function(e10) {
    return T.each(this, e10);
  }, map: function(e10) {
    return this.pushStack(T.map(this, function(t10, n2) {
      return e10.call(t10, n2, t10);
    }));
  }, slice: function() {
    return this.pushStack(i.apply(this, arguments));
  }, first: function() {
    return this.eq(0);
  }, last: function() {
    return this.eq(-1);
  }, even: function() {
    return this.pushStack(T.grep(this, function(e10, t10) {
      return (t10 + 1) % 2;
    }));
  }, odd: function() {
    return this.pushStack(T.grep(this, function(e10, t10) {
      return t10 % 2;
    }));
  }, eq: function(e10) {
    var t10 = this.length, n2 = +e10 + (e10 < 0 ? t10 : 0);
    return this.pushStack(n2 >= 0 && n2 < t10 ? [this[n2]] : []);
  }, end: function() {
    return this.prevObject || this.constructor();
  } }, T.extend = T.fn.extend = function() {
    var e10, t10, n2, r2, i2, o2, a2 = arguments[0] || {}, s2 = 1, u2 = arguments.length, l2 = false;
    for ("boolean" == typeof a2 && (l2 = a2, a2 = arguments[s2] || {}, s2++), "object" != typeof a2 && "function" != typeof a2 && (a2 = {}), s2 === u2 && (a2 = this, s2--); s2 < u2; s2++) if (null != (e10 = arguments[s2])) for (t10 in e10) r2 = e10[t10], "__proto__" !== t10 && a2 !== r2 && (l2 && r2 && (T.isPlainObject(r2) || (i2 = Array.isArray(r2))) ? (n2 = a2[t10], o2 = i2 && !Array.isArray(n2) ? [] : i2 || T.isPlainObject(n2) ? n2 : {}, i2 = false, a2[t10] = T.extend(l2, o2, r2)) : void 0 !== r2 && (a2[t10] = r2));
    return a2;
  }, T.extend({ expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""), isReady: true, error: function(e10) {
    throw Error(e10);
  }, noop: function() {
  }, isPlainObject: function(e10) {
    var t10, n2;
    return !!e10 && "[object Object]" === l.call(e10) && (!(t10 = r(e10)) || "function" == typeof (n2 = c.call(t10, "constructor") && t10.constructor) && f.call(n2) === p);
  }, isEmptyObject: function(e10) {
    var t10;
    for (t10 in e10) return false;
    return true;
  }, globalEval: function(e10, t10, n2) {
    x(e10, { nonce: t10 && t10.nonce }, n2);
  }, each: function(e10, t10) {
    var n2, r2 = 0;
    if (v(e10)) for (n2 = e10.length; r2 < n2 && false !== t10.call(e10[r2], r2, e10[r2]); r2++) ;
    else for (r2 in e10) if (false === t10.call(e10[r2], r2, e10[r2])) break;
    return e10;
  }, text: function(e10) {
    var t10, n2 = "", r2 = 0, i2 = e10.nodeType;
    if (!i2) while (t10 = e10[r2++]) n2 += T.text(t10);
    return 1 === i2 || 11 === i2 ? e10.textContent : 9 === i2 ? e10.documentElement.textContent : 3 === i2 || 4 === i2 ? e10.nodeValue : n2;
  }, makeArray: function(e10, t10) {
    var n2 = t10 || [];
    return null != e10 && (v(Object(e10)) ? T.merge(n2, "string" == typeof e10 ? [e10] : e10) : a.call(n2, e10)), n2;
  }, inArray: function(e10, t10, n2) {
    return null == t10 ? -1 : s.call(t10, e10, n2);
  }, isXMLDoc: function(e10) {
    var t10 = e10 && e10.namespaceURI, n2 = e10 && (e10.ownerDocument || e10).documentElement;
    return !w.test(t10 || n2 && n2.nodeName || "HTML");
  }, contains: function(e10, t10) {
    var n2 = t10 && t10.parentNode;
    return e10 === n2 || !!(n2 && 1 === n2.nodeType && (e10.contains ? e10.contains(n2) : e10.compareDocumentPosition && 16 & e10.compareDocumentPosition(n2)));
  }, merge: function(e10, t10) {
    for (var n2 = +t10.length, r2 = 0, i2 = e10.length; r2 < n2; r2++) e10[i2++] = t10[r2];
    return e10.length = i2, e10;
  }, grep: function(e10, t10, n2) {
    for (var r2 = [], i2 = 0, o2 = e10.length, a2 = !n2; i2 < o2; i2++) !t10(e10[i2], i2) !== a2 && r2.push(e10[i2]);
    return r2;
  }, map: function(e10, t10, n2) {
    var r2, i2, a2 = 0, s2 = [];
    if (v(e10)) for (r2 = e10.length; a2 < r2; a2++) null != (i2 = t10(e10[a2], a2, n2)) && s2.push(i2);
    else for (a2 in e10) null != (i2 = t10(e10[a2], a2, n2)) && s2.push(i2);
    return o(s2);
  }, guid: 1, support: d }), "function" == typeof Symbol && (T.fn[Symbol.iterator] = n[Symbol.iterator]), T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e10, t10) {
    u["[object " + t10 + "]"] = t10.toLowerCase();
  });
  var j = n.pop, E = "[\\x20\\t\\r\\n\\f]", k = y.documentMode, S = k && RegExp(":enabled|:disabled|\\[" + E + "*name" + E + "*=" + E + `*(?:''|"")`), D = RegExp("^" + E + "+|((?:^|[^\\\\])(?:\\\\.)*)" + E + "+$", "g"), A = "(?:\\\\[\\da-fA-F]{1,6}" + E + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", N = RegExp("^" + E + "*([>+~]|" + E + ")" + E + "*"), q = RegExp(E + "|>"), O = /[+~]/, L = y.documentElement, H = L.matches || L.msMatchesSelector;
  function P() {
    var e10 = [];
    function t10(n2, r2) {
      return e10.push(n2 + " ") > T.expr.cacheLength && delete t10[e10.shift()], t10[n2 + " "] = r2;
    }
    return t10;
  }
  function R(e10) {
    return e10 && void 0 !== e10.getElementsByTagName && e10;
  }
  var M = "\\[" + E + "*(" + A + ")(?:" + E + "*([*^$|!~]?=)" + E + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + A + "))|)" + E + "*\\]", W = ":(" + A + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + M + ")*)|.*)\\)|)", $ = { ID: RegExp("^#(" + A + ")"), CLASS: RegExp("^\\.(" + A + ")"), TAG: RegExp("^(" + A + "|[*])"), ATTR: RegExp("^" + M), PSEUDO: RegExp("^" + W), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + E + "*(even|odd|(([+-]|)(\\d*)n|)" + E + "*(?:([+-]|)" + E + "*(\\d+)|))" + E + "*\\)|)", "i") }, I = new RegExp(W), F = RegExp("\\\\[\\da-fA-F]{1,6}" + E + "?|\\\\([^\\r\\n\\f])", "g"), B = function(e10, t10) {
    var n2 = "0x" + e10.slice(1) - 65536;
    return t10 || (n2 < 0 ? String.fromCharCode(n2 + 65536) : String.fromCharCode(n2 >> 10 | 55296, 1023 & n2 | 56320));
  };
  function _(e10) {
    return e10.replace(F, B);
  }
  function U(e10) {
    T.error("Syntax error, unrecognized expression: " + e10);
  }
  var X = RegExp("^" + E + "*," + E + "*"), z = P();
  function Y(e10, t10) {
    var n2, r2, i2, o2, a2, s2, u2, l2 = z[e10 + " "];
    if (l2) return t10 ? 0 : l2.slice(0);
    a2 = e10, s2 = [], u2 = T.expr.preFilter;
    while (a2) {
      for (o2 in (!n2 || (r2 = X.exec(a2))) && (r2 && (a2 = a2.slice(r2[0].length) || a2), s2.push(i2 = [])), n2 = false, (r2 = N.exec(a2)) && (n2 = r2.shift(), i2.push({ value: n2, type: r2[0].replace(D, " ") }), a2 = a2.slice(n2.length)), $) (r2 = T.expr.match[o2].exec(a2)) && (!u2[o2] || (r2 = u2[o2](r2))) && (n2 = r2.shift(), i2.push({ value: n2, type: o2, matches: r2 }), a2 = a2.slice(n2.length));
      if (!n2) break;
    }
    return t10 ? a2.length : a2 ? U(e10) : z(e10, s2).slice(0);
  }
  function G(e10) {
    for (var t10 = 0, n2 = e10.length, r2 = ""; t10 < n2; t10++) r2 += e10[t10].value;
    return r2;
  }
  function V(e10, t10, n2, r2, i2, o2, a2) {
    var s2 = 0, u2 = e10.length, l2 = null == n2;
    if ("object" === h(n2)) for (s2 in i2 = true, n2) V(e10, t10, s2, n2[s2], true, o2, a2);
    else if (void 0 !== r2 && (i2 = true, "function" != typeof r2 && (a2 = true), l2 && (a2 ? (t10.call(e10, r2), t10 = null) : (l2 = t10, t10 = function(e11, t11, n3) {
      return l2.call(T(e11), n3);
    })), t10)) for (; s2 < u2; s2++) t10(e10[s2], n2, a2 ? r2 : r2.call(e10[s2], s2, t10(e10[s2], n2)));
    return i2 ? e10 : l2 ? t10.call(e10) : u2 ? t10(e10[0], n2) : o2;
  }
  var Q = /[^\x20\t\r\n\f]+/g;
  T.fn.extend({ attr: function(e10, t10) {
    return V(this, T.attr, e10, t10, arguments.length > 1);
  }, removeAttr: function(e10) {
    return this.each(function() {
      T.removeAttr(this, e10);
    });
  } }), T.extend({ attr: function(e10, t10, n2) {
    var r2, i2, o2 = e10.nodeType;
    if (3 !== o2 && 8 !== o2 && 2 !== o2) return void 0 === e10.getAttribute ? T.prop(e10, t10, n2) : (1 === o2 && T.isXMLDoc(e10) || (i2 = T.attrHooks[t10.toLowerCase()]), void 0 !== n2) ? null === n2 || false === n2 && 0 !== t10.toLowerCase().indexOf("aria-") ? void T.removeAttr(e10, t10) : i2 && "set" in i2 && void 0 !== (r2 = i2.set(e10, n2, t10)) ? r2 : (e10.setAttribute(t10, n2), n2) : i2 && "get" in i2 && null !== (r2 = i2.get(e10, t10)) ? r2 : null == (r2 = e10.getAttribute(t10)) ? void 0 : r2;
  }, attrHooks: {}, removeAttr: function(e10, t10) {
    var n2, r2 = 0, i2 = t10 && t10.match(Q);
    if (i2 && 1 === e10.nodeType) while (n2 = i2[r2++]) e10.removeAttribute(n2);
  } }), k && (T.attrHooks.type = { set: function(e10, t10) {
    if ("radio" === t10 && C(e10, "input")) {
      var n2 = e10.value;
      return e10.setAttribute("type", t10), n2 && (e10.value = n2), t10;
    }
  } });
  var J = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function K(e10, t10) {
    return t10 ? "\0" === e10 ? "\uFFFD" : e10.slice(0, -1) + "\\" + e10.charCodeAt(e10.length - 1).toString(16) + " " : "\\" + e10;
  }
  T.escapeSelector = function(e10) {
    return (e10 + "").replace(J, K);
  };
  var Z = n.sort, ee = n.splice;
  function et(e10, t10) {
    if (e10 === t10) return en = true, 0;
    var n2 = !e10.compareDocumentPosition - !t10.compareDocumentPosition;
    return n2 ? n2 : 1 & (n2 = (e10.ownerDocument || e10) == (t10.ownerDocument || t10) ? e10.compareDocumentPosition(t10) : 1) ? e10 == y || e10.ownerDocument == y && T.contains(y, e10) ? -1 : t10 == y || t10.ownerDocument == y && T.contains(y, t10) ? 1 : 0 : 4 & n2 ? -1 : 1;
  }
  T.uniqueSort = function(e10) {
    var t10, n2 = [], r2 = 0, i2 = 0;
    if (en = false, Z.call(e10, et), en) {
      while (t10 = e10[i2++]) t10 === e10[i2] && (r2 = n2.push(i2));
      while (r2--) ee.call(e10, n2[r2], 1);
    }
    return e10;
  }, T.fn.uniqueSort = function() {
    return this.pushStack(T.uniqueSort(i.apply(this)));
  };
  var en, er, ei, eo, ea, es, eu = 0, el = 0, ec = P(), ef = P(), ep = P(), ed = RegExp(E + "+", "g"), eh = RegExp("^" + A + "$"), eg = T.extend({ needsContext: RegExp("^" + E + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + E + "*((?:-\\d)?\\d*)" + E + "*\\)|)(?=[^-]|$)", "i") }, $), ev = /^(?:input|select|textarea|button)$/i, ey = /^h\d$/i, em = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ex = function() {
    eE();
  }, eb = eS(function(e10) {
    return true === e10.disabled && C(e10, "fieldset");
  }, { dir: "parentNode", next: "legend" });
  function ew(e10, t10, n2, r2) {
    var i2, o2, s2, u2, l2, c2, f2, p2 = t10 && t10.ownerDocument, d2 = t10 ? t10.nodeType : 9;
    if (n2 = n2 || [], "string" != typeof e10 || !e10 || 1 !== d2 && 9 !== d2 && 11 !== d2) return n2;
    if (!r2 && (eE(t10), t10 = t10 || eo, es)) {
      if (11 !== d2 && (l2 = em.exec(e10))) {
        if (i2 = l2[1]) {
          if (9 === d2) return (s2 = t10.getElementById(i2)) && a.call(n2, s2), n2;
          else if (p2 && (s2 = p2.getElementById(i2)) && T.contains(t10, s2)) return a.call(n2, s2), n2;
        } else if (l2[2]) return a.apply(n2, t10.getElementsByTagName(e10)), n2;
        else if ((i2 = l2[3]) && t10.getElementsByClassName) return a.apply(n2, t10.getElementsByClassName(i2)), n2;
      }
      if (!ep[e10 + " "] && (!S || !S.test(e10))) {
        if (f2 = e10, p2 = t10, 1 === d2 && (q.test(e10) || N.test(e10))) {
          ((p2 = O.test(e10) && R(t10.parentNode) || t10) != t10 || k) && ((u2 = t10.getAttribute("id")) ? u2 = T.escapeSelector(u2) : t10.setAttribute("id", u2 = T.expando)), o2 = (c2 = Y(e10)).length;
          while (o2--) c2[o2] = (u2 ? "#" + u2 : ":scope") + " " + G(c2[o2]);
          f2 = c2.join(",");
        }
        try {
          return a.apply(n2, p2.querySelectorAll(f2)), n2;
        } catch (t11) {
          ep(e10, true);
        } finally {
          u2 === T.expando && t10.removeAttribute("id");
        }
      }
    }
    return eq(e10.replace(D, "$1"), t10, n2, r2);
  }
  function eT(e10) {
    return e10[T.expando] = true, e10;
  }
  function eC(e10) {
    return function(t10) {
      if ("form" in t10) {
        if (t10.parentNode && false === t10.disabled) {
          if ("label" in t10) if ("label" in t10.parentNode) return t10.parentNode.disabled === e10;
          else return t10.disabled === e10;
          return t10.isDisabled === e10 || !e10 !== t10.isDisabled && eb(t10) === e10;
        }
        return t10.disabled === e10;
      }
      return "label" in t10 && t10.disabled === e10;
    };
  }
  function ej(e10) {
    return eT(function(t10) {
      return t10 *= 1, eT(function(n2, r2) {
        var i2, o2 = e10([], n2.length, t10), a2 = o2.length;
        while (a2--) n2[i2 = o2[a2]] && (n2[i2] = !(r2[i2] = n2[i2]));
      });
    });
  }
  function eE(e10) {
    var t10, n2 = e10 ? e10.ownerDocument || e10 : y;
    n2 != eo && 9 === n2.nodeType && (ea = (eo = n2).documentElement, es = !T.isXMLDoc(eo), k && y != eo && (t10 = eo.defaultView) && t10.top !== t10 && t10.addEventListener("unload", ex));
  }
  for (er in ew.matches = function(e10, t10) {
    return ew(e10, null, null, t10);
  }, ew.matchesSelector = function(e10, t10) {
    if (eE(e10), es && !ep[t10 + " "] && (!S || !S.test(t10))) try {
      return H.call(e10, t10);
    } catch (e11) {
      ep(t10, true);
    }
    return ew(t10, eo, null, [e10]).length > 0;
  }, T.expr = { cacheLength: 50, createPseudo: eT, match: eg, find: { ID: function(e10, t10) {
    if (void 0 !== t10.getElementById && es) {
      var n2 = t10.getElementById(e10);
      return n2 ? [n2] : [];
    }
  }, TAG: function(e10, t10) {
    return void 0 !== t10.getElementsByTagName ? t10.getElementsByTagName(e10) : t10.querySelectorAll(e10);
  }, CLASS: function(e10, t10) {
    if (void 0 !== t10.getElementsByClassName && es) return t10.getElementsByClassName(e10);
  } }, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function(e10) {
    return e10[1] = _(e10[1]), e10[3] = _(e10[3] || e10[4] || e10[5] || ""), "~=" === e10[2] && (e10[3] = " " + e10[3] + " "), e10.slice(0, 4);
  }, CHILD: function(e10) {
    return e10[1] = e10[1].toLowerCase(), "nth" === e10[1].slice(0, 3) ? (e10[3] || U(e10[0]), e10[4] = +(e10[4] ? e10[5] + (e10[6] || 1) : 2 * ("even" === e10[3] || "odd" === e10[3])), e10[5] = +(e10[7] + e10[8] || "odd" === e10[3])) : e10[3] && U(e10[0]), e10;
  }, PSEUDO: function(e10) {
    var t10, n2 = !e10[6] && e10[2];
    return $.CHILD.test(e10[0]) ? null : (e10[3] ? e10[2] = e10[4] || e10[5] || "" : n2 && I.test(n2) && (t10 = Y(n2, true)) && (t10 = n2.indexOf(")", n2.length - t10) - n2.length) && (e10[0] = e10[0].slice(0, t10), e10[2] = n2.slice(0, t10)), e10.slice(0, 3));
  } }, filter: { ID: function(e10) {
    var t10 = _(e10);
    return function(e11) {
      return e11.getAttribute("id") === t10;
    };
  }, TAG: function(e10) {
    var t10 = _(e10).toLowerCase();
    return "*" === e10 ? function() {
      return true;
    } : function(e11) {
      return C(e11, t10);
    };
  }, CLASS: function(e10) {
    var t10 = ec[e10 + " "];
    return t10 || (t10 = RegExp("(^|" + E + ")" + e10 + "(" + E + "|$)")) && ec(e10, function(e11) {
      return t10.test("string" == typeof e11.className && e11.className || void 0 !== e11.getAttribute && e11.getAttribute("class") || "");
    });
  }, ATTR: function(e10, t10, n2) {
    return function(r2) {
      var i2 = T.attr(r2, e10);
      return null == i2 ? "!=" === t10 : !t10 || ((i2 += "", "=" === t10) ? i2 === n2 : "!=" === t10 ? i2 !== n2 : "^=" === t10 ? n2 && 0 === i2.indexOf(n2) : "*=" === t10 ? n2 && i2.indexOf(n2) > -1 : "$=" === t10 ? n2 && i2.slice(-n2.length) === n2 : "~=" === t10 ? (" " + i2.replace(ed, " ") + " ").indexOf(n2) > -1 : "|=" === t10 && (i2 === n2 || i2.slice(0, n2.length + 1) === n2 + "-"));
    };
  }, CHILD: function(e10, t10, n2, r2, i2) {
    var o2 = "nth" !== e10.slice(0, 3), a2 = "last" !== e10.slice(-4), s2 = "of-type" === t10;
    return 1 === r2 && 0 === i2 ? function(e11) {
      return !!e11.parentNode;
    } : function(t11, n3, u2) {
      var l2, c2, f2, p2, d2, h2 = o2 !== a2 ? "nextSibling" : "previousSibling", g2 = t11.parentNode, v2 = s2 && t11.nodeName.toLowerCase(), y2 = !u2 && !s2, m2 = false;
      if (g2) {
        if (o2) {
          while (h2) {
            f2 = t11;
            while (f2 = f2[h2]) if (s2 ? C(f2, v2) : 1 === f2.nodeType) return false;
            d2 = h2 = "only" === e10 && !d2 && "nextSibling";
          }
          return true;
        }
        if (d2 = [a2 ? g2.firstChild : g2.lastChild], a2 && y2) {
          m2 = (p2 = (l2 = (c2 = g2[T.expando] || (g2[T.expando] = {}))[e10] || [])[0] === eu && l2[1]) && l2[2], f2 = p2 && g2.childNodes[p2];
          while (f2 = ++p2 && f2 && f2[h2] || (m2 = p2 = 0) || d2.pop()) if (1 === f2.nodeType && ++m2 && f2 === t11) {
            c2[e10] = [eu, p2, m2];
            break;
          }
        } else if (y2 && (m2 = p2 = (l2 = (c2 = t11[T.expando] || (t11[T.expando] = {}))[e10] || [])[0] === eu && l2[1]), false === m2) {
          while (f2 = ++p2 && f2 && f2[h2] || (m2 = p2 = 0) || d2.pop()) if ((s2 ? C(f2, v2) : 1 === f2.nodeType) && ++m2 && (y2 && ((c2 = f2[T.expando] || (f2[T.expando] = {}))[e10] = [eu, m2]), f2 === t11)) break;
        }
        return (m2 -= i2) === r2 || m2 % r2 == 0 && m2 / r2 >= 0;
      }
    };
  }, PSEUDO: function(e10, t10) {
    var n2 = T.expr.pseudos[e10] || T.expr.setFilters[e10.toLowerCase()] || U("unsupported pseudo: " + e10);
    return n2[T.expando] ? n2(t10) : n2;
  } }, pseudos: { not: eT(function(e10) {
    var t10 = [], n2 = [], r2 = eN(e10.replace(D, "$1"));
    return r2[T.expando] ? eT(function(e11, t11, n3, i2) {
      var o2, a2 = r2(e11, null, i2, []), s2 = e11.length;
      while (s2--) (o2 = a2[s2]) && (e11[s2] = !(t11[s2] = o2));
    }) : function(e11, i2, o2) {
      return t10[0] = e11, r2(t10, null, o2, n2), t10[0] = null, !n2.pop();
    };
  }), has: eT(function(e10) {
    return function(t10) {
      return ew(e10, t10).length > 0;
    };
  }), contains: eT(function(e10) {
    return e10 = _(e10), function(t10) {
      return (t10.textContent || T.text(t10)).indexOf(e10) > -1;
    };
  }), lang: eT(function(e10) {
    return eh.test(e10 || "") || U("unsupported lang: " + e10), e10 = _(e10).toLowerCase(), function(t10) {
      var n2;
      do
        if (n2 = es ? t10.lang : t10.getAttribute("xml:lang") || t10.getAttribute("lang")) return (n2 = n2.toLowerCase()) === e10 || 0 === n2.indexOf(e10 + "-");
      while ((t10 = t10.parentNode) && 1 === t10.nodeType);
      return false;
    };
  }), target: function(t10) {
    var n2 = e.location && e.location.hash;
    return n2 && n2.slice(1) === t10.id;
  }, root: function(e10) {
    return e10 === ea;
  }, focus: function(e10) {
    return e10 === eo.activeElement && eo.hasFocus() && !!(e10.type || e10.href || ~e10.tabIndex);
  }, enabled: eC(false), disabled: eC(true), checked: function(e10) {
    return C(e10, "input") && !!e10.checked || C(e10, "option") && !!e10.selected;
  }, selected: function(e10) {
    return k && e10.parentNode && e10.parentNode.selectedIndex, true === e10.selected;
  }, empty: function(e10) {
    for (e10 = e10.firstChild; e10; e10 = e10.nextSibling) if (e10.nodeType < 6) return false;
    return true;
  }, parent: function(e10) {
    return !T.expr.pseudos.empty(e10);
  }, header: function(e10) {
    return ey.test(e10.nodeName);
  }, input: function(e10) {
    return ev.test(e10.nodeName);
  }, button: function(e10) {
    return C(e10, "input") && "button" === e10.type || C(e10, "button");
  }, text: function(e10) {
    return C(e10, "input") && "text" === e10.type;
  }, first: ej(function() {
    return [0];
  }), last: ej(function(e10, t10) {
    return [t10 - 1];
  }), eq: ej(function(e10, t10, n2) {
    return [n2 < 0 ? n2 + t10 : n2];
  }), even: ej(function(e10, t10) {
    for (var n2 = 0; n2 < t10; n2 += 2) e10.push(n2);
    return e10;
  }), odd: ej(function(e10, t10) {
    for (var n2 = 1; n2 < t10; n2 += 2) e10.push(n2);
    return e10;
  }), lt: ej(function(e10, t10, n2) {
    var r2;
    for (r2 = n2 < 0 ? n2 + t10 : n2 > t10 ? t10 : n2; --r2 >= 0; ) e10.push(r2);
    return e10;
  }), gt: ej(function(e10, t10, n2) {
    for (var r2 = n2 < 0 ? n2 + t10 : n2; ++r2 < t10; ) e10.push(r2);
    return e10;
  }) } }, T.expr.pseudos.nth = T.expr.pseudos.eq, { radio: true, checkbox: true, file: true, password: true, image: true }) T.expr.pseudos[er] = /* @__PURE__ */ (function(e10) {
    return function(t10) {
      return C(t10, "input") && t10.type === e10;
    };
  })(er);
  for (er in { submit: true, reset: true }) T.expr.pseudos[er] = /* @__PURE__ */ (function(e10) {
    return function(t10) {
      return (C(t10, "input") || C(t10, "button")) && t10.type === e10;
    };
  })(er);
  function ek() {
  }
  function eS(e10, t10, n2) {
    var r2 = t10.dir, i2 = t10.next, o2 = i2 || r2, a2 = n2 && "parentNode" === o2, s2 = el++;
    return t10.first ? function(t11, n3, i3) {
      while (t11 = t11[r2]) if (1 === t11.nodeType || a2) return e10(t11, n3, i3);
      return false;
    } : function(t11, n3, u2) {
      var l2, c2, f2 = [eu, s2];
      if (u2) {
        while (t11 = t11[r2]) if ((1 === t11.nodeType || a2) && e10(t11, n3, u2)) return true;
      } else while (t11 = t11[r2]) if (1 === t11.nodeType || a2) if (c2 = t11[T.expando] || (t11[T.expando] = {}), i2 && C(t11, i2)) t11 = t11[r2] || t11;
      else {
        if ((l2 = c2[o2]) && l2[0] === eu && l2[1] === s2) return f2[2] = l2[2];
        if (c2[o2] = f2, f2[2] = e10(t11, n3, u2)) return true;
      }
      return false;
    };
  }
  function eD(e10) {
    return e10.length > 1 ? function(t10, n2, r2) {
      var i2 = e10.length;
      while (i2--) if (!e10[i2](t10, n2, r2)) return false;
      return true;
    } : e10[0];
  }
  function eA(e10, t10, n2, r2, i2) {
    for (var o2, a2 = [], s2 = 0, u2 = e10.length, l2 = null != t10; s2 < u2; s2++) (o2 = e10[s2]) && (!n2 || n2(o2, r2, i2)) && (a2.push(o2), l2 && t10.push(s2));
    return a2;
  }
  function eN(e10, t10) {
    var n2, r2, i2, o2, u2 = [], l2 = [], c2 = ef[e10 + " "];
    if (!c2) {
      t10 || (t10 = Y(e10)), o2 = t10.length;
      while (o2--) (c2 = (function e11(t11) {
        for (var n3, r3, i3, o3 = t11.length, u3 = T.expr.relative[t11[0].type], l3 = u3 || T.expr.relative[" "], c3 = +!!u3, f2 = eS(function(e12) {
          return e12 === n3;
        }, l3, true), p2 = eS(function(e12) {
          return s.call(n3, e12) > -1;
        }, l3, true), d2 = [function(e12, t12, r4) {
          var i4 = !u3 && (r4 || t12 != ei) || ((n3 = t12).nodeType ? f2(e12, t12, r4) : p2(e12, t12, r4));
          return n3 = null, i4;
        }]; c3 < o3; c3++) if (r3 = T.expr.relative[t11[c3].type]) d2 = [eS(eD(d2), r3)];
        else {
          if ((r3 = T.expr.filter[t11[c3].type].apply(null, t11[c3].matches))[T.expando]) {
            for (i3 = ++c3; i3 < o3 && !T.expr.relative[t11[i3].type]; i3++) ;
            return (function e12(t12, n4, r4, i4, o4, u4) {
              return i4 && !i4[T.expando] && (i4 = e12(i4)), o4 && !o4[T.expando] && (o4 = e12(o4, u4)), eT(function(e13, u5, l4, c4) {
                var f3, p3, d3, h2, g2 = [], v2 = [], y2 = u5.length, m2 = e13 || (function(e14, t13, n5) {
                  for (var r5 = 0, i5 = t13.length; r5 < i5; r5++) ew(e14, t13[r5], n5);
                  return n5;
                })(n4 || "*", l4.nodeType ? [l4] : l4, []), x2 = t12 && (e13 || !n4) ? eA(m2, g2, t12, l4, c4) : m2;
                if (r4 ? r4(x2, h2 = o4 || (e13 ? t12 : y2 || i4) ? [] : u5, l4, c4) : h2 = x2, i4) {
                  f3 = eA(h2, v2), i4(f3, [], l4, c4), p3 = f3.length;
                  while (p3--) (d3 = f3[p3]) && (h2[v2[p3]] = !(x2[v2[p3]] = d3));
                }
                if (e13) {
                  if (o4 || t12) {
                    if (o4) {
                      f3 = [], p3 = h2.length;
                      while (p3--) (d3 = h2[p3]) && f3.push(x2[p3] = d3);
                      o4(null, h2 = [], f3, c4);
                    }
                    p3 = h2.length;
                    while (p3--) (d3 = h2[p3]) && (f3 = o4 ? s.call(e13, d3) : g2[p3]) > -1 && (e13[f3] = !(u5[f3] = d3));
                  }
                } else h2 = eA(h2 === u5 ? h2.splice(y2, h2.length) : h2), o4 ? o4(null, u5, h2, c4) : a.apply(u5, h2);
              });
            })(c3 > 1 && eD(d2), c3 > 1 && G(t11.slice(0, c3 - 1).concat({ value: " " === t11[c3 - 2].type ? "*" : "" })).replace(D, "$1"), r3, c3 < i3 && e11(t11.slice(c3, i3)), i3 < o3 && e11(t11 = t11.slice(i3)), i3 < o3 && G(t11));
          }
          d2.push(r3);
        }
        return eD(d2);
      })(t10[o2]))[T.expando] ? u2.push(c2) : l2.push(c2);
      (c2 = ef(e10, (n2 = u2.length > 0, r2 = l2.length > 0, i2 = function(e11, t11, i3, o3, s2) {
        var c3, f2, p2, d2 = 0, h2 = "0", g2 = e11 && [], v2 = [], y2 = ei, m2 = e11 || r2 && T.expr.find.TAG("*", s2), x2 = eu += null == y2 ? 1 : Math.random() || 0.1;
        for (s2 && (ei = t11 == eo || t11 || s2); null != (c3 = m2[h2]); h2++) {
          if (r2 && c3) {
            f2 = 0, t11 || c3.ownerDocument == eo || (eE(c3), i3 = !es);
            while (p2 = l2[f2++]) if (p2(c3, t11 || eo, i3)) {
              a.call(o3, c3);
              break;
            }
            s2 && (eu = x2);
          }
          n2 && ((c3 = !p2 && c3) && d2--, e11 && g2.push(c3));
        }
        if (d2 += h2, n2 && h2 !== d2) {
          f2 = 0;
          while (p2 = u2[f2++]) p2(g2, v2, t11, i3);
          if (e11) {
            if (d2 > 0) while (h2--) g2[h2] || v2[h2] || (v2[h2] = j.call(o3));
            v2 = eA(v2);
          }
          a.apply(o3, v2), s2 && !e11 && v2.length > 0 && d2 + u2.length > 1 && T.uniqueSort(o3);
        }
        return s2 && (eu = x2, ei = y2), g2;
      }, n2 ? eT(i2) : i2))).selector = e10;
    }
    return c2;
  }
  function eq(e10, t10, n2, r2) {
    var i2, o2, s2, u2, l2, c2 = "function" == typeof e10 && e10, f2 = !r2 && Y(e10 = c2.selector || e10);
    if (n2 = n2 || [], 1 === f2.length) {
      if ((o2 = f2[0] = f2[0].slice(0)).length > 2 && "ID" === (s2 = o2[0]).type && 9 === t10.nodeType && es && T.expr.relative[o2[1].type]) {
        if (!(t10 = (T.expr.find.ID(_(s2.matches[0]), t10) || [])[0])) return n2;
        c2 && (t10 = t10.parentNode), e10 = e10.slice(o2.shift().value.length);
      }
      i2 = eg.needsContext.test(e10) ? 0 : o2.length;
      while (i2--) {
        if (s2 = o2[i2], T.expr.relative[u2 = s2.type]) break;
        if ((l2 = T.expr.find[u2]) && (r2 = l2(_(s2.matches[0]), O.test(o2[0].type) && R(t10.parentNode) || t10))) {
          if (o2.splice(i2, 1), !(e10 = r2.length && G(o2))) return a.apply(n2, r2), n2;
          break;
        }
      }
    }
    return (c2 || eN(e10, f2))(r2, t10, !es, n2, !t10 || O.test(e10) && R(t10.parentNode) || t10), n2;
  }
  function eO(e10, t10, n2) {
    var r2 = [], i2 = void 0 !== n2;
    while ((e10 = e10[t10]) && 9 !== e10.nodeType) if (1 === e10.nodeType) {
      if (i2 && T(e10).is(n2)) break;
      r2.push(e10);
    }
    return r2;
  }
  function eL(e10, t10) {
    for (var n2 = []; e10; e10 = e10.nextSibling) 1 === e10.nodeType && e10 !== t10 && n2.push(e10);
    return n2;
  }
  ek.prototype = T.expr.pseudos, T.expr.setFilters = new ek(), eE(), T.find = ew, ew.compile = eN, ew.select = eq, ew.setDocument = eE, ew.tokenize = Y;
  var eH = T.expr.match.needsContext, eP = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function eR(e10) {
    return "<" === e10[0] && ">" === e10[e10.length - 1] && e10.length >= 3;
  }
  function eM(e10, t10, n2) {
    return "function" == typeof t10 ? T.grep(e10, function(e11, r2) {
      return !!t10.call(e11, r2, e11) !== n2;
    }) : t10.nodeType ? T.grep(e10, function(e11) {
      return e11 === t10 !== n2;
    }) : "string" != typeof t10 ? T.grep(e10, function(e11) {
      return s.call(t10, e11) > -1 !== n2;
    }) : T.filter(t10, e10, n2);
  }
  T.filter = function(e10, t10, n2) {
    var r2 = t10[0];
    return (n2 && (e10 = ":not(" + e10 + ")"), 1 === t10.length && 1 === r2.nodeType) ? T.find.matchesSelector(r2, e10) ? [r2] : [] : T.find.matches(e10, T.grep(t10, function(e11) {
      return 1 === e11.nodeType;
    }));
  }, T.fn.extend({ find: function(e10) {
    var t10, n2, r2 = this.length, i2 = this;
    if ("string" != typeof e10) return this.pushStack(T(e10).filter(function() {
      for (t10 = 0; t10 < r2; t10++) if (T.contains(i2[t10], this)) return true;
    }));
    for (t10 = 0, n2 = this.pushStack([]); t10 < r2; t10++) T.find(e10, i2[t10], n2);
    return r2 > 1 ? T.uniqueSort(n2) : n2;
  }, filter: function(e10) {
    return this.pushStack(eM(this, e10 || [], false));
  }, not: function(e10) {
    return this.pushStack(eM(this, e10 || [], true));
  }, is: function(e10) {
    return !!eM(this, "string" == typeof e10 && eH.test(e10) ? T(e10) : e10 || [], false).length;
  } });
  var eW, e$ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (T.fn.init = function(e10, t10) {
    var n2, r2;
    if (!e10) return this;
    if (e10.nodeType) return this[0] = e10, this.length = 1, this;
    if ("function" == typeof e10) return void 0 !== eW.ready ? eW.ready(e10) : e10(T);
    if (eR(n2 = e10 + "")) n2 = [null, e10, null];
    else {
      if ("string" != typeof e10) return T.makeArray(e10, this);
      n2 = e$.exec(e10);
    }
    if (n2 && (n2[1] || !t10)) if (!n2[1]) return (r2 = y.getElementById(n2[2])) && (this[0] = r2, this.length = 1), this;
    else {
      if (t10 = t10 instanceof T ? t10[0] : t10, T.merge(this, T.parseHTML(n2[1], t10 && t10.nodeType ? t10.ownerDocument || t10 : y, true)), eP.test(n2[1]) && T.isPlainObject(t10)) for (n2 in t10) "function" == typeof this[n2] ? this[n2](t10[n2]) : this.attr(n2, t10[n2]);
      return this;
    }
    return !t10 || t10.jquery ? (t10 || eW).find(e10) : this.constructor(t10).find(e10);
  }).prototype = T.fn, eW = T(y);
  var eI = /^(?:parents|prev(?:Until|All))/, eF = { children: true, contents: true, next: true, prev: true };
  function eB(e10, t10) {
    while ((e10 = e10[t10]) && 1 !== e10.nodeType) ;
    return e10;
  }
  function e_(e10) {
    return e10;
  }
  function eU(e10) {
    throw e10;
  }
  function eX(e10, t10, n2, r2) {
    var i2;
    try {
      e10 && "function" == typeof (i2 = e10.promise) ? i2.call(e10).done(t10).fail(n2) : e10 && "function" == typeof (i2 = e10.then) ? i2.call(e10, t10, n2) : t10.apply(void 0, [e10].slice(r2));
    } catch (e11) {
      n2(e11);
    }
  }
  T.fn.extend({ has: function(e10) {
    var t10 = T(e10, this), n2 = t10.length;
    return this.filter(function() {
      for (var e11 = 0; e11 < n2; e11++) if (T.contains(this, t10[e11])) return true;
    });
  }, closest: function(e10, t10) {
    var n2, r2 = 0, i2 = this.length, o2 = [], a2 = "string" != typeof e10 && T(e10);
    if (!eH.test(e10)) {
      for (; r2 < i2; r2++) for (n2 = this[r2]; n2 && n2 !== t10; n2 = n2.parentNode) if (n2.nodeType < 11 && (a2 ? a2.index(n2) > -1 : 1 === n2.nodeType && T.find.matchesSelector(n2, e10))) {
        o2.push(n2);
        break;
      }
    }
    return this.pushStack(o2.length > 1 ? T.uniqueSort(o2) : o2);
  }, index: function(e10) {
    return e10 ? "string" == typeof e10 ? s.call(T(e10), this[0]) : s.call(this, e10.jquery ? e10[0] : e10) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  }, add: function(e10, t10) {
    return this.pushStack(T.uniqueSort(T.merge(this.get(), T(e10, t10))));
  }, addBack: function(e10) {
    return this.add(null == e10 ? this.prevObject : this.prevObject.filter(e10));
  } }), T.each({ parent: function(e10) {
    var t10 = e10.parentNode;
    return t10 && 11 !== t10.nodeType ? t10 : null;
  }, parents: function(e10) {
    return eO(e10, "parentNode");
  }, parentsUntil: function(e10, t10, n2) {
    return eO(e10, "parentNode", n2);
  }, next: function(e10) {
    return eB(e10, "nextSibling");
  }, prev: function(e10) {
    return eB(e10, "previousSibling");
  }, nextAll: function(e10) {
    return eO(e10, "nextSibling");
  }, prevAll: function(e10) {
    return eO(e10, "previousSibling");
  }, nextUntil: function(e10, t10, n2) {
    return eO(e10, "nextSibling", n2);
  }, prevUntil: function(e10, t10, n2) {
    return eO(e10, "previousSibling", n2);
  }, siblings: function(e10) {
    return eL((e10.parentNode || {}).firstChild, e10);
  }, children: function(e10) {
    return eL(e10.firstChild);
  }, contents: function(e10) {
    return null != e10.contentDocument && r(e10.contentDocument) ? e10.contentDocument : (C(e10, "template") && (e10 = e10.content || e10), T.merge([], e10.childNodes));
  } }, function(e10, t10) {
    T.fn[e10] = function(n2, r2) {
      var i2 = T.map(this, t10, n2);
      return "Until" !== e10.slice(-5) && (r2 = n2), r2 && "string" == typeof r2 && (i2 = T.filter(r2, i2)), this.length > 1 && (eF[e10] || T.uniqueSort(i2), eI.test(e10) && i2.reverse()), this.pushStack(i2);
    };
  }), T.Callbacks = function(e10) {
    e10 = "string" == typeof e10 ? (t10 = e10, n2 = {}, T.each(t10.match(Q) || [], function(e11, t11) {
      n2[t11] = true;
    }), n2) : T.extend({}, e10);
    var t10, n2, r2, i2, o2, a2, s2 = [], u2 = [], l2 = -1, c2 = function() {
      for (a2 = a2 || e10.once, o2 = r2 = true; u2.length; l2 = -1) {
        i2 = u2.shift();
        while (++l2 < s2.length) false === s2[l2].apply(i2[0], i2[1]) && e10.stopOnFalse && (l2 = s2.length, i2 = false);
      }
      e10.memory || (i2 = false), r2 = false, a2 && (s2 = i2 ? [] : "");
    }, f2 = { add: function() {
      return s2 && (i2 && !r2 && (l2 = s2.length - 1, u2.push(i2)), !(function t11(n3) {
        T.each(n3, function(n4, r3) {
          "function" == typeof r3 ? e10.unique && f2.has(r3) || s2.push(r3) : r3 && r3.length && "string" !== h(r3) && t11(r3);
        });
      })(arguments), i2 && !r2 && c2()), this;
    }, remove: function() {
      return T.each(arguments, function(e11, t11) {
        var n3;
        while ((n3 = T.inArray(t11, s2, n3)) > -1) s2.splice(n3, 1), n3 <= l2 && l2--;
      }), this;
    }, has: function(e11) {
      return e11 ? T.inArray(e11, s2) > -1 : s2.length > 0;
    }, empty: function() {
      return s2 && (s2 = []), this;
    }, disable: function() {
      return a2 = u2 = [], s2 = i2 = "", this;
    }, disabled: function() {
      return !s2;
    }, lock: function() {
      return a2 = u2 = [], i2 || r2 || (s2 = i2 = ""), this;
    }, locked: function() {
      return !!a2;
    }, fireWith: function(e11, t11) {
      return !a2 && (t11 = [e11, (t11 = t11 || []).slice ? t11.slice() : t11], u2.push(t11), r2 || c2()), this;
    }, fire: function() {
      return f2.fireWith(this, arguments), this;
    }, fired: function() {
      return !!o2;
    } };
    return f2;
  }, T.extend({ Deferred: function(t10) {
    var n2 = [["notify", "progress", T.Callbacks("memory"), T.Callbacks("memory"), 2], ["resolve", "done", T.Callbacks("once memory"), T.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", T.Callbacks("once memory"), T.Callbacks("once memory"), 1, "rejected"]], r2 = "pending", i2 = { state: function() {
      return r2;
    }, always: function() {
      return o2.done(arguments).fail(arguments), this;
    }, catch: function(e10) {
      return i2.then(null, e10);
    }, pipe: function() {
      var e10 = arguments;
      return T.Deferred(function(t11) {
        T.each(n2, function(n3, r3) {
          var i3 = "function" == typeof e10[r3[4]] && e10[r3[4]];
          o2[r3[1]](function() {
            var e11 = i3 && i3.apply(this, arguments);
            e11 && "function" == typeof e11.promise ? e11.promise().progress(t11.notify).done(t11.resolve).fail(t11.reject) : t11[r3[0] + "With"](this, i3 ? [e11] : arguments);
          });
        }), e10 = null;
      }).promise();
    }, then: function(t11, r3, i3) {
      var o3 = 0;
      function a2(t12, n3, r4, i4) {
        return function() {
          var s2 = this, u2 = arguments, l2 = function() {
            var e10, l3;
            if (!(t12 < o3)) {
              if ((e10 = r4.apply(s2, u2)) === n3.promise()) throw TypeError("Thenable self-resolution");
              "function" == typeof (l3 = e10 && ("object" == typeof e10 || "function" == typeof e10) && e10.then) ? i4 ? l3.call(e10, a2(o3, n3, e_, i4), a2(o3, n3, eU, i4)) : (o3++, l3.call(e10, a2(o3, n3, e_, i4), a2(o3, n3, eU, i4), a2(o3, n3, e_, n3.notifyWith))) : (r4 !== e_ && (s2 = void 0, u2 = [e10]), (i4 || n3.resolveWith)(s2, u2));
            }
          }, c2 = i4 ? l2 : function() {
            try {
              l2();
            } catch (e10) {
              T.Deferred.exceptionHook && T.Deferred.exceptionHook(e10, c2.error), t12 + 1 >= o3 && (r4 !== eU && (s2 = void 0, u2 = [e10]), n3.rejectWith(s2, u2));
            }
          };
          t12 ? c2() : (T.Deferred.getErrorHook && (c2.error = T.Deferred.getErrorHook()), e.setTimeout(c2));
        };
      }
      return T.Deferred(function(e10) {
        n2[0][3].add(a2(0, e10, "function" == typeof i3 ? i3 : e_, e10.notifyWith)), n2[1][3].add(a2(0, e10, "function" == typeof t11 ? t11 : e_)), n2[2][3].add(a2(0, e10, "function" == typeof r3 ? r3 : eU));
      }).promise();
    }, promise: function(e10) {
      return null != e10 ? T.extend(e10, i2) : i2;
    } }, o2 = {};
    return T.each(n2, function(e10, t11) {
      var a2 = t11[2], s2 = t11[5];
      i2[t11[1]] = a2.add, s2 && a2.add(function() {
        r2 = s2;
      }, n2[3 - e10][2].disable, n2[3 - e10][3].disable, n2[0][2].lock, n2[0][3].lock), a2.add(t11[3].fire), o2[t11[0]] = function() {
        return o2[t11[0] + "With"](this === o2 ? void 0 : this, arguments), this;
      }, o2[t11[0] + "With"] = a2.fireWith;
    }), i2.promise(o2), t10 && t10.call(o2, o2), o2;
  }, when: function(e10) {
    var t10 = arguments.length, n2 = t10, r2 = Array(n2), o2 = i.call(arguments), a2 = T.Deferred(), s2 = function(e11) {
      return function(n3) {
        r2[e11] = this, o2[e11] = arguments.length > 1 ? i.call(arguments) : n3, --t10 || a2.resolveWith(r2, o2);
      };
    };
    if (t10 <= 1 && (eX(e10, a2.done(s2(n2)).resolve, a2.reject, !t10), "pending" === a2.state() || "function" == typeof (o2[n2] && o2[n2].then))) return a2.then();
    while (n2--) eX(o2[n2], s2(n2), a2.reject);
    return a2.promise();
  } });
  var ez = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  T.Deferred.exceptionHook = function(t10, n2) {
    t10 && ez.test(t10.name) && e.console.warn("jQuery.Deferred exception", t10, n2);
  }, T.readyException = function(t10) {
    e.setTimeout(function() {
      throw t10;
    });
  };
  var eY = T.Deferred();
  function eG() {
    y.removeEventListener("DOMContentLoaded", eG), e.removeEventListener("load", eG), T.ready();
  }
  T.fn.ready = function(e10) {
    return eY.then(e10).catch(function(e11) {
      T.readyException(e11);
    }), this;
  }, T.extend({ isReady: false, readyWait: 1, ready: function(e10) {
    (true === e10 ? --T.readyWait : T.isReady) || (T.isReady = true, true !== e10 && --T.readyWait > 0 || eY.resolveWith(y, [T]));
  } }), T.ready.then = eY.then, "loading" !== y.readyState ? e.setTimeout(T.ready) : (y.addEventListener("DOMContentLoaded", eG), e.addEventListener("load", eG));
  var eV = /-([a-z])/g;
  function eQ(e10, t10) {
    return t10.toUpperCase();
  }
  function eJ(e10) {
    return e10.replace(eV, eQ);
  }
  function eK(e10) {
    return 1 === e10.nodeType || 9 === e10.nodeType || !+e10.nodeType;
  }
  function eZ() {
    this.expando = T.expando + eZ.uid++;
  }
  eZ.uid = 1, eZ.prototype = { cache: function(e10) {
    var t10 = e10[this.expando];
    return !t10 && (t10 = /* @__PURE__ */ Object.create(null), eK(e10) && (e10.nodeType ? e10[this.expando] = t10 : Object.defineProperty(e10, this.expando, { value: t10, configurable: true }))), t10;
  }, set: function(e10, t10, n2) {
    var r2, i2 = this.cache(e10);
    if ("string" == typeof t10) i2[eJ(t10)] = n2;
    else for (r2 in t10) i2[eJ(r2)] = t10[r2];
    return n2;
  }, get: function(e10, t10) {
    return void 0 === t10 ? this.cache(e10) : e10[this.expando] && e10[this.expando][eJ(t10)];
  }, access: function(e10, t10, n2) {
    return void 0 === t10 || t10 && "string" == typeof t10 && void 0 === n2 ? this.get(e10, t10) : (this.set(e10, t10, n2), void 0 !== n2 ? n2 : t10);
  }, remove: function(e10, t10) {
    var n2, r2 = e10[this.expando];
    if (void 0 !== r2) {
      if (void 0 !== t10) {
        n2 = (t10 = Array.isArray(t10) ? t10.map(eJ) : (t10 = eJ(t10)) in r2 ? [t10] : t10.match(Q) || []).length;
        while (n2--) delete r2[t10[n2]];
      }
      (void 0 === t10 || T.isEmptyObject(r2)) && (e10.nodeType ? e10[this.expando] = void 0 : delete e10[this.expando]);
    }
  }, hasData: function(e10) {
    var t10 = e10[this.expando];
    return void 0 !== t10 && !T.isEmptyObject(t10);
  } };
  var e0 = new eZ(), e1 = new eZ(), e2 = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, e3 = /[A-Z]/g;
  function e4(e10, t10, n2) {
    var r2, i2;
    if (void 0 === n2 && 1 === e10.nodeType) if (r2 = "data-" + t10.replace(e3, "-$&").toLowerCase(), "string" == typeof (n2 = e10.getAttribute(r2))) {
      try {
        i2 = n2, n2 = "true" === i2 || "false" !== i2 && ("null" === i2 ? null : i2 === +i2 + "" ? +i2 : e2.test(i2) ? JSON.parse(i2) : i2);
      } catch (e11) {
      }
      e1.set(e10, t10, n2);
    } else n2 = void 0;
    return n2;
  }
  T.extend({ hasData: function(e10) {
    return e1.hasData(e10) || e0.hasData(e10);
  }, data: function(e10, t10, n2) {
    return e1.access(e10, t10, n2);
  }, removeData: function(e10, t10) {
    e1.remove(e10, t10);
  }, _data: function(e10, t10, n2) {
    return e0.access(e10, t10, n2);
  }, _removeData: function(e10, t10) {
    e0.remove(e10, t10);
  } }), T.fn.extend({ data: function(e10, t10) {
    var n2, r2, i2, o2 = this[0], a2 = o2 && o2.attributes;
    if (void 0 === e10) {
      if (this.length && (i2 = e1.get(o2), 1 === o2.nodeType && !e0.get(o2, "hasDataAttrs"))) {
        n2 = a2.length;
        while (n2--) a2[n2] && 0 === (r2 = a2[n2].name).indexOf("data-") && e4(o2, r2 = eJ(r2.slice(5)), i2[r2]);
        e0.set(o2, "hasDataAttrs", true);
      }
      return i2;
    }
    return "object" == typeof e10 ? this.each(function() {
      e1.set(this, e10);
    }) : V(this, function(t11) {
      var n3;
      if (o2 && void 0 === t11) return void 0 !== (n3 = e1.get(o2, e10)) || void 0 !== (n3 = e4(o2, e10)) ? n3 : void 0;
      this.each(function() {
        e1.set(this, e10, t11);
      });
    }, null, t10, arguments.length > 1, null, true);
  }, removeData: function(e10) {
    return this.each(function() {
      e1.remove(this, e10);
    });
  } }), T.extend({ queue: function(e10, t10, n2) {
    var r2;
    if (e10) return t10 = (t10 || "fx") + "queue", r2 = e0.get(e10, t10), n2 && (!r2 || Array.isArray(n2) ? r2 = e0.set(e10, t10, T.makeArray(n2)) : r2.push(n2)), r2 || [];
  }, dequeue: function(e10, t10) {
    t10 = t10 || "fx";
    var n2 = T.queue(e10, t10), r2 = n2.length, i2 = n2.shift(), o2 = T._queueHooks(e10, t10);
    "inprogress" === i2 && (i2 = n2.shift(), r2--), i2 && ("fx" === t10 && n2.unshift("inprogress"), delete o2.stop, i2.call(e10, function() {
      T.dequeue(e10, t10);
    }, o2)), !r2 && o2 && o2.empty.fire();
  }, _queueHooks: function(e10, t10) {
    var n2 = t10 + "queueHooks";
    return e0.get(e10, n2) || e0.set(e10, n2, { empty: T.Callbacks("once memory").add(function() {
      e0.remove(e10, [t10 + "queue", n2]);
    }) });
  } }), T.fn.extend({ queue: function(e10, t10) {
    var n2 = 2;
    return ("string" != typeof e10 && (t10 = e10, e10 = "fx", n2--), arguments.length < n2) ? T.queue(this[0], e10) : void 0 === t10 ? this : this.each(function() {
      var n3 = T.queue(this, e10, t10);
      T._queueHooks(this, e10), "fx" === e10 && "inprogress" !== n3[0] && T.dequeue(this, e10);
    });
  }, dequeue: function(e10) {
    return this.each(function() {
      T.dequeue(this, e10);
    });
  }, clearQueue: function(e10) {
    return this.queue(e10 || "fx", []);
  }, promise: function(e10, t10) {
    var n2, r2 = 1, i2 = T.Deferred(), o2 = this, a2 = this.length, s2 = function() {
      --r2 || i2.resolveWith(o2, [o2]);
    };
    "string" != typeof e10 && (t10 = e10, e10 = void 0), e10 = e10 || "fx";
    while (a2--) (n2 = e0.get(o2[a2], e10 + "queueHooks")) && n2.empty && (r2++, n2.empty.add(s2));
    return s2(), i2.promise(t10);
  } });
  var e5 = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, e9 = RegExp("^(?:([+-])=|)(" + e5 + ")([a-z%]*)$", "i"), e6 = ["Top", "Right", "Bottom", "Left"];
  function e8(e10, t10) {
    return "none" === (e10 = t10 || e10).style.display || "" === e10.style.display && "none" === T.css(e10, "display");
  }
  var e7 = /^[a-z]/, te = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
  function tt(e10) {
    return e7.test(e10) && te.test(e10[0].toUpperCase() + e10.slice(1));
  }
  function tn(e10, t10, n2, r2) {
    var i2, o2, a2 = 20, s2 = r2 ? function() {
      return r2.cur();
    } : function() {
      return T.css(e10, t10, "");
    }, u2 = s2(), l2 = n2 && n2[3] || (tt(t10) ? "px" : ""), c2 = e10.nodeType && (!tt(t10) || "px" !== l2 && +u2) && e9.exec(T.css(e10, t10));
    if (c2 && c2[3] !== l2) {
      u2 /= 2, l2 = l2 || c2[3], c2 = +u2 || 1;
      while (a2--) T.style(e10, t10, c2 + l2), (1 - o2) * (1 - (o2 = s2() / u2 || 0.5)) <= 0 && (a2 = 0), c2 /= o2;
      c2 *= 2, T.style(e10, t10, c2 + l2), n2 = n2 || [];
    }
    return n2 && (c2 = +c2 || +u2 || 0, i2 = n2[1] ? c2 + (n2[1] + 1) * n2[2] : +n2[2], r2 && (r2.unit = l2, r2.start = c2, r2.end = i2)), i2;
  }
  var tr = /^-ms-/;
  function ti(e10) {
    return eJ(e10.replace(tr, "ms-"));
  }
  var to = {};
  function ta(e10, t10) {
    for (var n2, r2, i2 = [], o2 = 0, a2 = e10.length; o2 < a2; o2++) (r2 = e10[o2]).style && (n2 = r2.style.display, t10 ? ("none" === n2 && (i2[o2] = e0.get(r2, "display") || null, i2[o2] || (r2.style.display = "")), "" === r2.style.display && e8(r2) && (i2[o2] = (function(e11) {
      var t11, n3 = e11.ownerDocument, r3 = e11.nodeName, i3 = to[r3];
      return i3 || (t11 = n3.body.appendChild(n3.createElement(r3)), i3 = T.css(t11, "display"), t11.parentNode.removeChild(t11), "none" === i3 && (i3 = "block"), to[r3] = i3), i3;
    })(r2))) : "none" !== n2 && (i2[o2] = "none", e0.set(r2, "display", n2)));
    for (o2 = 0; o2 < a2; o2++) null != i2[o2] && (e10[o2].style.display = i2[o2]);
    return e10;
  }
  T.fn.extend({ show: function() {
    return ta(this, true);
  }, hide: function() {
    return ta(this);
  }, toggle: function(e10) {
    return "boolean" == typeof e10 ? e10 ? this.show() : this.hide() : this.each(function() {
      e8(this) ? T(this).show() : T(this).hide();
    });
  } });
  var ts = function(e10) {
    return T.contains(e10.ownerDocument, e10) || e10.getRootNode(tu) === e10.ownerDocument;
  }, tu = { composed: true };
  L.getRootNode || (ts = function(e10) {
    return T.contains(e10.ownerDocument, e10);
  });
  var tl = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, tc = { thead: ["table"], col: ["colgroup", "table"], tr: ["tbody", "table"], td: ["tr", "tbody", "table"] };
  function tf(e10, t10) {
    var r2;
    return (r2 = void 0 !== e10.getElementsByTagName ? n.slice.call(e10.getElementsByTagName(t10 || "*")) : void 0 !== e10.querySelectorAll ? e10.querySelectorAll(t10 || "*") : [], void 0 === t10 || t10 && C(e10, t10)) ? T.merge([e10], r2) : r2;
  }
  tc.tbody = tc.tfoot = tc.colgroup = tc.caption = tc.thead, tc.th = tc.td;
  var tp = /^$|^module$|\/(?:java|ecma)script/i;
  function td(e10, t10) {
    for (var n2 = 0, r2 = e10.length; n2 < r2; n2++) e0.set(e10[n2], "globalEval", !t10 || e0.get(t10[n2], "globalEval"));
  }
  var th = /<|&#?\w+;/;
  function tg(e10, t10, r2, i2, o2) {
    for (var a2, s2, u2, l2, c2, f2 = t10.createDocumentFragment(), p2 = [], d2 = 0, g2 = e10.length; d2 < g2; d2++) if ((a2 = e10[d2]) || 0 === a2) if ("object" === h(a2) && (a2.nodeType || v(a2))) T.merge(p2, a2.nodeType ? [a2] : a2);
    else if (th.test(a2)) {
      s2 = s2 || f2.appendChild(t10.createElement("div")), c2 = (u2 = tc[(tl.exec(a2) || ["", ""])[1].toLowerCase()] || n).length;
      while (--c2 > -1) s2 = s2.appendChild(t10.createElement(u2[c2]));
      s2.innerHTML = T.htmlPrefilter(a2), T.merge(p2, s2.childNodes), (s2 = f2.firstChild).textContent = "";
    } else p2.push(t10.createTextNode(a2));
    f2.textContent = "", d2 = 0;
    while (a2 = p2[d2++]) {
      if (i2 && T.inArray(a2, i2) > -1) {
        o2 && o2.push(a2);
        continue;
      }
      if (l2 = ts(a2), s2 = tf(f2.appendChild(a2), "script"), l2 && td(s2), r2) {
        c2 = 0;
        while (a2 = s2[c2++]) tp.test(a2.type || "") && r2.push(a2);
      }
    }
    return f2;
  }
  function tv(e10) {
    return e10.type = (null !== e10.getAttribute("type")) + "/" + e10.type, e10;
  }
  function ty(e10) {
    return "true/" === (e10.type || "").slice(0, 5) ? e10.type = e10.type.slice(5) : e10.removeAttribute("type"), e10;
  }
  function tm(e10, t10, n2, r2) {
    t10 = o(t10);
    var i2, a2, s2, u2, l2, c2, f2 = 0, p2 = e10.length, d2 = p2 - 1, h2 = t10[0];
    if ("function" == typeof h2) return e10.each(function(i3) {
      var o2 = e10.eq(i3);
      t10[0] = h2.call(this, i3, o2.html()), tm(o2, t10, n2, r2);
    });
    if (p2 && (a2 = (i2 = tg(t10, e10[0].ownerDocument, false, e10, r2)).firstChild, 1 === i2.childNodes.length && (i2 = a2), a2 || r2)) {
      for (u2 = (s2 = T.map(tf(i2, "script"), tv)).length; f2 < p2; f2++) l2 = i2, f2 !== d2 && (l2 = T.clone(l2, true, true), u2 && T.merge(s2, tf(l2, "script"))), n2.call(e10[f2], l2, f2);
      if (u2) for (c2 = s2[s2.length - 1].ownerDocument, T.map(s2, ty), f2 = 0; f2 < u2; f2++) l2 = s2[f2], tp.test(l2.type || "") && !e0.get(l2, "globalEval") && T.contains(c2, l2) && (l2.src && "module" !== (l2.type || "").toLowerCase() ? T._evalUrl && !l2.noModule && T._evalUrl(l2.src, { nonce: l2.nonce, crossOrigin: l2.crossOrigin }, c2) : x(l2.textContent, l2, c2));
    }
    return e10;
  }
  var tx = /^(?:checkbox|radio)$/i, tb = /^([^.]*)(?:\.(.+)|)/;
  function tw() {
    return true;
  }
  function tT() {
    return false;
  }
  function tC(e10, t10, n2, r2, i2, o2) {
    var a2, s2;
    if ("object" == typeof t10) {
      for (s2 in "string" != typeof n2 && (r2 = r2 || n2, n2 = void 0), t10) tC(e10, s2, n2, r2, t10[s2], o2);
      return e10;
    }
    if (null == r2 && null == i2 ? (i2 = n2, r2 = n2 = void 0) : null == i2 && ("string" == typeof n2 ? (i2 = r2, r2 = void 0) : (i2 = r2, r2 = n2, n2 = void 0)), false === i2) i2 = tT;
    else if (!i2) return e10;
    return 1 === o2 && (a2 = i2, (i2 = function(e11) {
      return T().off(e11), a2.apply(this, arguments);
    }).guid = a2.guid || (a2.guid = T.guid++)), e10.each(function() {
      T.event.add(this, t10, i2, r2, n2);
    });
  }
  function tj(e10, t10, n2) {
    if (!n2) {
      void 0 === e0.get(e10, t10) && T.event.add(e10, t10, tw);
      return;
    }
    e0.set(e10, t10, false), T.event.add(e10, t10, { namespace: false, handler: function(e11) {
      var n3, r2 = e0.get(this, t10);
      if (1 & e11.isTrigger && this[t10]) {
        if (r2.length) (T.event.special[t10] || {}).delegateType && e11.stopPropagation();
        else if (r2 = i.call(arguments), e0.set(this, t10, r2), this[t10](), n3 = e0.get(this, t10), e0.set(this, t10, false), r2 !== n3) return e11.stopImmediatePropagation(), e11.preventDefault(), n3 && n3.value;
      } else r2.length && (e0.set(this, t10, { value: T.event.trigger(r2[0], r2.slice(1), this) }), e11.stopPropagation(), e11.isImmediatePropagationStopped = tw);
    } });
  }
  T.event = { add: function(e10, t10, n2, r2, i2) {
    var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = e0.get(e10);
    if (eK(e10)) {
      n2.handler && (n2 = (o2 = n2).handler, i2 = o2.selector), i2 && T.find.matchesSelector(L, i2), n2.guid || (n2.guid = T.guid++), (u2 = v2.events) || (u2 = v2.events = /* @__PURE__ */ Object.create(null)), (a2 = v2.handle) || (a2 = v2.handle = function(t11) {
        return T.event.triggered !== t11.type ? T.event.dispatch.apply(e10, arguments) : void 0;
      }), l2 = (t10 = (t10 || "").match(Q) || [""]).length;
      while (l2--) {
        if (d2 = g2 = (s2 = tb.exec(t10[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), !d2) continue;
        f2 = T.event.special[d2] || {}, d2 = (i2 ? f2.delegateType : f2.bindType) || d2, f2 = T.event.special[d2] || {}, c2 = T.extend({ type: d2, origType: g2, data: r2, handler: n2, guid: n2.guid, selector: i2, needsContext: i2 && T.expr.match.needsContext.test(i2), namespace: h2.join(".") }, o2), (p2 = u2[d2]) || ((p2 = u2[d2] = []).delegateCount = 0, (!f2.setup || false === f2.setup.call(e10, r2, h2, a2)) && e10.addEventListener && e10.addEventListener(d2, a2)), f2.add && (f2.add.call(e10, c2), c2.handler.guid || (c2.handler.guid = n2.guid)), i2 ? p2.splice(p2.delegateCount++, 0, c2) : p2.push(c2);
      }
    }
  }, remove: function(e10, t10, n2, r2, i2) {
    var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = e0.hasData(e10) && e0.get(e10);
    if (v2 && (u2 = v2.events)) {
      l2 = (t10 = (t10 || "").match(Q) || [""]).length;
      while (l2--) {
        if (d2 = g2 = (s2 = tb.exec(t10[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), !d2) {
          for (d2 in u2) T.event.remove(e10, d2 + t10[l2], n2, r2, true);
          continue;
        }
        f2 = T.event.special[d2] || {}, p2 = u2[d2 = (r2 ? f2.delegateType : f2.bindType) || d2] || [], s2 = s2[2] && RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)"), a2 = o2 = p2.length;
        while (o2--) c2 = p2[o2], (i2 || g2 === c2.origType) && (!n2 || n2.guid === c2.guid) && (!s2 || s2.test(c2.namespace)) && (!r2 || r2 === c2.selector || "**" === r2 && c2.selector) && (p2.splice(o2, 1), c2.selector && p2.delegateCount--, f2.remove && f2.remove.call(e10, c2));
        a2 && !p2.length && (f2.teardown && false !== f2.teardown.call(e10, h2, v2.handle) || T.removeEvent(e10, d2, v2.handle), delete u2[d2]);
      }
      T.isEmptyObject(u2) && e0.remove(e10, "handle events");
    }
  }, dispatch: function(e10) {
    var t10, n2, r2, i2, o2, a2, s2 = Array(arguments.length), u2 = T.event.fix(e10), l2 = (e0.get(this, "events") || /* @__PURE__ */ Object.create(null))[u2.type] || [], c2 = T.event.special[u2.type] || {};
    for (t10 = 1, s2[0] = u2; t10 < arguments.length; t10++) s2[t10] = arguments[t10];
    if (u2.delegateTarget = this, !c2.preDispatch || false !== c2.preDispatch.call(this, u2)) {
      a2 = T.event.handlers.call(this, u2, l2), t10 = 0;
      while ((i2 = a2[t10++]) && !u2.isPropagationStopped()) {
        u2.currentTarget = i2.elem, n2 = 0;
        while ((o2 = i2.handlers[n2++]) && !u2.isImmediatePropagationStopped()) (!u2.rnamespace || false === o2.namespace || u2.rnamespace.test(o2.namespace)) && (u2.handleObj = o2, u2.data = o2.data, void 0 !== (r2 = ((T.event.special[o2.origType] || {}).handle || o2.handler).apply(i2.elem, s2)) && false === (u2.result = r2) && (u2.preventDefault(), u2.stopPropagation()));
      }
      return c2.postDispatch && c2.postDispatch.call(this, u2), u2.result;
    }
  }, handlers: function(e10, t10) {
    var n2, r2, i2, o2, a2, s2 = [], u2 = t10.delegateCount, l2 = e10.target;
    if (u2 && !("click" === e10.type && e10.button >= 1)) {
      for (; l2 !== this; l2 = l2.parentNode || this) if (1 === l2.nodeType && ("click" !== e10.type || true !== l2.disabled)) {
        for (n2 = 0, o2 = [], a2 = {}; n2 < u2; n2++) void 0 === a2[i2 = (r2 = t10[n2]).selector + " "] && (a2[i2] = r2.needsContext ? T(i2, this).index(l2) > -1 : T.find(i2, this, null, [l2]).length), a2[i2] && o2.push(r2);
        o2.length && s2.push({ elem: l2, handlers: o2 });
      }
    }
    return l2 = this, u2 < t10.length && s2.push({ elem: l2, handlers: t10.slice(u2) }), s2;
  }, addProp: function(e10, t10) {
    Object.defineProperty(T.Event.prototype, e10, { enumerable: true, configurable: true, get: "function" == typeof t10 ? function() {
      if (this.originalEvent) return t10(this.originalEvent);
    } : function() {
      if (this.originalEvent) return this.originalEvent[e10];
    }, set: function(t11) {
      Object.defineProperty(this, e10, { enumerable: true, configurable: true, writable: true, value: t11 });
    } });
  }, fix: function(e10) {
    return e10[T.expando] ? e10 : new T.Event(e10);
  }, special: T.extend(/* @__PURE__ */ Object.create(null), { load: { noBubble: true }, click: { setup: function(e10) {
    var t10 = this || e10;
    return tx.test(t10.type) && t10.click && C(t10, "input") && tj(t10, "click", true), false;
  }, trigger: function(e10) {
    var t10 = this || e10;
    return tx.test(t10.type) && t10.click && C(t10, "input") && tj(t10, "click"), true;
  }, _default: function(e10) {
    var t10 = e10.target;
    return tx.test(t10.type) && t10.click && C(t10, "input") && e0.get(t10, "click") || C(t10, "a");
  } }, beforeunload: { postDispatch: function(e10) {
    void 0 !== e10.result && e10.preventDefault();
  } } }) }, T.removeEvent = function(e10, t10, n2) {
    e10.removeEventListener && e10.removeEventListener(t10, n2);
  }, T.Event = function(e10, t10) {
    if (!(this instanceof T.Event)) return new T.Event(e10, t10);
    e10 && e10.type ? (this.originalEvent = e10, this.type = e10.type, this.isDefaultPrevented = e10.defaultPrevented ? tw : tT, this.target = e10.target, this.currentTarget = e10.currentTarget, this.relatedTarget = e10.relatedTarget) : this.type = e10, t10 && T.extend(this, t10), this.timeStamp = e10 && e10.timeStamp || Date.now(), this[T.expando] = true;
  }, T.Event.prototype = { constructor: T.Event, isDefaultPrevented: tT, isPropagationStopped: tT, isImmediatePropagationStopped: tT, isSimulated: false, preventDefault: function() {
    var e10 = this.originalEvent;
    this.isDefaultPrevented = tw, e10 && !this.isSimulated && e10.preventDefault();
  }, stopPropagation: function() {
    var e10 = this.originalEvent;
    this.isPropagationStopped = tw, e10 && !this.isSimulated && e10.stopPropagation();
  }, stopImmediatePropagation: function() {
    var e10 = this.originalEvent;
    this.isImmediatePropagationStopped = tw, e10 && !this.isSimulated && e10.stopImmediatePropagation(), this.stopPropagation();
  } }, T.each({ altKey: true, bubbles: true, cancelable: true, changedTouches: true, ctrlKey: true, detail: true, eventPhase: true, metaKey: true, pageX: true, pageY: true, shiftKey: true, view: true, char: true, code: true, charCode: true, key: true, keyCode: true, button: true, buttons: true, clientX: true, clientY: true, offsetX: true, offsetY: true, pointerId: true, pointerType: true, screenX: true, screenY: true, targetTouches: true, toElement: true, touches: true, which: true }, T.event.addProp), T.each({ focus: "focusin", blur: "focusout" }, function(e10, t10) {
    function n2(e11) {
      var t11 = T.event.fix(e11);
      t11.type = "focusin" === e11.type ? "focus" : "blur", t11.isSimulated = true, t11.target === t11.currentTarget && e0.get(this, "handle")(t11);
    }
    T.event.special[e10] = { setup: function() {
      if (tj(this, e10, true), !k) return false;
      this.addEventListener(t10, n2);
    }, trigger: function() {
      return tj(this, e10), true;
    }, teardown: function() {
      if (!k) return false;
      this.removeEventListener(t10, n2);
    }, _default: function(t11) {
      return e0.get(t11.target, e10);
    }, delegateType: t10 };
  }), T.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e10, t10) {
    T.event.special[e10] = { delegateType: t10, bindType: t10, handle: function(e11) {
      var n2, r2 = e11.relatedTarget, i2 = e11.handleObj;
      return r2 && (r2 === this || T.contains(this, r2)) || (e11.type = i2.origType, n2 = i2.handler.apply(this, arguments), e11.type = t10), n2;
    } };
  }), T.fn.extend({ on: function(e10, t10, n2, r2) {
    return tC(this, e10, t10, n2, r2);
  }, one: function(e10, t10, n2, r2) {
    return tC(this, e10, t10, n2, r2, 1);
  }, off: function(e10, t10, n2) {
    var r2, i2;
    if (e10 && e10.preventDefault && e10.handleObj) return r2 = e10.handleObj, T(e10.delegateTarget).off(r2.namespace ? r2.origType + "." + r2.namespace : r2.origType, r2.selector, r2.handler), this;
    if ("object" == typeof e10) {
      for (i2 in e10) this.off(i2, t10, e10[i2]);
      return this;
    }
    return (false === t10 || "function" == typeof t10) && (n2 = t10, t10 = void 0), false === n2 && (n2 = tT), this.each(function() {
      T.event.remove(this, e10, n2, t10);
    });
  } });
  var tE = /<script|<style|<link/i;
  function tk(e10, t10) {
    return C(e10, "table") && C(11 !== t10.nodeType ? t10 : t10.firstChild, "tr") && T(e10).children("tbody")[0] || e10;
  }
  function tS(e10, t10) {
    var n2, r2, i2, o2 = e0.get(e10, "events");
    if (1 === t10.nodeType) {
      if (o2) for (n2 in e0.remove(t10, "handle events"), o2) for (r2 = 0, i2 = o2[n2].length; r2 < i2; r2++) T.event.add(t10, n2, o2[n2][r2]);
      e1.hasData(e10) && e1.set(t10, T.extend({}, e1.get(e10)));
    }
  }
  function tD(e10, t10, n2) {
    for (var r2, i2 = t10 ? T.filter(t10, e10) : e10, o2 = 0; null != (r2 = i2[o2]); o2++) n2 || 1 !== r2.nodeType || T.cleanData(tf(r2)), r2.parentNode && (n2 && ts(r2) && td(tf(r2, "script")), r2.parentNode.removeChild(r2));
    return e10;
  }
  T.extend({ htmlPrefilter: function(e10) {
    return e10;
  }, clone: function(e10, t10, n2) {
    var r2, i2, o2, a2, s2 = e10.cloneNode(true), u2 = ts(e10);
    if (k && (1 === e10.nodeType || 11 === e10.nodeType) && !T.isXMLDoc(e10)) for (r2 = 0, a2 = tf(s2), i2 = (o2 = tf(e10)).length; r2 < i2; r2++) C(a2[r2], "textarea") && (a2[r2].defaultValue = o2[r2].defaultValue);
    if (t10) if (n2) for (r2 = 0, o2 = o2 || tf(e10), a2 = a2 || tf(s2), i2 = o2.length; r2 < i2; r2++) tS(o2[r2], a2[r2]);
    else tS(e10, s2);
    return (a2 = tf(s2, "script")).length > 0 && td(a2, !u2 && tf(e10, "script")), s2;
  }, cleanData: function(e10) {
    for (var t10, n2, r2, i2 = T.event.special, o2 = 0; void 0 !== (n2 = e10[o2]); o2++) if (eK(n2)) {
      if (t10 = n2[e0.expando]) {
        if (t10.events) for (r2 in t10.events) i2[r2] ? T.event.remove(n2, r2) : T.removeEvent(n2, r2, t10.handle);
        n2[e0.expando] = void 0;
      }
      n2[e1.expando] && (n2[e1.expando] = void 0);
    }
  } }), T.fn.extend({ detach: function(e10) {
    return tD(this, e10, true);
  }, remove: function(e10) {
    return tD(this, e10);
  }, text: function(e10) {
    return V(this, function(e11) {
      return void 0 === e11 ? T.text(this) : this.empty().each(function() {
        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e11);
      });
    }, null, e10, arguments.length);
  }, append: function() {
    return tm(this, arguments, function(e10) {
      (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && tk(this, e10).appendChild(e10);
    });
  }, prepend: function() {
    return tm(this, arguments, function(e10) {
      if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
        var t10 = tk(this, e10);
        t10.insertBefore(e10, t10.firstChild);
      }
    });
  }, before: function() {
    return tm(this, arguments, function(e10) {
      this.parentNode && this.parentNode.insertBefore(e10, this);
    });
  }, after: function() {
    return tm(this, arguments, function(e10) {
      this.parentNode && this.parentNode.insertBefore(e10, this.nextSibling);
    });
  }, empty: function() {
    for (var e10, t10 = 0; null != (e10 = this[t10]); t10++) 1 === e10.nodeType && (T.cleanData(tf(e10, false)), e10.textContent = "");
    return this;
  }, clone: function(e10, t10) {
    return e10 = null != e10 && e10, t10 = null == t10 ? e10 : t10, this.map(function() {
      return T.clone(this, e10, t10);
    });
  }, html: function(e10) {
    return V(this, function(e11) {
      var t10 = this[0] || {}, n2 = 0, r2 = this.length;
      if (void 0 === e11 && 1 === t10.nodeType) return t10.innerHTML;
      if ("string" == typeof e11 && !tE.test(e11) && !tc[(tl.exec(e11) || ["", ""])[1].toLowerCase()]) {
        e11 = T.htmlPrefilter(e11);
        try {
          for (; n2 < r2; n2++) t10 = this[n2] || {}, 1 === t10.nodeType && (T.cleanData(tf(t10, false)), t10.innerHTML = e11);
          t10 = 0;
        } catch (e12) {
        }
      }
      t10 && this.empty().append(e11);
    }, null, e10, arguments.length);
  }, replaceWith: function() {
    var e10 = [];
    return tm(this, arguments, function(t10) {
      var n2 = this.parentNode;
      0 > T.inArray(this, e10) && (T.cleanData(tf(this)), n2 && n2.replaceChild(t10, this));
    }, e10);
  } }), T.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e10, t10) {
    T.fn[e10] = function(e11) {
      for (var n2, r2 = [], i2 = T(e11), o2 = i2.length - 1, s2 = 0; s2 <= o2; s2++) n2 = s2 === o2 ? this : this.clone(true), T(i2[s2])[t10](n2), a.apply(r2, n2);
      return this.pushStack(r2);
    };
  });
  var tA = RegExp("^(" + e5 + ")(?!px)[a-z%]+$", "i"), tN = /^--/;
  function tq(t10) {
    var n2 = t10.ownerDocument.defaultView;
    return n2 || (n2 = e), n2.getComputedStyle(t10);
  }
  function tO(e10, t10, n2) {
    var r2, i2 = tN.test(t10);
    return (n2 = n2 || tq(e10)) && (r2 = n2.getPropertyValue(t10) || n2[t10], i2 && r2 && (r2 = r2.replace(D, "$1") || void 0), "" !== r2 || ts(e10) || (r2 = T.style(e10, t10))), void 0 !== r2 ? r2 + "" : r2;
  }
  var tL = ["Webkit", "Moz", "ms"], tH = y.createElement("div").style;
  function tP(e10) {
    return e10 in tH ? e10 : (function(e11) {
      var t10 = e11[0].toUpperCase() + e11.slice(1), n2 = tL.length;
      while (n2--) if ((e11 = tL[n2] + t10) in tH) return e11;
    })(e10) || e10;
  }
  var tR, tM, tW = y.createElement("table");
  function t$() {
    if (tW && tW.style) {
      var t10, n2 = y.createElement("col"), r2 = y.createElement("tr"), i2 = y.createElement("td");
      if (tW.style.cssText = "position:absolute;left:-11111px;border-collapse:separate;border-spacing:0", r2.style.cssText = "box-sizing:content-box;border:1px solid;height:1px", i2.style.cssText = "height:9px;width:9px;padding:0", n2.span = 2, L.appendChild(tW).appendChild(n2).parentNode.appendChild(r2).appendChild(i2).parentNode.appendChild(i2.cloneNode(true)), 0 === tW.offsetWidth) return void L.removeChild(tW);
      t10 = e.getComputedStyle(r2), tM = k || 18 === Math.round(parseFloat(e.getComputedStyle(n2).width)), tR = Math.round(parseFloat(t10.height) + parseFloat(t10.borderTopWidth) + parseFloat(t10.borderBottomWidth)) === r2.offsetHeight, L.removeChild(tW), tW = null;
    }
  }
  T.extend(d, { reliableTrDimensions: function() {
    return t$(), tR;
  }, reliableColDimensions: function() {
    return t$(), tM;
  } });
  var tI = { position: "absolute", visibility: "hidden", display: "block" }, tF = { letterSpacing: "0", fontWeight: "400" };
  function tB(e10, t10, n2) {
    var r2 = e9.exec(t10);
    return r2 ? Math.max(0, r2[2] - (n2 || 0)) + (r2[3] || "px") : t10;
  }
  function t_(e10, t10, n2, r2, i2, o2) {
    var a2 = +("width" === t10), s2 = 0, u2 = 0, l2 = 0;
    if (n2 === (r2 ? "border" : "content")) return 0;
    for (; a2 < 4; a2 += 2) "margin" === n2 && (l2 += T.css(e10, n2 + e6[a2], true, i2)), r2 ? ("content" === n2 && (u2 -= T.css(e10, "padding" + e6[a2], true, i2)), "margin" !== n2 && (u2 -= T.css(e10, "border" + e6[a2] + "Width", true, i2))) : (u2 += T.css(e10, "padding" + e6[a2], true, i2), "padding" !== n2 ? u2 += T.css(e10, "border" + e6[a2] + "Width", true, i2) : s2 += T.css(e10, "border" + e6[a2] + "Width", true, i2));
    return !r2 && o2 >= 0 && (u2 += Math.max(0, Math.ceil(e10["offset" + t10[0].toUpperCase() + t10.slice(1)] - o2 - u2 - s2 - 0.5)) || 0), u2 + l2;
  }
  function tU(e10, t10, n2) {
    var r2 = tq(e10), i2 = (k || n2) && "border-box" === T.css(e10, "boxSizing", false, r2), o2 = i2, a2 = tO(e10, t10, r2), s2 = "offset" + t10[0].toUpperCase() + t10.slice(1);
    if (tA.test(a2)) {
      if (!n2) return a2;
      a2 = "auto";
    }
    return ("auto" === a2 || k && i2 || !d.reliableColDimensions() && C(e10, "col") || !d.reliableTrDimensions() && C(e10, "tr")) && e10.getClientRects().length && (i2 = "border-box" === T.css(e10, "boxSizing", false, r2), (o2 = s2 in e10) && (a2 = e10[s2])), (a2 = parseFloat(a2) || 0) + t_(e10, t10, n2 || (i2 ? "border" : "content"), o2, r2, a2) + "px";
  }
  function tX(e10, t10, n2, r2, i2) {
    return new tX.prototype.init(e10, t10, n2, r2, i2);
  }
  T.extend({ cssHooks: {}, style: function(e10, t10, n2, r2) {
    if (e10 && 3 !== e10.nodeType && 8 !== e10.nodeType && e10.style) {
      var i2, o2, a2, s2 = ti(t10), u2 = tN.test(t10), l2 = e10.style;
      if (u2 || (t10 = tP(s2)), a2 = T.cssHooks[t10] || T.cssHooks[s2], void 0 === n2) return a2 && "get" in a2 && void 0 !== (i2 = a2.get(e10, false, r2)) ? i2 : l2[t10];
      if ("string" == (o2 = typeof n2) && (i2 = e9.exec(n2)) && i2[1] && (n2 = tn(e10, t10, i2), o2 = "number"), null != n2 && n2 == n2) "number" === o2 && (n2 += i2 && i2[3] || (tt(s2) ? "px" : "")), k && "" === n2 && 0 === t10.indexOf("background") && (l2[t10] = "inherit"), a2 && "set" in a2 && void 0 === (n2 = a2.set(e10, n2, r2)) || (u2 ? l2.setProperty(t10, n2) : l2[t10] = n2);
    }
  }, css: function(e10, t10, n2, r2) {
    var i2, o2, a2, s2 = ti(t10);
    return (tN.test(t10) || (t10 = tP(s2)), (a2 = T.cssHooks[t10] || T.cssHooks[s2]) && "get" in a2 && (i2 = a2.get(e10, true, n2)), void 0 === i2 && (i2 = tO(e10, t10, r2)), "normal" === i2 && t10 in tF && (i2 = tF[t10]), "" === n2 || n2) ? (o2 = parseFloat(i2), true === n2 || isFinite(o2) ? o2 || 0 : i2) : i2;
  } }), T.each(["height", "width"], function(e10, t10) {
    T.cssHooks[t10] = { get: function(e11, n2, r2) {
      if (n2) return "none" === T.css(e11, "display") ? (function(e12, t11, n3) {
        var r3, i2, o2 = {};
        for (i2 in t11) o2[i2] = e12.style[i2], e12.style[i2] = t11[i2];
        for (i2 in r3 = n3.call(e12), t11) e12.style[i2] = o2[i2];
        return r3;
      })(e11, tI, function() {
        return tU(e11, t10, r2);
      }) : tU(e11, t10, r2);
    }, set: function(e11, n2, r2) {
      var i2, o2 = tq(e11), a2 = r2 && "border-box" === T.css(e11, "boxSizing", false, o2), s2 = r2 ? t_(e11, t10, r2, a2, o2) : 0;
      return s2 && (i2 = e9.exec(n2)) && "px" !== (i2[3] || "px") && (e11.style[t10] = n2, n2 = T.css(e11, t10)), tB(e11, n2, s2);
    } };
  }), T.each({ margin: "", padding: "", border: "Width" }, function(e10, t10) {
    T.cssHooks[e10 + t10] = { expand: function(n2) {
      for (var r2 = 0, i2 = {}, o2 = "string" == typeof n2 ? n2.split(" ") : [n2]; r2 < 4; r2++) i2[e10 + e6[r2] + t10] = o2[r2] || o2[r2 - 2] || o2[0];
      return i2;
    } }, "margin" !== e10 && (T.cssHooks[e10 + t10].set = tB);
  }), T.fn.extend({ css: function(e10, t10) {
    return V(this, function(e11, t11, n2) {
      var r2, i2, o2 = {}, a2 = 0;
      if (Array.isArray(t11)) {
        for (r2 = tq(e11), i2 = t11.length; a2 < i2; a2++) o2[t11[a2]] = T.css(e11, t11[a2], false, r2);
        return o2;
      }
      return void 0 !== n2 ? T.style(e11, t11, n2) : T.css(e11, t11);
    }, e10, t10, arguments.length > 1);
  } }), T.Tween = tX, tX.prototype = { constructor: tX, init: function(e10, t10, n2, r2, i2, o2) {
    this.elem = e10, this.prop = n2, this.easing = i2 || T.easing._default, this.options = t10, this.start = this.now = this.cur(), this.end = r2, this.unit = o2 || (tt(n2) ? "px" : "");
  }, cur: function() {
    var e10 = tX.propHooks[this.prop];
    return e10 && e10.get ? e10.get(this) : tX.propHooks._default.get(this);
  }, run: function(e10) {
    var t10, n2 = tX.propHooks[this.prop];
    return this.options.duration ? this.pos = t10 = T.easing[this.easing](e10, this.options.duration * e10, 0, 1, this.options.duration) : this.pos = t10 = e10, this.now = (this.end - this.start) * t10 + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n2 && n2.set ? n2.set(this) : tX.propHooks._default.set(this), this;
  } }, tX.prototype.init.prototype = tX.prototype, tX.propHooks = { _default: { get: function(e10) {
    var t10;
    return 1 !== e10.elem.nodeType || null != e10.elem[e10.prop] && null == e10.elem.style[e10.prop] ? e10.elem[e10.prop] : (t10 = T.css(e10.elem, e10.prop, "")) && "auto" !== t10 ? t10 : 0;
  }, set: function(e10) {
    T.fx.step[e10.prop] ? T.fx.step[e10.prop](e10) : 1 === e10.elem.nodeType && (T.cssHooks[e10.prop] || null != e10.elem.style[tP(e10.prop)]) ? T.style(e10.elem, e10.prop, e10.now + e10.unit) : e10.elem[e10.prop] = e10.now;
  } } }, T.easing = { linear: function(e10) {
    return e10;
  }, swing: function(e10) {
    return 0.5 - Math.cos(e10 * Math.PI) / 2;
  }, _default: "swing" }, T.fx = tX.prototype.init, T.fx.step = {};
  var tz, tY, tG = /^(?:toggle|show|hide)$/, tV = /queueHooks$/;
  function tQ() {
    return e.setTimeout(function() {
      tz = void 0;
    }), tz = Date.now();
  }
  function tJ(e10, t10) {
    var n2, r2 = 0, i2 = { height: e10 };
    for (t10 = +!!t10; r2 < 4; r2 += 2 - t10) i2["margin" + (n2 = e6[r2])] = i2["padding" + n2] = e10;
    return t10 && (i2.opacity = i2.width = e10), i2;
  }
  function tK(e10, t10, n2) {
    for (var r2, i2 = (tZ.tweeners[t10] || []).concat(tZ.tweeners["*"]), o2 = 0, a2 = i2.length; o2 < a2; o2++) if (r2 = i2[o2].call(n2, t10, e10)) return r2;
  }
  function tZ(e10, t10, n2) {
    var r2, i2, o2 = 0, a2 = tZ.prefilters.length, s2 = T.Deferred().always(function() {
      delete u2.elem;
    }), u2 = function() {
      if (i2) return false;
      for (var t11 = tz || tQ(), n3 = Math.max(0, l2.startTime + l2.duration - t11), r3 = 1 - (n3 / l2.duration || 0), o3 = 0, a3 = l2.tweens.length; o3 < a3; o3++) l2.tweens[o3].run(r3);
      return (s2.notifyWith(e10, [l2, r3, n3]), r3 < 1 && a3) ? n3 : (a3 || s2.notifyWith(e10, [l2, 1, 0]), s2.resolveWith(e10, [l2]), false);
    }, l2 = s2.promise({ elem: e10, props: T.extend({}, t10), opts: T.extend(true, { specialEasing: {}, easing: T.easing._default }, n2), originalProperties: t10, originalOptions: n2, startTime: tz || tQ(), duration: n2.duration, tweens: [], createTween: function(t11, n3) {
      var r3 = T.Tween(e10, l2.opts, t11, n3, l2.opts.specialEasing[t11] || l2.opts.easing);
      return l2.tweens.push(r3), r3;
    }, stop: function(t11) {
      var n3 = 0, r3 = t11 ? l2.tweens.length : 0;
      if (i2) return this;
      for (i2 = true; n3 < r3; n3++) l2.tweens[n3].run(1);
      return t11 ? (s2.notifyWith(e10, [l2, 1, 0]), s2.resolveWith(e10, [l2, t11])) : s2.rejectWith(e10, [l2, t11]), this;
    } }), c2 = l2.props;
    for (!(function(e11, t11) {
      var n3, r3, i3, o3, a3;
      for (n3 in e11) if (i3 = t11[r3 = ti(n3)], Array.isArray(o3 = e11[n3]) && (i3 = o3[1], o3 = e11[n3] = o3[0]), n3 !== r3 && (e11[r3] = o3, delete e11[n3]), (a3 = T.cssHooks[r3]) && "expand" in a3) for (n3 in o3 = a3.expand(o3), delete e11[r3], o3) n3 in e11 || (e11[n3] = o3[n3], t11[n3] = i3);
      else t11[r3] = i3;
    })(c2, l2.opts.specialEasing); o2 < a2; o2++) if (r2 = tZ.prefilters[o2].call(l2, e10, c2, l2.opts)) return "function" == typeof r2.stop && (T._queueHooks(l2.elem, l2.opts.queue).stop = r2.stop.bind(r2)), r2;
    return T.map(c2, tK, l2), "function" == typeof l2.opts.start && l2.opts.start.call(e10, l2), l2.progress(l2.opts.progress).done(l2.opts.done, l2.opts.complete).fail(l2.opts.fail).always(l2.opts.always), T.fx.timer(T.extend(u2, { elem: e10, anim: l2, queue: l2.opts.queue })), l2;
  }
  T.Animation = T.extend(tZ, { tweeners: { "*": [function(e10, t10) {
    var n2 = this.createTween(e10, t10);
    return tn(n2.elem, e10, e9.exec(t10), n2), n2;
  }] }, tweener: function(e10, t10) {
    "function" == typeof e10 ? (t10 = e10, e10 = ["*"]) : e10 = e10.match(Q);
    for (var n2, r2 = 0, i2 = e10.length; r2 < i2; r2++) n2 = e10[r2], tZ.tweeners[n2] = tZ.tweeners[n2] || [], tZ.tweeners[n2].unshift(t10);
  }, prefilters: [function(e10, t10, n2) {
    var r2, i2, o2, a2, s2, u2, l2, c2, f2 = "width" in t10 || "height" in t10, p2 = this, d2 = {}, h2 = e10.style, g2 = e10.nodeType && e8(e10), v2 = e0.get(e10, "fxshow");
    for (r2 in n2.queue || (null == (a2 = T._queueHooks(e10, "fx")).unqueued && (a2.unqueued = 0, s2 = a2.empty.fire, a2.empty.fire = function() {
      a2.unqueued || s2();
    }), a2.unqueued++, p2.always(function() {
      p2.always(function() {
        a2.unqueued--, T.queue(e10, "fx").length || a2.empty.fire();
      });
    })), t10) if (i2 = t10[r2], tG.test(i2)) {
      if (delete t10[r2], o2 = o2 || "toggle" === i2, i2 === (g2 ? "hide" : "show")) if ("show" !== i2 || !v2 || void 0 === v2[r2]) continue;
      else g2 = true;
      d2[r2] = v2 && v2[r2] || T.style(e10, r2);
    }
    if (!(!(u2 = !T.isEmptyObject(t10)) && T.isEmptyObject(d2))) for (r2 in f2 && 1 === e10.nodeType && (n2.overflow = [h2.overflow, h2.overflowX, h2.overflowY], null == (l2 = v2 && v2.display) && (l2 = e0.get(e10, "display")), "none" === (c2 = T.css(e10, "display")) && (l2 ? c2 = l2 : (ta([e10], true), l2 = e10.style.display || l2, c2 = T.css(e10, "display"), ta([e10]))), ("inline" === c2 || "inline-block" === c2 && null != l2) && "none" === T.css(e10, "float") && (u2 || (p2.done(function() {
      h2.display = l2;
    }), null == l2 && (l2 = "none" === (c2 = h2.display) ? "" : c2)), h2.display = "inline-block")), n2.overflow && (h2.overflow = "hidden", p2.always(function() {
      h2.overflow = n2.overflow[0], h2.overflowX = n2.overflow[1], h2.overflowY = n2.overflow[2];
    })), u2 = false, d2) u2 || (v2 ? "hidden" in v2 && (g2 = v2.hidden) : v2 = e0.set(e10, "fxshow", { display: l2 }), o2 && (v2.hidden = !g2), g2 && ta([e10], true), p2.done(function() {
      for (r2 in g2 || ta([e10]), e0.remove(e10, "fxshow"), d2) T.style(e10, r2, d2[r2]);
    })), u2 = tK(g2 ? v2[r2] : 0, r2, p2), r2 in v2 || (v2[r2] = u2.start, g2 && (u2.end = u2.start, u2.start = 0));
  }], prefilter: function(e10, t10) {
    t10 ? tZ.prefilters.unshift(e10) : tZ.prefilters.push(e10);
  } }), T.speed = function(e10, t10, n2) {
    var r2 = e10 && "object" == typeof e10 ? T.extend({}, e10) : { complete: n2 || t10 || "function" == typeof e10 && e10, duration: e10, easing: n2 && t10 || t10 && "function" != typeof t10 && t10 };
    return T.fx.off ? r2.duration = 0 : "number" != typeof r2.duration && (r2.duration in T.fx.speeds ? r2.duration = T.fx.speeds[r2.duration] : r2.duration = T.fx.speeds._default), (null == r2.queue || true === r2.queue) && (r2.queue = "fx"), r2.old = r2.complete, r2.complete = function() {
      "function" == typeof r2.old && r2.old.call(this), r2.queue && T.dequeue(this, r2.queue);
    }, r2;
  }, T.fn.extend({ fadeTo: function(e10, t10, n2, r2) {
    return this.filter(e8).css("opacity", 0).show().end().animate({ opacity: t10 }, e10, n2, r2);
  }, animate: function(e10, t10, n2, r2) {
    var i2 = T.isEmptyObject(e10), o2 = T.speed(t10, n2, r2), a2 = function() {
      var t11 = tZ(this, T.extend({}, e10), o2);
      (i2 || e0.get(this, "finish")) && t11.stop(true);
    };
    return a2.finish = a2, i2 || false === o2.queue ? this.each(a2) : this.queue(o2.queue, a2);
  }, stop: function(e10, t10, n2) {
    var r2 = function(e11) {
      var t11 = e11.stop;
      delete e11.stop, t11(n2);
    };
    return "string" != typeof e10 && (n2 = t10, t10 = e10, e10 = void 0), t10 && this.queue(e10 || "fx", []), this.each(function() {
      var t11 = true, i2 = null != e10 && e10 + "queueHooks", o2 = T.timers, a2 = e0.get(this);
      if (i2) a2[i2] && a2[i2].stop && r2(a2[i2]);
      else for (i2 in a2) a2[i2] && a2[i2].stop && tV.test(i2) && r2(a2[i2]);
      for (i2 = o2.length; i2--; ) o2[i2].elem === this && (null == e10 || o2[i2].queue === e10) && (o2[i2].anim.stop(n2), t11 = false, o2.splice(i2, 1));
      (t11 || !n2) && T.dequeue(this, e10);
    });
  }, finish: function(e10) {
    return false !== e10 && (e10 = e10 || "fx"), this.each(function() {
      var t10, n2 = e0.get(this), r2 = n2[e10 + "queue"], i2 = n2[e10 + "queueHooks"], o2 = T.timers, a2 = r2 ? r2.length : 0;
      for (n2.finish = true, T.queue(this, e10, []), i2 && i2.stop && i2.stop.call(this, true), t10 = o2.length; t10--; ) o2[t10].elem === this && o2[t10].queue === e10 && (o2[t10].anim.stop(true), o2.splice(t10, 1));
      for (t10 = 0; t10 < a2; t10++) r2[t10] && r2[t10].finish && r2[t10].finish.call(this);
      delete n2.finish;
    });
  } }), T.each(["toggle", "show", "hide"], function(e10, t10) {
    var n2 = T.fn[t10];
    T.fn[t10] = function(e11, r2, i2) {
      return null == e11 || "boolean" == typeof e11 ? n2.apply(this, arguments) : this.animate(tJ(t10, true), e11, r2, i2);
    };
  }), T.each({ slideDown: tJ("show"), slideUp: tJ("hide"), slideToggle: tJ("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e10, t10) {
    T.fn[e10] = function(e11, n2, r2) {
      return this.animate(t10, e11, n2, r2);
    };
  }), T.timers = [], T.fx.tick = function() {
    var e10, t10 = 0, n2 = T.timers;
    for (tz = Date.now(); t10 < n2.length; t10++) (e10 = n2[t10])() || n2[t10] !== e10 || n2.splice(t10--, 1);
    n2.length || T.fx.stop(), tz = void 0;
  }, T.fx.timer = function(e10) {
    T.timers.push(e10), T.fx.start();
  }, T.fx.start = function() {
    tY || (tY = true, (function t10() {
      tY && (false === y.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(t10) : e.setTimeout(t10, 13), T.fx.tick());
    })());
  }, T.fx.stop = function() {
    tY = null;
  }, T.fx.speeds = { slow: 600, fast: 200, _default: 400 }, T.fn.delay = function(t10, n2) {
    return t10 = T.fx && T.fx.speeds[t10] || t10, n2 = n2 || "fx", this.queue(n2, function(n3, r2) {
      var i2 = e.setTimeout(n3, t10);
      r2.stop = function() {
        e.clearTimeout(i2);
      };
    });
  };
  var t0 = /^(?:input|select|textarea|button)$/i, t1 = /^(?:a|area)$/i;
  function t2(e10) {
    return (e10.match(Q) || []).join(" ");
  }
  function t3(e10) {
    return e10.getAttribute && e10.getAttribute("class") || "";
  }
  function t4(e10) {
    return Array.isArray(e10) ? e10 : "string" == typeof e10 && e10.match(Q) || [];
  }
  T.fn.extend({ prop: function(e10, t10) {
    return V(this, T.prop, e10, t10, arguments.length > 1);
  }, removeProp: function(e10) {
    return this.each(function() {
      delete this[T.propFix[e10] || e10];
    });
  } }), T.extend({ prop: function(e10, t10, n2) {
    var r2, i2, o2 = e10.nodeType;
    if (3 !== o2 && 8 !== o2 && 2 !== o2) return (1 === o2 && T.isXMLDoc(e10) || (t10 = T.propFix[t10] || t10, i2 = T.propHooks[t10]), void 0 !== n2) ? i2 && "set" in i2 && void 0 !== (r2 = i2.set(e10, n2, t10)) ? r2 : e10[t10] = n2 : i2 && "get" in i2 && null !== (r2 = i2.get(e10, t10)) ? r2 : e10[t10];
  }, propHooks: { tabIndex: { get: function(e10) {
    var t10 = e10.getAttribute("tabindex");
    return t10 ? parseInt(t10, 10) : t0.test(e10.nodeName) || t1.test(e10.nodeName) && e10.href ? 0 : -1;
  } } }, propFix: { for: "htmlFor", class: "className" } }), k && (T.propHooks.selected = { get: function(e10) {
    var t10 = e10.parentNode;
    return t10 && t10.parentNode && t10.parentNode.selectedIndex, null;
  }, set: function(e10) {
    var t10 = e10.parentNode;
    t10 && (t10.selectedIndex, t10.parentNode && t10.parentNode.selectedIndex);
  } }), T.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    T.propFix[this.toLowerCase()] = this;
  }), T.fn.extend({ addClass: function(e10) {
    var t10, n2, r2, i2, o2, a2;
    return "function" == typeof e10 ? this.each(function(t11) {
      T(this).addClass(e10.call(this, t11, t3(this)));
    }) : (t10 = t4(e10)).length ? this.each(function() {
      if (r2 = t3(this), n2 = 1 === this.nodeType && " " + t2(r2) + " ") {
        for (o2 = 0; o2 < t10.length; o2++) i2 = t10[o2], 0 > n2.indexOf(" " + i2 + " ") && (n2 += i2 + " ");
        r2 !== (a2 = t2(n2)) && this.setAttribute("class", a2);
      }
    }) : this;
  }, removeClass: function(e10) {
    var t10, n2, r2, i2, o2, a2;
    return "function" == typeof e10 ? this.each(function(t11) {
      T(this).removeClass(e10.call(this, t11, t3(this)));
    }) : arguments.length ? (t10 = t4(e10)).length ? this.each(function() {
      if (r2 = t3(this), n2 = 1 === this.nodeType && " " + t2(r2) + " ") {
        for (o2 = 0; o2 < t10.length; o2++) {
          i2 = t10[o2];
          while (n2.indexOf(" " + i2 + " ") > -1) n2 = n2.replace(" " + i2 + " ", " ");
        }
        r2 !== (a2 = t2(n2)) && this.setAttribute("class", a2);
      }
    }) : this : this.attr("class", "");
  }, toggleClass: function(e10, t10) {
    var n2, r2, i2, o2;
    return "function" == typeof e10 ? this.each(function(n3) {
      T(this).toggleClass(e10.call(this, n3, t3(this), t10), t10);
    }) : "boolean" == typeof t10 ? t10 ? this.addClass(e10) : this.removeClass(e10) : (n2 = t4(e10)).length ? this.each(function() {
      for (i2 = 0, o2 = T(this); i2 < n2.length; i2++) r2 = n2[i2], o2.hasClass(r2) ? o2.removeClass(r2) : o2.addClass(r2);
    }) : this;
  }, hasClass: function(e10) {
    var t10, n2, r2 = 0;
    t10 = " " + e10 + " ";
    while (n2 = this[r2++]) if (1 === n2.nodeType && (" " + t2(t3(n2)) + " ").indexOf(t10) > -1) return true;
    return false;
  } }), T.fn.extend({ val: function(e10) {
    var t10, n2, r2, i2 = this[0];
    if (!arguments.length) return i2 ? (t10 = T.valHooks[i2.type] || T.valHooks[i2.nodeName.toLowerCase()]) && "get" in t10 && void 0 !== (n2 = t10.get(i2, "value")) ? n2 : null == (n2 = i2.value) ? "" : n2 : void 0;
    return r2 = "function" == typeof e10, this.each(function(n3) {
      var i3;
      1 === this.nodeType && (null == (i3 = r2 ? e10.call(this, n3, T(this).val()) : e10) ? i3 = "" : "number" == typeof i3 ? i3 += "" : Array.isArray(i3) && (i3 = T.map(i3, function(e11) {
        return null == e11 ? "" : e11 + "";
      })), (t10 = T.valHooks[this.type] || T.valHooks[this.nodeName.toLowerCase()]) && "set" in t10 && void 0 !== t10.set(this, i3, "value") || (this.value = i3));
    });
  } }), T.extend({ valHooks: { select: { get: function(e10) {
    var t10, n2, r2, i2 = e10.options, o2 = e10.selectedIndex, a2 = "select-one" === e10.type, s2 = a2 ? null : [], u2 = a2 ? o2 + 1 : i2.length;
    for (r2 = o2 < 0 ? u2 : a2 ? o2 : 0; r2 < u2; r2++) if ((n2 = i2[r2]).selected && !n2.disabled && (!n2.parentNode.disabled || !C(n2.parentNode, "optgroup"))) {
      if (t10 = T(n2).val(), a2) return t10;
      s2.push(t10);
    }
    return s2;
  }, set: function(e10, t10) {
    var n2, r2, i2 = e10.options, o2 = T.makeArray(t10), a2 = i2.length;
    while (a2--) ((r2 = i2[a2]).selected = T.inArray(T(r2).val(), o2) > -1) && (n2 = true);
    return n2 || (e10.selectedIndex = -1), o2;
  } } } }), k && (T.valHooks.option = { get: function(e10) {
    var t10 = e10.getAttribute("value");
    return null != t10 ? t10 : t2(T.text(e10));
  } }), T.each(["radio", "checkbox"], function() {
    T.valHooks[this] = { set: function(e10, t10) {
      if (Array.isArray(t10)) return e10.checked = T.inArray(T(e10).val(), t10) > -1;
    } };
  });
  var t5 = /^(?:focusinfocus|focusoutblur)$/, t9 = function(e10) {
    e10.stopPropagation();
  };
  T.extend(T.event, { trigger: function(t10, n2, r2, i2) {
    var o2, a2, s2, u2, l2, f2, p2, d2, h2 = [r2 || y], v2 = c.call(t10, "type") ? t10.type : t10, m2 = c.call(t10, "namespace") ? t10.namespace.split(".") : [];
    if ((a2 = d2 = s2 = r2 = r2 || y, !(3 === r2.nodeType || 8 === r2.nodeType || t5.test(v2 + T.event.triggered))) && (v2.indexOf(".") > -1 && (v2 = (m2 = v2.split(".")).shift(), m2.sort()), l2 = 0 > v2.indexOf(":") && "on" + v2, (t10 = t10[T.expando] ? t10 : new T.Event(v2, "object" == typeof t10 && t10)).isTrigger = i2 ? 2 : 3, t10.namespace = m2.join("."), t10.rnamespace = t10.namespace ? RegExp("(^|\\.)" + m2.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t10.result = void 0, t10.target || (t10.target = r2), n2 = null == n2 ? [t10] : T.makeArray(n2, [t10]), p2 = T.event.special[v2] || {}, i2 || !p2.trigger || false !== p2.trigger.apply(r2, n2))) {
      if (!i2 && !p2.noBubble && !g(r2)) {
        for (u2 = p2.delegateType || v2, !t5.test(u2 + v2) && (a2 = a2.parentNode); a2; a2 = a2.parentNode) h2.push(a2), s2 = a2;
        s2 === (r2.ownerDocument || y) && h2.push(s2.defaultView || s2.parentWindow || e);
      }
      o2 = 0;
      while ((a2 = h2[o2++]) && !t10.isPropagationStopped()) d2 = a2, t10.type = o2 > 1 ? u2 : p2.bindType || v2, (f2 = (e0.get(a2, "events") || /* @__PURE__ */ Object.create(null))[t10.type] && e0.get(a2, "handle")) && f2.apply(a2, n2), (f2 = l2 && a2[l2]) && f2.apply && eK(a2) && (t10.result = f2.apply(a2, n2), false === t10.result && t10.preventDefault());
      return t10.type = v2, !i2 && !t10.isDefaultPrevented() && (!p2._default || false === p2._default.apply(h2.pop(), n2)) && eK(r2) && l2 && "function" == typeof r2[v2] && !g(r2) && ((s2 = r2[l2]) && (r2[l2] = null), T.event.triggered = v2, t10.isPropagationStopped() && d2.addEventListener(v2, t9), r2[v2](), t10.isPropagationStopped() && d2.removeEventListener(v2, t9), T.event.triggered = void 0, s2 && (r2[l2] = s2)), t10.result;
    }
  }, simulate: function(e10, t10, n2) {
    var r2 = T.extend(new T.Event(), n2, { type: e10, isSimulated: true });
    T.event.trigger(r2, null, t10);
  } }), T.fn.extend({ trigger: function(e10, t10) {
    return this.each(function() {
      T.event.trigger(e10, t10, this);
    });
  }, triggerHandler: function(e10, t10) {
    var n2 = this[0];
    if (n2) return T.event.trigger(e10, t10, n2, true);
  } });
  var t6 = e.location, t8 = { guid: Date.now() }, t7 = /\?/;
  T.parseXML = function(t10) {
    var n2, r2;
    if (!t10 || "string" != typeof t10) return null;
    try {
      n2 = new e.DOMParser().parseFromString(t10, "text/xml");
    } catch (e10) {
    }
    return r2 = n2 && n2.getElementsByTagName("parsererror")[0], (!n2 || r2) && T.error("Invalid XML: " + (r2 ? T.map(r2.childNodes, function(e10) {
      return e10.textContent;
    }).join("\n") : t10)), n2;
  };
  var ne = /\[\]$/, nt = /\r?\n/g, nn = /^(?:submit|button|image|reset|file)$/i, nr = /^(?:input|select|textarea|keygen)/i;
  T.param = function(e10, t10) {
    var n2, r2 = [], i2 = function(e11, t11) {
      var n3 = "function" == typeof t11 ? t11() : t11;
      r2[r2.length] = encodeURIComponent(e11) + "=" + encodeURIComponent(null == n3 ? "" : n3);
    };
    if (null == e10) return "";
    if (Array.isArray(e10) || e10.jquery && !T.isPlainObject(e10)) T.each(e10, function() {
      i2(this.name, this.value);
    });
    else for (n2 in e10) !(function e11(t11, n3, r3, i3) {
      var o2;
      if (Array.isArray(n3)) T.each(n3, function(n4, o3) {
        r3 || ne.test(t11) ? i3(t11, o3) : e11(t11 + "[" + ("object" == typeof o3 && null != o3 ? n4 : "") + "]", o3, r3, i3);
      });
      else if (r3 || "object" !== h(n3)) i3(t11, n3);
      else for (o2 in n3) e11(t11 + "[" + o2 + "]", n3[o2], r3, i3);
    })(n2, e10[n2], t10, i2);
    return r2.join("&");
  }, T.fn.extend({ serialize: function() {
    return T.param(this.serializeArray());
  }, serializeArray: function() {
    return this.map(function() {
      var e10 = T.prop(this, "elements");
      return e10 ? T.makeArray(e10) : this;
    }).filter(function() {
      var e10 = this.type;
      return this.name && !T(this).is(":disabled") && nr.test(this.nodeName) && !nn.test(e10) && (this.checked || !tx.test(e10));
    }).map(function(e10, t10) {
      var n2 = T(this).val();
      return null == n2 ? null : Array.isArray(n2) ? T.map(n2, function(e11) {
        return { name: t10.name, value: e11.replace(nt, "\r\n") };
      }) : { name: t10.name, value: n2.replace(nt, "\r\n") };
    }).get();
  } });
  var ni = /%20/g, no = /#.*$/, na = /([?&])_=[^&]*/, ns = /^(.*?):[ \t]*([^\r\n]*)$/mg, nu = /^(?:GET|HEAD)$/, nl = /^\/\//, nc = {}, nf = {}, np = "*/".concat("*"), nd = y.createElement("a");
  function nh(e10) {
    return function(t10, n2) {
      "string" != typeof t10 && (n2 = t10, t10 = "*");
      var r2, i2 = 0, o2 = t10.toLowerCase().match(Q) || [];
      if ("function" == typeof n2) while (r2 = o2[i2++]) "+" === r2[0] ? (e10[r2 = r2.slice(1) || "*"] = e10[r2] || []).unshift(n2) : (e10[r2] = e10[r2] || []).push(n2);
    };
  }
  function ng(e10, t10, n2, r2) {
    var i2 = {}, o2 = e10 === nf;
    function a2(s2) {
      var u2;
      return i2[s2] = true, T.each(e10[s2] || [], function(e11, s3) {
        var l2 = s3(t10, n2, r2);
        return "string" != typeof l2 || o2 || i2[l2] ? o2 ? !(u2 = l2) : void 0 : (t10.dataTypes.unshift(l2), a2(l2), false);
      }), u2;
    }
    return a2(t10.dataTypes[0]) || !i2["*"] && a2("*");
  }
  function nv(e10, t10) {
    var n2, r2, i2 = T.ajaxSettings.flatOptions || {};
    for (n2 in t10) void 0 !== t10[n2] && ((i2[n2] ? e10 : r2 || (r2 = {}))[n2] = t10[n2]);
    return r2 && T.extend(true, e10, r2), e10;
  }
  nd.href = t6.href, T.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: t6.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(t6.protocol), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": np, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": true, "text json": JSON.parse, "text xml": T.parseXML }, flatOptions: { url: true, context: true } }, ajaxSetup: function(e10, t10) {
    return t10 ? nv(nv(e10, T.ajaxSettings), t10) : nv(T.ajaxSettings, e10);
  }, ajaxPrefilter: nh(nc), ajaxTransport: nh(nf), ajax: function(t10, n2) {
    "object" == typeof t10 && (n2 = t10, t10 = void 0), n2 = n2 || {};
    var r2, i2, o2, a2, s2, u2, l2, c2, f2, p2, d2 = T.ajaxSetup({}, n2), h2 = d2.context || d2, g2 = d2.context && (h2.nodeType || h2.jquery) ? T(h2) : T.event, v2 = T.Deferred(), m2 = T.Callbacks("once memory"), x2 = d2.statusCode || {}, b2 = {}, w2 = {}, C2 = "canceled", j2 = { readyState: 0, getResponseHeader: function(e10) {
      var t11;
      if (l2) {
        if (!a2) {
          a2 = {};
          while (t11 = ns.exec(o2)) a2[t11[1].toLowerCase() + " "] = (a2[t11[1].toLowerCase() + " "] || []).concat(t11[2]);
        }
        t11 = a2[e10.toLowerCase() + " "];
      }
      return null == t11 ? null : t11.join(", ");
    }, getAllResponseHeaders: function() {
      return l2 ? o2 : null;
    }, setRequestHeader: function(e10, t11) {
      return null == l2 && (b2[e10 = w2[e10.toLowerCase()] = w2[e10.toLowerCase()] || e10] = t11), this;
    }, overrideMimeType: function(e10) {
      return null == l2 && (d2.mimeType = e10), this;
    }, statusCode: function(e10) {
      var t11;
      if (e10) if (l2) j2.always(e10[j2.status]);
      else for (t11 in e10) x2[t11] = [x2[t11], e10[t11]];
      return this;
    }, abort: function(e10) {
      var t11 = e10 || C2;
      return r2 && r2.abort(t11), E2(0, t11), this;
    } };
    if (v2.promise(j2), d2.url = ((t10 || d2.url || t6.href) + "").replace(nl, t6.protocol + "//"), d2.type = n2.method || n2.type || d2.method || d2.type, d2.dataTypes = (d2.dataType || "*").toLowerCase().match(Q) || [""], null == d2.crossDomain) {
      u2 = y.createElement("a");
      try {
        u2.href = d2.url, u2.href = u2.href, d2.crossDomain = nd.protocol + "//" + nd.host != u2.protocol + "//" + u2.host;
      } catch (e10) {
        d2.crossDomain = true;
      }
    }
    if (ng(nc, d2, n2, j2), d2.data && d2.processData && "string" != typeof d2.data && (d2.data = T.param(d2.data, d2.traditional)), l2) return j2;
    for (f2 in (c2 = T.event && d2.global) && 0 == T.active++ && T.event.trigger("ajaxStart"), d2.type = d2.type.toUpperCase(), d2.hasContent = !nu.test(d2.type), i2 = d2.url.replace(no, ""), d2.hasContent ? d2.data && d2.processData && 0 === (d2.contentType || "").indexOf("application/x-www-form-urlencoded") && (d2.data = d2.data.replace(ni, "+")) : (p2 = d2.url.slice(i2.length), d2.data && (d2.processData || "string" == typeof d2.data) && (i2 += (t7.test(i2) ? "&" : "?") + d2.data, delete d2.data), false === d2.cache && (i2 = i2.replace(na, "$1"), p2 = (t7.test(i2) ? "&" : "?") + "_=" + t8.guid++ + p2), d2.url = i2 + p2), d2.ifModified && (T.lastModified[i2] && j2.setRequestHeader("If-Modified-Since", T.lastModified[i2]), T.etag[i2] && j2.setRequestHeader("If-None-Match", T.etag[i2])), (d2.data && d2.hasContent && false !== d2.contentType || n2.contentType) && j2.setRequestHeader("Content-Type", d2.contentType), j2.setRequestHeader("Accept", d2.dataTypes[0] && d2.accepts[d2.dataTypes[0]] ? d2.accepts[d2.dataTypes[0]] + ("*" !== d2.dataTypes[0] ? ", " + np + "; q=0.01" : "") : d2.accepts["*"]), d2.headers) j2.setRequestHeader(f2, d2.headers[f2]);
    if (d2.beforeSend && (false === d2.beforeSend.call(h2, j2, d2) || l2)) return j2.abort();
    if (C2 = "abort", m2.add(d2.complete), j2.done(d2.success), j2.fail(d2.error), r2 = ng(nf, d2, n2, j2)) {
      if (j2.readyState = 1, c2 && g2.trigger("ajaxSend", [j2, d2]), l2) return j2;
      d2.async && d2.timeout > 0 && (s2 = e.setTimeout(function() {
        j2.abort("timeout");
      }, d2.timeout));
      try {
        l2 = false, r2.send(b2, E2);
      } catch (e10) {
        if (l2) throw e10;
        E2(-1, e10);
      }
    } else E2(-1, "No Transport");
    function E2(t11, n3, a3, u3) {
      var f3, p3, y2, b3, w3, C3 = n3;
      !l2 && (l2 = true, s2 && e.clearTimeout(s2), r2 = void 0, o2 = u3 || "", j2.readyState = 4 * (t11 > 0), f3 = t11 >= 200 && t11 < 300 || 304 === t11, a3 && (b3 = (function(e10, t12, n4) {
        var r3, i3, o3, a4, s3 = e10.contents, u4 = e10.dataTypes;
        while ("*" === u4[0]) u4.shift(), void 0 === r3 && (r3 = e10.mimeType || t12.getResponseHeader("Content-Type"));
        if (r3) {
          for (i3 in s3) if (s3[i3] && s3[i3].test(r3)) {
            u4.unshift(i3);
            break;
          }
        }
        if (u4[0] in n4) o3 = u4[0];
        else {
          for (i3 in n4) {
            if (!u4[0] || e10.converters[i3 + " " + u4[0]]) {
              o3 = i3;
              break;
            }
            a4 || (a4 = i3);
          }
          o3 = o3 || a4;
        }
        if (o3) return o3 !== u4[0] && u4.unshift(o3), n4[o3];
      })(d2, j2, a3)), !f3 && T.inArray("script", d2.dataTypes) > -1 && 0 > T.inArray("json", d2.dataTypes) && (d2.converters["text script"] = function() {
      }), b3 = (function(e10, t12, n4, r3) {
        var i3, o3, a4, s3, u4, l3 = {}, c3 = e10.dataTypes.slice();
        if (c3[1]) for (a4 in e10.converters) l3[a4.toLowerCase()] = e10.converters[a4];
        o3 = c3.shift();
        while (o3) if (e10.responseFields[o3] && (n4[e10.responseFields[o3]] = t12), !u4 && r3 && e10.dataFilter && (t12 = e10.dataFilter(t12, e10.dataType)), u4 = o3, o3 = c3.shift()) {
          if ("*" === o3) o3 = u4;
          else if ("*" !== u4 && u4 !== o3) {
            if (!(a4 = l3[u4 + " " + o3] || l3["* " + o3])) {
              for (i3 in l3) if ((s3 = i3.split(" "))[1] === o3 && (a4 = l3[u4 + " " + s3[0]] || l3["* " + s3[0]])) {
                true === a4 ? a4 = l3[i3] : true !== l3[i3] && (o3 = s3[0], c3.unshift(s3[1]));
                break;
              }
            }
            if (true !== a4) if (a4 && e10.throws) t12 = a4(t12);
            else try {
              t12 = a4(t12);
            } catch (e11) {
              return { state: "parsererror", error: a4 ? e11 : "No conversion from " + u4 + " to " + o3 };
            }
          }
        }
        return { state: "success", data: t12 };
      })(d2, b3, j2, f3), f3 ? (d2.ifModified && ((w3 = j2.getResponseHeader("Last-Modified")) && (T.lastModified[i2] = w3), (w3 = j2.getResponseHeader("etag")) && (T.etag[i2] = w3)), 204 === t11 || "HEAD" === d2.type ? C3 = "nocontent" : 304 === t11 ? C3 = "notmodified" : (C3 = b3.state, p3 = b3.data, f3 = !(y2 = b3.error))) : (y2 = C3, (t11 || !C3) && (C3 = "error", t11 < 0 && (t11 = 0))), j2.status = t11, j2.statusText = (n3 || C3) + "", f3 ? v2.resolveWith(h2, [p3, C3, j2]) : v2.rejectWith(h2, [j2, C3, y2]), j2.statusCode(x2), x2 = void 0, c2 && g2.trigger(f3 ? "ajaxSuccess" : "ajaxError", [j2, d2, f3 ? p3 : y2]), m2.fireWith(h2, [j2, C3]), c2 && (g2.trigger("ajaxComplete", [j2, d2]), --T.active || T.event.trigger("ajaxStop")));
    }
    return j2;
  }, getJSON: function(e10, t10, n2) {
    return T.get(e10, t10, n2, "json");
  }, getScript: function(e10, t10) {
    return T.get(e10, void 0, t10, "script");
  } }), T.each(["get", "post"], function(e10, t10) {
    T[t10] = function(e11, n2, r2, i2) {
      return ("function" == typeof n2 || null === n2) && (i2 = i2 || r2, r2 = n2, n2 = void 0), T.ajax(T.extend({ url: e11, type: t10, dataType: i2, data: n2, success: r2 }, T.isPlainObject(e11) && e11));
    };
  }), T.ajaxPrefilter(function(e10) {
    var t10;
    for (t10 in e10.headers) "content-type" === t10.toLowerCase() && (e10.contentType = e10.headers[t10] || "");
  }), T._evalUrl = function(e10, t10, n2) {
    return T.ajax({ url: e10, type: "GET", dataType: "script", cache: true, async: false, global: false, scriptAttrs: t10.crossOrigin ? { crossOrigin: t10.crossOrigin } : void 0, converters: { "text script": function() {
    } }, dataFilter: function(e11) {
      T.globalEval(e11, t10, n2);
    } });
  }, T.fn.extend({ wrapAll: function(e10) {
    var t10;
    return this[0] && ("function" == typeof e10 && (e10 = e10.call(this[0])), t10 = T(e10, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t10.insertBefore(this[0]), t10.map(function() {
      var e11 = this;
      while (e11.firstElementChild) e11 = e11.firstElementChild;
      return e11;
    }).append(this)), this;
  }, wrapInner: function(e10) {
    return "function" == typeof e10 ? this.each(function(t10) {
      T(this).wrapInner(e10.call(this, t10));
    }) : this.each(function() {
      var t10 = T(this), n2 = t10.contents();
      n2.length ? n2.wrapAll(e10) : t10.append(e10);
    });
  }, wrap: function(e10) {
    var t10 = "function" == typeof e10;
    return this.each(function(n2) {
      T(this).wrapAll(t10 ? e10.call(this, n2) : e10);
    });
  }, unwrap: function(e10) {
    return this.parent(e10).not("body").each(function() {
      T(this).replaceWith(this.childNodes);
    }), this;
  } }), T.expr.pseudos.hidden = function(e10) {
    return !T.expr.pseudos.visible(e10);
  }, T.expr.pseudos.visible = function(e10) {
    return !!(e10.offsetWidth || e10.offsetHeight || e10.getClientRects().length);
  }, T.ajaxSettings.xhr = function() {
    return new e.XMLHttpRequest();
  };
  var ny = { 0: 200 };
  function nm(e10) {
    return e10.scriptAttrs || !e10.headers && (e10.crossDomain || e10.async && 0 > T.inArray("json", e10.dataTypes));
  }
  T.ajaxTransport(function(e10) {
    var t10;
    return { send: function(n2, r2) {
      var i2, o2 = e10.xhr();
      if (o2.open(e10.type, e10.url, e10.async, e10.username, e10.password), e10.xhrFields) for (i2 in e10.xhrFields) o2[i2] = e10.xhrFields[i2];
      for (i2 in e10.mimeType && o2.overrideMimeType && o2.overrideMimeType(e10.mimeType), e10.crossDomain || n2["X-Requested-With"] || (n2["X-Requested-With"] = "XMLHttpRequest"), n2) o2.setRequestHeader(i2, n2[i2]);
      t10 = function(e11) {
        return function() {
          t10 && (t10 = o2.onload = o2.onerror = o2.onabort = o2.ontimeout = null, "abort" === e11 ? o2.abort() : "error" === e11 ? r2(o2.status, o2.statusText) : r2(ny[o2.status] || o2.status, o2.statusText, "text" === (o2.responseType || "text") ? { text: o2.responseText } : { binary: o2.response }, o2.getAllResponseHeaders()));
        };
      }, o2.onload = t10(), o2.onabort = o2.onerror = o2.ontimeout = t10("error"), t10 = t10("abort");
      try {
        o2.send(e10.hasContent && e10.data || null);
      } catch (e11) {
        if (t10) throw e11;
      }
    }, abort: function() {
      t10 && t10();
    } };
  }), T.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, converters: { "text script": function(e10) {
    return T.globalEval(e10), e10;
  } } }), T.ajaxPrefilter("script", function(e10) {
    void 0 === e10.cache && (e10.cache = false), nm(e10) && (e10.type = "GET");
  }), T.ajaxTransport("script", function(e10) {
    if (nm(e10)) {
      var t10, n2;
      return { send: function(r2, i2) {
        t10 = T("<script>").attr(e10.scriptAttrs || {}).prop({ charset: e10.scriptCharset, src: e10.url }).on("load error", n2 = function(e11) {
          t10.remove(), n2 = null, e11 && i2("error" === e11.type ? 404 : 200, e11.type);
        }), y.head.appendChild(t10[0]);
      }, abort: function() {
        n2 && n2();
      } };
    }
  });
  var nx = [], nb = /(=)\?(?=&|$)|\?\?/;
  T.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
    var e10 = nx.pop() || T.expando + "_" + t8.guid++;
    return this[e10] = true, e10;
  } }), T.ajaxPrefilter("jsonp", function(t10, n2, r2) {
    var i2, o2, a2, s2 = false !== t10.jsonp && (nb.test(t10.url) ? "url" : "string" == typeof t10.data && 0 === (t10.contentType || "").indexOf("application/x-www-form-urlencoded") && nb.test(t10.data) && "data");
    return i2 = t10.jsonpCallback = "function" == typeof t10.jsonpCallback ? t10.jsonpCallback() : t10.jsonpCallback, s2 ? t10[s2] = t10[s2].replace(nb, "$1" + i2) : false !== t10.jsonp && (t10.url += (t7.test(t10.url) ? "&" : "?") + t10.jsonp + "=" + i2), t10.converters["script json"] = function() {
      return a2 || T.error(i2 + " was not called"), a2[0];
    }, t10.dataTypes[0] = "json", o2 = e[i2], e[i2] = function() {
      a2 = arguments;
    }, r2.always(function() {
      void 0 === o2 ? T(e).removeProp(i2) : e[i2] = o2, t10[i2] && (t10.jsonpCallback = n2.jsonpCallback, nx.push(i2)), a2 && "function" == typeof o2 && o2(a2[0]), a2 = o2 = void 0;
    }), "script";
  }), T.ajaxPrefilter(function(t10, n2) {
    "string" == typeof t10.data || T.isPlainObject(t10.data) || Array.isArray(t10.data) || "processData" in n2 || (t10.processData = false), t10.data instanceof e.FormData && (t10.contentType = false);
  }), T.parseHTML = function(t10, n2, r2) {
    var i2, o2;
    return "string" == typeof t10 || eR(t10 + "") ? ("boolean" == typeof n2 && (r2 = n2, n2 = false), n2 || (n2 = new e.DOMParser().parseFromString("", "text/html")), i2 = eP.exec(t10), o2 = !r2 && [], i2) ? [n2.createElement(i2[1])] : (i2 = tg([t10], n2, o2), o2 && o2.length && T(o2).remove(), T.merge([], i2.childNodes)) : [];
  }, T.fn.load = function(e10, t10, n2) {
    var r2, i2, o2, a2 = this, s2 = e10.indexOf(" ");
    return s2 > -1 && (r2 = t2(e10.slice(s2)), e10 = e10.slice(0, s2)), "function" == typeof t10 ? (n2 = t10, t10 = void 0) : t10 && "object" == typeof t10 && (i2 = "POST"), a2.length > 0 && T.ajax({ url: e10, type: i2 || "GET", dataType: "html", data: t10 }).done(function(e11) {
      o2 = arguments, a2.html(r2 ? T("<div>").append(T.parseHTML(e11)).find(r2) : e11);
    }).always(n2 && function(e11, t11) {
      a2.each(function() {
        n2.apply(this, o2 || [e11.responseText, t11, e11]);
      });
    }), this;
  }, T.expr.pseudos.animated = function(e10) {
    return T.grep(T.timers, function(t10) {
      return e10 === t10.elem;
    }).length;
  }, T.offset = { setOffset: function(e10, t10, n2) {
    var r2, i2, o2, a2, s2, u2, l2 = T.css(e10, "position"), c2 = T(e10), f2 = {};
    "static" === l2 && (e10.style.position = "relative"), s2 = c2.offset(), o2 = T.css(e10, "top"), u2 = T.css(e10, "left"), ("absolute" === l2 || "fixed" === l2) && (o2 + u2).indexOf("auto") > -1 ? (a2 = (r2 = c2.position()).top, i2 = r2.left) : (a2 = parseFloat(o2) || 0, i2 = parseFloat(u2) || 0), "function" == typeof t10 && (t10 = t10.call(e10, n2, T.extend({}, s2))), null != t10.top && (f2.top = t10.top - s2.top + a2), null != t10.left && (f2.left = t10.left - s2.left + i2), "using" in t10 ? t10.using.call(e10, f2) : c2.css(f2);
  } }, T.fn.extend({ offset: function(e10) {
    if (arguments.length) return void 0 === e10 ? this : this.each(function(t11) {
      T.offset.setOffset(this, e10, t11);
    });
    var t10, n2, r2 = this[0];
    if (r2) return r2.getClientRects().length ? (t10 = r2.getBoundingClientRect(), n2 = r2.ownerDocument.defaultView, { top: t10.top + n2.pageYOffset, left: t10.left + n2.pageXOffset }) : { top: 0, left: 0 };
  }, position: function() {
    if (this[0]) {
      var e10, t10, n2, r2 = this[0], i2 = { top: 0, left: 0 };
      if ("fixed" === T.css(r2, "position")) t10 = r2.getBoundingClientRect();
      else {
        t10 = this.offset(), n2 = r2.ownerDocument, e10 = r2.offsetParent || n2.documentElement;
        while (e10 && e10 !== n2.documentElement && "static" === T.css(e10, "position")) e10 = e10.offsetParent || n2.documentElement;
        e10 && e10 !== r2 && 1 === e10.nodeType && "static" !== T.css(e10, "position") && (i2 = T(e10).offset(), i2.top += T.css(e10, "borderTopWidth", true), i2.left += T.css(e10, "borderLeftWidth", true));
      }
      return { top: t10.top - i2.top - T.css(r2, "marginTop", true), left: t10.left - i2.left - T.css(r2, "marginLeft", true) };
    }
  }, offsetParent: function() {
    return this.map(function() {
      var e10 = this.offsetParent;
      while (e10 && "static" === T.css(e10, "position")) e10 = e10.offsetParent;
      return e10 || L;
    });
  } }), T.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(e10, t10) {
    var n2 = "pageYOffset" === t10;
    T.fn[e10] = function(r2) {
      return V(this, function(e11, r3, i2) {
        var o2;
        if (g(e11) ? o2 = e11 : 9 === e11.nodeType && (o2 = e11.defaultView), void 0 === i2) return o2 ? o2[t10] : e11[r3];
        o2 ? o2.scrollTo(n2 ? o2.pageXOffset : i2, n2 ? i2 : o2.pageYOffset) : e11[r3] = i2;
      }, e10, r2, arguments.length);
    };
  }), T.each({ Height: "height", Width: "width" }, function(e10, t10) {
    T.each({ padding: "inner" + e10, content: t10, "": "outer" + e10 }, function(n2, r2) {
      T.fn[r2] = function(i2, o2) {
        var a2 = arguments.length && (n2 || "boolean" != typeof i2), s2 = n2 || (true === i2 || true === o2 ? "margin" : "border");
        return V(this, function(t11, n3, i3) {
          var o3;
          return g(t11) ? 0 === r2.indexOf("outer") ? t11["inner" + e10] : t11.document.documentElement["client" + e10] : 9 === t11.nodeType ? (o3 = t11.documentElement, Math.max(t11.body["scroll" + e10], o3["scroll" + e10], t11.body["offset" + e10], o3["offset" + e10], o3["client" + e10])) : void 0 === i3 ? T.css(t11, n3, s2) : T.style(t11, n3, i3, s2);
        }, t10, a2 ? i2 : void 0, a2);
      };
    });
  }), T.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e10, t10) {
    T.fn[t10] = function(e11) {
      return this.on(t10, e11);
    };
  }), T.fn.extend({ bind: function(e10, t10, n2) {
    return this.on(e10, null, t10, n2);
  }, unbind: function(e10, t10) {
    return this.off(e10, null, t10);
  }, delegate: function(e10, t10, n2, r2) {
    return this.on(t10, e10, n2, r2);
  }, undelegate: function(e10, t10, n2) {
    return 1 == arguments.length ? this.off(e10, "**") : this.off(t10, e10 || "**", n2);
  }, hover: function(e10, t10) {
    return this.on("mouseenter", e10).on("mouseleave", t10 || e10);
  } }), T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e10, t10) {
    T.fn[t10] = function(e11, n2) {
      return arguments.length > 0 ? this.on(t10, null, e11, n2) : this.trigger(t10);
    };
  }), T.proxy = function(e10, t10) {
    var n2, r2, o2;
    if ("string" == typeof t10 && (n2 = e10[t10], t10 = e10, e10 = n2), "function" == typeof e10) return r2 = i.call(arguments, 2), (o2 = function() {
      return e10.apply(t10 || this, r2.concat(i.call(arguments)));
    }).guid = e10.guid = e10.guid || T.guid++, o2;
  }, T.holdReady = function(e10) {
    e10 ? T.readyWait++ : T.ready(true);
  }, T.expr[":"] = T.expr.filters = T.expr.pseudos, "function" == typeof define && define.amd && define("jquery", [], function() {
    return T;
  });
  var nw = e.jQuery, nT = e.$;
  return T.noConflict = function(t10) {
    return e.$ === T && (e.$ = nT), t10 && e.jQuery === T && (e.jQuery = nw), T;
  }, void 0 === t && (e.jQuery = e.$ = T), T;
});
/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
})(this, function() {
  "use strict";
  const t = /* @__PURE__ */ new Map(), e = { set(e2, i2, n2) {
    t.has(e2) || t.set(e2, /* @__PURE__ */ new Map());
    const s2 = t.get(e2);
    s2.has(i2) || 0 === s2.size ? s2.set(i2, n2) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s2.keys())[0]}.`);
  }, get: (e2, i2) => t.has(e2) && t.get(e2).get(i2) || null, remove(e2, i2) {
    if (!t.has(e2)) return;
    const n2 = t.get(e2);
    n2.delete(i2), 0 === n2.size && t.delete(e2);
  } }, i = "transitionend", n = (t2) => (t2 && window.CSS && window.CSS.escape && (t2 = t2.replace(/#([^\s"#']+)/g, (t3, e2) => `#${CSS.escape(e2)}`)), t2), s = (t2) => null == t2 ? `${t2}` : Object.prototype.toString.call(t2).match(/\s([a-z]+)/i)[1].toLowerCase(), o = (t2) => {
    t2.dispatchEvent(new Event(i));
  }, r = (t2) => !(!t2 || "object" != typeof t2) && (void 0 !== t2.jquery && (t2 = t2[0]), void 0 !== t2.nodeType), a = (t2) => r(t2) ? t2.jquery ? t2[0] : t2 : "string" == typeof t2 && t2.length > 0 ? document.querySelector(n(t2)) : null, l = (t2) => {
    if (!r(t2) || 0 === t2.getClientRects().length) return false;
    const e2 = "visible" === getComputedStyle(t2).getPropertyValue("visibility"), i2 = t2.closest("details:not([open])");
    if (!i2) return e2;
    if (i2 !== t2) {
      const e3 = t2.closest("summary");
      if (e3 && e3.parentNode !== i2) return false;
      if (null === e3) return false;
    }
    return e2;
  }, c = (t2) => !t2 || t2.nodeType !== Node.ELEMENT_NODE || !!t2.classList.contains("disabled") || (void 0 !== t2.disabled ? t2.disabled : t2.hasAttribute("disabled") && "false" !== t2.getAttribute("disabled")), h = (t2) => {
    if (!document.documentElement.attachShadow) return null;
    if ("function" == typeof t2.getRootNode) {
      const e2 = t2.getRootNode();
      return e2 instanceof ShadowRoot ? e2 : null;
    }
    return t2 instanceof ShadowRoot ? t2 : t2.parentNode ? h(t2.parentNode) : null;
  }, d = () => {
  }, u = (t2) => {
    t2.offsetHeight;
  }, f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, p = [], m = () => "rtl" === document.documentElement.dir, g = (t2) => {
    var e2;
    e2 = () => {
      const e3 = f();
      if (e3) {
        const i2 = t2.NAME, n2 = e3.fn[i2];
        e3.fn[i2] = t2.jQueryInterface, e3.fn[i2].Constructor = t2, e3.fn[i2].noConflict = () => (e3.fn[i2] = n2, t2.jQueryInterface);
      }
    }, "loading" === document.readyState ? (p.length || document.addEventListener("DOMContentLoaded", () => {
      for (const t3 of p) t3();
    }), p.push(e2)) : e2();
  }, _ = (t2, e2 = [], i2 = t2) => "function" == typeof t2 ? t2.call(...e2) : i2, b = (t2, e2, n2 = true) => {
    if (!n2) return void _(t2);
    const s2 = ((t3) => {
      if (!t3) return 0;
      let { transitionDuration: e3, transitionDelay: i2 } = window.getComputedStyle(t3);
      const n3 = Number.parseFloat(e3), s3 = Number.parseFloat(i2);
      return n3 || s3 ? (e3 = e3.split(",")[0], i2 = i2.split(",")[0], 1e3 * (Number.parseFloat(e3) + Number.parseFloat(i2))) : 0;
    })(e2) + 5;
    let r2 = false;
    const a2 = ({ target: n3 }) => {
      n3 === e2 && (r2 = true, e2.removeEventListener(i, a2), _(t2));
    };
    e2.addEventListener(i, a2), setTimeout(() => {
      r2 || o(e2);
    }, s2);
  }, v = (t2, e2, i2, n2) => {
    const s2 = t2.length;
    let o2 = t2.indexOf(e2);
    return -1 === o2 ? !i2 && n2 ? t2[s2 - 1] : t2[0] : (o2 += i2 ? 1 : -1, n2 && (o2 = (o2 + s2) % s2), t2[Math.max(0, Math.min(o2, s2 - 1))]);
  }, y = /[^.]*(?=\..*)\.|.*/, w = /\..*/, A = /::\d+$/, E = {};
  let T = 1;
  const C = { mouseenter: "mouseover", mouseleave: "mouseout" }, O = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function x(t2, e2) {
    return e2 && `${e2}::${T++}` || t2.uidEvent || T++;
  }
  function k(t2) {
    const e2 = x(t2);
    return t2.uidEvent = e2, E[e2] = E[e2] || {}, E[e2];
  }
  function L(t2, e2, i2 = null) {
    return Object.values(t2).find((t3) => t3.callable === e2 && t3.delegationSelector === i2);
  }
  function S(t2, e2, i2) {
    const n2 = "string" == typeof e2, s2 = n2 ? i2 : e2 || i2;
    let o2 = N(t2);
    return O.has(o2) || (o2 = t2), [n2, s2, o2];
  }
  function D(t2, e2, i2, n2, s2) {
    if ("string" != typeof e2 || !t2) return;
    let [o2, r2, a2] = S(e2, i2, n2);
    if (e2 in C) {
      const t3 = (t4) => function(e3) {
        if (!e3.relatedTarget || e3.relatedTarget !== e3.delegateTarget && !e3.delegateTarget.contains(e3.relatedTarget)) return t4.call(this, e3);
      };
      r2 = t3(r2);
    }
    const l2 = k(t2), c2 = l2[a2] || (l2[a2] = {}), h2 = L(c2, r2, o2 ? i2 : null);
    if (h2) return void (h2.oneOff = h2.oneOff && s2);
    const d2 = x(r2, e2.replace(y, "")), u2 = o2 ? /* @__PURE__ */ (function(t3, e3, i3) {
      return function n3(s3) {
        const o3 = t3.querySelectorAll(e3);
        for (let { target: r3 } = s3; r3 && r3 !== this; r3 = r3.parentNode) for (const a3 of o3) if (a3 === r3) return j(s3, { delegateTarget: r3 }), n3.oneOff && P.off(t3, s3.type, e3, i3), i3.apply(r3, [s3]);
      };
    })(t2, i2, r2) : /* @__PURE__ */ (function(t3, e3) {
      return function i3(n3) {
        return j(n3, { delegateTarget: t3 }), i3.oneOff && P.off(t3, n3.type, e3), e3.apply(t3, [n3]);
      };
    })(t2, r2);
    u2.delegationSelector = o2 ? i2 : null, u2.callable = r2, u2.oneOff = s2, u2.uidEvent = d2, c2[d2] = u2, t2.addEventListener(a2, u2, o2);
  }
  function $(t2, e2, i2, n2, s2) {
    const o2 = L(e2[i2], n2, s2);
    o2 && (t2.removeEventListener(i2, o2, Boolean(s2)), delete e2[i2][o2.uidEvent]);
  }
  function I(t2, e2, i2, n2) {
    const s2 = e2[i2] || {};
    for (const [o2, r2] of Object.entries(s2)) o2.includes(n2) && $(t2, e2, i2, r2.callable, r2.delegationSelector);
  }
  function N(t2) {
    return t2 = t2.replace(w, ""), C[t2] || t2;
  }
  const P = { on(t2, e2, i2, n2) {
    D(t2, e2, i2, n2, false);
  }, one(t2, e2, i2, n2) {
    D(t2, e2, i2, n2, true);
  }, off(t2, e2, i2, n2) {
    if ("string" != typeof e2 || !t2) return;
    const [s2, o2, r2] = S(e2, i2, n2), a2 = r2 !== e2, l2 = k(t2), c2 = l2[r2] || {}, h2 = e2.startsWith(".");
    if (void 0 === o2) {
      if (h2) for (const i3 of Object.keys(l2)) I(t2, l2, i3, e2.slice(1));
      for (const [i3, n3] of Object.entries(c2)) {
        const s3 = i3.replace(A, "");
        a2 && !e2.includes(s3) || $(t2, l2, r2, n3.callable, n3.delegationSelector);
      }
    } else {
      if (!Object.keys(c2).length) return;
      $(t2, l2, r2, o2, s2 ? i2 : null);
    }
  }, trigger(t2, e2, i2) {
    if ("string" != typeof e2 || !t2) return null;
    const n2 = f();
    let s2 = null, o2 = true, r2 = true, a2 = false;
    e2 !== N(e2) && n2 && (s2 = n2.Event(e2, i2), n2(t2).trigger(s2), o2 = !s2.isPropagationStopped(), r2 = !s2.isImmediatePropagationStopped(), a2 = s2.isDefaultPrevented());
    const l2 = j(new Event(e2, { bubbles: o2, cancelable: true }), i2);
    return a2 && l2.preventDefault(), r2 && t2.dispatchEvent(l2), l2.defaultPrevented && s2 && s2.preventDefault(), l2;
  } };
  function j(t2, e2 = {}) {
    for (const [i2, n2] of Object.entries(e2)) try {
      t2[i2] = n2;
    } catch (e3) {
      Object.defineProperty(t2, i2, { configurable: true, get: () => n2 });
    }
    return t2;
  }
  function M(t2) {
    if ("true" === t2) return true;
    if ("false" === t2) return false;
    if (t2 === Number(t2).toString()) return Number(t2);
    if ("" === t2 || "null" === t2) return null;
    if ("string" != typeof t2) return t2;
    try {
      return JSON.parse(decodeURIComponent(t2));
    } catch (e2) {
      return t2;
    }
  }
  function F(t2) {
    return t2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
  }
  const H = { setDataAttribute(t2, e2, i2) {
    t2.setAttribute(`data-bs-${F(e2)}`, i2);
  }, removeDataAttribute(t2, e2) {
    t2.removeAttribute(`data-bs-${F(e2)}`);
  }, getDataAttributes(t2) {
    if (!t2) return {};
    const e2 = {}, i2 = Object.keys(t2.dataset).filter((t3) => t3.startsWith("bs") && !t3.startsWith("bsConfig"));
    for (const n2 of i2) {
      let i3 = n2.replace(/^bs/, "");
      i3 = i3.charAt(0).toLowerCase() + i3.slice(1), e2[i3] = M(t2.dataset[n2]);
    }
    return e2;
  }, getDataAttribute: (t2, e2) => M(t2.getAttribute(`data-bs-${F(e2)}`)) };
  class W {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2;
    }
    _mergeConfigObj(t2, e2) {
      const i2 = r(e2) ? H.getDataAttribute(e2, "config") : {};
      return { ...this.constructor.Default, ..."object" == typeof i2 ? i2 : {}, ...r(e2) ? H.getDataAttributes(e2) : {}, ..."object" == typeof t2 ? t2 : {} };
    }
    _typeCheckConfig(t2, e2 = this.constructor.DefaultType) {
      for (const [i2, n2] of Object.entries(e2)) {
        const e3 = t2[i2], o2 = r(e3) ? "element" : s(e3);
        if (!new RegExp(n2).test(o2)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i2}" provided type "${o2}" but expected type "${n2}".`);
      }
    }
  }
  class B extends W {
    constructor(t2, i2) {
      super(), (t2 = a(t2)) && (this._element = t2, this._config = this._getConfig(i2), e.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      e.remove(this._element, this.constructor.DATA_KEY), P.off(this._element, this.constructor.EVENT_KEY);
      for (const t2 of Object.getOwnPropertyNames(this)) this[t2] = null;
    }
    _queueCallback(t2, e2, i2 = true) {
      b(t2, e2, i2);
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2, this._element), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    static getInstance(t2) {
      return e.get(a(t2), this.DATA_KEY);
    }
    static getOrCreateInstance(t2, e2 = {}) {
      return this.getInstance(t2) || new this(t2, "object" == typeof e2 ? e2 : null);
    }
    static get VERSION() {
      return "5.3.8";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t2) {
      return `${t2}${this.EVENT_KEY}`;
    }
  }
  const z = (t2) => {
    let e2 = t2.getAttribute("data-bs-target");
    if (!e2 || "#" === e2) {
      let i2 = t2.getAttribute("href");
      if (!i2 || !i2.includes("#") && !i2.startsWith(".")) return null;
      i2.includes("#") && !i2.startsWith("#") && (i2 = `#${i2.split("#")[1]}`), e2 = i2 && "#" !== i2 ? i2.trim() : null;
    }
    return e2 ? e2.split(",").map((t3) => n(t3)).join(",") : null;
  }, R = { find: (t2, e2 = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e2, t2)), findOne: (t2, e2 = document.documentElement) => Element.prototype.querySelector.call(e2, t2), children: (t2, e2) => [].concat(...t2.children).filter((t3) => t3.matches(e2)), parents(t2, e2) {
    const i2 = [];
    let n2 = t2.parentNode.closest(e2);
    for (; n2; ) i2.push(n2), n2 = n2.parentNode.closest(e2);
    return i2;
  }, prev(t2, e2) {
    let i2 = t2.previousElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.previousElementSibling;
    }
    return [];
  }, next(t2, e2) {
    let i2 = t2.nextElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.nextElementSibling;
    }
    return [];
  }, focusableChildren(t2) {
    const e2 = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t3) => `${t3}:not([tabindex^="-"])`).join(",");
    return this.find(e2, t2).filter((t3) => !c(t3) && l(t3));
  }, getSelectorFromElement(t2) {
    const e2 = z(t2);
    return e2 && R.findOne(e2) ? e2 : null;
  }, getElementFromSelector(t2) {
    const e2 = z(t2);
    return e2 ? R.findOne(e2) : null;
  }, getMultipleElementsFromSelector(t2) {
    const e2 = z(t2);
    return e2 ? R.find(e2) : [];
  } }, q = (t2, e2 = "hide") => {
    const i2 = `click.dismiss${t2.EVENT_KEY}`, n2 = t2.NAME;
    P.on(document, i2, `[data-bs-dismiss="${n2}"]`, function(i3) {
      if (["A", "AREA"].includes(this.tagName) && i3.preventDefault(), c(this)) return;
      const s2 = R.getElementFromSelector(this) || this.closest(`.${n2}`);
      t2.getOrCreateInstance(s2)[e2]();
    });
  }, V = ".bs.alert", K = `close${V}`, Q = `closed${V}`;
  class X extends B {
    static get NAME() {
      return "alert";
    }
    close() {
      if (P.trigger(this._element, K).defaultPrevented) return;
      this._element.classList.remove("show");
      const t2 = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, t2);
    }
    _destroyElement() {
      this._element.remove(), P.trigger(this._element, Q), this.dispose();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = X.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  q(X, "close"), g(X);
  const Y = '[data-bs-toggle="button"]';
  class U extends B {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = U.getOrCreateInstance(this);
        "toggle" === t2 && e2[t2]();
      });
    }
  }
  P.on(document, "click.bs.button.data-api", Y, (t2) => {
    t2.preventDefault();
    const e2 = t2.target.closest(Y);
    U.getOrCreateInstance(e2).toggle();
  }), g(U);
  const G = ".bs.swipe", J = `touchstart${G}`, Z = `touchmove${G}`, tt = `touchend${G}`, et = `pointerdown${G}`, it = `pointerup${G}`, nt = { endCallback: null, leftCallback: null, rightCallback: null }, st = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
  class ot extends W {
    constructor(t2, e2) {
      super(), this._element = t2, t2 && ot.isSupported() && (this._config = this._getConfig(e2), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
    }
    static get Default() {
      return nt;
    }
    static get DefaultType() {
      return st;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      P.off(this._element, G);
    }
    _start(t2) {
      this._supportPointerEvents ? this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX) : this._deltaX = t2.touches[0].clientX;
    }
    _end(t2) {
      this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX - this._deltaX), this._handleSwipe(), _(this._config.endCallback);
    }
    _move(t2) {
      this._deltaX = t2.touches && t2.touches.length > 1 ? 0 : t2.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t2 = Math.abs(this._deltaX);
      if (t2 <= 40) return;
      const e2 = t2 / this._deltaX;
      this._deltaX = 0, e2 && _(e2 > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents ? (P.on(this._element, et, (t2) => this._start(t2)), P.on(this._element, it, (t2) => this._end(t2)), this._element.classList.add("pointer-event")) : (P.on(this._element, J, (t2) => this._start(t2)), P.on(this._element, Z, (t2) => this._move(t2)), P.on(this._element, tt, (t2) => this._end(t2)));
    }
    _eventIsPointerPenTouch(t2) {
      return this._supportPointerEvents && ("pen" === t2.pointerType || "touch" === t2.pointerType);
    }
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }
  const rt = ".bs.carousel", at = ".data-api", lt = "ArrowLeft", ct = "ArrowRight", ht = "next", dt = "prev", ut = "left", ft = "right", pt = `slide${rt}`, mt = `slid${rt}`, gt = `keydown${rt}`, _t = `mouseenter${rt}`, bt = `mouseleave${rt}`, vt = `dragstart${rt}`, yt = `load${rt}${at}`, wt = `click${rt}${at}`, At = "carousel", Et = "active", Tt = ".active", Ct = ".carousel-item", Ot = Tt + Ct, xt = { [lt]: ft, [ct]: ut }, kt = { interval: 5e3, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true }, Lt = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
  class St extends B {
    constructor(t2, e2) {
      super(t2, e2), this._interval = null, this._activeElement = null, this._isSliding = false, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = R.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === At && this.cycle();
    }
    static get Default() {
      return kt;
    }
    static get DefaultType() {
      return Lt;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(ht);
    }
    nextWhenVisible() {
      !document.hidden && l(this._element) && this.next();
    }
    prev() {
      this._slide(dt);
    }
    pause() {
      this._isSliding && o(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      this._config.ride && (this._isSliding ? P.one(this._element, mt, () => this.cycle()) : this.cycle());
    }
    to(t2) {
      const e2 = this._getItems();
      if (t2 > e2.length - 1 || t2 < 0) return;
      if (this._isSliding) return void P.one(this._element, mt, () => this.to(t2));
      const i2 = this._getItemIndex(this._getActive());
      if (i2 === t2) return;
      const n2 = t2 > i2 ? ht : dt;
      this._slide(n2, e2[t2]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.defaultInterval = t2.interval, t2;
    }
    _addEventListeners() {
      this._config.keyboard && P.on(this._element, gt, (t2) => this._keydown(t2)), "hover" === this._config.pause && (P.on(this._element, _t, () => this.pause()), P.on(this._element, bt, () => this._maybeEnableCycle())), this._config.touch && ot.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t3 of R.find(".carousel-item img", this._element)) P.on(t3, vt, (t4) => t4.preventDefault());
      const t2 = { leftCallback: () => this._slide(this._directionToOrder(ut)), rightCallback: () => this._slide(this._directionToOrder(ft)), endCallback: () => {
        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval));
      } };
      this._swipeHelper = new ot(this._element, t2);
    }
    _keydown(t2) {
      if (/input|textarea/i.test(t2.target.tagName)) return;
      const e2 = xt[t2.key];
      e2 && (t2.preventDefault(), this._slide(this._directionToOrder(e2)));
    }
    _getItemIndex(t2) {
      return this._getItems().indexOf(t2);
    }
    _setActiveIndicatorElement(t2) {
      if (!this._indicatorsElement) return;
      const e2 = R.findOne(Tt, this._indicatorsElement);
      e2.classList.remove(Et), e2.removeAttribute("aria-current");
      const i2 = R.findOne(`[data-bs-slide-to="${t2}"]`, this._indicatorsElement);
      i2 && (i2.classList.add(Et), i2.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t2 = this._activeElement || this._getActive();
      if (!t2) return;
      const e2 = Number.parseInt(t2.getAttribute("data-bs-interval"), 10);
      this._config.interval = e2 || this._config.defaultInterval;
    }
    _slide(t2, e2 = null) {
      if (this._isSliding) return;
      const i2 = this._getActive(), n2 = t2 === ht, s2 = e2 || v(this._getItems(), i2, n2, this._config.wrap);
      if (s2 === i2) return;
      const o2 = this._getItemIndex(s2), r2 = (e3) => P.trigger(this._element, e3, { relatedTarget: s2, direction: this._orderToDirection(t2), from: this._getItemIndex(i2), to: o2 });
      if (r2(pt).defaultPrevented) return;
      if (!i2 || !s2) return;
      const a2 = Boolean(this._interval);
      this.pause(), this._isSliding = true, this._setActiveIndicatorElement(o2), this._activeElement = s2;
      const l2 = n2 ? "carousel-item-start" : "carousel-item-end", c2 = n2 ? "carousel-item-next" : "carousel-item-prev";
      s2.classList.add(c2), u(s2), i2.classList.add(l2), s2.classList.add(l2), this._queueCallback(() => {
        s2.classList.remove(l2, c2), s2.classList.add(Et), i2.classList.remove(Et, c2, l2), this._isSliding = false, r2(mt);
      }, i2, this._isAnimated()), a2 && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return R.findOne(Ot, this._element);
    }
    _getItems() {
      return R.find(Ct, this._element);
    }
    _clearInterval() {
      this._interval && (clearInterval(this._interval), this._interval = null);
    }
    _directionToOrder(t2) {
      return m() ? t2 === ut ? dt : ht : t2 === ut ? ht : dt;
    }
    _orderToDirection(t2) {
      return m() ? t2 === dt ? ut : ft : t2 === dt ? ft : ut;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = St.getOrCreateInstance(this, t2);
        if ("number" != typeof t2) {
          if ("string" == typeof t2) {
            if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
            e2[t2]();
          }
        } else e2.to(t2);
      });
    }
  }
  P.on(document, wt, "[data-bs-slide], [data-bs-slide-to]", function(t2) {
    const e2 = R.getElementFromSelector(this);
    if (!e2 || !e2.classList.contains(At)) return;
    t2.preventDefault();
    const i2 = St.getOrCreateInstance(e2), n2 = this.getAttribute("data-bs-slide-to");
    return n2 ? (i2.to(n2), void i2._maybeEnableCycle()) : "next" === H.getDataAttribute(this, "slide") ? (i2.next(), void i2._maybeEnableCycle()) : (i2.prev(), void i2._maybeEnableCycle());
  }), P.on(window, yt, () => {
    const t2 = R.find('[data-bs-ride="carousel"]');
    for (const e2 of t2) St.getOrCreateInstance(e2);
  }), g(St);
  const Dt = ".bs.collapse", $t = `show${Dt}`, It = `shown${Dt}`, Nt = `hide${Dt}`, Pt = `hidden${Dt}`, jt = `click${Dt}.data-api`, Mt = "show", Ft = "collapse", Ht = "collapsing", Wt = `:scope .${Ft} .${Ft}`, Bt = '[data-bs-toggle="collapse"]', zt = { parent: null, toggle: true }, Rt = { parent: "(null|element)", toggle: "boolean" };
  class qt extends B {
    constructor(t2, e2) {
      super(t2, e2), this._isTransitioning = false, this._triggerArray = [];
      const i2 = R.find(Bt);
      for (const t3 of i2) {
        const e3 = R.getSelectorFromElement(t3), i3 = R.find(e3).filter((t4) => t4 === this._element);
        null !== e3 && i3.length && this._triggerArray.push(t3);
      }
      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
    }
    static get Default() {
      return zt;
    }
    static get DefaultType() {
      return Rt;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t2 = [];
      if (this._config.parent && (t2 = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t3) => t3 !== this._element).map((t3) => qt.getOrCreateInstance(t3, { toggle: false }))), t2.length && t2[0]._isTransitioning) return;
      if (P.trigger(this._element, $t).defaultPrevented) return;
      for (const e3 of t2) e3.hide();
      const e2 = this._getDimension();
      this._element.classList.remove(Ft), this._element.classList.add(Ht), this._element.style[e2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
      const i2 = `scroll${e2[0].toUpperCase() + e2.slice(1)}`;
      this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(Ht), this._element.classList.add(Ft, Mt), this._element.style[e2] = "", P.trigger(this._element, It);
      }, this._element, true), this._element.style[e2] = `${this._element[i2]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if (P.trigger(this._element, Nt).defaultPrevented) return;
      const t2 = this._getDimension();
      this._element.style[t2] = `${this._element.getBoundingClientRect()[t2]}px`, u(this._element), this._element.classList.add(Ht), this._element.classList.remove(Ft, Mt);
      for (const t3 of this._triggerArray) {
        const e2 = R.getElementFromSelector(t3);
        e2 && !this._isShown(e2) && this._addAriaAndCollapsedClass([t3], false);
      }
      this._isTransitioning = true, this._element.style[t2] = "", this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(Ht), this._element.classList.add(Ft), P.trigger(this._element, Pt);
      }, this._element, true);
    }
    _isShown(t2 = this._element) {
      return t2.classList.contains(Mt);
    }
    _configAfterMerge(t2) {
      return t2.toggle = Boolean(t2.toggle), t2.parent = a(t2.parent), t2;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t2 = this._getFirstLevelChildren(Bt);
      for (const e2 of t2) {
        const t3 = R.getElementFromSelector(e2);
        t3 && this._addAriaAndCollapsedClass([e2], this._isShown(t3));
      }
    }
    _getFirstLevelChildren(t2) {
      const e2 = R.find(Wt, this._config.parent);
      return R.find(t2, this._config.parent).filter((t3) => !e2.includes(t3));
    }
    _addAriaAndCollapsedClass(t2, e2) {
      if (t2.length) for (const i2 of t2) i2.classList.toggle("collapsed", !e2), i2.setAttribute("aria-expanded", e2);
    }
    static jQueryInterface(t2) {
      const e2 = {};
      return "string" == typeof t2 && /show|hide/.test(t2) && (e2.toggle = false), this.each(function() {
        const i2 = qt.getOrCreateInstance(this, e2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2]();
        }
      });
    }
  }
  P.on(document, jt, Bt, function(t2) {
    ("A" === t2.target.tagName || t2.delegateTarget && "A" === t2.delegateTarget.tagName) && t2.preventDefault();
    for (const t3 of R.getMultipleElementsFromSelector(this)) qt.getOrCreateInstance(t3, { toggle: false }).toggle();
  }), g(qt);
  var Vt = "top", Kt = "bottom", Qt = "right", Xt = "left", Yt = "auto", Ut = [Vt, Kt, Qt, Xt], Gt = "start", Jt = "end", Zt = "clippingParents", te = "viewport", ee = "popper", ie = "reference", ne = Ut.reduce(function(t2, e2) {
    return t2.concat([e2 + "-" + Gt, e2 + "-" + Jt]);
  }, []), se = [].concat(Ut, [Yt]).reduce(function(t2, e2) {
    return t2.concat([e2, e2 + "-" + Gt, e2 + "-" + Jt]);
  }, []), oe = "beforeRead", re = "read", ae = "afterRead", le = "beforeMain", ce = "main", he = "afterMain", de = "beforeWrite", ue = "write", fe = "afterWrite", pe = [oe, re, ae, le, ce, he, de, ue, fe];
  function me(t2) {
    return t2 ? (t2.nodeName || "").toLowerCase() : null;
  }
  function ge(t2) {
    if (null == t2) return window;
    if ("[object Window]" !== t2.toString()) {
      var e2 = t2.ownerDocument;
      return e2 && e2.defaultView || window;
    }
    return t2;
  }
  function _e(t2) {
    return t2 instanceof ge(t2).Element || t2 instanceof Element;
  }
  function be(t2) {
    return t2 instanceof ge(t2).HTMLElement || t2 instanceof HTMLElement;
  }
  function ve(t2) {
    return "undefined" != typeof ShadowRoot && (t2 instanceof ge(t2).ShadowRoot || t2 instanceof ShadowRoot);
  }
  const ye = { name: "applyStyles", enabled: true, phase: "write", fn: function(t2) {
    var e2 = t2.state;
    Object.keys(e2.elements).forEach(function(t3) {
      var i2 = e2.styles[t3] || {}, n2 = e2.attributes[t3] || {}, s2 = e2.elements[t3];
      be(s2) && me(s2) && (Object.assign(s2.style, i2), Object.keys(n2).forEach(function(t4) {
        var e3 = n2[t4];
        false === e3 ? s2.removeAttribute(t4) : s2.setAttribute(t4, true === e3 ? "" : e3);
      }));
    });
  }, effect: function(t2) {
    var e2 = t2.state, i2 = { popper: { position: e2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(e2.elements.popper.style, i2.popper), e2.styles = i2, e2.elements.arrow && Object.assign(e2.elements.arrow.style, i2.arrow), function() {
      Object.keys(e2.elements).forEach(function(t3) {
        var n2 = e2.elements[t3], s2 = e2.attributes[t3] || {}, o2 = Object.keys(e2.styles.hasOwnProperty(t3) ? e2.styles[t3] : i2[t3]).reduce(function(t4, e3) {
          return t4[e3] = "", t4;
        }, {});
        be(n2) && me(n2) && (Object.assign(n2.style, o2), Object.keys(s2).forEach(function(t4) {
          n2.removeAttribute(t4);
        }));
      });
    };
  }, requires: ["computeStyles"] };
  function we(t2) {
    return t2.split("-")[0];
  }
  var Ae = Math.max, Ee = Math.min, Te = Math.round;
  function Ce() {
    var t2 = navigator.userAgentData;
    return null != t2 && t2.brands && Array.isArray(t2.brands) ? t2.brands.map(function(t3) {
      return t3.brand + "/" + t3.version;
    }).join(" ") : navigator.userAgent;
  }
  function Oe() {
    return !/^((?!chrome|android).)*safari/i.test(Ce());
  }
  function xe(t2, e2, i2) {
    void 0 === e2 && (e2 = false), void 0 === i2 && (i2 = false);
    var n2 = t2.getBoundingClientRect(), s2 = 1, o2 = 1;
    e2 && be(t2) && (s2 = t2.offsetWidth > 0 && Te(n2.width) / t2.offsetWidth || 1, o2 = t2.offsetHeight > 0 && Te(n2.height) / t2.offsetHeight || 1);
    var r2 = (_e(t2) ? ge(t2) : window).visualViewport, a2 = !Oe() && i2, l2 = (n2.left + (a2 && r2 ? r2.offsetLeft : 0)) / s2, c2 = (n2.top + (a2 && r2 ? r2.offsetTop : 0)) / o2, h2 = n2.width / s2, d2 = n2.height / o2;
    return { width: h2, height: d2, top: c2, right: l2 + h2, bottom: c2 + d2, left: l2, x: l2, y: c2 };
  }
  function ke(t2) {
    var e2 = xe(t2), i2 = t2.offsetWidth, n2 = t2.offsetHeight;
    return Math.abs(e2.width - i2) <= 1 && (i2 = e2.width), Math.abs(e2.height - n2) <= 1 && (n2 = e2.height), { x: t2.offsetLeft, y: t2.offsetTop, width: i2, height: n2 };
  }
  function Le(t2, e2) {
    var i2 = e2.getRootNode && e2.getRootNode();
    if (t2.contains(e2)) return true;
    if (i2 && ve(i2)) {
      var n2 = e2;
      do {
        if (n2 && t2.isSameNode(n2)) return true;
        n2 = n2.parentNode || n2.host;
      } while (n2);
    }
    return false;
  }
  function Se(t2) {
    return ge(t2).getComputedStyle(t2);
  }
  function De(t2) {
    return ["table", "td", "th"].indexOf(me(t2)) >= 0;
  }
  function $e(t2) {
    return ((_e(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
  }
  function Ie(t2) {
    return "html" === me(t2) ? t2 : t2.assignedSlot || t2.parentNode || (ve(t2) ? t2.host : null) || $e(t2);
  }
  function Ne(t2) {
    return be(t2) && "fixed" !== Se(t2).position ? t2.offsetParent : null;
  }
  function Pe(t2) {
    for (var e2 = ge(t2), i2 = Ne(t2); i2 && De(i2) && "static" === Se(i2).position; ) i2 = Ne(i2);
    return i2 && ("html" === me(i2) || "body" === me(i2) && "static" === Se(i2).position) ? e2 : i2 || (function(t3) {
      var e3 = /firefox/i.test(Ce());
      if (/Trident/i.test(Ce()) && be(t3) && "fixed" === Se(t3).position) return null;
      var i3 = Ie(t3);
      for (ve(i3) && (i3 = i3.host); be(i3) && ["html", "body"].indexOf(me(i3)) < 0; ) {
        var n2 = Se(i3);
        if ("none" !== n2.transform || "none" !== n2.perspective || "paint" === n2.contain || -1 !== ["transform", "perspective"].indexOf(n2.willChange) || e3 && "filter" === n2.willChange || e3 && n2.filter && "none" !== n2.filter) return i3;
        i3 = i3.parentNode;
      }
      return null;
    })(t2) || e2;
  }
  function je(t2) {
    return ["top", "bottom"].indexOf(t2) >= 0 ? "x" : "y";
  }
  function Me(t2, e2, i2) {
    return Ae(t2, Ee(e2, i2));
  }
  function Fe(t2) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t2);
  }
  function He(t2, e2) {
    return e2.reduce(function(e3, i2) {
      return e3[i2] = t2, e3;
    }, {});
  }
  const We = { name: "arrow", enabled: true, phase: "main", fn: function(t2) {
    var e2, i2 = t2.state, n2 = t2.name, s2 = t2.options, o2 = i2.elements.arrow, r2 = i2.modifiersData.popperOffsets, a2 = we(i2.placement), l2 = je(a2), c2 = [Xt, Qt].indexOf(a2) >= 0 ? "height" : "width";
    if (o2 && r2) {
      var h2 = (function(t3, e3) {
        return Fe("number" != typeof (t3 = "function" == typeof t3 ? t3(Object.assign({}, e3.rects, { placement: e3.placement })) : t3) ? t3 : He(t3, Ut));
      })(s2.padding, i2), d2 = ke(o2), u2 = "y" === l2 ? Vt : Xt, f2 = "y" === l2 ? Kt : Qt, p2 = i2.rects.reference[c2] + i2.rects.reference[l2] - r2[l2] - i2.rects.popper[c2], m2 = r2[l2] - i2.rects.reference[l2], g2 = Pe(o2), _2 = g2 ? "y" === l2 ? g2.clientHeight || 0 : g2.clientWidth || 0 : 0, b2 = p2 / 2 - m2 / 2, v2 = h2[u2], y2 = _2 - d2[c2] - h2[f2], w2 = _2 / 2 - d2[c2] / 2 + b2, A2 = Me(v2, w2, y2), E2 = l2;
      i2.modifiersData[n2] = ((e2 = {})[E2] = A2, e2.centerOffset = A2 - w2, e2);
    }
  }, effect: function(t2) {
    var e2 = t2.state, i2 = t2.options.element, n2 = void 0 === i2 ? "[data-popper-arrow]" : i2;
    null != n2 && ("string" != typeof n2 || (n2 = e2.elements.popper.querySelector(n2))) && Le(e2.elements.popper, n2) && (e2.elements.arrow = n2);
  }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function Be(t2) {
    return t2.split("-")[1];
  }
  var ze = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Re(t2) {
    var e2, i2 = t2.popper, n2 = t2.popperRect, s2 = t2.placement, o2 = t2.variation, r2 = t2.offsets, a2 = t2.position, l2 = t2.gpuAcceleration, c2 = t2.adaptive, h2 = t2.roundOffsets, d2 = t2.isFixed, u2 = r2.x, f2 = void 0 === u2 ? 0 : u2, p2 = r2.y, m2 = void 0 === p2 ? 0 : p2, g2 = "function" == typeof h2 ? h2({ x: f2, y: m2 }) : { x: f2, y: m2 };
    f2 = g2.x, m2 = g2.y;
    var _2 = r2.hasOwnProperty("x"), b2 = r2.hasOwnProperty("y"), v2 = Xt, y2 = Vt, w2 = window;
    if (c2) {
      var A2 = Pe(i2), E2 = "clientHeight", T2 = "clientWidth";
      A2 === ge(i2) && "static" !== Se(A2 = $e(i2)).position && "absolute" === a2 && (E2 = "scrollHeight", T2 = "scrollWidth"), (s2 === Vt || (s2 === Xt || s2 === Qt) && o2 === Jt) && (y2 = Kt, m2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.height : A2[E2]) - n2.height, m2 *= l2 ? 1 : -1), s2 !== Xt && (s2 !== Vt && s2 !== Kt || o2 !== Jt) || (v2 = Qt, f2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.width : A2[T2]) - n2.width, f2 *= l2 ? 1 : -1);
    }
    var C2, O2 = Object.assign({ position: a2 }, c2 && ze), x2 = true === h2 ? (function(t3, e3) {
      var i3 = t3.x, n3 = t3.y, s3 = e3.devicePixelRatio || 1;
      return { x: Te(i3 * s3) / s3 || 0, y: Te(n3 * s3) / s3 || 0 };
    })({ x: f2, y: m2 }, ge(i2)) : { x: f2, y: m2 };
    return f2 = x2.x, m2 = x2.y, l2 ? Object.assign({}, O2, ((C2 = {})[y2] = b2 ? "0" : "", C2[v2] = _2 ? "0" : "", C2.transform = (w2.devicePixelRatio || 1) <= 1 ? "translate(" + f2 + "px, " + m2 + "px)" : "translate3d(" + f2 + "px, " + m2 + "px, 0)", C2)) : Object.assign({}, O2, ((e2 = {})[y2] = b2 ? m2 + "px" : "", e2[v2] = _2 ? f2 + "px" : "", e2.transform = "", e2));
  }
  const qe = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = i2.gpuAcceleration, s2 = void 0 === n2 || n2, o2 = i2.adaptive, r2 = void 0 === o2 || o2, a2 = i2.roundOffsets, l2 = void 0 === a2 || a2, c2 = { placement: we(e2.placement), variation: Be(e2.placement), popper: e2.elements.popper, popperRect: e2.rects.popper, gpuAcceleration: s2, isFixed: "fixed" === e2.options.strategy };
    null != e2.modifiersData.popperOffsets && (e2.styles.popper = Object.assign({}, e2.styles.popper, Re(Object.assign({}, c2, { offsets: e2.modifiersData.popperOffsets, position: e2.options.strategy, adaptive: r2, roundOffsets: l2 })))), null != e2.modifiersData.arrow && (e2.styles.arrow = Object.assign({}, e2.styles.arrow, Re(Object.assign({}, c2, { offsets: e2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: l2 })))), e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-placement": e2.placement });
  }, data: {} };
  var Ve = { passive: true };
  const Ke = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: function(t2) {
    var e2 = t2.state, i2 = t2.instance, n2 = t2.options, s2 = n2.scroll, o2 = void 0 === s2 || s2, r2 = n2.resize, a2 = void 0 === r2 || r2, l2 = ge(e2.elements.popper), c2 = [].concat(e2.scrollParents.reference, e2.scrollParents.popper);
    return o2 && c2.forEach(function(t3) {
      t3.addEventListener("scroll", i2.update, Ve);
    }), a2 && l2.addEventListener("resize", i2.update, Ve), function() {
      o2 && c2.forEach(function(t3) {
        t3.removeEventListener("scroll", i2.update, Ve);
      }), a2 && l2.removeEventListener("resize", i2.update, Ve);
    };
  }, data: {} };
  var Qe = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Xe(t2) {
    return t2.replace(/left|right|bottom|top/g, function(t3) {
      return Qe[t3];
    });
  }
  var Ye = { start: "end", end: "start" };
  function Ue(t2) {
    return t2.replace(/start|end/g, function(t3) {
      return Ye[t3];
    });
  }
  function Ge(t2) {
    var e2 = ge(t2);
    return { scrollLeft: e2.pageXOffset, scrollTop: e2.pageYOffset };
  }
  function Je(t2) {
    return xe($e(t2)).left + Ge(t2).scrollLeft;
  }
  function Ze(t2) {
    var e2 = Se(t2), i2 = e2.overflow, n2 = e2.overflowX, s2 = e2.overflowY;
    return /auto|scroll|overlay|hidden/.test(i2 + s2 + n2);
  }
  function ti(t2) {
    return ["html", "body", "#document"].indexOf(me(t2)) >= 0 ? t2.ownerDocument.body : be(t2) && Ze(t2) ? t2 : ti(Ie(t2));
  }
  function ei(t2, e2) {
    var i2;
    void 0 === e2 && (e2 = []);
    var n2 = ti(t2), s2 = n2 === (null == (i2 = t2.ownerDocument) ? void 0 : i2.body), o2 = ge(n2), r2 = s2 ? [o2].concat(o2.visualViewport || [], Ze(n2) ? n2 : []) : n2, a2 = e2.concat(r2);
    return s2 ? a2 : a2.concat(ei(Ie(r2)));
  }
  function ii(t2) {
    return Object.assign({}, t2, { left: t2.x, top: t2.y, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function ni(t2, e2, i2) {
    return e2 === te ? ii((function(t3, e3) {
      var i3 = ge(t3), n2 = $e(t3), s2 = i3.visualViewport, o2 = n2.clientWidth, r2 = n2.clientHeight, a2 = 0, l2 = 0;
      if (s2) {
        o2 = s2.width, r2 = s2.height;
        var c2 = Oe();
        (c2 || !c2 && "fixed" === e3) && (a2 = s2.offsetLeft, l2 = s2.offsetTop);
      }
      return { width: o2, height: r2, x: a2 + Je(t3), y: l2 };
    })(t2, i2)) : _e(e2) ? (function(t3, e3) {
      var i3 = xe(t3, false, "fixed" === e3);
      return i3.top = i3.top + t3.clientTop, i3.left = i3.left + t3.clientLeft, i3.bottom = i3.top + t3.clientHeight, i3.right = i3.left + t3.clientWidth, i3.width = t3.clientWidth, i3.height = t3.clientHeight, i3.x = i3.left, i3.y = i3.top, i3;
    })(e2, i2) : ii((function(t3) {
      var e3, i3 = $e(t3), n2 = Ge(t3), s2 = null == (e3 = t3.ownerDocument) ? void 0 : e3.body, o2 = Ae(i3.scrollWidth, i3.clientWidth, s2 ? s2.scrollWidth : 0, s2 ? s2.clientWidth : 0), r2 = Ae(i3.scrollHeight, i3.clientHeight, s2 ? s2.scrollHeight : 0, s2 ? s2.clientHeight : 0), a2 = -n2.scrollLeft + Je(t3), l2 = -n2.scrollTop;
      return "rtl" === Se(s2 || i3).direction && (a2 += Ae(i3.clientWidth, s2 ? s2.clientWidth : 0) - o2), { width: o2, height: r2, x: a2, y: l2 };
    })($e(t2)));
  }
  function si(t2) {
    var e2, i2 = t2.reference, n2 = t2.element, s2 = t2.placement, o2 = s2 ? we(s2) : null, r2 = s2 ? Be(s2) : null, a2 = i2.x + i2.width / 2 - n2.width / 2, l2 = i2.y + i2.height / 2 - n2.height / 2;
    switch (o2) {
      case Vt:
        e2 = { x: a2, y: i2.y - n2.height };
        break;
      case Kt:
        e2 = { x: a2, y: i2.y + i2.height };
        break;
      case Qt:
        e2 = { x: i2.x + i2.width, y: l2 };
        break;
      case Xt:
        e2 = { x: i2.x - n2.width, y: l2 };
        break;
      default:
        e2 = { x: i2.x, y: i2.y };
    }
    var c2 = o2 ? je(o2) : null;
    if (null != c2) {
      var h2 = "y" === c2 ? "height" : "width";
      switch (r2) {
        case Gt:
          e2[c2] = e2[c2] - (i2[h2] / 2 - n2[h2] / 2);
          break;
        case Jt:
          e2[c2] = e2[c2] + (i2[h2] / 2 - n2[h2] / 2);
      }
    }
    return e2;
  }
  function oi(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i2 = e2, n2 = i2.placement, s2 = void 0 === n2 ? t2.placement : n2, o2 = i2.strategy, r2 = void 0 === o2 ? t2.strategy : o2, a2 = i2.boundary, l2 = void 0 === a2 ? Zt : a2, c2 = i2.rootBoundary, h2 = void 0 === c2 ? te : c2, d2 = i2.elementContext, u2 = void 0 === d2 ? ee : d2, f2 = i2.altBoundary, p2 = void 0 !== f2 && f2, m2 = i2.padding, g2 = void 0 === m2 ? 0 : m2, _2 = Fe("number" != typeof g2 ? g2 : He(g2, Ut)), b2 = u2 === ee ? ie : ee, v2 = t2.rects.popper, y2 = t2.elements[p2 ? b2 : u2], w2 = (function(t3, e3, i3, n3) {
      var s3 = "clippingParents" === e3 ? (function(t4) {
        var e4 = ei(Ie(t4)), i4 = ["absolute", "fixed"].indexOf(Se(t4).position) >= 0 && be(t4) ? Pe(t4) : t4;
        return _e(i4) ? e4.filter(function(t5) {
          return _e(t5) && Le(t5, i4) && "body" !== me(t5);
        }) : [];
      })(t3) : [].concat(e3), o3 = [].concat(s3, [i3]), r3 = o3[0], a3 = o3.reduce(function(e4, i4) {
        var s4 = ni(t3, i4, n3);
        return e4.top = Ae(s4.top, e4.top), e4.right = Ee(s4.right, e4.right), e4.bottom = Ee(s4.bottom, e4.bottom), e4.left = Ae(s4.left, e4.left), e4;
      }, ni(t3, r3, n3));
      return a3.width = a3.right - a3.left, a3.height = a3.bottom - a3.top, a3.x = a3.left, a3.y = a3.top, a3;
    })(_e(y2) ? y2 : y2.contextElement || $e(t2.elements.popper), l2, h2, r2), A2 = xe(t2.elements.reference), E2 = si({ reference: A2, element: v2, placement: s2 }), T2 = ii(Object.assign({}, v2, E2)), C2 = u2 === ee ? T2 : A2, O2 = { top: w2.top - C2.top + _2.top, bottom: C2.bottom - w2.bottom + _2.bottom, left: w2.left - C2.left + _2.left, right: C2.right - w2.right + _2.right }, x2 = t2.modifiersData.offset;
    if (u2 === ee && x2) {
      var k2 = x2[s2];
      Object.keys(O2).forEach(function(t3) {
        var e3 = [Qt, Kt].indexOf(t3) >= 0 ? 1 : -1, i3 = [Vt, Kt].indexOf(t3) >= 0 ? "y" : "x";
        O2[t3] += k2[i3] * e3;
      });
    }
    return O2;
  }
  function ri(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i2 = e2, n2 = i2.placement, s2 = i2.boundary, o2 = i2.rootBoundary, r2 = i2.padding, a2 = i2.flipVariations, l2 = i2.allowedAutoPlacements, c2 = void 0 === l2 ? se : l2, h2 = Be(n2), d2 = h2 ? a2 ? ne : ne.filter(function(t3) {
      return Be(t3) === h2;
    }) : Ut, u2 = d2.filter(function(t3) {
      return c2.indexOf(t3) >= 0;
    });
    0 === u2.length && (u2 = d2);
    var f2 = u2.reduce(function(e3, i3) {
      return e3[i3] = oi(t2, { placement: i3, boundary: s2, rootBoundary: o2, padding: r2 })[we(i3)], e3;
    }, {});
    return Object.keys(f2).sort(function(t3, e3) {
      return f2[t3] - f2[e3];
    });
  }
  const ai = { name: "flip", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name;
    if (!e2.modifiersData[n2]._skip) {
      for (var s2 = i2.mainAxis, o2 = void 0 === s2 || s2, r2 = i2.altAxis, a2 = void 0 === r2 || r2, l2 = i2.fallbackPlacements, c2 = i2.padding, h2 = i2.boundary, d2 = i2.rootBoundary, u2 = i2.altBoundary, f2 = i2.flipVariations, p2 = void 0 === f2 || f2, m2 = i2.allowedAutoPlacements, g2 = e2.options.placement, _2 = we(g2), b2 = l2 || (_2 !== g2 && p2 ? (function(t3) {
        if (we(t3) === Yt) return [];
        var e3 = Xe(t3);
        return [Ue(t3), e3, Ue(e3)];
      })(g2) : [Xe(g2)]), v2 = [g2].concat(b2).reduce(function(t3, i3) {
        return t3.concat(we(i3) === Yt ? ri(e2, { placement: i3, boundary: h2, rootBoundary: d2, padding: c2, flipVariations: p2, allowedAutoPlacements: m2 }) : i3);
      }, []), y2 = e2.rects.reference, w2 = e2.rects.popper, A2 = /* @__PURE__ */ new Map(), E2 = true, T2 = v2[0], C2 = 0; C2 < v2.length; C2++) {
        var O2 = v2[C2], x2 = we(O2), k2 = Be(O2) === Gt, L2 = [Vt, Kt].indexOf(x2) >= 0, S2 = L2 ? "width" : "height", D2 = oi(e2, { placement: O2, boundary: h2, rootBoundary: d2, altBoundary: u2, padding: c2 }), $2 = L2 ? k2 ? Qt : Xt : k2 ? Kt : Vt;
        y2[S2] > w2[S2] && ($2 = Xe($2));
        var I2 = Xe($2), N2 = [];
        if (o2 && N2.push(D2[x2] <= 0), a2 && N2.push(D2[$2] <= 0, D2[I2] <= 0), N2.every(function(t3) {
          return t3;
        })) {
          T2 = O2, E2 = false;
          break;
        }
        A2.set(O2, N2);
      }
      if (E2) for (var P2 = function(t3) {
        var e3 = v2.find(function(e4) {
          var i3 = A2.get(e4);
          if (i3) return i3.slice(0, t3).every(function(t4) {
            return t4;
          });
        });
        if (e3) return T2 = e3, "break";
      }, j2 = p2 ? 3 : 1; j2 > 0 && "break" !== P2(j2); j2--) ;
      e2.placement !== T2 && (e2.modifiersData[n2]._skip = true, e2.placement = T2, e2.reset = true);
    }
  }, requiresIfExists: ["offset"], data: { _skip: false } };
  function li(t2, e2, i2) {
    return void 0 === i2 && (i2 = { x: 0, y: 0 }), { top: t2.top - e2.height - i2.y, right: t2.right - e2.width + i2.x, bottom: t2.bottom - e2.height + i2.y, left: t2.left - e2.width - i2.x };
  }
  function ci(t2) {
    return [Vt, Qt, Kt, Xt].some(function(e2) {
      return t2[e2] >= 0;
    });
  }
  const hi = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(t2) {
    var e2 = t2.state, i2 = t2.name, n2 = e2.rects.reference, s2 = e2.rects.popper, o2 = e2.modifiersData.preventOverflow, r2 = oi(e2, { elementContext: "reference" }), a2 = oi(e2, { altBoundary: true }), l2 = li(r2, n2), c2 = li(a2, s2, o2), h2 = ci(l2), d2 = ci(c2);
    e2.modifiersData[i2] = { referenceClippingOffsets: l2, popperEscapeOffsets: c2, isReferenceHidden: h2, hasPopperEscaped: d2 }, e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-reference-hidden": h2, "data-popper-escaped": d2 });
  } }, di = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name, s2 = i2.offset, o2 = void 0 === s2 ? [0, 0] : s2, r2 = se.reduce(function(t3, i3) {
      return t3[i3] = (function(t4, e3, i4) {
        var n3 = we(t4), s3 = [Xt, Vt].indexOf(n3) >= 0 ? -1 : 1, o3 = "function" == typeof i4 ? i4(Object.assign({}, e3, { placement: t4 })) : i4, r3 = o3[0], a3 = o3[1];
        return r3 = r3 || 0, a3 = (a3 || 0) * s3, [Xt, Qt].indexOf(n3) >= 0 ? { x: a3, y: r3 } : { x: r3, y: a3 };
      })(i3, e2.rects, o2), t3;
    }, {}), a2 = r2[e2.placement], l2 = a2.x, c2 = a2.y;
    null != e2.modifiersData.popperOffsets && (e2.modifiersData.popperOffsets.x += l2, e2.modifiersData.popperOffsets.y += c2), e2.modifiersData[n2] = r2;
  } }, ui = { name: "popperOffsets", enabled: true, phase: "read", fn: function(t2) {
    var e2 = t2.state, i2 = t2.name;
    e2.modifiersData[i2] = si({ reference: e2.rects.reference, element: e2.rects.popper, placement: e2.placement });
  }, data: {} }, fi = { name: "preventOverflow", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i2 = t2.options, n2 = t2.name, s2 = i2.mainAxis, o2 = void 0 === s2 || s2, r2 = i2.altAxis, a2 = void 0 !== r2 && r2, l2 = i2.boundary, c2 = i2.rootBoundary, h2 = i2.altBoundary, d2 = i2.padding, u2 = i2.tether, f2 = void 0 === u2 || u2, p2 = i2.tetherOffset, m2 = void 0 === p2 ? 0 : p2, g2 = oi(e2, { boundary: l2, rootBoundary: c2, padding: d2, altBoundary: h2 }), _2 = we(e2.placement), b2 = Be(e2.placement), v2 = !b2, y2 = je(_2), w2 = "x" === y2 ? "y" : "x", A2 = e2.modifiersData.popperOffsets, E2 = e2.rects.reference, T2 = e2.rects.popper, C2 = "function" == typeof m2 ? m2(Object.assign({}, e2.rects, { placement: e2.placement })) : m2, O2 = "number" == typeof C2 ? { mainAxis: C2, altAxis: C2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, C2), x2 = e2.modifiersData.offset ? e2.modifiersData.offset[e2.placement] : null, k2 = { x: 0, y: 0 };
    if (A2) {
      if (o2) {
        var L2, S2 = "y" === y2 ? Vt : Xt, D2 = "y" === y2 ? Kt : Qt, $2 = "y" === y2 ? "height" : "width", I2 = A2[y2], N2 = I2 + g2[S2], P2 = I2 - g2[D2], j2 = f2 ? -T2[$2] / 2 : 0, M2 = b2 === Gt ? E2[$2] : T2[$2], F2 = b2 === Gt ? -T2[$2] : -E2[$2], H2 = e2.elements.arrow, W2 = f2 && H2 ? ke(H2) : { width: 0, height: 0 }, B2 = e2.modifiersData["arrow#persistent"] ? e2.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 }, z2 = B2[S2], R2 = B2[D2], q2 = Me(0, E2[$2], W2[$2]), V2 = v2 ? E2[$2] / 2 - j2 - q2 - z2 - O2.mainAxis : M2 - q2 - z2 - O2.mainAxis, K2 = v2 ? -E2[$2] / 2 + j2 + q2 + R2 + O2.mainAxis : F2 + q2 + R2 + O2.mainAxis, Q2 = e2.elements.arrow && Pe(e2.elements.arrow), X2 = Q2 ? "y" === y2 ? Q2.clientTop || 0 : Q2.clientLeft || 0 : 0, Y2 = null != (L2 = null == x2 ? void 0 : x2[y2]) ? L2 : 0, U2 = I2 + K2 - Y2, G2 = Me(f2 ? Ee(N2, I2 + V2 - Y2 - X2) : N2, I2, f2 ? Ae(P2, U2) : P2);
        A2[y2] = G2, k2[y2] = G2 - I2;
      }
      if (a2) {
        var J2, Z2 = "x" === y2 ? Vt : Xt, tt2 = "x" === y2 ? Kt : Qt, et2 = A2[w2], it2 = "y" === w2 ? "height" : "width", nt2 = et2 + g2[Z2], st2 = et2 - g2[tt2], ot2 = -1 !== [Vt, Xt].indexOf(_2), rt2 = null != (J2 = null == x2 ? void 0 : x2[w2]) ? J2 : 0, at2 = ot2 ? nt2 : et2 - E2[it2] - T2[it2] - rt2 + O2.altAxis, lt2 = ot2 ? et2 + E2[it2] + T2[it2] - rt2 - O2.altAxis : st2, ct2 = f2 && ot2 ? (function(t3, e3, i3) {
          var n3 = Me(t3, e3, i3);
          return n3 > i3 ? i3 : n3;
        })(at2, et2, lt2) : Me(f2 ? at2 : nt2, et2, f2 ? lt2 : st2);
        A2[w2] = ct2, k2[w2] = ct2 - et2;
      }
      e2.modifiersData[n2] = k2;
    }
  }, requiresIfExists: ["offset"] };
  function pi(t2, e2, i2) {
    void 0 === i2 && (i2 = false);
    var n2, s2, o2 = be(e2), r2 = be(e2) && (function(t3) {
      var e3 = t3.getBoundingClientRect(), i3 = Te(e3.width) / t3.offsetWidth || 1, n3 = Te(e3.height) / t3.offsetHeight || 1;
      return 1 !== i3 || 1 !== n3;
    })(e2), a2 = $e(e2), l2 = xe(t2, r2, i2), c2 = { scrollLeft: 0, scrollTop: 0 }, h2 = { x: 0, y: 0 };
    return (o2 || !o2 && !i2) && (("body" !== me(e2) || Ze(a2)) && (c2 = (n2 = e2) !== ge(n2) && be(n2) ? { scrollLeft: (s2 = n2).scrollLeft, scrollTop: s2.scrollTop } : Ge(n2)), be(e2) ? ((h2 = xe(e2, true)).x += e2.clientLeft, h2.y += e2.clientTop) : a2 && (h2.x = Je(a2))), { x: l2.left + c2.scrollLeft - h2.x, y: l2.top + c2.scrollTop - h2.y, width: l2.width, height: l2.height };
  }
  function mi(t2) {
    var e2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Set(), n2 = [];
    function s2(t3) {
      i2.add(t3.name), [].concat(t3.requires || [], t3.requiresIfExists || []).forEach(function(t4) {
        if (!i2.has(t4)) {
          var n3 = e2.get(t4);
          n3 && s2(n3);
        }
      }), n2.push(t3);
    }
    return t2.forEach(function(t3) {
      e2.set(t3.name, t3);
    }), t2.forEach(function(t3) {
      i2.has(t3.name) || s2(t3);
    }), n2;
  }
  var gi = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function _i() {
    for (var t2 = arguments.length, e2 = new Array(t2), i2 = 0; i2 < t2; i2++) e2[i2] = arguments[i2];
    return !e2.some(function(t3) {
      return !(t3 && "function" == typeof t3.getBoundingClientRect);
    });
  }
  function bi(t2) {
    void 0 === t2 && (t2 = {});
    var e2 = t2, i2 = e2.defaultModifiers, n2 = void 0 === i2 ? [] : i2, s2 = e2.defaultOptions, o2 = void 0 === s2 ? gi : s2;
    return function(t3, e3, i3) {
      void 0 === i3 && (i3 = o2);
      var s3, r2, a2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, gi, o2), modifiersData: {}, elements: { reference: t3, popper: e3 }, attributes: {}, styles: {} }, l2 = [], c2 = false, h2 = { state: a2, setOptions: function(i4) {
        var s4 = "function" == typeof i4 ? i4(a2.options) : i4;
        d2(), a2.options = Object.assign({}, o2, a2.options, s4), a2.scrollParents = { reference: _e(t3) ? ei(t3) : t3.contextElement ? ei(t3.contextElement) : [], popper: ei(e3) };
        var r3, c3, u2 = (function(t4) {
          var e4 = mi(t4);
          return pe.reduce(function(t5, i5) {
            return t5.concat(e4.filter(function(t6) {
              return t6.phase === i5;
            }));
          }, []);
        })((r3 = [].concat(n2, a2.options.modifiers), c3 = r3.reduce(function(t4, e4) {
          var i5 = t4[e4.name];
          return t4[e4.name] = i5 ? Object.assign({}, i5, e4, { options: Object.assign({}, i5.options, e4.options), data: Object.assign({}, i5.data, e4.data) }) : e4, t4;
        }, {}), Object.keys(c3).map(function(t4) {
          return c3[t4];
        })));
        return a2.orderedModifiers = u2.filter(function(t4) {
          return t4.enabled;
        }), a2.orderedModifiers.forEach(function(t4) {
          var e4 = t4.name, i5 = t4.options, n3 = void 0 === i5 ? {} : i5, s5 = t4.effect;
          if ("function" == typeof s5) {
            var o3 = s5({ state: a2, name: e4, instance: h2, options: n3 });
            l2.push(o3 || function() {
            });
          }
        }), h2.update();
      }, forceUpdate: function() {
        if (!c2) {
          var t4 = a2.elements, e4 = t4.reference, i4 = t4.popper;
          if (_i(e4, i4)) {
            a2.rects = { reference: pi(e4, Pe(i4), "fixed" === a2.options.strategy), popper: ke(i4) }, a2.reset = false, a2.placement = a2.options.placement, a2.orderedModifiers.forEach(function(t5) {
              return a2.modifiersData[t5.name] = Object.assign({}, t5.data);
            });
            for (var n3 = 0; n3 < a2.orderedModifiers.length; n3++) if (true !== a2.reset) {
              var s4 = a2.orderedModifiers[n3], o3 = s4.fn, r3 = s4.options, l3 = void 0 === r3 ? {} : r3, d3 = s4.name;
              "function" == typeof o3 && (a2 = o3({ state: a2, options: l3, name: d3, instance: h2 }) || a2);
            } else a2.reset = false, n3 = -1;
          }
        }
      }, update: (s3 = function() {
        return new Promise(function(t4) {
          h2.forceUpdate(), t4(a2);
        });
      }, function() {
        return r2 || (r2 = new Promise(function(t4) {
          Promise.resolve().then(function() {
            r2 = void 0, t4(s3());
          });
        })), r2;
      }), destroy: function() {
        d2(), c2 = true;
      } };
      if (!_i(t3, e3)) return h2;
      function d2() {
        l2.forEach(function(t4) {
          return t4();
        }), l2 = [];
      }
      return h2.setOptions(i3).then(function(t4) {
        !c2 && i3.onFirstUpdate && i3.onFirstUpdate(t4);
      }), h2;
    };
  }
  var vi = bi(), yi = bi({ defaultModifiers: [Ke, ui, qe, ye] }), wi = bi({ defaultModifiers: [Ke, ui, qe, ye, di, ai, fi, We, hi] });
  const Ai = Object.freeze(Object.defineProperty({ __proto__: null, afterMain: he, afterRead: ae, afterWrite: fe, applyStyles: ye, arrow: We, auto: Yt, basePlacements: Ut, beforeMain: le, beforeRead: oe, beforeWrite: de, bottom: Kt, clippingParents: Zt, computeStyles: qe, createPopper: wi, createPopperBase: vi, createPopperLite: yi, detectOverflow: oi, end: Jt, eventListeners: Ke, flip: ai, hide: hi, left: Xt, main: ce, modifierPhases: pe, offset: di, placements: se, popper: ee, popperGenerator: bi, popperOffsets: ui, preventOverflow: fi, read: re, reference: ie, right: Qt, start: Gt, top: Vt, variationPlacements: ne, viewport: te, write: ue }, Symbol.toStringTag, { value: "Module" })), Ei = "dropdown", Ti = ".bs.dropdown", Ci = ".data-api", Oi = "ArrowUp", xi = "ArrowDown", ki = `hide${Ti}`, Li = `hidden${Ti}`, Si = `show${Ti}`, Di = `shown${Ti}`, $i = `click${Ti}${Ci}`, Ii = `keydown${Ti}${Ci}`, Ni = `keyup${Ti}${Ci}`, Pi = "show", ji = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Mi = `${ji}.${Pi}`, Fi = ".dropdown-menu", Hi = m() ? "top-end" : "top-start", Wi = m() ? "top-start" : "top-end", Bi = m() ? "bottom-end" : "bottom-start", zi = m() ? "bottom-start" : "bottom-end", Ri = m() ? "left-start" : "right-start", qi = m() ? "right-start" : "left-start", Vi = { autoClose: true, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" }, Ki = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
  class Qi extends B {
    constructor(t2, e2) {
      super(t2, e2), this._popper = null, this._parent = this._element.parentNode, this._menu = R.next(this._element, Fi)[0] || R.prev(this._element, Fi)[0] || R.findOne(Fi, this._parent), this._inNavbar = this._detectNavbar();
    }
    static get Default() {
      return Vi;
    }
    static get DefaultType() {
      return Ki;
    }
    static get NAME() {
      return Ei;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (c(this._element) || this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      if (!P.trigger(this._element, Si, t2).defaultPrevented) {
        if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav")) for (const t3 of [].concat(...document.body.children)) P.on(t3, "mouseover", d);
        this._element.focus(), this._element.setAttribute("aria-expanded", true), this._menu.classList.add(Pi), this._element.classList.add(Pi), P.trigger(this._element, Di, t2);
      }
    }
    hide() {
      if (c(this._element) || !this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      this._completeHide(t2);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
    }
    _completeHide(t2) {
      if (!P.trigger(this._element, ki, t2).defaultPrevented) {
        if ("ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) P.off(t3, "mouseover", d);
        this._popper && this._popper.destroy(), this._menu.classList.remove(Pi), this._element.classList.remove(Pi), this._element.setAttribute("aria-expanded", "false"), H.removeDataAttribute(this._menu, "popper"), P.trigger(this._element, Li, t2);
      }
    }
    _getConfig(t2) {
      if ("object" == typeof (t2 = super._getConfig(t2)).reference && !r(t2.reference) && "function" != typeof t2.reference.getBoundingClientRect) throw new TypeError(`${Ei.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      return t2;
    }
    _createPopper() {
      if (void 0 === Ai) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
      let t2 = this._element;
      "parent" === this._config.reference ? t2 = this._parent : r(this._config.reference) ? t2 = a(this._config.reference) : "object" == typeof this._config.reference && (t2 = this._config.reference);
      const e2 = this._getPopperConfig();
      this._popper = wi(t2, this._menu, e2);
    }
    _isShown() {
      return this._menu.classList.contains(Pi);
    }
    _getPlacement() {
      const t2 = this._parent;
      if (t2.classList.contains("dropend")) return Ri;
      if (t2.classList.contains("dropstart")) return qi;
      if (t2.classList.contains("dropup-center")) return "top";
      if (t2.classList.contains("dropdown-center")) return "bottom";
      const e2 = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t2.classList.contains("dropup") ? e2 ? Wi : Hi : e2 ? zi : Bi;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _getPopperConfig() {
      const t2 = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };
      return (this._inNavbar || "static" === this._config.display) && (H.setDataAttribute(this._menu, "popper", "static"), t2.modifiers = [{ name: "applyStyles", enabled: false }]), { ...t2, ..._(this._config.popperConfig, [void 0, t2]) };
    }
    _selectMenuItem({ key: t2, target: e2 }) {
      const i2 = R.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t3) => l(t3));
      i2.length && v(i2, e2, t2 === xi, !i2.includes(e2)).focus();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Qi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
    static clearMenus(t2) {
      if (2 === t2.button || "keyup" === t2.type && "Tab" !== t2.key) return;
      const e2 = R.find(Mi);
      for (const i2 of e2) {
        const e3 = Qi.getInstance(i2);
        if (!e3 || false === e3._config.autoClose) continue;
        const n2 = t2.composedPath(), s2 = n2.includes(e3._menu);
        if (n2.includes(e3._element) || "inside" === e3._config.autoClose && !s2 || "outside" === e3._config.autoClose && s2) continue;
        if (e3._menu.contains(t2.target) && ("keyup" === t2.type && "Tab" === t2.key || /input|select|option|textarea|form/i.test(t2.target.tagName))) continue;
        const o2 = { relatedTarget: e3._element };
        "click" === t2.type && (o2.clickEvent = t2), e3._completeHide(o2);
      }
    }
    static dataApiKeydownHandler(t2) {
      const e2 = /input|textarea/i.test(t2.target.tagName), i2 = "Escape" === t2.key, n2 = [Oi, xi].includes(t2.key);
      if (!n2 && !i2) return;
      if (e2 && !i2) return;
      t2.preventDefault();
      const s2 = this.matches(ji) ? this : R.prev(this, ji)[0] || R.next(this, ji)[0] || R.findOne(ji, t2.delegateTarget.parentNode), o2 = Qi.getOrCreateInstance(s2);
      if (n2) return t2.stopPropagation(), o2.show(), void o2._selectMenuItem(t2);
      o2._isShown() && (t2.stopPropagation(), o2.hide(), s2.focus());
    }
  }
  P.on(document, Ii, ji, Qi.dataApiKeydownHandler), P.on(document, Ii, Fi, Qi.dataApiKeydownHandler), P.on(document, $i, Qi.clearMenus), P.on(document, Ni, Qi.clearMenus), P.on(document, $i, ji, function(t2) {
    t2.preventDefault(), Qi.getOrCreateInstance(this).toggle();
  }), g(Qi);
  const Xi = "backdrop", Yi = "show", Ui = `mousedown.bs.${Xi}`, Gi = { className: "modal-backdrop", clickCallback: null, isAnimated: false, isVisible: true, rootElement: "body" }, Ji = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
  class Zi extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
    }
    static get Default() {
      return Gi;
    }
    static get DefaultType() {
      return Ji;
    }
    static get NAME() {
      return Xi;
    }
    show(t2) {
      if (!this._config.isVisible) return void _(t2);
      this._append();
      const e2 = this._getElement();
      this._config.isAnimated && u(e2), e2.classList.add(Yi), this._emulateAnimation(() => {
        _(t2);
      });
    }
    hide(t2) {
      this._config.isVisible ? (this._getElement().classList.remove(Yi), this._emulateAnimation(() => {
        this.dispose(), _(t2);
      })) : _(t2);
    }
    dispose() {
      this._isAppended && (P.off(this._element, Ui), this._element.remove(), this._isAppended = false);
    }
    _getElement() {
      if (!this._element) {
        const t2 = document.createElement("div");
        t2.className = this._config.className, this._config.isAnimated && t2.classList.add("fade"), this._element = t2;
      }
      return this._element;
    }
    _configAfterMerge(t2) {
      return t2.rootElement = a(t2.rootElement), t2;
    }
    _append() {
      if (this._isAppended) return;
      const t2 = this._getElement();
      this._config.rootElement.append(t2), P.on(t2, Ui, () => {
        _(this._config.clickCallback);
      }), this._isAppended = true;
    }
    _emulateAnimation(t2) {
      b(t2, this._getElement(), this._config.isAnimated);
    }
  }
  const tn = ".bs.focustrap", en = `focusin${tn}`, nn = `keydown.tab${tn}`, sn = "backward", on = { autofocus: true, trapElement: null }, rn = { autofocus: "boolean", trapElement: "element" };
  class an extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isActive = false, this._lastTabNavDirection = null;
    }
    static get Default() {
      return on;
    }
    static get DefaultType() {
      return rn;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive || (this._config.autofocus && this._config.trapElement.focus(), P.off(document, tn), P.on(document, en, (t2) => this._handleFocusin(t2)), P.on(document, nn, (t2) => this._handleKeydown(t2)), this._isActive = true);
    }
    deactivate() {
      this._isActive && (this._isActive = false, P.off(document, tn));
    }
    _handleFocusin(t2) {
      const { trapElement: e2 } = this._config;
      if (t2.target === document || t2.target === e2 || e2.contains(t2.target)) return;
      const i2 = R.focusableChildren(e2);
      0 === i2.length ? e2.focus() : this._lastTabNavDirection === sn ? i2[i2.length - 1].focus() : i2[0].focus();
    }
    _handleKeydown(t2) {
      "Tab" === t2.key && (this._lastTabNavDirection = t2.shiftKey ? sn : "forward");
    }
  }
  const ln = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", cn = ".sticky-top", hn = "padding-right", dn = "margin-right";
  class un {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t2 = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t2);
    }
    hide() {
      const t2 = this.getWidth();
      this._disableOverFlow(), this._setElementAttributes(this._element, hn, (e2) => e2 + t2), this._setElementAttributes(ln, hn, (e2) => e2 + t2), this._setElementAttributes(cn, dn, (e2) => e2 - t2);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, hn), this._resetElementAttributes(ln, hn), this._resetElementAttributes(cn, dn);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
    }
    _setElementAttributes(t2, e2, i2) {
      const n2 = this.getWidth();
      this._applyManipulationCallback(t2, (t3) => {
        if (t3 !== this._element && window.innerWidth > t3.clientWidth + n2) return;
        this._saveInitialAttribute(t3, e2);
        const s2 = window.getComputedStyle(t3).getPropertyValue(e2);
        t3.style.setProperty(e2, `${i2(Number.parseFloat(s2))}px`);
      });
    }
    _saveInitialAttribute(t2, e2) {
      const i2 = t2.style.getPropertyValue(e2);
      i2 && H.setDataAttribute(t2, e2, i2);
    }
    _resetElementAttributes(t2, e2) {
      this._applyManipulationCallback(t2, (t3) => {
        const i2 = H.getDataAttribute(t3, e2);
        null !== i2 ? (H.removeDataAttribute(t3, e2), t3.style.setProperty(e2, i2)) : t3.style.removeProperty(e2);
      });
    }
    _applyManipulationCallback(t2, e2) {
      if (r(t2)) e2(t2);
      else for (const i2 of R.find(t2, this._element)) e2(i2);
    }
  }
  const fn = ".bs.modal", pn = `hide${fn}`, mn = `hidePrevented${fn}`, gn = `hidden${fn}`, _n = `show${fn}`, bn = `shown${fn}`, vn = `resize${fn}`, yn = `click.dismiss${fn}`, wn = `mousedown.dismiss${fn}`, An = `keydown.dismiss${fn}`, En = `click${fn}.data-api`, Tn = "modal-open", Cn = "show", On = "modal-static", xn = { backdrop: true, focus: true, keyboard: true }, kn = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
  class Ln extends B {
    constructor(t2, e2) {
      super(t2, e2), this._dialog = R.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = false, this._isTransitioning = false, this._scrollBar = new un(), this._addEventListeners();
    }
    static get Default() {
      return xn;
    }
    static get DefaultType() {
      return kn;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || this._isTransitioning || P.trigger(this._element, _n, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._isTransitioning = true, this._scrollBar.hide(), document.body.classList.add(Tn), this._adjustDialog(), this._backdrop.show(() => this._showElement(t2)));
    }
    hide() {
      this._isShown && !this._isTransitioning && (P.trigger(this._element, pn).defaultPrevented || (this._isShown = false, this._isTransitioning = true, this._focustrap.deactivate(), this._element.classList.remove(Cn), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
    }
    dispose() {
      P.off(window, fn), P.off(this._dialog, fn), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Zi({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
    }
    _initializeFocusTrap() {
      return new an({ trapElement: this._element });
    }
    _showElement(t2) {
      document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
      const e2 = R.findOne(".modal-body", this._dialog);
      e2 && (e2.scrollTop = 0), u(this._element), this._element.classList.add(Cn), this._queueCallback(() => {
        this._config.focus && this._focustrap.activate(), this._isTransitioning = false, P.trigger(this._element, bn, { relatedTarget: t2 });
      }, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      P.on(this._element, An, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
      }), P.on(window, vn, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }), P.on(this._element, wn, (t2) => {
        P.one(this._element, yn, (e2) => {
          this._element === t2.target && this._element === e2.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", true), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = false, this._backdrop.hide(() => {
        document.body.classList.remove(Tn), this._resetAdjustments(), this._scrollBar.reset(), P.trigger(this._element, gn);
      });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (P.trigger(this._element, mn).defaultPrevented) return;
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._element.style.overflowY;
      "hidden" === e2 || this._element.classList.contains(On) || (t2 || (this._element.style.overflowY = "hidden"), this._element.classList.add(On), this._queueCallback(() => {
        this._element.classList.remove(On), this._queueCallback(() => {
          this._element.style.overflowY = e2;
        }, this._dialog);
      }, this._dialog), this._element.focus());
    }
    _adjustDialog() {
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._scrollBar.getWidth(), i2 = e2 > 0;
      if (i2 && !t2) {
        const t3 = m() ? "paddingLeft" : "paddingRight";
        this._element.style[t3] = `${e2}px`;
      }
      if (!i2 && t2) {
        const t3 = m() ? "paddingRight" : "paddingLeft";
        this._element.style[t3] = `${e2}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }
    static jQueryInterface(t2, e2) {
      return this.each(function() {
        const i2 = Ln.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2](e2);
        }
      });
    }
  }
  P.on(document, En, '[data-bs-toggle="modal"]', function(t2) {
    const e2 = R.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), P.one(e2, _n, (t3) => {
      t3.defaultPrevented || P.one(e2, gn, () => {
        l(this) && this.focus();
      });
    });
    const i2 = R.findOne(".modal.show");
    i2 && Ln.getInstance(i2).hide(), Ln.getOrCreateInstance(e2).toggle(this);
  }), q(Ln), g(Ln);
  const Sn = ".bs.offcanvas", Dn = ".data-api", $n = `load${Sn}${Dn}`, In = "show", Nn = "showing", Pn = "hiding", jn = ".offcanvas.show", Mn = `show${Sn}`, Fn = `shown${Sn}`, Hn = `hide${Sn}`, Wn = `hidePrevented${Sn}`, Bn = `hidden${Sn}`, zn = `resize${Sn}`, Rn = `click${Sn}${Dn}`, qn = `keydown.dismiss${Sn}`, Vn = { backdrop: true, keyboard: true, scroll: false }, Kn = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
  class Qn extends B {
    constructor(t2, e2) {
      super(t2, e2), this._isShown = false, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
    }
    static get Default() {
      return Vn;
    }
    static get DefaultType() {
      return Kn;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || P.trigger(this._element, Mn, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._backdrop.show(), this._config.scroll || new un().hide(), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.classList.add(Nn), this._queueCallback(() => {
        this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(In), this._element.classList.remove(Nn), P.trigger(this._element, Fn, { relatedTarget: t2 });
      }, this._element, true));
    }
    hide() {
      this._isShown && (P.trigger(this._element, Hn).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = false, this._element.classList.add(Pn), this._backdrop.hide(), this._queueCallback(() => {
        this._element.classList.remove(In, Pn), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new un().reset(), P.trigger(this._element, Bn);
      }, this._element, true)));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t2 = Boolean(this._config.backdrop);
      return new Zi({ className: "offcanvas-backdrop", isVisible: t2, isAnimated: true, rootElement: this._element.parentNode, clickCallback: t2 ? () => {
        "static" !== this._config.backdrop ? this.hide() : P.trigger(this._element, Wn);
      } : null });
    }
    _initializeFocusTrap() {
      return new an({ trapElement: this._element });
    }
    _addEventListeners() {
      P.on(this._element, qn, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : P.trigger(this._element, Wn));
      });
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Qn.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  P.on(document, Rn, '[data-bs-toggle="offcanvas"]', function(t2) {
    const e2 = R.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && t2.preventDefault(), c(this)) return;
    P.one(e2, Bn, () => {
      l(this) && this.focus();
    });
    const i2 = R.findOne(jn);
    i2 && i2 !== e2 && Qn.getInstance(i2).hide(), Qn.getOrCreateInstance(e2).toggle(this);
  }), P.on(window, $n, () => {
    for (const t2 of R.find(jn)) Qn.getOrCreateInstance(t2).show();
  }), P.on(window, zn, () => {
    for (const t2 of R.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t2).position && Qn.getOrCreateInstance(t2).hide();
  }), q(Qn), g(Qn);
  const Xn = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }, Yn = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), Un = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Gn = (t2, e2) => {
    const i2 = t2.nodeName.toLowerCase();
    return e2.includes(i2) ? !Yn.has(i2) || Boolean(Un.test(t2.nodeValue)) : e2.filter((t3) => t3 instanceof RegExp).some((t3) => t3.test(i2));
  }, Jn = { allowList: Xn, content: {}, extraClass: "", html: false, sanitize: true, sanitizeFn: null, template: "<div></div>" }, Zn = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" }, ts = { entry: "(string|element|function|null)", selector: "(string|element)" };
  class es extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2);
    }
    static get Default() {
      return Jn;
    }
    static get DefaultType() {
      return Zn;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content).map((t2) => this._resolvePossibleFunction(t2)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t2) {
      return this._checkContent(t2), this._config.content = { ...this._config.content, ...t2 }, this;
    }
    toHtml() {
      const t2 = document.createElement("div");
      t2.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e3, i3] of Object.entries(this._config.content)) this._setContent(t2, i3, e3);
      const e2 = t2.children[0], i2 = this._resolvePossibleFunction(this._config.extraClass);
      return i2 && e2.classList.add(...i2.split(" ")), e2;
    }
    _typeCheckConfig(t2) {
      super._typeCheckConfig(t2), this._checkContent(t2.content);
    }
    _checkContent(t2) {
      for (const [e2, i2] of Object.entries(t2)) super._typeCheckConfig({ selector: e2, entry: i2 }, ts);
    }
    _setContent(t2, e2, i2) {
      const n2 = R.findOne(i2, t2);
      n2 && ((e2 = this._resolvePossibleFunction(e2)) ? r(e2) ? this._putElementInTemplate(a(e2), n2) : this._config.html ? n2.innerHTML = this._maybeSanitize(e2) : n2.textContent = e2 : n2.remove());
    }
    _maybeSanitize(t2) {
      return this._config.sanitize ? (function(t3, e2, i2) {
        if (!t3.length) return t3;
        if (i2 && "function" == typeof i2) return i2(t3);
        const n2 = new window.DOMParser().parseFromString(t3, "text/html"), s2 = [].concat(...n2.body.querySelectorAll("*"));
        for (const t4 of s2) {
          const i3 = t4.nodeName.toLowerCase();
          if (!Object.keys(e2).includes(i3)) {
            t4.remove();
            continue;
          }
          const n3 = [].concat(...t4.attributes), s3 = [].concat(e2["*"] || [], e2[i3] || []);
          for (const e3 of n3) Gn(e3, s3) || t4.removeAttribute(e3.nodeName);
        }
        return n2.body.innerHTML;
      })(t2, this._config.allowList, this._config.sanitizeFn) : t2;
    }
    _resolvePossibleFunction(t2) {
      return _(t2, [void 0, this]);
    }
    _putElementInTemplate(t2, e2) {
      if (this._config.html) return e2.innerHTML = "", void e2.append(t2);
      e2.textContent = t2.textContent;
    }
  }
  const is = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), ns = "fade", ss = "show", os = ".tooltip-inner", rs = ".modal", as = "hide.bs.modal", ls = "hover", cs = "focus", hs = "click", ds = { AUTO: "auto", TOP: "top", RIGHT: m() ? "left" : "right", BOTTOM: "bottom", LEFT: m() ? "right" : "left" }, us = { allowList: Xn, animation: true, boundary: "clippingParents", container: false, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: false, offset: [0, 6], placement: "top", popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" }, fs = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
  class ps extends B {
    constructor(t2, e2) {
      if (void 0 === Ai) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
      super(t2, e2), this._isEnabled = true, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
    }
    static get Default() {
      return us;
    }
    static get DefaultType() {
      return fs;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled && (this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout), P.off(this._element.closest(rs), as, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
    }
    show() {
      if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const t2 = P.trigger(this._element, this.constructor.eventName("show")), e2 = (h(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
      if (t2.defaultPrevented || !e2) return;
      this._disposePopper();
      const i2 = this._getTipElement();
      this._element.setAttribute("aria-describedby", i2.getAttribute("id"));
      const { container: n2 } = this._config;
      if (this._element.ownerDocument.documentElement.contains(this.tip) || (n2.append(i2), P.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i2), i2.classList.add(ss), "ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) P.on(t3, "mouseover", d);
      this._queueCallback(() => {
        P.trigger(this._element, this.constructor.eventName("shown")), false === this._isHovered && this._leave(), this._isHovered = false;
      }, this.tip, this._isAnimated());
    }
    hide() {
      if (this._isShown() && !P.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
        if (this._getTipElement().classList.remove(ss), "ontouchstart" in document.documentElement) for (const t2 of [].concat(...document.body.children)) P.off(t2, "mouseover", d);
        this._activeTrigger[hs] = false, this._activeTrigger[cs] = false, this._activeTrigger[ls] = false, this._isHovered = null, this._queueCallback(() => {
          this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), P.trigger(this._element, this.constructor.eventName("hidden")));
        }, this.tip, this._isAnimated());
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
    }
    _createTipElement(t2) {
      const e2 = this._getTemplateFactory(t2).toHtml();
      if (!e2) return null;
      e2.classList.remove(ns, ss), e2.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i2 = ((t3) => {
        do {
          t3 += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t3));
        return t3;
      })(this.constructor.NAME).toString();
      return e2.setAttribute("id", i2), this._isAnimated() && e2.classList.add(ns), e2;
    }
    setContent(t2) {
      this._newContent = t2, this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t2) {
      return this._templateFactory ? this._templateFactory.changeContent(t2) : this._templateFactory = new es({ ...this._config, content: t2, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory;
    }
    _getContentForTemplate() {
      return { [os]: this._getTitle() };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    _initializeOnDelegatedTarget(t2) {
      return this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(ns);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(ss);
    }
    _createPopper(t2) {
      const e2 = _(this._config.placement, [this, t2, this._element]), i2 = ds[e2.toUpperCase()];
      return wi(this._element, t2, this._getPopperConfig(i2));
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _resolvePossibleFunction(t2) {
      return _(t2, [this._element, this._element]);
    }
    _getPopperConfig(t2) {
      const e2 = { placement: t2, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: true, phase: "beforeMain", fn: (t3) => {
        this._getTipElement().setAttribute("data-popper-placement", t3.state.placement);
      } }] };
      return { ...e2, ..._(this._config.popperConfig, [void 0, e2]) };
    }
    _setListeners() {
      const t2 = this._config.trigger.split(" ");
      for (const e2 of t2) if ("click" === e2) P.on(this._element, this.constructor.eventName("click"), this._config.selector, (t3) => {
        const e3 = this._initializeOnDelegatedTarget(t3);
        e3._activeTrigger[hs] = !(e3._isShown() && e3._activeTrigger[hs]), e3.toggle();
      });
      else if ("manual" !== e2) {
        const t3 = e2 === ls ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i2 = e2 === ls ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
        P.on(this._element, t3, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusin" === t4.type ? cs : ls] = true, e3._enter();
        }), P.on(this._element, i2, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusout" === t4.type ? cs : ls] = e3._element.contains(t4.relatedTarget), e3._leave();
        });
      }
      this._hideModalHandler = () => {
        this._element && this.hide();
      }, P.on(this._element.closest(rs), as, this._hideModalHandler);
    }
    _fixTitle() {
      const t2 = this._element.getAttribute("title");
      t2 && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t2), this._element.setAttribute("data-bs-original-title", t2), this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered ? this._isHovered = true : (this._isHovered = true, this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() || (this._isHovered = false, this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
    }
    _setTimeout(t2, e2) {
      clearTimeout(this._timeout), this._timeout = setTimeout(t2, e2);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(t2) {
      const e2 = H.getDataAttributes(this._element);
      for (const t3 of Object.keys(e2)) is.has(t3) && delete e2[t3];
      return t2 = { ...e2, ..."object" == typeof t2 && t2 ? t2 : {} }, t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2.container = false === t2.container ? document.body : a(t2.container), "number" == typeof t2.delay && (t2.delay = { show: t2.delay, hide: t2.delay }), "number" == typeof t2.title && (t2.title = t2.title.toString()), "number" == typeof t2.content && (t2.content = t2.content.toString()), t2;
    }
    _getDelegateConfig() {
      const t2 = {};
      for (const [e2, i2] of Object.entries(this._config)) this.constructor.Default[e2] !== i2 && (t2[e2] = i2);
      return t2.selector = false, t2.trigger = "manual", t2;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = ps.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  g(ps);
  const ms = ".popover-header", gs = ".popover-body", _s = { ...ps.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }, bs = { ...ps.DefaultType, content: "(null|string|element|function)" };
  class vs extends ps {
    static get Default() {
      return _s;
    }
    static get DefaultType() {
      return bs;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return { [ms]: this._getTitle(), [gs]: this._getContent() };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = vs.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  g(vs);
  const ys = ".bs.scrollspy", ws = `activate${ys}`, As = `click${ys}`, Es = `load${ys}.data-api`, Ts = "active", Cs = "[href]", Os = ".nav-link", xs = `${Os}, .nav-item > ${Os}, .list-group-item`, ks = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }, Ls = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
  class Ss extends B {
    constructor(t2, e2) {
      super(t2, e2), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
    }
    static get Default() {
      return ks;
    }
    static get DefaultType() {
      return Ls;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
      for (const t2 of this._observableSections.values()) this._observer.observe(t2);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.target = a(t2.target) || document.body, t2.rootMargin = t2.offset ? `${t2.offset}px 0px -30%` : t2.rootMargin, "string" == typeof t2.threshold && (t2.threshold = t2.threshold.split(",").map((t3) => Number.parseFloat(t3))), t2;
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll && (P.off(this._config.target, As), P.on(this._config.target, As, Cs, (t2) => {
        const e2 = this._observableSections.get(t2.target.hash);
        if (e2) {
          t2.preventDefault();
          const i2 = this._rootElement || window, n2 = e2.offsetTop - this._element.offsetTop;
          if (i2.scrollTo) return void i2.scrollTo({ top: n2, behavior: "smooth" });
          i2.scrollTop = n2;
        }
      }));
    }
    _getNewObserver() {
      const t2 = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
      return new IntersectionObserver((t3) => this._observerCallback(t3), t2);
    }
    _observerCallback(t2) {
      const e2 = (t3) => this._targetLinks.get(`#${t3.target.id}`), i2 = (t3) => {
        this._previousScrollData.visibleEntryTop = t3.target.offsetTop, this._process(e2(t3));
      }, n2 = (this._rootElement || document.documentElement).scrollTop, s2 = n2 >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = n2;
      for (const o2 of t2) {
        if (!o2.isIntersecting) {
          this._activeTarget = null, this._clearActiveClass(e2(o2));
          continue;
        }
        const t3 = o2.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (s2 && t3) {
          if (i2(o2), !n2) return;
        } else s2 || t3 || i2(o2);
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
      const t2 = R.find(Cs, this._config.target);
      for (const e2 of t2) {
        if (!e2.hash || c(e2)) continue;
        const t3 = R.findOne(decodeURI(e2.hash), this._element);
        l(t3) && (this._targetLinks.set(decodeURI(e2.hash), e2), this._observableSections.set(e2.hash, t3));
      }
    }
    _process(t2) {
      this._activeTarget !== t2 && (this._clearActiveClass(this._config.target), this._activeTarget = t2, t2.classList.add(Ts), this._activateParents(t2), P.trigger(this._element, ws, { relatedTarget: t2 }));
    }
    _activateParents(t2) {
      if (t2.classList.contains("dropdown-item")) R.findOne(".dropdown-toggle", t2.closest(".dropdown")).classList.add(Ts);
      else for (const e2 of R.parents(t2, ".nav, .list-group")) for (const t3 of R.prev(e2, xs)) t3.classList.add(Ts);
    }
    _clearActiveClass(t2) {
      t2.classList.remove(Ts);
      const e2 = R.find(`${Cs}.${Ts}`, t2);
      for (const t3 of e2) t3.classList.remove(Ts);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Ss.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  P.on(window, Es, () => {
    for (const t2 of R.find('[data-bs-spy="scroll"]')) Ss.getOrCreateInstance(t2);
  }), g(Ss);
  const Ds = ".bs.tab", $s = `hide${Ds}`, Is = `hidden${Ds}`, Ns = `show${Ds}`, Ps = `shown${Ds}`, js = `click${Ds}`, Ms = `keydown${Ds}`, Fs = `load${Ds}`, Hs = "ArrowLeft", Ws = "ArrowRight", Bs = "ArrowUp", zs = "ArrowDown", Rs = "Home", qs = "End", Vs = "active", Ks = "fade", Qs = "show", Xs = ".dropdown-toggle", Ys = `:not(${Xs})`, Us = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Gs = `.nav-link${Ys}, .list-group-item${Ys}, [role="tab"]${Ys}, ${Us}`, Js = `.${Vs}[data-bs-toggle="tab"], .${Vs}[data-bs-toggle="pill"], .${Vs}[data-bs-toggle="list"]`;
  class Zs extends B {
    constructor(t2) {
      super(t2), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), P.on(this._element, Ms, (t3) => this._keydown(t3)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t2 = this._element;
      if (this._elemIsActive(t2)) return;
      const e2 = this._getActiveElem(), i2 = e2 ? P.trigger(e2, $s, { relatedTarget: t2 }) : null;
      P.trigger(t2, Ns, { relatedTarget: e2 }).defaultPrevented || i2 && i2.defaultPrevented || (this._deactivate(e2, t2), this._activate(t2, e2));
    }
    _activate(t2, e2) {
      t2 && (t2.classList.add(Vs), this._activate(R.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.removeAttribute("tabindex"), t2.setAttribute("aria-selected", true), this._toggleDropDown(t2, true), P.trigger(t2, Ps, { relatedTarget: e2 })) : t2.classList.add(Qs);
      }, t2, t2.classList.contains(Ks)));
    }
    _deactivate(t2, e2) {
      t2 && (t2.classList.remove(Vs), t2.blur(), this._deactivate(R.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.setAttribute("aria-selected", false), t2.setAttribute("tabindex", "-1"), this._toggleDropDown(t2, false), P.trigger(t2, Is, { relatedTarget: e2 })) : t2.classList.remove(Qs);
      }, t2, t2.classList.contains(Ks)));
    }
    _keydown(t2) {
      if (![Hs, Ws, Bs, zs, Rs, qs].includes(t2.key)) return;
      t2.stopPropagation(), t2.preventDefault();
      const e2 = this._getChildren().filter((t3) => !c(t3));
      let i2;
      if ([Rs, qs].includes(t2.key)) i2 = e2[t2.key === Rs ? 0 : e2.length - 1];
      else {
        const n2 = [Ws, zs].includes(t2.key);
        i2 = v(e2, t2.target, n2, true);
      }
      i2 && (i2.focus({ preventScroll: true }), Zs.getOrCreateInstance(i2).show());
    }
    _getChildren() {
      return R.find(Gs, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t2) => this._elemIsActive(t2)) || null;
    }
    _setInitialAttributes(t2, e2) {
      this._setAttributeIfNotExists(t2, "role", "tablist");
      for (const t3 of e2) this._setInitialAttributesOnChild(t3);
    }
    _setInitialAttributesOnChild(t2) {
      t2 = this._getInnerElement(t2);
      const e2 = this._elemIsActive(t2), i2 = this._getOuterElement(t2);
      t2.setAttribute("aria-selected", e2), i2 !== t2 && this._setAttributeIfNotExists(i2, "role", "presentation"), e2 || t2.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t2, "role", "tab"), this._setInitialAttributesOnTargetPanel(t2);
    }
    _setInitialAttributesOnTargetPanel(t2) {
      const e2 = R.getElementFromSelector(t2);
      e2 && (this._setAttributeIfNotExists(e2, "role", "tabpanel"), t2.id && this._setAttributeIfNotExists(e2, "aria-labelledby", `${t2.id}`));
    }
    _toggleDropDown(t2, e2) {
      const i2 = this._getOuterElement(t2);
      if (!i2.classList.contains("dropdown")) return;
      const n2 = (t3, n3) => {
        const s2 = R.findOne(t3, i2);
        s2 && s2.classList.toggle(n3, e2);
      };
      n2(Xs, Vs), n2(".dropdown-menu", Qs), i2.setAttribute("aria-expanded", e2);
    }
    _setAttributeIfNotExists(t2, e2, i2) {
      t2.hasAttribute(e2) || t2.setAttribute(e2, i2);
    }
    _elemIsActive(t2) {
      return t2.classList.contains(Vs);
    }
    _getInnerElement(t2) {
      return t2.matches(Gs) ? t2 : R.findOne(Gs, t2);
    }
    _getOuterElement(t2) {
      return t2.closest(".nav-item, .list-group-item") || t2;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Zs.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  P.on(document, js, Us, function(t2) {
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), c(this) || Zs.getOrCreateInstance(this).show();
  }), P.on(window, Fs, () => {
    for (const t2 of R.find(Js)) Zs.getOrCreateInstance(t2);
  }), g(Zs);
  const to = ".bs.toast", eo = `mouseover${to}`, io = `mouseout${to}`, no = `focusin${to}`, so = `focusout${to}`, oo = `hide${to}`, ro = `hidden${to}`, ao = `show${to}`, lo = `shown${to}`, co = "hide", ho = "show", uo = "showing", fo = { animation: "boolean", autohide: "boolean", delay: "number" }, po = { animation: true, autohide: true, delay: 5e3 };
  class mo extends B {
    constructor(t2, e2) {
      super(t2, e2), this._timeout = null, this._hasMouseInteraction = false, this._hasKeyboardInteraction = false, this._setListeners();
    }
    static get Default() {
      return po;
    }
    static get DefaultType() {
      return fo;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      P.trigger(this._element, ao).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(co), u(this._element), this._element.classList.add(ho, uo), this._queueCallback(() => {
        this._element.classList.remove(uo), P.trigger(this._element, lo), this._maybeScheduleHide();
      }, this._element, this._config.animation));
    }
    hide() {
      this.isShown() && (P.trigger(this._element, oo).defaultPrevented || (this._element.classList.add(uo), this._queueCallback(() => {
        this._element.classList.add(co), this._element.classList.remove(uo, ho), P.trigger(this._element, ro);
      }, this._element, this._config.animation)));
    }
    dispose() {
      this._clearTimeout(), this.isShown() && this._element.classList.remove(ho), super.dispose();
    }
    isShown() {
      return this._element.classList.contains(ho);
    }
    _maybeScheduleHide() {
      this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay)));
    }
    _onInteraction(t2, e2) {
      switch (t2.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e2;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e2;
      }
      if (e2) return void this._clearTimeout();
      const i2 = t2.relatedTarget;
      this._element === i2 || this._element.contains(i2) || this._maybeScheduleHide();
    }
    _setListeners() {
      P.on(this._element, eo, (t2) => this._onInteraction(t2, true)), P.on(this._element, io, (t2) => this._onInteraction(t2, false)), P.on(this._element, no, (t2) => this._onInteraction(t2, true)), P.on(this._element, so, (t2) => this._onInteraction(t2, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = mo.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  return q(mo), g(mo), { Alert: X, Button: U, Carousel: St, Collapse: qt, Dropdown: Qi, Modal: Ln, Offcanvas: Qn, Popover: vs, ScrollSpy: Ss, Tab: Zs, Toast: mo, Tooltip: ps };
});
//# sourceMappingURL=scripts.js.map
