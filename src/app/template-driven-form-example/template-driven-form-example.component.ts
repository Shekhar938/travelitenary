import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
}

@Component({
  selector: 'app-template-driven-form-example',
  templateUrl: './template-driven-form-example.component.html'
})
export class TemplateDrivenFormExampleComponent {
  itinerary: Itinerary = {
    destination: '',
    startDate: '',
    endDate: '',
    activities: ''
  };

  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      localStorage.setItem('itinerary', JSON.stringify(this.itinerary));
      this.router.navigate(['/itinerary-result']);
    }
  }
}