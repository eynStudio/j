import { ElementRef, EventEmitter } from 'angular2/core';
import { JUploader } from './uploader';
export declare class JUpload {
    el: ElementRef;
    uploader: JUploader;
    options: any;
    onUpload: EventEmitter<any>;
    constructor(el: ElementRef);
    onFiles(): void;
}
