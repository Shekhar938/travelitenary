import { Component, OnInit } from '@angular/core';
import { OllamaService } from '../ollama.service';
interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
}

@Component({
  selector: 'app-itinerary-result',
  templateUrl: './itinerary-result.component.html'
})
export class ItineraryResultComponent implements OnInit {
  itinerary: Itinerary | null = null;
  response: any;
  result: any;
  constructor(private ollamaService: OllamaService){}
  async ngOnInit() {
    const itineraryString = localStorage.getItem('itinerary');
    console.log(itineraryString);
    if (itineraryString) {
      this.itinerary = JSON.parse(itineraryString);
      const model = 'gemma3:1b';
      const content = 'Create itinerary for: Jaipur';
      const messages = [{ role: 'user' as const, content: content }];
      const stream = false;
      const request = { model, messages, stream };

      this.ollamaService.generate('gemma3:1b', 'Explain the internet').subscribe({
        next: (data) => {
          this.response = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
      console.log('Itinerary Result:', this.result);
    }
  }
}