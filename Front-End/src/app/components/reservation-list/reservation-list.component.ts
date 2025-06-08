import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ReservationListComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe(
      (data: any) => (this.reservations = data),
      (error) => console.error('Chyba:', error)
    );
  }

  deleteReservation(id: number) {
    if (confirm('Opravdu chcete smazat rezervaci?')) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          alert('Rezervace smazána!');
          this.loadReservations();
        },
        (error) => alert('Chyba: ' + error.message)
      );
    }
  }
}
