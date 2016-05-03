import {Directive, ElementRef, EventEmitter} from '@angular/core';
import {JUploader} from './uploader';

@Directive({
    selector: '[j-upload]',
    inputs: ['options: j-upload'],
    outputs: ['onUpload'],
    host: { '(change)': 'onFiles()' }
})
export class JUpload {
    uploader: JUploader;
    options: any;
    onUpload: EventEmitter<any> = new EventEmitter();

    constructor(public el: ElementRef) {
        this.uploader = new JUploader();
        setTimeout(() => {
            this.uploader.setOptions(this.options);
        });

        this.uploader._emitter.subscribe((data) => {
            this.onUpload.emit(data);
        });
    }

    onFiles(): void {
        let files = this.el.nativeElement.files;
        if (files.length) {
            this.uploader.addFilesToQueue(files);
        }
    }
}