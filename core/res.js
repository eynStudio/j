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
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var r_1 = require('./r');
var Rx = require("rxjs/Rx");
var Res = (function () {
    function Res(r, cfg) {
        this.r = r;
        this.cfg = cfg;
        this.onDeleted = new core_1.EventEmitter();
        this.onSaved = new core_1.EventEmitter();
        this.onRefreshed = new core_1.EventEmitter();
        this.m = {};
        this._m = {};
        cfg.useParentPath = cfg.useParentPath || true;
        cfg.paramId = cfg.paramId || 'id';
    }
    Res.prototype.refresh = function () {
        this.refreshOb().subscribe();
    };
    Res.prototype.refreshOb = function () {
        return Rx.Observable.empty();
    };
    Res.prototype.getPath = function () {
        var _this = this;
        if (this.cfg.pRes && this.cfg.useParentPath) {
            return this.cfg.pRes.getPath().map(function (x) { return x + _this.cfg.path; });
        }
        else {
            return Rx.Observable.of(this.cfg.path);
        }
    };
    Object.defineProperty(Res.prototype, "pRes", {
        get: function () { return this.cfg.pRes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Res.prototype, "path", {
        get: function () { return this.cfg.path; },
        set: function (s) { this.cfg.path = s; },
        enumerable: true,
        configurable: true
    });
    return Res;
}());
exports.Res = Res;
var ViewRes = (function (_super) {
    __extends(ViewRes, _super);
    function ViewRes(r, cfg) {
        _super.call(this, r, cfg);
    }
    ViewRes.prototype.getPath = function () {
        var _this = this;
        if (this.cfg.useParentId) {
            return this.pRes.mid.combineLatest(_super.prototype.getPath.call(this), function (x, y) { return y + '/' + x; });
        }
        else if (this.id == null || this.id == '') {
            return _super.prototype.getPath.call(this);
        }
        else {
            return _super.prototype.getPath.call(this).map(function (x) { return x + "/" + _this.id; });
        }
    };
    Object.defineProperty(ViewRes.prototype, "mid", {
        get: function () {
            var _this = this;
            if (this.m.Id)
                return Rx.Observable.of(this.m.Id);
            return this.refreshOb().map(function (x) { return _this.m.Id; });
        },
        enumerable: true,
        configurable: true
    });
    ViewRes.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath().flatMap(function (path) { return _this.r.get(path).map(function (o) {
            _this.m = o;
        }); });
    };
    ViewRes.prototype.refreshP = function () {
        if (this.pRes)
            this.pRes.refresh();
    };
    ViewRes.prototype.showOb = function (id, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.id = id;
        if (refresh)
            return this.refreshOb();
        return Rx.Observable.empty();
    };
    ViewRes.prototype.show = function (id, refresh) {
        if (refresh === void 0) { refresh = true; }
        this.showOb(id, refresh).subscribe();
    };
    return ViewRes;
}(Res));
exports.ViewRes = ViewRes;
var EditRes = (function (_super) {
    __extends(EditRes, _super);
    function EditRes(r, cfg) {
        _super.call(this, r, cfg);
    }
    EditRes.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, null); })
            .map(function (o) {
            _this.m = o;
            _this._m = Immutable.fromJS(o).clone().toJS();
        });
    };
    EditRes.prototype.saveOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.put(path, _this.m); })
            .map(function (o) {
            _this.refreshP();
            _this._m = Immutable.fromJS(_this.m).clone().toJS();
            _this.onSaved.emit(_this.id || _this.m.Id);
        });
    };
    EditRes.prototype.save = function () {
        this.saveOb().subscribe();
    };
    EditRes.prototype.delOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.delete(path, _this.m); })
            .map(function (o) {
            _this.refreshP();
            _this._m = _this.m = {};
            _this.onDeleted.emit(null);
        });
    };
    EditRes.prototype.del = function () {
        this.delOb().subscribe();
    };
    return EditRes;
}(ViewRes));
exports.EditRes = EditRes;
var SubRes = (function (_super) {
    __extends(SubRes, _super);
    function SubRes(r, cfg) {
        _super.call(this, r, cfg);
    }
    SubRes.prototype.add = function (m) {
        this._m = null;
        this.m = m;
    };
    SubRes.prototype.show = function (m) {
        this._m = m;
        this.m = Immutable.fromJS(m).clone().toJS();
    };
    SubRes.prototype.save = function () {
        if (this._m) {
            this._m = Immutable.fromJS(this._m).extend(this.m);
        }
        else {
            this._m = Immutable.fromJS(this.m).clone().toJS();
            this.pRes.m[this.cfg.path].push(this._m);
        }
    };
    SubRes.prototype.del = function () {
        if (this._m) {
            this.pRes.m[this.cfg.path] = Immutable.fromJS(this.pRes.m[this.cfg.path]).remove(this._m).toJS();
        }
    };
    return SubRes;
}(Res));
exports.SubRes = SubRes;
var WfRes = (function (_super) {
    __extends(WfRes, _super);
    function WfRes(r, cfg) {
        _super.call(this, r, cfg);
    }
    WfRes.prototype.refreshOb = function (cb) {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, null); })
            .map(function (o) {
            _this.m = o;
        });
    };
    WfRes.prototype.saveOb = function (jg) {
        var _this = this;
        this.m.Wf.Cur.Jg = jg;
        return this.getPath()
            .flatMap(function (path) { return _this.r.put(path, _this.m.Wf.Cur); })
            .map(function (o) {
            _this.refreshP();
            _this.m = o;
        });
    };
    WfRes.prototype.save = function (jg) {
        this.saveOb(jg).subscribe();
    };
    return WfRes;
}(ViewRes));
exports.WfRes = WfRes;
var ListRes = (function (_super) {
    __extends(ListRes, _super);
    function ListRes(r, cfg) {
        _super.call(this, r, cfg);
        this.total = 0;
        this.filter = { rules: [], groups: [], ext: { search: '', page: 1, perPage: 20 } };
    }
    ListRes.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_1.Headers({ 'jBreak-Method': 'List' }) }).map(function (o) {
            _this.c = o;
            _this.total = o.length;
        }); });
    };
    ListRes.prototype.searchOb = function () {
        this.filter.rules = this.filterCfg.getFilterGroup();
        return this.refreshOb();
    };
    ListRes.prototype.search = function () {
        this.searchOb().subscribe();
    };
    ListRes.prototype.resetFilterCfg = function () {
        this.filterCfg.reset();
    };
    return ListRes;
}(Res));
exports.ListRes = ListRes;
var PageRes = (function (_super) {
    __extends(PageRes, _super);
    function PageRes(r, cfg) {
        _super.call(this, r, cfg);
    }
    PageRes.prototype.pagerOb = function (page) {
        this.filter.ext.page = page;
        return this.refreshOb();
    };
    PageRes.prototype.pager = function (page) {
        this.pagerOb(page).subscribe();
    };
    PageRes.prototype.refreshOb = function () {
        var _this = this;
        return this.getPath()
            .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_1.Headers({ 'jBreak-Method': 'Page' }) }).map(function (o) {
            _this.c = o.Items;
            _this.total = o.Total;
        }); });
    };
    return PageRes;
}(ListRes));
exports.PageRes = PageRes;
var JRes = (function () {
    function JRes(r) {
        this.r = r;
    }
    JRes.prototype.v = function (cfg) {
        return new ViewRes(this.r, cfg);
    };
    JRes.prototype.e = function (cfg) {
        return new EditRes(this.r, cfg);
    };
    JRes.prototype.wf = function (cfg) {
        return new WfRes(this.r, cfg);
    };
    JRes.prototype.l = function (cfg) {
        return new ListRes(this.r, cfg);
    };
    JRes.prototype.p = function (cfg) {
        return new PageRes(this.r, cfg);
    };
    JRes.prototype.sub = function (cfg) {
        return new SubRes(this.r, cfg);
    };
    JRes = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [r_1.R])
    ], JRes);
    return JRes;
}());
exports.JRes = JRes;
