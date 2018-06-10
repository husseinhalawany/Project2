/* 
 * ---------------------------------------- *
 * Name: Primary JavaScripts                *
 * Type: JavaScript                         *
 * Version: Not Versioned                   *
 * Author: Codehouse LTD                    *
 * ---------------------------------------- *
 */
$('html').removeClass('no-js').addClass('js');

var navAgent = navigator.userAgent.toLowerCase(),
    isOldie = $('html').hasClass('oldie'),
    isIE7 = $('html').hasClass('ie7'),
    isIE8 = $('html').hasClass('ie8'),
    isIE9 = $('html').hasClass('ie9'),
    isIE10 = navAgent.indexOf('msie 10.0') > -1,
    isIE11 = navAgent.indexOf('rv:11') > -1,
    isIETouch = navAgent.indexOf('touch') > -1,
    pointerEnabled = window.navigator.pointerEnabled,
    msPointerEnabled = window.navigator.msPointerEnabled,
    pageEditor = $('html').hasClass('scpageedit'),
    isMobWebkit = /android|iphone|ipad|ipod/i.test(navAgent),
    isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(navAgent),
    isPhone = isMobile && $(window).width() < 600,
    map;

if (isMobile) {
    $('html').addClass('mobile');
}

/* -----------------------------
   DOM Ready
   ----------------------------- */

$(document).ready(function () {

    if (!isOldie) {
        responsiveLayouts();
    }

    if ($('#contact-enquiry').length) {
        var $details = $('#contact-enquiry').find('.scfForm .scfSectionBorderAsFieldSet:first').children('.scfSectionContent');
        $details.children().filter(':nth-child(2n)').addClass('half right');
        $details.children().filter(':nth-child(2n - 1)').addClass('half left');
        $details.parent().parent().addClass('no-bottom-padding');

        $('#contact-enquiry').find('.scfForm .scfRadioButtonListBorder').each(function () {
            if ($(this).next('.scfRadioButtonListBorder').length) {
                $(this).addClass('half left');
                $(this).next('.scfRadioButtonListBorder').addClass('half right');
            }
        });
    }

    // clicks on scroll to anchors
    $('.scroll-to').click(function (e) {
        var a = $(this).attr('href').split('#')[1];
        if ($('#' + a + '').length) { // check that there's a matching id on the page
            e.preventDefault();
            $('html, body').animate({ scrollTop: $('#' + a + '').offset().top }, 500);
        }
    });

    // clients listing
    if ($('#clients').length && !chSitecore.pageEditor) {
        clientLogos();
    }

    // partners listing
    if ($('#partner-list').length) {
        $('#partner-list').find('li:last').addClass('last');
        $('#partner-list').find('ul').addClass('count-' + $('#partner-list').find('ul').children('li').length);
    }

    // site menu hover
    siteMenu();

    // forms hooks 
    $('.scfForm').each(function () {
        $('input[type=submit]').addClass('btn-submit button');
    });

    // footer tabs
    if ($('#footer-buttons').length && !chSitecore.pageEditor) {
        footerButtons();
    }

    // blog listing page
    if ($('.chg-filter-results').length && !chSitecore.pageEditor) {
        loadScript("serialise.js", function () {
            loadScript("wcf-interface.js", function () {
                wcfInterface.constr(wcfInterface);
            }, false);
        }, false);
    }

    if ($('#history').length) {
        companyHistory();
    }

    // services module
    if ($('.services-modules').length) {
        if (chSitecore.pageEditor) {
            $('.services-modules').removeClass('grid');
        }
        servicesModule();
    }

    if (chSitecore.preview) {
        loadScript('jquery-1.10.2.min.js', loadCarousels(), false); // if preview mode, override page editor version of jQuery
    }

    // home page carousel
    if ($(".ch-carousel").length && !chSitecore.pageEditor) {
        loadCarousels();
    }

    // adjust bottom padding of main widget area in IE7
    if (isIE7 && $('.main-widgets').length) {
        if ($('.single-widget.widget-case-study').length) { // if there is a single case study widget, it is meant to be flush to the bottom
            $('.single-widget.widget-case-study').each(function () {
                if ($(this).is($(this).parent().children('.widget:last'))) { // check that the single case study widget is the last widget in the wrapper
                    $(this).parents('.main-widgets').css('padding-bottom', '0');
                }
            });
        }
    }

    // responsive youtube iframes in blog posts
    if ((!isOldie) && $('.post-text').find('iframe').length) {
        $('.post-text').find('iframe').responsiveVideos();
    }


    // google map init
    if ($('#google-map').length) {
        googleMap();
    }

});  // dom ready

