import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DarkModeService } from '../darkmode.service';

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
  templateUrl: './template-driven-form-example.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
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
  isDarkMode = false;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  validateDates(): boolean {
    if (this.itinerary.startDate && this.itinerary.endDate) {
      const start = new Date(this.itinerary.startDate);
      const end = new Date(this.itinerary.endDate);
      return end >= start;
    }
    return true;
  }

  validateTransportModes(): boolean {
    return this.itinerary.preferredModeOfTransport.length > 0;
  }

  onSubmit(form: any) {
    if (form.valid && this.validateDates() && this.validateTransportModes()) {
      localStorage.setItem('itinerary', JSON.stringify(this.itinerary));
      this.router.navigate(['/itinerary-result']);
    } else {
      if (!this.validateDates()) {
        form.form.controls['endDate'].setErrors({ 'invalidDateRange': true });
      }
      if (!this.validateTransportModes()) {
        form.form.controls['preferredModeOfTransport'].setErrors({ 'required': true });
      }
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  toggleTransportMode(mode: string): void {
    const index = this.itinerary.preferredModeOfTransport.indexOf(mode);
    if (index === -1) {
      this.itinerary.preferredModeOfTransport.push(mode);
    } else {
      this.itinerary.preferredModeOfTransport.splice(index, 1);
    }
  }

  isTransportModeSelected(mode: string): boolean {
    return this.itinerary.preferredModeOfTransport.includes(mode);
  }
}