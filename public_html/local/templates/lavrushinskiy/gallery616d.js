$(function(){
    var site = {
        width: null,
        height: null,
        is_mobile:false,
        is_tablet:false,
        current_page: [],
        session:{}
    };
    if ($('.gallery-full').length > 0){

        var url_string = window.location.href;
        var url = new URL(url_string);
        var param = url.searchParams.get("num");

        var _gallery_main = {
            cur_slide:0,
            started: false,
            init: function () {
                _gallery_main.started = false;

                _gallery_main.list = $('.gallery-list');
                _gallery_main.preview_slides = $('.gallery-preview-item');
                _gallery_main.slides = $('.gallery-full-item');
                _gallery_main.preview_slides.eq(0).addClass('active');

                _gallery_main.slider_full = new Swiper('.gallery-full', {
                    navigation: {
                        nextEl: '.swiper-button-next'
                        ,prevEl: '.swiper-button-prev'
                    }
                    ,speed:400
                    ,autoplay:5000
                    ,effect: 'fade'
                    ,keyboard: {enabled: true}
                    //,autoplayDisableOnInteraction: true
                    ,on: {
                        slideChangeTransitionStart: function (swiper) {
                            //if(_gallery_main.cur_slide == swiper.activeIndex) return;
                            _gallery_main.cur_slide = swiper.activeIndex;
                            var $asi = _gallery_main.slides.filter('.swiper-slide-active').find('.im_');
                            if($asi.attr('data-img')) {
                                $asi.css('backgroundImage','url('+$asi.attr('data-img')+')').attr('data-img','');
                            }
                            _gallery_main.slide(_gallery_main.cur_slide);
                        }
                    }
                });

                _gallery_main.slider_full.autoplay.stop();

                _gallery_main.slider_preview = new Swiper('.gallery-preview', {
                    navigation: {
                        nextEl: '.gallery-preview-next'
                        ,prevEl: '.gallery-preview-prev'
                    }
                    ,slidesPerView: 'auto'
                    ,spaceBetween: 5
                    //,slideToClickedSlide: true
                    ,centeredSlides: false
                    ,freeMode: true
                });

                if(param) {
                    _gallery_main.slider_full.slideTo(param-1);
                }

                $('.gallery-preview-click').click(function(e) {
                    e.preventDefault();
                    var trg = $(this).attr('href').replace('#','');
                    _gallery_main.cur_slide = parseInt(trg);
                    _gallery_main.slide();
                });

                $('.gallery-full-item-info-h').click(function(e) {
                    e.preventDefault();
                    $(this).closest('.gallery-full-item-info').toggleClass('open_');
                });

                $('.gallery-counter').text(_gallery_main.slides.eq(0).attr('data-section') + ' 1/' + _gallery_main.slides.eq(0).attr('data-count'));



                $('.gallery-list-scroll').perfectScrollbar();

                $('.gallery-list-item-link').click(function (e) {
                    e.preventDefault();
                    var trg = parseInt($(this).attr('href').replace('#',''));
                    _gallery_main.cur_slide = trg;
                    _gallery_main.slider_preview.slideTo(_gallery_main.cur_slide, 0);
                    _gallery_main.slide(true);
                    _gallery_main.hideGalleryList();
                });

                $('.bt-show-gallery-list').click(function (e) {
                    e.preventDefault();
                    _gallery_main.showGalleryList();
                });

                $('.bt-show-gallery').click(function (e) {
                    e.preventDefault();
                    _gallery_main.hideGalleryList();
                });

                var queue = new createjs.LoadQueue();
                var preload = [];
                for(var i = 0; i < 5; i++) {
                    preload.push(gallery_detail[i]);
                    //preload.push(gallery_preview[i]);
                }
                queue.loadManifest(preload);
                queue.on("complete", function () {
                    site.loading = false;
                    _gallery_main.started = true;
                    _gallery_main.start();
                });

                setTimeout(function () {
                    if(site.loading) {
                        site.loading = false;
                        _gallery_main.started = true;
                        _gallery_main.start();
                    }
                },5000);
            },
            start: function () {
                if(_gallery_main.started) return;
                _gallery_main.started = true;
                _gallery_main.slider_full.autoplay.start();
                _gallery_main.slides.each(function () {
                    var $asi = $(this).find('.im_');
                    if($asi.attr('data-img')) {
                        $asi.css('backgroundImage','url('+$asi.attr('data-img')+')').attr('data-img','');
                    }
                });
            },
            slide: function (fast) {
                var current_preview = _gallery_main.preview_slides.filter('.active').index();
                if(_gallery_main.slider_full.activeIndex != _gallery_main.cur_slide) _gallery_main.slider_full.slideTo(_gallery_main.cur_slide, (fast?0:600));
                if(current_preview != _gallery_main.cur_slide) {
                    var fow = current_preview < _gallery_main.cur_slide;
                    _gallery_main.preview_slides.removeClass('fow_ back_').filter('.active').addClass(fow?'fow_':'back_').removeClass('active')
                        .end().eq(_gallery_main.cur_slide)
                        .addClass('active ' + (fow?'fow_':'back_'));
                    _gallery_main.slider_preview.slideTo(_gallery_main.cur_slide, (fast?0:600));
                }
                var current = _gallery_main.slides.eq(_gallery_main.cur_slide);
                $('.gallery-counter').text(current.attr('data-section') +
                    ' ' + current.attr('data-num') +
                    '/' + current.attr('data-count'));


            },
            showGalleryList: function () {
                _gallery_main.list.velocity({scale:[1,0.8],opacity:[1,0]},{display:'block'});
            },
            hideGalleryList: function () {
                _gallery_main.list.velocity({scale:[0.8,1],opacity:[0,1]},{display:'none'});
            },
            requestFullScreen: function () {
                var element = document.body;
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) {
                    requestMethod.call(element);
                }
            },
            exitFullScreen: function () {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }

        _gallery_main.init();

        if (document.addEventListener) {
            var exitHandler = function() {
                $('.gallery-full').closest('.gallery-container').toggleClass('full-screen');
            }
            document.addEventListener('webkitfullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
        }
    }

    $('.bt-show-gallery-fs').on('click', function(e) {
        e.preventDefault();
        /*let cur = $('.swiper-slide-active').data("allnum");
        if (this.href.indexOf('?') === -1) {
            // если в ссылке не содержатся другие параметры
            this.href += '?num=' + cur;
        } else {
            // если в ссылке уже содержатся другие параметры
            this.href += '&num=' + cur;
        }
        window.location.href = this.href;*/
        if ($(this).closest('.gallery-container').hasClass('full-screen')) {
            _gallery_main.exitFullScreen();
        } else {
            _gallery_main.requestFullScreen();
        }
    });

    $('.bt-gallery-fs-close').on('click', function(e) {
        e.preventDefault();
        let cur = $('.swiper-slide-active').data("allnum");

        if (this.href.indexOf('?') === -1) {
            // если в ссылке не содержатся другие параметры
            this.href += '?num=' + cur;
        } else {
            // если в ссылке уже содержатся другие параметры
            this.href += '&num=' + cur;
        }
        window.location.href = this.href;
    });

    if ($('.gallery-fs').length > 0){

        var url_string = window.location.href;
        var url = new URL(url_string);
        var param = url.searchParams.get("num");


        var _gallery_full = {
            cur_slide:0,
            init: function () {
                _gallery_full.slider_full = new Swiper('.gallery-fs', {
                    navigation: {
                        nextEl: '.gallery-full-next'
                        ,prevEl: '.gallery-full-prev'
                    }
                    ,speed:2000
                    ,autoplay:5000
                    ,effect: 'fade'
                    ,loop:true
                });

                setTimeout(function () {
                    site.loading = false;
                },100);

                if(param) {
                    _gallery_full.slider_full.slideTo(param);
                }

                $('.bt-gallery-fs-full').click(function () {
                    _gallery_full.requestFullScreen(document.body);
                });

                $('.bt-gallery-fs-full-exit').click(function () {
                    _gallery_full.exitFullScreen();
                });

                document.addEventListener("fullscreenchange", function( event ) {
                    //if ( document.fullscreen ) {
                    // The target of the event is always the document,
                    // but it is possible to retrieve the fullscreen element through the API
                    //}
                    if($('.bt-gallery-fs-full-exit').is(':visible')) {
                        $('.bt-gallery-fs-full, .bt-gallery-fs-close').show();
                        $('.bt-gallery-fs-full-exit').hide();
                    }
                });



                //core.win.on("keyup", function(e) {
                //    console.log(e.keyCode);
                //    if (e.keyCode == 27) {
                //        console.log($('.bt-gallery-fs-full-exit').is(':visible'));
                //
                //    }
                //});
            },
            requestFullScreen: function (element) {
                // Supports most browsers and their versions.
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) { // Native full screen.
                    requestMethod.call(element);
                }
                $('.bt-gallery-fs-full, .bt-gallery-fs-close').hide();
                $('.bt-gallery-fs-full-exit').show();
                //else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                //    var wscript = new ActiveXObject("WScript.Shell");
                //    if (wscript !== null) {
                //        wscript.SendKeys("{F11}");
                //    }
                //}
            },
            exitFullScreen: function (element) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                $('.bt-gallery-fs-full, .bt-gallery-fs-close').show();
                $('.bt-gallery-fs-full-exit').hide();
                //else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                //    var wscript = new ActiveXObject("WScript.Shell");
                //    if (wscript !== null) {
                //        wscript.SendKeys("{F11}");
                //    }
                //}
            }
        };
        _gallery_full.init();
    }

});
