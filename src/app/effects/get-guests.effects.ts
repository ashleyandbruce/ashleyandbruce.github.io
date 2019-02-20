import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { IGuest } from '../interfaces/guest.interface';
import { GetGuestsTypes, GetGuestsSuccess } from "../actions/get-guests.actions";
import { GuestAction } from "../actions/guest.actions";
import { GuestService } from "../services/guest.service";


@Injectable()

export class GetGuestsEffects {

constructor(private actions$: Actions, 
            private guestService: GuestService) {}


@Effect() 
getGuests$: Observable<GuestAction> = this.actions$.pipe(
	ofType(GetGuestsTypes.Request),
	mergeMap(
		() => this.guestService.getGuests()
		.pipe(
			map(guests => {
				return new GetGuestsSuccess(guests)
			})
		)
	)
);

}