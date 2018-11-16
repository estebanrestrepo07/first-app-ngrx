import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromState from './state/test.reducers';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
	itemsAdded$: Observable<number>;
	rowsRemoved$: Observable<number>;
	colsRemoved$: Observable<number>;
	colLength$: Observable<number>;
	rowLength$: Observable<number>;
	constructor(private _store: Store<AppState>) {}

	ngOnInit() {
		this.itemsAdded$ = this._store.pipe(select(fromState.getItemsAdded));
		this.rowsRemoved$ = this._store.pipe(select(fromState.getRowsRemoved));
		this.colsRemoved$ = this._store.pipe(select(fromState.getColsRemoved));
		this.colLength$ = this._store.pipe(select(fromState.getMaxCol));
		this.rowLength$ = this._store.pipe(select(fromState.getRowsSize));
	}
}
