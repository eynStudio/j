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
var router_deprecated_1 = require('@angular/router-deprecated');
var localstorage_1 = require("../core/localstorage");
var JAuth = (function () {
    function JAuth(localstorage, r, router) {
        this.localstorage = localstorage;
        this.r = r;
        this.router = router;
    }
    JAuth.prototype.getNav = function () {
        var _this = this;
        this.r.get('/api/auth')
            .subscribe(function (data) { return _this._logon(data); }, function (error) { return _this.r.onErr(error); });
    };
    JAuth.prototype.login = function (m) {
        var _this = this;
        this.r.post('/api/auth', m).subscribe(function (data) {
            if (data.Err) {
                alert(data.Err);
            }
            else {
                _this._logon(data);
            }
        });
    };
    JAuth.prototype.logout = function () {
        var _this = this;
        this.r.delete('/api/auth').subscribe(function (data) {
            if (data.Err) {
                alert(data.Err);
            }
            else {
                _this._logout(data);
            }
        });
    };
    JAuth.prototype.isLogin = function () {
        return this.localstorage.getItem('jbreak.token') != null;
    };
    JAuth.prototype._logon = function (data) {
        this.localstorage.setItem('jbreak.token', data.Id);
        this.navs = data;
        this.Name = this.navs.Name;
    };
    JAuth.prototype._logout = function (data) {
        this.localstorage.removeItem('jbreak.token');
        this.navs = null;
        this.Name = null;
        this.router.navigateByUrl('/login');
    };
    JAuth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [localstorage_1.JLocalStorage, r_1.R, router_deprecated_1.Router])
    ], JAuth);
    return JAuth;
}());
exports.JAuth = JAuth;
