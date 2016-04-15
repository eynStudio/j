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
