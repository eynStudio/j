import { PipeTransform } from '@angular/core';
import { JZd } from "../base/zd";
export declare class JZdPipe implements PipeTransform {
    private zd;
    private mc;
    constructor(zd: JZd);
    transform(value: string, ...args: any[]): string;
}
export declare class JZdXzqhPipe implements PipeTransform {
    private zd;
    private mc;
    private mc1;
    private mc2;
    private mc3;
    constructor(zd: JZd);
    transform(value: string, ...args: any[]): string;
}
