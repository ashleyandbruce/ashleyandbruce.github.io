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
			console.log(guests);
			for(guest of guests){
				var temp = $('#rsvp-guest-form');
				console.log(temp.html());
				//var guest_form = temp.content.cloneNode(true);
				//$(temp).find('guest-name').text(`${guest.first_name} ${guest.last_name}`.toUpperCase());
				//$('#dynamic-form-wrapper').appendChild(temp);
			}

		}
	);

}