var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$.fn.extend({
    animateCss: function(animationName) {
        this.removeClass('invisible').addClass('animated ' + animationName);
    },
    animateCssInvisible: function(animationName) {
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).addClass('invisible');
        });
    },
    animateCssStages: function(animationName, animationName2 = 'default', animationName3 = 'default') {
		if (animationName2 === 'default') animationName2 = animationName;
		if (animationName3 === 'default') animationName3 = animationName;
        this.removeClass('invisible');
        this.find('.primary, .secondary, .tertiary').addClass('invisible');
        this.find('.primary').removeClass('invisible').addClass( 'animated ' + animationName).end().one(animationEnd, function() {
            $(this).delay(1000).find('.secondary').removeClass( 'invisible').addClass('animated ' + animationName2).end().one(animationEnd, function() {
                $(this).delay(1000).find('.tertiary').removeClass( 'invisible').addClass('animated ' + animationName3);
            });
        });
    },
    setAnimationDuration: function(startDuration, incrementDuration = 0, orderClass = "none") {
        if (orderClass === "none") {
			this.children().each(function(index) {
            $(this).css('animation-duration', (startDuration + incrementDuration * index) + 's'); 
        	}).end();
		} else {
			this.find("." + orderClass).each(function(index) {
				$(this).css('animation-duration', (startDuration + incrementDuration * index) + 's'); 
			}).end();			
		}
    }
});


jQuery(document).ready(function($) {
    
    $.stellar({
		horizontalScrolling: false,
		hideDistantElements: false
	});
    
    $(window).resize(function() {
        $.stellar('refresh');
    });
    
    $.preload(
        '../images/building-bg.jpg',
        '../images/map-items.jpeg',
        '../images/monitor.png'
    );
	
    
    $(window).scroll(function () {
        var currentScrollTop = $(window).scrollTop();
        $('.bgoverlay').css('opacity', currentScrollTop/$('.bgoverlay').height()*0.8);
    });
    
    window.setTimeout(function() {
        $(".fade-in-on-load").animate({opacity: 1}, 500);
    }, 1000);
    
    if (window.matchMedia('(max-width: 600px)').matches) {
		$("#header-content").animateCss('fadeInUp');
	} else {
		$("#header-content").setAnimationDuration(1.2, -.2);
		$("#header-content").children().addClass("primary" ).end().animateCssStages('fadeInUp');
	}
	
	
    $("#about-me").waypoint(function() {
		$(".content-wrapper > .fa").removeClass("infinite bounce").animateCssInvisible("zoomOut");
		if (window.matchMedia('(max-width: 600px)').matches) {
			$(this).animateCss('fadeInUp');
		} else {
//			$(this).find('.description').setAnimationDuration( 1.2, -.3);
			$(this).find('.description').setAnimationDuration( 1.2, -.2, 'secondary');
        	$(this).animateCssStages("fadeInUp");
		}  
    }, {offset: '50%'});
    
    
    $("#experience").waypoint(function() {
        $(this).one(animationEnd, function() {
            $(this).find(".chart-title, .chart-bar").css('animation', '1s horiz-slide ease forwards');
        }).animateCss("fadeInUp");
    }, {offset: '50%'});   
    
    
    $("#projects").waypoint(function() {
        $(this).find('.projects').setAnimationDuration(.9, .2);
        $(this).animateCssStages("fadeInUp");
    }, {offset: '50%'});
	
	
	$("#get-in-touch").waypoint(function() {
        $(this).find(".contact-group").setAnimationDuration(.6, .1); // add primary class to same elements in same line?
        $(this).animateCssStages("fadeInLeft", "fadeInUp");
    }, {offset: '50%'});
    
	
	$("#navbar").animateCss('slideInDown');
	$(".page-contain").css('animation-duration', '1.5s');
	$(".page-contain").animateCss('fadeInUp');
	

});


function scrollToTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 1500, 'easeInOutCubic');
}