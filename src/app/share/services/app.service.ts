import { Item } from './../../models/test.model';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppService {
	constructor() {}
	public calcCols(items: Item[]): number {
		return items.length > 0
			? items.reduce(
					(item, currentItem) => (item.text.length > currentItem.text.length ? item : currentItem),
				).text.length
			: 0;
	}
}
