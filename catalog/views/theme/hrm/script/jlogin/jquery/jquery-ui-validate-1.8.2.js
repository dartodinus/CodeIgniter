
(function (b, c) {
    if (b.cleanData) {
        var f = b.cleanData;
        b.cleanData = function (e) {
            for (var a = 0, d;
            (d = e[a]) != null; a++) b(d).triggerHandler("remove");
            f(e)
        }
    } else {
        var g = b.fn.remove;
        b.fn.remove = function (e, a) {
            return this.each(function () {
                if (!a) if (!e || b.filter(e, [this]).length) b("*", this).add([this]).each(function () {
                    b(this).triggerHandler("remove")
                });
                return g.call(b(this), e, a)
            })
        }
    }
    b.widget = function (e, a, d) {
        var h = e.split(".")[0],
            i;
        e = e.split(".")[1];
        i = h + "-" + e;
        if (!d) {
            d = a;
            a = b.Widget
        }
        b.expr[":"][i] = function (j) {
            return !!b.data(j, e)
        };
        b[h] = b[h] || {};
        b[h][e] = function (j, n) {
            arguments.length && this._createWidget(j, n)
        };
        a = new a;
        a.options = b.extend(true, {}, a.options);
        b[h][e].prototype = b.extend(true, a, {
            namespace: h,
            widgetName: e,
            widgetEventPrefix: b[h][e].prototype.widgetEventPrefix || e,
            widgetBaseClass: i
        }, d);
        b.widget.bridge(e, b[h][e])
    };
    b.widget.bridge = function (e, a) {
        b.fn[e] = function (d) {
            var h = typeof d === "string",
                i = Array.prototype.slice.call(arguments, 1),
                j = this;
            d = !h && i.length ? b.extend.apply(null, [true, d].concat(i)) : d;
            if (h && d.charAt(0) === "_") return j;
            h ? this.each(function () {
                var n = b.data(this, e),
                    q = n && b.isFunction(n[d]) ? n[d].apply(n, i) : n;
                if (q !== n && q !== c) {
                    j = q;
                    return false
                }
            }) : this.each(function () {
                var n = b.data(this, e);
                n ? n.option(d || {})._init() : b.data(this, e, new a(d, this))
            });
            return j
        }
    };
    b.Widget = function (e, a) {
        arguments.length && this._createWidget(e, a)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (e, a) {
            b.data(a, this.widgetName, this);
            this.element = b(a);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), e);
            var d = this;
            this.element.bind("remove." + this.widgetName, function () {
                d.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (e, a) {
            var d = e;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof e === "string") {
                if (a === c) return this.options[e];
                d = {};
                d[e] = a
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function (e) {
            var a = this;
            b.each(e, function (d, h) {
                a._setOption(d, h)
            });
            return this
        },
        _setOption: function (e, a) {
            this.options[e] = a;
            if (e === "disabled") this.widget()[a ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", a);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (e, a, d) {
            var h = this.options[e];
            a = b.Event(a);
            a.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase();
            d = d || {};
            if (a.originalEvent) {
                e = b.event.props.length;
                for (var i; e;) {
                    i = b.event.props[--e];
                    a[i] = a.originalEvent[i]
                }
            }
            this.element.trigger(a, d);
            return !(b.isFunction(h) && h.call(this.element[0], a, d) === false || a.isDefaultPrevented())
        }
    }
})(jQuery);

(function (b) {
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function (f) {
                return c._mouseDown(f)
            }).bind("click." + this.widgetName, function (f) {
                if (c._preventClickEvent) {
                    c._preventClickEvent = false;
                    f.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (c) {
            c.originalEvent = c.originalEvent || {};
            if (!c.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(c);
                this._mouseDownEvent = c;
                var f = this,
                    g = c.which == 1,
                    e = typeof this.options.cancel == "string" ? b(c.target).parents().add(c.target).filter(this.options.cancel).length : false;
                if (!g || e || !this._mouseCapture(c)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                    f.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                    this._mouseStarted = this._mouseStart(c) !== false;
                    if (!this._mouseStarted) {
                        c.preventDefault();
                        return true
                    }
                }
                this._mouseMoveDelegate = function (a) {
                    return f._mouseMove(a)
                };
                this._mouseUpDelegate = function (a) {
                    return f._mouseUp(a)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.preventDefault();
                return c.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function (c) {
            if (b.browser.msie && !(document.documentMode >= 9) && !c.button) return this._mouseUp(c);
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault()
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c);
            return !this._mouseStarted
        },
        _mouseUp: function (c) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = c.target == this._mouseDownEvent.target;
                this._mouseStop(c)
            }
            return false
        },
        _mouseDistanceMet: function (c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);

(function (b) {
    b.widget("ui.sortable", b.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
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
            zIndex: 1E3
        },
        _create: function () {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) this.items[c].item.removeData("sortable-item");
            return this
        },
        _setOption: function (c, f) {
            if (c === "disabled") {
                this.options[c] = f;
                this.widget()[f ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else b.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (c, f) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(c);
            var g = null,
                e = this;
            b(c.target).parents().each(function () {
                if (b.data(this, "sortable-item") == e) {
                    g = b(this);
                    return false
                }
            });
            if (b.data(c.target, "sortable-item") == e) g = b(c.target);
            if (!g) return false;
            if (this.options.handle && !f) {
                var a = false;
                b(this.options.handle, g).find("*").andSelf().each(function () {
                    if (this == c.target) a = true
                });
                if (!a) return false
            }
            this.currentItem = g;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (c, f, g) {
            f = this.options;
            var e = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(c);
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
            b.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            f.containment && this._setContainment();
            if (f.cursor) {
                if (b("body").css("cursor")) this._storedCursor = b("body").css("cursor");
                b("body").css("cursor", f.cursor)
            }
            if (f.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", f.opacity)
            }
            if (f.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", f.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", c, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!g) for (g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", c, e._uiHash(this));
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(c);
            return true
        },
        _mouseDrag: function (c) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var f = this.options,
                    g = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - c.pageY < f.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop + f.scrollSpeed;
                    else if (c.pageY - this.overflowOffset.top < f.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop - f.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - c.pageX < f.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft + f.scrollSpeed;
                    else if (c.pageX - this.overflowOffset.left < f.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft - f.scrollSpeed
                } else {
                    if (c.pageY - b(document).scrollTop() < f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() - f.scrollSpeed);
                    else if (b(window).height() - (c.pageY - b(document).scrollTop()) < f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() + f.scrollSpeed);
                    if (c.pageX - b(document).scrollLeft() < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() - f.scrollSpeed);
                    else if (b(window).width() - (c.pageX - b(document).scrollLeft()) < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() + f.scrollSpeed)
                }
                g !== false && b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (f = this.items.length - 1; f >= 0; f--) {
                g = this.items[f];
                var e = g.item[0],
                    a = this._intersectsWithPointer(g);
                if (a) if (e != this.currentItem[0] && this.placeholder[a == 1 ? "next" : "prev"]()[0] != e && !b.ui.contains(this.placeholder[0], e) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0], e) : true)) {
                    this.direction = a == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(g)) this._rearrange(c, g);
                    else break;
                    this._trigger("change", c, this._uiHash());
                    break
                }
            }
            this._contactContainers(c);
            b.ui.ddmanager && b.ui.ddmanager.drag(this, c);
            this._trigger("sort", c, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, f) {
            if (c) {
                b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, c);
                if (this.options.revert) {
                    var g = this;
                    f = g.placeholder.offset();
                    g.reverting = true;
                    b(this.helper).animate({
                        left: f.left - this.offset.parent.left - g.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: f.top - this.offset.parent.top - g.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        g._clear(c)
                    })
                } else this._clear(c, f);
                return false
            }
        },
        cancel: function () {
            var c = this;
            if (this.dragging) {
                this._mouseUp();
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var f = this.containers.length - 1; f >= 0; f--) {
                    this.containers[f]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[f].containerCache.over) {
                        this.containers[f]._trigger("out", null, c._uiHash(this));
                        this.containers[f].containerCache.over = 0
                    }
                }
            }
            this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
            b.extend(this, {
                helper: null,
                dragging: false,
                reverting: false,
                _noFinalSort: null
            });
            this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem);
            return this
        },
        serialize: function (c) {
            var f = this._getItemsAsjQuery(c && c.connected),
                g = [];
            c = c || {};
            b(f).each(function () {
                var e = (b(c.item || this).attr(c.attribute || "id") || "").match(c.expression || /(.+)[-=_](.+)/);
                if (e) g.push((c.key || e[1] + "[]") + "=" + (c.key && c.expression ? e[1] : e[2]))
            });
            !g.length && c.key && g.push(c.key + "=");
            return g.join("&")
        },
        toArray: function (c) {
            var f = this._getItemsAsjQuery(c && c.connected),
                g = [];
            c = c || {};
            f.each(function () {
                g.push(b(c.item || this).attr(c.attribute || "id") || "")
            });
            return g
        },
        _intersectsWith: function (c) {
            var f = this.positionAbs.left,
                g = f + this.helperProportions.width,
                e = this.positionAbs.top,
                a = e + this.helperProportions.height,
                d = c.left,
                h = d + c.width,
                i = c.top,
                j = i + c.height,
                n = this.offset.click.top,
                q = this.offset.click.left;
            n = e + n > i && e + n < j && f + q > d && f + q < h;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > c[this.floating ? "width" : "height"] ? n : d < f + this.helperProportions.width / 2 && g - this.helperProportions.width / 2 < h && i < e + this.helperProportions.height / 2 && a - this.helperProportions.height / 2 < j
        },
        _intersectsWithPointer: function (c) {
            var f = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left, c.width);
            f = f && c;
            c = this._getDragVerticalDirection();
            var g = this._getDragHorizontalDirection();
            if (!f) return false;
            return this.floating ? g && g == "right" || c == "down" ? 2 : 1 : c && (c == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (c) {
            var f = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top + c.height / 2, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left + c.width / 2, c.width);
            var g = this._getDragVerticalDirection(),
                e = this._getDragHorizontalDirection();
            return this.floating && e ? e == "right" && c || e == "left" && !c : g && (g == "down" && f || g == "up" && !f)
        },
        _getDragVerticalDirection: function () {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right" : "left")
        },
        refresh: function (c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function (c) {
            var f = [],
                g = [],
                e = this._connectWith();
            if (e && c) for (c = e.length - 1; c >= 0; c--) for (var a = b(e[c]), d = a.length - 1; d >= 0; d--) {
                var h = b.data(a[d], "sortable");
                if (h && h != this && !h.options.disabled) g.push([b.isFunction(h.options.items) ? h.options.items.call(h.element) : b(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
            }
            g.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (c = g.length - 1; c >= 0; c--) g[c][0].each(function () {
                f.push(this)
            });
            return b(f)
        },
        _removeCurrentsFromItems: function () {
            for (var c = this.currentItem.find(":data(sortable-item)"), f = 0; f < this.items.length; f++) for (var g = 0; g < c.length; g++) c[g] == this.items[f].item[0] && this.items.splice(f, 1)
        },
        _refreshItems: function (c) {
            this.items = [];
            this.containers = [this];
            var f = this.items,
                g = [
                    [b.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                        item: this.currentItem
                    }) : b(this.options.items, this.element), this]
                ],
                e = this._connectWith();
            if (e) for (var a = e.length - 1; a >= 0; a--) for (var d = b(e[a]), h = d.length - 1; h >= 0; h--) {
                var i = b.data(d[h], "sortable");
                if (i && i != this && !i.options.disabled) {
                    g.push([b.isFunction(i.options.items) ? i.options.items.call(i.element[0], c, {
                        item: this.currentItem
                    }) : b(i.options.items, i.element), i]);
                    this.containers.push(i)
                }
            }
            for (a = g.length - 1; a >= 0; a--) {
                c = g[a][1];
                e = g[a][0];
                h = 0;
                for (d = e.length; h < d; h++) {
                    i = b(e[h]);
                    i.data("sortable-item", c);
                    f.push({
                        item: i,
                        instance: c,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (c) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var f = this.items.length - 1; f >= 0; f--) {
                var g = this.items[f],
                    e = this.options.toleranceElement ? b(this.options.toleranceElement, g.item) : g.item;
                if (!c) {
                    g.width = e.outerWidth();
                    g.height = e.outerHeight()
                }
                e = e.offset();
                g.left = e.left;
                g.top = e.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (f = this.containers.length - 1; f >= 0; f--) {
                e = this.containers[f].element.offset();
                this.containers[f].containerCache.left = e.left;
                this.containers[f].containerCache.top = e.top;
                this.containers[f].containerCache.width = this.containers[f].element.outerWidth();
                this.containers[f].containerCache.height = this.containers[f].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (c) {
            var f = c || this,
                g = f.options;
            if (!g.placeholder || g.placeholder.constructor == String) {
                var e = g.placeholder;
                g.placeholder = {
                    element: function () {
                        var a = b(document.createElement(f.currentItem[0].nodeName)).addClass(e || f.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!e) a.style.visibility = "hidden";
                        return a
                    },
                    update: function (a, d) {
                        if (!(e && !g.forcePlaceholderSize)) {
                            d.height() || d.height(f.currentItem.innerHeight() - parseInt(f.currentItem.css("paddingTop") || 0, 10) - parseInt(f.currentItem.css("paddingBottom") || 0, 10));
                            d.width() || d.width(f.currentItem.innerWidth() - parseInt(f.currentItem.css("paddingLeft") || 0, 10) - parseInt(f.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            f.placeholder = b(g.placeholder.element.call(f.element, f.currentItem));
            f.currentItem.after(f.placeholder);
            g.placeholder.update(f, f.placeholder)
        },
        _contactContainers: function (c) {
            for (var f = null, g = null, e = this.containers.length - 1; e >= 0; e--) if (!b.ui.contains(this.currentItem[0], this.containers[e].element[0])) if (this._intersectsWith(this.containers[e].containerCache)) {
                if (!(f && b.ui.contains(this.containers[e].element[0], f.element[0]))) {
                    f = this.containers[e];
                    g = e
                }
            } else if (this.containers[e].containerCache.over) {
                this.containers[e]._trigger("out", c, this._uiHash(this));
                this.containers[e].containerCache.over = 0
            }
            if (f) if (this.containers.length === 1) {
                this.containers[g]._trigger("over", c, this._uiHash(this));
                this.containers[g].containerCache.over = 1
            } else if (this.currentContainer != this.containers[g]) {
                f = 1E4;
                e = null;
                for (var a = this.positionAbs[this.containers[g].floating ? "left" : "top"], d = this.items.length - 1; d >= 0; d--) if (b.ui.contains(this.containers[g].element[0], this.items[d].item[0])) {
                    var h = this.items[d][this.containers[g].floating ? "left" : "top"];
                    if (Math.abs(h - a) < f) {
                        f = Math.abs(h - a);
                        e = this.items[d]
                    }
                }
                if (e || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[g];
                    e ? this._rearrange(c, e, null, true) : this._rearrange(c, null, this.containers[g].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[g]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[g]._trigger("over", c, this._uiHash(this));
                    this.containers[g].containerCache.over = 1
                }
            }
        },
        _createHelper: function (c) {
            var f = this.options;
            c = b.isFunction(f.helper) ? b(f.helper.apply(this.element[0], [c, this.currentItem])) : f.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            c.parents("body").length || b(f.appendTo != "parent" ? f.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0]);
            if (c[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (c[0].style.width == "" || f.forceHelperSize) c.width(this.currentItem.width());
            if (c[0].style.height == "" || f.forceHelperSize) c.height(this.currentItem.height());
            return c
        },
        _adjustOffsetFromHelper: function (c) {
            if (typeof c == "string") c = c.split(" ");
            if (b.isArray(c)) c = {
                left: +c[0],
                top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) c = {
                top: 0,
                left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment)) {
                var f = b(c.containment)[0];
                c = b(c.containment).offset();
                var g = b(f).css("overflow") != "hidden";
                this.containment = [c.left + (parseInt(b(f).css("borderLeftWidth"), 10) || 0) + (parseInt(b(f).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(b(f).css("borderTopWidth"), 10) || 0) + (parseInt(b(f).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (g ? Math.max(f.scrollWidth, f.offsetWidth) : f.offsetWidth) - (parseInt(b(f).css("borderLeftWidth"), 10) || 0) - (parseInt(b(f).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (g ? Math.max(f.scrollHeight, f.offsetHeight) : f.offsetHeight) - (parseInt(b(f).css("borderTopWidth"), 10) || 0) - (parseInt(b(f).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (c, f) {
            if (!f) f = this.position;
            c = c == "absolute" ? 1 : -1;
            var g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(g[0].tagName);
            return {
                top: f.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : g.scrollTop()) * c),
                left: f.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : g.scrollLeft()) * c)
            }
        },
        _generatePosition: function (c) {
            var f = this.options,
                g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(g[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var a = c.pageX,
                d = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) a = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) d = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) a = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) d = this.containment[3] + this.offset.click.top
                }
                if (f.grid) {
                    d = this.originalPageY + Math.round((d - this.originalPageY) / f.grid[1]) * f.grid[1];
                    d = this.containment ? !(d - this.offset.click.top < this.containment[1] || d - this.offset.click.top > this.containment[3]) ? d : !(d - this.offset.click.top < this.containment[1]) ? d - f.grid[1] : d + f.grid[1] : d;
                    a = this.originalPageX + Math.round((a - this.originalPageX) / f.grid[0]) * f.grid[0];
                    a = this.containment ? !(a - this.offset.click.left < this.containment[0] || a - this.offset.click.left > this.containment[2]) ? a : !(a - this.offset.click.left < this.containment[0]) ? a - f.grid[0] : a + f.grid[0] : a
                }
            }
            return {
                top: d - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : g.scrollTop()),
                left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : g.scrollLeft())
            }
        },
        _rearrange: function (c, f, g, e) {
            g ? g[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? f.item[0] : f.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var a = this,
                d = this.counter;
            window.setTimeout(function () {
                d == a.counter && a.refreshPositions(!e)
            }, 0)
        },
        _clear: function (c, f) {
            this.reverting = false;
            var g = [];
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS) if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") this._storedCSS[e] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !f && g.push(function (a) {
                this._trigger("receive", a, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !f) g.push(function (a) {
                this._trigger("update", a, this._uiHash())
            });
            if (!b.ui.contains(this.element[0], this.currentItem[0])) {
                f || g.push(function (a) {
                    this._trigger("remove", a, this._uiHash())
                });
                for (e = this.containers.length - 1; e >= 0; e--) if (b.ui.contains(this.containers[e].element[0], this.currentItem[0]) && !f) {
                    g.push(function (a) {
                        return function (d) {
                            a._trigger("receive", d, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    g.push(function (a) {
                        return function (d) {
                            a._trigger("update", d, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]))
                }
            }
            for (e = this.containers.length - 1; e >= 0; e--) {
                f || g.push(function (a) {
                    return function (d) {
                        a._trigger("deactivate", d, this._uiHash(this))
                    }
                }.call(this, this.containers[e]));
                if (this.containers[e].containerCache.over) {
                    g.push(function (a) {
                        return function (d) {
                            a._trigger("out", d, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    this.containers[e].containerCache.over = 0
                }
            }
            this._storedCursor && b("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!f) {
                    this._trigger("beforeStop", c, this._uiHash());
                    for (e = 0; e < g.length; e++) g[e].call(this, c);
                    this._trigger("stop", c, this._uiHash())
                }
                return false
            }
            f || this._trigger("beforeStop", c, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!f) {
                for (e = 0; e < g.length; e++) g[e].call(this, c);
                this._trigger("stop", c, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            b.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (c) {
            var f = c || this;
            return {
                helper: f.helper,
                placeholder: f.placeholder || b([]),
                position: f.position,
                originalPosition: f.originalPosition,
                offset: f.positionAbs,
                item: f.currentItem,
                sender: c ? c.element : null
            }
        }
    });
    b.extend(b.ui.sortable, {
        version: "1.8.6"
    })
})(jQuery);
