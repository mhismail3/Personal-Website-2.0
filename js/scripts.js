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
    setAnimationDuration: function(startDuration, incrementDuration) {
        this.children().each(function(index) {
            $(this).css('animation-duration', (startDuration + incrementDuration * index) + 's'); 
        }).end();
//		.end() is questionable
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
        '../images/building-bg2.jpg',
        '../images/map-items.jpeg',
        '../images/monitor2.png'
    );

//	$('#slide3 .projects').masonry({
//		itemSelector: '.project',
//		columnWidth: '.project',
//		percentPosition: true,
//		horizontalOrder: true,
//		fitWidth: true,
//		gutter: 60
//	});
	
    
    $(window).scroll(function () {
        var currentScrollTop = $(window).scrollTop();
        $('.bgoverlay').css('opacity', currentScrollTop/$('.bgoverlay').height()*0.8);
    });
    
    window.setTimeout(function() {
        $(".fade-in-on-load").animate({opacity: 1}, 500);
    }, 1000);
    
    if (window.matchMedia('(max-width: 600px)').matches) {
		$("#slide0").animateCss('fadeInUp');
	} else {
		$("#slide0").setAnimationDuration(.8, -.2);
		$("#slide0").children().addClass("primary" ).end().animateCssStages('fadeInUp');
	}
	
	
    $("#slide1").waypoint(function() {
        $(".contain > .fa").removeClass("infinite bounce").animateCssInvisible("zoomOut");
        $(this).find('.description').setAnimationDuration(1.2, -.3);
        $(this).animateCssStages("fadeInUp");
    }, {offset: '50%'});
    
    
    $("#slide2").waypoint(function() {
        $(this).one(animationEnd, function() {
            $(this).find(".chart-title, .chart-bar").css('animation', '1s horiz-slide ease forwards');
        }).animateCss("fadeInUp");
    }, {offset: '50%'});   
    
    
    $("#slide3").waypoint(function() {
        $(this).find('.projects').setAnimationDuration(.9, .2);
        $(this).animateCssStages("fadeInUp");
    }, {offset: '50%'});
	
	
	$("#slide4").waypoint(function() {
        $(this).find(".contact-group").setAnimationDuration(.6, .1);
        $(this).animateCssStages("fadeInLeft", "fadeInUp");
    }, {offset: '50%'});
	
//	$("footer").waypoint(function() {
//		$(this).animateCss("slideInUp");
//	}, {offset: '100%'});
    
    
//    $('.slide').waypoint(function (event, direction) {
//
//        dataslide = $(this).attr('data-slide');
//
//        if (direction === 'down') {
//            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
//        }
//        else {
//            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
//        }
//    }); 
    

//    function goToByScroll(dataslide) {
//        $('html,body').animate({
//            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
//        }, 2000, 'easeInOutQuint');
//    }
//    links.click(function (e) {
//        e.preventDefault();
//        dataslide = $(this).attr('data-slide');
//        goToByScroll(dataslide);
//    });
//    button.click(function (e) {
//        e.preventDefault();
//        dataslide = $(this).attr('data-slide');
//        goToByScroll(dataslide);
//
//    });


});


function scrollToTop() {
    $('html,body').animate({
        scrollTop: 0
    }, 1500, 'easeInOutCubic');
}