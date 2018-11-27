
var PartyVMFactory = {
	
	create : function(guests){
		if(guests.length == 1 && guests[0].has_plus_one){
			return new SinglePartyVM(guests[0]);
		}
		return new PartyVM(guests);
	}

};


function MainVM (){
	
	var self = this;
	self.currentViewModel = ko.observable(new GetPartyVM());
	self.formSubmitted = ko.observable(false);
	self.error = ko.observable(false);
	self.errorMessage = ko.observable('');
	
	self.submit = async function(){
		self.error(false);
		try{
			var guests = await self.currentViewModel().submit();
			self.currentViewModel(PartyVMFactory.create(guests));
			
		}catch(err){
			self.error(true);
			self.errorMessage(err);
		}
	};
		
	self.send = function(){
		self.formSubmitted(true);
		self.currentViewModel().submit();
			
	};
}

function GetPartyVM(){
	
	var client = new GuestClient();
	var self = this;
	
	FormVM.call(this, 'get-party-form');
	
	self.firstName = ko.observable("");
	self.lastName = ko.observable("");
	self.invalidNames = ko.observable(false);
	self.rsvpSubmitted = ko.observable(false);
	self.loadingGuests = ko.observable(false);
	
	self.nameEmpty = ko.computed(function(){
		
		return self.firstName() == '' || self.lastName() == '';
		
	});
	
	self.disableSubmit = ko.computed(function(){
		
		return self.nameEmpty() || self.loadingGuests();
		
	});
	
	self.submit = async function(){
		
		try{
			self.loadingGuests(true);
			var guest = await client.getGuest(this.firstName(), this.lastName());
			self.loadingGuests(false);
			
			
			if(guest.status != 1){
				throw "You have already submitted your RSVP.";
			}
			
			return await client.getParty(guest.party_id);
		}
		catch(err){
			self.loadingGuests(false);
			throw "We could not find you on the list. Please contact us if you continue to experience difficulties.";
		}

	};
	
}

function SinglePartyVM(guest){
	
	var self = this;
	FormVM.call(this, 'single-party-form' );
	
	self.primaryGuest = ko.observable(new GuestVM(guest));
	self.plusOne = ko.observable(new PlusOneVM(guest));
	
	
	self.offerPlusOne = ko.computed(function(){
		return self.primaryGuest().attending();
	});
	
	self.submit = function(){
		self.primaryGuest().update();
		self.plusOne().update();
	};
}

function PartyVM(guests){

	var self = this;
	FormVM.call(this, 'party-form');
	
	self.guests = ko.observableArray([]);
	init(guests);
	
	self.submit = function(){
		
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

function FormVM(template){
	var self = this;
	self.template = ko.observable(template);
}

function PlusOneVM(primaryGuest){
	
	var self = this;
	GuestVM.call(this, primaryGuest);
	
	self.rsvpStatus('3');
	self.firstName = ko.observable('');
	self.lastName = ko.observable('');
		
	self.update = function(){
		
		if(self.attending()){
			
			self.client.addGuest({
				first_name : self.firstName(),
				last_name : self.lastName(),
				status : self.rsvpStatus(),
				has_plus_one : false,
				is_plus_one : true,
				party_id : self.data.party_id,
				dietary_res : ''
			});
		}
	};
}


function GuestVM(guest){
	var self = this;
	
	self.data = guest;
	self.client = new GuestClient();
		
	self.rsvpStatus = ko.observable('2');
	
	self.fullName = ko.computed(function(){
		
		return (self.data.first_name + ' ' + self.data.last_name).toUpperCase();
		
	});
	
	self.attending = ko.computed(function(){
		
		return self.rsvpStatus() == '2';
		
	});
		
	self.update = function(){
		
		self.data["status"] = parseInt(self.rsvpStatus());
		self.client.updateGuest(self.data);
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
