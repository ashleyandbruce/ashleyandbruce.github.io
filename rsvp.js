
function RsvpVM(){
	
	var client = new GuestClient();
	this.firstName = ko.observable("");
	this.lastName = ko.observable("");
	this.invalidNames = ko.observable(false);
	
	this.guests = ko.observableArray([
	/*{
		first_name : 'Ashley',
		last_name : 'Currie'
	},
	
	{
		first_name : 'Bruce',
		last_name : 'Laird'
	}*/
	]);
	
	this.nameEmpty = ko.computed(function(){
		
		return this.firstName() == '' || this.lastName() == '';
		
	}, this);
	
	this.guestsLoaded = ko.computed(function(){
		
		 return this.guests().length > 0;
		 
	},this);
	
	this.findGuests = async function(){
		
		var guest = await client.getGuest(this.firstName(), this.lastName());
		if(guest == undefined){
			this.invalidNames(true);
		}
		else{
			var party = await client.getParty(guest.party_id);
		
			for(guest of party){
				this.guests.push(guest);
			}
		}
	};
	
	this.updateGuests = async function(){
		console.log(this.guests());
		/*for(guest of party){
			await client.updateGuest(guest);
		}*/
		
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
		
		return data[0];
	};
	
	this.getParty = async function(party_id){
		
		var data = await $.ajax({
			url : baseUrl + "/guests/" + party_id,
			method : 'GET'
		});
		
		return data;
	};
	
	this.addGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests",
			method : 'PUT'
		});
		
		
	};
	
	this.updateGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests/" + guest.first_name + "/" + guest.last_name,
			method : 'PATCH',
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
