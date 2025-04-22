import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  OllamaService,
  OllamaChatMessage,
  OllamaChatResponse,
} from '../ollama.service';
import { DarkModeService } from '../darkmode.service';

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
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [DarkModeService, OllamaService]
})
export class ItineraryResultComponent implements OnInit {
  itinerary: Itinerary | null = null;
  response: OllamaChatResponse | null = null;
  result: string = 'Generating itinerary...';
  safeResult: SafeHtml = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isDarkMode = false;

  constructor(
    private ollamaService: OllamaService,
    private darkModeService: DarkModeService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.darkModeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

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
        }.`;

        const messages: OllamaChatMessage[] = [
          { role: 'user', content: content },
        ];

        this.ollamaService
          .chat(model, messages)
          .then((response) => {
            this.response = response;
            const htmlContent = this.response?.message?.content?.replace(
              /^```html\s*|\s*```$/g,
              ''
            ) || 'Received response, but no content was found.';
            this.result = htmlContent;
            this.safeResult = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
          })
          .catch((ollamaError) => {
            console.error('Error with Ollama API, falling back to Anthropics API:', ollamaError);

            // Fallback to Anthropics API
            this.ollamaService
              .callAnthropicApi(content)
              .then((anthropicResponse) => {
                const htmlContent = anthropicResponse?.completion?.replace(
                  /^```html\s*|\s*```$/g,
                  ''
                ) || 'Received response, but no content was found.';
                this.result = htmlContent;
                this.safeResult = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
              })
              .catch((anthropicError) => {
                this.errorMessage = `An error occurred while fetching the response from both APIs: ${
                  anthropicError.message || 'Unknown error'
                }`;
                this.result =
                  'We encountered an issue while generating your itinerary. Please try again later.';
                this.safeResult = this.sanitizer.bypassSecurityTrustHtml(this.result);
              });
          });
      } catch (error: any) {
        this.errorMessage = `An error occurred: ${
          error.message || 'Unknown error'
        }`;
        this.result =
          'Failed to process the itinerary data. Please ensure the data is valid and try again.';
        this.safeResult = this.sanitizer.bypassSecurityTrustHtml(this.result);

        if (
          error instanceof SyntaxError &&
          error.message.includes('JSON.parse')
        ) {
          this.errorMessage =
            'Failed to read itinerary data from local storage. Data might be corrupted.';
          this.result =
            'Itinerary data could not be loaded. Please check your input and try again.';
          this.safeResult = this.sanitizer.bypassSecurityTrustHtml(this.result);
        }
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Could not find itinerary data in local storage.';
      this.result =
        'No itinerary data was found. Please create an itinerary and try again.';
      this.safeResult = this.sanitizer.bypassSecurityTrustHtml(this.result);
      this.isLoading = false;
    }
  }

  returnToForm() {
    this.router.navigate(['/template-driven-form']);
  }
}
