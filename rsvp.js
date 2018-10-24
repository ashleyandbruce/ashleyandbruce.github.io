$(document).ready(function(){

	$('#add-person').click(function(){
		var add_person_form = $('#rsvp-form-temp').html();
		$(add_person_form).insertAfter('.rsvp-form:last');
		
		$('.remove-person').click(function(){
			$(this).parents('.rsvp-form').remove();
		});		
	});
	
	
	$('#submit').click(function(){
		var message = [];
		var rsvps = $('.rsvp-form');
		
		for (var rsvp of rsvps){
			message.push([
				$(rsvp).find('.input-first-name').val(),
				$(rsvp).find('.input-last-name').val(),
				$(rsvp).find('.select-rsvp-status').val()
			]);
		}
	});

});
