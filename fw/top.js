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
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var auth_1 = require("../base/auth");
var jfw_1 = require("j/fw/jfw");
var JFwTop = (function () {
    function JFwTop(auth, jfw) {
        this.auth = auth;
        this.jfw = jfw;
    }
    JFwTop.prototype.logout = function () {
        this.auth.logout();
    };
    Object.defineProperty(JFwTop.prototype, "title", {
        get: function () {
            return this.jfw.appTitle || 'J-Framework';
        },
        enumerable: true,
        configurable: true
    });
    JFwTop = __decorate([
        core_1.Component({
            selector: 'j-fw-top',
            template: "<a class=\"navbar-brand\" [routerLink]=\"['./Home']\"> {{title}} </a>\n<div class=\"top-user pull-xs-right\" *ngIf=\"auth.isLogin()\">\n    <span>{{auth.Name}}</span>\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"logout()\"><i class=\"fa fa-sign-out\"></i></button>\n</div>",
            directives: [router_1.RouterLink],
        }), 
        __metadata('design:paramtypes', [auth_1.JAuth, (typeof (_a = typeof jfw_1.JFw !== 'undefined' && jfw_1.JFw) === 'function' && _a) || Object])
    ], JFwTop);
    return JFwTop;
    var _a;
}());
exports.JFwTop = JFwTop;
