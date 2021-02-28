import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './chef';

@Pipe({
  name: 'sortChecklist',
})
export class SortChecklistPipe implements PipeTransform {
  transform(value: any[] = [], property: any): any {
    if (!value) {
      return null;
    }

    value.sort((first: any, second: any): number => {
      return first[property] > second[property] ? 1 : -1;
    });

    return value;
  }
}
