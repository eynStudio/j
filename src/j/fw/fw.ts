import {Component, ViewChild} from '@angular/core';
import {  RouterOutlet } from '@angular/router-deprecated';
import { JFwNav } from './nav';
import { JFwTop } from './top';
import {JAuth} from "../base/auth";
import {JFwSetting} from "./setting";
import {JFw} from "./jfw";

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