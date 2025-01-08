import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OllamaService } from '../ollama.service';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
}

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html'
})
export class TravelDetailsComponent implements OnInit {
  travelForm: FormGroup;
  response: any;

  constructor(private fb: FormBuilder, private router: Router, private ollama: OllamaService) {
    this.travelForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: ['', Validators.required]
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