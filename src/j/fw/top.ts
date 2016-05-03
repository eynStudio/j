import {Component} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import {JAuth} from "../base/auth";
import {JFw} from "./jfw";

@Component({
    selector: 'j-fw-top',
    template:`<a class="navbar-brand" [routerLink]="['./Home']"> {{title}} </a>
<div class="top-user pull-xs-right" *ngIf="auth.isLogin()">
    <span>{{auth.Name}}</span>
    <button class="btn btn-secondary btn-sm" (click)="logout()"><i class="fa fa-sign-out"></i></button>
</div>`,
    directives: [RouterLink],
})
export class JFwTop {
    constructor(private auth:JAuth,private jfw:JFw) {
    }

    logout(){
        this.auth.logout();
    }
    get title():string {
        return this.jfw.appTitle || 'J-Framework';
    }
}