$(document).ready(function(){
	
		
	$('#submit').click(function(){
		var first_name = $('.input-first-name').val();
		var last_name = $('.input-last-name').val();
		var guest = get_guest(first_name, last_name);
		console.log(guest);
		var party = get_party(guest.party_id);
		console.log(party);
	});

});


function get_guest(first_name, last_name){
	var guest;
	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${first_name}/${last_name}`,
		function(data){
			guest = data;
		}
	);
	return guest;
}

function get_party(party_id){
	var party;
	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${party_id}`,
		function(data){
			party = data;
		}
	);
	return party;
}