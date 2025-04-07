import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
  numberOfTravelers: number;
  budget: number;
  preferredModeOfTransport: string[]; // Changed to an array
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
    activities: '',
    numberOfTravelers: 1,
    budget: 0,
    preferredModeOfTransport: []
  };

  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      localStorage.setItem('itinerary', JSON.stringify(this.itinerary));
      this.router.navigate(['/itinerary-result']);
    }
  }

  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled');
  }

  applyDarkMode(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}