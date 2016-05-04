import {Component, ElementRef, ComponentFactory, ComponentRef,Type,ComponentResolver,ViewContainerRef,ViewChild} from '@angular/core';

@Component({
    selector: 'j-fw-setting',
    template: `<div #container></div>`,
    directives: [],
})
export class JFwSetting {
    @ViewChild('container', {read: ViewContainerRef}) viewContainer : ViewContainerRef;
    curComp:ComponentRef;
    curType:Type;
    constructor(private cmpResolver: ComponentResolver) {
    }

    showSetting(type:Type,toggle:boolean=true) {

        if (this.curType == type ) {
            if(toggle){
                this.closeCurComp();
            }
            return;
        } else if (this.curType != null){
            this.closeCurComp();
        }

        this.curType = type;
        this.cmpResolver.resolveComponent(type)
            .then((factory: ComponentFactory) => {
                this.curComp =   this.viewContainer.createComponent(factory, 0, this.viewContainer.injector)
            });

    }

    closeCurComp(){
        this.curType=null;
        this.viewContainer.clear();
    }
}

