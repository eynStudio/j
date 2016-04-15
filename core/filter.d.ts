export interface JRule {
    f: string;
    o: string;
    v1: string;
    v2?: string;
}
export interface JRuleCfg {
    mc: string;
    lx: string;
    m: JRule;
    args?: any;
}
export declare function StrRuleCfg(mc: string, f: string, args?: any): JRuleCfg;
export declare function ZdRuleCfg(mc: string, f: string, args?: any): JRuleCfg;
export declare const StrOpt: string[];
export declare const ZdOpt: string[];
export declare class JFilterCfg {
    rules: JRuleCfg[];
    defaultCfg: Immutable.List<JRuleCfg>;
    constructor(rules: JRuleCfg[]);
    getFilterGroup(): JRule[];
    reset(): void;
}
