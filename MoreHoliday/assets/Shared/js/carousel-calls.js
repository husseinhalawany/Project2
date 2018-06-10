/* 
 * ---------------------------------------- *
 * Name: Carousel Calls Functions           *
 * Type: JavaScript                         *
 * Version: Not Versioned                   *
 * Author: Codehouse LTD                    *
 * ---------------------------------------- *
 */

var Carousels = {}; // for multiple carousels

(function ($) {
    // homepage carousel initiate
    var swipePos = 0,
        duration,
        requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { setTimeout(callback, 1000 / 60); };
    Carousels.homeCarousel = function () {
        duration = 400;

        // reduce duration on mobile devices to increase responsiveness
        duration = isMobile ? $(window).width() <= 600 ? duration / 2 : duration / 1.5 : duration;

        $(".home-carousel").codehouseCarousel({
            modes: {
                work: true,
                infinite: true,
                responsive: isOldie ? false : true,
                nudge: false
            },
            controls: {
                step: true,
                pager: false
            },
            rotate: {
                auto: false,
                direction: "right",
                interval: 2000,
                duration: duration,
                type: 'linear'
            },
            dimensions: {
                fixedHeight: false,
                maxHeight: 568,
                baseWidth: isIE7 ? 1001 : 1062
            },
            options: {
                preload: true,
                stickySlides: false,
                visibleClassAfter: false,
                maskedOverflow: false
            },

            // on ready
            onReady: function (d) {
                siteLightbox(d.$banner.find('a.lightbox'));

                var $visSlide = d.$banner.find('.visible');
                $visSlide.find('.overlay.cn').each(function () {
                    $(this).delay(Math.random() * 150).fadeOut(250);
                });

                // if image aspect ratio is less than the container, set image height to fill area
                d.$banner.find('.work').each(function () {
                    $(this).find('img').not('.play-icon').each(function (e) {
                        var $image = $(this);
                        setImgClasses($image, $image.parent(), 'desktop'); // check for desktop
                        if (e === 0 && !isOldie) { // only needed for first item as this is the only one that shows on mobile - plus not needed for old IE
                            setImgClasses($image, $image.parents('.holder'), 'mobile'); // check for mobile
                        }
                    });
                });

                var $items = d.$banner.find('.item'),
                    showEvent = isMobWebkit ? 'click' : 'mouseenter';
                $items.on(showEvent, function () {
                    showContents($(this));
                });
                if (isMobile || isIETouch) {
                    var hideEvent = isMobWebkit ? 'touchend' : isIETouch ? 'MSPointerDown pointerdown' : 'click';
                    $(document).on(hideEvent, function (e) { // hide menu when interacting with the rest of the page
                        if ($items.has(e.target).length === 0 && $items.filter('.show').length) {
                            hideContents($items.filter('.show'));
                        }
                    });
                    if (isMobWebkit) {
                        d.$banner.find('.step').on('touchend', function () {
                            $(this).click();
                            return false;
                        });
                    }
                } else { // bind mouseleave for desktop
                    $items.on('mouseleave', function () {
                        hideContents($(this));
                    });
                }
            },

            // on rotate start
            onRotateStart: function (d) {
                var $visSlide = d.$banner.find('.visible');
                $visSlide.find('.overlay.cn').each(function () {
                    $(this).delay(Math.random() * 150).fadeIn(200);
                });
                hideContents($visSlide.find('.item.show'));
            },

            // on rotate end
            onRotateEnd: function (d) {
                var $visSlide = d.$banner.find('.visible');
                $visSlide.find('.overlay.cn').each(function () {
                    $(this).stop().delay(Math.random() * 150).fadeOut(200);
                });
                swipePos = 0;
            }
        });

        function showContents($item) {
            if ($item.parents('.work').hasClass('visible')) {
                if ($item.hasClass('video-tile') && isMobile) { // prevent descripton from showing for video tile on mobile devices
                    return false;
                }
                if (isMobile || isIETouch) {
                    if (isMobile && $item.hasClass('show')) { // if on mobile, follow link on second click
                        window.location.href = $item.find('a').attr('href');
                    }
                    if ($item.parent().children('.show').length) { // if any other items are showing content, hide them
                        hideContents($item.parent().children('.show'));
                    }
                }
                $item.addClass('show');
                $item.find('.overlay').not('.cn').stop().fadeOut(100);
                $item.find('h2').stop().fadeOut(100);
                $item.find('.icon').stop().animate({ 'top': '0' }, 200);
                $item.find('.info').slideDown(200);
            }
        }

        function hideContents($item) {
            if ($item.parents('.work').hasClass('visible')) {
                $item.removeClass('show');
                $item.find('.overlay').not('.cn').fadeIn(200);
                $item.find('h2').fadeIn(100);
                $item.find('.icon').stop().animate({ 'top': '-43px' }, 200);
                $item.find('.info').stop().slideUp(200);
            }
        }

        function setImgClasses($image, $container, windowType) {
            var aspectRatio = ($image.height() / $image.width()) * 100,
                containerAspectRatio = (parseInt($container.height()) / $container.width()) * 100;
            // if the image's aspect ratio is less than the container's, set class based on windowType variable
            if (aspectRatio < containerAspectRatio) {
                $image.addClass(windowType + '-tall');
            } else {
                $image.addClass(windowType + '-wide');
            }
        }

    }; // homepage carousel end

    // video carousel initiate
    Carousels.videoCarousel = function () {
        var duration = 400;

        // reduce duration on mobile devices to increase responsiveness
        duration = isMobile ? $(window).width() <= 600 ? duration / 2 : duration / 1.5 : duration;

        $('.video-carousel').codehouseCarousel({
            modes: {
                work: true,
                infinite: true,
                responsive: isOldie ? false : true,
                nudge: false
            },
            controls: {
                step: true,
                pager: false
            },
            rotate: {
                auto: false,
                direction: "right",
                interval: 2000,
                duration: duration,
                type: 'linear'
            },
            dimensions: {
                fixedHeight: false,
                baseWidth: $('.video-carousel').width()
            },
            options: {
                preload: true,
                stickySlides: false,
                visibleClassAfter: false,
                maskedOverflow: false
            },
            onReady: function (d) {
                siteLightbox(d.$banner.find('a.lightbox'));

                if (isMobWebkit) {
                    d.$banner.find('.step').on('touchend', function () {
                        $(this).click();
                        return false;
                    });
                }
            },
            onRotateEnd: function (d) {
                swipePos = 0;
            }
        });
    };

    var currentLeft;
    codehouseSwipe($(".ch-carousel"), {
        swipeDirection: 'horizontal',
        threshold: 80,
        start: function (el) {
            if (swipePos === 0) {
                swipePos = 1;
                currentLeft = $(el).find('.visible').position().left * -1;
                $(el).children('.works').css({
                    '-webkit-transition': '0s',
                    '-moz-transition': '0s',
                    '-o-transition': '0s',
                    'transition': '0s'
                });
            }
        },
        moving: function (movementX, movementY, el) {
            requestAnimFrame(function () {
                if (swipePos === 1) {
                    var pos = currentLeft + movementX + 'px';
                    $(el).children('.works').css({
                        '-webkit-transform': 'translate3d(' + pos + ', 0px, 0px)',
                        '-moz-transform': 'translate3d(' + pos + ', 0px, 0px)',
                        '-o-transform': 'translate3d(' + pos + ', 0px, 0px)',
                        'transform': 'translate3d(' + pos + ', 0px, 0px)'
                    });
                }
            });
        },
        left: function (movementX, movementY, el) {
            if (swipePos === 1) {
                swipePos = 2;
                $(el).children('.step.next').click();
            }
        },
        right: function (movementX, movementY, el) {
            if (swipePos === 1) {
                swipePos = 2;
                $(el).children('.step.prev').click();
            }
        },
        notReached: function (movementX, movementY, el) {
            if (swipePos === 1) {
                swipePos = 0;
                var resetDuration = (duration / 1000) / 3 + 's';
                $(el).children('.works').css({
                    '-webkit-transition': resetDuration,
                    '-moz-transition': resetDuration,
                    '-o-transition': resetDuration,
                    'transition': resetDuration,
                    '-webkit-transform': 'translate3d(' + currentLeft + "px" + ', 0px, 0px)',
                    '-moz-transform': 'translate3d(' + currentLeft + "px" + ', 0px, 0px)',
                    '-o-transform': 'translate3d(' + currentLeft + "px" + ', 0px, 0px)',
                    'transform': 'translate3d(' + currentLeft + "px" + ', 0px, 0px)'
                });
            }
        }
    });
})(jQuery);