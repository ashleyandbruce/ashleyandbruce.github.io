import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';

import { IGuest } from '../../interfaces/guest.interface';
import { Guest } from '../../models/guest.model';
import { RsvpState } from '../../models/rsvp-state.model';
import { IAppState } from '../../interfaces/app-state.interface';
import { AddGuestsRequest } from '../../actions/add-guests.actions';

@Component({
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})

export class RsvpComponent implements OnInit {

  private RsvpState = RsvpState;
  public guests : IGuest[] = [];
  public invalidInput : boolean = false;
  public errorOccured : boolean = false;
  public state : RsvpState = RsvpState.Start;
  
  constructor( private store : Store<IAppState>) { }

  ngOnInit() {
	  this.addGuest();
	  
	  this.store.pipe(
		select('addGuests')
	  )
	  .subscribe( state => {
		  if(state.success){
			  this.nextState();
		  }
		  if(state.failure){
			  this.errorOccured = true;
		  }
	  });
  }
  
  addGuest(){
	  this.guests.push(new Guest());
  }
  
  removeGuest(index : number){
	  this.guests.splice(index, 1);
  }
  
  onSubmit(){
	this.invalidInput = !this.isInputValid();
	
	if(!this.invalidInput){
		this.store.dispatch(new AddGuestsRequest(this.guests));
	}
	
  }
  
   nextState(){
	 this.state++;
   }
	
	private isInputValid() : boolean{
		
		for(var guest of this.guests){
			
			if(!guest.firstName || !guest.lastName){
				return false;
			}
		}
		return true;
	}
  
}