/* -----------------------------
   Window Load
   ----------------------------- */

$(window).load(function () {

    // detect aspect ratio of images used in widgets 
    $('.widget.widget-case-study .image img, .widget.widget-blog .image img, .main-widgets .widget .image img, .top-image img').each(function () {
        var $image = $(this),
		    aspectRatio = ($image.height() / $image.width()) * 100,
            containerAspectRatio = (parseInt($image.parent().css('padding-bottom')) / $image.parent().innerWidth()) * 100;

        if (aspectRatio < containerAspectRatio) { // if the image's aspect ratio is less than the container's default, reset the container to match
            $image.parent().css('padding-bottom', aspectRatio + '%');
        }
    });

    // set heights of related posts on blog pages
    if ($('.related-posts').length) {
        setTwoWidgetImgHeights($('.related-posts').find('.widget'));
    }

});  // window load end

/* -----------------------------
   Window Resize
   ----------------------------- */

var resizeTimer,
    orientationSupport = isMobile ? window.hasOwnProperty('orientation') : false,
    resizeEvent = orientationSupport ? 'orientationchange' : 'resize';
$(window).on(resizeEvent, function () {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {

        if (!isOldie) {
            responsiveLayouts();
        }

        if ($('#google-map').length) { // google map - trigger resize and reset map center
            google.maps.event.trigger(map, 'resize');
            map.setCenter(new google.maps.LatLng(51.5150539, -0.0783611));
        }

        // history module 
        if ($('#history').length && !isMobile) { // check margin positions on resize to make sure user hasn't scrolled past available area 
            var $holder = $('#history').find('.history-holder');
            if (($holder.css('margin-top').replace('px', '') * -1) > $holder.outerHeight() - $holder.parent().outerHeight()) {
                $holder.css('margin-top', ($holder.outerHeight() - $holder.parent().outerHeight()) * -1);
            }
            $('#history').children('.nav').removeClass('disabled');
        }
    }, 100);
}); // window resize end

/* -----------------------------
   Functions
   ----------------------------- */

// load carousels
function loadCarousels() {
    loadScript('codehouse-carousel-2.0.0.min.js', function () {
        loadScript('codehouse-swipe.js', function () {
            loadScript('carousel-calls.js', function () {
                if ($(".home-carousel").length) {
                    if (Carousels.homeCarousel != undefined) {
                        Carousels.homeCarousel();
                    }
                }
                if ($('.video-carousel').length) {
                    if (Carousels.videoCarousel != undefined) {
                        Carousels.videoCarousel();
                    }
                }
            }, false);
        }, false);
    }, false);
};

// set image heights of two widgets to match
function setTwoWidgetImgHeights($widgets) {
    var $widgetImgs = $widgets.find('.image');
    if ($widgetImgs.length > 1) {
        if ($widgetImgs.filter(':first').outerHeight() !== $widgetImgs.filter(':last').outerHeight()) { // compare heights to see if they match
            var $smallest = $($widgetImgs[0]); // assume first image area is the smallest temporarily
            $widgetImgs.each(function () { // cycle through images and check height against assumed smallest - reset $smallest if necessary
                if ($(this).outerHeight() < $smallest.outerHeight()) {
                    $smallest = $(this);
                }
            });
            var $smallestImg = $smallest.find('img'),
                valueToSet = ($smallestImg.height() / $smallestImg.width()) * 100 + '%'; // calculate percentage padding to set
            $widgetImgs.css('padding-bottom', valueToSet); // set new padding value on each related post so the image sizes match
        }
    }
}

function siteMenu() {
    var clickEvent = isMobWebkit ? 'touchend' : 'click';
    if (isMobile || isIETouch) { // use click events for mobile and IE touch
        $('#parent-nav > li').on(clickEvent, function (e) {
            if (!$(this).hasClass('active')) {
                if ($(this).children('.sub-nav').length) { // if there is a subnav, show it on first click
                    $(this).parent().children().removeClass('active');
                    $(this).addClass('active');
                    $('#parent-nav > li').children('.sub-nav').hide();
                    $(this).children('.sub-nav').show();
                    return false;
                }
            }
        });
        $(document).on(clickEvent, function (e) { // hide menu when interacting with the rest of the page
            if ($('#main-nav').has(e.target).length === 0 && ($('#parent-nav > li').hasClass('active') || $('#main-nav').hasClass('open'))) {
                $('#parent-nav > li').removeClass('active');
                $('#parent-nav > li').children('.sub-nav').hide();
                $('#main-nav').removeClass('open');
            }
        });
    } else { // hover events for standard desktop
        $('#parent-nav > li').on({
            mouseover: function () {
                var $menuItem = $(this);
                $menuItem.addClass('active');
                $menuItem.children('.sub-nav').fadeIn(200);
            },
            mouseleave: function () {
                var $menuItem = $(this);
                $menuItem.removeClass('active');
                $menuItem.children('.sub-nav').stop().fadeOut(200);
            }
        });
    }
    $('.mobile-nav-opener').on(clickEvent, function () {
        $(this).add($(this).parent()).toggleClass('open');
    });
}

