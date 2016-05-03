import { JCmdCfg } from "../base/cfg";
import { Router } from "@angular/router-deprecated";
import { IStore } from "../base/store";
export interface JSearchCfg {
    msg?: string;
}
export interface JFilterCfg {
    exec: () => any;
}
export interface JSavedCfg {
    router?: Router;
    route2?: string;
}
export interface JBldCfg {
    title: string;
    icon?: string;
    ctrls?: JCmdCfg[];
    tools?: JCmdCfg[];
    opts?: JCmdCfg[];
    search?: JSearchCfg;
    filter?: JFilterCfg;
    saved?: JSavedCfg;
    ctx?: IStore;
    footer?: boolean;
    width?: number;
    type?: string;
}
export declare class JFwBld {
    cfg: JBldCfg;
    constructor();
    ctx: IStore;
    m: any;
    showFooter: boolean | ((number: any) => void);
}
export declare class JBldNull {
}
export declare class JBldBase {
    cfg: JBldCfg;
    bld: JFwBld;
    constructor(cfg: JBldCfg);
    ctx: IStore;
    private init();
    private initCmd(x);
}
