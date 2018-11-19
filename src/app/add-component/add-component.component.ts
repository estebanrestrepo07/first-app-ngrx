import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from './../models/test.model';

@Component({
	selector: 'app-add-component',
	templateUrl: './add-component.component.html',
	styleUrls: [ './add-component.component.scss' ],
})
export class AddComponent implements OnInit {
	@Output() addItem = new EventEmitter<Item>();
	form: FormGroup;
	constructor(private _fb: FormBuilder) {}

	ngOnInit() {
		this.form = this._fb.group({
			input: [ '', Validators.required ],
		});
	}

	public add(): void {
		const newItem: Item = {
			text: this.form.get('input').value.split(','),
		};
		this.addItem.emit(newItem);
		this.form.reset();
	}
}
