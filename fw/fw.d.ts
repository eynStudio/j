import { Type } from 'angular2/src/facade/lang';
import { JAuth } from "../base/auth";
import { JFwSetting } from "./setting";
export declare class JFw {
    fw: JFwComp;
    constructor();
    showSetting(type: Type, toggle?: boolean): void;
    closeSetting(): void;
}
export declare class JFwComp {
    private auth;
    private fw;
    setting: JFwSetting;
    constructor(auth: JAuth, fw: JFw);
}