// services module 
function servicesModule() {
    var $servicesModules = $('.services-modules');

    // attach helper classes for styling
    $servicesModules.find('.services-module:nth-child(3n-2)').addClass('first');
    $servicesModules.find('.services-module:nth-child(3n)').addClass('third');
    $servicesModules.find('.services-module:last').addClass('last');

    // click event 
    $servicesModules.find('.services-module').on('click', function (e) {
        if ($(this).parents('.services-modules').hasClass('grid')) { // only fire if in grid mode
            e.preventDefault();
            var $thisModule = $(this),
                $elemBefore = $thisModule.hasClass('third') ? $thisModule
                            : $thisModule.next().hasClass('third') ? $thisModule.next()
                            : $thisModule.next().next('.third'),
                arrowClass = $thisModule.hasClass('third') ? 'third' : $thisModule.hasClass('first') ? 'first' : 'second',
                content = '<div class="module-info to-open cf"><div class="content">' +
                            '<span class="arrow ' + arrowClass + '"></span>'
                            + $(this).find('.right').html() + '</div></div>',
                transitionSpeed = 0;

            if (!$elemBefore.length) {
                $elemBefore = $thisModule.parent().find('.last');
            }

            // remove insert-after class from all other elements except the one the new content is being placed next to
            $thisModule.parent().children('.services-module').not($elemBefore).removeClass('insert-after');

            if ((!isMobile) && ($thisModule.hasClass('clicked') || !$elemBefore.hasClass('insert-after'))) {
                $elemBefore.addClass('insert-after');
                transitionSpeed = 200; // change transitionspeed if not inserting into the same space, or if clicking the same item again
            }

            // if an info section currently exists, remove it
            if ($thisModule.parent().find('.module-info').length) {
                $thisModule.parent().find('.module-info').removeClass('to-open').slideUp(transitionSpeed, function () {
                    $(this).remove();
                });
            }
            if (!$thisModule.hasClass('clicked')) { // if clicking a different item...
                $thisModule.addClass('clicked').parent().children().not($thisModule).removeClass('clicked');

                $elemBefore.after(content);
                $elemBefore.next('.to-open').slideDown(transitionSpeed, function () {
                    $(this).find('.arrow').animate({ 'top': isIE7 ? '-36px' : '-20px' }, transitionSpeed / 2);
                });
            } else { // if clicking the same item, remove the clicked and insert-after classes to allow animations again
                $thisModule.removeClass('clicked');
                $thisModule.parent().children().removeClass('insert-after');
            }
        }
    });
    $servicesModules.find('span.toggle').click(function () { // toggle view
        $(this).toggleClass('grid list');
        $(this).parents('.services-modules').toggleClass('grid').find('.module-info').remove();
        $(this).parents('.services-modules').find('.services-module').removeClass('clicked insert-after');
    });
}

