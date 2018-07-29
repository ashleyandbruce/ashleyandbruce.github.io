$(window).scroll(function(){
	//parallax();
})

function parallax(){
	
	var wScroll = $(window).scrollTop();
	var mid = Math.floor($(window).height()/2);
	
	$('.parallax-bg').css('background-position', 'center ' + ((wScroll - mid) * 0.5)+ 'px');

}