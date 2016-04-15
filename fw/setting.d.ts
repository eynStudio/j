import { ElementRef, DynamicComponentLoader, ComponentRef } from 'angular2/core';
import { Type } from 'angular2/src/facade/lang';
export declare class JFwSetting {
    private dcl;
    private elemRef;
    curComp: ComponentRef;
    curType: Type;
    constructor(dcl: DynamicComponentLoader, elemRef: ElementRef);
    showSetting(type: Type, toggle?: boolean): void;
    closeCurComp(): void;
}
