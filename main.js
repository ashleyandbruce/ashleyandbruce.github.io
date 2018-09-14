$(document).ready(function(){ 

	var index = 0;
	var images =["res/index.jpg", "res/details.jpg", "res/RSVP.jpg"];
		
	slideshow();
	
	function slideshow(){
		
		index= (index + 1)% 3;
		
		$('.header-img').css('background-image', 'url("'+ images[index] + '")')
		 .fadeIn("slow" , function(){
			setTimeout(slideshow,4000);
		});
	}
	
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

