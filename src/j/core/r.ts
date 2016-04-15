import {Injectable } from 'angular2/core';
import {Http, Headers, RequestOptionsArgs, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import {JLocalStorage} from './localstorage'

@Injectable()
export class R {

    constructor(private http:Http, private router:Router, private localstorage:JLocalStorage) {
    }

    isJsonType(headers: Headers){
        let contentType= headers.get("Content-Type");
        return contentType.indexOf("application/json")>-1;
    }

    request(method:RequestMethod, url:string, options?:RequestOptionsArgs):Observable<any> {
        let token = this.localstorage.getItem('jbreak.token');

        if (!options) options = {};
        options.method = method;
        if (!options.headers) options.headers = new Headers();
        options.headers.append('Authorization', "jBreak " + token);
        options.headers.append('Content-Type', 'application/json');

        return this.http.request(url, options).map(res=> {
            if (res.status == 401 || res.status == 403) {
                this.router.navigateByUrl('/login');
            } else if (this.isJsonType(res.headers)) {
                return res.json();
            }
            return res;
        });
    }

    get(url:string, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Get, url, options);
    }

    post(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Post, url, R.checkOptions(body, options));
    }

    put(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Put, url, R.checkOptions(body, options));
    }

    delete(url:string, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Delete, url, options);
    }

    patch(url:string, body:any, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Patch, url, R.checkOptions(body, options));
    }

    head(url:string, options?:RequestOptionsArgs):Observable<any> {
        return this.request(RequestMethod.Head, url, options);
    }

    onErr(err){
        this.router.navigateByUrl('/login');
    }

    private static checkOptions(body?:any, options?:RequestOptionsArgs):RequestOptionsArgs {
        if (!options) options = {};
        if (body)
            options.body = JSON.stringify(body);
        return options;
    }
}