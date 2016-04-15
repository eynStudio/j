"use strict";
var dom = require('../utils/dom');
var _uid = 0;
var Jui = (function () {
    function Jui(elemRef) {
        this.elemRef = elemRef;
        this._id = 'i' + _uid++;
    }
    Jui.prototype.getElemRef = function () {
        return this.elemRef;
    };
    Jui.prototype.getNativeElem = function () {
        return this.elemRef.nativeElement;
    };
    Jui.prototype.getDimensions = function () {
        return dom.getDimensions(this.elemRef.nativeElement, this._id);
    };
    Jui.prototype.width = function () {
        return dom.getDimensions(this.elemRef.nativeElement, this._id).width;
    };
    Jui.prototype.height = function () {
        return dom.getDimensions(this.elemRef.nativeElement, this._id).height;
    };
    Jui.prototype.ngOnDestroy = function () {
        dom.clearDimensions(this._id);
    };
    return Jui;
}());
exports.Jui = Jui;
