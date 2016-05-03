declare module "j/core/localstorage" {
    export class JLocalStorage {
        _data: any;
        getItem(key: string): any;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
    }
}
declare module "j/core/r" {
    import { Http, Headers, RequestOptionsArgs, RequestMethod } from '@angular/http';
    import { Observable } from 'rxjs/Observable';
    import { Router } from '@angular/router-deprecated';
    import { JLocalStorage } from "j/core/localstorage";
    export class R {
        private http;
        private router;
        private localstorage;
        constructor(http: Http, router: Router, localstorage: JLocalStorage);
        isJsonType(headers: Headers): boolean;
        request(method: RequestMethod, url: string, options?: RequestOptionsArgs): Observable<any>;
        get(url: string, options?: RequestOptionsArgs): Observable<any>;
        post(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
        put(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
        delete(url: string, options?: RequestOptionsArgs): Observable<any>;
        patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
        head(url: string, options?: RequestOptionsArgs): Observable<any>;
        onErr(err: any): void;
        private static checkOptions(body?, options?);
    }
}
declare module "j/base/auth" {
    import { R } from "j/core/r";
    import { Router } from '@angular/router-deprecated';
    import { JLocalStorage } from "j/core/localstorage";
    export class JAuth {
        private localstorage;
        private r;
        private router;
        navs: any;
        Name: string;
        constructor(localstorage: JLocalStorage, r: R, router: Router);
        getNav(): void;
        login(m: any): void;
        logout(): void;
        isLogin(): boolean;
        _logon(data: any): void;
        _logout(data: any): void;
    }
}
declare module "j/base/cfg" {
    export interface JCmdCfg {
        title?: string;
        type?: string;
        icon?: string;
        icon2?: string;
        tip?: string;
        can?: () => boolean;
        exec?: () => any;
        clazz?: string;
    }
}
declare module "j/core/filter" {
    export interface JRule {
        f: string;
        o: string;
        v1: string;
        v2?: string;
    }
    export interface JRuleCfg {
        mc: string;
        lx: string;
        m: JRule;
        args?: any;
    }
    export function StrRuleCfg(mc: string, f: string, args?: any): JRuleCfg;
    export function ZdRuleCfg(mc: string, f: string, args?: any): JRuleCfg;
    export const StrOpt: string[];
    export const ZdOpt: string[];
    export class JFilterCfg {
        rules: JRuleCfg[];
        defaultCfg: Immutable.List<JRuleCfg>;
        constructor(rules: JRuleCfg[]);
        getFilterGroup(): JRule[];
        reset(): void;
    }
}
declare module "j/base/store" {
    import { EventEmitter } from "@angular/core";
    import { R } from "j/core/r";
    import { Observable } from "rxjs/Observable";
    import { JFilterCfg } from "j/core/filter";
    export interface IStore {
        refreshOb(): Observable<any>;
        refresh(): any;
        getPath(): Observable<string>;
        getMid(): Observable<string>;
        filter?: any;
        pager?: (number) => void;
        show?: (any) => void;
        m: any;
        _m: any;
        c: any[];
        NewListStore(cfg: IStoreCfg): any;
        NewPageStore(cfg: IStoreCfg): any;
        NewViewStore(cfg: IStoreCfg): any;
        NewEditStore(cfg: IStoreCfg): any;
        NewWfStore(cfg: IStoreCfg): any;
        NewSubStore(cfg: IStoreCfg): any;
        onDeleted?: EventEmitter<any>;
        onSaved?: EventEmitter<any>;
        onRefreshed?: EventEmitter<any>;
    }
    export interface IStoreCfg {
        path: string;
        pStore?: IStore;
        useParentPath?: boolean;
        useSelfId?: boolean;
    }
    export class Store implements IStore {
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
    export class JListStore extends Store {
        total: number;
        filterCfg: JFilterCfg;
        filter: any;
        constructor(r: R, cfg: IStoreCfg);
        refreshOb(): Observable<any>;
        searchOb(): Observable<any>;
        search(): void;
        resetFilterCfg(): void;
    }
    export class JPageStore extends JListStore {
        constructor(r: R, cfg: IStoreCfg);
        pagerOb(page: any): Observable<any>;
        pager(page: any): void;
        refreshOb(): Observable<any>;
    }
    export class JViewStore extends Store {
        id: string;
        constructor(r: R, cfg: IStoreCfg);
        getPath(): Observable<string>;
        getMid(): Observable<string>;
        refreshOb(): Observable<any>;
        refreshP(): void;
        showOb(id: string, refresh?: boolean): Observable<any>;
        show(id: string, refresh?: boolean): void;
    }
    export class JEditStore extends JViewStore {
        constructor(r: R, cfg: IStoreCfg);
        refreshOb(): Observable<any>;
        saveOb(): Observable<any>;
        save(): void;
        delOb(): Observable<any>;
        del(): void;
    }
    export class JWfStore extends JViewStore {
        constructor(r: R, cfg: IStoreCfg);
        refreshOb(): Observable<any>;
        saveOb(jg: number): Observable<any>;
        save(jg: number): void;
    }
    export class JSubStore extends Store {
        constructor(r: R, cfg: IStoreCfg);
        add(m: any): void;
        show(m: any): void;
        save(): void;
        del(): void;
    }
    export class JStore {
        private r;
        constructor(r: R);
        NewListStore(cfg: IStoreCfg): JListStore;
        NewPageStore(cfg: IStoreCfg): JPageStore;
        NewViewStore(cfg: IStoreCfg): JViewStore;
        NewEditStore(cfg: IStoreCfg): JEditStore;
        NewWfStore(cfg: IStoreCfg): JWfStore;
        NewSubStore(cfg: IStoreCfg): JSubStore;
    }
}
declare module "j/base/zd" {
    import { R } from "j/core/r";
    import { Observable } from 'rxjs/Observable';
    export class JZd {
        private r;
        path: string;
        zdMap: Immutable.Map<{}, {}>;
        loadingMap: Immutable.Map<string, any[]>;
        constructor(r: R);
        get(bq: string): Observable<any>;
    }
}
declare module "j/base" {
    export * from "j/base/auth";
    export * from "j/base/cfg";
    export * from "j/base/store";
    export * from "j/base/zd";
}
declare module "j/core/res" {
    import { EventEmitter } from '@angular/core';
    import { R } from "j/core/r";
    import { JFilterCfg } from "j/core/filter";
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
    export class Res implements IRes {
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
    export class ViewRes extends Res {
        id: string;
        constructor(r: R, cfg: ResCfg);
        getPath(): Observable<string>;
        mid: Observable<string>;
        refreshOb(): Observable<any>;
        refreshP(): void;
        showOb(id: string, refresh?: boolean): Observable<any>;
        show(id: string, refresh?: boolean): void;
    }
    export class EditRes extends ViewRes {
        constructor(r: R, cfg: ResCfg);
        refreshOb(): Observable<any>;
        saveOb(): Observable<any>;
        save(): void;
        delOb(): Observable<any>;
        del(): void;
    }
    export class SubRes extends Res {
        constructor(r: R, cfg: ResCfg);
        add(m: any): void;
        show(m: any): void;
        save(): void;
        del(): void;
    }
    export class WfRes extends ViewRes {
        constructor(r: R, cfg: ResCfg);
        refreshOb(cb?: Function): Observable<any>;
        saveOb(jg: number): Observable<any>;
        save(jg: number): void;
    }
    export class ListRes extends Res {
        total: number;
        filterCfg: JFilterCfg;
        filter: any;
        constructor(r: R, cfg: ResCfg);
        refreshOb(): Observable<any>;
        searchOb(): Observable<any>;
        search(): void;
        resetFilterCfg(): void;
    }
    export class PageRes extends ListRes {
        constructor(r: R, cfg: ResCfg);
        pagerOb(page: any): Observable<any>;
        pager(page: any): void;
        refreshOb(): Observable<any>;
    }
    export class JRes {
        private r;
        constructor(r: R);
        v(cfg: ResCfg): ViewRes;
        e(cfg: ResCfg): EditRes;
        wf(cfg: ResCfg): WfRes;
        l(cfg: ResCfg): ListRes;
        p(cfg: ResCfg): PageRes;
        sub(cfg: ResCfg): SubRes;
    }
}
declare module "j/core" {
    export * from "j/core/localstorage";
    export * from "j/core/r";
    export * from "j/core/res";
    export * from "j/core/filter";
}
declare module "j/fw/nav" {
    import { Location } from '@angular/common';
    import { JAuth } from "j/base/auth";
    export class JFwNavTree {
        private location;
        constructor(location: Location);
        isActive(uri: string): boolean;
    }
    export class JFwNav {
        private auth;
        constructor(auth: JAuth);
    }
}
declare module "j/fw/top" {
    import { JAuth } from "j/base/auth";
    import { JFw } from "j/fw/jfw";
    export class JFwTop {
        private auth;
        private jfw;
        constructor(auth: JAuth, jfw: JFw);
        logout(): void;
        title: string;
    }
}
declare module "j/fw/setting" {
    import { ElementRef, DynamicComponentLoader, ComponentRef, Type } from '@angular/core';
    export class JFwSetting {
        private dcl;
        private elemRef;
        curComp: ComponentRef;
        curType: Type;
        constructor(dcl: DynamicComponentLoader, elemRef: ElementRef);
        showSetting(type: Type, toggle?: boolean): void;
        closeCurComp(): void;
    }
}
declare module "j/fw/fw" {
    import { JAuth } from "j/base/auth";
    import { JFwSetting } from "j/fw/setting";
    import { JFw } from "j/fw/jfw";
    export class JFwComp {
        private auth;
        private fw;
        setting: JFwSetting;
        constructor(auth: JAuth, fw: JFw);
    }
}
declare module "j/fw/jfw" {
    import { Type } from '@angular/core';
    import { JFwComp } from "j/fw/fw";
    export class JFw {
        fw: JFwComp;
        appTitle: string;
        appLogo: string;
        constructor();
        showSetting(type: Type, toggle?: boolean): void;
        closeSetting(): void;
    }
}
declare module "j/ui/page/page" {
    import { OnInit, ElementRef, Renderer } from '@angular/core';
    import { ControlValueAccessor, NgModel } from '@angular/common';
    export interface IAttribute {
        [name: string]: any;
    }
    export interface IPaginationConfig extends IAttribute {
        maxSize: number;
        itemsPerPage: number;
        boundaryLinks: boolean;
        directionLinks: boolean;
        firstText: string;
        previousText: string;
        nextText: string;
        lastText: string;
        rotate: boolean;
    }
    export class Pagination implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
        cd: NgModel;
        renderer: Renderer;
        elementRef: ElementRef;
        maxSize: number;
        boundaryLinks: boolean;
        directionLinks: boolean;
        firstText: string;
        previousText: string;
        nextText: string;
        lastText: string;
        rotate: boolean;
        private disabled;
        private numPages;
        private pageChanged;
        itemsPerPage: number;
        private totalItems;
        config: any;
        private classMap;
        private _itemsPerPage;
        private _totalItems;
        private _totalPages;
        private inited;
        private totalPages;
        page: number;
        private _page;
        private pages;
        constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
        ngOnInit(): void;
        writeValue(value: number): void;
        private selectPage(page, event?);
        private getText(key);
        private noPrevious();
        private noNext();
        private makePage(number, text, isActive);
        private getPages(currentPage, totalPages);
        private calculateTotalPages();
        onChange: (_: any) => void;
        onTouched: () => void;
        registerOnChange(fn: (_: any) => {}): void;
        registerOnTouched(fn: () => {}): void;
    }
    export class Pager extends Pagination implements OnInit {
        config: {
            itemsPerPage: number;
            previousText: string;
            nextText: string;
            align: boolean;
        };
        constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
    }
    export const PAGINATION_DIRECTIVES: Array<any>;
}
declare module "j/fw/bld" {
    import { JCmdCfg } from "j/base/cfg";
    import { Router } from "@angular/router-deprecated";
    import { IStore } from "j/base/store";
    export interface JSearchCfg {
        msg?: string;
    }
    export interface JFilterCfg {
        exec: () => any;
    }
    export interface JSavedCfg {
        router?: Router;
        route2?: string;
    }
    export interface JBldCfg {
        title: string;
        icon?: string;
        ctrls?: JCmdCfg[];
        tools?: JCmdCfg[];
        opts?: JCmdCfg[];
        search?: JSearchCfg;
        filter?: JFilterCfg;
        saved?: JSavedCfg;
        ctx?: IStore;
        footer?: boolean;
        width?: number;
        type?: string;
    }
    export class JFwBld {
        cfg: JBldCfg;
        constructor();
        ctx: IStore;
        m: any;
        showFooter: boolean | ((number: any) => void);
    }
    export class JBldNull {
    }
    export class JBldBase {
        cfg: JBldCfg;
        bld: JFwBld;
        constructor(cfg: JBldCfg);
        ctx: IStore;
        private init();
        private initCmd(x);
    }
}
declare module "j/fw" {
    export * from "j/fw/jfw";
    export * from "j/fw/top";
    export * from "j/fw/nav";
    export * from "j/fw/setting";
    export * from "j/fw/bld";
    export * from "j/fw/fw";
}
declare module "j/pipe/filter" {
    import { PipeTransform } from '@angular/core';
    export class JFilterPipe implements PipeTransform {
        transform(value: any, args: string[]): any;
    }
}
declare module "j/pipe" {
    export * from "j/pipe/filter";
}
declare module "j/utils/dom" {
    export function getDimensions(ele: HTMLElement, id: string): {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    export function flushDimensionCache(): void;
    export function clearDimensions(id: string): void;
}
declare module "j/ui/jui" {
    import { ElementRef } from '@angular/core';
    export class Jui {
        protected elemRef: ElementRef;
        private _id;
        constructor(elemRef: ElementRef);
        getElemRef(): ElementRef;
        getNativeElem(): any;
        getDimensions(): {
            width: number;
            height: number;
            left: number;
            top: number;
        };
        width(): number;
        height(): number;
        ngOnDestroy(): void;
    }
}
declare module "j/ui/nav/nav-tree" {
    export class NavTree {
    }
}
declare module "j/ui/uploader/uploader" {
    import { EventEmitter } from '@angular/core';
    export class JUploader {
        url: string;
        cors: boolean;
        withCredentials: boolean;
        multiple: boolean;
        maxUploads: number;
        allowedExtensions: string[];
        maxSize: boolean;
        data: Object;
        noParams: boolean;
        autoUpload: boolean;
        multipart: boolean;
        method: string;
        debug: boolean;
        customHeaders: Object;
        encodeHeaders: boolean;
        authTokenPrefix: string;
        authToken: string;
        fieldName: string;
        _queue: any[];
        _emitter: EventEmitter<any>;
        setOptions(options: any): void;
        uploadFilesInQueue(): void;
        uploadFile(file: any): void;
        addFilesToQueue(files: FileList[]): void;
        removeFileFromQueue(i: number): void;
        clearQueue(): void;
        getQueueSize(): number;
        inQueue(file: any): boolean;
        isFile(file: any): boolean;
        log(msg: any): void;
        generateRandomIndex(): string;
    }
}
declare module "j/ui/uploader/select" {
    import { ElementRef, EventEmitter } from '@angular/core';
    import { JUploader } from "j/ui/uploader/uploader";
    export class JUpload {
        el: ElementRef;
        uploader: JUploader;
        options: any;
        onUpload: EventEmitter<any>;
        constructor(el: ElementRef);
        onFiles(): void;
    }
}
declare module "j/ui" {
    export * from "j/ui/jui";
    export * from "j/ui/page/page";
    export * from "j/ui/nav/nav-tree";
    export * from "j/ui/uploader/uploader";
    export * from "j/ui/uploader/select";
}
declare module "j/utils" {
    export * from "j/utils/dom";
}
declare module "j" {
    export * from "j/base";
    export * from "j/core";
    export * from "j/fw";
    export * from "j/pipe";
    export * from "j/ui";
    export * from "j/utils";
}
