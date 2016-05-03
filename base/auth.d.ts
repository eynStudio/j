import { R } from '../core/r';
import { Router } from '@angular/router-deprecated';
import { JLocalStorage } from "../core/localstorage";
export declare class JAuth {
    private localstorage;
    private r;
    private router;
    navs: any;
    Name: string;
    constructor(localstorage: JLocalStorage, r: R, router: Router);
    getNav(): void;
    login(m: any): void;
    logout(): void;
    isLogin(): boolean;
    _logon(data: any): void;
    _logout(data: any): void;
}
