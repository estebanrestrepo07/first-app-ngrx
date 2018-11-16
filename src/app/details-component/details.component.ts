import { Component, Input } from '@angular/core';
@Component({
	selector: 'app-details-component',
	templateUrl: './details.component.html',
	styleUrls: [ './details.component.scss' ],
})
export class DetailsComponent {
	@Input() itemsAdded;
	@Input() rowsRemoved;
	@Input() colsRemoved;
	@Input() rowLength;
	@Input() colLength;
	constructor() {}
}
