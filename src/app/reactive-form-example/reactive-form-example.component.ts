import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
}

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.css']
})
export class ReactiveFormExampleComponent implements OnInit {
  travelForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
      localStorage.setItem('itinerary', JSON.stringify(this.travelForm.value));
      this.router.navigate(['/itinerary-result']);
    }
  }
}