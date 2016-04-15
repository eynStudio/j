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
var JLocalStorage = (function () {
    function JLocalStorage() {
        this._data = {};
    }
    JLocalStorage.prototype.getItem = function (key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
        else {
            return this._data[key];
        }
    };
    JLocalStorage.prototype.setItem = function (key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
        else {
            this._data[key] = value;
        }
    };
    JLocalStorage.prototype.removeItem = function (key) {
        if (window.localStorage) {
            window.localStorage.removeItem(key);
        }
        else {
            delete this._data[key];
        }
    };
    JLocalStorage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], JLocalStorage);
    return JLocalStorage;
}());
exports.JLocalStorage = JLocalStorage;
