import { GetGuestsState } from '../reducers/get-guests.reducer';
import { AddGuestsState } from '../reducers/add-guests.reducer';

export interface IAppState{
	loading : boolean;
	getGuests : GetGuestsState;
	addGuests : AddGuestsState;
}