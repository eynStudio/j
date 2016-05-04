import {Component, Input, ViewChild} from "@angular/core";
import {PAGINATION_DIRECTIVES} from "../ui/page/page";
import {NgIf, NgFor} from "@angular/common";
import {JCmdCfg} from "../base/cfg";
import {Router} from "@angular/router-deprecated";
import {IStore} from "../base/store";

let defaultCmds = {
    'refresh': ['刷新', 'fa-refresh'],
    'add': ['添加', 'fa-plus'],
    'save': ['保存', 'fa-save'],
    'del': ['删除', 'fa-trash']
};

// export interface JCmdCfg{
//     title?:string;
//     type?:string;
//     icon?:string;
//     tip?:string;
//     can?:()=>boolean;
//     exec?:()=>any;
//     clazz?:string;
// }
export interface JSearchCfg{
    msg?:string;
}
export interface JFilterCfg{
    exec:()=>any;
}
export interface JSavedCfg{
    router?:Router;
    route2?:string;
}
export interface JBldCfg{
    title:string;
    icon?:string;
    ctrls?:JCmdCfg[];
    tools?:JCmdCfg[];
    opts?:JCmdCfg[];
    search?:JSearchCfg;
    filter?:JFilterCfg;
    saved?:JSavedCfg;
    ctx?:IStore;
    footer?:boolean;
    width?:number;
    type?:string; //list,page,
}

@Component({
    selector: 'j-fw-bld',
    directives: [NgFor,NgIf,PAGINATION_DIRECTIVES],
    template: `<div class="card-header">
    <i class="fa" [ngClass]="cfg.icon||'fa-list-alt'"></i>  {{cfg.title}}<code *ngIf="cfg.type=='page'">{{ctx.total}}</code>
</div>
<div class="card-block j-bld-toolbar">
    <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn " [ngClass]="b.clazz||'btn-secondary'" *ngFor="let b of cfg.tools" (click)="b.exec && b.exec()"><i class="fa" [ngClass]="b.icon||'fa-tasks'"></i> {{b.title}}</button>
    </div>
    <div class="btn-group btn-group-sm pull-right j-bld-opts" role="group">
        <button type="button" class="btn btn-link"  *ngIf="cfg.search" (click)="showSearch=!showSearch"><i class="fa fa-search"></i></button>
        <button type="button" class="btn btn-link"  *ngIf="cfg.filter" (click)="cfg.filter.exec()"><i class="fa fa-filter"></i></button>
        <button type="button" class="btn btn-link" *ngFor="let b of cfg.opts" (click)="b.exec && b.exec()"><i class="fa" [ngClass]="b.icon||'fa-tasks'"></i> {{b.title}}</button>
    </div>
</div>
<div class="j-bld-search" *ngIf="showSearch">
    <div class="input-group input-group-sm">
        <input type="text" class="form-control" [attr.placeholder]="cfg.search.msg" [(ngModel)]="cfg.ctx.filter.ext.search">
        <span class="input-group-addon" (click)="cfg.ctx.refresh()">查找</span>
    </div>
</div>
<div class="j-bld-body" [ngClass]="{'j-wi-search':showSearch,'j-wi-footer':showFooter}">
<ng-content></ng-content>
</div>
<div class="card-footer" *ngIf="showFooter">
    <pagination *ngIf="cfg.ctx?.pager" class="pagination-sm pull-sm-right" [boundaryLinks]="true" [totalItems]="cfg.ctx.total" [maxSize]="6"
                [itemsPerPage]="cfg.ctx.filter.ext.perPage" [(ngModel)]="cfg.ctx.filter.ext.page" (pageChanged)="cfg.ctx.pager($event)"></pagination>
</div>`
})
export class JFwBld {
    @Input('cfg') cfg:JBldCfg;

    constructor() {
    }

    get ctx() {
        return this.cfg.ctx;
    }

    get m() {
        return this.cfg.ctx.m;
    }

    get showFooter() {
        return this.cfg.footer || (this.ctx && this.ctx.pager);
    }
}

@Component({
    selector: 'j-bld-null',
    directives: [PAGINATION_DIRECTIVES],
    template: '<router-outlet></router-outlet>',
})
export class JBldNull {}

export class JBldBase {
    @ViewChild(JFwBld) bld:JFwBld;

    constructor(public cfg:JBldCfg) {
        this.init();
    }

    get ctx() {
        return this.cfg.ctx;
    }

    private init() {
        this.cfg.tools && this.cfg.tools.forEach(x=>this.initCmd(x));
        this.cfg.opts && this.cfg.opts.forEach(x=>this.initCmd(x));
        this.cfg.ctrls && this.cfg.ctrls.forEach(x=>this.initCmd(x));

        if (this.cfg.saved && this.ctx) {
            this.ctx.onSaved.subscribe(id=>this.cfg.saved.router.parent.navigate([this.cfg.saved.route2 || './Edit', {id: id}]));
        }
    }

    private initCmd(x:JCmdCfg) {
        if (x.type && defaultCmds[x.type]) {
            x.title = x.title || defaultCmds[x.type][0];
            x.icon = x.icon || defaultCmds[x.type][1];
            if (!x.exec)
                x.exec = ()=>this.ctx && this.ctx[x.type]();
        }
    }

}