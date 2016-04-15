import {Component} from 'angular2/core';
import {NgFor, NgIf, NgClass} from 'angular2/common';
import {Location} from 'angular2/router';
import {JAuth} from "../base/auth";

@Component({
    selector: 'j-fw-nav-tree',
    inputs:['nodes:nodes'],
    template:`<ul class="list-group">
<li *ngFor="#n of nodes" class="list-group-item">
    <a *ngIf="n.Nodes.length>0" (click)="n.$open=!n.$open" [ngClass]="{active:isActive(n.Uri)}">
        <i class="fa" [ngClass]="'fa-'+n.M.Icon"></i>
        {{n.Mc}}
    </a>
    <a *ngIf="n.Nodes.length==0" [href]="'#/'+n.Uri.split('.').join('/')">
        <i class="fa" [ngClass]="'fa-'+n.M.Icon"></i>
        {{n.Mc}}
    </a>
    <j-fw-nav-tree *ngIf="n.Nodes.length>0 && (n.$open||isActive(n.Uri))" [nodes]="n.Nodes"></j-fw-nav-tree>
</li>
</ul>`,
    directives: [NgFor,NgIf,JFwNavTree,NgClass],
})
export class JFwNavTree {
    constructor( private location:Location) {
    }
    isActive(uri:string){
        return this.location.path().startsWith('/'+uri);
    }
}

@Component({
    selector: 'j-fw-nav',
    template:`<j-fw-nav-tree  [nodes]="auth.navs?.Navs"></j-fw-nav-tree>`,
    directives: [JFwNavTree],
})
export class JFwNav {
    constructor( private auth:JAuth) { }
}

