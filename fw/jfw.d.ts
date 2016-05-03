import { Type } from '@angular/core';
import { JFwComp } from "./fw";
export declare class JFw {
    fw: JFwComp;
    appTitle: string;
    appLogo: string;
    constructor();
    showSetting(type: Type, toggle?: boolean): void;
    closeSetting(): void;
}
