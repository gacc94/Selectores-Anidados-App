import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
  ]
})
export class CountriesModule { }
