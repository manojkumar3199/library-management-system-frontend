import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[] | null, searchKey: string, property: string): any[] {
    if (!items) return [];
    if (!searchKey) return items;
    return items.filter(singleItem => singleItem[property].toLowerCase().includes(searchKey.toLowerCase())
    );
  }

}
