import { TestActionTypes } from './test.actions';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as fromState from './test.reducers';
import * as TestActions from './test.actions';
import { defaultState as defaultTestState } from './test.reducers';
describe('TestReducer', () => {
	it('should handle initial state', () => {
		const initialState = defaultTestState;
		const action = new TestActions.LoadItems();
		const state = fromState.testReducer(undefined, action);

		// expect(state).toBe(initialState);
	});
	it(`should handle ${TestActions.TestActionTypes.CREATE_ITEM}`, () => {
		const initialState = defaultTestState;
		const newItem = {
			text: [ 'a', 'b' ],
		};
		const action = new TestActions.CreateItem(newItem);
		const state = fromState.testReducer(initialState, action);
		expect(state.items).toEqual([ ...initialState.items, newItem ]);
		expect(state.itemsAdded).toEqual(initialState.itemsAdded + 1);
	});
	it(`should handle ${TestActions.TestActionTypes.REMOVE_ROW_ITEM}`, () => {
		const currentState = {
			items: [ { text: [ 'a' ] }, { text: [ 'b' ] } ],
			colsRemoved: 0,
			rowsRemoved: 0,
			itemsAdded: 2,
		};
		const rowIndexToRemove = 0;
		const action = new TestActions.RemoveRowItem(rowIndexToRemove);
		const state = fromState.testReducer(currentState, action);
		expect(state.items).toEqual([ currentState.items[1] ]);
		expect(state.items.length).toEqual(currentState.items.length - 1);
		expect(state.rowsRemoved).toEqual(currentState.rowsRemoved + 1);
	});
	it(`should handle ${TestActions.TestActionTypes.REMOVE_COL_ITEM}`, () => {
		const currentState = {
			items: [ { text: [ 'a' ] }, { text: [ 'b' ] } ],
			colsRemoved: 0,
			rowsRemoved: 0,
			itemsAdded: 2,
		};
		const newItems = [];
		const action = new TestActions.RemoveColItem(newItems);
		const state = fromState.testReducer(currentState, action);
		expect(state.items).toEqual([]);
		expect(state.items.length).toEqual(newItems.length);
		expect(state.colsRemoved).toEqual(currentState.colsRemoved + 1);
	});
});
