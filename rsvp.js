
function MainVM(){
	
	var self = this;
	var partyFactory = new PartyVMFactory();
	
	self.currentViewModel = ko.observable(new GetPartyVM());
	
	self.submit = async function(){
		
		try{
			var guests = await self.currentViewModel().findGuests();
			/*var guests =
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
				
			}];*/
			self.currentViewModel(partyFactory.create(guests));
			
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

function PartyVMFactory(){
	
		
	this.create = function(guests){
		if(guests.length == 1 && guests[0].has_plus_one){
			return new SinglePartyVM(guests[0]);
		}
		return new PartyVM(guests);
	};
	
}


function SinglePartyVM(guest){
	
	var self = this;
	
	self.template = ko.observable('single-party-form');
	self.primaryGuest = ko.observable(new GuestVM(guest));
	self.plusOne = ko.observable(new PlusOneVM(guest));
	
	
	self.offerPlusOne = ko.computed(function(){
		return self.primaryGuest().attending();
	});
	
	self.updateGuests = function(){
		self.primaryGuest().update();
		self.plusOne().update();
	};
}

function PartyVM(guests){

	var self = this;
	
	self.template = ko.observable('party-form');
	self.guests = ko.observableArray([]);
	init(guests);
	
	self.updateGuests = function(){
		
		for(guest of self.guests()){
			guest.update();
		}
	};
	
	function init(guests){
		
		for(guest of guests){
			self.guests.push(new GuestVM(guest));
		}
		
	}
	
}


function PlusOneVM(primaryGuest){
	
	var client = new GuestClient();
	var data = primaryGuest;
	
	self.rsvpStatus = ko.observable('3');
	
	self.firstName = ko.observable('');
	self.lastName = ko.observable('');
	
	self.attending = ko.computed(function(){
		
		return self.rsvpStatus() == '2';
		
	});
	
	self.update = function(){
		
		if(self.attending()){
			
			client.addGuest({
				first_name : self.firstName(),
				last_name : self.lastName(),
				status : self.rsvpStatus(),
				has_plus_one : false,
				is_plus_one : true,
				party_id : data.party_id,
				dietary_res : ''
			});
		}
	};
}


function GuestVM(guest){
	
	var client = new GuestClient();
	var data = guest;
	var self = this;
		
	self.rsvpStatus = ko.observable('2');
	
	self.fullName = ko.computed(function(){
		
		return (data.first_name + ' ' + data.last_name).toUpperCase();
		
	});
	
	self.attending = ko.computed(function(){
		
		return self.rsvpStatus() == '2';
		
	});
		
	self.update = function(){
		
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
