import {Injectable,EventEmitter} from "@angular/core";
import {R} from "../core/r";
import {Observable} from "rxjs/Observable";
import {JFilterCfg} from "../core/filter";
import {Headers} from "@angular/http";

export interface IStore{
    refreshOb():Observable<any>;
    refresh();
    getPath():Observable<string>;
    getMid():Observable<string>;

    filter?:any;
    pager?:(number)=>void;
    show?:(any)=>void;
    m:any;
    _m:any;
    c:any[];
    NewListStore(cfg:IStoreCfg);
    NewPageStore(cfg:IStoreCfg);
    NewViewStore(cfg:IStoreCfg);
    NewEditStore(cfg:IStoreCfg);
    NewWfStore(cfg:IStoreCfg);
    NewSubStore(cfg:IStoreCfg);

    onDeleted?:EventEmitter<any>;
    onSaved?:EventEmitter<any>;
    onRefreshed?:EventEmitter<any>;
}

export interface IStoreCfg{
    path:string;
    pStore?:IStore;
    useParentPath?:boolean;
    useSelfId?:boolean;
}

export class Store implements IStore{
    onDeleted:EventEmitter<any> = new EventEmitter();
    onSaved:EventEmitter<any> = new EventEmitter();
    onRefreshed:EventEmitter<any> = new EventEmitter();
    filter:any;
    m:any={};
    _m:any={};
    c:any[];
    constructor(public r:R,protected cfg:IStoreCfg){
        cfg.useParentPath=cfg.useParentPath||true;
        cfg.useSelfId=cfg.useSelfId||true;
    }

    refresh(){
        this.refreshOb().subscribe();
    }
    refreshOb() :Observable<any>{
        return Observable.empty();
    }
    getMid() :Observable<any>{
        return Observable.empty();
    }
    getPath():Observable<string> {
        if (this.cfg.useParentPath && this.cfg.pStore ) {
            return this.cfg.pStore.getPath().map(x=> x + this.cfg.path)
        } else {
            return Observable.of(this.cfg.path);
        }
    }
    get pStore(){return this.cfg.pStore;}
    set pStore(p :IStore){this.cfg.pStore=p;}
    get path(){return this.cfg.path;}
    set path(s :string){this.cfg.path=s;}

    NewListStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JListStore(this.r,cfg);
    }
    NewPageStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JPageStore(this.r,cfg);
    }
    NewViewStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JViewStore(this.r,cfg);
    }
    NewEditStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JEditStore(this.r,cfg);
    }
    NewWfStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JWfStore(this.r,cfg);
    }
    NewSubStore(cfg:IStoreCfg){
        cfg.pStore=this;
        return new JSubStore(this.r,cfg);
    }
}

export class JListStore extends Store{
    total:number = 0;
    filterCfg:JFilterCfg;
    filter:any = {rules:[],groups:[],ext:{search:'',page: 1, perPage: 20}};
    constructor(r:R, cfg:IStoreCfg){
        super(r,cfg);
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
export class JPageStore extends JListStore{
    constructor(r:R, cfg:IStoreCfg){
        super(r,cfg);
    }
    pagerOb(page) :Observable<any> {
        this.filter.ext.page = page;
        return this.refreshOb();
    }
    pager(page){
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
export class JViewStore extends Store{
    id:string;
    constructor(r:R, cfg:IStoreCfg){
        super(r,cfg);
    }

    getPath():Observable<string> {
        if(!this.cfg.useSelfId){
            // return this.pRes.mid.flatMap(x=>super.getPath());
            return this.pStore.getMid().combineLatest(super.getPath(),(x,y)=>y);
        }else if (this.id == null || this.id == '') {
            return super.getPath();
        }else {
            return super.getPath().map(x=> x+"/"+this.id);
        }
    }

    getMid():Observable<string>{
        if (this.m.Id) return Observable.of(this.m.Id);
        return this.refreshOb().map(x=> this.m.Id);
    }

    refreshOb() :Observable<any> {
        return this.getPath().flatMap(path=>this.r.get(path).map(o=> {
            this.m = o;
        }));
    }
    refreshP() {
        if (this.pStore) this.pStore.refresh();
    }
    showOb(id:string, refresh:boolean = true) :Observable<any> {
        this.id = id;
        if (refresh) return this.refreshOb();
        return Observable.empty();
    }
    show(id:string, refresh:boolean = true){
        this.showOb(id,refresh).subscribe();
    }
}
export class JEditStore extends JViewStore{
    constructor(r:R, cfg:IStoreCfg){
        super(r,cfg);
    }

    refreshOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.post(path, null))
            .map(o=> {
                this.m = o;
                this._m = Immutable.fromJS(o);
            });
    }

    saveOb() :Observable<any> {
        return this.getPath()
            .flatMap(path=>this.r.put(path, this.m))
            .map(o=> {
                this.refreshP();
                this._m =Immutable.fromJS(this.m);
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

export class JWfStore extends JViewStore{
    constructor(r:R, cfg:IStoreCfg) {
        super(r, cfg);
    }

    refreshOb() :Observable<any> {
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

export class JSubStore extends Store {
    constructor(r:R,cfg:IStoreCfg) {
        super(r,cfg);
    }

    add(m){
        this._m=null;
        this.m=m;
    }

    show(m){
        this._m=Immutable.fromJS(m);
        this.m= m;
    }
    save() {
        if (this._m) {
            // this._m = _.extend(this._m, this.m);
            this._m=Immutable.fromJS(this._m).extend(this.m);
        } else {
            // this._m = _.extend({}, this.m);
            this._m =Immutable.fromJS(this.m);
            this.pStore.m[this.cfg.path].push(this._m.toJS());
        }
    }

    del() {
        if (this._m) {
            this.pStore.m[this.cfg.path]=Immutable.fromJS(this.pStore.m[this.cfg.path]).remove(this._m).toJS();
            // this.pStore.m[this.cfg.path] = _.without(this.pStore.m[this.cfg.path], this._m);
        }
    }
}

@Injectable()
export class JStore{
    constructor(private r:R) {
    }
    NewListStore(cfg:IStoreCfg){
        return new JListStore(this.r,cfg);
    }
    NewPageStore(cfg:IStoreCfg){
        return new JPageStore(this.r,cfg);
    }
    NewViewStore(cfg:IStoreCfg){
        return new JViewStore(this.r,cfg);
    }
    NewEditStore(cfg:IStoreCfg){
        return new JEditStore(this.r,cfg);
    }
    NewWfStore(cfg:IStoreCfg){
        return new JWfStore(this.r,cfg);
    }
    NewSubStore(cfg:IStoreCfg){
        return new JSubStore(this.r,cfg);
    }
}
