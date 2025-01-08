import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { ItineraryResultComponent } from './itinerary-result/itinerary-result.component';
import { ReactiveFormExampleComponent } from './reactive-form-example/reactive-form-example.component';
import { TemplateDrivenFormExampleComponent } from './template-driven-form-example/template-driven-form-example.component';

const routes: Routes = [
  { path: '', component: TravelDetailsComponent },
  { path: 'itinerary-result', component: ItineraryResultComponent },
  { path: 'reactive-form', component: ReactiveFormExampleComponent },
  { path: 'template-driven-form', component: TemplateDrivenFormExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }