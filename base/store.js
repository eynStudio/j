"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var r_1 = require("../core/r");
var Rx = require("rxjs/Rx");
var http_1 = require("angular2/http");
var Store = (function () {
    function Store(r, cfg) {
        this.r = r;
        this.cfg = cfg;
        this.onDeleted = new core_1.EventEmitter();
        this.onSaved = new core_1.EventEmitter();
        this.onRefreshed = new core_1.EventEmitter();
        this.m = {};
        this._m = {};
        cfg.useParentPath = cfg.useParentPath || true;
        cfg.useSelfId = cfg.useSelfId || true;
    }
    Store.prototype.refresh = function () {
        this.refreshOb().subscribe();
    };
    Store.prototype.refreshOb = function () {
        return Rx.Observable.empty();
    };
    Store.prototype.getMid = function () {
        return Rx.Observable.empty();
    };
    Store.prototype.getPath = function () {
        var _this = this;
        if (this.cfg.useParentPath && this.cfg.pStore) {
            return this.cfg.pStore.getPath().map(function (x) { return x + _this.cfg.path; });
        }
        else {
            return Rx.Observable.of(this.cfg.path);
        }
    };
    Object.defineProperty(Store.prototype, "pStore", {
        get: function () { return this.cfg.pStore; },
        set: function (p) { this.cfg.pStore = p; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "path", {
        get: function () { return this.cfg.path; },
        set: function (s) { this.cfg.path = s; },
        enumerable: true,
        configurable: true
    });
    Store.prototype.NewListStore = function (cfg) {
        cfg.pStore = this;
        return new JListStore(this.r, cfg);
    };
    Store.prototype.NewPageStore = function (cfg) {
        cfg.pStore = this;
        return new JPageStore(this.r, cfg);
    };
    Store.prototype.NewViewStore = function (cfg) {
        cfg.pStore = this;
        return new JViewStore(this.r, cfg);
    };
    Store.prototype.NewEditStore = function (cfg) {
        cfg.pStore = this;
        return new JEditStore(this.r, cfg);
    };
    Store.prototype.NewWfStore = function (cfg) {
        cfg.pStore = this;
        return new JWfStore(this.r, cfg);
    };
    Store.prototype.NewSubStore = function (cfg) {
        cfg.pStore = this;
        return new JSubStore(this.r, cfg);
    };
    return Store;
}());
exports.Store = Store;
var JListStore = (function (_super) {
    __extends(JListStore, _super);
    function JListStore(r, cfg) {
        _super.call(this, r, cfg);
        this.total = 0;
        this.filter = { rules: [], groups: [], ext: { search: '', page: 1, perPage: 20 } };
    }
    JListStore.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_1.Headers({ 'jBreak-Method': 'List' }) }).map(function (o) {
            _this.c = o;
            _this.total = o.length;
        }); });
    };
    JListStore.prototype.searchOb = function () {
        this.filter.rules = this.filterCfg.getFilterGroup();
        return this.refreshOb();
    };
    JListStore.prototype.search = function () {
        this.searchOb().subscribe();
    };
    JListStore.prototype.resetFilterCfg = function () {
        this.filterCfg.reset();
    };
    return JListStore;
}(Store));
exports.JListStore = JListStore;
var JPageStore = (function (_super) {
    __extends(JPageStore, _super);
    function JPageStore(r, cfg) {
        _super.call(this, r, cfg);
    }
    JPageStore.prototype.pagerOb = function (page) {
        this.filter.ext.page = page;
        return this.refreshOb();
    };
    JPageStore.prototype.pager = function (page) {
        this.pagerOb(page).subscribe();
    };
    JPageStore.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_1.Headers({ 'jBreak-Method': 'Page' }) }).map(function (o) {
            _this.c = o.Items;
            _this.total = o.Total;
        }); });
    };
    return JPageStore;
}(JListStore));
exports.JPageStore = JPageStore;
var JViewStore = (function (_super) {
    __extends(JViewStore, _super);
    function JViewStore(r, cfg) {
        _super.call(this, r, cfg);
    }
    JViewStore.prototype.getPath = function () {
        var _this = this;
        if (!this.cfg.useSelfId) {
            return this.pStore.getMid().combineLatest(_super.prototype.getPath.call(this), function (x, y) { return y; });
        }
        else if (this.id == null || this.id == '') {
            return _super.prototype.getPath.call(this);
        }
        else {
            return _super.prototype.getPath.call(this).map(function (x) { return x + "/" + _this.id; });
        }
    };
    JViewStore.prototype.getMid = function () {
        var _this = this;
        if (this.m.Id)
            return Rx.Observable.of(this.m.Id);
        return this.refreshOb().map(function (x) { return _this.m.Id; });
    };
    JViewStore.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath().flatMap(function (path) { return _this.r.get(path).map(function (o) {
            _this.m = o;
        }); });
    };
    JViewStore.prototype.refreshP = function () {
        if (this.pStore)
            this.pStore.refresh();
    };
    JViewStore.prototype.showOb = function (id, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.id = id;
        if (refresh)
            return this.refreshOb();
        return Rx.Observable.empty();
    };
    JViewStore.prototype.show = function (id, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.showOb(id, refresh).subscribe();
    };
    return JViewStore;
}(Store));
exports.JViewStore = JViewStore;
var JEditStore = (function (_super) {
    __extends(JEditStore, _super);
    function JEditStore(r, cfg) {
        _super.call(this, r, cfg);
    }
    JEditStore.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, null); })
            .map(function (o) {
            _this.m = o;
            _this._m = Immutable.fromJS(_this.m).clone().toJS();
        });
    };
    JEditStore.prototype.saveOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.put(path, _this.m); })
            .map(function (o) {
            _this.refreshP();
            _this._m = Immutable.fromJS(_this.m).clone().toJS();
            _this.onSaved.emit(_this.id || _this.m.Id);
        });
    };
    JEditStore.prototype.save = function () {
        this.saveOb().subscribe();
    };
    JEditStore.prototype.delOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.delete(path, _this.m); })
            .map(function (o) {
            _this.refreshP();
            _this._m = _this.m = {};
            _this.onDeleted.emit(null);
        });
    };
    JEditStore.prototype.del = function () {
        this.delOb().subscribe();
    };
    return JEditStore;
}(JViewStore));
exports.JEditStore = JEditStore;
var JWfStore = (function (_super) {
    __extends(JWfStore, _super);
    function JWfStore(r, cfg) {
        _super.call(this, r, cfg);
    }
    JWfStore.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, null); })
            .map(function (o) {
            _this.m = o;
        });
    };
    JWfStore.prototype.saveOb = function (jg) {
        var _this = this;
        this.m.Wf.Cur.Jg = jg;
        return this.getPath()
            .flatMap(function (path) { return _this.r.put(path, _this.m.Wf.Cur); })
            .map(function (o) {
            _this.refreshP();
            _this.m = o;
        });
    };
    JWfStore.prototype.save = function (jg) {
        this.saveOb(jg).subscribe();
    };
    return JWfStore;
}(JViewStore));
exports.JWfStore = JWfStore;
var JSubStore = (function (_super) {
    __extends(JSubStore, _super);
    function JSubStore(r, cfg) {
        _super.call(this, r, cfg);
    }
    JSubStore.prototype.add = function (m) {
        this._m = null;
        this.m = m;
    };
    JSubStore.prototype.show = function (m) {
        this._m = m;
        this.m = Immutable.fromJS(this.m).clone().toJS();
    };
    JSubStore.prototype.save = function () {
        if (this._m) {
            this._m = Immutable.fromJS(this._m).extend(this.m);
        }
        else {
            this._m = Immutable.fromJS(this.m).clone().toJS();
            this.pStore.m[this.cfg.path].push(this._m);
        }
    };
    JSubStore.prototype.del = function () {
        if (this._m) {
            this.pStore.m[this.cfg.path] = Immutable.fromJS(this.pStore.m[this.cfg.path]).remove(this._m).toJS();
        }
    };
    return JSubStore;
}(Store));
exports.JSubStore = JSubStore;
var JStore = (function () {
    function JStore(r) {
        this.r = r;
    }
    JStore.prototype.NewListStore = function (cfg) {
        return new JListStore(this.r, cfg);
    };
    JStore.prototype.NewPageStore = function (cfg) {
        return new JPageStore(this.r, cfg);
    };
    JStore.prototype.NewViewStore = function (cfg) {
        return new JViewStore(this.r, cfg);
    };
    JStore.prototype.NewEditStore = function (cfg) {
        return new JEditStore(this.r, cfg);
    };
    JStore.prototype.NewWfStore = function (cfg) {
        return new JWfStore(this.r, cfg);
    };
    JStore.prototype.NewSubStore = function (cfg) {
        return new JSubStore(this.r, cfg);
    };
    JStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [r_1.R])
    ], JStore);
    return JStore;
}());
exports.JStore = JStore;
