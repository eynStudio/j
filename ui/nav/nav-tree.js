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
var NavTree = (function () {
    function NavTree() {
    }
    NavTree = __decorate([
        core_1.Component({
            selector: 'nav-tree',
            directives: [router_1.ROUTER_DIRECTIVES, NavTree],
            inputs: ['nodes:nodes'],
            template: "<ul class=\"list-group\">\n<li *ngFor=\"#n of nodes\" class=\"list-group-item\">\n    <a [routerLink]=\"['./Edit',{id:n.M.Id}]\"><i class=\"fa {{'fa-'+n.M.Icon}}\"></i>{{n.Mc}}</a>\n    <i *ngIf=\"n.Nodes.length>0\" class=\"pull-right fa {{n.$open?'fa-chevron-up':'fa-chevron-down'}}\" (click)=\"n.$open=!n.$open\" ></i>\n    <nav-tree *ngIf=\"n.$open && n.Nodes.length>0\" [nodes]=\"n.Nodes\"></nav-tree>\n</li>\n</ul>"
        }), 
        __metadata('design:paramtypes', [])
    ], NavTree);
    return NavTree;
}());
exports.NavTree = NavTree;
