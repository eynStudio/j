import { EventEmitter } from "angular2/core";
import { R } from "../core/r";
import { Observable } from "rxjs/Observable";
import { JFilterCfg } from "../core/filter";
export interface IStore {
    refreshOb(): Observable<any>;
    refresh(): any;
    getPath(): Observable<string>;
    getMid(): Observable<string>;
    filter?: any;
    m: any;
    _m: any;
    c: any[];
    NewListStore(cfg: IStoreCfg): any;
    NewPageStore(cfg: IStoreCfg): any;
    NewViewStore(cfg: IStoreCfg): any;
    NewEditStore(cfg: IStoreCfg): any;
    NewWfStore(cfg: IStoreCfg): any;
    NewSubStore(cfg: IStoreCfg): any;
}
export interface IStoreCfg {
    path: string;
    pStore?: IStore;
    useParentPath?: boolean;
    useSelfId?: boolean;
}
export declare class Store implements IStore {
    r: R;
    protected cfg: IStoreCfg;
    onDeleted: EventEmitter<any>;
    onSaved: EventEmitter<any>;
    onRefreshed: EventEmitter<any>;
    filter: any;
    m: any;
    _m: any;
    c: any[];
    constructor(r: R, cfg: IStoreCfg);
    refresh(): void;
    refreshOb(): Observable<any>;
    getMid(): Observable<any>;
    getPath(): Observable<string>;
    pStore: IStore;
    path: string;
    NewListStore(cfg: IStoreCfg): JListStore;
    NewPageStore(cfg: IStoreCfg): JPageStore;
    NewViewStore(cfg: IStoreCfg): JViewStore;
    NewEditStore(cfg: IStoreCfg): JEditStore;
    NewWfStore(cfg: IStoreCfg): JWfStore;
    NewSubStore(cfg: IStoreCfg): JSubStore;
}
export declare class JListStore extends Store {
    total: number;
    filterCfg: JFilterCfg;
    filter: any;
    constructor(r: R, cfg: IStoreCfg);
    refreshOb(): Observable<any>;
    searchOb(): Observable<any>;
    search(): void;
    resetFilterCfg(): void;
}
export declare class JPageStore extends JListStore {
    constructor(r: R, cfg: IStoreCfg);
    pagerOb(page: any): Observable<any>;
    pager(page: any): void;
    refreshOb(): Observable<any>;
}
export declare class JViewStore extends Store {
    id: string;
    constructor(r: R, cfg: IStoreCfg);
    getPath(): Observable<string>;
    getMid(): Observable<string>;
    refreshOb(): Observable<any>;
    refreshP(): void;
    showOb(id: string, refresh?: boolean): Observable<any>;
    show(id: string, refresh?: boolean): void;
}
export declare class JEditStore extends JViewStore {
    constructor(r: R, cfg: IStoreCfg);
    refreshOb(): Observable<any>;
    saveOb(): Observable<any>;
    save(): void;
    delOb(): Observable<any>;
    del(): void;
}
export declare class JWfStore extends JViewStore {
    constructor(r: R, cfg: IStoreCfg);
    refreshOb(): Observable<any>;
    saveOb(jg: number): Observable<any>;
    save(jg: number): void;
}
export declare class JSubStore extends Store {
    constructor(r: R, cfg: IStoreCfg);
    add(m: any): void;
    show(m: any): void;
    save(): void;
    del(): void;
}
export declare class JStore {
    private r;
    constructor(r: R);
    NewListStore(cfg: IStoreCfg): JListStore;
    NewPageStore(cfg: IStoreCfg): JPageStore;
    NewViewStore(cfg: IStoreCfg): JViewStore;
    NewEditStore(cfg: IStoreCfg): JEditStore;
    NewWfStore(cfg: IStoreCfg): JWfStore;
    NewSubStore(cfg: IStoreCfg): JSubStore;
}
