import {Injectable} from '@angular/core';
import { R } from '../core/r';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JZd {
    path:string='/api/jbzd/bq/';
    zdMap=Immutable.Map();
    loadingMap=Immutable.Map<string,Array<any>>();
    constructor(private r:R) {
    }

    get(bq:string):Observable<any> {
        return new Observable(observer => {
            let data = this.zdMap.get(bq);
            if (data) {
                data.forEach(x=> observer.next(x));
                observer.complete();
            } else {
                if (this.loadingMap.has(bq)) {
                    let b = this.loadingMap.get(bq);
                    b.push(observer);
                    this.loadingMap = this.loadingMap.set(bq, b);
                } else {
                    this.loadingMap = this.loadingMap.set(bq, [observer]);
                    this.r.get(this.path + bq).subscribe(data=> {
                        let sorted=Immutable.List(data).filter(x=>x['Qz']>=0).sort((a,b)=>{
                           if(a['Qz']>b['Qz']) return -1;
                            else if (a['Qz']<b['Qz']) return 1;
                            else if (a['Dm']>b['Dm']) return 1;
                            else if(a['Dm']<b['Dm']) return -1;
                            else return 0;
                        }).toJS();
                        this.zdMap = this.zdMap.set(bq, sorted);
                        this.loadingMap.get(bq).forEach(x=> {
                            sorted.forEach(d=>x.next(d));
                            x.complete();
                        });
                        this.loadingMap.remove(bq);
                    });
                }
            }
        });
    }
}
