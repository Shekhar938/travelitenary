import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { ItineraryResultComponent } from './itinerary-result/itinerary-result.component';
import { ReactiveFormExampleComponent } from './reactive-form-example/reactive-form-example.component';
import { TemplateDrivenFormExampleComponent } from './template-driven-form-example/template-driven-form-example.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TravelDetailsComponent,
    ItineraryResultComponent,
    ReactiveFormExampleComponent,
    TemplateDrivenFormExampleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }