export interface Reservation {
  id?: number;
  firstname: string;
  lastname: string;
  date: string; // YYYY-MM-DD
  time_slot: string;
  sportId: number;
  sportLocationId: number;
}
