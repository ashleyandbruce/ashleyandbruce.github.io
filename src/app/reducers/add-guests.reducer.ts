import { GuestAction } from '../actions/guest.actions';
import { AddGuestsTypes } from '../actions/add-guests.actions';

export interface AddGuestsState {
	success: boolean,
	failure : boolean
}

export const initialState : AddGuestsState = {
	success : false,
	failure : false
};
 
export function addGuestsReducer(state : AddGuestsState = initialState, action: GuestAction) {
  switch (action.type) {
    case AddGuestsTypes.Success:
      return {
		success : true,
		failure: false
	  };
 
    case AddGuestsTypes.Failure:
      return {
		success : false,
		failure: true
	  };
 
    default:
      return state;
  }
}