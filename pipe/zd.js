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
var zd_1 = require("../base/zd");
var JZdPipe = (function () {
    function JZdPipe(zd) {
        this.zd = zd;
        this.mc = '(--)';
    }
    JZdPipe.prototype.transform = function (value) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value && args[0]) {
            this.zd.get(args[0]).first(function (x) { return x.Dm == value; }).subscribe(function (x) { return _this.mc = args[1] ? x.Jc : x.Mc; }, function (x) { return x; });
        }
        return this.mc;
    };
    JZdPipe = __decorate([
        core_1.Pipe({ name: 'jZd', pure: false }), 
        __metadata('design:paramtypes', [zd_1.JZd])
    ], JZdPipe);
    return JZdPipe;
}());
exports.JZdPipe = JZdPipe;
var JZdXzqhPipe = (function () {
    function JZdXzqhPipe(zd) {
        this.zd = zd;
        this.mc = '';
        this.mc1 = "";
        this.mc2 = "";
        this.mc3 = "";
    }
    JZdXzqhPipe.prototype.transform = function (value) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value && value.length == 6) {
            var dm1_1 = value.substr(0, 2) + '0000';
            var dm2_1 = value.substr(0, 4) + '00';
            var lv_1 = 3;
            if (value.substr(2, 4) == '0000')
                lv_1 = 1;
            else if (value.substr(4, 2) == '00')
                lv_1 = 2;
            this.zd.get('gb.xzqh').map(function (data) {
                if (data.Dm == dm1_1)
                    _this.mc1 = data.Mc;
                else if (data.Dm == dm2_1)
                    _this.mc2 = data.Mc;
                else if (data.Dm == value)
                    _this.mc3 = data.Mc;
                return data;
            }).subscribe(function (x) {
                if (lv_1 == 1)
                    _this.mc = _this.mc1;
                else if (lv_1 == 2)
                    _this.mc = _this.mc1 + _this.mc2;
                else
                    _this.mc = _this.mc1 + _this.mc2 + _this.mc3;
            }, function (x) { return x; });
        }
        return this.mc;
    };
    JZdXzqhPipe = __decorate([
        core_1.Pipe({ name: 'jZdXzqh', pure: false }), 
        __metadata('design:paramtypes', [zd_1.JZd])
    ], JZdXzqhPipe);
    return JZdXzqhPipe;
}());
exports.JZdXzqhPipe = JZdXzqhPipe;
