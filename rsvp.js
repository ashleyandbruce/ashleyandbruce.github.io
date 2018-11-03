
function MainVM(){
	var client = new GuestClient();
	this.firstName = ko.observable("");
	this.lastName = ko.observable("");
	this.party = ko.observableArray([]);
	
	this.submit = function(){
		var guest = client.getGuest(this.firstName(), this.lastName());
		console.log(guest);
	};
	
}

function GuestClient(){
	var baseUrl = "https://quiet-plains-44094.herokuapp.com";
	
	this.getAll = function(){
		var data = null;
		$.get(
			`${baseUrl}/guests`,
			function(res){
				data = res;
			}
		);
		/*
		$.ajax({
			url : `${baseUrl}/guests`,
			method : 'GET',
			error : function(xhr, status, error){
				throw error;
			},
			success : function(result, status, xhr){
				data = result;
			}
		});*/
		
		return data;
	};
	
	this.getGuest = function(first_name, last_name){
		var data = null;
		
		$.get(
			`{baseUrl}/guests/${first_name}/${last_name}`,
			function(res){
				data = res;
			}
		);
		/*$.ajax({
			url : `{baseUrl}/guests/${first_name}/${last_name}`,
			method : 'GET',
			error : function(xhr, status, error){
				throw error;			
			},
			success : function(result, status, xhr){
				data = result;
			}
		});*/
		
		return data;
	};
	
	this.getParty = function(party_id){
		
		var data = null;
		
		$.get(
			`{baseUrl}/guests/${party_id}`,
			function(res){
				data = res;
			}
		);
		/*$.ajax({
			url : `{baseUrl}/guests/${party_id}`,
			method : 'GET',
			error : function(xhr, status, error){
				throw error;			
			},
			success : function(result, status, xhr){
				data = result;
			}
		});*/
		
		return data;
	};
	
	this.addGuest = function(guest){
		
		$.ajax({
			url : `${baseUrl}/guests`,
			method : 'PUT',
			error : function(xhr, status, error){
				throw error;
			}
		});
		
		
	};
	
	this.updateGuest = function(guest){
		
		$.ajax({
			url : `${baseUrl}/guests/${guest.first_name}/${guest.last_name}`,
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



















/*
$(document).ready(function(){
	
	$('#submit').click(function(){
		var first_name = $('.input-first-name').val();
		var last_name = $('.input-last-name').val();
		get_guest(first_name, last_name);
	});

});

function on_error(){
	$('#error').removeClass('invisible').addClass('visible');
}

function on_success(){
	$('#error').removeClass('visible').addClass('invisible');
}

function clear_form_wrapper(){
	$('#dynamic-form-wrapper').empty();
}

function get_guest(first_name, last_name){

	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${first_name}/${last_name}`,
		function(data){
			if(data.length == 0){
				on_error();
			}
			else{
				var guest = data[0];
				clear_form_wrapper();
				get_party(guest.party_id);
			}
		}
	);
}

function get_party(party_id){

	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${party_id}`,
		function(guests){
			for(guest of guests){
				var temp = $('#rsvp-guest-form').html();
				$('#dynamic-form-wrapper').append(temp);
				$(temp).find('.guest-name').append(`${guest.first_name} ${guest.last_name}`);
			}

		}
	);

}*/