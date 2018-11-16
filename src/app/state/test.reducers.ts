import { Item } from './../models/test.model';
import { Action } from '@ngrx/store';
import * as TestActions from './test.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TestState {
	items: Item[];
	maxCol: number;
	colsRemoved: number;
	rowsCount: number;
	rowsRemoved: number;
	itemsAdded: number;
}

const defaultState: TestState = {
	items: [],
	maxCol: 0,
	colsRemoved: 0,
	rowsCount: 0,
	rowsRemoved: 0,
	itemsAdded: 0,
};

export function testReducer(state: TestState = defaultState, action: TestActions.Actions) {
	let auxMaxCol = state.maxCol;
	switch (action.type) {
		case TestActions.TestActionTypes.CREATE_ITEM:
			if (action.payload.text.length > state.maxCol) {
				auxMaxCol = action.payload.text.length;
			}
			return {
				...state,
				items: [ ...state.items, action.payload ],
				maxCol: auxMaxCol,
				rowsCount: ++state.items.length,
				itemsAdded: ++state.itemsAdded,
			};

		case TestActions.TestActionTypes.REMOVE_ROW_ITEM:
			auxMaxCol = 0;
			state.items.splice(action.payload, 1);
			for (const item of state.items) {
				if (item.text.length > auxMaxCol) {
					auxMaxCol = item.text.length;
				}
			}
			state.maxCol = auxMaxCol;
			return {
				...state,
				maxCol: auxMaxCol,
				rowsCount: state.items.length,
				rowsRemoved: ++state.rowsRemoved,
			};
		case TestActions.TestActionTypes.REMOVE_COL_ITEM:
			const newItems = action.payload.filter((item) => item.text.length > 0);
			auxMaxCol = 0;
			for (const item of newItems) {
				if (item.text.length > auxMaxCol) {
					auxMaxCol = item.text.length;
				}
			}
			return {
				...state,
				items: newItems,
				maxCol: auxMaxCol,
				rowsCount: newItems.length,
				rowsRemoved: state.rowsRemoved + (state.rowsCount - newItems.length),
				colsRemoved: ++state.colsRemoved,
			};

		default:
			return state;
	}
}

const getFeatureState = createFeatureSelector<TestState>('item');
export const getItems = createSelector(getFeatureState, (state: TestState) => state.items);
export const getItemsAdded = createSelector(getFeatureState, (state: TestState) => state.itemsAdded);
export const getMaxCol = createSelector(getFeatureState, (state: TestState) => state.maxCol);
export const getColsRemoved = createSelector(getFeatureState, (state: TestState) => state.colsRemoved);
export const getRowsSize = createSelector(getFeatureState, (state: TestState) => state.rowsCount);
export const getRowsRemoved = createSelector(getFeatureState, (state: TestState) => state.rowsRemoved);
