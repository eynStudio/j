import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import {JAuth} from "../base/auth";

@Component({
    selector: 'j-fw-top',
    template:`<a class="navbar-brand" [routerLink]="['./Home']">J-Framework</a>
<div class="top-user pull-xs-right" *ngIf="auth.isLogin()">
    <span>{{auth.Name}}</span>
    <button class="btn btn-secondary btn-sm" (click)="logout()"><i class="fa fa-sign-out"></i></button>
</div>`,
    directives: [RouterLink],
})
export class JFwTop {
    constructor(private auth:JAuth) {
    }

    logout(){
        this.auth.logout();
    }
}