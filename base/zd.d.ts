import { R } from '../core/r';
import { Observable } from 'rxjs/Observable';
export declare class JZd {
    private r;
    path: string;
    zdMap: Immutable.Map<{}, {}>;
    loadingMap: Immutable.Map<string, any[]>;
    constructor(r: R);
    get(bq: string): Observable<any>;
}
