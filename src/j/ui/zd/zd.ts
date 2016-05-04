import {Component,Output,Input,EventEmitter} from '@angular/core';
import {JZd} from "../../base/zd";

@Component({
    selector: 'j-ui-zd',
    template: `<select class="form-control" [ngModel]="dm" (ngModelChange)="dmChange.emit($event)">
                    <option *ngFor="let item of items" [value]='item.Dm'>{{item.Dm}} | {{jc?item.Jc:item.Mc}}</option>
                </select>`,
    directives: [],
})
export class JUiZd  {
    @Output() dmChange:EventEmitter<any>=new EventEmitter();
    @Input('dm') dm:string;
    @Input('j-zd-bq') bq:string;
    @Input('j-zd-jc') jc:boolean=false;
    items:Array<any>;
    constructor(private zd:JZd) {
    }
    ngOnInit() {
        this.zd.get(this.bq).toArray().subscribe(data=> this.items = data);
    }
}