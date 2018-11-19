import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'rename',
})
export class RenamePipe implements PipeTransform {
	transform(value: string, args?: any): any {
		if (value !== undefined || value) {
			value = value.replace(/\s/g, '');
		} else {
			value = '-';
		}

		return value === '' ? '...' : value;
	}
}
