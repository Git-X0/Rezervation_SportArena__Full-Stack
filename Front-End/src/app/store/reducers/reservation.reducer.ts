import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Reservation } from '../models/reservation.model';
import * as ReservationActions from '../actions/reservation.actions';

export const reservationAdapter = createEntityAdapter<Reservation>();

export interface ReservationState extends EntityState<Reservation> {
  loading: boolean;
  error: string | null;
  selectedReservationId: number | null;
}

export const initialState: ReservationState =
  reservationAdapter.getInitialState({
    loading: false,
    error: null,
    selectedReservationId: null,
  });

export const reservationReducer = createReducer(
  initialState,

  // Load Reservations
  on(ReservationActions.loadReservations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.loadReservationsSuccess, (state, { reservations }) =>
    reservationAdapter.setAll(reservations, {
      ...state,
      loading: false,
    })
  ),
  on(ReservationActions.loadReservationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Reservation
  on(ReservationActions.createReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.createReservationSuccess, (state, { reservation }) =>
    reservationAdapter.addOne(reservation, {
      ...state,
      loading: false,
    })
  ),
  on(ReservationActions.createReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Reservation
  on(ReservationActions.updateReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.updateReservationSuccess, (state, { reservation }) =>
    reservationAdapter.updateOne(
      { id: reservation.id!, changes: reservation },
      {
        ...state,
        loading: false,
      }
    )
  ),
  on(ReservationActions.updateReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Reservation
  on(ReservationActions.deleteReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ReservationActions.deleteReservationSuccess, (state, { id }) =>
    reservationAdapter.removeOne(id, {
      ...state,
      loading: false,
    })
  ),
  on(ReservationActions.deleteReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Select Reservation
  on(ReservationActions.selectReservation, (state, { id }) => ({
    ...state,
    selectedReservationId: id,
  }))
);
