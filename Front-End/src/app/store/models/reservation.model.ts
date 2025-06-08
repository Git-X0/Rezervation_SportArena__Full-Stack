export interface Reservation {
  id?: number;
  firstname: string;
  lastname: string;
  date: string;
  time_slot: string;
  sportId: number;
  sportLocationId: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface ReservationState {
  entities: { [id: number]: Reservation };
  ids: number[];
  loading: boolean;
  error: string | null;
  selectedReservationId: number | null;
}
