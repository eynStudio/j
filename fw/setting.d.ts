import { ComponentRef, Type, ComponentResolver, ViewContainerRef } from '@angular/core';
export declare class JFwSetting {
    private cmpResolver;
    viewContainer: ViewContainerRef;
    curComp: ComponentRef;
    curType: Type;
    constructor(cmpResolver: ComponentResolver);
    showSetting(type: Type, toggle?: boolean): void;
    closeCurComp(): void;
}
