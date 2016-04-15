"use strict";
function StrRuleCfg(mc, f, args) {
    return NewRuleCfg(mc, 'str', f, args);
}
exports.StrRuleCfg = StrRuleCfg;
function ZdRuleCfg(mc, f, args) {
    return NewRuleCfg(mc, 'zd', f, args);
}
exports.ZdRuleCfg = ZdRuleCfg;
function NewRuleCfg(mc, lx, f, args) {
    return { mc: mc, lx: lx, m: { f: f, o: '等于', v1: '' }, args: args };
}
exports.StrOpt = ['等于', '包含', '为空', '不为空', '开头是', '结尾是', '不等于', '不包含'];
exports.ZdOpt = ['等于', '不等于'];
var MapOpt = {
    '等于': '=',
    '不等于': '<>',
    '包含': 'like',
    '不包含': '!like',
    '为空': 'empty',
    '不为空': '!empty',
    '开头是': 'start',
    '结尾是': 'end'
};
var JFilterCfg = (function () {
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
exports.JFilterCfg = JFilterCfg;
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
