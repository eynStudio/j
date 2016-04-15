export interface JCmdCfg{
    title?:string;
    type?:string;
    icon?:string; //left icon
    icon2?:string;//right icon
    tip?:string;
    can?:()=>boolean;
    exec?:()=>any;
    clazz?:string;
}