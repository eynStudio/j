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
var JFwSetting = (function () {
    function JFwSetting(cmpResolver) {
        this.cmpResolver = cmpResolver;
    }
    JFwSetting.prototype.showSetting = function (type, toggle) {
        var _this = this;
        if (toggle === void 0) { toggle = true; }
        if (this.curType == type) {
            if (toggle) {
                this.closeCurComp();
            }
            return;
        }
        else if (this.curType != null) {
            this.closeCurComp();
        }
        this.curType = type;
        this.cmpResolver.resolveComponent(type)
            .then(function (factory) {
            _this.curComp = _this.viewContainer.createComponent(factory, 0, _this.viewContainer.injector);
        });
    };
    JFwSetting.prototype.closeCurComp = function () {
        this.curType = null;
        this.viewContainer.clear();
    };
    __decorate([
        core_1.ViewChild('container', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], JFwSetting.prototype, "viewContainer", void 0);
    JFwSetting = __decorate([
        core_1.Component({
            selector: 'j-fw-setting',
            template: "<div #container></div>",
            directives: [],
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver])
    ], JFwSetting);
    return JFwSetting;
}());
exports.JFwSetting = JFwSetting;
