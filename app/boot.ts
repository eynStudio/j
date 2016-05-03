import {provide, enableProdMode} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS} from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated'; 
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