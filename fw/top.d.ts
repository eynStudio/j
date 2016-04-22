import { JAuth } from "../base/auth";
import { JFw } from "j/fw/jfw";
export declare class JFwTop {
    private auth;
    private jfw;
    constructor(auth: JAuth, jfw: JFw);
    logout(): void;
    title: string;
}
