var cookies = new Array();
var hasAcknowledged = false;
var acceptedCookieName = 'allowCookies';
var disabledCookieName = 'disableCookies';

$(document).ready(function () {
    getCookieInfo();
    //show if not acknowledged
    if (!hasAcknowledged) {
        showBar();
    }

    // Setup More info Click
    $('#showcookiesinfo').click(function () {
        $('#cookiesinfo').slideToggle('slow');
        return false;
    });

    //prevent links
    if (!hasAcknowledged) {
        var links = $('a'); //get all anchors
        for (var i = 0; i < links.length; i++) { //for each anchor (link) on the page
            if (links[i].id != "showcookiesinfo") {
                links[i].onclick = function (e) {
                    if (!hasAcknowledged) {
                        //e.preventDefault(); //prevent initially, 
                    }
                    AcceptCookiesAndHideBar();
                };
            }
        };
    }

    //        $(".ckchk-acceptCookies").click(function () {
    //            // they accept cookies, set the cookie and hide the bar
    //            writeAcceptCookie();
    //            hideBar();
    //
    //            reloadPage();
    //            return false;
    //        });
    //        $(".ckchk-disableCookies").click(function () {
    //            deleteAllCookies();
    //            writeDisableCookie();
    //            hideBar();
    //            reloadPage();
    //            return false;
    //        });
});


function AcceptCookiesAndHideBar() {
    writeAcceptCookie();
    hideBar(); //hide (and trigger a page reload)
    return false;
}

function reloadPage() {
    // this forces a reload of the page to ensure we don't load a cached copy
    currentURL = window.location;
    window.location.href = currentURL;
}

function writeAcceptCookie() {
    var currentDate = new Date();
    currentDate.setYear(currentDate.getFullYear() + 1);
    document.cookie = acceptedCookieName + '=yes;path=/;expires=' + currentDate.toUTCString();
}

function writeDisableCookie() {
    document.cookie = disabledCookieName + '=yes;path=/';
}

function deleteAllCookies() {
    getCookieInfo();
    $(cookies).each(function (idx, cookie) {
        clearCookie(cookie.name);
    });
}

// this will remove all the analytics cookies
// the sitecore cookies won't be deleted as they have the httpOnly flag set
function clearCookie(name) {
    var domains = new Array();
    var actualDomain = document.domain;
    domains[0] = "." + actualDomain;
    // count the number of "."'s in the domain, we will remove cookies for all domains up to two "."'s
    var lastDotIndex = actualDomain.lastIndexOf(".");
    if (lastDotIndex > 0) {
        var previousToLastDotIndex = actualDomain.substr(0, lastDotIndex - 1).lastIndexOf(".");
        if (previousToLastDotIndex > 0) {
            // there are two or more "."'s
            domains[1] = actualDomain.substr(previousToLastDotIndex);
        }
    }
    var path = "/";
    var expiryDate = new Date(0).toUTCString();
    $(domains).each(function (idx, domain) {
        var cookieRemoveString = name + "=;expires=" + expiryDate + ";domain=" + domain + ";path=" + path;
        document.cookie = cookieRemoveString;
    });
};

function showBar() {
    // load the bar as and place right under the body tag
   
}

function hideBar() {
    $('#cookiesinfo').slideUp('slow');
    $('#cookiesBar').slideUp('slow', function () {
        //reload after animation
        reloadPage();
    });
}

//Retrieve cookie information from the site
function getCookieInfo() {
    //if no cookie
    if (!document.cookie) {
        return;
    }

    cookies = new Array(); //cookie data to aarray
    $(document.cookie.split(/; */)).each(function () {
        var splitCookie = this.split('=');
        var ck = new Cookie(splitCookie[0], splitCookie[1]);
        if (ck.name == acceptedCookieName) {
            hasAcknowledged = true;
        }
        else if (ck.name == disabledCookieName) {
            hasAcknowledged = true;
        }
        cookies.push(ck);
    });
}

function Cookie(name, value) {
    this.name = name;
    this.value = value;
}