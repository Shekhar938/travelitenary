import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
  numberOfTravelers: number;
  budget: string;
}

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html'
})
export class TravelDetailsComponent implements OnInit {
  travelForm: FormGroup;
  response: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.travelForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: ['', Validators.required],
      numberOfTravelers: [1, [Validators.required, Validators.min(1)]],
      budget: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.travelForm.valid) {
      const itinerary: Itinerary = this.travelForm.value;
      localStorage.setItem('itinerary', JSON.stringify(itinerary));
      this.router.navigate(['/itinerary-result']);
    }
  }
}