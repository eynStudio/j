import {Injectable} from 'angular2/core';

@Injectable()
export class JLocalStorage{
    _data:any={};

    getItem(key:string){
        if (window.localStorage){
            return window.localStorage.getItem(key);
        }else {
            return this._data[key];
        }
    }
    setItem(key:string,value:string){
        if (window.localStorage){
            window.localStorage.setItem(key,value);
        }else {
            this._data[key]=value;
        }
    }
    removeItem(key:string){
        if (window.localStorage){
            window.localStorage.removeItem(key);
        }else {
            delete this._data[key];
        }
    }
}