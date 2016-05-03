import { ElementRef, DynamicComponentLoader, ComponentRef, Type } from '@angular/core';
export declare class JFwSetting {
    private dcl;
    private elemRef;
    curComp: ComponentRef;
    curType: Type;
    constructor(dcl: DynamicComponentLoader, elemRef: ElementRef);
    showSetting(type: Type, toggle?: boolean): void;
    closeCurComp(): void;
}
