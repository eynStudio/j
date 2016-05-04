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
var r_1 = require('../core/r');
var Observable_1 = require('rxjs/Observable');
var JZd = (function () {
    function JZd(r) {
        this.r = r;
        this.path = '/api/jbzd/bq/';
        this.zdMap = Immutable.Map();
        this.loadingMap = Immutable.Map();
    }
    JZd.prototype.get = function (bq) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var data = _this.zdMap.get(bq);
            if (data) {
                data.forEach(function (x) { return observer.next(x); });
                observer.complete();
            }
            else {
                if (_this.loadingMap.has(bq)) {
                    var b = _this.loadingMap.get(bq);
                    b.push(observer);
                    _this.loadingMap = _this.loadingMap.set(bq, b);
                }
                else {
                    _this.loadingMap = _this.loadingMap.set(bq, [observer]);
                    _this.r.get(_this.path + bq).subscribe(function (data) {
                        var sorted = Immutable.List(data).filter(function (x) { return x['Qz'] >= 0; }).sort(function (a, b) {
                            if (a['Qz'] > b['Qz'])
                                return -1;
                            else if (a['Qz'] < b['Qz'])
                                return 1;
                            else if (a['Dm'] > b['Dm'])
                                return 1;
                            else if (a['Dm'] < b['Dm'])
                                return -1;
                            else
                                return 0;
                        }).toJS();
                        _this.zdMap = _this.zdMap.set(bq, sorted);
                        _this.loadingMap.get(bq).forEach(function (x) {
                            sorted.forEach(function (d) { return x.next(d); });
                            x.complete();
                        });
                        _this.loadingMap.remove(bq);
                    });
                }
            }
        });
    };
    JZd = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [r_1.R])
    ], JZd);
    return JZd;
}());
exports.JZd = JZd;
