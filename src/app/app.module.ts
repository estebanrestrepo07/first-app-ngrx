import { AppService } from './share/services/app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { testReducer } from './state/test.reducers';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddComponent } from './add-component/add-component.component';
import { ListComponent } from './list-component/list-component.component';
import { DetailsComponent } from './details-component/details.component';
import { RenamePipe } from './share/pipes/rename/rename.pipe';
import { NgForByNumberPipe } from './share/pipes/ngForByNumber/ngForByNumber.pipe';
@NgModule({
	declarations: [
		AppComponent,
		AddComponent,
		ListComponent,
		DetailsComponent,
		NgForByNumberPipe,
		RenamePipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot({ item: testReducer }),
		StoreDevtoolsModule.instrument(),
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [ AppService ],
	bootstrap: [ AppComponent ],
})
export class AppModule {}
