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
var core_1 = require("@angular/core");
var page_1 = require("../ui/page/page");
var common_1 = require("@angular/common");
var defaultCmds = {
    'refresh': ['刷新', 'fa-refresh'],
    'add': ['添加', 'fa-plus'],
    'save': ['保存', 'fa-save'],
    'del': ['删除', 'fa-trash']
};
var JFwBld = (function () {
    function JFwBld() {
    }
    Object.defineProperty(JFwBld.prototype, "ctx", {
        get: function () {
            return this.cfg.ctx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JFwBld.prototype, "m", {
        get: function () {
            return this.cfg.ctx.m;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JFwBld.prototype, "showFooter", {
        get: function () {
            return this.cfg.footer || (this.ctx && this.ctx.pager);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('cfg'), 
        __metadata('design:type', Object)
    ], JFwBld.prototype, "cfg", void 0);
    JFwBld = __decorate([
        core_1.Component({
            selector: 'j-fw-bld',
            directives: [common_1.NgFor, common_1.NgIf, page_1.PAGINATION_DIRECTIVES],
            template: "<div class=\"card-header\">\n    <i class=\"fa\" [ngClass]=\"cfg.icon||'fa-list-alt'\"></i>  {{cfg.title}}<code *ngIf=\"cfg.type=='page'\">{{ctx.total}}</code>\n</div>\n<div class=\"card-block j-bld-toolbar\">\n    <div class=\"btn-group btn-group-sm\" role=\"group\">\n        <button type=\"button\" class=\"btn \" [ngClass]=\"b.clazz||'btn-secondary'\" *ngFor=\"let b of cfg.tools\" (click)=\"b.exec && b.exec()\"><i class=\"fa\" [ngClass]=\"b.icon||'fa-tasks'\"></i> {{b.title}}</button>\n    </div>\n    <div class=\"btn-group btn-group-sm pull-right j-bld-opts\" role=\"group\">\n        <button type=\"button\" class=\"btn btn-link\"  *ngIf=\"cfg.search\" (click)=\"showSearch=!showSearch\"><i class=\"fa fa-search\"></i></button>\n        <button type=\"button\" class=\"btn btn-link\"  *ngIf=\"cfg.filter\" (click)=\"cfg.filter.exec()\"><i class=\"fa fa-filter\"></i></button>\n        <button type=\"button\" class=\"btn btn-link\" *ngFor=\"let b of cfg.opts\" (click)=\"b.exec && b.exec()\"><i class=\"fa\" [ngClass]=\"b.icon||'fa-tasks'\"></i> {{b.title}}</button>\n    </div>\n</div>\n<div class=\"j-bld-search\" *ngIf=\"showSearch\">\n    <div class=\"input-group input-group-sm\">\n        <input type=\"text\" class=\"form-control\" [attr.placeholder]=\"cfg.search.msg\" [(ngModel)]=\"cfg.ctx.filter.ext.search\">\n        <span class=\"input-group-addon\" (click)=\"cfg.ctx.refresh()\">\u67E5\u627E</span>\n    </div>\n</div>\n<div class=\"j-bld-body\" [ngClass]=\"{'j-wi-search':showSearch,'j-wi-footer':showFooter}\">\n<ng-content></ng-content>\n</div>\n<div class=\"card-footer\" *ngIf=\"showFooter\">\n    <pagination *ngIf=\"cfg.ctx?.pager\" class=\"pagination-sm pull-sm-right\" [boundaryLinks]=\"true\" [totalItems]=\"cfg.ctx.total\" [maxSize]=\"6\"\n                [itemsPerPage]=\"cfg.ctx.filter.ext.perPage\" [(ngModel)]=\"cfg.ctx.filter.ext.page\" (pageChanged)=\"cfg.ctx.pager($event)\"></pagination>\n</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], JFwBld);
    return JFwBld;
}());
exports.JFwBld = JFwBld;
var JBldNull = (function () {
    function JBldNull() {
    }
    JBldNull = __decorate([
        core_1.Component({
            selector: 'j-bld-null',
            directives: [page_1.PAGINATION_DIRECTIVES],
            template: '<router-outlet></router-outlet>',
        }), 
        __metadata('design:paramtypes', [])
    ], JBldNull);
    return JBldNull;
}());
exports.JBldNull = JBldNull;
var JBldBase = (function () {
    function JBldBase(cfg) {
        this.cfg = cfg;
        this.init();
    }
    Object.defineProperty(JBldBase.prototype, "ctx", {
        get: function () {
            return this.cfg.ctx;
        },
        enumerable: true,
        configurable: true
    });
    JBldBase.prototype.init = function () {
        var _this = this;
        this.cfg.tools && this.cfg.tools.forEach(function (x) { return _this.initCmd(x); });
        this.cfg.opts && this.cfg.opts.forEach(function (x) { return _this.initCmd(x); });
        this.cfg.ctrls && this.cfg.ctrls.forEach(function (x) { return _this.initCmd(x); });
        if (this.cfg.saved && this.ctx) {
            this.ctx.onSaved.subscribe(function (id) { return _this.cfg.saved.router.parent.navigate([_this.cfg.saved.route2 || './Edit', { id: id }]); });
        }
    };
    JBldBase.prototype.initCmd = function (x) {
        var _this = this;
        if (x.type && defaultCmds[x.type]) {
            x.title = x.title || defaultCmds[x.type][0];
            x.icon = x.icon || defaultCmds[x.type][1];
            if (!x.exec)
                x.exec = function () { return _this.ctx && _this.ctx[x.type](); };
        }
    };
    __decorate([
        core_1.ViewChild(JFwBld), 
        __metadata('design:type', JFwBld)
    ], JBldBase.prototype, "bld", void 0);
    return JBldBase;
}());
exports.JBldBase = JBldBase;
