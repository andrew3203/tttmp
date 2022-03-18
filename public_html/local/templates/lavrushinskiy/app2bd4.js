!function(e){function t(t){for(var r,i,f=t[0],c=t[1],l=t[2],p=0,s=[];p<f.length;p++)i=f[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&s.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(a&&a(t);s.length;)s.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,f=1;f<n.length;f++){var c=n[f];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},u=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var f=window.webpackJsonp=window.webpackJsonp||[],c=f.push.bind(f);f.push=t,f=f.slice();for(var l=0;l<f.length;l++)t(f[l]);var a=c;u.push([5,1,2]),n()}([,,,,,function(e,t,n){"use strict";n.r(t),function(e){n(6),n(7),n(8),n(9),n(10),n(11),n(12),n(13),n(14);window.$=e}.call(this,n(0))},function(e,t,n){},function(e,t,n){},function(e,t,n){}]);

$(".navigation a").bind('click', function (e){
    var href = $(this).attr('href')
    console.log(href);
    if(href.indexOf("#")!='-1' && href.indexOf("/")=='-1'){
        e.preventDefault();
        var top = $(href).offset().top - $('.header').height();
        console.log(top);

        $('html, body').animate({scrollTop: top}, 1000);

    }

});
$(".advantages-content .js-anchor-link").bind('click', function (e){
    var href = $(this).attr('href')
    console.log(href);
    if(href.indexOf("#")!='-1' && href.indexOf("/")=='-1'){
        e.preventDefault();
        var top = $(href).offset().top - $('.header').height();
        console.log(top);

        $('html, body').animate({scrollTop: top}, 1000);

    }

});
$(document).ready(function() {
    // Assign some jquery elements we'll need
    var $swiper = $(".swiper-container-benefits");
    var $bottomSlide = null; // Slide whose content gets 'extracted' and placed
    // into a fixed position for animation purposes
    var $bottomSlideContent = null; // Slide content that gets passed between the
    // panning slide stack and the position 'behind'
    // the stack, needed for correct animation style

    var mySwiper = new Swiper(".swiper-container-benefits", {
        slidesPerView: 3,
        centeredSlides: true,
        roundLengths: true,
        loop: true,
        loopAdditionalSlides: 30,
        spaceBetween: 10,
        breakpoints: {
            279: {
                slidesPerView: 1,
            },
            740: {
                slidesPerView: 3,
            }
        },
        navigation: {
            nextEl: ".next",
            prevEl: ".prev"
        },

    });
});
