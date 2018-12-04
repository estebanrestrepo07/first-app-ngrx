import { Action } from '@ngrx/store';
import { Item } from './../models/test.model';

export enum TestActionTypes {
	LOAD_ITEMS = '[ITEM] load Items',
	CREATE_ITEM = '[ITEM] CREATE ITEM',
	REMOVE_ROW_ITEM = '[ITEM] REMOVE ROW ITEM',
	REMOVE_COL_ITEM = '[ITEM] REMOVE COL ITEM',
}

// LOAD
export class LoadItems implements Action {
	readonly type = TestActionTypes.LOAD_ITEMS;
	constructor() {}
}

// ADD
export class CreateItem implements Action {
	readonly type = TestActionTypes.CREATE_ITEM;
	constructor(public payload: Item) {}
}

// REMOVE ROW
export class RemoveRowItem implements Action {
	readonly type = TestActionTypes.REMOVE_ROW_ITEM;
	constructor(public payload: number) {}
}

// REMOVE COL
export class RemoveColItem implements Action {
	readonly type = TestActionTypes.REMOVE_COL_ITEM;
	constructor(public payload: Item[]) {}
}

export type Actions = LoadItems | CreateItem | RemoveRowItem | RemoveColItem;
