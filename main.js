$(document).ready(function(){
	
	var offset = 150;
	var duration = 300;
	
	$(window).scroll(function(){
		if($(this).scrollTop() > offset){
			$('.up').fadeIn(duration);
		}
		else{
			$('.up').fadeOut(duration);
		}
	});

});

function scroll_up(){
	
	$('html, body').animate({
		
		scrollTop: 0
		
	}, 1000);

}

