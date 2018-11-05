
function RsvpVM(){
	
	var client = new GuestClient();
	this.firstName = ko.observable("");
	this.lastName = ko.observable("");
	this.invalidNames = ko.observable(false);
	
	this.guests = ko.observableArray([
	/*{
		first_name : 'Ashley',
		last_name : 'Currie',
		status: 1,
		dietary_res : null
	},
	
	{
		first_name : 'Bruce',
		last_name : 'Laird',
		status: 1,
		dietary_res: null
	}*/
	]);
	
	this.nameEmpty = ko.computed(function(){
		
		return this.firstName() == '' || this.lastName() == '';
		
	}, this);
	
	this.guestsLoaded = ko.computed(function(){
		
		 return this.guests().length > 0;
		 
	},this);
	
	this.findGuests = async function(){
		
		try{
			var guests = await client.getPartyByGuest(this.firstName(), this.lastName());
			
			for(guest of guests){
				this.guests.push(guest);
			}
		}
		catch(err){
			this.invalidNames(true);
		}
	};
	
	this.updateGuests = async function(){

		for(guest of guests){
			await client.updateGuest(guest);
		}
		
	};
	
}

function GuestClient(){
	
	var baseUrl = "https://quiet-plains-44094.herokuapp.com";
	
	this.getAll = async function(){
		
		var data = await $.ajax({
			url : baseUrl + "/guests",
			method : 'GET'
		});
		
		return data;
	};
	
	this.getGuest = async function(first_name, last_name){
		
		var data = await $.ajax({
			url : baseUrl + "/guests/" + first_name + "/" + last_name,
			type : 'GET'
		});
		
		return data;
	};
	
	this.getParty = async function(party_id){
		
		var data = await $.ajax({
			url : baseUrl + "/guests/" + party_id,
			method : 'GET'
		});
		
		return data;
	};
	
	this.getPartyByGuest = async function(first_name, last_name){
		
		var data;
		try{
			var guest = await this.getGuest(first_name, last_name);
			data = await this.getParty(guest.party_id);
		}
		catch(err){
			throw err;
		}
		
		return data;
	}
	
	this.addGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests",
			method : 'POST',
			headers:{
				"Content-Type" : "application/json"
			}
		});
		
		
	};
	
	this.updateGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests/" + guest.first_name + "/" + guest.last_name,
			method : 'PATCH',
			headers:{
				"Content-Type" : "application/json"
			},
			data : {
				status: guest.status,
				dietary_res : guest.dietary_res
			}
		});
	
	};
	
}

$(document).ready(function(){
	ko.applyBindings(new RsvpVM());
});
