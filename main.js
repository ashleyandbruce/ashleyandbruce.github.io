$(document).ready(function(){
	
	var controller = new ScrollMagic.Controller();	
	
	var tween = (new TimelineMax).to('#intro-image #intro-image-blur', 1, {
         css: {
           opacity: 0
         },
         ease: Circ.easeOutExpo
    });
	
	var tween2 = (new TimelineMax).to("#intro-image-fade", 1, {
			css: {
				opacity: 1
			},
            ease: Circ.easeOutExpo
     });
	 
	var tween3 = (new TimelineMax).to("#intro-image", 1, {
        css: {
            scaleX: 1.05,
            scaleY: 1.05
         },
         ease: Circ.easeOutExpo
    });
	
	var tween4 = (new TimelineMax).to("#intro-image-blur", 1, {
         css: {
            scaleX: 1.05,
            scaleY: 1.05,
            opacity: 1
        },
        ease: Circ.easeOutExpo
     });
	 
	var tween5 = (new TimelineMax).from("#index-2", 1, {
            css: {
				opacity: 0				
			},
            ease: Circ.easeOutExpo
     });
          
   var scene1 = new ScrollMagic.Scene({
        triggerElement: '#index-6',
        duration: 500,
        triggerHook: 1,
        offset: 0
    })
	.setTween(tween)
	.addTo(controller);
	
	var scene2 = new ScrollMagic.Scene({
        triggerElement: 0,
        duration: 900,
        triggerHook: 1,
        offset: 0
    })
	.setTween(tween2)
	.addTo(controller);
	
	var scene3 = new ScrollMagic.Scene({
        triggerElement: 0,
        duration: 400,
        triggerHook: 1,
        offset: 0
    })
	.setTween(tween3)
	.addTo(controller);
	
	var scene4 = new ScrollMagic.Scene({
            triggerElement: 0,
            duration: 300,
            triggerHook: 1,
            offset: 0
    })
	.setTween(tween4)
	.addTo(controller);
	
	var scene5 = new ScrollMagic.Scene({
           triggerElement: "#index-2",
           duration: 1000,
           triggerHook: 1,
           offset: 20
     })
	 .setTween(tween5)
	 .addTo(controller);
	 
	 scrollDown();
	
});



function scrollDown(){
	
	$(".btn-scroll").click(function (){
        $('html, body').animate({
            scrollTop: $("#index-1").offset().top
        }, 'slow');
     });
}