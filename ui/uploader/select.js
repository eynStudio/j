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
var uploader_1 = require('./uploader');
var JUpload = (function () {
    function JUpload(el) {
        var _this = this;
        this.el = el;
        this.onUpload = new core_1.EventEmitter();
        this.uploader = new uploader_1.JUploader();
        setTimeout(function () {
            _this.uploader.setOptions(_this.options);
        });
        this.uploader._emitter.subscribe(function (data) {
            _this.onUpload.emit(data);
        });
    }
    JUpload.prototype.onFiles = function () {
        var files = this.el.nativeElement.files;
        if (files.length) {
            this.uploader.addFilesToQueue(files);
        }
    };
    JUpload = __decorate([
        core_1.Directive({
            selector: '[j-upload]',
            inputs: ['options: j-upload'],
            outputs: ['onUpload'],
            host: { '(change)': 'onFiles()' }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], JUpload);
    return JUpload;
}());
exports.JUpload = JUpload;
