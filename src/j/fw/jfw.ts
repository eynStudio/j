import {Injectable} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
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