// history module 
function companyHistory() {
    var $holder = $('#history').find('.history-holder');
    $holder.children(':nth-child(2n)').addClass('even'); // add even class for right hand column styling

    // movement functions
    $('#history').children('.nav').on({
        mouseover: function () {
            if (!$(this).hasClass('disabled')) {
                var direction = $(this).data('direction'),
                    moveBy = {
                        'up': 5,
                        'down': -5
                    }[direction];
                moveLoop(moveBy, 5, direction); // movement loop
            }
        },
        mouseleave: function () {
            $holder.stop();
        }
    });

    function moveLoop(moveBy, duration, direction) {
        var $navs = $('#history').children('.nav');
        if (direction === 'up') { // if at the top, prevent scroll up and reset top margin to 0
            $navs.filter('.down').removeClass('disabled');
            if (($holder.css('margin-top').replace('px', '') * -1) <= 0) {
                if (($holder.css('margin-top').replace('px', '') * -1) < 0) {
                    $holder.css('margin-top', '0');
                }
                $navs.filter('.up').addClass('disabled');
                $holder.stop();
                return false;
            }
        } else if (direction === 'down') { // if at the bottom, prevent scroll down and set margin to show lower section
            $navs.filter('.up').removeClass('disabled');
            if (($holder.css('margin-top').replace('px', '') * -1) >= $holder.outerHeight() - $holder.parent().outerHeight()) {
                if (($holder.css('margin-top').replace('px', '') * -1) > $holder.outerHeight() - $holder.parent().outerHeight()) {
                    $holder.css('margin-top', ($holder.outerHeight() - $holder.parent().outerHeight()) * -1);
                }
                $navs.filter('.down').addClass('disabled');
                $holder.stop();
                return false;
            }
        }
        $holder.stop().animate({
            'margin-top': '+=' + moveBy
        }, duration, function () {
            moveLoop(moveBy, duration, direction); // calls itself again to continue the scroll
        });
    }

    // hover functions
    var $flipItem = $holder.find('.content'),
        initEvent = isMobile ? isMobWebkit ? 'touchend' : 'click' : 'mouseenter';

    if ((!isIE7) && (!chSitecore.pageEditor)) { // uses css based hover for IE7
        $flipItem.on(initEvent, function () {
            var string = 'second';
            if (isMobile && $(this).children('.desc').hasClass('clicked')) {
                string = 'first';
            }
            showItem($(this).children('.desc'), string);
        });
        if (!isMobile) {
            $flipItem.on('mouseleave', function () {
                showItem($(this).children('.desc'), 'first');
            });
        }
    }

    function showItem($item, classToShow) {
        if (isIE8 || isIE9) { // fade transitions for IE
            $item.children().stop().fadeTo(500, 0);
            $item.children('.' + classToShow + '').stop().fadeTo(500, 1);
        } else {
            $item.toggleClass('clicked'); // only add clicked class for browsers that support the flip transition
        }
        if ($item.children('.first').outerHeight() !== $item.children('.second').outerHeight()) {

            var $spans = $item.parents('article').find('.diamond, .insignia, .horizontal-line'),
                browser = isPhone ? 'mobile' : isIE8 || isIE9 ? 'ie' : 'default',
                heightCheck = {
                    'ie': $item.children('.second').outerHeight() !== $item.children('.first').outerHeight(), // important for the fade animation in ie
                    'phone': true, // important to ensure no overlap on mobile
                    'default': $item.children('.second').outerHeight() > $item.children('.first').outerHeight() // important for default flip animation
                }[browser],
                animDur = {
                    'ie': 500, // need to animate height when doing fade
                    'phone': 500,
                    'default': 0
                }[browser];
            if (!isPhone) {
                $spans.css('top', $item.children('.' + classToShow + '').siblings().outerHeight() / 2 + 'px'); // set span position initially
            }
            if (heightCheck) { // set height into place to ensure correct display if flip item is taller than the first
                $item.stop().animate({ 'height': $item.children('.' + classToShow + '').outerHeight() }, animDur);
            }
            if (!isPhone) {
                $spans.stop().animate({ 'top': $item.children('.' + classToShow + '').outerHeight() / 2 + 'px' }, 500, function () {
                    if (classToShow === 'first') {
                        $spans.css('top', '50%'); // reset span positions to maintain responsive layout
                    }
                });
            }
        }
    }

    // resize event included in window resize area
}

// client logos section
function clientLogos() {
    $('#clients').children('li').each(function () {
        if (!$(this).children().length) { // if li has no image inside, remove it
            $(this).remove();
        }
    });

    var $clientItems = $('#clients').children('li');
    $clientItems.eq(3).add($clientItems.eq(7)).addClass('last'); // set last in row helper classes
    $clientItems.eq(8).addClass('ninth'); // set ninth item helper class

    if ($clientItems.length <= 4) { // if 4 or less images shown, remove the cross separators
        $('#clients').parent().find('.cross').remove();
    } else if ($clientItems.length > 9) {
        var $list = $('#clients'),
            $hiddenList = $('#hiddenClients');

        // for items more than the ninth, append image to hidden area
        $list.children('li').each(function (e) {
            if (e > 8) {
                $hiddenList.append($(this).children('img').unwrap());
            }
        });

        $list = $('#clients');
        $hiddenList = $('#hiddenClients');

        //get number of hidden items
        var hiddenSize = $hiddenList.children().length,
            logoInterval = $('#logo-interval').val() || 5000;

        //switch client logos
        function switchClients() {
            var randomVisible = Math.floor(Math.random() * 8),
                randomHidden = Math.floor(Math.random() * hiddenSize),
                $thisLi = $list.find('li').eq(randomVisible);

            $thisLi.children('img').fadeOut('slow', function () {
                $hiddenList.append($(this));
                $thisLi.append($hiddenList.children('img').eq(randomHidden).hide());
                $thisLi.children('img').fadeIn('slow');
            });
        }

        setInterval(function () {
            switchClients();
        }, logoInterval);
    }
}

