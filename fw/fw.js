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
var nav_1 = require('./nav');
var top_1 = require('./top');
var auth_1 = require("../base/auth");
var setting_1 = require("./setting");
var jfw_1 = require("j/fw/jfw");
var JFwComp = (function () {
    function JFwComp(auth, fw) {
        this.auth = auth;
        this.fw = fw;
        fw.fw = this;
    }
    __decorate([
        core_1.ViewChild(setting_1.JFwSetting), 
        __metadata('design:type', setting_1.JFwSetting)
    ], JFwComp.prototype, "setting", void 0);
    JFwComp = __decorate([
        core_1.Component({
            selector: 'j-fw',
            template: "<j-fw-top role=\"navigation\" class=\"navbar navbar-fixed-top navbar-dark bg-primary j-fw-top-sm\"></j-fw-top>\n<j-fw-nav  *ngIf=\"auth.isLogin()\"></j-fw-nav>\n<router-outlet></router-outlet>\n<j-fw-setting></j-fw-setting>",
            directives: [router_1.RouterOutlet, nav_1.JFwNav, top_1.JFwTop, setting_1.JFwSetting],
        }), 
        __metadata('design:paramtypes', [auth_1.JAuth, (typeof (_a = typeof jfw_1.JFw !== 'undefined' && jfw_1.JFw) === 'function' && _a) || Object])
    ], JFwComp);
    return JFwComp;
    var _a;
}());
exports.JFwComp = JFwComp;
