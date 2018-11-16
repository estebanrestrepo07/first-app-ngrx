import { Observable } from 'rxjs';
import { Item } from './../models/test.model';
import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as ItemActions from './../state/test.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-add-component',
	templateUrl: './add-component.component.html',
	styleUrls: [ './add-component.component.scss' ],
})
export class AddComponent implements OnInit {
	form: FormGroup;
	constructor(private _fb: FormBuilder, private _store: Store<AppState>) {}

	ngOnInit() {
		this.form = this._fb.group({
			input: [ '', Validators.required ],
		});
	}

	add() {
		const newItem: Item = {
			text: this.form.get('input').value.split(','),
		};
		this._store.dispatch(new ItemActions.CreateItem(newItem));
		this.form.reset();
	}
}
