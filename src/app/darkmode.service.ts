import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialMode());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyDarkMode(this.darkModeSubject.value);
  }

  toggleDarkMode(): void {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    this.applyDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  }

  private getInitialMode(): boolean {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'enabled';
  }

  private applyDarkMode(isDarkMode: boolean): void {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
}