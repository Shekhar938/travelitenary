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

  constructor(private ollama1: OllamaService){}
  async ngOnInit() {
    const itineraryString = localStorage.getItem('itinerary');
    console.log(itineraryString);
    if (itineraryString) {
      this.itinerary = JSON.parse(itineraryString);
      const pretext = 'Create itinerary for: ';
      const model = 'll ama3.2';
      const prompt = `${pretext} ${JSON.stringify(this.itinerary)}`;
      // const response = await ollama.chat({
      //   model: 'llama3.1',
      //   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
      // })
      // console.log(response.message.content)
      // this.ollama.GenerateResponse(model, prompt).subscribe((response) => {
      //   this.response = response;
      //   console.log('Itinerary Response:', response);
      // });
    }
  }
}