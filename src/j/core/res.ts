import {Injectable,EventEmitter} from 'angular2/core';
import {Headers} from 'angular2/http';
import {R} from './r';
import {JFilterCfg} from "./filter";
import {Observable} from "rxjs/Observable";
import * as Rx from "rxjs/Rx";

export interface ResCfg{
    path:string;
    pRes?:IRes;
    paramId?:string;
    useParentPath?:boolean;
    useParentId?:boolean;
}
export interface IRes{
    refreshOb():Observable<any>;
    refresh();
    getPath():Observable<string>;
    mid?:Observable<string>;
    filter?:any;
    m:any;
    _m:any;
    c:any[];
}

export class Res implements IRes {
    onDeleted:EventEmitter<any> = new EventEmitter();
    onSaved:EventEmitter<any> = new EventEmitter();
    onRefreshed:EventEmitter<any> = new EventEmitter();
    m:any={};
    _m:any={};
    c:any[];

    constructor(public r:R,protected cfg:ResCfg) {
        cfg.useParentPath=cfg.useParentPath||true;
        cfg.paramId=cfg.paramId||'id';
    }

    refresh(){
        this.refreshOb().subscribe();
    }
    refreshOb() :Observable<any>{
        return Rx.Observable.empty();
    }
    getPath():Observable<string> {
        if (this.cfg.pRes && this.cfg.useParentPath) {
            return this.cfg.pRes.getPath().map(x=> x + this.cfg.path)
        } else {
            return Rx.Observable.of(this.cfg.path);
        }
    }
    get pRes(){return this.cfg.pRes;}
    get path(){return this.cfg.path;}
    set path(s :string){this.cfg.path=s;}
}

export class ViewRes extends Res {
    id:string;
    constructor(r:R, cfg:ResCfg) {
        super(r,cfg);
    }

    getPath():Observable<string> {
        if(this.cfg.useParentId){
            // return this.pRes.mid.flatMap(x=>super.getPath());
            return this.pRes.mid.combineLatest(super.getPath(),(x,y)=>y+'/'+x);
        }else if (this.id == null || this.id == '') {
            return super.getPath();
        }else {
            return super.getPath().map(x=> x+"/"+this.id);
        }
    }

    get mid():Observable<string>{
        if (this.m.Id) return Rx.Observable.of(this.m.Id);
        return this.refreshOb().map(x=> this.m.Id);
    }

    refreshOb() :Observable<any> {
        return this.getPath().flatMap(path=>this.r.get(path).map(o=> {
            this.m = o;
        }));
    }
    refreshP() {
        if (this.pRes) this.pRes.refresh();
    }
    showOb(id:string, refresh:boolean = true) :Observable<any> {
        this.id = id;
        if (refresh) return this.refreshOb();
        return Rx.Observable.empty();
    }
    show(id:string, refresh:boolean = true){
        this.showOb(id,refresh).subscribe();
    }
}

export class EditRes extends ViewRes {
    constructor(r:R,cfg:ResCfg) {
        super(r,cfg);
    }

    refreshOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.post(path, null))
            .map(o=> {
                this.m = o;
                this._m = Immutable.fromJS(o).clone().toJS()
            });
    }

    saveOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.put(path, this.m))
            .map(o=> {
                this.refreshP();
                this._m =Immutable.fromJS(this.m).clone().toJS();
                this.onSaved.emit(this.id || this.m.Id );
            });
    }
    save(){
        this.saveOb().subscribe();
    }
    delOb():Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.delete(path, this.m))
            .map(o=> {
                this.refreshP();
                this._m = this.m = {};
                this.onDeleted.emit(null);
            });
    }
    del(){
        this.delOb().subscribe();
    }
}

export class SubRes extends Res {
    constructor(r:R,cfg:ResCfg) {
        super(r,cfg);
    }

    add(m){
        this._m=null;
        this.m=m;
    }

    show(m){
        this._m=m;
        this.m= Immutable.fromJS(m).clone().toJS()
    }
    save() {
        if (this._m) {
            this._m=Immutable.fromJS(this._m).extend(this.m);
            // this._m = _.extend(this._m, this.m);
        } else {
            this._m =Immutable.fromJS(this.m).clone().toJS();
            this.pRes.m[this.cfg.path].push(this._m);
        }
    }

    del() {
        if (this._m) {
            this.pRes.m[this.cfg.path]=Immutable.fromJS(this.pRes.m[this.cfg.path]).remove(this._m).toJS();
            // this.pRes.m[this.cfg.path] = _.without(this.pRes.m[this.cfg.path], this._m);
        }
    }
}
export class WfRes extends ViewRes {
    constructor(r:R, cfg:ResCfg) {
        super(r, cfg);
    }

    refreshOb(cb?:Function) :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.post(path, null))
            .map(o=> {
                this.m = o;
            });
    }

    saveOb(jg:number) :Observable<any> {
        this.m.Wf.Cur.Jg = jg;
        return this.getPath()
            .flatMap(path=>this.r.put(path, this.m.Wf.Cur))
            .map(o=> {
                this.refreshP();
                this.m = o;
            });
    }
    save(jg:number){
        this.saveOb(jg).subscribe();
    }
}

export class ListRes extends Res {
    total:number = 0;
    filterCfg:JFilterCfg;
    filter:any = {rules:[],groups:[],ext:{search:'',page: 1, perPage: 20}};

    constructor(r:R,cfg:ResCfg) {
        super(r, cfg);
    }

    refreshOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.post(path,  this.filter, {headers: new Headers({'jBreak-Method': 'List'})}).map(o=>{
                this.c = o;
                this.total = o.length;
            }));
    }
    searchOb() :Observable<any>{
        this.filter.rules=this.filterCfg.getFilterGroup();
        return this.refreshOb();
    }
    search(){
        this.searchOb().subscribe();
    }
    resetFilterCfg(){
        this.filterCfg.reset();
    }
}

export class PageRes extends ListRes {
    constructor(r:R, cfg:ResCfg) {
        super(r, cfg);
    }

    pagerOb(page) :Observable<any> {
        this.filter.ext.page = page;
        return this.refreshOb();
    }
    pager(page) {
        this.pagerOb(page).subscribe();
    }

    refreshOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.post(path,  this.filter, {headers: new Headers({'jBreak-Method': 'Page'})}).map(o=> {
                this.c = o. Items;
                this.total = o.Total;
            }));
    }
}

@Injectable()
export class JRes {
    constructor(private r:R) {
    }

    v(cfg:ResCfg):ViewRes {
        return new ViewRes(this.r, cfg);
    }

    e(cfg:ResCfg):EditRes {
        return new EditRes(this.r, cfg);
    }

    wf(cfg:ResCfg):WfRes {
        return new WfRes(this.r, cfg);
    }

    l(cfg:ResCfg):ListRes {
        return new ListRes(this.r, cfg);
    }

    p(cfg:ResCfg):PageRes {
        return new PageRes(this.r, cfg);
    }

    sub(cfg:ResCfg):SubRes {
        return new SubRes(this.r, cfg);
    }
}