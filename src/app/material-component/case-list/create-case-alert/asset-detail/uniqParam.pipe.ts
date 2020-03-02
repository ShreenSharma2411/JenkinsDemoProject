import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uniqParam',
    pure: false
})
export class UniqParamPipe implements PipeTransform {

    transform(items: any[], selectedIds: string[], currentValue): any {

        if (!items || !selectedIds) {
            return items;
        }

        return items.filter(item => {
            if (selectedIds.indexOf(item['userId'] + '') === -1 || currentValue == item['userId']) {
                return item;
            }
            return false;
        });
    }
}
