import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

import { GuestAction } from '../actions/guest.actions';
import { IGuest } from '../interfaces/guest.interface';
import { AddGuestsTypes, AddGuestsSuccess, AddGuestsFailure } from "../actions/add-guests.actions";
import { GuestService } from "../services/guest.service";


@Injectable()

export class AddGuestsEffects {

constructor(private actions$: Actions, 
            private guestService: GuestService) {}


@Effect() 
addGuests$: Observable<GuestAction> = this.actions$.pipe(
	ofType(AddGuestsTypes.Request),
	switchMap((action : GuestAction) => 
		this.guestService.addGuests(action.guests).pipe(
		
			map(res => new AddGuestsSuccess() ),
			catchError( error => of(new AddGuestsFailure()) ),
			
		),
	),
);

}