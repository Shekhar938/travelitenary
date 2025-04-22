import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./travel-details/travel-details.component').then(m => m.TravelDetailsComponent)
  },
  {
    path: 'itinerary-result',
    loadComponent: () => import('./itinerary-result/itinerary-result.component').then(m => m.ItineraryResultComponent)
  },
  {
    path: 'reactive-form',
    loadComponent: () => import('./reactive-form-example/reactive-form-example.component').then(m => m.ReactiveFormExampleComponent)
  },
  {
    path: 'template-driven-form',
    loadComponent: () => import('./template-driven-form-example/template-driven-form-example.component').then(m => m.TemplateDrivenFormExampleComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
