import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface OllamaChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  images?: string[];
  tool_calls?: any[];
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: OllamaChatMessage;
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private apiUrl = 'http://localhost:11434/api';

  constructor(private http: HttpClient) {}

  async generateResponse(model: string, prompt: string): Promise<OllamaGenerateResponse> {
    const endpoint = `${this.apiUrl}/generate`;
    const body = {
      model: model,
      prompt: prompt,
      stream: false,
    };

    const request$ = this.http.post<OllamaGenerateResponse>(endpoint, body);

    try {
      const response = await lastValueFrom(request$);
      console.log('Received response from /generate:', response);
      return response;
    } catch (error) {
      console.error('Error calling /api/generate:', error);
      throw error;
    }
  }

  async chat(model: string, messages: OllamaChatMessage[]): Promise<OllamaChatResponse> {
    const endpoint = `${this.apiUrl}/chat`;
    const body = {
      model: model,
      messages: messages,
      stream: false,
    };

    const request$ = this.http.post<OllamaChatResponse>(endpoint, body);

    try {
      const response = await lastValueFrom(request$);
      console.log('Received response from /chat:', response);
      return response;
    } catch (error) {
      console.error('Error calling /api/chat:', error);
      throw error;
    }
  }
}