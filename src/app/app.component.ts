import { Component, OnInit } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromState from './state/test.reducers';
import * as ItemActions from './state/test.actions';
import { Item } from './models/test.model';
import { take } from 'rxjs/operators';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
	items$: Observable<Item[]>;
	itemsAdded$: Observable<number>;
	rowsRemoved$: Observable<number>;
	colsRemoved$: Observable<number>;
	colLength$: any;
	constructor(private _store: Store<AppState>) {}

	ngOnInit() {
		this.items$ = this._store.select(fromState.getItems);
		this.itemsAdded$ = this._store.select(fromState.getItemsAdded);
		this.rowsRemoved$ = this._store.select(fromState.getRowsRemoved);
		this.colsRemoved$ = this._store.select(fromState.getColsRemoved);
	}

	public addItem(newItem: Item): void {
		this._store.dispatch(new ItemActions.CreateItem(newItem));
	}

	public removeCol(items: Item[]): void {
		const newItems = items.filter((item) => item.text.length > 0);
		this._store.dispatch(new ItemActions.RemoveColItem(newItems));
	}

	public removeRow(rowIndex: number): void {
		this._store.dispatch(new ItemActions.RemoveRowItem(rowIndex));
	}
}
