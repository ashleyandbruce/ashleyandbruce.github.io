window.onload = function(){
	slideshow(["save-the-date-alt.png","slideshow1.jpg", "slideshow2.jpg", "slideshow3.jpg"], 2000, "slide");
}


function slideshow(slides, time, container){
	
	var count = 0;
	var numslides = slides.length;
	var img = document.getElementById(container);
	
	function timeout(){
		count = (count + 1) % numslides;
		img.src = slides[count];
	}
	
	setInterval(function(){timeout();}, time);
	
}