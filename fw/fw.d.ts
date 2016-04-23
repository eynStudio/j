import { JAuth } from "../base/auth";
import { JFwSetting } from "./setting";
import { JFw } from "./jfw";
export declare class JFwComp {
    private auth;
    private fw;
    setting: JFwSetting;
    constructor(auth: JAuth, fw: JFw);
}
