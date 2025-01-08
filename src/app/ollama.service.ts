import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllamaService {
  private apiUrl = 'http://localhost:4200/api';
  http!: HttpClient

  Constructor() {}

  GenerateResponse(model: string, prompt: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, { model, prompt });
  }

  Chat(model: string, messages: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { model, messages });
  }
}