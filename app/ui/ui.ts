import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {JBldNull,JFwBld,JBldBase} from "j/fw/bld";
import {JFw} from "j/fw/jfw";


@Component({
    selector: 'gs-xw-filter',
    template: `<j-fw-bld [cfg]="cfg">
    <div class="list-group">
        <li class="list-group-item list-group-item-info">上传论文</li>
    </div>
</j-fw-bld>`,
    directives: [JFwBld]
})

export class JDemoUiFilter extends JBldBase {
    constructor() {
        super({
            title: '授位信息检索',
            tools: [{title: '显示全部'}]
        });
    }
}

@Component({
    selector: 'jdemo-ui',
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    { path: '/',    component: JBldNull, as: '_HOME' },
])
export class JDemoUi {
    constructor(private jfw:JFw){
        jfw.showSetting(JDemoUiFilter)
    }
}