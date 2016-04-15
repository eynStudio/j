import {Component, Injectable, ViewChild} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {  RouterOutlet } from 'angular2/router';
import { JFwNav } from './nav';
import { JFwTop } from './top';
import {JAuth} from "../base/auth";
import {JFwSetting} from "./setting";

@Injectable()
export class JFw {
    fw:JFwComp;

    constructor() {
    }

    showSetting(type:Type,toggle:boolean=true){
        this.fw.setting.showSetting(type,toggle);
    }

    closeSetting(){
        this.fw.setting.closeCurComp();
    }
}

@Component({
    selector: 'j-fw',
    template:`<j-fw-top role="navigation" class="navbar navbar-fixed-top navbar-dark bg-primary j-fw-top-sm"></j-fw-top>
<j-fw-nav  *ngIf="auth.isLogin()"></j-fw-nav>
<router-outlet></router-outlet>
<j-fw-setting></j-fw-setting>`,
    directives: [RouterOutlet,JFwNav,JFwTop,JFwSetting],
})
export class JFwComp {
    @ViewChild(JFwSetting) setting:JFwSetting;

    constructor(private auth:JAuth,private fw:JFw) {
        fw.fw=this;
    }

}