import { Location } from '@angular/common';
import { JAuth } from "../base/auth";
export declare class JFwNavTree {
    private location;
    constructor(location: Location);
    isActive(uri: string): boolean;
}
export declare class JFwNav {
    private auth;
    constructor(auth: JAuth);
}
