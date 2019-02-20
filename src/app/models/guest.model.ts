 import { IGuest } from '../interfaces/guest.interface';
 
 
 export class Guest implements IGuest{
	 
	 firstName : string;
	 lastName : string;
	 partyId : number;
	 
	 constructor(firstName : string = "", lastName : string = "" , partyId : number = null ){
		 this.firstName = firstName;
		 this.lastName = lastName;
		 this.partyId = partyId;
	 }
	 
	 fullName() : string{
		 return this.firstName + " " + this.lastName;
	 }
	 
	 
 }