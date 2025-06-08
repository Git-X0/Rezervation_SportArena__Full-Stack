import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent, ReservationListComponent],
  template: `
    <div class="container mt-4">
      <h1>{{ title }}</h1>
      <app-reservation-form></app-reservation-form>
      <app-reservation-list></app-reservation-list>
    </div>
  `,
  styles: [
    `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8f9fa;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Rezervační systém';
}
