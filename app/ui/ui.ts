import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {JBldNull} from "j/fw/bld";

@Component({
    selector: 'jdemo-ui',
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    { path: '/',    component: JBldNull, as: '_HOME' },
])
export class JDemoUi {}