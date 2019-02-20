import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGuest } from '../interfaces/guest.interface';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})

export class GuestService {
	
  private baseUrl: string = "https://quiet-plains-44094.herokuapp.com";
	
  constructor(private client: HttpClient) { }
  
  getGuests() : Observable<IGuest[]>{
	  return this.client.get(this.baseUrl + '/guests')
	  .pipe(
		map((guests : any[]) => {
			
			return guests.map(guest => new Guest(guest.first_name, guest.last_name, guest.party_id));
						
		})
	  );
  }
  
  
  addGuests(guests : IGuest[]) : Observable<any>{
	  
	  let httpHeaders = new HttpHeaders()
     .set('Content-Type', 'application/json');
	  
	  
	  return this.client.post(this.baseUrl + "/guests", guests, {headers: httpHeaders, responseType: "text"});
  } 
  
  
  
  
}
