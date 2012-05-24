/*
 * jQuery UI 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || (function (c) {
    var i = c.fn.remove,
        d = c.browser.mozilla && (parseFloat(c.browser.version) < 1.9);
    c.ui = {
        version: "1.7.2",
        plugin: {
            add: function (k, l, n) {
                var m = c.ui[k].prototype;
                for (var j in n) {
                    m.plugins[j] = m.plugins[j] || [];
                    m.plugins[j].push([l, n[j]])
                }
            },
            call: function (j, l, k) {
                var n = j.plugins[l];
                if (!n || !j.element[0].parentNode) {
                    return
                }
                for (var m = 0; m < n.length; m++) {
                    if (j.options[n[m][0]]) {
                        n[m][1].apply(j.element, k)
                    }
                }
            }
        },
        contains: function (k, j) {
            return document.compareDocumentPosition ? k.compareDocumentPosition(j) & 16 : k !== j && k.contains(j)
        },
        hasScroll: function (m, k) {
            if (c(m).css("overflow") == "hidden") {
                return false
            }
            var j = (k && k == "left") ? "scrollLeft" : "scrollTop",
                l = false;
            if (m[j] > 0) {
                return true
            }
            m[j] = 1;
            l = (m[j] > 0);
            m[j] = 0;
            return l
        },
        isOverAxis: function (k, j, l) {
            return (k > j) && (k < (j + l))
        },
        isOver: function (o, k, n, m, j, l) {
            return c.ui.isOverAxis(o, n, j) && c.ui.isOverAxis(k, m, l)
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (d) {
        var f = c.attr,
            e = c.fn.removeAttr,
            h = "http://www.w3.org/2005/07/aaa",
            a = /^aria-/,
            b = /^wairole:/;
        c.attr = function (k, j, l) {
            var m = l !== undefined;
            return (j == "role" ? (m ? f.call(this, k, j, "wairole:" + l) : (f.apply(this, arguments) || "").replace(b, "")) : (a.test(j) ? (m ? k.setAttributeNS(h, j.replace(a, "aaa:"), l) : f.call(this, k, j.replace(a, "aaa:"))) : f.apply(this, arguments)))
        };
        c.fn.removeAttr = function (j) {
            return (a.test(j) ? this.each(function () {
                this.removeAttributeNS(h, j.replace(a, ""))
            }) : e.call(this, j))
        }
    }
    c.fn.extend({
        remove: function () {
            c("*", this).add(this).each(function () {
                c(this).triggerHandler("remove")
            });
            return i.apply(this, arguments)
        },
        enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
        },
        disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
                return false
            })
        },
        scrollParent: function () {
            var j;
            if ((c.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                j = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(c.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            } else {
                j = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !j.length ? c(document) : j
        }
    });
    c.extend(c.expr[":"], {
        data: function (l, k, j) {
            return !!c.data(l, j[3])
        },
        focusable: function (k) {
            var l = k.nodeName.toLowerCase(),
                j = c.attr(k, "tabindex");
            return (/input|select|textarea|button|object/.test(l) ? !k.disabled : "a" == l || "area" == l ? k.href || !isNaN(j) : !isNaN(j)) && !c(k)["area" == l ? "parents" : "closest"](":hidden").length
        },
        tabbable: function (k) {
            var j = c.attr(k, "tabindex");
            return (isNaN(j) || j >= 0) && c(k).is(":focusable")
        }
    });

    function g(m, n, o, l) {
        function k(q) {
            var p = c[m][n][q] || [];
            return (typeof p == "string" ? p.split(/,?\s+/) : p)
        }
        var j = k("getter");
        if (l.length == 1 && typeof l[0] == "string") {
            j = j.concat(k("getterSetter"))
        }
        return (c.inArray(o, j) != -1)
    }
    c.widget = function (k, j) {
        var l = k.split(".")[0];
        k = k.split(".")[1];
        c.fn[k] = function (p) {
            var n = (typeof p == "string"),
                o = Array.prototype.slice.call(arguments, 1);
            if (n && p.substring(0, 1) == "_") {
                return this
            }
            if (n && g(l, k, p, o)) {
                var m = c.data(this[0], k);
                return (m ? m[p].apply(m, o) : undefined)
            }
            return this.each(function () {
                var q = c.data(this, k);
                (!q && !n && c.data(this, k, new c[l][k](this, p))._init());
                (q && n && c.isFunction(q[p]) && q[p].apply(q, o))
            })
        };
        c[l] = c[l] || {};
        c[l][k] = function (o, n) {
            var m = this;
            this.namespace = l;
            this.widgetName = k;
            this.widgetEventPrefix = c[l][k].eventPrefix || k;
            this.widgetBaseClass = l + "-" + k;
            this.options = c.extend({}, c.widget.defaults, c[l][k].defaults, c.metadata && c.metadata.get(o)[k], n);
            this.element = c(o).bind("setData." + k, function (q, p, r) {
                if (q.target == o) {
                    return m._setData(p, r)
                }
            }).bind("getData." + k, function (q, p) {
                if (q.target == o) {
                    return m._getData(p)
                }
            }).bind("remove", function () {
                return m.destroy()
            })
        };
        c[l][k].prototype = c.extend({}, c.widget.prototype, j);
        c[l][k].getterSetter = "option"
    };
    c.widget.prototype = {
        _init: function () {},
        destroy: function () {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled")
        },
        option: function (l, m) {
            var k = l,
                j = this;
            if (typeof l == "string") {
                if (m === undefined) {
                    return this._getData(l)
                }
                k = {};
                k[l] = m
            }
            c.each(k, function (n, o) {
                j._setData(n, o)
            })
        },
        _getData: function (j) {
            return this.options[j]
        },
        _setData: function (j, k) {
            this.options[j] = k;
            if (j == "disabled") {
                this.element[k ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", k)
            }
        },
        enable: function () {
            this._setData("disabled", false)
        },
        disable: function () {
            this._setData("disabled", true)
        },
        _trigger: function (l, m, n) {
            var p = this.options[l],
                j = (l == this.widgetEventPrefix ? l : this.widgetEventPrefix + l);
            m = c.Event(m);
            m.type = j;
            if (m.originalEvent) {
                for (var k = c.event.props.length, o; k;) {
                    o = c.event.props[--k];
                    m[o] = m.originalEvent[o]
                }
            }
            this.element.trigger(m, n);
            return !(c.isFunction(p) && p.call(this.element[0], m, n) === false || m.isDefaultPrevented())
        }
    };
    c.widget.defaults = {
        disabled: false
    };
    c.ui.mouse = {
        _mouseInit: function () {
            var j = this;
            this.element.bind("mousedown." + this.widgetName, function (k) {
                return j._mouseDown(k)
            }).bind("click." + this.widgetName, function (k) {
                if (j._preventClickEvent) {
                    j._preventClickEvent = false;
                    k.stopImmediatePropagation();
                    return false
                }
            });
            if (c.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on")
            }
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            (c.browser.msie && this.element.attr("unselectable", this._mouseUnselectable))
        },
        _mouseDown: function (l) {
            l.originalEvent = l.originalEvent || {};
            if (l.originalEvent.mouseHandled) {
                return
            }(this._mouseStarted && this._mouseUp(l));
            this._mouseDownEvent = l;
            var k = this,
                m = (l.which == 1),
                j = (typeof this.options.cancel == "string" ? c(l.target).parents().add(l.target).filter(this.options.cancel).length : false);
            if (!m || j || !this._mouseCapture(l)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    k.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(l) && this._mouseDelayMet(l)) {
                this._mouseStarted = (this._mouseStart(l) !== false);
                if (!this._mouseStarted) {
                    l.preventDefault();
                    return true
                }
            }
            this._mouseMoveDelegate = function (n) {
                return k._mouseMove(n)
            };
            this._mouseUpDelegate = function (n) {
                return k._mouseUp(n)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (c.browser.safari || l.preventDefault());
            l.originalEvent.mouseHandled = true;
            return true
        },
        _mouseMove: function (j) {
            if (c.browser.msie && !j.button) {
                return this._mouseUp(j)
            }
            if (this._mouseStarted) {
                this._mouseDrag(j);
                return j.preventDefault()
            }
            if (this._mouseDistanceMet(j) && this._mouseDelayMet(j)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, j) !== false);
                (this._mouseStarted ? this._mouseDrag(j) : this._mouseUp(j))
            }
            return !this._mouseStarted
        },
        _mouseUp: function (j) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (j.target == this._mouseDownEvent.target);
                this._mouseStop(j)
            }
            return false
        },
        _mouseDistanceMet: function (j) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - j.pageX), Math.abs(this._mouseDownEvent.pageY - j.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function (j) {
            return this.mouseDelayMet
        },
        _mouseStart: function (j) {},
        _mouseDrag: function (j) {},
        _mouseStop: function (j) {},
        _mouseCapture: function (j) {
            return true
        }
    };
    c.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    }
})(jQuery);;
/*
 * jQuery UI Draggable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */ (function (a) {
    a.widget("ui.draggable", a.extend({}, a.ui.mouse, {
        _init: function () {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }(this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        },
        destroy: function () {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function (b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(b);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function (b) {
            var c = this.options;
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            if (c.cursorAt) {
                this._adjustOffsetFromHelper(c.cursorAt)
            }
            if (c.containment) {
                this._setContainment()
            }
            this._trigger("start", b);
            this._cacheHelperProportions();

            if (a.ui.ddmanager && !c.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, b)
            }
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(b, true);
            return true
        },
        _mouseDrag: function (b, d) {
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                var c = this._uiHash();
                this._trigger("drag", b, c);
                this.position = c.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, b)
            }
            return false
        },
        _mouseStop: function (c) {
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                d = a.ui.ddmanager.drop(this, c)
            }
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
                var b = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    b._trigger("stop", c);
                    b._clear()
                })
            } else {
                this._trigger("stop", c);
                this._clear()
            }
            return false
        },
        _getHandle: function (b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == b.target) {
                    c = true
                }
            });
            return c
        },
        _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
            if (!b.parents("body").length) {
                b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
            }
            if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
                b.css("position", "absolute")
            }
            return b
        },
        _adjustOffsetFromHelper: function (b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
                var c = a(e.containment)[0];
                if (!c) {
                    return
                }
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            } else {
                if (e.containment.constructor == Array) {
                    this.containment = e.containment
                }
            }
        },
        _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options,
                b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function (e) {
            var h = this.options,
                b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (b, c, d) {
            d = d || this._uiHash();
            a.ui.plugin.call(this, b, [c, d]);
            if (b == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return a.widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function (b) {
            return {
                helper: this.helper,
                position: this.position,
                absolutePosition: this.positionAbs,
                offset: this.positionAbs
            }
        }
    }));
    a.extend(a.ui.draggable, {
        version: "1.7.2",
        eventPrefix: "drag",
        defaults: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delay: 0,
            distance: 1,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        }
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (c, e) {
            var d = a(this).data("draggable"),
                f = d.options,
                b = a.extend({}, e, {
                    item: d.element
                });
            d.sortables = [];
            a(f.connectToSortable).each(function () {
                var g = a.data(this, "sortable");
                if (g && !g.options.disabled) {
                    d.sortables.push({
                        instance: g,
                        shouldRevert: g.options.revert
                    });
                    g._refreshItems();
                    g._trigger("activate", c, b)
                }
            })
        },
        stop: function (c, e) {
            var d = a(this).data("draggable"),
                b = a.extend({}, e, {
                    item: d.element
                });
            a.each(d.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    d.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    if (d.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, b)
                }
            })
        },
        drag: function (c, f) {
            var e = a(this).data("draggable"),
                b = this;
            var d = function (i) {
                    var n = this.offset.click.top,
                        m = this.offset.click.left;
                    var g = this.positionAbs.top,
                        k = this.positionAbs.left;
                    var j = i.height,
                        l = i.width;
                    var p = i.top,
                        h = i.left;
                    return a.ui.isOver(g + n, k + m, p, h, j, l)
                };
            a.each(e.sortables, function (g) {
                this.instance.positionAbs = e.positionAbs;
                this.instance.helperProportions = e.helperProportions;
                this.instance.offset.click = e.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return f.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        e.currentItem = e.element;
                        this.instance.fromOutside = e
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(c)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(c, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        e._trigger("fromSortable", c);
                        e.dropped = false
                    }
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function (c, d) {
            var b = a("body"),
                e = a(this).data("draggable").options;
            if (b.css("cursor")) {
                e._cursor = b.css("cursor")
            }
            b.css("cursor", e.cursor)
        },
        stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._cursor) {
                a("body").css("cursor", d._cursor)
            }
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function (b, c) {
            var d = a(this).data("draggable").options;
            a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function () {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(a(this).offset()).appendTo("body")
            })
        },
        stop: function (b, c) {
            a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function (c, d) {
            var b = a(d.helper),
                e = a(this).data("draggable").options;
            if (b.css("opacity")) {
                e._opacity = b.css("opacity")
            }
            b.css("opacity", e.opacity)
        },
        stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._opacity) {
                a(c.helper).css("opacity", d._opacity)
            }
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function (c, d) {
            var b = a(this).data("draggable");
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                b.overflowOffset = b.scrollParent.offset()
            }
        },
        drag: function (d, e) {
            var c = a(this).data("draggable"),
                f = c.options,
                b = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!f.axis || f.axis != "x") {
                    if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                    } else {
                        if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                            c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                    } else {
                        if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                            c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                        }
                    }
                }
            } else {
                if (!f.axis || f.axis != "x") {
                    if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                    } else {
                        if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                        }
                    }
                }
                if (!f.axis || f.axis != "y") {
                    if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                    } else {
                        if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                        }
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(c, d)
            }
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function (c, d) {
            var b = a(this).data("draggable"),
                e = b.options;
            b.snapElements = [];
            a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function () {
                var g = a(this);
                var f = g.offset();
                if (this != b.element[0]) {
                    b.snapElements.push({
                        item: this,
                        width: g.outerWidth(),
                        height: g.outerHeight(),
                        top: f.top,
                        left: f.left
                    })
                }
            })
        },
        drag: function (u, p) {
            var g = a(this).data("draggable"),
                q = g.options;
            var y = q.snapTolerance;
            var x = p.offset.left,
                w = x + g.helperProportions.width,
                f = p.offset.top,
                e = f + g.helperProportions.height;
            for (var v = g.snapElements.length - 1; v >= 0; v--) {
                var s = g.snapElements[v].left,
                    n = s + g.snapElements[v].width,
                    m = g.snapElements[v].top,
                    A = m + g.snapElements[v].height;
                if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                    if (g.snapElements[v].snapping) {
                        (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {
                            snapItem: g.snapElements[v].item
                        })))
                    }
                    g.snapElements[v].snapping = false;
                    continue
                }
                if (q.snapMode != "inner") {
                    var c = Math.abs(m - e) <= y;
                    var z = Math.abs(A - f) <= y;
                    var j = Math.abs(s - w) <= y;
                    var k = Math.abs(n - x) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - g.margins.left
                    }
                }
                var h = (c || z || j || k);
                if (q.snapMode != "outer") {
                    var c = Math.abs(m - f) <= y;
                    var z = Math.abs(A - e) <= y;
                    var j = Math.abs(s - x) <= y;
                    var k = Math.abs(n - w) <= y;
                    if (c) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (z) {
                        p.position.top = g._convertPositionTo("relative", {
                            top: A - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top
                    }
                    if (j) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: s
                        }).left - g.margins.left
                    }
                    if (k) {
                        p.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: n - g.helperProportions.width
                        }).left - g.margins.left
                    }
                }
                if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                    (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {
                        snapItem: g.snapElements[v].item
                    })))
                }
                g.snapElements[v].snapping = (c || z || j || k || h)
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function (b, c) {
            var e = a(this).data("draggable").options;
            var d = a.makeArray(a(e.stack.group)).sort(function (g, f) {
                return (parseInt(a(g).css("zIndex"), 10) || e.stack.min) - (parseInt(a(f).css("zIndex"), 10) || e.stack.min)
            });
            a(d).each(function (f) {
                this.style.zIndex = e.stack.min + f
            });
            this[0].style.zIndex = e.stack.min + d.length
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function (c, d) {
            var b = a(d.helper),
                e = a(this).data("draggable").options;
            if (b.css("zIndex")) {
                e._zIndex = b.css("zIndex")
            }
            b.css("zIndex", e.zIndex)
        },
        stop: function (b, c) {
            var d = a(this).data("draggable").options;
            if (d._zIndex) {
                a(c.helper).css("zIndex", d._zIndex)
            }
        }
    })
})(jQuery);;
/*
 * jQuery UI Sortable 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	ui.core.js
 */ (function (a) {
    a.widget("ui.sortable", a.extend({}, a.ui.mouse, {
        _init: function () {
            var b = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var b = this.items.length - 1; b >= 0; b--) {
                this.items[b].item.removeData("sortable-item")
            }
        },
        _mouseCapture: function (e, f) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(e);
            var d = null,
                c = this,
                b = a(e.target).parents().each(function () {
                    if (a.data(this, "sortable-item") == c) {
                        d = a(this);
                        return false
                    }
                });
            if (a.data(e.target, "sortable-item") == c) {
                d = a(e.target)
            }
            if (!d) {
                return false
            }
            if (this.options.handle && !f) {
                var g = false;
                a(this.options.handle, d).find("*").andSelf().each(function () {
                    if (this == e.target) {
                        g = true
                    }
                });
                if (!g) {
                    return false
                }
            }
            this.currentItem = d;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (e, f, b) {
            var g = this.options,
                c = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(e);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(e);
            this.originalPageX = e.pageX;
            this.originalPageY = e.pageY;
            if (g.cursorAt) {
                this._adjustOffsetFromHelper(g.cursorAt)
            }
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (g.containment) {
                this._setContainment()
            }
            if (g.cursor) {
                if (a("body").css("cursor")) {
                    this._storedCursor = a("body").css("cursor")
                }
                a("body").css("cursor", g.cursor)
            }
            if (g.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", g.opacity)
            }
            if (g.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", g.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", e, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!b) {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("activate", e, c._uiHash(this))
                }
            }
            if (a.ui.ddmanager) {
                a.ui.ddmanager.current = this
            }
            if (a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, e)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(e);
            return true
        },
        _mouseDrag: function (f) {
            this.position = this._generatePosition(f);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var g = this.options,
                    b = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                    } else {
                        if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                    } else {
                        if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                        }
                    }
                } else {
                    if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                    } else {
                        if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                            b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                        }
                    }
                    if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                    } else {
                        if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                            b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                        }
                    }
                }
                if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                    a.ui.ddmanager.prepareOffsets(this, f)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d],
                    c = e.item[0],
                    h = this._intersectsWithPointer(e);
                if (!h) {
                    continue
                }
                if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                    this.direction = h == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                        this._rearrange(f, e)
                    } else {
                        break
                    }
                    this._trigger("change", f, this._uiHash());
                    break
                }
            }
            this._contactContainers(f);
            if (a.ui.ddmanager) {
                a.ui.ddmanager.drag(this, f)
            }
            this._trigger("sort", f, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, d) {
            if (!c) {
                return
            }
            if (a.ui.ddmanager && !this.options.dropBehaviour) {
                a.ui.ddmanager.drop(this, c)
            }
            if (this.options.revert) {
                var b = this;
                var e = b.placeholder.offset();
                b.reverting = true;
                a(this.helper).animate({
                    left: e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function () {
                    b._clear(c)
                })
            } else {
                this._clear(c, d)
            }
            return false
        },
        cancel: function () {
            var b = this;
            if (this.dragging) {
                this._mouseUp();
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, b._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                this.helper.remove()
            }
            a.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            if (this.domPosition.prev) {
                a(this.domPosition.prev).after(this.currentItem)
            } else {
                a(this.domPosition.parent).prepend(this.currentItem)
            }
            return true
        },
        serialize: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            a(b).each(function () {
                var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
                if (e) {
                    c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
                }
            });
            return c.join("&")
        },
        toArray: function (d) {
            var b = this._getItemsAsjQuery(d && d.connected);
            var c = [];
            d = d || {};
            b.each(function () {
                c.push(a(d.item || this).attr(d.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function (m) {
            var e = this.positionAbs.left,
                d = e + this.helperProportions.width,
                k = this.positionAbs.top,
                j = k + this.helperProportions.height;
            var f = m.left,
                c = f + m.width,
                n = m.top,
                i = n + m.height;
            var o = this.offset.click.top,
                h = this.offset.click.left;
            var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
                return g
            } else {
                return (f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
            }
        },
        _intersectsWithPointer: function (d) {
            var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height),
                c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width),
                g = e && c,
                b = this._getDragVerticalDirection(),
                f = this._getDragHorizontalDirection();
            if (!g) {
                return false
            }
            return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
        },
        _intersectsWithSides: function (e) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height),
                d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width),
                b = this._getDragVerticalDirection(),
                f = this._getDragHorizontalDirection();
            if (this.floating && f) {
                return ((f == "right" && d) || (f == "left" && !d))
            } else {
                return b && ((b == "down" && c) || (b == "up" && !c))
            }
        },
        _getDragVerticalDirection: function () {
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return b != 0 && (b > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return b != 0 && (b > 0 ? "right" : "left")
        },
        refresh: function (b) {
            this._refreshItems(b);
            this.refreshPositions()
        },
        _connectWith: function () {
            var b = this.options;
            return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
        },
        _getItemsAsjQuery: function (b) {
            var l = this;
            var g = [];
            var e = [];
            var h = this._connectWith();
            if (h && b) {
                for (var d = h.length - 1; d >= 0; d--) {
                    var k = a(h[d]);
                    for (var c = k.length - 1; c >= 0; c--) {
                        var f = a.data(k[c], "sortable");
                        if (f && f != this && !f.options.disabled) {
                            e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper"), f])
                        }
                    }
                }
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper"), this]);
            for (var d = e.length - 1; d >= 0; d--) {
                e[d][0].each(function () {
                    g.push(this)
                })
            }
            return a(g)
        },
        _removeCurrentsFromItems: function () {
            var d = this.currentItem.find(":data(sortable-item)");
            for (var c = 0; c < this.items.length; c++) {
                for (var b = 0; b < d.length; b++) {
                    if (d[b] == this.items[c].item[0]) {
                        this.items.splice(c, 1)
                    }
                }
            }
        },
        _refreshItems: function (b) {
            this.items = [];
            this.containers = [this];
            var h = this.items;
            var p = this;
            var f = [
                [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                    item: this.currentItem
                }) : a(this.options.items, this.element), this]
            ];
            var l = this._connectWith();
            if (l) {
                for (var e = l.length - 1; e >= 0; e--) {
                    var m = a(l[e]);
                    for (var d = m.length - 1; d >= 0; d--) {
                        var g = a.data(m[d], "sortable");
                        if (g && g != this && !g.options.disabled) {
                            f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {
                                item: this.currentItem
                            }) : a(g.options.items, g.element), g]);
                            this.containers.push(g)
                        }
                    }
                }
            }
            for (var e = f.length - 1; e >= 0; e--) {
                var k = f[e][1];
                var c = f[e][0];
                for (var d = 0, n = c.length; d < n; d++) {
                    var o = a(c[d]);
                    o.data("sortable-item", k);
                    h.push({
                        item: o,
                        instance: k,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (b) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d];
                if (e.instance != this.currentContainer && this.currentContainer && e.item[0] != this.currentItem[0]) {
                    continue
                }
                var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!b) {
                    e.width = c.outerWidth();
                    e.height = c.outerHeight()
                }
                var f = c.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    var f = this.containers[d].element.offset();
                    this.containers[d].containerCache.left = f.left;
                    this.containers[d].containerCache.top = f.top;
                    this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                    this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
                }
            }
        },
        _createPlaceholder: function (d) {
            var b = d || this,
                e = b.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var c = e.placeholder;
                e.placeholder = {
                    element: function () {
                        var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!c) {
                            f.style.visibility = "hidden"
                        }
                        return f
                    },
                    update: function (f, g) {
                        if (c && !e.forcePlaceholderSize) {
                            return
                        }
                        if (!g.height()) {
                            g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!g.width()) {
                            g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            e.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function (d) {
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (this._intersectsWith(this.containers[c].containerCache)) {
                    if (!this.containers[c].containerCache.over) {
                        if (this.currentContainer != this.containers[c]) {
                            var h = 10000;
                            var g = null;
                            var e = this.positionAbs[this.containers[c].floating ? "left" : "top"];
                            for (var b = this.items.length - 1; b >= 0; b--) {
                                if (!a.ui.contains(this.containers[c].element[0], this.items[b].item[0])) {
                                    continue
                                }
                                var f = this.items[b][this.containers[c].floating ? "left" : "top"];
                                if (Math.abs(f - e) < h) {
                                    h = Math.abs(f - e);
                                    g = this.items[b]
                                }
                            }
                            if (!g && !this.options.dropOnEmpty) {
                                continue
                            }
                            this.currentContainer = this.containers[c];
                            g ? this._rearrange(d, g, null, true) : this._rearrange(d, null, this.containers[c].element, true);
                            this._trigger("change", d, this._uiHash());
                            this.containers[c]._trigger("change", d, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder)
                        }
                        this.containers[c]._trigger("over", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 1
                    }
                } else {
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", d, this._uiHash(this));
                        this.containers[c].containerCache.over = 0
                    }
                }
            }
        },
        _createHelper: function (c) {
            var d = this.options;
            var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!b.parents("body").length) {
                a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
            }
            if (b[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (b[0].style.width == "" || d.forceHelperSize) {
                b.width(this.currentItem.width())
            }
            if (b[0].style.height == "" || d.forceHelperSize) {
                b.height(this.currentItem.height())
            }
            return b
        },
        _adjustOffsetFromHelper: function (b) {
            if (b.left != undefined) {
                this.offset.click.left = b.left + this.margins.left
            }
            if (b.right != undefined) {
                this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
            }
            if (b.top != undefined) {
                this.offset.click.top = b.top + this.margins.top
            }
            if (b.bottom != undefined) {
                this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                b.left += this.scrollParent.scrollLeft();
                b.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
                b = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var e = this.options;
            if (e.containment == "parent") {
                e.containment = this.helper[0].parentNode
            }
            if (e.containment == "document" || e.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(e.containment)) {
                var c = a(e.containment)[0];
                var d = a(e.containment).offset();
                var b = (a(c).css("overflow") != "hidden");
                this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (f, h) {
            if (!h) {
                h = this.position
            }
            var c = f == "absolute" ? 1 : -1;
            var e = this.options,
                b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                g = (/(html|body)/i).test(b[0].tagName);
            return {
                top: (h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),
                left: (h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))
            }
        },
        _generatePosition: function (e) {
            var h = this.options,
                b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = (/(html|body)/i).test(b[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var d = e.pageX;
            var c = e.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (e.pageX - this.offset.click.left < this.containment[0]) {
                        d = this.containment[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < this.containment[1]) {
                        c = this.containment[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > this.containment[2]) {
                        d = this.containment[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > this.containment[3]) {
                        c = this.containment[3] + this.offset.click.top
                    }
                }
                if (h.grid) {
                    var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                    c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                    var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                    d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
                }
            }
            return {
                top: (c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),
                left: (d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))
            }
        },
        _rearrange: function (g, f, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var d = this,
                b = this.counter;
            window.setTimeout(function () {
                if (b == d.counter) {
                    d.refreshPositions(!e)
                }
            }, 0)
        },
        _clear: function (d, e) {
            this.reverting = false;
            var f = [],
                b = this;
            if (!this._noFinalSort && this.currentItem[0].parentNode) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var c in this._storedCSS) {
                    if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                        this._storedCSS[c] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !e) {
                f.push(function (g) {
                    this._trigger("receive", g, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
                f.push(function (g) {
                    this._trigger("update", g, this._uiHash())
                })
            }
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                if (!e) {
                    f.push(function (g) {
                        this._trigger("remove", g, this._uiHash())
                    })
                }
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("receive", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]));
                        f.push((function (g) {
                            return function (h) {
                                g._trigger("update", h, this._uiHash(this))
                            }
                        }).call(this, this.containers[c]))
                    }
                }
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (!e) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("deactivate", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
                if (this.containers[c].containerCache.over) {
                    f.push((function (g) {
                        return function (h) {
                            g._trigger("out", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    this.containers[c].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                a("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (var c = 0; c < f.length; c++) {
                        f[c].call(this, d)
                    }
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!e) {
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            if (a.widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function (c) {
            var b = c || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || a([]),
                position: b.position,
                absolutePosition: b.positionAbs,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: c ? c.element : null
            }
        }
    }));
    a.extend(a.ui.sortable, {
        getter: "serialize toArray",
        version: "1.7.2",
        eventPrefix: "sort",
        defaults: {
            appendTo: "parent",
            axis: false,
            cancel: ":input,option",
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            delay: 0,
            distance: 1,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,

            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        }
    })
})(jQuery);;
/*
 * jQuery UI Accordion 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	ui.core.js
 */ (function (a) {
    a.widget("ui.accordion", {
        _init: function () {
            var d = this.options,
                b = this;
            this.running = 0;
            if (d.collapsible == a.ui.accordion.defaults.collapsible && d.alwaysOpen != a.ui.accordion.defaults.alwaysOpen) {
                d.collapsible = !d.alwaysOpen
            }
            if (d.navigation) {
                var c = this.element.find("a").filter(d.navigationFilter);
                if (c.length) {
                    if (c.filter(d.header).length) {
                        this.active = c
                    } else {
                        this.active = c.parent().parent().prev();
                        c.addClass("ui-accordion-content-active")
                    }
                }
            }
            this.element.addClass("ui-accordion ui-widget ui-helper-reset");
            if (this.element[0].nodeName == "UL") {
                this.element.children("li").addClass("ui-accordion-li-fix")
            }
            this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                a(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                a(this).removeClass("ui-state-focus")
            });
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            this.active.next().addClass("ui-accordion-content-active");
            a("<span/>").addClass("ui-icon " + d.icons.header).prependTo(this.headers);
            this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
            if (a.browser.msie) {
                this.element.find("a").css("zoom", "1")
            }
            this.resize();
            this.element.attr("role", "tablist");
            this.headers.attr("role", "tab").bind("keydown", function (e) {
                return b._keydown(e)
            }).next().attr("role", "tabpanel");
            this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
            if (!this.active.length) {
                this.headers.eq(0).attr("tabIndex", "0")
            } else {
                this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
            }
            if (!a.browser.safari) {
                this.headers.find("a").attr("tabIndex", "-1")
            }
            if (d.event) {
                this.headers.bind((d.event) + ".accordion", function (e) {
                    return b._clickHandler.call(b, e, this)
                })
            }
        },
        destroy: function () {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
            this.headers.find("a").removeAttr("tabindex");
            this.headers.children(".ui-icon").remove();
            var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
            if (c.autoHeight || c.fillHeight) {
                b.css("height", "")
            }
        },
        _setData: function (b, c) {
            if (b == "alwaysOpen") {
                b = "collapsible";
                c = !c
            }
            a.widget.prototype._setData.apply(this, arguments)
        },
        _keydown: function (e) {
            var g = this.options,
                f = a.ui.keyCode;
            if (g.disabled || e.altKey || e.ctrlKey) {
                return
            }
            var d = this.headers.length;
            var b = this.headers.index(e.target);
            var c = false;
            switch (e.keyCode) {
            case f.RIGHT:
            case f.DOWN:
                c = this.headers[(b + 1) % d];
                break;
            case f.LEFT:
            case f.UP:
                c = this.headers[(b - 1 + d) % d];
                break;
            case f.SPACE:
            case f.ENTER:
                return this._clickHandler({
                    target: e.target
                }, e.target)
            }
            if (c) {
                a(e.target).attr("tabIndex", "-1");
                a(c).attr("tabIndex", "0");
                c.focus();
                return false
            }
            return true
        },
        resize: function () {
            var e = this.options,
                d;
            if (e.fillSpace) {
                if (a.browser.msie) {
                    var b = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                d = this.element.parent().height();
                if (a.browser.msie) {
                    this.element.parent().css("overflow", b)
                }
                this.headers.each(function () {
                    d -= a(this).outerHeight()
                });
                var c = 0;
                this.headers.next().each(function () {
                    c = Math.max(c, a(this).innerHeight() - a(this).height())
                }).height(Math.max(0, d - c)).css("overflow", "auto")
            } else {
                if (e.autoHeight) {
                    d = 0;
                    this.headers.next().each(function () {
                        d = Math.max(d, a(this).outerHeight())
                    }).height(d)
                }
            }
        },
        activate: function (b) {
            var c = this._findActive(b)[0];
            this._clickHandler({
                target: c
            }, c)
        },
        _findActive: function (b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function (b, f) {
            var d = this.options;
            if (d.disabled) {
                return false
            }
            if (!b.target && d.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next(),
                    e = {
                        options: d,
                        newHeader: a([]),
                        oldHeader: d.active,
                        newContent: a([]),
                        oldContent: h
                    },
                    c = (this.active = a([]));
                this._toggle(c, h, e);
                return false
            }
            var g = a(b.currentTarget || f);
            var i = g[0] == this.active[0];
            if (this.running || (!d.collapsible && i)) {
                return false
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
            this.active.next().addClass("ui-accordion-content-active");
            if (!i) {
                g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
                g.next().addClass("ui-accordion-content-active")
            }
            var c = g.next(),
                h = this.active.next(),
                e = {
                    options: d,
                    newHeader: i && d.collapsible ? a([]) : g,
                    oldHeader: this.active,
                    newContent: i && d.collapsible ? a([]) : c.find("> *"),
                    oldContent: h.find("> *")
                },
                j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
            this.active = i ? a([]) : g;
            this._toggle(c, h, e, i, j);
            return false
        },
        _toggle: function (b, i, g, j, k) {
            var d = this.options,
                m = this;
            this.toShow = b;
            this.toHide = i;
            this.data = g;
            var c = function () {
                    if (!m) {
                        return
                    }
                    return m._completed.apply(m, arguments)
                };
            this._trigger("changestart", null, this.data);
            this.running = i.size() === 0 ? b.size() : i.size();
            if (d.animated) {
                var f = {};
                if (d.collapsible && j) {
                    f = {
                        toShow: a([]),
                        toHide: i,
                        complete: c,
                        down: k,
                        autoHeight: d.autoHeight || d.fillSpace
                    }
                } else {
                    f = {
                        toShow: b,
                        toHide: i,
                        complete: c,
                        down: k,
                        autoHeight: d.autoHeight || d.fillSpace
                    }
                }
                if (!d.proxied) {
                    d.proxied = d.animated
                }
                if (!d.proxiedDuration) {
                    d.proxiedDuration = d.duration
                }
                d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
                d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
                var l = a.ui.accordion.animations,
                    e = d.duration,
                    h = d.animated;
                if (!l[h]) {
                    l[h] = function (n) {
                        this.slide(n, {
                            easing: h,
                            duration: e || 700
                        })
                    }
                }
                l[h](f)
            } else {
                if (d.collapsible && j) {
                    b.toggle()
                } else {
                    i.hide();
                    b.show()
                }
                c(true)
            }
            i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
            b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
        },
        _completed: function (b) {
            var c = this.options;
            this.running = b ? 0 : --this.running;
            if (this.running) {
                return
            }
            if (c.clearStyle) {
                this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                })
            }
            this._trigger("change", null, this.data)
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.7.2",
        defaults: {
            active: null,
            alwaysOpen: true,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() == location.href.toLowerCase()
            }
        },
        animations: {
            slide: function (j, h) {
                j = a.extend({
                    easing: "swing",
                    duration: 300
                }, j, h);
                if (!j.toHide.size()) {
                    j.toShow.animate({
                        height: "show"
                    }, j);
                    return
                }
                if (!j.toShow.size()) {
                    j.toHide.animate({
                        height: "hide"
                    }, j);
                    return
                }
                var c = j.toShow.css("overflow"),
                    g, d = {},
                    f = {},
                    e = ["height", "paddingTop", "paddingBottom"],
                    b;
                var i = j.toShow;
                b = i[0].style.width;
                i.width(parseInt(i.parent().width(), 10) - parseInt(i.css("paddingLeft"), 10) - parseInt(i.css("paddingRight"), 10) - (parseInt(i.css("borderLeftWidth"), 10) || 0) - (parseInt(i.css("borderRightWidth"), 10) || 0));
                a.each(e, function (k, m) {
                    f[m] = "hide";
                    var l = ("" + a.css(j.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
                    d[m] = {
                        value: l[1],
                        unit: l[2] || "px"
                    }
                });
                j.toShow.css({
                    height: 0,
                    overflow: "hidden"
                }).show();
                j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f, {
                    step: function (k, l) {
                        if (l.prop == "height") {
                            g = (l.now - l.start) / (l.end - l.start)
                        }
                        j.toShow[0].style[l.prop] = (g * d[l.prop].value) + d[l.prop].unit
                    },
                    duration: j.duration,
                    easing: j.easing,
                    complete: function () {
                        if (!j.autoHeight) {
                            j.toShow.css("height", "")
                        }
                        j.toShow.css("width", b);
                        j.toShow.css({
                            overflow: c
                        });
                        j.complete()
                    }
                })
            },
            bounceslide: function (b) {
                this.slide(b, {
                    easing: b.down ? "easeOutBounce" : "swing",
                    duration: b.down ? 1000 : 200
                })
            },
            easeslide: function (b) {
                this.slide(b, {
                    easing: "easeinout",
                    duration: 700
                })
            }
        }
    })
})(jQuery);;
/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */ (function (c) {
    var b = {
        dragStart: "start.draggable",
        drag: "drag.draggable",
        dragStop: "stop.draggable",
        maxHeight: "maxHeight.resizable",
        minHeight: "minHeight.resizable",
        maxWidth: "maxWidth.resizable",
        minWidth: "minWidth.resizable",
        resizeStart: "start.resizable",
        resize: "drag.resizable",
        resizeStop: "stop.resizable"
    },
        a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    c.widget("ui.dialog", {
        _init: function () {
            this.originalTitle = this.element.attr("title");
            var l = this,
                m = this.options,
                j = m.title || this.originalTitle || "&nbsp;",
                e = c.ui.dialog.getTitleId(this.element),
                k = (this.uiDialog = c("<div/>")).appendTo(document.body).hide().addClass(a + m.dialogClass).css({
                    position: "absolute",
                    overflow: "hidden",
                    zIndex: m.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (n) {
                    (m.closeOnEscape && n.keyCode && n.keyCode == c.ui.keyCode.ESCAPE && l.close(n))
                }).attr({
                    role: "dialog",
                    "aria-labelledby": e
                }).mousedown(function (n) {
                    l.moveToTop(false, n)
                }),
                g = this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),
                f = (this.uiDialogTitlebar = c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),
                i = c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                    i.addClass("ui-state-hover")
                }, function () {
                    i.removeClass("ui-state-hover")
                }).focus(function () {
                    i.addClass("ui-state-focus")
                }).blur(function () {
                    i.removeClass("ui-state-focus")
                }).mousedown(function (n) {
                    n.stopPropagation()
                }).click(function (n) {
                    l.close(n);
                    return false
                }).appendTo(f),
                h = (this.uiDialogTitlebarCloseText = c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),
                d = c("<span/>").addClass("ui-dialog-title").attr("id", e).html(j).prependTo(f);
            f.find("*").add(f).disableSelection();
            (m.draggable && c.fn.draggable && this._makeDraggable());
            (m.resizable && c.fn.resizable && this._makeResizable());
            this._createButtons(m.buttons);
            this._isOpen = false;
            (m.bgiframe && c.fn.bgiframe && k.bgiframe());
            (m.autoOpen && this.open())
        },
        destroy: function () {
            (this.overlay && this.overlay.destroy());
            this.uiDialog.hide();
            this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            this.uiDialog.remove();
            (this.originalTitle && this.element.attr("title", this.originalTitle))
        },
        close: function (f) {
            var d = this;
            if (false === d._trigger("beforeclose", f)) {
                return
            }(d.overlay && d.overlay.destroy());
            d.uiDialog.unbind("keypress.ui-dialog");
            (d.options.hide ? d.uiDialog.hide(d.options.hide, function () {
                d._trigger("close", f)
            }) : d.uiDialog.hide() && d._trigger("close", f));
            c.ui.dialog.overlay.resize();
            d._isOpen = false;
            if (d.options.modal) {
                var e = 0;
                c(".ui-dialog").each(function () {
                    if (this != d.uiDialog[0]) {
                        e = Math.max(e, c(this).css("z-index"))
                    }
                });
                c.ui.dialog.maxZ = e
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (f, e) {
            if ((this.options.modal && !f) || (!this.options.stack && !this.options.modal)) {
                return this._trigger("focus", e)
            }
            if (this.options.zIndex > c.ui.dialog.maxZ) {
                c.ui.dialog.maxZ = this.options.zIndex
            }(this.overlay && this.overlay.$el.css("z-index", c.ui.dialog.overlay.maxZ = ++c.ui.dialog.maxZ));
            var d = {
                scrollTop: this.element.attr("scrollTop"),
                scrollLeft: this.element.attr("scrollLeft")
            };
            this.uiDialog.css("z-index", ++c.ui.dialog.maxZ);
            this.element.attr(d);
            this._trigger("focus", e)
        },
        open: function () {
            if (this._isOpen) {
                return
            }
            var e = this.options,
                d = this.uiDialog;
            this.overlay = e.modal ? new c.ui.dialog.overlay(this) : null;
            (d.next().length && d.appendTo("body"));
            this._size();
            this._position(e.position);
            d.show(e.show);
            this.moveToTop(true);
            (e.modal && d.bind("keypress.ui-dialog", function (h) {
                if (h.keyCode != c.ui.keyCode.TAB) {
                    return
                }
                var g = c(":tabbable", this),
                    i = g.filter(":first")[0],
                    f = g.filter(":last")[0];
                if (h.target == f && !h.shiftKey) {
                    setTimeout(function () {
                        i.focus()
                    }, 1)
                } else {
                    if (h.target == i && h.shiftKey) {
                        setTimeout(function () {
                            f.focus()
                        }, 1)
                    }
                }
            }));
            c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();
            this._trigger("open");
            this._isOpen = true
        },
        _createButtons: function (g) {
            var f = this,
                d = false,
                e = c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiDialog.find(".ui-dialog-buttonpane").remove();
            (typeof g == "object" && g !== null && c.each(g, function () {
                return !(d = true)
            }));
            if (d) {
                c.each(g, function (h, i) {
                    c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function () {
                        i.apply(f.element[0], arguments)
                    }).hover(function () {
                        c(this).addClass("ui-state-hover")
                    }, function () {
                        c(this).removeClass("ui-state-hover")
                    }).focus(function () {
                        c(this).addClass("ui-state-focus")
                    }).blur(function () {
                        c(this).removeClass("ui-state-focus")
                    }).appendTo(e)
                });
                e.appendTo(this.uiDialog)
            }
        },
        _makeDraggable: function () {
            var d = this,
                f = this.options,
                e;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function () {
                    e = f.height;
                    c(this).height(c(this).height()).addClass("ui-dialog-dragging");
                    (f.dragStart && f.dragStart.apply(d.element[0], arguments))
                },
                drag: function () {
                    (f.drag && f.drag.apply(d.element[0], arguments))
                },
                stop: function () {
                    c(this).removeClass("ui-dialog-dragging").height(e);
                    (f.dragStop && f.dragStop.apply(d.element[0], arguments));
                    c.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (g) {
            g = (g === undefined ? this.options.resizable : g);
            var d = this,
                f = this.options,
                e = typeof g == "string" ? g : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                alsoResize: this.element,
                maxWidth: f.maxWidth,
                maxHeight: f.maxHeight,
                minWidth: f.minWidth,
                minHeight: f.minHeight,
                start: function () {
                    c(this).addClass("ui-dialog-resizing");
                    (f.resizeStart && f.resizeStart.apply(d.element[0], arguments))
                },
                resize: function () {
                    (f.resize && f.resize.apply(d.element[0], arguments))
                },
                handles: e,
                stop: function () {
                    c(this).removeClass("ui-dialog-resizing");
                    f.height = c(this).height();
                    f.width = c(this).width();
                    (f.resizeStop && f.resizeStop.apply(d.element[0], arguments));
                    c.ui.dialog.overlay.resize()
                }
            }).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _position: function (i) {
            var e = c(window),
                f = c(document),
                g = f.scrollTop(),
                d = f.scrollLeft(),
                h = g;
            if (c.inArray(i, ["center", "top", "right", "bottom", "left"]) >= 0) {
                i = [i == "right" || i == "left" ? i : "center", i == "top" || i == "bottom" ? i : "middle"]
            }
            if (i.constructor != Array) {
                i = ["center", "middle"]
            }
            if (i[0].constructor == Number) {
                d += i[0]
            } else {
                switch (i[0]) {
                case "left":
                    d += 0;
                    break;
                case "right":
                    d += e.width() - this.uiDialog.outerWidth();
                    break;
                default:
                case "center":
                    d += (e.width() - this.uiDialog.outerWidth()) / 2
                }
            }
            if (i[1].constructor == Number) {
                g += i[1]
            } else {
                switch (i[1]) {
                case "top":
                    g += 0;
                    break;
                case "bottom":
                    g += e.height() - this.uiDialog.outerHeight();
                    break;
                default:
                case "middle":
                    g += (e.height() - this.uiDialog.outerHeight()) / 2
                }
            }
            g = Math.max(g, h);
            this.uiDialog.css({
                top: g,
                left: d
            })
        },
        _setData: function (e, f) {
            (b[e] && this.uiDialog.data(b[e], f));
            switch (e) {
            case "buttons":
                this._createButtons(f);
                break;
            case "closeText":
                this.uiDialogTitlebarCloseText.text(f);
                break;
            case "dialogClass":
                this.uiDialog.removeClass(this.options.dialogClass).addClass(a + f);
                break;
            case "draggable":
                (f ? this._makeDraggable() : this.uiDialog.draggable("destroy"));
                break;
            case "height":
                this.uiDialog.height(f);
                break;
            case "position":
                this._position(f);
                break;
            case "resizable":
                var d = this.uiDialog,
                    g = this.uiDialog.is(":data(resizable)");
                (g && !f && d.resizable("destroy"));
                (g && typeof f == "string" && d.resizable("option", "handles", f));
                (g || this._makeResizable(f));
                break;
            case "title":
                c(".ui-dialog-title", this.uiDialogTitlebar).html(f || "&nbsp;");
                break;
            case "width":
                this.uiDialog.width(f);
                break
            }
            c.widget.prototype._setData.apply(this, arguments)
        },
        _size: function () {
            var e = this.options;
            this.element.css({
                height: 0,
                minHeight: 0,
                width: "auto"
            });
            var d = this.uiDialog.css({
                height: "auto",
                width: e.width
            }).height();
            this.element.css({
                minHeight: Math.max(e.minHeight - d, 0),
                height: e.height == "auto" ? "auto" : Math.max(e.height - d, 0)
            })
        }
    });
    c.extend(c.ui.dialog, {
        version: "1.7.2",
        defaults: {
            autoOpen: true,
            bgiframe: false,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: "center",
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        },
        getter: "isOpen",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (d) {
            return "ui-dialog-title-" + (d.attr("id") || ++this.uuid)
        },
        overlay: function (d) {
            this.$el = c.ui.dialog.overlay.create(d)
        }
    });
    c.extend(c.ui.dialog.overlay, {
        instances: [],
        maxZ: 0,
        events: c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (d) {
            return d + ".dialog-overlay"
        }).join(" "),
        create: function (e) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    if (c.ui.dialog.overlay.instances.length) {
                        c(document).bind(c.ui.dialog.overlay.events, function (f) {
                            var g = c(f.target).parents(".ui-dialog").css("zIndex") || 0;
                            return (g > c.ui.dialog.overlay.maxZ)
                        })
                    }
                }, 1);
                c(document).bind("keydown.dialog-overlay", function (f) {
                    (e.options.closeOnEscape && f.keyCode && f.keyCode == c.ui.keyCode.ESCAPE && e.close(f))
                });
                c(window).bind("resize.dialog-overlay", c.ui.dialog.overlay.resize)
            }
            var d = c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({
                width: this.width(),
                height: this.height()
            });
            (e.options.bgiframe && c.fn.bgiframe && d.bgiframe());
            this.instances.push(d);
            return d
        },
        destroy: function (d) {
            this.instances.splice(c.inArray(this.instances, d), 1);
            if (this.instances.length === 0) {
                c([document, window]).unbind(".dialog-overlay")
            }
            d.remove();
            var e = 0;
            c.each(this.instances, function () {
                e = Math.max(e, this.css("z-index"))
            });
            this.maxZ = e
        },
        height: function () {
            if (c.browser.msie && c.browser.version < 7) {
                var e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                var d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                if (e < d) {
                    return c(window).height() + "px"
                } else {
                    return e + "px"
                }
            } else {
                return c(document).height() + "px"
            }
        },
        width: function () {
            if (c.browser.msie && c.browser.version < 7) {
                var d = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                var e = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                if (d < e) {
                    return c(window).width() + "px"
                } else {
                    return d + "px"
                }
            } else {
                return c(document).width() + "px"
            }
        },
        resize: function () {
            var d = c([]);
            c.each(c.ui.dialog.overlay.instances, function () {
                d = d.add(this)
            });
            d.css({
                width: 0,
                height: 0
            }).css({
                width: c.ui.dialog.overlay.width(),
                height: c.ui.dialog.overlay.height()
            })
        }
    });
    c.extend(c.ui.dialog.overlay.prototype, {
        destroy: function () {
            c.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);;
/*
 * jQuery UI Tabs 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	ui.core.js
 */ (function (a) {
    a.widget("ui.tabs", {
        _init: function () {
            if (this.options.deselectable !== undefined) {
                this.options.collapsible = this.options.deselectable
            }
            this._tabify(true)
        },
        _setData: function (b, c) {
            if (b == "selected") {
                if (this.options.collapsible && c == this.options.selected) {
                    return
                }
                this.select(c)
            } else {
                this.options[b] = c;
                if (b == "deselectable") {
                    this.options.collapsible = c
                }
                this._tabify()
            }
        },
        _tabId: function (b) {
            return b.title && b.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + a.data(b)
        },
        _sanitizeSelector: function (b) {
            return b.replace(/:/g, "\\:")
        },
        _cookie: function () {
            var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + a.data(this.list[0]));
            return a.cookie.apply(null, [b].concat(a.makeArray(arguments)))
        },
        _ui: function (c, b) {
            return {
                tab: c,
                panel: b,
                index: this.anchors.index(c)
            }
        },
        _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var b = a(this);
                b.html(b.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function (n) {
            this.list = this.element.children("ul:first");
            this.lis = a("li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return a("a", this)[0]
            });
            this.panels = a([]);
            var p = this,
                d = this.options;
            var c = /^#.+/;
            this.anchors.each(function (r, o) {
                var q = a(o).attr("href");
                var s = q.split("#")[0],
                    u;
                if (s && (s === location.toString().split("#")[0] || (u = a("base")[0]) && s === u.href)) {
                    q = o.hash;
                    o.href = q
                }
                if (c.test(q)) {
                    p.panels = p.panels.add(p._sanitizeSelector(q))
                } else {
                    if (q != "#") {
                        a.data(o, "href.tabs", q);
                        a.data(o, "load.tabs", q.replace(/#.*$/, ""));
                        var w = p._tabId(o);
                        o.href = "#" + w;
                        var v = a("#" + w);
                        if (!v.length) {
                            v = a(d.panelTemplate).attr("id", w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r - 1] || p.list);
                            v.data("destroy.tabs", true)
                        }
                        p.panels = p.panels.add(v)
                    } else {
                        d.disabled.push(r)
                    }
                }
            });
            if (n) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (d.selected === undefined) {
                    if (location.hash) {
                        this.anchors.each(function (q, o) {
                            if (o.hash == location.hash) {
                                d.selected = q;
                                return false
                            }
                        })
                    }
                    if (typeof d.selected != "number" && d.cookie) {
                        d.selected = parseInt(p._cookie(), 10)
                    }
                    if (typeof d.selected != "number" && this.lis.filter(".ui-tabs-selected").length) {
                        d.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                    }
                    d.selected = d.selected || 0
                } else {
                    if (d.selected === null) {
                        d.selected = -1
                    }
                }
                d.selected = ((d.selected >= 0 && this.anchors[d.selected]) || d.selected < 0) ? d.selected : 0;
                d.disabled = a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function (q, o) {
                    return p.lis.index(q)
                }))).sort();
                if (a.inArray(d.selected, d.disabled) != -1) {
                    d.disabled.splice(a.inArray(d.selected, d.disabled), 1)
                }
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (d.selected >= 0 && this.anchors.length) {
                    this.panels.eq(d.selected).removeClass("ui-tabs-hide");
                    this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");
                    p.element.queue("tabs", function () {
                        p._trigger("show", null, p._ui(p.anchors[d.selected], p.panels[d.selected]))
                    });
                    this.load(d.selected)
                }
                a(window).bind("unload", function () {
                    p.lis.add(p.anchors).unbind(".tabs");
                    p.lis = p.anchors = p.panels = null
                })
            } else {
                d.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
            }
            this.element[d.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            if (d.cookie) {
                this._cookie(d.selected, d.cookie)
            }
            for (var g = 0, m;
            (m = this.lis[g]); g++) {
                a(m)[a.inArray(g, d.disabled) != -1 && !a(m).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            if (d.cache === false) {
                this.anchors.removeData("cache.tabs")
            }
            this.lis.add(this.anchors).unbind(".tabs");
            if (d.event != "mouseover") {
                var f = function (o, i) {
                        if (i.is(":not(.ui-state-disabled)")) {
                            i.addClass("ui-state-" + o)
                        }
                    };
                var j = function (o, i) {
                        i.removeClass("ui-state-" + o)
                    };
                this.lis.bind("mouseover.tabs", function () {
                    f("hover", a(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    j("hover", a(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    f("focus", a(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    j("focus", a(this).closest("li"))
                })
            }
            var b, h;
            if (d.fx) {
                if (a.isArray(d.fx)) {
                    b = d.fx[0];
                    h = d.fx[1]
                } else {
                    b = h = d.fx
                }
            }
            function e(i, o) {
                i.css({
                    display: ""
                });
                if (a.browser.msie && o.opacity) {
                    i[0].style.removeAttribute("filter")
                }
            }
            var k = h ?
            function (i, o) {
                a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
                o.hide().removeClass("ui-tabs-hide").animate(h, h.duration || "normal", function () {
                    e(o, h);
                    p._trigger("show", null, p._ui(i, o[0]))
                })
            } : function (i, o) {
                a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
                o.removeClass("ui-tabs-hide");
                p._trigger("show", null, p._ui(i, o[0]))
            };
            var l = b ?
            function (o, i) {
                i.animate(b, b.duration || "normal", function () {
                    p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
                    i.addClass("ui-tabs-hide");
                    e(i, b);
                    p.element.dequeue("tabs")
                })
            } : function (o, i, q) {
                p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
                i.addClass("ui-tabs-hide");
                p.element.dequeue("tabs")
            };
            this.anchors.bind(d.event + ".tabs", function () {
                var o = this,
                    r = a(this).closest("li"),
                    i = p.panels.filter(":not(.ui-tabs-hide)"),
                    q = a(p._sanitizeSelector(this.hash));
                if ((r.hasClass("ui-tabs-selected") && !d.collapsible) || r.hasClass("ui-state-disabled") || r.hasClass("ui-state-processing") || p._trigger("select", null, p._ui(this, q[0])) === false) {
                    this.blur();
                    return false
                }
                d.selected = p.anchors.index(this);
                p.abort();
                if (d.collapsible) {
                    if (r.hasClass("ui-tabs-selected")) {
                        d.selected = -1;
                        if (d.cookie) {
                            p._cookie(d.selected, d.cookie)
                        }
                        p.element.queue("tabs", function () {
                            l(o, i)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else {
                        if (!i.length) {
                            if (d.cookie) {
                                p._cookie(d.selected, d.cookie)
                            }
                            p.element.queue("tabs", function () {
                                k(o, q)
                            });
                            p.load(p.anchors.index(this));
                            this.blur();
                            return false
                        }
                    }
                }
                if (d.cookie) {
                    p._cookie(d.selected, d.cookie)
                }
                if (q.length) {
                    if (i.length) {
                        p.element.queue("tabs", function () {
                            l(o, i)
                        })
                    }
                    p.element.queue("tabs", function () {
                        k(o, q)
                    });
                    p.load(p.anchors.index(this))
                } else {
                    throw "jQuery UI Tabs: Mismatching fragment identifier."
                }
                if (a.browser.msie) {
                    this.blur()
                }
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        },
        destroy: function () {
            var b = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var c = a.data(this, "href.tabs");
                if (c) {
                    this.href = c
                }
                var d = a(this).unbind(".tabs");
                a.each(["href", "load", "cache"], function (e, f) {
                    d.removeData(f + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                if (a.data(this, "destroy.tabs")) {
                    a(this).remove()
                } else {
                    a(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }
            });
            if (b.cookie) {
                this._cookie(null, b.cookie)
            }
        },
        add: function (e, d, c) {
            if (c === undefined) {
                c = this.anchors.length
            }
            var b = this,
                g = this.options,
                i = a(g.tabTemplate.replace(/#\{href\}/g, e).replace(/#\{label\}/g, d)),
                h = !e.indexOf("#") ? e.replace("#", "") : this._tabId(a("a", i)[0]);
            i.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var f = a("#" + h);
            if (!f.length) {
                f = a(g.panelTemplate).attr("id", h).data("destroy.tabs", true)
            }
            f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (c >= this.lis.length) {
                i.appendTo(this.list);
                f.appendTo(this.list[0].parentNode)
            } else {
                i.insertBefore(this.lis[c]);
                f.insertBefore(this.panels[c])
            }
            g.disabled = a.map(g.disabled, function (k, j) {
                return k >= c ? ++k : k
            });
            this._tabify();
            if (this.anchors.length == 1) {
                i.addClass("ui-tabs-selected ui-state-active");
                f.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    b._trigger("show", null, b._ui(b.anchors[0], b.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[c], this.panels[c]))
        },
        remove: function (b) {
            var d = this.options,
                e = this.lis.eq(b).remove(),
                c = this.panels.eq(b).remove();
            if (e.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(b + (b + 1 < this.anchors.length ? 1 : -1))
            }
            d.disabled = a.map(a.grep(d.disabled, function (g, f) {
                return g != b
            }), function (g, f) {
                return g >= b ? --g : g
            });
            this._tabify();
            this._trigger("remove", null, this._ui(e.find("a")[0], c[0]))
        },
        enable: function (b) {
            var c = this.options;
            if (a.inArray(b, c.disabled) == -1) {
                return
            }
            this.lis.eq(b).removeClass("ui-state-disabled");
            c.disabled = a.grep(c.disabled, function (e, d) {
                return e != b
            });
            this._trigger("enable", null, this._ui(this.anchors[b], this.panels[b]))
        },
        disable: function (c) {
            var b = this,
                d = this.options;
            if (c != d.selected) {
                this.lis.eq(c).addClass("ui-state-disabled");
                d.disabled.push(c);
                d.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[c], this.panels[c]))
            }
        },
        select: function (b) {
            if (typeof b == "string") {
                b = this.anchors.index(this.anchors.filter("[href$=" + b + "]"))
            } else {
                if (b === null) {
                    b = -1
                }
            }
            if (b == -1 && this.options.collapsible) {
                b = this.options.selected
            }
            this.anchors.eq(b).trigger(this.options.event + ".tabs")
        },
        load: function (e) {
            var c = this,
                g = this.options,
                b = this.anchors.eq(e)[0],
                d = a.data(b, "load.tabs");
            this.abort();
            if (!d || this.element.queue("tabs").length !== 0 && a.data(b, "cache.tabs")) {
                this.element.dequeue("tabs");
                return
            }
            this.lis.eq(e).addClass("ui-state-processing");
            if (g.spinner) {
                var f = a("span", b);
                f.data("label.tabs", f.html()).html(g.spinner)
            }
            this.xhr = a.ajax(a.extend({}, g.ajaxOptions, {
                url: d,
                success: function (i, h) {
                    a(c._sanitizeSelector(b.hash)).html(i);
                    c._cleanup();
                    if (g.cache) {
                        a.data(b, "cache.tabs", true)
                    }
                    c._trigger("load", null, c._ui(c.anchors[e], c.panels[e]));
                    try {
                        g.ajaxOptions.success(i, h)
                    } catch (j) {}
                    c.element.dequeue("tabs")
                }
            }))
        },
        abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup()
        },
        url: function (c, b) {
            this.anchors.eq(c).removeData("cache.tabs").data("load.tabs", b)
        },
        length: function () {
            return this.anchors.length
        }
    });
    a.extend(a.ui.tabs, {
        version: "1.7.2",
        getter: "length",
        defaults: {
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disabled: [],
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            panelTemplate: "<div></div>",
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
        }
    });
    a.extend(a.ui.tabs.prototype, {
        rotation: null,
        rotate: function (d, f) {
            var b = this,
                g = this.options;
            var c = b._rotate || (b._rotate = function (h) {
                clearTimeout(b.rotation);
                b.rotation = setTimeout(function () {
                    var i = g.selected;
                    b.select(++i < b.anchors.length ? i : 0)
                }, d);
                if (h) {
                    h.stopPropagation()
                }
            });
            var e = b._unrotate || (b._unrotate = !f ?
            function (h) {
                if (h.clientX) {
                    b.rotate(null)
                }
            } : function (h) {
                t = g.selected;
                c()
            });
            if (d) {
                this.element.bind("tabsshow", c);
                this.anchors.bind(g.event + ".tabs", e);
                c()
            } else {
                clearTimeout(b.rotation);
                this.element.unbind("tabsshow", c);
                this.anchors.unbind(g.event + ".tabs", e);
                delete this._rotate;
                delete this._unrotate
            }
        }
    })
})(jQuery);;
/*
 * jQuery UI Datepicker 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	ui.core.js
 */ (function ($) {
    $.extend($.ui, {
        datepicker: {
            version: "1.7.2"
        }
    });
    var PROP_NAME = "datepicker";

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "show",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            showMonthAfterYear: false,
            yearRange: "-10:+10",
            showOtherMonths: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "normal",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        },
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == "div" || nodeName == "span");
            if (!target.id) {
                target.id = "dp" + (++this.uuid)
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == "input") {
                this._connectDatepicker(target, inst)
            } else {
                if (inline) {
                    this._inlineDatepicker(target, inst)
                }
            }
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([:\[\]\.])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return
            }
            var appendText = this._get(inst, "appendText");
            var isRTL = this._get(inst, "isRTL");
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append)
            }
            var showOn = this._get(inst, "showOn");
            if (showOn == "focus" || showOn == "both") {
                input.focus(this._showDatepicker)
            }
            if (showOn == "button" || showOn == "both") {
                var buttonText = this._get(inst, "buttonText");
                var buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target) {
                        $.datepicker._hideDatepicker()
                    } else {
                        $.datepicker._showDatepicker(target)
                    }
                    return false
                })
            }
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst)
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst));
            this._updateDatepicker(inst);
            this._updateAlternate(inst)
        },
        _dialogDatepicker: function (input, dateText, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                var id = "dp" + (++this.uuid);
                this._dialogInput = $('<input type="text" id="' + id + '" size="1" style="position: absolute; top: -100px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            this._dialogInput.val(dateText);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css("left", this._pos[0] + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv)
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress)
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    $target.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = false;
                inst.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().removeClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == "input") {
                target.disabled = true;
                inst.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (nodeName == "div" || nodeName == "span") {
                    var inline = $target.children("." + this._inlineClass);
                    inline.children().addClass("ui-state-disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return false
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) {
                    return true
                }
            }
            return false
        },
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == "string") {
                return (name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == "string") {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker(null)
                }
                var date = this._getDateDatepicker(target);
                extendRemove(inst.settings, settings);
                this._setDateDatepicker(target, date);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function (target, date, endDate) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date, endDate);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst)
            }
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing) {
                switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(null, "");
                    break;
                case 13:
                    var sel = $("td." + $.datepicker._dayOverClass + ", td." + $.datepicker._currentClass, inst.dpDiv);
                    if (sel[0]) {
                        $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
                    } else {
                        $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"))
                    }
                    return false;
                    break;
                case 27:
                    $.datepicker._hideDatepicker(null, $.datepicker._get(inst, "duration"));
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");
                    break;
                case 35:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._clearDate(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._gotoToday(event.target)
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, -7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    if (event.originalEvent.altKey) {
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (event.ctrlKey || event.metaKey) {
                        $.datepicker._adjustDate(event.target, +7, "D")
                    }
                    handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = false
                }
            } else {
                if (event.keyCode == 36 && event.ctrlKey) {
                    $.datepicker._showDatepicker(this)
                } else {
                    handled = false
                }
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, "constrainInput")) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
            }
        },
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != "input") {
                input = $("input", input.parentNode)[0]
            }
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
                return
            }
            var inst = $.datepicker._getInst(input);
            var beforeShow = $.datepicker._get(inst, "beforeShow");
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            $.datepicker._hideDatepicker(null, "");
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog) {
                input.value = ""
            }
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css("position") == "fixed";
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.rangeStart = null;
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),
                display: "none",
                left: offset.left + "px",
                top: offset.top + "px"
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, "showAnim") || "show";
                var duration = $.datepicker._get(inst, "duration");
                var postProcess = function () {
                        $.datepicker._datepickerShowing = true;
                        if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
                            $("iframe.ui-datepicker-cover").css({
                                width: inst.dpDiv.width() + 4,
                                height: inst.dpDiv.height() + 4
                            })
                        }
                    };
                if ($.effects && $.effects[showAnim]) {
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[showAnim](duration, postProcess)
                }
                if (duration == "") {
                    postProcess()
                }
                if (inst.input[0].type != "hidden") {
                    inst.input[0].focus()
                }
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function (inst) {
            var dims = {
                width: inst.dpDiv.width() + 4,
                height: inst.dpDiv.height() + 4
            };
            var self = this;
            inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({
                width: dims.width,
                height: dims.height
            }).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                $(this).removeClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") != -1) {
                    $(this).removeClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") != -1) {
                    $(this).removeClass("ui-datepicker-next-hover")
                }
            }).bind("mouseover", function () {
                if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).addClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).addClass("ui-datepicker-next-hover")
                    }
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            if (cols > 1) {
                inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
            } else {
                inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
            }
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (inst.input && inst.input[0].type != "hidden" && inst == $.datepicker._curInst) {
                $(inst.input[0]).focus()
            }
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) + $(document).scrollLeft();
            var viewHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + $(document).scrollTop();
            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0;
            offset.top -= (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(offset.top + dpHeight + inputHeight * 2 - viewHeight) : 0;
            return offset
        },
        _findPos: function (obj) {
            while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
                obj = obj.nextSibling
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _hideDatepicker: function (input, duration) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) {
                return
            }
            if (inst.stayOpen) {
                this._selectDate("#" + inst.id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
            }
            inst.stayOpen = false;
            if (this._datepickerShowing) {
                duration = (duration != null ? duration : this._get(inst, "duration"));
                var showAnim = this._get(inst, "showAnim");
                var postProcess = function () {
                        $.datepicker._tidyDialog(inst)
                    };
                if (duration != "" && $.effects && $.effects[showAnim]) {
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
                } else {
                    inst.dpDiv[(duration == "" ? "hide" : (showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide")))](duration, postProcess)
                }
                if (duration == "") {
                    this._tidyDialog(inst)
                }
                var onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst])
                }
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
            this._curInst = null
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst) {
                return
            }
            var $target = $(event.target);
            if (($target.parents("#" + $.datepicker._mainDivId).length == 0) && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
                $.datepicker._hideDatepicker(null, "")
            }
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = false;
            inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
                inst.input[0].focus()
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            if (inst.stayOpen) {
                inst.endDay = inst.endMonth = inst.endYear = null
            }
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
            if (inst.stayOpen) {
                inst.rangeStart = this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                this._updateDatepicker(inst)
            }
        },
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst.stayOpen = false;
            inst.endDay = inst.endMonth = inst.endYear = inst.rangeStart = null;
            this._selectDate(target, "")
        },
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input) {
                inst.input.val(dateStr)
            }
            this._updateAlternate(inst);
            var onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst])
            } else {
                if (inst.input) {
                    inst.input.trigger("change")
                }
            }
            if (inst.inline) {
                this._updateDatepicker(inst)
            } else {
                if (!inst.stayOpen) {
                    this._hideDatepicker(null, this._get(inst, "duration"));
                    this._lastInput = inst.input[0];
                    if (typeof (inst.input[0]) != "object") {
                        inst.input[0].focus()
                    }
                    this._lastInput = null
                }
            }
        },
        _updateAlternate: function (inst) {
            var altField = this._get(inst, "altField");
            if (altField) {
                var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                var date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""]
        },
        iso8601Week: function (date) {
            var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4);
            var firstDay = firstMon.getDay() || 7;
            firstMon.setDate(firstMon.getDate() + 1 - firstDay);
            if (firstDay < 4 && checkDate < firstMon) {
                checkDate.setDate(checkDate.getDate() - 3);
                return $.datepicker.iso8601Week(checkDate)
            } else {
                if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) {
                    firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
                    if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) {
                        return 1
                    }
                }
            }
            return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1
        },
        parseDate: function (format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments"
            }
            value = (typeof value == "object" ? value.toString() : value + "");
            if (value == "") {
                return null
            }
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function (match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                    if (matches) {
                        iFormat++
                    }
                    return matches
                };
            var getNumber = function (match) {
                    lookAhead(match);
                    var origSize = (match == "@" ? 14 : (match == "y" ? 4 : (match == "o" ? 3 : 2)));
                    var size = origSize;
                    var num = 0;
                    while (size > 0 && iValue < value.length && value.charAt(iValue) >= "0" && value.charAt(iValue) <= "9") {
                        num = num * 10 + parseInt(value.charAt(iValue++), 10);
                        size--
                    }
                    if (size == origSize) {
                        throw "Missing number at position " + iValue
                    }
                    return num
                };
            var getName = function (match, shortNames, longNames) {
                    var names = (lookAhead(match) ? longNames : shortNames);
                    var size = 0;
                    for (var j = 0; j < names.length; j++) {
                        size = Math.max(size, names[j].length)
                    }
                    var name = "";
                    var iInit = iValue;
                    while (size > 0 && iValue < value.length) {
                        name += value.charAt(iValue++);
                        for (var i = 0; i < names.length; i++) {
                            if (name == names[i]) {
                                return i + 1
                            }
                        }
                        size--
                    }
                    throw "Unknown name at position " + iInit
                };
            var checkLiteral = function () {
                    if (value.charAt(iValue) != format.charAt(iFormat)) {
                        throw "Unexpected literal at position " + iValue
                    }
                    iValue++
                };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        checkLiteral()
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        var date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral()
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        checkLiteral()
                    }
                }
            }
            if (year == -1) {
                year = new Date().getFullYear()
            } else {
                if (year < 100) {
                    year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
                }
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break
                    }
                    month++;
                    day -= dim
                } while (true)
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                throw "Invalid date"
            }
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        formatDate: function (format, date, settings) {
            if (!date) {
                return ""
            }
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function (match) {
                    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                    if (matches) {
                        iFormat++
                    }
                    return matches
                };
            var formatNumber = function (match, value, len) {
                    var num = "" + value;
                    if (lookAhead(match)) {
                        while (num.length < len) {
                            num = "0" + num
                        }
                    }
                    return num
                };
            var formatName = function (match, value, shortNames, longNames) {
                    return (lookAhead(match) ? longNames[value] : shortNames[value])
                };
            var output = "";
            var literal = false;
            if (date) {
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                            literal = false
                        } else {
                            output += format.charAt(iFormat)
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            var doy = date.getDate();
                            for (var m = date.getMonth() - 1; m >= 0; m--) {
                                doy += this._getDaysInMonth(date.getFullYear(), m)
                            }
                            output += formatNumber("o", doy, 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'"
                            } else {
                                literal = true
                            }
                            break;
                        default:
                            output += format.charAt(iFormat)
                        }
                    }
                }
            }
            return output
        },
        _possibleChars: function (format) {
            var chars = "";
            var literal = false;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        chars += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (lookAhead("'")) {
                            chars += "'"
                        } else {
                            literal = true
                        }
                        break;
                    default:
                        chars += format.charAt(iFormat)
                    }
                }
            }
            return chars
        },
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function (inst) {
            var dateFormat = this._get(inst, "dateFormat");
            var dates = inst.input ? inst.input.val() : null;
            inst.endDay = inst.endMonth = inst.endYear = null;
            var date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                date = defaultDate
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function (inst) {
            var date = this._determineDate(this._get(inst, "defaultDate"), new Date());
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            return date
        },
        _determineDate: function (date, defaultDate) {
            var offsetNumeric = function (offset) {
                    var date = new Date();
                    date.setDate(date.getDate() + offset);
                    return date
                };
            var offsetString = function (offset, getDaysInMonth) {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var day = date.getDate();
                    var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                    var matches = pattern.exec(offset);
                    while (matches) {
                        switch (matches[2] || "d") {
                        case "d":
                        case "D":
                            day += parseInt(matches[1], 10);
                            break;
                        case "w":
                        case "W":
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break;
                        case "y":
                        case "Y":
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, getDaysInMonth(year, month));
                            break
                        }
                        matches = pattern.exec(offset)
                    }
                    return new Date(year, month, day)
                };
            date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date, this._getDaysInMonth) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
            date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
            if (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(date)
        },
        _daylightSavingAdjust: function (date) {
            if (!date) {
                return null
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function (inst, date, endDate) {
            var clear = !(date);
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            date = this._determineDate(date, new Date());
            inst.selectedDay = inst.currentDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
            if (origMonth != inst.selectedMonth || origYear != inst.selectedYear) {
                this._notifyChange(inst)
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst))
            }
        },
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _generateHTML: function (inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, "isRTL");
            var showButtonPanel = this._get(inst, "showButtonPanel");
            var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
            var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
            var stepMonths = this._get(inst, "stepMonths");
            var stepBigMonths = this._get(inst, "stepBigMonths");
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
            var nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#' + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
            var currentText = this._get(inst, "currentText");
            var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#' + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
            var firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var dayNames = this._get(inst, "dayNames");
            var dayNamesShort = this._get(inst, "dayNamesShort");
            var dayNamesMin = this._get(inst, "dayNamesMin");
            var monthNames = this._get(inst, "monthNames");
            var monthNamesShort = this._get(inst, "monthNamesShort");
            var beforeShowDay = this._get(inst, "beforeShowDay");
            var showOtherMonths = this._get(inst, "showOtherMonths");
            var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
            var endDate = inst.endDay ? this._daylightSavingAdjust(new Date(inst.endYear, inst.endMonth, inst.endDay)) : currentDate;
            var defaultDate = this._getDefaultDate(inst);
            var html = "";
            for (var row = 0; row < numMonths[0]; row++) {
                var group = "";
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = " ui-corner-all";
                    var calender = "";
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group ui-datepicker-group-';
                        switch (col) {
                        case 0:
                            calender += "first";
                            cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                            break;
                        case numMonths[1] - 1:
                            calender += "last";
                            cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                            break;
                        default:
                            calender += "middle";
                            cornerClass = "";
                            break
                        }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, selectedDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var thead = "";
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                    }
                    calender += thead + "</tr></thead><tbody>";
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                    }
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += "<tr>";
                        var tbody = "";
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = otherMonth || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : " onclick=\"DP_jQuery.datepicker._selectDay('#" + inst.id + "'," + drawMonth + "," + drawYear + ', this);return false;"') + ">" + (otherMonth ? (showOtherMonths ? printDate.getDate() : "&#xa0;") : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ? " ui-state-active" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + "</tr>"
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            inst._keyEvent = false;
            return html
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, selectedDate, secondary, monthNames, monthNamesShort) {
            minDate = (inst.rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
            var changeMonth = this._get(inst, "changeMonth");
            var changeYear = this._get(inst, "changeYear");
            var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = "";
            if (secondary || !changeMonth) {
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span> "
            } else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                    }
                }
                monthHtml += "</select>"
            }
            if (!showMonthAfterYear) {
                html += monthHtml + ((secondary || changeMonth || changeYear) && (!(changeMonth && changeYear)) ? "&#xa0;" : "")
            }
            if (secondary || !changeYear) {
                html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
            } else {
                var years = this._get(inst, "yearRange").split(":");
                var year = 0;
                var endYear = 0;
                if (years.length != 2) {
                    year = drawYear - 10;
                    endYear = drawYear + 10
                } else {
                    if (years[0].charAt(0) == "+" || years[0].charAt(0) == "-") {
                        year = drawYear + parseInt(years[0], 10);
                        endYear = drawYear + parseInt(years[1], 10)
                    } else {
                        year = parseInt(years[0], 10);
                        endYear = parseInt(years[1], 10)
                    }
                }
                year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                html += '<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#' + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#" + inst.id + "');\">";
                for (; year <= endYear; year++) {
                    html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
                }
                html += "</select>"
            }
            if (showMonthAfterYear) {
                html += (secondary || changeMonth || changeYear ? "&#xa0;" : "") + monthHtml
            }
            html += "</div>";
            return html
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == "Y" ? offset : 0);
            var month = inst.drawMonth + (period == "M" ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
            var date = this._daylightSavingAdjust(new Date(year, month, day));
            var minDate = this._getMinMaxDate(inst, "min", true);
            var maxDate = this._getMinMaxDate(inst, "max");
            date = (minDate && date < minDate ? minDate : date);
            date = (maxDate && date > maxDate ? maxDate : date);
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == "M" || period == "Y") {
                this._notifyChange(inst)
            }
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
            }
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths == "number" ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function (inst, minMax, checkRange) {
            var date = this._determineDate(this._get(inst, minMax + "Date"), null);
            return (!checkRange || !inst.rangeStart ? date : (!date || inst.rangeStart > date ? inst.rangeStart : date))
        },
        _getDaysInMonth: function (year, month) {
            return 32 - new Date(year, month, 32).getDate()
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1));
            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
            }
            return this._isInRange(inst, date)
        },
        _isInRange: function (inst, date) {
            var newMinDate = (!inst.rangeStart ? null : this._daylightSavingAdjust(new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)));
            newMinDate = (newMinDate && inst.rangeStart < newMinDate ? inst.rangeStart : newMinDate);
            var minDate = newMinDate || this._getMinMaxDate(inst, "min");
            var maxDate = this._getMinMaxDate(inst, "max");
            return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate))
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    });

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }
    function isArray(a) {
        return (a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }
    $.fn.datepicker = function (options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function () {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.7.2";
    window.DP_jQuery = $
})(jQuery);;
/*
 * jQuery UI Effects 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function (d) {
    d.effects = {
        version: "1.7.2",
        save: function (g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.data("ec.storage." + h[f], g[0].style[h[f]])
                }
            }
        },
        restore: function (g, h) {
            for (var f = 0; f < h.length; f++) {
                if (h[f] !== null) {
                    g.css(h[f], g.data("ec.storage." + h[f]))
                }
            }
        },
        setMode: function (f, g) {
            if (g == "toggle") {
                g = f.is(":hidden") ? "show" : "hide"
            }
            return g
        },
        getBaseline: function (g, h) {
            var i, f;
            switch (g[0]) {
            case "top":
                i = 0;
                break;
            case "middle":
                i = 0.5;
                break;
            case "bottom":
                i = 1;
                break;
            default:
                i = g[0] / h.height
            }
            switch (g[1]) {
            case "left":
                f = 0;
                break;
            case "center":
                f = 0.5;
                break;
            case "right":
                f = 1;
                break;
            default:
                f = g[1] / h.width
            }
            return {
                x: f,
                y: i
            }
        },
        createWrapper: function (f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent()
            }
            var g = {
                width: f.outerWidth(true),
                height: f.outerHeight(true),
                "float": f.css("float")
            };
            f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
            var j = f.parent();
            if (f.css("position") == "static") {
                j.css({
                    position: "relative"
                });
                f.css({
                    position: "relative"
                })
            } else {
                var i = f.css("top");
                if (isNaN(parseInt(i, 10))) {
                    i = "auto"
                }
                var h = f.css("left");
                if (isNaN(parseInt(h, 10))) {
                    h = "auto"
                }
                j.css({
                    position: f.css("position"),
                    top: i,
                    left: h,
                    zIndex: f.css("z-index")
                }).show();
                f.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            j.css(g);
            return j
        },
        removeWrapper: function (f) {
            if (f.parent().is(".ui-effects-wrapper")) {
                return f.parent().replaceWith(f)
            }
            return f
        },
        setTransition: function (g, i, f, h) {
            h = h || {};
            d.each(i, function (k, j) {
                unit = g.cssUnit(j);
                if (unit[0] > 0) {
                    h[j] = unit[0] * f + unit[1]
                }
            });
            return h
        },
        animateClass: function (h, i, k, j) {
            var f = (typeof k == "function" ? k : (j ? j : null));
            var g = (typeof k == "string" ? k : null);
            return this.each(function () {
                var q = {};
                var o = d(this);
                var p = o.attr("style") || "";
                if (typeof p == "object") {
                    p = p.cssText
                }
                if (h.toggle) {
                    o.hasClass(h.toggle) ? h.remove = h.toggle : h.add = h.toggle
                }
                var l = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.addClass(h.add)
                }
                if (h.remove) {
                    o.removeClass(h.remove)
                }
                var m = d.extend({}, (document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle));
                if (h.add) {
                    o.removeClass(h.add)
                }
                if (h.remove) {
                    o.addClass(h.remove)
                }
                for (var r in m) {
                    if (typeof m[r] != "function" && m[r] && r.indexOf("Moz") == -1 && r.indexOf("length") == -1 && m[r] != l[r] && (r.match(/color/i) || (!r.match(/color/i) && !isNaN(parseInt(m[r], 10)))) && (l.position != "static" || (l.position == "static" && !r.match(/left|top|bottom|right/)))) {
                        q[r] = m[r]
                    }
                }
                o.animate(q, i, g, function () {
                    if (typeof d(this).attr("style") == "object") {
                        d(this).attr("style")["cssText"] = "";
                        d(this).attr("style")["cssText"] = p
                    } else {
                        d(this).attr("style", p)
                    }
                    if (h.add) {
                        d(this).addClass(h.add)
                    }
                    if (h.remove) {
                        d(this).removeClass(h.remove)
                    }
                    if (f) {
                        f.apply(this, arguments)
                    }
                })
            })
        }
    };

    function c(g, f) {
        var i = g[1] && g[1].constructor == Object ? g[1] : {};
        if (f) {
            i.mode = f
        }
        var h = g[1] && g[1].constructor != Object ? g[1] : (i.duration ? i.duration : g[2]);
        h = d.fx.off ? 0 : typeof h === "number" ? h : d.fx.speeds[h] || d.fx.speeds._default;
        var j = i.callback || (d.isFunction(g[1]) && g[1]) || (d.isFunction(g[2]) && g[2]) || (d.isFunction(g[3]) && g[3]);
        return [g[0], i, h, j]
    }
    d.fn.extend({
        _show: d.fn.show,
        _hide: d.fn.hide,
        __toggle: d.fn.toggle,
        _addClass: d.fn.addClass,
        _removeClass: d.fn.removeClass,
        _toggleClass: d.fn.toggleClass,
        effect: function (g, f, h, i) {
            return d.effects[g] ? d.effects[g].call(this, {
                method: g,
                options: f || {},
                duration: h,
                callback: i
            }) : null
        },
        show: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._show.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "show"))
            }
        },
        hide: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0]))) {
                return this._hide.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "hide"))
            }
        },
        toggle: function () {
            if (!arguments[0] || (arguments[0].constructor == Number || (/(slow|normal|fast)/).test(arguments[0])) || (d.isFunction(arguments[0]) || typeof arguments[0] == "boolean")) {
                return this.__toggle.apply(this, arguments)
            } else {
                return this.effect.apply(this, c(arguments, "toggle"))
            }
        },
        addClass: function (g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                add: g
            },
            f, i, h]) : this._addClass(g)
        },
        removeClass: function (g, f, i, h) {
            return f ? d.effects.animateClass.apply(this, [{
                remove: g
            },
            f, i, h]) : this._removeClass(g)
        },
        toggleClass: function (g, f, i, h) {
            return ((typeof f !== "boolean") && f) ? d.effects.animateClass.apply(this, [{
                toggle: g
            },
            f, i, h]) : this._toggleClass(g, f)
        },
        morph: function (f, h, g, j, i) {
            return d.effects.animateClass.apply(this, [{
                add: h,
                remove: f
            },
            g, j, i])
        },
        switchClass: function () {
            return this.morph.apply(this, arguments)
        },
        cssUnit: function (f) {
            var g = this.css(f),
                h = [];
            d.each(["em", "px", "%", "pt"], function (j, k) {
                if (g.indexOf(k) > 0) {
                    h = [parseFloat(g), k]
                }
            });
            return h
        }
    });
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (g, f) {
        d.fx.step[f] = function (h) {
            if (h.state == 0) {
                h.start = e(h.elem, f);
                h.end = b(h.end)
            }
            h.elem.style[f] = "rgb(" + [Math.max(Math.min(parseInt((h.pos * (h.end[0] - h.start[0])) + h.start[0], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[1] - h.start[1])) + h.start[1], 10), 255), 0), Math.max(Math.min(parseInt((h.pos * (h.end[2] - h.start[2])) + h.start[2], 10), 255), 0)].join(",") + ")"
        }
    });

    function b(g) {
        var f;
        if (g && g.constructor == Array && g.length == 3) {
            return g
        }
        if (f = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)) {
            return [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3], 10)]
        }
        if (f = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)) {
            return [parseFloat(f[1]) * 2.55, parseFloat(f[2]) * 2.55, parseFloat(f[3]) * 2.55]
        }
        if (f = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)) {
            return [parseInt(f[1], 16), parseInt(f[2], 16), parseInt(f[3], 16)]
        }
        if (f = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)) {
            return [parseInt(f[1] + f[1], 16), parseInt(f[2] + f[2], 16), parseInt(f[3] + f[3], 16)]
        }
        if (f = /rgba\(0, 0, 0, 0\)/.exec(g)) {
            return a.transparent
        }
        return a[d.trim(g).toLowerCase()]
    }
    function e(h, f) {
        var g;
        do {
            g = d.curCSS(h, f);
            if (g != "" && g != "transparent" || d.nodeName(h, "body")) {
                break
            }
            f = "backgroundColor"
        } while (h = h.parentNode);
        return b(g)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    d.easing.jswing = d.easing.swing;
    d.extend(d.easing, {
        def: "easeOutQuad",
        swing: function (g, h, f, j, i) {
            return d.easing[d.easing.def](g, h, f, j, i)
        },
        easeInQuad: function (g, h, f, j, i) {
            return j * (h /= i) * h + f
        },
        easeOutQuad: function (g, h, f, j, i) {
            return -j * (h /= i) * (h - 2) + f
        },
        easeInOutQuad: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h + f
            }
            return -j / 2 * ((--h) * (h - 2) - 1) + f
        },
        easeInCubic: function (g, h, f, j, i) {
            return j * (h /= i) * h * h + f
        },
        easeOutCubic: function (g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h + 1) + f
        },
        easeInOutCubic: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h + 2) + f
        },
        easeInQuart: function (g, h, f, j, i) {
            return j * (h /= i) * h * h * h + f
        },
        easeOutQuart: function (g, h, f, j, i) {
            return -j * ((h = h / i - 1) * h * h * h - 1) + f
        },
        easeInOutQuart: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h + f
            }
            return -j / 2 * ((h -= 2) * h * h * h - 2) + f
        },
        easeInQuint: function (g, h, f, j, i) {
            return j * (h /= i) * h * h * h * h + f
        },
        easeOutQuint: function (g, h, f, j, i) {
            return j * ((h = h / i - 1) * h * h * h * h + 1) + f
        },
        easeInOutQuint: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return j / 2 * h * h * h * h * h + f
            }
            return j / 2 * ((h -= 2) * h * h * h * h + 2) + f
        },
        easeInSine: function (g, h, f, j, i) {
            return -j * Math.cos(h / i * (Math.PI / 2)) + j + f
        },
        easeOutSine: function (g, h, f, j, i) {
            return j * Math.sin(h / i * (Math.PI / 2)) + f
        },
        easeInOutSine: function (g, h, f, j, i) {
            return -j / 2 * (Math.cos(Math.PI * h / i) - 1) + f
        },
        easeInExpo: function (g, h, f, j, i) {
            return (h == 0) ? f : j * Math.pow(2, 10 * (h / i - 1)) + f
        },
        easeOutExpo: function (g, h, f, j, i) {
            return (h == i) ? f + j : j * (-Math.pow(2, -10 * h / i) + 1) + f
        },
        easeInOutExpo: function (g, h, f, j, i) {
            if (h == 0) {
                return f
            }
            if (h == i) {
                return f + j
            }
            if ((h /= i / 2) < 1) {
                return j / 2 * Math.pow(2, 10 * (h - 1)) + f
            }
            return j / 2 * (-Math.pow(2, -10 * --h) + 2) + f
        },
        easeInCirc: function (g, h, f, j, i) {
            return -j * (Math.sqrt(1 - (h /= i) * h) - 1) + f
        },
        easeOutCirc: function (g, h, f, j, i) {
            return j * Math.sqrt(1 - (h = h / i - 1) * h) + f
        },
        easeInOutCirc: function (g, h, f, j, i) {
            if ((h /= i / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - h * h) - 1) + f
            }
            return j / 2 * (Math.sqrt(1 - (h -= 2) * h) + 1) + f
        },
        easeInElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return -(h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
        },
        easeOutElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l) == 1) {
                return f + m
            }
            if (!k) {
                k = l * 0.3
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            return h * Math.pow(2, -10 * i) * Math.sin((i * l - j) * (2 * Math.PI) / k) + m + f
        },
        easeInOutElastic: function (g, i, f, m, l) {
            var j = 1.70158;
            var k = 0;
            var h = m;
            if (i == 0) {
                return f
            }
            if ((i /= l / 2) == 2) {
                return f + m
            }
            if (!k) {
                k = l * (0.3 * 1.5)
            }
            if (h < Math.abs(m)) {
                h = m;
                var j = k / 4
            } else {
                var j = k / (2 * Math.PI) * Math.asin(m / h)
            }
            if (i < 1) {
                return -0.5 * (h * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k)) + f
            }
            return h * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * l - j) * (2 * Math.PI) / k) * 0.5 + m + f
        },
        easeInBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * (h /= j) * h * ((i + 1) * h - i) + f
        },
        easeOutBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            return k * ((h = h / j - 1) * h * ((i + 1) * h + i) + 1) + f
        },
        easeInOutBack: function (g, h, f, k, j, i) {
            if (i == undefined) {
                i = 1.70158
            }
            if ((h /= j / 2) < 1) {
                return k / 2 * (h * h * (((i *= (1.525)) + 1) * h - i)) + f
            }
            return k / 2 * ((h -= 2) * h * (((i *= (1.525)) + 1) * h + i) + 2) + f
        },
        easeInBounce: function (g, h, f, j, i) {
            return j - d.easing.easeOutBounce(g, i - h, 0, j, i) + f
        },
        easeOutBounce: function (g, h, f, j, i) {
            if ((h /= i) < (1 / 2.75)) {
                return j * (7.5625 * h * h) + f
            } else {
                if (h < (2 / 2.75)) {
                    return j * (7.5625 * (h -= (1.5 / 2.75)) * h + 0.75) + f
                } else {
                    if (h < (2.5 / 2.75)) {
                        return j * (7.5625 * (h -= (2.25 / 2.75)) * h + 0.9375) + f
                    } else {
                        return j * (7.5625 * (h -= (2.625 / 2.75)) * h + 0.984375) + f
                    }
                }
            }
        },
        easeInOutBounce: function (g, h, f, j, i) {
            if (h < i / 2) {
                return d.easing.easeInBounce(g, h * 2, 0, j, i) * 0.5 + f
            }
            return d.easing.easeOutBounce(g, h * 2 - i, 0, j, i) * 0.5 + j * 0.5 + f
        }
    })
})(jQuery);;
/*
 * jQuery UI Effects Highlight 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	effects.core.js
 */ (function (a) {
    a.effects.highlight = function (b) {
        return this.queue(function () {
            var e = a(this),
                d = ["backgroundImage", "backgroundColor", "opacity"];
            var h = a.effects.setMode(e, b.options.mode || "show");
            var c = b.options.color || "#ffff99";
            var g = e.css("backgroundColor");
            a.effects.save(e, d);
            e.show();
            e.css({
                backgroundImage: "none",
                backgroundColor: c
            });
            var f = {
                backgroundColor: g
            };
            if (h == "hide") {
                f.opacity = 0
            }
            e.animate(f, {
                queue: false,
                duration: b.duration,
                easing: b.options.easing,
                complete: function () {
                    if (h == "hide") {
                        e.hide()
                    }
                    a.effects.restore(e, d);
                    if (h == "show" && a.browser.msie) {
                        this.style.removeAttribute("filter")
                    }
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);;