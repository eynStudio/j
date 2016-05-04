"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var zd_1 = require("../../base/zd");
var JUiZd = (function () {
    function JUiZd(zd) {
        this.zd = zd;
        this.dmChange = new core_1.EventEmitter();
        this.jc = false;
    }
    JUiZd.prototype.ngOnInit = function () {
        var _this = this;
        this.zd.get(this.bq).toArray().subscribe(function (data) { return _this.items = data; });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], JUiZd.prototype, "dmChange", void 0);
    __decorate([
        core_1.Input('dm'), 
        __metadata('design:type', String)
    ], JUiZd.prototype, "dm", void 0);
    __decorate([
        core_1.Input('j-zd-bq'), 
        __metadata('design:type', String)
    ], JUiZd.prototype, "bq", void 0);
    __decorate([
        core_1.Input('j-zd-jc'), 
        __metadata('design:type', Boolean)
    ], JUiZd.prototype, "jc", void 0);
    JUiZd = __decorate([
        core_1.Component({
            selector: 'j-ui-zd',
            template: "<select class=\"form-control\" [ngModel]=\"dm\" (ngModelChange)=\"dmChange.emit($event)\">\n                    <option *ngFor=\"let item of items\" [value]='item.Dm'>{{item.Dm}} | {{jc?item.Jc:item.Mc}}</option>\n                </select>",
            directives: [],
        }), 
        __metadata('design:paramtypes', [zd_1.JZd])
    ], JUiZd);
    return JUiZd;
}());
exports.JUiZd = JUiZd;
