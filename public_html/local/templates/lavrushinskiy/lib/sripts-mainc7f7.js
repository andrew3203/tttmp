const swiper = new Swiper('#decor', {
    // Optional parameters
    loop: true,
    speed: 400,
    lazy: true,

    autoplay: {
        delay: 5000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '#decor .swiper-button-next',
        prevEl: '#decor .swiper-button-prev',
    },
});

const swiper_arch = new Swiper('#arch_slider', {
    // Optional parameters
    loop: true,
    speed: 400,
    lazy: true,

    autoplay: {
        delay: 5000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '#arch_slider .swiper-button-next',
        prevEl: '#arch_slider .swiper-button-prev',
    },
});


$('.js-slider-in').each(function (){
    let sw_in = new Swiper($(this).find('.swiper-container')[0], {
        loop: true,
        speed: 400,
        lazy: true,

        navigation: {
            nextEl: $(this).find('.swiper-button-next')[0],
            prevEl: $(this).find('.swiper-button-prev')[0],
        },

    });
});


/*
const swiper_mob = new Swiper('.mobile_section .swiper-container', {
    // Optional parameters
    loop: true,
    speed: 400,

    autoplay: {
        delay: 4000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});*/

const swiper_mob1 = new Swiper('.mobile_section .f-sl', {
    // Optional parameters
    loop: true,
    speed: 400,
    lazy: true,

    autoplay: {
        delay: 4000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

swiper_mob1.autoplay.stop();
var target = $('.swiper-container.f-sl');
if(target.length){
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight - target.height() - target.height();

    $(window).scroll(function(){
        var winScrollTop = $(this).scrollTop();
        if(winScrollTop > scrollToElem){
            //сработает когда пользователь доскроллит к элементу с классом
            swiper_mob1.autoplay.start();

        }
    });

}




const swiper_mob2 = new Swiper('.mobile_section .s-sl', {
    // Optional parameters
    loop: true,
    speed: 400,
    lazy: true,

    autoplay: {
        delay: 4000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

swiper_mob2.autoplay.stop();
var target2 = $('.swiper-container.s-sl');
if(target2.length){
    var targetPos2 = target2.offset().top;
    var winHeight2 = $(window).height();
    var scrollToElem2 = targetPos2 - winHeight2 - target2.height() - target2.height();

    $(window).scroll(function(){
        var winScrollTop2 = $(this).scrollTop();
        if(winScrollTop2 > scrollToElem2){
            //сработает когда пользователь доскроллит к элементу с классом
            swiper_mob2.autoplay.start();

        }
    });
}






const swiper_mob3 = new Swiper('.mobile_section .t-sl', {
    // Optional parameters
    loop: true,
    speed: 400,
    lazy: true,

    autoplay: {
        delay: 4000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

swiper_mob3.autoplay.stop();
var target3 = $('.swiper-container.t-sl');
if(target3.length){
    var targetPos3 = target3.offset().top;
    var winHeight3 = $(window).height();
    var scrollToElem3 = targetPos3 - winHeight3 - target3.height() - target3.height();

    $(window).scroll(function(){
        var winScrollTop3 = $(this).scrollTop();
        if(winScrollTop3 > scrollToElem3){
            //сработает когда пользователь доскроллит к элементу с классом
            swiper_mob3.autoplay.start();
        }
    });
}


$(function () {
    $("*[type=tel]").inputmask("+7 999 999 99 99",{ "clearIncomplete": true });

    $('.section-tabs a').bind('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.section-block[data-id="' + $(this).closest('.section-tabs').attr('data-id') + '"]').removeClass('active').filter('[data-tab="' + $(this).attr('href').replace('#', '') + '"]').addClass('active');
            $(this).addClass('active').siblings('a').removeClass('active');
        }
    });
});



$(".js-anchor-link").on("click", function () {
    $(".header-mobile-nav .close.active").click();
});

$('.feedback-form form').bind('submit', function(e) {
    var error = false;
    var error_text = '';


    if($('#leadFormTel').val().replace(/\s/g, '') === ''){
        error = true;
        error_text += 'Не заполнен номер телефона<br>';
    }
    if($('#leadFormName').val().replace(/\s/g, '') === ''){
        error = true;
        error_text += 'Не заполнено имя<br>';
    }

    if(!$('#leadFormCheck:checked').length){
        error = true;
        error_text += 'Отметье галочкой согласие на обработку своих персональных данных<br>';
    }

    if(error){
        $('.errortext-out').show();
        $('.errortext-out .errortext').html(error_text);
        e.preventDefault();
        return false;
    }else{
        $('.errortext-out').hide();
    }
});
