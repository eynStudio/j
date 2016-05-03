var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("j/core/localstorage", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var JLocalStorage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            JLocalStorage = (function () {
                function JLocalStorage() {
                    this._data = {};
                }
                JLocalStorage.prototype.getItem = function (key) {
                    if (window.localStorage) {
                        return window.localStorage.getItem(key);
                    }
                    else {
                        return this._data[key];
                    }
                };
                JLocalStorage.prototype.setItem = function (key, value) {
                    if (window.localStorage) {
                        window.localStorage.setItem(key, value);
                    }
                    else {
                        this._data[key] = value;
                    }
                };
                JLocalStorage.prototype.removeItem = function (key) {
                    if (window.localStorage) {
                        window.localStorage.removeItem(key);
                    }
                    else {
                        delete this._data[key];
                    }
                };
                JLocalStorage = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JLocalStorage);
                return JLocalStorage;
            }());
            exports_1("JLocalStorage", JLocalStorage);
        }
    }
});
System.register("j/core/r", ['@angular/core', '@angular/http', '@angular/router-deprecated', "j/core/localstorage"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, http_1, router_deprecated_1, localstorage_1;
    var R;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (localstorage_1_1) {
                localstorage_1 = localstorage_1_1;
            }],
        execute: function() {
            R = (function () {
                function R(http, router, localstorage) {
                    this.http = http;
                    this.router = router;
                    this.localstorage = localstorage;
                }
                R.prototype.isJsonType = function (headers) {
                    var contentType = headers.get("Content-Type");
                    return contentType.indexOf("application/json") > -1;
                };
                R.prototype.request = function (method, url, options) {
                    var _this = this;
                    var token = this.localstorage.getItem('jbreak.token');
                    if (!options)
                        options = {};
                    options.method = method;
                    if (!options.headers)
                        options.headers = new http_1.Headers();
                    options.headers.append('Authorization', "jBreak " + token);
                    options.headers.append('Content-Type', 'application/json');
                    return this.http.request(url, options).map(function (res) {
                        if (res.status == 401 || res.status == 403) {
                            _this.router.navigateByUrl('/login');
                        }
                        else if (_this.isJsonType(res.headers)) {
                            return res.json();
                        }
                        return res;
                    });
                };
                R.prototype.get = function (url, options) {
                    return this.request(http_1.RequestMethod.Get, url, options);
                };
                R.prototype.post = function (url, body, options) {
                    return this.request(http_1.RequestMethod.Post, url, R.checkOptions(body, options));
                };
                R.prototype.put = function (url, body, options) {
                    return this.request(http_1.RequestMethod.Put, url, R.checkOptions(body, options));
                };
                R.prototype.delete = function (url, options) {
                    return this.request(http_1.RequestMethod.Delete, url, options);
                };
                R.prototype.patch = function (url, body, options) {
                    return this.request(http_1.RequestMethod.Patch, url, R.checkOptions(body, options));
                };
                R.prototype.head = function (url, options) {
                    return this.request(http_1.RequestMethod.Head, url, options);
                };
                R.prototype.onErr = function (err) {
                    this.router.navigateByUrl('/login');
                };
                R.checkOptions = function (body, options) {
                    if (!options)
                        options = {};
                    if (body)
                        options.body = JSON.stringify(body);
                    return options;
                };
                R = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router, localstorage_1.JLocalStorage])
                ], R);
                return R;
            }());
            exports_2("R", R);
        }
    }
});
System.register("j/base/auth", ['@angular/core', "j/core/r", '@angular/router-deprecated', "j/core/localstorage"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, r_1, router_deprecated_2, localstorage_2;
    var JAuth;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (r_1_1) {
                r_1 = r_1_1;
            },
            function (router_deprecated_2_1) {
                router_deprecated_2 = router_deprecated_2_1;
            },
            function (localstorage_2_1) {
                localstorage_2 = localstorage_2_1;
            }],
        execute: function() {
            JAuth = (function () {
                function JAuth(localstorage, r, router) {
                    this.localstorage = localstorage;
                    this.r = r;
                    this.router = router;
                }
                JAuth.prototype.getNav = function () {
                    var _this = this;
                    this.r.get('/api/auth')
                        .subscribe(function (data) { return _this._logon(data); }, function (error) { return _this.r.onErr(error); });
                };
                JAuth.prototype.login = function (m) {
                    var _this = this;
                    this.r.post('/api/auth', m).subscribe(function (data) {
                        if (data.Err) {
                            alert(data.Err);
                        }
                        else {
                            _this._logon(data);
                        }
                    });
                };
                JAuth.prototype.logout = function () {
                    var _this = this;
                    this.r.delete('/api/auth').subscribe(function (data) {
                        if (data.Err) {
                            alert(data.Err);
                        }
                        else {
                            _this._logout(data);
                        }
                    });
                };
                JAuth.prototype.isLogin = function () {
                    return this.localstorage.getItem('jbreak.token') != null;
                };
                JAuth.prototype._logon = function (data) {
                    this.localstorage.setItem('jbreak.token', data.Id);
                    this.navs = data;
                    this.Name = this.navs.Name;
                };
                JAuth.prototype._logout = function (data) {
                    this.localstorage.removeItem('jbreak.token');
                    this.navs = null;
                    this.Name = null;
                    this.router.navigateByUrl('/login');
                };
                JAuth = __decorate([
                    core_3.Injectable(), 
                    __metadata('design:paramtypes', [localstorage_2.JLocalStorage, r_1.R, router_deprecated_2.Router])
                ], JAuth);
                return JAuth;
            }());
            exports_3("JAuth", JAuth);
        }
    }
});
System.register("j/base/cfg", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("j/core/filter", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var StrOpt, ZdOpt, MapOpt, JFilterCfg;
    function StrRuleCfg(mc, f, args) {
        return NewRuleCfg(mc, 'str', f, args);
    }
    exports_5("StrRuleCfg", StrRuleCfg);
    function ZdRuleCfg(mc, f, args) {
        return NewRuleCfg(mc, 'zd', f, args);
    }
    exports_5("ZdRuleCfg", ZdRuleCfg);
    function NewRuleCfg(mc, lx, f, args) {
        return { mc: mc, lx: lx, m: { f: f, o: '等于', v1: '' }, args: args };
    }
    function checkRule(r) {
        if (r.lx == 'str') {
            var l = Immutable.List(['等于', '不等于', '包含', '不包含', '开头是', '结尾是']);
            if (l.contains(r.m.o)) {
                if (r.m.v1.trim() != '')
                    return newRule(r.m);
            }
            else {
                return newRule(r.m);
            }
        }
        else if (r.lx == 'zd' && r.m.v1 != '') {
            return newRule(r.m);
        }
        return null;
    }
    function newRule(m) {
        return { f: m.f, o: MapOpt[m.o], v1: m.v1, v2: m.v2 };
    }
    return {
        setters:[],
        execute: function() {
            exports_5("StrOpt", StrOpt = ['等于', '包含', '为空', '不为空', '开头是', '结尾是', '不等于', '不包含']);
            exports_5("ZdOpt", ZdOpt = ['等于', '不等于']);
            MapOpt = {
                '等于': '=',
                '不等于': '<>',
                '包含': 'like',
                '不包含': '!like',
                '为空': 'empty',
                '不为空': '!empty',
                '开头是': 'start',
                '结尾是': 'end'
            };
            JFilterCfg = (function () {
                function JFilterCfg(rules) {
                    this.rules = rules;
                    this.defaultCfg = Immutable.fromJS(rules);
                }
                JFilterCfg.prototype.getFilterGroup = function () {
                    var lst = [];
                    this.rules.forEach(function (x) {
                        var r = checkRule(x);
                        if (r != null)
                            lst.push(r);
                    });
                    return lst;
                };
                JFilterCfg.prototype.reset = function () {
                    this.rules = this.defaultCfg.toJS();
                };
                return JFilterCfg;
            }());
            exports_5("JFilterCfg", JFilterCfg);
        }
    }
});
System.register("j/base/store", ["@angular/core", "j/core/r", "rxjs/Observable", "@angular/http"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, r_2, Observable_1, http_2;
    var Store, JListStore, JPageStore, JViewStore, JEditStore, JWfStore, JSubStore, JStore;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (r_2_1) {
                r_2 = r_2_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            Store = (function () {
                function Store(r, cfg) {
                    this.r = r;
                    this.cfg = cfg;
                    this.onDeleted = new core_4.EventEmitter();
                    this.onSaved = new core_4.EventEmitter();
                    this.onRefreshed = new core_4.EventEmitter();
                    this.m = {};
                    this._m = {};
                    cfg.useParentPath = cfg.useParentPath || true;
                    cfg.useSelfId = cfg.useSelfId || true;
                }
                Store.prototype.refresh = function () {
                    this.refreshOb().subscribe();
                };
                Store.prototype.refreshOb = function () {
                    return Observable_1.Observable.empty();
                };
                Store.prototype.getMid = function () {
                    return Observable_1.Observable.empty();
                };
                Store.prototype.getPath = function () {
                    var _this = this;
                    if (this.cfg.useParentPath && this.cfg.pStore) {
                        return this.cfg.pStore.getPath().map(function (x) { return x + _this.cfg.path; });
                    }
                    else {
                        return Observable_1.Observable.of(this.cfg.path);
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
            exports_6("Store", Store);
            JListStore = (function (_super) {
                __extends(JListStore, _super);
                function JListStore(r, cfg) {
                    _super.call(this, r, cfg);
                    this.total = 0;
                    this.filter = { rules: [], groups: [], ext: { search: '', page: 1, perPage: 20 } };
                }
                JListStore.prototype.refreshOb = function () {
                    var _this = this;
                    return this.getPath()
                        .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_2.Headers({ 'jBreak-Method': 'List' }) }).map(function (o) {
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
            exports_6("JListStore", JListStore);
            JPageStore = (function (_super) {
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
                        .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_2.Headers({ 'jBreak-Method': 'Page' }) }).map(function (o) {
                        _this.c = o.Items;
                        _this.total = o.Total;
                    }); });
                };
                return JPageStore;
            }(JListStore));
            exports_6("JPageStore", JPageStore);
            JViewStore = (function (_super) {
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
                        return Observable_1.Observable.of(this.m.Id);
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
                    return Observable_1.Observable.empty();
                };
                JViewStore.prototype.show = function (id, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    this.showOb(id, refresh).subscribe();
                };
                return JViewStore;
            }(Store));
            exports_6("JViewStore", JViewStore);
            JEditStore = (function (_super) {
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
                        _this._m = Immutable.fromJS(o);
                    });
                };
                JEditStore.prototype.saveOb = function () {
                    var _this = this;
                    return this.getPath()
                        .flatMap(function (path) { return _this.r.put(path, _this.m); })
                        .map(function (o) {
                        _this.refreshP();
                        _this._m = Immutable.fromJS(_this.m);
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
            exports_6("JEditStore", JEditStore);
            JWfStore = (function (_super) {
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
            exports_6("JWfStore", JWfStore);
            JSubStore = (function (_super) {
                __extends(JSubStore, _super);
                function JSubStore(r, cfg) {
                    _super.call(this, r, cfg);
                }
                JSubStore.prototype.add = function (m) {
                    this._m = null;
                    this.m = m;
                };
                JSubStore.prototype.show = function (m) {
                    this._m = Immutable.fromJS(m);
                    this.m = m;
                };
                JSubStore.prototype.save = function () {
                    if (this._m) {
                        this._m = Immutable.fromJS(this._m).extend(this.m);
                    }
                    else {
                        this._m = Immutable.fromJS(this.m);
                        this.pStore.m[this.cfg.path].push(this._m.toJS());
                    }
                };
                JSubStore.prototype.del = function () {
                    if (this._m) {
                        this.pStore.m[this.cfg.path] = Immutable.fromJS(this.pStore.m[this.cfg.path]).remove(this._m).toJS();
                    }
                };
                return JSubStore;
            }(Store));
            exports_6("JSubStore", JSubStore);
            JStore = (function () {
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
                    core_4.Injectable(), 
                    __metadata('design:paramtypes', [r_2.R])
                ], JStore);
                return JStore;
            }());
            exports_6("JStore", JStore);
        }
    }
});
System.register("j/base/zd", ['@angular/core', "j/core/r", 'rxjs/Observable'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, r_3, Observable_2;
    var JZd;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (r_3_1) {
                r_3 = r_3_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            }],
        execute: function() {
            JZd = (function () {
                function JZd(r) {
                    this.r = r;
                    this.path = '/api/jbzd/bq/';
                    this.zdMap = Immutable.Map();
                    this.loadingMap = Immutable.Map();
                }
                JZd.prototype.get = function (bq) {
                    var _this = this;
                    return new Observable_2.Observable(function (observer) {
                        var data = _this.zdMap.get(bq);
                        if (data) {
                            observer.next(data);
                            observer.complete();
                        }
                        else {
                            if (_this.loadingMap.has(bq)) {
                                var b = _this.loadingMap.get(bq);
                                b.push(observer);
                                _this.loadingMap = _this.loadingMap.set(bq, b);
                            }
                            else {
                                _this.loadingMap = _this.loadingMap.set(bq, [observer]);
                                _this.r.get(_this.path + bq).subscribe(function (data) {
                                    var sorted = Immutable.List(data).filter(function (x) { return x['Qz'] >= 0; }).sort(function (a, b) {
                                        if (a['Qz'] > b['Qz'])
                                            return -1;
                                        else if (a['Qz'] < b['Qz'])
                                            return 1;
                                        else if (a['Dm'] > b['Dm'])
                                            return 1;
                                        else if (a['Dm'] < b['Dm'])
                                            return -1;
                                        else
                                            return 0;
                                    }).toJS();
                                    _this.zdMap = _this.zdMap.set(bq, sorted);
                                    _this.loadingMap.get(bq).forEach(function (x) {
                                        x.next(sorted);
                                        x.complete();
                                    });
                                    _this.loadingMap.remove(bq);
                                });
                            }
                        }
                    });
                };
                JZd = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [r_3.R])
                ], JZd);
                return JZd;
            }());
            exports_7("JZd", JZd);
        }
    }
});
System.register("j/base", ["j/base/auth", "j/base/store", "j/base/zd"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_8(exports);
    }
    return {
        setters:[
            function (auth_1_1) {
                exportStar_1(auth_1_1);
            },
            function (store_1_1) {
                exportStar_1(store_1_1);
            },
            function (zd_1_1) {
                exportStar_1(zd_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("j/core/res", ['@angular/core', '@angular/http', "j/core/r", "rxjs/Observable"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_6, http_3, r_4, Observable_3;
    var Res, ViewRes, EditRes, SubRes, WfRes, ListRes, PageRes, JRes;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (r_4_1) {
                r_4 = r_4_1;
            },
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            }],
        execute: function() {
            Res = (function () {
                function Res(r, cfg) {
                    this.r = r;
                    this.cfg = cfg;
                    this.onDeleted = new core_6.EventEmitter();
                    this.onSaved = new core_6.EventEmitter();
                    this.onRefreshed = new core_6.EventEmitter();
                    this.m = {};
                    this._m = {};
                    cfg.useParentPath = cfg.useParentPath || true;
                    cfg.paramId = cfg.paramId || 'id';
                }
                Res.prototype.refresh = function () {
                    this.refreshOb().subscribe();
                };
                Res.prototype.refreshOb = function () {
                    return Observable_3.Observable.empty();
                };
                Res.prototype.getPath = function () {
                    var _this = this;
                    if (this.cfg.pRes && this.cfg.useParentPath) {
                        return this.cfg.pRes.getPath().map(function (x) { return x + _this.cfg.path; });
                    }
                    else {
                        return Observable_3.Observable.of(this.cfg.path);
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
            exports_9("Res", Res);
            ViewRes = (function (_super) {
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
                            return Observable_3.Observable.of(this.m.Id);
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
                    return Observable_3.Observable.empty();
                };
                ViewRes.prototype.show = function (id, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    this.showOb(id, refresh).subscribe();
                };
                return ViewRes;
            }(Res));
            exports_9("ViewRes", ViewRes);
            EditRes = (function (_super) {
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
            exports_9("EditRes", EditRes);
            SubRes = (function (_super) {
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
            exports_9("SubRes", SubRes);
            WfRes = (function (_super) {
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
            exports_9("WfRes", WfRes);
            ListRes = (function (_super) {
                __extends(ListRes, _super);
                function ListRes(r, cfg) {
                    _super.call(this, r, cfg);
                    this.total = 0;
                    this.filter = { rules: [], groups: [], ext: { search: '', page: 1, perPage: 20 } };
                }
                ListRes.prototype.refreshOb = function () {
                    var _this = this;
                    return this.getPath()
                        .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_3.Headers({ 'jBreak-Method': 'List' }) }).map(function (o) {
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
            exports_9("ListRes", ListRes);
            PageRes = (function (_super) {
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
                        .flatMap(function (path) { return _this.r.post(path, _this.filter, { headers: new http_3.Headers({ 'jBreak-Method': 'Page' }) }).map(function (o) {
                        _this.c = o.Items;
                        _this.total = o.Total;
                    }); });
                };
                return PageRes;
            }(ListRes));
            exports_9("PageRes", PageRes);
            JRes = (function () {
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
                    core_6.Injectable(), 
                    __metadata('design:paramtypes', [r_4.R])
                ], JRes);
                return JRes;
            }());
            exports_9("JRes", JRes);
        }
    }
});
System.register("j/core", ["j/core/localstorage", "j/core/r", "j/core/res", "j/core/filter"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_10(exports);
    }
    return {
        setters:[
            function (localstorage_3_1) {
                exportStar_2(localstorage_3_1);
            },
            function (r_5_1) {
                exportStar_2(r_5_1);
            },
            function (res_1_1) {
                exportStar_2(res_1_1);
            },
            function (filter_1_1) {
                exportStar_2(filter_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("j/fw/nav", ['@angular/core', '@angular/common', "j/base/auth"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_7, common_1, auth_2;
    var JFwNavTree, JFwNav;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (auth_2_1) {
                auth_2 = auth_2_1;
            }],
        execute: function() {
            JFwNavTree = (function () {
                function JFwNavTree(location) {
                    this.location = location;
                }
                JFwNavTree.prototype.isActive = function (uri) {
                    return this.location.path().startsWith('/' + uri);
                };
                JFwNavTree = __decorate([
                    core_7.Component({
                        selector: 'j-fw-nav-tree',
                        inputs: ['nodes:nodes'],
                        template: "<ul class=\"list-group\">\n<li *ngFor=\"let n of nodes\" class=\"list-group-item\">\n    <a *ngIf=\"n.Nodes.length>0\" (click)=\"n.$open=!n.$open\" [ngClass]=\"{active:isActive(n.Uri)}\">\n        <i class=\"fa\" [ngClass]=\"'fa-'+n.M.Icon\"></i>\n        {{n.Mc}}\n    </a>\n    <a *ngIf=\"n.Nodes.length==0\" [href]=\"'#/'+n.Uri.split('.').join('/')\">\n        <i class=\"fa\" [ngClass]=\"'fa-'+n.M.Icon\"></i>\n        {{n.Mc}}\n    </a>\n    <j-fw-nav-tree *ngIf=\"n.Nodes.length>0 && (n.$open||isActive(n.Uri))\" [nodes]=\"n.Nodes\"></j-fw-nav-tree>\n</li>\n</ul>",
                        directives: [JFwNavTree, common_1.NgClass],
                    }), 
                    __metadata('design:paramtypes', [common_1.Location])
                ], JFwNavTree);
                return JFwNavTree;
            }());
            exports_11("JFwNavTree", JFwNavTree);
            JFwNav = (function () {
                function JFwNav(auth) {
                    this.auth = auth;
                }
                JFwNav = __decorate([
                    core_7.Component({
                        selector: 'j-fw-nav',
                        template: "<j-fw-nav-tree  [nodes]=\"auth.navs?.Navs\"></j-fw-nav-tree>",
                        directives: [JFwNavTree],
                    }), 
                    __metadata('design:paramtypes', [auth_2.JAuth])
                ], JFwNav);
                return JFwNav;
            }());
            exports_11("JFwNav", JFwNav);
        }
    }
});
System.register("j/fw/top", ['@angular/core', '@angular/router-deprecated', "j/base/auth", "j/fw/jfw"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_8, router_deprecated_3, auth_3, jfw_1;
    var JFwTop;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (router_deprecated_3_1) {
                router_deprecated_3 = router_deprecated_3_1;
            },
            function (auth_3_1) {
                auth_3 = auth_3_1;
            },
            function (jfw_1_1) {
                jfw_1 = jfw_1_1;
            }],
        execute: function() {
            JFwTop = (function () {
                function JFwTop(auth, jfw) {
                    this.auth = auth;
                    this.jfw = jfw;
                }
                JFwTop.prototype.logout = function () {
                    this.auth.logout();
                };
                Object.defineProperty(JFwTop.prototype, "title", {
                    get: function () {
                        return this.jfw.appTitle || 'J-Framework';
                    },
                    enumerable: true,
                    configurable: true
                });
                JFwTop = __decorate([
                    core_8.Component({
                        selector: 'j-fw-top',
                        template: "<a class=\"navbar-brand\" [routerLink]=\"['./Home']\"> {{title}} </a>\n<div class=\"top-user pull-xs-right\" *ngIf=\"auth.isLogin()\">\n    <span>{{auth.Name}}</span>\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"logout()\"><i class=\"fa fa-sign-out\"></i></button>\n</div>",
                        directives: [router_deprecated_3.RouterLink],
                    }), 
                    __metadata('design:paramtypes', [auth_3.JAuth, jfw_1.JFw])
                ], JFwTop);
                return JFwTop;
            }());
            exports_12("JFwTop", JFwTop);
        }
    }
});
System.register("j/fw/setting", ['@angular/core'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_9;
    var JFwSetting;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            }],
        execute: function() {
            JFwSetting = (function () {
                function JFwSetting(dcl, elemRef) {
                    this.dcl = dcl;
                    this.elemRef = elemRef;
                }
                JFwSetting.prototype.showSetting = function (type, toggle) {
                    var _this = this;
                    if (toggle === void 0) { toggle = true; }
                    if (this.curType == type) {
                        if (toggle)
                            this.closeCurComp();
                        return;
                    }
                    else if (this.curType != null)
                        this.closeCurComp();
                    this.curType = type;
                    this.dcl.loadIntoLocation(type, this.elemRef, 'child').then(function (x) { return _this.curComp = x; });
                };
                JFwSetting.prototype.closeCurComp = function () {
                    this.curType = null;
                    if (this.curComp)
                        this.curComp.dispose();
                };
                JFwSetting = __decorate([
                    core_9.Component({
                        selector: 'j-fw-setting',
                        template: "<div #child></div>",
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [core_9.DynamicComponentLoader, core_9.ElementRef])
                ], JFwSetting);
                return JFwSetting;
            }());
            exports_13("JFwSetting", JFwSetting);
        }
    }
});
System.register("j/fw/fw", ['@angular/core', '@angular/router-deprecated', "j/fw/nav", "j/fw/top", "j/base/auth", "j/fw/setting", "j/fw/jfw"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_10, router_deprecated_4, nav_1, top_1, auth_4, setting_1, jfw_2;
    var JFwComp;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_deprecated_4_1) {
                router_deprecated_4 = router_deprecated_4_1;
            },
            function (nav_1_1) {
                nav_1 = nav_1_1;
            },
            function (top_1_1) {
                top_1 = top_1_1;
            },
            function (auth_4_1) {
                auth_4 = auth_4_1;
            },
            function (setting_1_1) {
                setting_1 = setting_1_1;
            },
            function (jfw_2_1) {
                jfw_2 = jfw_2_1;
            }],
        execute: function() {
            JFwComp = (function () {
                function JFwComp(auth, fw) {
                    this.auth = auth;
                    this.fw = fw;
                    fw.fw = this;
                }
                __decorate([
                    core_10.ViewChild(setting_1.JFwSetting), 
                    __metadata('design:type', setting_1.JFwSetting)
                ], JFwComp.prototype, "setting", void 0);
                JFwComp = __decorate([
                    core_10.Component({
                        selector: 'j-fw',
                        template: "<j-fw-top role=\"navigation\" class=\"navbar navbar-fixed-top navbar-dark bg-primary j-fw-top-sm\"></j-fw-top>\n<j-fw-nav  *ngIf=\"auth.isLogin()\"></j-fw-nav>\n<router-outlet></router-outlet>\n<j-fw-setting></j-fw-setting>",
                        directives: [router_deprecated_4.RouterOutlet, nav_1.JFwNav, top_1.JFwTop, setting_1.JFwSetting],
                    }), 
                    __metadata('design:paramtypes', [auth_4.JAuth, jfw_2.JFw])
                ], JFwComp);
                return JFwComp;
            }());
            exports_14("JFwComp", JFwComp);
        }
    }
});
System.register("j/fw/jfw", ['@angular/core'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_11;
    var JFw;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            }],
        execute: function() {
            JFw = (function () {
                function JFw() {
                }
                JFw.prototype.showSetting = function (type, toggle) {
                    if (toggle === void 0) { toggle = true; }
                    this.fw.setting.showSetting(type, toggle);
                };
                JFw.prototype.closeSetting = function () {
                    this.fw.setting.closeCurComp();
                };
                JFw = __decorate([
                    core_11.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JFw);
                return JFw;
            }());
            exports_15("JFw", JFw);
        }
    }
});
System.register("j/ui/page/page", ['@angular/core', '@angular/common'], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_12, common_2;
    var paginationConfig, PAGINATION_TEMPLATE, Pagination, pagerConfig, PAGER_TEMPLATE, Pager, PAGINATION_DIRECTIVES;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            paginationConfig = {
                maxSize: void 0,
                itemsPerPage: 10,
                boundaryLinks: false,
                directionLinks: true,
                firstText: '|<',
                previousText: '<',
                nextText: '>',
                lastText: '>|',
                rotate: true
            };
            PAGINATION_TEMPLATE = "\n  <ul class=\"pagination\" [ngClass]=\"classMap\">\n    <li class=\"pagination-first page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(1, $event)\">{{getText('first')}}</a>\n    </li>\n    <li class=\"pagination-prev page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n    <li *ngFor=\"#pg of pages\"\n        [class.active]=\"pg.active\"\n        [class.disabled]=\"disabled&&!pg.active\"\n        class=\"pagination-page page-item\">\n      <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\">{{pg.text}}</a>\n    </li>\n    <li class=\"pagination-next page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n    <li class=\"pagination-last page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n  </ul>\n  ";
            Pagination = (function () {
                function Pagination(cd, renderer, elementRef) {
                    this.cd = cd;
                    this.renderer = renderer;
                    this.elementRef = elementRef;
                    this.numPages = new core_12.EventEmitter();
                    this.pageChanged = new core_12.EventEmitter();
                    this.inited = false;
                    this.onChange = function (_) {
                    };
                    this.onTouched = function () {
                    };
                    cd.valueAccessor = this;
                    this.config = this.config || paginationConfig;
                }
                Object.defineProperty(Pagination.prototype, "itemsPerPage", {
                    get: function () {
                        return this._itemsPerPage;
                    },
                    set: function (v) {
                        this._itemsPerPage = v;
                        this.totalPages = this.calculateTotalPages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pagination.prototype, "totalItems", {
                    get: function () {
                        return this._totalItems;
                    },
                    set: function (v) {
                        this._totalItems = v;
                        this.totalPages = this.calculateTotalPages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pagination.prototype, "totalPages", {
                    get: function () {
                        return this._totalPages;
                    },
                    set: function (v) {
                        this._totalPages = v;
                        this.numPages.emit(v);
                        if (this.inited) {
                            this.selectPage(this.page);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pagination.prototype, "page", {
                    get: function () {
                        return this._page;
                    },
                    set: function (value) {
                        if (this._page == value)
                            return;
                        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
                        this.pageChanged.emit(this._page);
                    },
                    enumerable: true,
                    configurable: true
                });
                Pagination.prototype.ngOnInit = function () {
                    this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
                    this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
                    this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
                    this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
                    this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
                    this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
                    this.totalPages = this.calculateTotalPages();
                    this.pages = this.getPages(this.page, this.totalPages);
                    this.page = this.cd.value;
                    this.inited = true;
                };
                Pagination.prototype.writeValue = function (value) {
                    this.page = value;
                    this.pages = this.getPages(this.page, this.totalPages);
                };
                Pagination.prototype.selectPage = function (page, event) {
                    if (event) {
                        event.preventDefault();
                    }
                    if (!this.disabled) {
                        if (event && event.target) {
                            var target = event.target;
                            target.blur();
                        }
                        this.writeValue(page);
                        this.cd.viewToModelUpdate(this.page);
                    }
                };
                Pagination.prototype.getText = function (key) {
                    return this[key + 'Text'] || paginationConfig[key + 'Text'];
                };
                Pagination.prototype.noPrevious = function () {
                    return this.page === 1;
                };
                Pagination.prototype.noNext = function () {
                    return this.page === this.totalPages;
                };
                Pagination.prototype.makePage = function (number, text, isActive) {
                    return {
                        number: number,
                        text: text,
                        active: isActive
                    };
                };
                Pagination.prototype.getPages = function (currentPage, totalPages) {
                    var pages = [];
                    var startPage = 1;
                    var endPage = totalPages;
                    var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
                    if (isMaxSized) {
                        if (this.rotate) {
                            startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                            endPage = startPage + this.maxSize - 1;
                            if (endPage > totalPages) {
                                endPage = totalPages;
                                startPage = endPage - this.maxSize + 1;
                            }
                        }
                        else {
                            startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                            endPage = Math.min(startPage + this.maxSize - 1, totalPages);
                        }
                    }
                    for (var number = startPage; number <= endPage; number++) {
                        var page = this.makePage(number, number.toString(), number === currentPage);
                        pages.push(page);
                    }
                    if (isMaxSized && !this.rotate) {
                        if (startPage > 1) {
                            var previousPageSet = this.makePage(startPage - 1, '...', false);
                            pages.unshift(previousPageSet);
                        }
                        if (endPage < totalPages) {
                            var nextPageSet = this.makePage(endPage + 1, '...', false);
                            pages.push(nextPageSet);
                        }
                    }
                    return pages;
                };
                Pagination.prototype.calculateTotalPages = function () {
                    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
                    return Math.max(totalPages || 0, 1);
                };
                Pagination.prototype.registerOnChange = function (fn) {
                    this.onChange = fn;
                };
                Pagination.prototype.registerOnTouched = function (fn) {
                    this.onTouched = fn;
                };
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Number)
                ], Pagination.prototype, "maxSize", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Boolean)
                ], Pagination.prototype, "boundaryLinks", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Boolean)
                ], Pagination.prototype, "directionLinks", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', String)
                ], Pagination.prototype, "firstText", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', String)
                ], Pagination.prototype, "previousText", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', String)
                ], Pagination.prototype, "nextText", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', String)
                ], Pagination.prototype, "lastText", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Boolean)
                ], Pagination.prototype, "rotate", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Boolean)
                ], Pagination.prototype, "disabled", void 0);
                __decorate([
                    core_12.Output(), 
                    __metadata('design:type', core_12.EventEmitter)
                ], Pagination.prototype, "numPages", void 0);
                __decorate([
                    core_12.Output(), 
                    __metadata('design:type', core_12.EventEmitter)
                ], Pagination.prototype, "pageChanged", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Object)
                ], Pagination.prototype, "itemsPerPage", null);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Number)
                ], Pagination.prototype, "totalItems", null);
                Pagination = __decorate([
                    core_12.Component({
                        selector: 'pagination[ngModel]',
                        template: PAGINATION_TEMPLATE,
                        directives: [common_2.NgFor, common_2.NgIf]
                    }),
                    __param(0, core_12.Self()), 
                    __metadata('design:paramtypes', [common_2.NgModel, core_12.Renderer, core_12.ElementRef])
                ], Pagination);
                return Pagination;
            }());
            exports_16("Pagination", Pagination);
            pagerConfig = {
                itemsPerPage: 10,
                previousText: '« Previous',
                nextText: 'Next »',
                align: true
            };
            PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
            Pager = (function (_super) {
                __extends(Pager, _super);
                function Pager(cd, renderer, elementRef) {
                    _super.call(this, cd, renderer, elementRef);
                    this.config = pagerConfig;
                }
                Pager = __decorate([
                    core_12.Component({
                        selector: 'pager[ngModel]',
                        properties: [
                            'align',
                            'totalItems', 'itemsPerPage',
                            'previousText', 'nextText',
                        ],
                        template: PAGER_TEMPLATE,
                        directives: [common_2.NgClass]
                    }),
                    __param(0, core_12.Self()), 
                    __metadata('design:paramtypes', [common_2.NgModel, core_12.Renderer, core_12.ElementRef])
                ], Pager);
                return Pager;
            }(Pagination));
            exports_16("Pager", Pager);
            exports_16("PAGINATION_DIRECTIVES", PAGINATION_DIRECTIVES = [Pagination, Pager]);
        }
    }
});
System.register("j/fw/bld", ["@angular/core", "j/ui/page/page", "@angular/common"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_13, page_1, common_3;
    var defaultCmds, JFwBld, JBldNull, JBldBase;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            },
            function (common_3_1) {
                common_3 = common_3_1;
            }],
        execute: function() {
            defaultCmds = {
                'refresh': ['刷新', 'fa-refresh'],
                'add': ['添加', 'fa-plus'],
                'save': ['保存', 'fa-save'],
                'del': ['删除', 'fa-trash']
            };
            JFwBld = (function () {
                function JFwBld() {
                }
                Object.defineProperty(JFwBld.prototype, "ctx", {
                    get: function () {
                        return this.cfg.ctx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JFwBld.prototype, "m", {
                    get: function () {
                        return this.cfg.ctx.m;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JFwBld.prototype, "showFooter", {
                    get: function () {
                        return this.cfg.footer || (this.ctx && this.ctx.pager);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_13.Input('cfg'), 
                    __metadata('design:type', Object)
                ], JFwBld.prototype, "cfg", void 0);
                JFwBld = __decorate([
                    core_13.Component({
                        selector: 'j-fw-bld',
                        directives: [common_3.NgFor, common_3.NgIf, page_1.PAGINATION_DIRECTIVES],
                        template: "<div class=\"card-header\">\n    <i class=\"fa\" [ngClass]=\"cfg.icon||'fa-list-alt'\"></i>  {{cfg.title}}<code *ngIf=\"cfg.type=='page'\">{{ctx.total}}</code>\n</div>\n<div class=\"card-block j-bld-toolbar\">\n    <div class=\"btn-group btn-group-sm\" role=\"group\">\n        <button type=\"button\" class=\"btn \" [ngClass]=\"b.clazz||'btn-secondary'\" *ngFor=\"#b of cfg.tools\" (click)=\"b.exec && b.exec()\"><i class=\"fa\" [ngClass]=\"b.icon||'fa-tasks'\"></i> {{b.title}}</button>\n    </div>\n    <div class=\"btn-group btn-group-sm pull-right j-bld-opts\" role=\"group\">\n        <button type=\"button\" class=\"btn btn-link\"  *ngIf=\"cfg.search\" (click)=\"showSearch=!showSearch\"><i class=\"fa fa-search\"></i></button>\n        <button type=\"button\" class=\"btn btn-link\"  *ngIf=\"cfg.filter\" (click)=\"cfg.filter.exec()\"><i class=\"fa fa-filter\"></i></button>\n        <button type=\"button\" class=\"btn btn-link\" *ngFor=\"#b of cfg.opts\" (click)=\"b.exec && b.exec()\"><i class=\"fa\" [ngClass]=\"b.icon||'fa-tasks'\"></i> {{b.title}}</button>\n    </div>\n</div>\n<div class=\"j-bld-search\" *ngIf=\"showSearch\">\n    <div class=\"input-group input-group-sm\">\n        <input type=\"text\" class=\"form-control\" [attr.placeholder]=\"cfg.search.msg\" [(ngModel)]=\"cfg.ctx.filter.ext.search\">\n        <span class=\"input-group-addon\" (click)=\"cfg.ctx.refresh()\">\u67E5\u627E</span>\n    </div>\n</div>\n<div class=\"j-bld-body\" [ngClass]=\"{'j-wi-search':showSearch,'j-wi-footer':showFooter}\">\n<ng-content></ng-content>\n</div>\n<div class=\"card-footer\" *ngIf=\"showFooter\">\n    <pagination *ngIf=\"cfg.ctx?.pager\" class=\"pagination-sm pull-sm-right\" [boundaryLinks]=\"true\" [totalItems]=\"cfg.ctx.total\" [maxSize]=\"6\"\n                [itemsPerPage]=\"cfg.ctx.filter.ext.perPage\" [(ngModel)]=\"cfg.ctx.filter.ext.page\" (pageChanged)=\"cfg.ctx.pager($event)\"></pagination>\n</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], JFwBld);
                return JFwBld;
            }());
            exports_17("JFwBld", JFwBld);
            JBldNull = (function () {
                function JBldNull() {
                }
                JBldNull = __decorate([
                    core_13.Component({
                        selector: 'j-bld-null',
                        directives: [page_1.PAGINATION_DIRECTIVES],
                        template: '<router-outlet></router-outlet>',
                    }), 
                    __metadata('design:paramtypes', [])
                ], JBldNull);
                return JBldNull;
            }());
            exports_17("JBldNull", JBldNull);
            JBldBase = (function () {
                function JBldBase(cfg) {
                    this.cfg = cfg;
                    this.init();
                }
                Object.defineProperty(JBldBase.prototype, "ctx", {
                    get: function () {
                        return this.cfg.ctx;
                    },
                    enumerable: true,
                    configurable: true
                });
                JBldBase.prototype.init = function () {
                    var _this = this;
                    this.cfg.tools && this.cfg.tools.forEach(function (x) { return _this.initCmd(x); });
                    this.cfg.opts && this.cfg.opts.forEach(function (x) { return _this.initCmd(x); });
                    this.cfg.ctrls && this.cfg.ctrls.forEach(function (x) { return _this.initCmd(x); });
                    if (this.cfg.saved && this.ctx) {
                        this.ctx.onSaved.subscribe(function (id) { return _this.cfg.saved.router.parent.navigate([_this.cfg.saved.route2 || './Edit', { id: id }]); });
                    }
                };
                JBldBase.prototype.initCmd = function (x) {
                    var _this = this;
                    if (x.type && defaultCmds[x.type]) {
                        x.title = x.title || defaultCmds[x.type][0];
                        x.icon = x.icon || defaultCmds[x.type][1];
                        if (!x.exec)
                            x.exec = function () { return _this.ctx && _this.ctx[x.type](); };
                    }
                };
                __decorate([
                    core_13.ViewChild(JFwBld), 
                    __metadata('design:type', JFwBld)
                ], JBldBase.prototype, "bld", void 0);
                return JBldBase;
            }());
            exports_17("JBldBase", JBldBase);
        }
    }
});
System.register("j/fw", ["j/fw/jfw", "j/fw/top", "j/fw/nav", "j/fw/setting", "j/fw/bld", "j/fw/fw"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    function exportStar_3(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_18(exports);
    }
    return {
        setters:[
            function (jfw_3_1) {
                exportStar_3(jfw_3_1);
            },
            function (top_2_1) {
                exportStar_3(top_2_1);
            },
            function (nav_2_1) {
                exportStar_3(nav_2_1);
            },
            function (setting_2_1) {
                exportStar_3(setting_2_1);
            },
            function (bld_1_1) {
                exportStar_3(bld_1_1);
            },
            function (fw_1_1) {
                exportStar_3(fw_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("j/pipe/filter", ['@angular/core'], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_14;
    var JFilterPipe;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            }],
        execute: function() {
            JFilterPipe = (function () {
                function JFilterPipe() {
                }
                JFilterPipe.prototype.transform = function (value, args) {
                    var filter = args[0];
                    if (filter && Array.isArray(value)) {
                        var filterKeys_1 = Object.keys(filter);
                        return value.filter(function (item) {
                            return filterKeys_1.reduce(function (memo, keyName) { return memo && item[keyName].indexOf(filter[keyName]) != -1; }, true);
                        });
                    }
                    else {
                        return value;
                    }
                };
                JFilterPipe = __decorate([
                    core_14.Pipe({ name: 'jFilter' }), 
                    __metadata('design:paramtypes', [])
                ], JFilterPipe);
                return JFilterPipe;
            }());
            exports_19("JFilterPipe", JFilterPipe);
        }
    }
});
System.register("j/pipe", ["j/pipe/filter"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    function exportStar_4(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_20(exports);
    }
    return {
        setters:[
            function (filter_2_1) {
                exportStar_4(filter_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("j/utils/dom", [], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var dimensionCache;
    function getDimensions(ele, id) {
        var dimensions = dimensionCache[id];
        if (!dimensions) {
            if (ele.offsetWidth && ele.offsetHeight) {
                dimensions = dimensionCache[id] = {
                    width: ele.offsetWidth,
                    height: ele.offsetHeight,
                    left: ele.offsetLeft,
                    top: ele.offsetTop
                };
            }
            else {
                return { width: 0, height: 0, left: 0, top: 0 };
            }
        }
        return dimensions;
    }
    exports_21("getDimensions", getDimensions);
    function flushDimensionCache() {
        dimensionCache = {};
    }
    exports_21("flushDimensionCache", flushDimensionCache);
    function clearDimensions(id) {
        delete dimensionCache[id];
    }
    exports_21("clearDimensions", clearDimensions);
    return {
        setters:[],
        execute: function() {
            dimensionCache = {};
        }
    }
});
System.register("j/ui/jui", ["j/utils/dom"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var dom;
    var _uid, Jui;
    return {
        setters:[
            function (dom_1) {
                dom = dom_1;
            }],
        execute: function() {
            _uid = 0;
            Jui = (function () {
                function Jui(elemRef) {
                    this.elemRef = elemRef;
                    this._id = 'i' + _uid++;
                }
                Jui.prototype.getElemRef = function () {
                    return this.elemRef;
                };
                Jui.prototype.getNativeElem = function () {
                    return this.elemRef.nativeElement;
                };
                Jui.prototype.getDimensions = function () {
                    return dom.getDimensions(this.elemRef.nativeElement, this._id);
                };
                Jui.prototype.width = function () {
                    return dom.getDimensions(this.elemRef.nativeElement, this._id).width;
                };
                Jui.prototype.height = function () {
                    return dom.getDimensions(this.elemRef.nativeElement, this._id).height;
                };
                Jui.prototype.ngOnDestroy = function () {
                    dom.clearDimensions(this._id);
                };
                return Jui;
            }());
            exports_22("Jui", Jui);
        }
    }
});
System.register("j/ui/nav/nav-tree", ['@angular/core', '@angular/router-deprecated'], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_15, router_deprecated_5;
    var NavTree;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (router_deprecated_5_1) {
                router_deprecated_5 = router_deprecated_5_1;
            }],
        execute: function() {
            NavTree = (function () {
                function NavTree() {
                }
                NavTree = __decorate([
                    core_15.Component({
                        selector: 'nav-tree',
                        directives: [router_deprecated_5.ROUTER_DIRECTIVES, NavTree],
                        inputs: ['nodes:nodes'],
                        template: "<ul class=\"list-group\">\n<li *ngFor=\"#n of nodes\" class=\"list-group-item\">\n    <a [routerLink]=\"['./Edit',{id:n.M.Id}]\"><i class=\"fa {{'fa-'+n.M.Icon}}\"></i>{{n.Mc}}</a>\n    <i *ngIf=\"n.Nodes.length>0\" class=\"pull-right fa {{n.$open?'fa-chevron-up':'fa-chevron-down'}}\" (click)=\"n.$open=!n.$open\" ></i>\n    <nav-tree *ngIf=\"n.$open && n.Nodes.length>0\" [nodes]=\"n.Nodes\"></nav-tree>\n</li>\n</ul>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], NavTree);
                return NavTree;
            }());
            exports_23("NavTree", NavTree);
        }
    }
});
System.register("j/ui/uploader/uploader", ['@angular/core'], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_16;
    var Ufile, JUploader;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            }],
        execute: function() {
            Ufile = (function () {
                function Ufile(id, originalName, size) {
                    this.id = id;
                    this.originalName = originalName;
                    this.size = size;
                    this.progress = {
                        loaded: 0,
                        total: 0,
                        percent: 0
                    };
                    this.done = false;
                    this.error = false;
                    this.abort = false;
                }
                Ufile.prototype.setProgres = function (progress) {
                    this.progress = progress;
                };
                Ufile.prototype.setError = function () {
                    this.error = true;
                    this.done = true;
                };
                Ufile.prototype.setAbort = function () {
                    this.abort = true;
                    this.done = true;
                };
                Ufile.prototype.onFinished = function (status, statusText, response) {
                    this.status = status;
                    this.statusText = statusText;
                    this.response = response;
                    this.done = true;
                };
                return Ufile;
            }());
            JUploader = (function () {
                function JUploader() {
                    this.cors = false;
                    this.withCredentials = false;
                    this.multiple = false;
                    this.maxUploads = 3;
                    this.allowedExtensions = [];
                    this.maxSize = false;
                    this.data = {};
                    this.noParams = true;
                    this.autoUpload = true;
                    this.multipart = true;
                    this.method = 'POST';
                    this.debug = false;
                    this.customHeaders = {};
                    this.encodeHeaders = true;
                    this.authTokenPrefix = "Bearer";
                    this.authToken = undefined;
                    this.fieldName = "file";
                    this._queue = [];
                    this._emitter = new core_16.EventEmitter(true);
                }
                JUploader.prototype.setOptions = function (options) {
                    this.url = options.url != null ? options.url : this.url;
                    this.cors = options.cors != null ? options.cors : this.cors;
                    this.withCredentials = options.withCredentials != null ? options.withCredentials : this.withCredentials;
                    this.multiple = options.multiple != null ? options.multiple : this.multiple;
                    this.maxUploads = options.maxUploads != null ? options.maxUploads : this.maxUploads;
                    this.allowedExtensions = options.allowedExtensions != null ? options.allowedExtensions : this.allowedExtensions;
                    this.maxSize = options.maxSize != null ? options.maxSize : this.maxSize;
                    this.data = options.data != null ? options.data : this.data;
                    this.noParams = options.noParams != null ? options.noParams : this.noParams;
                    this.autoUpload = options.autoUpload != null ? options.autoUpload : this.autoUpload;
                    this.multipart = options.multipart != null ? options.multipart : this.multipart;
                    this.method = options.method != null ? options.method : this.method;
                    this.debug = options.debug != null ? options.debug : this.debug;
                    this.customHeaders = options.customHeaders != null ? options.customHeaders : this.customHeaders;
                    this.encodeHeaders = options.encodeHeaders != null ? options.encodeHeaders : this.encodeHeaders;
                    this.authTokenPrefix = options.authTokenPrefix != null ? options.authTokenPrefix : this.authTokenPrefix;
                    this.authToken = options.authToken != null ? options.authToken : this.authToken;
                    this.fieldName = options.fieldName != null ? options.fieldName : this.fieldName;
                    if (!this.multiple) {
                        this.maxUploads = 1;
                    }
                };
                JUploader.prototype.uploadFilesInQueue = function () {
                    var _this = this;
                    var newFiles = this._queue.filter(function (f) { return !f.uploading; });
                    newFiles.forEach(function (f) {
                        _this.uploadFile(f);
                    });
                };
                ;
                JUploader.prototype.uploadFile = function (file) {
                    var _this = this;
                    var xhr = new XMLHttpRequest();
                    var form = new FormData();
                    form.append(this.fieldName, file, file.name);
                    var uploadingFile = new Ufile(this.generateRandomIndex(), file.name, file.size);
                    var queueIndex = this._queue.findIndex(function (x) { return x === file; });
                    xhr.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            var percent = Math.round(e.loaded / e.total * 100);
                            uploadingFile.setProgres({
                                total: e.total,
                                loaded: e.loaded,
                                percent: percent
                            });
                            _this._emitter.emit(uploadingFile);
                        }
                    };
                    xhr.upload.onabort = function (e) {
                        uploadingFile.setAbort();
                        _this._emitter.emit(uploadingFile);
                    };
                    xhr.upload.onerror = function (e) {
                        uploadingFile.setError();
                        _this._emitter.emit(uploadingFile);
                    };
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            uploadingFile.onFinished(xhr.status, xhr.statusText, xhr.response);
                            _this.removeFileFromQueue(queueIndex);
                            _this._emitter.emit(uploadingFile);
                        }
                    };
                    xhr.open(this.method, this.url, true);
                    xhr.withCredentials = this.withCredentials;
                    if (this.customHeaders) {
                        Object.keys(this.customHeaders).forEach(function (key) {
                            xhr.setRequestHeader(key, _this.customHeaders[key]);
                        });
                    }
                    if (this.authToken) {
                        xhr.setRequestHeader("Authorization", this.authTokenPrefix + " " + this.authToken);
                    }
                    xhr.send(form);
                };
                JUploader.prototype.addFilesToQueue = function (files) {
                    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                        var file = files_1[_i];
                        if (this.isFile(file) && !this.inQueue(file)) {
                            this._queue.push(file);
                        }
                    }
                    if (this.autoUpload) {
                        this.uploadFilesInQueue();
                    }
                };
                JUploader.prototype.removeFileFromQueue = function (i) {
                    this._queue.splice(i, 1);
                };
                JUploader.prototype.clearQueue = function () {
                    this._queue = [];
                };
                JUploader.prototype.getQueueSize = function () {
                    return this._queue.length;
                };
                JUploader.prototype.inQueue = function (file) {
                    var fileInQueue = this._queue.filter(function (f) { return f === file; });
                    return fileInQueue.length ? true : false;
                };
                JUploader.prototype.isFile = function (file) {
                    return file !== null && (file instanceof Blob || (file.name && file.size));
                };
                JUploader.prototype.log = function (msg) {
                    if (!this.debug) {
                        return;
                    }
                    console.log('[JUploader]:', msg);
                };
                JUploader.prototype.generateRandomIndex = function () {
                    return Math.random().toString(36).substring(7);
                };
                JUploader = __decorate([
                    core_16.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JUploader);
                return JUploader;
            }());
            exports_24("JUploader", JUploader);
        }
    }
});
System.register("j/ui/uploader/select", ['@angular/core', "j/ui/uploader/uploader"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var core_17, uploader_1;
    var JUpload;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (uploader_1_1) {
                uploader_1 = uploader_1_1;
            }],
        execute: function() {
            JUpload = (function () {
                function JUpload(el) {
                    var _this = this;
                    this.el = el;
                    this.onUpload = new core_17.EventEmitter();
                    this.uploader = new uploader_1.JUploader();
                    setTimeout(function () {
                        _this.uploader.setOptions(_this.options);
                    });
                    this.uploader._emitter.subscribe(function (data) {
                        _this.onUpload.emit(data);
                    });
                }
                JUpload.prototype.onFiles = function () {
                    var files = this.el.nativeElement.files;
                    if (files.length) {
                        this.uploader.addFilesToQueue(files);
                    }
                };
                JUpload = __decorate([
                    core_17.Directive({
                        selector: '[j-upload]',
                        inputs: ['options: j-upload'],
                        outputs: ['onUpload'],
                        host: { '(change)': 'onFiles()' }
                    }), 
                    __metadata('design:paramtypes', [core_17.ElementRef])
                ], JUpload);
                return JUpload;
            }());
            exports_25("JUpload", JUpload);
        }
    }
});
System.register("j/ui", ["j/ui/jui", "j/ui/page/page", "j/ui/nav/nav-tree", "j/ui/uploader/uploader", "j/ui/uploader/select"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    function exportStar_5(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_26(exports);
    }
    return {
        setters:[
            function (jui_1_1) {
                exportStar_5(jui_1_1);
            },
            function (page_2_1) {
                exportStar_5(page_2_1);
            },
            function (nav_tree_1_1) {
                exportStar_5(nav_tree_1_1);
            },
            function (uploader_2_1) {
                exportStar_5(uploader_2_1);
            },
            function (select_1_1) {
                exportStar_5(select_1_1);
            }],
        execute: function() {
        }
    }
});
System.register("j/utils", ["j/utils/dom"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    function exportStar_6(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_27(exports);
    }
    return {
        setters:[
            function (dom_2_1) {
                exportStar_6(dom_2_1);
            }],
        execute: function() {
        }
    }
});
System.register("j", ["j/base", "j/core", "j/fw", "j/pipe", "j/ui", "j/utils"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    function exportStar_7(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_28(exports);
    }
    return {
        setters:[
            function (base_1_1) {
                exportStar_7(base_1_1);
            },
            function (core_18_1) {
                exportStar_7(core_18_1);
            },
            function (fw_2_1) {
                exportStar_7(fw_2_1);
            },
            function (pipe_1_1) {
                exportStar_7(pipe_1_1);
            },
            function (ui_1_1) {
                exportStar_7(ui_1_1);
            },
            function (utils_1_1) {
                exportStar_7(utils_1_1);
            }],
        execute: function() {
        }
    }
});
