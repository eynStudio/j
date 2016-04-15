import {Component} from 'angular2/core';
import {JFwComp} from "j/fw/fw";
import {JAuth} from "j/base/auth";
import {JZd} from "j/base/zd";
import {Router, RouteConfig} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {JFw} from "j/fw/fw";

@Component({
    selector: 'home',
    directives: [CORE_DIRECTIVES],
    template: `<div class="home jumbotron centered"><h2 >欢迎使用!</h2></div>`
})
export class Home {
    constructor(public router:Router) {
    }
}

@Component({
    selector: 'my-app',
    directives:[JFwComp],
    providers: [JZd,JAuth,JFw],
    template: '<j-fw></j-fw>'
})
@RouteConfig([
    { path: '/',    component: Home, as: 'Home' }
])
export class App { }