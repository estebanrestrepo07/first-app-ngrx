import { AppService } from './../share/services/app.service';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Item } from './../models/test.model';
@Component({
	selector: 'app-list-component',
	templateUrl: './list-component.component.html',
	styleUrls: [ './list-component.component.scss' ],
})
export class ListComponent {
	constructor(private _appService: AppService) {}
	colLength$ = 0;
	items$: Item[];
	@Output() removeRow = new EventEmitter();
	@Output() removeCol = new EventEmitter();
	@Input('items')
	set items(items: Item[]) {
		this.items$ = items;
		this.colLength$ = this._appService.calcCols(items);
	}
	public removeRowByIndex(index: number): void {
		this.removeRow.emit(index);
	}

	public removeColByIndex(indexC: number): void {
		const auxItems: Item[] = this.items$;
		auxItems.forEach((item, index, object) => {
			item.text.splice(indexC, 1);
			if (index === auxItems.length - 1) {
				this.removeCol.emit(auxItems);
			}
		});
	}
}