// footer button click functions
function footerButtons() {
    var clickEvent = isMobWebkit ? 'touchend' : 'click';
    $('#footer-buttons > li').on(clickEvent, function (e) {
        e.preventDefault();
        var $clickedLi = $(this),
            isActive = $clickedLi.hasClass('active'),
            $sections = $('#footer-sections'),
            $matchedSection = $sections.children().eq($clickedLi.index());

        // add and remove active classes
        $clickedLi.parent().children('li').removeClass('active');
        $sections.children().hide(); // hide all footer sections

        if (!isActive) {
            $clickedLi.addClass('active');
            $matchedSection.show();
        }
    });
    $('#footer-buttons > li:last-child, #footer-sections > article:last-child, #footer-sections > div:last-child').addClass('last-child'); // helper class
}

// google map
function googleMap() {

    var $mapControls = $('#map-controls'),
        $buttons = $mapControls.find('.buttons'),
        mapData = $.parseJSON($mapControls.find('#map-data').val()), // get map data from hidden field
        mapOptions = {
            center: new google.maps.LatLng(mapData[0].Latitude, mapData[0].Longitude),
            disableDefaultUI: false,
            zoom: 16,
            zoomControl: false,
            disableDoubleClickZoom: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable: true,
            overviewMapControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    // build buttons
    function buildControls() {
        for (var location in mapData) {
            var thisLocation = mapData[location];
            $buttons.append('<div class="button">' + thisLocation.Label + '</div>');
        }

        $mapControls.css({
            marginLeft: -($mapControls.width() / 2)
        });
    }

    // set active button state
    function buttonState($activeButton) {
        $buttons.children('div.button').removeClass('active');
        $activeButton.addClass('active');
    }

    // add map interactions to controls
    function bindControlEvents() {
        $buttons.children('div.button').on({
            click: function () {
                buttonState($(this));
                initMap(mapData[$(this).index()]);
            }
        });
    }

    // initialise map
    function initMap(locationData) {

        var mapElement = document.getElementById('google-map'),
            lat = locationData.Latitude || 51.5150539,
            lng = locationData.Longitude || -0.0783611,
            dImg = locationData.marker || '/img/site/codehouse-marker.png',
            map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
            icon: dImg,
            position: new google.maps.LatLng(lat, lng),
            map: map
        });

        map.setCenter(new google.maps.LatLng(lat, lng));
    }

    buildControls();
    bindControlEvents();

    // load map from load event
    google.maps.event.addDomListener(window, 'load', function () {
        initMap(mapData[0]);
        buttonState($buttons.children('div.button').first());
    });
}


// site lightbox
function siteLightbox($links) {
    var $lightbox = $('.site-lightbox'),
        $lightboxBg = $('.lightbox-bg'),
        $lightboxWrapper = $lightbox.find('.lightbox-wrapper');

    $links.on('click', function (e) {
        e.preventDefault();

        var $link = $(this),
            linkHref = $link.attr('href'),
            lightboxContent;

        if (isPhone) {
            window.location.href = linkHref;
            return false;
        }

        $lightbox.addClass("video-content");
        var videoId = $link.attr('href').indexOf('embed') > -1 ? $link.attr('href').split('embed/')[1] : $link.attr('href').split('v=')[1],
            ampersandExists = videoId.indexOf('&'),
            queryExists = videoId.indexOf('?'),
            parsedVidId = queryExists !== -1 ? videoId.substring(0, queryExists) : ampersandExists !== -1 ? videoId.substring(0, ampersandExists) : videoId;

        lightboxContent = '<div class="video"><iframe id="inner-video" src="//www.youtube.com/embed/' + parsedVidId + '?wmode=opaque&autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

        $lightboxWrapper.html(lightboxContent);
        $lightbox.fadeIn(400, function () {
            if (isMobWebkit) { // if on mobile webkit, prevent scrolling on body
                $(document).bind('touchmove', function (e) {
                    e.preventDefault();
                });
            }
        });
        $lightboxBg.show().fadeTo(400, 0.4);
    });

    $lightbox.find('.lightbox-close').add($lightboxBg).unbind('click').click(lightboxClose);
    function lightboxClose() {
        $lightbox.add($lightboxBg).stop().fadeOut('slow', function () {
            $lightboxWrapper.empty();
            $lightbox.removeClass("video-content, image-content, default-content");
        });
        if (isMobWebkit) { // reenable body scrolling on mobile webkit
            $(document).unbind('touchmove');
        }
    }
}


