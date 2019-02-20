import { Action } from '@ngrx/store';
import { LoadActions } from '../actions/loading.actions';
 
export const initialState = false;
 
export function loadingReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LoadActions.StopLoad:
      return !state;
 
    case LoadActions.StartLoad:
      return !state;
 
    default:
      return state;
  }
}