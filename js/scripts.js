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
    animateCssStages: function(animationName) {
        this.removeClass('invisible');
        this.find('.primary, .secondary, .tertiary').addClass('invisible');
        this.find('.primary').removeClass('invisible').addClass( 'animated ' + animationName).end().one(animationEnd, function() {
            $(this).delay(1000).find('.secondary').removeClass( 'invisible').addClass('animated ' + animationName).end().one(animationEnd, function() {
                $(this).delay(1000).find('.tertiary').removeClass( 'invisible').addClass('animated ' + animationName);
            });
        });
    },
    setAnimationDuration: function(startDuration, incrementDuration) {
        this.children().each(function(index) {
            $(this).css('animation-duration', (startDuration - incrementDuration * index) + 's'); 
        });
    }
});


jQuery(document).ready(function($) {
    
    $.stellar();
    
    $(window).resize(function() {
        $.stellar('refresh');
    });
    
    $.preload(
        '../images/building-bg2.jpg',
        '../images/map-items.jpeg',
        '../images/monitor2.png'
    );


    $("#slide0").children().each(function(index) {
        $(this).css('animation-duration', (.8 - .2*index) + 's');
        $(this).delay(200*index).animateCss('fadeInUp');
    });
    
    $(window).scroll(function () {
        var currentScrollTop = $(window).scrollTop();
        $('.bgoverlay').css('opacity', currentScrollTop/$('.bgoverlay').height()*0.5);
    });
    
    window.setTimeout(function() {
        $(".fade-in-on-load").animate({opacity: 1}, 500);
    }, 1000);
    
    
    $("#slide1").waypoint(function() {
        $(".fa-angle-down").removeClass("infinite bounce").animateCssInvisible("zoomOut");
        $(this).children("div > div").setAnimationDuration(1.2, .3);
        $(this).animateCssStages("fadeInUp");
    }, {offset: '50%'});
    
    
    $("#slide2").waypoint(function() {
        $(this).one(animationEnd, function() {
            $(this).find(".chart-title, .chart-bar").css('animation', '1s horiz-slide ease forwards');
        }).animateCss("fadeInUp");
    }, {offset: '50%'});   
    
    
    $("#slide3").waypoint(function() {
        $(this).children("div > .projects > div").setAnimationDuration(1.2, .3);
        $(this).animateCssStages("fadeInUp");
    }, {offset: '50%'});
    
    
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