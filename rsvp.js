
function MainVM(){
	var client = new GuestClient();
	this.firstName = ko.observable("");
	this.lastName = ko.observable("");
	this.party = ko.observableArray([]);
	
	this.submit = async function(){
		var guest = await client.getGuest(this.firstName(), this.lastName());
		
		console.log(guest);
		
		var party = await client.getParty(guest.party_id);
		
		console.log(party);
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
			method : 'PUT',
			error : function(xhr, status, error){
				throw error;
			}
		});
		
		
	};
	
	this.updateGuest = function(guest){
		
		$.ajax({
			url : baseUrl + "/guests/" + guest.first_name + "/" + guest.last_name,
			method : 'PATCH',
			data : {
				status: guest.status,
				dietary_res : guest.dietary_res
			},
			error : function(xhr, status, error){
				throw error;
			}
		});
	
	};
	
}

$(document).ready(function(){
	ko.applyBindings(new MainVM());
});
