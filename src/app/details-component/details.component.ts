import { AppService } from './../share/services/app.service';
import { Component, Input } from '@angular/core';
import { Item } from '../models/test.model';
@Component({
	selector: 'app-details-component',
	templateUrl: './details.component.html',
	styleUrls: [ './details.component.scss' ],
})
export class DetailsComponent {
	constructor(private _appService: AppService) {}
	colLength = 0;
	@Input() itemsAdded: number;
	@Input() rowsRemoved: number;
	@Input() colsRemoved: number;
	@Input() rowLength: number;
	@Input('items')
	set items(items: Item[]) {
		this.colLength = this._appService.calcCols(items);
	}
}
