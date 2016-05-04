import {Pipe, PipeTransform} from '@angular/core';
import {JZd} from "../base/zd";

@Pipe({name: 'jZd',pure: false})
export class JZdPipe implements PipeTransform {
    private mc = '(--)';
    constructor(private zd:JZd) {
    }

    transform(value:string, ...args:any[]):string {
        if (value && args[0]) {
            this.zd.get(args[0]).first(x=> x.Dm == value).subscribe(x=> this.mc = args[1] ? x.Jc : x.Mc, x=> x);
        }
        return this.mc;
    }
}

@Pipe({name: 'jZdXzqh',pure: false})
export class JZdXzqhPipe implements PipeTransform {
    private mc = '';
    private mc1 = "";
    private mc2 = "";
    private mc3 = "";

    constructor(private zd:JZd) {
    }

    transform(value:string, ...args:any[]):string {
        if (value && value.length == 6) {
            let dm1 = value.substr(0, 2) + '0000';
            let dm2 = value.substr(0, 4) + '00';
            let lv = 3;
            if (value.substr(2, 4) == '0000') lv = 1;
            else if (value.substr(4, 2) == '00') lv = 2;

            this.zd.get('gb.xzqh').map(data=> {
                if (data.Dm == dm1) this.mc1 = data.Mc;
                else if (data.Dm == dm2) this.mc2 = data.Mc;
                else if (data.Dm == value) this.mc3 = data.Mc;
                return data;
            }).subscribe(x=> {
                if (lv == 1) this.mc = this.mc1;
                else if (lv == 2) this.mc = this.mc1 + this.mc2;
                else this.mc = this.mc1 + this.mc2 + this.mc3;
            }, x=>x);
        }
        return this.mc;
    }
}