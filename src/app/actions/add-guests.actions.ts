import { GuestAction } from '../actions/guest.actions';
import { IGuest } from '../interfaces/guest.interface';

export enum AddGuestsTypes {
	Request = '[Add Guests] Request',
	Success = '[Add Guests] Success',
	Failure = '[Add Guests] Failure'
};

export class AddGuestsRequest extends GuestAction{
	readonly type = AddGuestsTypes.Request;	
}

export class AddGuestsSuccess extends GuestAction{
	readonly type = AddGuestsTypes.Success;
		
}

export class AddGuestsFailure extends GuestAction{
	readonly type = AddGuestsTypes.Failure;
	
}