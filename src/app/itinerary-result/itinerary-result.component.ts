import { Component, OnInit } from '@angular/core';
import {
  OllamaService,
  OllamaChatMessage,
  OllamaChatResponse,
} from '../ollama.service';

interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  activities: string;
  numberOfTravelers: number;
  budget: number;
  preferredModeOfTransport: string[];
}

@Component({
  selector: 'app-itinerary-result',
  templateUrl: './itinerary-result.component.html',
})
export class ItineraryResultComponent implements OnInit {
  itinerary: Itinerary | null = null;
  response: OllamaChatResponse | null = null;
  result: string = 'Generating itinerary...';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private ollamaService: OllamaService) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorMessage = null;
    this.response = null;

    const itineraryString = localStorage.getItem('itinerary');

    if (itineraryString) {
      try {
        this.itinerary = JSON.parse(itineraryString) as Itinerary;

        const model = 'gemma3:1b';
        const content = `Generate a visually stunning and detailed travel itinerary within a single HTML div element, styled with Tailwind CSS classes, for a trip to ${
          this.itinerary?.destination || 'an unspecified destination'
        } from ${this.itinerary?.startDate || 'an unspecified start date'} to ${
          this.itinerary?.endDate || 'an unspecified end date'
        } for ${
          this.itinerary?.numberOfTravelers || 'an unspecified number of'
        } travelers, with an estimated budget of ₹${
          this.itinerary?.budget || 'unspecified'
        }.
        
        The div should contain well-organized sections for:
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Destination</h2>: <p class="text-gray-700">${this.itinerary?.destination || 'N/A'}</p>
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Dates</h2>: <p class="text-gray-700">${this.itinerary?.startDate || 'N/A'} - ${this.itinerary?.endDate || 'N/A'}</p>
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Activities</h2>: <ul class="list-disc list-inside text-gray-700">${this.itinerary?.activities ? `<li>${this.itinerary.activities}</li>` : '<li>General interests</li>'}</ul>
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Daily Itinerary</h2>: <ul class="list-decimal list-inside text-gray-700"><li>(Outline a possible day-by-day plan, incorporating preferred transport)</li></ul>
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Estimated Costs</h2>: <ul class="list-disc list-inside text-gray-700"><li>(Break down potential expenses, referencing the budget of ₹${this.itinerary?.budget || 'N/A'})</li></ul>
      - <h2 class="text-xl font-bold text-indigo-600 mb-2">Important Notes</h2>: <ul class="list-disc list-inside text-gray-700"><li>(Include practical advice and considerations)</li></ul>

      Apply Tailwind CSS classes to the div and its elements to achieve a visually appealing design with:
      - A light background (bg-gray-100) and rounded corners (rounded-lg) for the main container (<div class="bg-gray-100 rounded-lg p-6 shadow-md">).
      - Distinct visual cues for sections using background colors (e.g., bg-blue-50) or borders (border border-gray-200). Apply these to the section containers or headings.
      - Consistent spacing using Tailwind's margin (m-*) and padding (p-*) classes on various elements.
      - Specific text colors using Tailwind's text color classes (e.g., text-indigo-600 for headings, text-green-500 for highlighted info).
      - Use Tailwind's font classes (font-bold, font-semibold, italic) for emphasis.

      Ensure the entire output is a single, valid HTML div element (<div class="..."> ... </div>) ready for seamless integration into an existing HTML file, without any surrounding text. Aim for a modern and readable design using Tailwind CSS utilities. Ignore extra messages or instructions.`;

        const messages: OllamaChatMessage[] = [
          { role: 'user', content: content },
        ];

        this.ollamaService
          .chat(model, messages)
          .then((response) => {
            this.response = response;
            this.result =
              this.response?.message?.content?.replace(
                /^```html\s*|\s*```$/g,
                ''
              ) || 'Received response, but no content was found.';
          })
          .catch((error) => {
            this.errorMessage = `An error occurred while fetching the response: ${
              error.message || 'Unknown error'
            }`;
            this.result =
              'We encountered an issue while generating your itinerary. Please try again later.';
          });
      } catch (error: any) {
        this.errorMessage = `An error occurred: ${
          error.message || 'Unknown error'
        }`;
        this.result =
          'Failed to process the itinerary data. Please ensure the data is valid and try again.';

        if (
          error instanceof SyntaxError &&
          error.message.includes('JSON.parse')
        ) {
          this.errorMessage =
            'Failed to read itinerary data from local storage. Data might be corrupted.';
          this.result =
            'Itinerary data could not be loaded. Please check your input and try again.';
        }
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Could not find itinerary data in local storage.';
      this.result =
        'No itinerary data was found. Please create an itinerary and try again.';
      this.isLoading = false;
    }
  }
}
