import {provide, enableProdMode} from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS} from 'angular2/http';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import {JLocalStorage} from "j/core/localstorage"
import {R} from 'j/core/r'
import {JRes} from 'j/core/res'
import { App } from './app';

var universalInjectables = [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    JLocalStorage,R,JRes
];
// enableProdMode();
bootstrap(App, [universalInjectables]);