// amd load script
function loadScript(scriptSrc, callback, global) {
    var script = document.createElement('script'),
            path = global === true ? "" : "/assets/Shared/js/"; // global directory? 
    script.type = "text/javascript";
    script.src = path + scriptSrc;
    document.body.appendChild(script);
    if (script.addEventListener && !isIE10) {
        if (callback) {
            script.addEventListener('load', function (e) { callback(); }, false);
        }
    } else if (script.attachEvent) {
        if (callback) {
            script.attachEvent('onreadystatechange', function () {
                script.onload = script.onreadystatechange = null;
                handleIeBug(script, callback);
            });
        }
    }
    function handleIeBug(script, callback) {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
            callback();
        }
    }
}

/* Threshold Detection */
var inMobileLayout = false,
	inTabletLayout = false,
	inDesktopLayout = false,
	responsive = "desktop",
	windowWidth = 0;

function responsiveLayouts() {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var responsive = windowWidth <= 760 ? "mobile" // mobile threshold width
				   : windowWidth <= 1000 ? "tablet" // tablet threshold width
				   : "desktop";

    switch (responsive) {
        case "mobile":
            if (!inMobileLayout) {
                // services module
                if ($('.services-modules').length) {
                    $('.services-modules').removeClass('grid'); // switch to list view for mobile
                    if ($('.services-modules').find('.module-info').length) {
                        $('.services-modules').find('.module-info').hide(); // hide module info sections if one was open
                    }
                }

                // case study pages
                if ($('.case-study-section').length) {
                    $('.case-study-section').each(function () {
                        $(this).append($(this).find('.right'));
                    });
                }
                inMobileLayout = true, inTabletLayout = false, inDesktopLayout = false;
            }
            break;
        case "tablet":
            if (!inTabletLayout) {
                // services module
                if ($('.services-modules').length) {
                    if ($('.services-modules').find('.button.toggle').hasClass('grid')) { // if user was in grid mode in desktop, maintain that view
                        $('.services-modules').addClass('grid');
                    }
                    if ($('.services-modules').find('.module-info').length) {
                        $('.services-modules').find('.module-info').show(); // show module info section again if there was one
                    }
                }

                // case study pages
                if ($('.case-study-section').length) {
                    $('.case-study-section').each(function () {
                        $(this).prepend($(this).find('.right'));
                    });
                }
                inMobileLayout = false; inTabletLayout = true; inDesktopLayout = false;
            }
            break;
        default:
            if (!inDesktopLayout) {
                // services module
                if ($('.services-modules').length) {
                    if ($('.services-modules').find('.button.toggle').hasClass('grid')) { // if user was in grid mode in desktop, maintain that view
                        $('.services-modules').addClass('grid');
                    }
                    if ($('.services-modules').find('.module-info').length) {
                        $('.services-modules').find('.module-info').show(); // show module info section again if there was one
                    }
                }

                // case study pages
                if ($('.case-study-section').length) {
                    $('.case-study-section').each(function () {
                        $(this).prepend($(this).find('.right'));
                    });
                }
                inMobileLayout = false; inTabletLayout = false; inDesktopLayout = true;
            }
            break;
    }
}

// responsive iframes plugin
$.fn.responsiveVideos = function () {
    return this.each(function () {
        var $video = $(this),
            itemWidth = !isNaN(parseInt($video.attr('width'), 10)) ? parseInt($video.attr('width'), 10) : $video.width(),
            itemHeight = (this.tagName.toLowerCase() === 'object' || ($video.attr('height') && !isNaN(parseInt($video.attr('height'), 10)))) ? parseInt($video.attr('height'), 10) : $video.height(),
            aspectRatio = (itemHeight / itemWidth) * 100;
        $video.wrap("<div class='responsive-video-wrapper' style='padding-bottom:" + aspectRatio + "%;' ></div>")
            .removeAttr('height').removeAttr('width');
    });
};