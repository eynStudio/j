import { EventEmitter } from '@angular/core';
import { JZd } from "../../base/zd";
export declare class JUiZd {
    private zd;
    dmChange: EventEmitter<any>;
    dm: string;
    bq: string;
    jc: boolean;
    items: Array<any>;
    constructor(zd: JZd);
    ngOnInit(): void;
}
