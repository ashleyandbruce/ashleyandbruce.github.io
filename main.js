$(document).ready(function(){ 


});


function scroll_down(){
	
	var top_section = $('.top-section').offset();
	
	$('html, body').animate({
		
		scrollTop: top_section.top
	
	}, 1000);


	return false;
}

function scroll_up(){
	
	$('html, body').animate({
		
		scrollTop: 0
		
	}, 1000);

}