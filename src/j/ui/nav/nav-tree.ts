import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'nav-tree',
    directives: [ROUTER_DIRECTIVES,NavTree],
    inputs:['nodes:nodes'],
    template: `<ul class="list-group">
<li *ngFor="#n of nodes" class="list-group-item">
    <a [routerLink]="['./Edit',{id:n.M.Id}]"><i class="fa {{'fa-'+n.M.Icon}}"></i>{{n.Mc}}</a>
    <i *ngIf="n.Nodes.length>0" class="pull-right fa {{n.$open?'fa-chevron-up':'fa-chevron-down'}}" (click)="n.$open=!n.$open" ></i>
    <nav-tree *ngIf="n.$open && n.Nodes.length>0" [nodes]="n.Nodes"></nav-tree>
</li>
</ul>`
})
export class NavTree {}