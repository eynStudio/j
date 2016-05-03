import {Injectable,Type} from '@angular/core';
// import {Type} from '@angular/src/facade/lang';
import {JFwComp} from "./fw";

@Injectable()
export class JFw {
    fw:JFwComp;
    appTitle:string;
    appLogo:string;

    constructor() {
    }

    showSetting(type:Type,toggle:boolean=true){
        this.fw.setting.showSetting(type,toggle);
    }

    closeSetting(){
        this.fw.setting.closeCurComp();
    }
}
