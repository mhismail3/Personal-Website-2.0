jQuery(document).ready(function ($) {
    
    
    $(window).stellar();
    
    $(window).resize(function() {
        $.stellar('refresh');
    });
    
//    $.backstretch([
//        "images/bg-1.jpg",
//        "images/bg-2.jpg",
//        "images/bg-3.jpeg"
//    ], {duration: 10000, fade: 1500});

    var links = $('.navigation').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');

    $('img.fade-in-on-load').animate({
        opacity: 1
    }, 300);
    window.setTimeout(function() {
        $('h1.fade-in-on-load').animate({
            opacity: 1
        }, 300);
        $('.navitems.fade-in-on-load').animate({
            opacity: 1
        }, 300);
    }, 450);
    
    
    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }



    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


});


function openNav() {
    document.getElementById("mySidenav").style.width = "420px";
    document.getElementById("slide1").style.marginLeft = "420px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("slide1").style.marginLeft = "0";
}