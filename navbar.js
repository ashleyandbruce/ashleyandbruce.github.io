window.onload = function(){

window.onscroll = function(){
	scroll();
};

var navbar =  document.getElementById("topnav"); 
var	sticky = navbar.offsetTop;


function scroll(){
	
	if(window.pageYOffset >= sticky){
		navbar.classList.add("sticky");
	}
	else{
		navbar.classList.remove("sticky");
	}
}

}
