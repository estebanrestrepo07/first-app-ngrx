import { Item } from './../models/test.model';
import { Action } from '@ngrx/store';
import * as TestActions from './test.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TestState {
	items: Item[];
	colsRemoved: number;
	rowsRemoved: number;
	itemsAdded: number;
}

const defaultState: TestState = {
	items: [],
	colsRemoved: 0,
	rowsRemoved: 0,
	itemsAdded: 0,
};

export function testReducer(state: TestState = defaultState, action: TestActions.Actions) {
	const newState = {
		items: state.items.slice(0),
		colsRemoved: state.colsRemoved,
		rowsRemoved: state.rowsRemoved,
		itemsAdded: state.itemsAdded,
	};
	switch (action.type) {
		case TestActions.TestActionTypes.CREATE_ITEM:
			newState.items.push(action.payload);
			++newState.itemsAdded;
			break;

		case TestActions.TestActionTypes.REMOVE_ROW_ITEM:
			newState.items.splice(action.payload, 1);
			++newState.rowsRemoved;
			break;
		case TestActions.TestActionTypes.REMOVE_COL_ITEM:
			newState.items = action.payload;
			++newState.colsRemoved;
			break;
		default:
			return state;
	}

	return newState;
}

const getFeatureState = createFeatureSelector<TestState>('item');
export const getItems = createSelector(getFeatureState, (state: TestState) => state.items);
export const getItemsAdded = createSelector(getFeatureState, (state: TestState) => state.itemsAdded);
export const getColsRemoved = createSelector(getFeatureState, (state: TestState) => state.colsRemoved);
export const getRowsSize = createSelector(getFeatureState, (state: TestState) => state.items.length);
export const getRowsRemoved = createSelector(getFeatureState, (state: TestState) => state.rowsRemoved);
