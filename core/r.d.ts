import { Http, Headers, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router-deprecated';
import { JLocalStorage } from './localstorage';
export declare class R {
    private http;
    private router;
    private localstorage;
    constructor(http: Http, router: Router, localstorage: JLocalStorage);
    isJsonType(headers: Headers): boolean;
    request(method: RequestMethod, url: string, options?: RequestOptionsArgs): Observable<any>;
    get(url: string, options?: RequestOptionsArgs): Observable<any>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    delete(url: string, options?: RequestOptionsArgs): Observable<any>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    head(url: string, options?: RequestOptionsArgs): Observable<any>;
    onErr(err: any): void;
    private static checkOptions(body?, options?);
}
