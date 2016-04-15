import { JCmdCfg } from "../base/cfg";
export interface JSearchCfg {
    msg?: string;
}
export interface JFilterCfg {
    exec: () => any;
}
export interface JBldCfg {
    title: string;
    icon?: string;
    ctrls?: JCmdCfg[];
    tools?: JCmdCfg[];
    opts?: JCmdCfg[];
    search?: JSearchCfg;
    filter?: JFilterCfg;
    ctx?: any;
    footer?: boolean;
    width?: number;
    type?: string;
}
export declare class JFwBld {
    cfg: JBldCfg;
    constructor();
    ctx: any;
    showFooter: any;
}
export declare class JBldNull {
}
export declare class JBldBase {
    cfg: JBldCfg;
    bld: JFwBld;
    constructor(cfg: JBldCfg);
    ctx: any;
    private init();
    private initCmd(x);
}
