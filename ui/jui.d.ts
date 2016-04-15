import { ElementRef } from 'angular2/core';
export declare class Jui {
    protected elemRef: ElementRef;
    private _id;
    constructor(elemRef: ElementRef);
    getElemRef(): ElementRef;
    getNativeElem(): any;
    getDimensions(): {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    width(): number;
    height(): number;
    ngOnDestroy(): void;
}
