import {Component, ElementRef, DynamicComponentLoader, ComponentRef,Type} from '@angular/core';
// import {Type} from 'angular2/src/facade/lang';

@Component({
    selector: 'j-fw-setting',
    template: `<div #child></div>`,
    directives: [],
})
export class JFwSetting {
    curComp:ComponentRef;
    curType:Type;
    constructor(private dcl:DynamicComponentLoader,private elemRef: ElementRef) {
    }

    showSetting(type:Type,toggle:boolean=true) {
        if (this.curType == type ) {
            if(toggle)
                this.closeCurComp();
            return;
        } else if (this.curType != null)
            this.closeCurComp();

        this.curType = type;
        this.dcl.loadIntoLocation(type, this.elemRef, 'child').then(x=>this.curComp = x);
    }

    closeCurComp(){
        this.curType=null;
        if(this.curComp) this.curComp.dispose();
    }
}

