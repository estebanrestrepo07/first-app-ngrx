import { Item } from './../../models/test.model';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppService {
	constructor() {}
	public calcCols(items: Item[]): number {
		let auxMaxCol = 0;
		for (const item of items) {
			if (item.text.length > auxMaxCol) {
				auxMaxCol = item.text.length;
			}
		}
		return auxMaxCol;
	}
}
