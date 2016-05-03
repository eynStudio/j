import { EventEmitter } from '@angular/core';
import { R } from './r';
import { JFilterCfg } from "./filter";
import { Observable } from "rxjs/Observable";
export interface ResCfg {
    path: string;
    pRes?: IRes;
    paramId?: string;
    useParentPath?: boolean;
    useParentId?: boolean;
}
export interface IRes {
    refreshOb(): Observable<any>;
    refresh(): any;
    getPath(): Observable<string>;
    mid?: Observable<string>;
    filter?: any;
    m: any;
    _m: any;
    c: any[];
}
export declare class Res implements IRes {
    r: R;
    protected cfg: ResCfg;
    onDeleted: EventEmitter<any>;
    onSaved: EventEmitter<any>;
    onRefreshed: EventEmitter<any>;
    m: any;
    _m: any;
    c: any[];
    constructor(r: R, cfg: ResCfg);
    refresh(): void;
    refreshOb(): Observable<any>;
    getPath(): Observable<string>;
    pRes: IRes;
    path: string;
}
export declare class ViewRes extends Res {
    id: string;
    constructor(r: R, cfg: ResCfg);
    getPath(): Observable<string>;
    mid: Observable<string>;
    refreshOb(): Observable<any>;
    refreshP(): void;
    showOb(id: string, refresh?: boolean): Observable<any>;
    show(id: string, refresh?: boolean): void;
}
export declare class EditRes extends ViewRes {
    constructor(r: R, cfg: ResCfg);
    refreshOb(): Observable<any>;
    saveOb(): Observable<any>;
    save(): void;
    delOb(): Observable<any>;
    del(): void;
}
export declare class SubRes extends Res {
    constructor(r: R, cfg: ResCfg);
    add(m: any): void;
    show(m: any): void;
    save(): void;
    del(): void;
}
export declare class WfRes extends ViewRes {
    constructor(r: R, cfg: ResCfg);
    refreshOb(cb?: Function): Observable<any>;
    saveOb(jg: number): Observable<any>;
    save(jg: number): void;
}
export declare class ListRes extends Res {
    total: number;
    filterCfg: JFilterCfg;
    filter: any;
    constructor(r: R, cfg: ResCfg);
    refreshOb(): Observable<any>;
    searchOb(): Observable<any>;
    search(): void;
    resetFilterCfg(): void;
}
export declare class PageRes extends ListRes {
    constructor(r: R, cfg: ResCfg);
    pagerOb(page: any): Observable<any>;
    pager(page: any): void;
    refreshOb(): Observable<any>;
}
export declare class JRes {
    private r;
    constructor(r: R);
    v(cfg: ResCfg): ViewRes;
    e(cfg: ResCfg): EditRes;
    wf(cfg: ResCfg): WfRes;
    l(cfg: ResCfg): ListRes;
    p(cfg: ResCfg): PageRes;
    sub(cfg: ResCfg): SubRes;
}
