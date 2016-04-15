"use strict";
var dimensionCache = {};
function getDimensions(ele, id) {
    var dimensions = dimensionCache[id];
    if (!dimensions) {
        if (ele.offsetWidth && ele.offsetHeight) {
            dimensions = dimensionCache[id] = {
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                left: ele.offsetLeft,
                top: ele.offsetTop
            };
        }
        else {
            return { width: 0, height: 0, left: 0, top: 0 };
        }
    }
    return dimensions;
}
exports.getDimensions = getDimensions;
function flushDimensionCache() {
    dimensionCache = {};
}
exports.flushDimensionCache = flushDimensionCache;
function clearDimensions(id) {
    delete dimensionCache[id];
}
exports.clearDimensions = clearDimensions;
