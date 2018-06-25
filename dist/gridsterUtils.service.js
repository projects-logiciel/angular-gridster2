"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GridsterUtils = /** @class */ (function () {
    function GridsterUtils() {
    }
    GridsterUtils.merge = function (obj1, obj2, properties) {
        for (var p in obj2) {
            if (obj2[p] !== void 0 && properties.hasOwnProperty(p)) {
                if (typeof obj2[p] === 'object') {
                    obj1[p] = GridsterUtils.merge(obj1[p], obj2[p], properties[p]);
                }
                else {
                    obj1[p] = obj2[p];
                }
            }
        }
        return obj1;
    };
    GridsterUtils.debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    GridsterUtils.checkTouchEvent = function (e) {
        if (e.clientX === undefined && e.touches) {
            if (e.touches && e.touches.length) {
                e.clientX = e.touches[0].clientX;
                e.clientY = e.touches[0].clientY;
            }
            else if (e.changedTouches && e.changedTouches.length) {
                e.clientX = e.changedTouches[0].clientX;
                e.clientY = e.changedTouches[0].clientY;
            }
        }
    };
    GridsterUtils.checkContentClassForEvent = function (gridster, e) {
        if (gridster.$options.draggable.ignoreContent) {
            if (!GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass)) {
                return true;
            }
        }
        else {
            if (GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)) {
                return true;
            }
        }
        return false;
    };
    GridsterUtils.checkContentClassForEmptyCellClickEvent = function (gridster, e) {
        return GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.ignoreContentClass)
            || GridsterUtils.checkContentClass(e.target, e.currentTarget, gridster.$options.draggable.dragHandleClass);
    };
    GridsterUtils.checkContentClass = function (target, current, contentClass) {
        if (!target || target === current) {
            return false;
        }
        if (target.hasAttribute('class') && target.getAttribute('class').split(' ').indexOf(contentClass) > -1) {
            return true;
        }
        else {
            return GridsterUtils.checkContentClass(target.parentNode, current, contentClass);
        }
    };
    GridsterUtils.compareItems = function (a, b) {
        if (a.y > b.y) {
            return -1;
        }
        else if (a.y < b.y) {
            return 1;
        }
        else if (a.x > b.x) {
            return -1;
        }
        else {
            return 1;
        }
    };
    GridsterUtils.decorators = [
        { type: core_1.Injectable },
    ];
    return GridsterUtils;
}());
exports.GridsterUtils = GridsterUtils;
