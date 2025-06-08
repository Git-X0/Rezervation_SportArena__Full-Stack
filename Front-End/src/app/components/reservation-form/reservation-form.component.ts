import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ReservationFormComponent implements OnInit {
  reservation: any = {};
  sports: any[] = [];
  locations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService
      .getSports()
      .subscribe((data) => (this.sports = data));
    this.reservationService
      .getLocations()
      .subscribe((data) => (this.locations = data));
  }

  onSubmit() {
    this.reservationService.createReservation(this.reservation).subscribe({
      next: () => {
        alert('Rezervace úspěšně vytvořena!');
        this.reservation = {};
      },
      error: (err) => {
        console.error('Chyba při vytváření rezervace:', err);
        alert(`Chyba: ${err.message || 'Neznámá chyba'}`);
      },
    });
  }
}
