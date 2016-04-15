import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name:'jFilter'})
export class JFilterPipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        let filter = args[0];

        if (filter && Array.isArray(value)) {
            let filterKeys = Object.keys(filter);
            return value.filter(item =>
                filterKeys.reduce((memo, keyName) => memo && item[keyName].indexOf(filter[keyName])!=-1, true));
        } else {
            return value;
        }
    }
}