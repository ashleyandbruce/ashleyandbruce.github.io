$(document).ready(function(){
	
	$('#submit').click(function(){
		var first_name = $('.input-first-name').val();
		var last_name = $('.input-last-name').val();
		var guest = get_guest(first_name, last_name);
		var party = get_party(guest.party_id);
	});

});


function get_guest(first_name, last_name){

	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${first_name}/${last_name}`,
		function(data){
			console.log(data);
		}
	).fail(function(){
	
	
	});
}

function get_party(party_id){

	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${party_id}`,
		function(data){
			party = data;
		}
	);

}