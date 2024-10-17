import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../local-storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private localStorage = inject(StorageService);

  private theme = new BehaviorSubject<string>('neutral');
  themeInformation = this.theme.asObservable();

  constructor() {
    const localTheme = this.localStorage.getLocalStorage('THEME-GUESS-GENDER');

    if (localTheme){
      this.theme.next(localTheme.themePreference);

      const linkElement = document.getElementById('app-theme') as HTMLLinkElement;
      linkElement.href = localTheme.themePreference + '.css';
    }
  }

  toggleTheme() {
    const linkElement = document.getElementById('app-theme') as HTMLLinkElement;

    if (this.theme.value == 'dark') {
      linkElement.href = 'light.css';
      this.theme.next('light');
    } else {
      linkElement.href = 'dark.css';
      this.theme.next('dark');
    }
    this.localStorage.setLocalStorage('THEME-GUESS-GENDER', {themePreference: this.theme.value}, false);
  }

  toggleThemeOption(optionValue: string){
    const linkElement = document.getElementById('app-theme') as HTMLLinkElement;

    linkElement.href = optionValue + '.css';
    this.theme.next(optionValue);

    this.localStorage.setLocalStorage('THEME-GUESS-GENDER', {themePreference: this.theme.value}, false);
  }
}
