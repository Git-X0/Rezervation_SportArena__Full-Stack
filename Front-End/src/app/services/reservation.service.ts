import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(reservation: any): Observable<any> {
    // Validace povinných polí
    if (!reservation.sportId || !reservation.sportLocationId) {
      return throwError(() => new Error('Vyberte sport a sportoviště'));
    }

    return this.http.post(this.apiUrl, reservation);
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSports(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/sports');
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/sport-locations');
  }
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateReservation(id: number, reservation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reservation);
  }
  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
