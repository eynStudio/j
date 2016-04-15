export interface JRule{
    f:string;
    o:string;
    v1:string;
    v2?:string;
}

export interface JRuleCfg{
    mc:string;
    lx:string;
    m:JRule;
    args?:any;
}

export function StrRuleCfg(mc:string,f:string,args?:any):JRuleCfg{
    return NewRuleCfg(mc,'str',f,args);
}
export function ZdRuleCfg(mc:string,f:string,args?:any):JRuleCfg{
    return NewRuleCfg(mc,'zd',f,args);
}
function NewRuleCfg(mc:string,lx:string,f:string,args?:any):JRuleCfg{
    return {mc: mc, lx: lx, m: {f: f, o: '等于', v1: ''},args:args}
}

export const StrOpt:string[]=['等于','包含','为空','不为空','开头是','结尾是','不等于','不包含'];
export const ZdOpt:string[]=['等于','不等于'];

const MapOpt:Object= {
    '等于': '=',
    '不等于': '<>',
    '包含': 'like',
    '不包含': '!like',
    '为空': 'empty',
    '不为空': '!empty',
    '开头是': 'start',
    '结尾是': 'end'
};

export class JFilterCfg {
    defaultCfg:Immutable.List<JRuleCfg>;
    constructor(public rules:JRuleCfg[]) {
        this.defaultCfg=Immutable.fromJS(rules);
    }

    getFilterGroup():JRule[] {
        let lst:JRule[] = [];
        this.rules.forEach(x=> {
            let r = checkRule(x);
            if (r != null) lst.push(r)
        });
        return lst;
    }
    reset(){
        this.rules=this.defaultCfg.toJS();
    }
}

function checkRule(r:JRuleCfg):JRule {
    if (r.lx == 'str') {
        let l = Immutable.List(['等于', '不等于', '包含', '不包含', '开头是', '结尾是']);
        if (l.contains(r.m.o)) {
            if (r.m.v1.trim() != '') return newRule(r.m);
        } else {
            return newRule(r.m);
        }
    } else if (r.lx == 'zd' && r.m.v1 != '') {
        return newRule(r.m);
    }
    return null;
}

function newRule(m:JRule):JRule {
    return {f: m.f, o: MapOpt[m.o], v1: m.v1, v2: m.v2}
}