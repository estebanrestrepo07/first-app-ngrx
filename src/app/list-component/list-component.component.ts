import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Item } from './../models/test.model';
import { AppState } from './../app.state';
import * as ItemActions from './../state/test.actions';
import * as fromState from './../state/test.reducers';
@Component({
	selector: 'app-list-component',
	templateUrl: './list-component.component.html',
	styleUrls: [ './list-component.component.scss' ],
})
export class ListComponent implements OnInit {
	items$: Observable<Item[]>;
	colLength$: Observable<number>;
	constructor(private _store: Store<AppState>) {}

	ngOnInit() {
		this.items$ = this._store.pipe(select(fromState.getItems));
		this.colLength$ = this._store.pipe(select(fromState.getMaxCol));
	}

	removeRowByIndex(index: number) {
		this._store.dispatch(new ItemActions.RemoveRowItem(index));
	}

	RemoveColByIndex(indexC: number) {
		let auxItems: Item[];
		const itemsToDelete = [];
		this.items$.subscribe((items: Item[]) => {
			auxItems = items;
		});

		auxItems.forEach((item, index, object) => {
			item.text.splice(indexC, 1);
			if (index === auxItems.length - 1) {
				this._store.dispatch(new ItemActions.RemoveColItem(auxItems));
			}
		});
	}
}
