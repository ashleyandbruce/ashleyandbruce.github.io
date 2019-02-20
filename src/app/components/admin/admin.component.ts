import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { GetGuestsRequest } from '../../actions/get-guests.actions';
import { GuestService } from '../../services/guest.service';
import { IGuest } from '../../interfaces/guest.interface';
import { Guest } from '../../models/guest.model';
import { IAppState } from '../../interfaces/app-state.interface';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public parties : IGuest[][] = [];
  public numberOfGuests : number;
  
  constructor( private store : Store<IAppState>) { }

  ngOnInit() {
	  
	  this.store.pipe(
		select('getGuests'),
		map(state => state.results)
	  )
	  .subscribe( (guests : IGuest[]) => {
		  
		  this.numberOfGuests = guests.length;
		  this.groupGuestsByParty(guests);
		  
	  });

	 this.store.dispatch(new GetGuestsRequest());	  
	    
  }
  

  private groupGuestsByParty(guests : IGuest[]){
	  
	  var partyIds = guests.map((guest) => guest.partyId);
	  let uniqueIds = new Set(partyIds);
	  
	  uniqueIds.forEach(function(id){
		  var party = guests.filter((guest) => guest.partyId == id);
		  this.parties.push(party);
		  
	  }, this);

  }

}
