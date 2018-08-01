$(document).ready(function(){
	
	$('.scroll-down').on('click', function(e){
		
		e.preventDefault();
		
		/*$(document.body).animate({
			
			scrollTop: $('.top-section').offset().top
	
		}, 'slow');*/
		
		$(document.body).scrollTop(500);
	});
	
});