/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddComponent } from './add-component.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AddComponent', () => {
	let component: AddComponent;
	let fixture: ComponentFixture<AddComponent>;
	let debugElement: DebugElement;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ AddComponent ],
			imports: [ ReactiveFormsModule, FormsModule ],
		});
		fixture = TestBed.createComponent(AddComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		fixture.detectChanges();
	});

	it('should disable button when form is invalid', () => {
		const button = debugElement.queryAll(By.css('.add-btn'))[0];
		expect(!component.form.valid).toEqual(button.properties.disabled);
	});
	it('should enable button when form is correct', () => {
		component.form.setValue({ input: 'a,d,s' });
		const button = debugElement.queryAll(By.css('.add-btn'))[0];
		fixture.detectChanges();
		expect(button.properties.disabled).toBeFalsy();
	});
	it('should call add function when sumbit the form', () => {
		spyOn(component, 'add').and.callFake(() => {});
		const form = debugElement.queryAll(By.css('.add-form'))[0];
		form.triggerEventHandler('submit', null);
		expect(component.add).toHaveBeenCalled();
	});
});
