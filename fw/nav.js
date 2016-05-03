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
var common_1 = require('@angular/common');
var auth_1 = require("../base/auth");
var JFwNavTree = (function () {
    function JFwNavTree(location) {
        this.location = location;
    }
    JFwNavTree.prototype.isActive = function (uri) {
        return this.location.path().startsWith('/' + uri);
    };
    JFwNavTree = __decorate([
        core_1.Component({
            selector: 'j-fw-nav-tree',
            inputs: ['nodes:nodes'],
            template: "<ul class=\"list-group\">\n<li *ngFor=\"let n of nodes\" class=\"list-group-item\">\n    <a *ngIf=\"n.Nodes.length>0\" (click)=\"n.$open=!n.$open\" [ngClass]=\"{active:isActive(n.Uri)}\">\n        <i class=\"fa\" [ngClass]=\"'fa-'+n.M.Icon\"></i>\n        {{n.Mc}}\n    </a>\n    <a *ngIf=\"n.Nodes.length==0\" [href]=\"'#/'+n.Uri.split('.').join('/')\">\n        <i class=\"fa\" [ngClass]=\"'fa-'+n.M.Icon\"></i>\n        {{n.Mc}}\n    </a>\n    <j-fw-nav-tree *ngIf=\"n.Nodes.length>0 && (n.$open||isActive(n.Uri))\" [nodes]=\"n.Nodes\"></j-fw-nav-tree>\n</li>\n</ul>",
            directives: [JFwNavTree, common_1.NgClass],
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], JFwNavTree);
    return JFwNavTree;
}());
exports.JFwNavTree = JFwNavTree;
var JFwNav = (function () {
    function JFwNav(auth) {
        this.auth = auth;
    }
    JFwNav = __decorate([
        core_1.Component({
            selector: 'j-fw-nav',
            template: "<j-fw-nav-tree  [nodes]=\"auth.navs?.Navs\"></j-fw-nav-tree>",
            directives: [JFwNavTree],
        }), 
        __metadata('design:paramtypes', [auth_1.JAuth])
    ], JFwNav);
    return JFwNav;
}());
exports.JFwNav = JFwNav;
