
function MainVM(){
	
	var self = this;
	
	self.currentViewModel = ko.observable(new GetPartyVM());
	
	self.submit = async function(){
		
		try{
			//var guests = await self.currentViewModel().findGuests();
			var guests =
			[{
				first_name : "Ashley",
				last_name : "Currie", 
				status : 1,
				dietary_res : null,
				has_plus_one : false
				
			},
			{
				first_name : "Bruce",
				last_name : "Laird", 
				status : 1,
				dietary_res : null,
				has_plus_one : false
				
			}];
			self.currentViewModel(new UpdatePartyVM(guests));
			
		}catch(err){
			console.log(err);
		}
		
	};
	
	self.send = function(){
		
		self.currentViewModel().updateGuests();
		
	};
		
}



function GetPartyVM(){
	
	var client = new GuestClient();
	var self = this;
	
	self.template = ko.observable('get-party-form');
	self.firstName = ko.observable("");
	self.lastName = ko.observable("");
	self.invalidNames = ko.observable(false);
	self.rsvpSubmitted = ko.observable(false);
	
	self.nameEmpty = ko.computed(function(){
		
		return self.firstName() == '' || self.lastName() == '';
		
	});
	
	self.findGuests = async function(){
		
		try{
			var guest = await client.getGuest(this.firstName(), this.lastName());
			
			if(guest.status != 1){
				
				self.rsvpSubmitted(true);
				throw "Already sent RSVP";
			}
			return await client.getParty(guest.party_id);
		}
		catch(err){
			
			self.invalidNames(true);
			
			throw err;
		}

	};
	
}

function UpdatePartyVM(guests){
	
	var client = new GuestClient();
	var self = this;
	
	self.template = ko.observable('update-party-form');
	self.guests = ko.observableArray([]);
	init(guests);
	
	self.updateGuests = function(){
		
		for(guest of self.guests()){
			guest.updateGuest();
		}
	};
	
	function init(guests){
		
		for(guest of guests){
			self.guests.push(new GuestVM(guest));
		}
		
	}
	
}


function GuestVM(guest){
	
	var client = new GuestClient();
	var data = guest;
	var self = this;
		
	self.hasPlusOne = ko.observable(guest.has_plus_one);
	self.rsvpStatus = ko.observable('2');
	self.template = ko.observable('guest-form');
	
	self.fullName = ko.computed(function(){
		
		return (data.first_name + ' ' + data.last_name).toUpperCase();
		
	}, this);

	self.offerPlusOne = ko.computed(function(){
		
		return data.has_plus_one && this.rsvpStatus() == '2';
		
	}, this);
	
	
	self.updateGuest = function(){
		
		data["status"] = parseInt(self.rsvpStatus());
		client.updateGuest(data);
	}
	
	
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
			contentType: 'application/json',
			data: JSON.stringify(guest)
		});
		
		
	};
	
	this.updateGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests/" + guest.first_name + "/" + guest.last_name,
			method : 'PUT',
			contentType: 'application/json',
			data : JSON.stringify(guest)
		});
	
	};
	
}

$(document).ready(function(){
	ko.applyBindings(new MainVM());
});
