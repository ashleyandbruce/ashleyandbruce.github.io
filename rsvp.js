$(document).ready(function(){
	
		
	$('#submit').click(function(){
		var first_name = $('.input-first-name').val();
		var last_name = $('.input-last-name').val();
		get_guest(first_name, last_name);
	});

});


function get_guest(first_name, last_name){
	$.get(
		`https://quiet-plains-44094.herokuapp.com/guests/${first_name}/${last_name}`,
		function(data){
			console.log(data);
		}
	);
}