import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.travelForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activities: ['', Validators.required],
      numberOfTravelers: [1, [Validators.required, Validators.min(1)]],
      budget: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.travelForm.valid) {
      console.log(this.travelForm.value);
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