import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from '.././darkmode.service';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
  numberOfTravelers: number;
  budget: number;
}

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html'
})
export class ReactiveFormExampleComponent implements OnInit {
  travelForm: FormGroup;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private darkModeService: DarkModeService) {
    this.travelForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: ['', Validators.required],
      numberOfTravelers: [1, [Validators.required, Validators.min(1)]],
      budget: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((isDarkMode: boolean) => {
      this.isDarkMode = isDarkMode;
    });
  }

  onSubmit(): void {
    if (this.travelForm.valid) {
      const itinerary: Itinerary = this.travelForm.value;
      localStorage.setItem('itinerary', JSON.stringify(itinerary));
      this.router.navigate(['/itinerary-result']);
    }
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}