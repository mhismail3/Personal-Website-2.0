var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$.fn.extend({
    animateCss: function(animationName) {
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


jQuery(document).ready(function ($) {
    
    $(window).stellar();
    
    $(window).resize(function() {
        $.stellar('refresh');
    });


    $("#slide0").children().each(function(index) {
        $(this).css('animation-duration', (.8 - .2*index) + 's');
        $(this).delay(200*index).animateCss('fadeInUp');
    });
    
    window.setTimeout(function() {
        $(".fa-angle-down").animate({opacity: 1}, 500);
    }, 1000);
    
    $(window).scroll(function () {
        var currentScrollTop = $(window).scrollTop();
        $('.bgoverlay').css('opacity', currentScrollTop/$('.bgoverlay').height()*0.5);
    });
    
    $("#slide1").waypoint(function() {
        $(".fa-angle-down").removeClass("infinite bounce").addClass("zoomOut");
        $("#slide1").removeClass("animated");
        $("#slide1 p").addClass("animated");
        $("#slide1 > h2, #slide1 > div > img").addClass("animated fadeInUp").delay(1000).queue(function(next) {
            $("#slide1 > div > div").children().each(function(index) {
                $(this).css('animation-duration', (1.2 - .3*index) + 's');
                $(this).delay(500*index).addClass("animated fadeInUp");
            });
            next();
        });
        
    }, {offset: '50%'});

    
    $("#slide2").waypoint(function() {
        
        $("#slide2").addClass("animated fadeInUp").delay(800).queue(function(next) {
            $("#slide2 .chart-title, #slide2 .chart-bar").css('animation', '1s horiz-slide ease forwards');
        });
        
        
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
