import { By } from '@angular/platform-browser';
import { AppState } from './app.state';
import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddComponent } from './add-component/add-component.component';
import { ListComponent } from './list-component/list-component.component';
import { DetailsComponent } from './details-component/details.component';
import { Store } from '@ngrx/store';
import { testReducer, TestState } from './state/test.reducers';
import { DebugElement, Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from './models/test.model';
import * as fromState from './state/test.reducers';
import { BehaviorSubject } from 'rxjs';
import { defaultState as defaultTestState } from './state/test.reducers';
import * as ItemActions from './state/test.actions';
@Component({
	selector: 'app-add-component',
	template: '',
})
class AddComponentMock {
	@Output() addItem = new EventEmitter<Item>();
}

@Component({
	selector: 'app-details-component',
	template: '',
})
class DetailsComponentMock {
	@Input() itemsAdded: number;
	@Input() rowsRemoved: number;
	@Input() colsRemoved: number;
	@Input() rowLength: number;
	@Input() items: Item[];
}

@Component({
	selector: 'app-list-component',
	template: '',
})
class ListComponentMock {
	@Output() removeRow = new EventEmitter();
	@Output() removeCol = new EventEmitter();
	@Input() items: Item[];
}

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	let debugElement: DebugElement;
	let childAddComponent: AddComponent;
	let childDetailsComponent: DetailsComponent;
	let childListComponent: ListComponent;

	let itemsSubject: BehaviorSubject<Item[]>;
	let itemsAddedSubject: BehaviorSubject<number>;
	let rowsRemovedSubject: BehaviorSubject<number>;
	let colsRemovedSubject: BehaviorSubject<number>;
	beforeEach(
		async(() => {
			itemsSubject = new BehaviorSubject(defaultTestState.items);
			itemsAddedSubject = new BehaviorSubject(defaultTestState.itemsAdded);
			rowsRemovedSubject = new BehaviorSubject(defaultTestState.rowsRemoved);
			colsRemovedSubject = new BehaviorSubject(defaultTestState.colsRemoved);
			TestBed.configureTestingModule({
				declarations: [ AppComponent, DetailsComponentMock, AddComponentMock, ListComponentMock ],
				providers: [
					{
						provide: Store,
						useValue: {
							select: jasmine.createSpy('select').and.callFake((action) => {
								switch (action) {
									case fromState.getItems:
										return itemsSubject.asObservable();
									case fromState.getItemsAdded:
										return itemsAddedSubject.asObservable();
									case fromState.getRowsRemoved:
										return rowsRemovedSubject.asObservable();
									case fromState.getColsRemoved:
										return colsRemovedSubject.asObservable();
								}
							}),
							dispatch: jasmine.createSpy('dispatch'),
						},
					},
				],
			}).compileComponents();
		}),
	);
	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		fixture.detectChanges();
		childAddComponent = debugElement.query(By.directive(AddComponentMock)).componentInstance;
		childDetailsComponent = debugElement.query(By.directive(DetailsComponentMock)).componentInstance;
		childListComponent = debugElement.query(By.directive(ListComponentMock)).componentInstance;
	});

	afterEach(() => {
		// unsub
		itemsSubject.complete();
		itemsAddedSubject.complete();
		rowsRemovedSubject.complete();
		colsRemovedSubject.complete();
	});

	describe('initial values', () => {
		it('should pass Data in DetailsComponent', () => {
			expect(childDetailsComponent.itemsAdded).toEqual(defaultTestState.itemsAdded);
			expect(childDetailsComponent.rowsRemoved).toEqual(defaultTestState.rowsRemoved);
			expect(childDetailsComponent.colsRemoved).toEqual(defaultTestState.colsRemoved);
			expect(childDetailsComponent.rowLength).toEqual(defaultTestState.items.length);
			expect(childDetailsComponent.items).toEqual(defaultTestState.items);
		});
	});

	describe('when item is added', () => {
		const newItem = { text: [ '1' ] };
		it(
			'should dispatch a new item when addItem is emitted',
			inject([ Store ], (store: Store<AppState>) => {
				childAddComponent.addItem.emit(newItem);
				expect(store.dispatch).toHaveBeenCalledWith(new ItemActions.CreateItem(newItem));
			}),
		);

		it('should pass new data with the new items', () => {
			itemsSubject.next([ ...defaultTestState.items, newItem ]);
			itemsAddedSubject.next(defaultTestState.itemsAdded + 1);
			fixture.detectChanges();

			expect(childDetailsComponent.itemsAdded).toEqual(defaultTestState.itemsAdded + 1);
			expect(childDetailsComponent.rowLength).toEqual([ ...defaultTestState.items, newItem ].length);
			expect(childDetailsComponent.items).toEqual([ ...defaultTestState.items, newItem ]);
		});
	});

	describe('when item is removed by row', () => {
		const rowIndexToRemove = 0;
		const currentTestState = {
			items: [ { text: [ 'a', 'b' ] }, { text: [ 'c', 'd' ] } ],
			colsRemoved: 0,
			rowsRemoved: 0,
			itemsAdded: 2,
		};
		it(
			'should dispatch to remove an item when removeRow is emitted',
			inject([ Store ], (store: Store<AppState>) => {
				childListComponent.removeRow.emit(rowIndexToRemove);
				expect(store.dispatch).toHaveBeenCalledWith(new ItemActions.RemoveRowItem(rowIndexToRemove));
			}),
		);

		it('should pass new data without row removed and new details', () => {
			const newTestState = currentTestState;
			newTestState.items.splice(rowIndexToRemove, 1);

			itemsSubject.next(newTestState.items);
			itemsAddedSubject.next(newTestState.itemsAdded);
			rowsRemovedSubject.next(++newTestState.rowsRemoved);
			fixture.detectChanges();

			expect(childDetailsComponent.itemsAdded).toEqual(newTestState.itemsAdded);
			expect(childDetailsComponent.rowLength).toEqual(newTestState.items.length);
			expect(childDetailsComponent.items).toEqual(newTestState.items);
			expect(childDetailsComponent.rowsRemoved).toEqual(1);
		});
	});

	describe('when item is removed by col', () => {
		const colIndexToRemove = 0;
		const currentTestState = {
			items: [ { text: [] }, { text: [ 'c', 'd' ] } ],
			colsRemoved: 0,
			rowsRemoved: 0,
			itemsAdded: 2,
		};
		it(
			'should dispatch to remove an item when removeCole is emitted',
			inject([ Store ], (store: Store<AppState>) => {
				childListComponent.removeCol.emit(currentTestState.items);

				const newItems = currentTestState.items.filter((item) => item.text.length > 0);
				expect(newItems).toEqual([ currentTestState.items[1] ]);
				expect(store.dispatch).toHaveBeenCalledWith(new ItemActions.RemoveColItem(newItems));
			}),
		);

		it('should pass new data without col removed and new details', () => {
			itemsSubject.next(currentTestState.items);
			colsRemovedSubject.next(++currentTestState.colsRemoved);
			fixture.detectChanges();

			expect(childDetailsComponent.items).toEqual(currentTestState.items);
			expect(childDetailsComponent.rowLength).toEqual(currentTestState.items.length);
			expect(childDetailsComponent.colsRemoved).toEqual(1);
		});
	});

	// it(`should have as title 'ngrx-test'`, () => {
	//   const fixture = TestBed.createComponent(AppComponent);
	//   const app = fixture.debugElement.componentInstance;
	//   expect(app.title).toEqual('ngrx-test');
	// });

	// it('should render title in a h1 tag', () => {
	//   const fixture = TestBed.createComponent(AppComponent);
	//   fixture.detectChanges();
	//   const compiled = fixture.debugElement.nativeElement;
	//   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ngrx-test!');
	// });
});
