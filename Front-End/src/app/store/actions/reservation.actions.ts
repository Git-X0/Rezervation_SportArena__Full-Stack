import { createAction, props } from '@ngrx/store';
import { Reservation } from '../models/reservation.model';

// Load Reservations
export const loadReservations = createAction('[Reservation] Load Reservations');
export const loadReservationsSuccess = createAction(
  '[Reservation] Load Reservations Success',
  props<{ reservations: Reservation[] }>()
);
export const loadReservationsFailure = createAction(
  '[Reservation] Load Reservations Failure',
  props<{ error: string }>()
);

// Create Reservation
export const createReservation = createAction(
  '[Reservation] Create Reservation',
  props<{ reservation: Reservation }>()
);
export const createReservationSuccess = createAction(
  '[Reservation] Create Reservation Success',
  props<{ reservation: Reservation }>()
);
export const createReservationFailure = createAction(
  '[Reservation] Create Reservation Failure',
  props<{ error: string }>()
);

// Update Reservation
export const updateReservation = createAction(
  '[Reservation] Update Reservation',
  props<{ id: number; reservation: Partial<Reservation> }>()
);
export const updateReservationSuccess = createAction(
  '[Reservation] Update Reservation Success',
  props<{ reservation: Reservation }>()
);
export const updateReservationFailure = createAction(
  '[Reservation] Update Reservation Failure',
  props<{ error: string }>()
);

// Delete Reservation
export const deleteReservation = createAction(
  '[Reservation] Delete Reservation',
  props<{ id: number }>()
);
export const deleteReservationSuccess = createAction(
  '[Reservation] Delete Reservation Success',
  props<{ id: number }>()
);
export const deleteReservationFailure = createAction(
  '[Reservation] Delete Reservation Failure',
  props<{ error: string }>()
);

// Select Reservation
export const selectReservation = createAction(
  '[Reservation] Select Reservation',
  props<{ id: number }>()
);
