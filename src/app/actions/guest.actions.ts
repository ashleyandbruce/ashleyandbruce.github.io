import { Action } from '@ngrx/store';
import { IGuest } from '../interfaces/guest.interface';

export class GuestAction implements Action{
	readonly type : string;
	guests : IGuest[];
	
	constructor(guests : IGuest[] = []){
		this.guests = guests;
	}
} 
