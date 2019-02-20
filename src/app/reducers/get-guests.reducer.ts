import { GetGuestsTypes } from '../actions/get-guests.actions';
import { GuestAction } from '../actions/guest.actions';
import { IGuest } from '../interfaces/guest.interface';

export interface GetGuestsState{
	success: boolean;
	failure : boolean;
	results : IGuest[];
}

export const initialState : GetGuestsState = {
	success : false,
	failure : false,
	results : []
};
 
export function getGuestsReducer(state : GetGuestsState = initialState, action: GuestAction) {
  switch (action.type) {
    case GetGuestsTypes.Success:
      return {
		  success : true,
		  failure : false,
		  results : action.guests
	  };
 
    case GetGuestsTypes.Failure:
      return {
		success : false,
		failure : true,
		results : []
	  };
 
    default:
      return state;
  }
}