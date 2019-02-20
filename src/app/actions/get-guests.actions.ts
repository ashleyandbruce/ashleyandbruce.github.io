import { GuestAction } from '../actions/guest.actions';
import { IGuest } from '../interfaces/guest.interface';

export enum GetGuestsTypes {
	Request = '[Get Guests] Request',
	Success = '[Get Guests] Success',
	Failure = '[Get Guests] Failure'
};

export class GetGuestsRequest extends GuestAction{
	readonly type = GetGuestsTypes.Request;	
}

export class GetGuestsSuccess extends GuestAction{
	readonly type = GetGuestsTypes.Success;
		
}

export class GetGuestsFailure extends GuestAction{
	readonly type = GetGuestsTypes.Failure;
	
}