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
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var localstorage_1 = require('./localstorage');
var R = (function () {
    function R(http, router, localstorage) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
    }
    R.prototype.isJsonType = function (headers) {
        var contentType = headers.get("Content-Type");
        return contentType.indexOf("application/json") > -1;
    };
    R.prototype.request = function (method, url, options) {
        var _this = this;
        var token = this.localstorage.getItem('jbreak.token');
        if (!options)
            options = {};
        options.method = method;
        if (!options.headers)
            options.headers = new http_1.Headers();
        options.headers.append('Authorization', "jBreak " + token);
        options.headers.append('Content-Type', 'application/json');
        return this.http.request(url, options).map(function (res) {
            if (res.status == 401 || res.status == 403) {
                _this.router.navigateByUrl('/login');
            }
            else if (_this.isJsonType(res.headers)) {
                return res.json();
            }
            return res;
        });
    };
    R.prototype.get = function (url, options) {
        return this.request(http_1.RequestMethod.Get, url, options);
    };
    R.prototype.post = function (url, body, options) {
        return this.request(http_1.RequestMethod.Post, url, R.checkOptions(body, options));
    };
    R.prototype.put = function (url, body, options) {
        return this.request(http_1.RequestMethod.Put, url, R.checkOptions(body, options));
    };
    R.prototype.delete = function (url, options) {
        return this.request(http_1.RequestMethod.Delete, url, options);
    };
    R.prototype.patch = function (url, body, options) {
        return this.request(http_1.RequestMethod.Patch, url, R.checkOptions(body, options));
    };
    R.prototype.head = function (url, options) {
        return this.request(http_1.RequestMethod.Head, url, options);
    };
    R.prototype.onErr = function (err) {
        this.router.navigateByUrl('/login');
    };
    R.checkOptions = function (body, options) {
        if (!options)
            options = {};
        if (body)
            options.body = JSON.stringify(body);
        return options;
    };
    R = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router, localstorage_1.JLocalStorage])
    ], R);
    return R;
}());
exports.R = R;
