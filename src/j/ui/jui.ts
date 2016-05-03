import {ElementRef} from '@angular/core';
import * as dom from '../utils/dom';

let _uid:number = 0;

// All UI components base
export class Jui {
    private _id: string;

    constructor(protected elemRef: ElementRef) {
        this._id = 'i' + _uid++;
    }

    getElemRef(): ElementRef {
        return this.elemRef;
    }

    getNativeElem(): any {
        return this.elemRef.nativeElement;
    }

    getDimensions(): {
        width: number, height: number, left: number, top: number
    } {
        return dom.getDimensions(this.elemRef.nativeElement, this._id);
    }

    width(): number {
        return dom.getDimensions(this.elemRef.nativeElement, this._id).width;
    }

    height(): number {
        return dom.getDimensions(this.elemRef.nativeElement, this._id).height;
    }

    ngOnDestroy() {
        dom.clearDimensions(this._id);
    }

}