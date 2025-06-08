import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ReservationState,
  reservationAdapter,
} from '../reducers/reservation.reducer';

export const selectReservationState =
  createFeatureSelector<ReservationState>('reservations');

export const {
  selectAll: selectAllReservations,
  selectEntities: selectReservationEntities,
  selectIds: selectReservationIds,
  selectTotal: selectReservationTotal,
} = reservationAdapter.getSelectors(selectReservationState);

export const selectReservationLoading = createSelector(
  selectReservationState,
  (state: ReservationState) => state.loading
);

export const selectReservationError = createSelector(
  selectReservationState,
  (state: ReservationState) => state.error
);

export const selectSelectedReservationId = createSelector(
  selectReservationState,
  (state: ReservationState) => state.selectedReservationId
);

export const selectSelectedReservation = createSelector(
  selectReservationEntities,
  selectSelectedReservationId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
