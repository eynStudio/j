import {Injectable} from "@angular/core";
import {JAuth} from "j/base/auth";
import { Router } from '@angular/router-deprecated';
import {R} from "j/core/r";
import {JLocalStorage} from "j/core/localstorage";

@Injectable()
export class JDemoAuth extends JAuth{
    constructor( localstorage:JLocalStorage,  r:R, router:Router) {
        super(localstorage,r,router);
    }

    static nav:any={
        Id:"000000000000000000000000",
        Name:"Admin",
        Navs:[
            {Mc:"UI界面效果",Uri:'ui',M:{},Nodes:[]}
            ]
    };

    getNav() {
        this._logon(JDemoAuth.nav);
    }

    login(m){
        this._logon(JDemoAuth.nav);

    }
    logout(){
        this._logout({});
    }
}