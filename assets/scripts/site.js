(function(window, document, $, _, mixpanel) {

    (function(con) {
        if (con === undefined) {
            con = {};
            con.assert = con.clear = con.count = con.debug = con.dir = con.dirxml = con.error = con.exception =
                con.group = con.groupCollapsed = con.groupEnd = con.info = con.log = con.markTimeline = con.profile =
                    con.profileEnd = con.table = con.time = con.timeEnd = con.timeStamp = con.trace = con.warn = function() { };
        }
    })(window.console);

    (function(location) {
        if (location.href.indexOf('keithdaulton.com') === -1) {
            return;
        }
        mixpanel.register_once({
            "init visit": (new Date()).toDateString()
        });
        mixpanel.track("site loaded", {
            "site version": "3.0.0"
        });

        mixpanel.track_links(".section--portfolio a", "port link click", {
            "referrer": document.referrer
        });
        mixpanel.track_links(".section--contact a", "contact link click", {
            "referrer": document.referrer
        });
    })(window.location);

    var Constants = {
        classes: {
            headerPinned: 'page-header--pinned'
        },
        selectors: {
            header: '[data-site-region="header"]',
            about: '[data-site-region="about"]'
        },
        header: {
            pinnedHeight: 75
        }
    };

    var $windowEl = $(window);
    var $documentEl = $(document);
    var $bodyEl = $('body');
    var $headerEl = $(Constants.selectors.header);
    var $aboutEl = $(Constants.selectors.about);
    var aboutEl = $aboutEl[0];

    var togglePinnedHeader = function() {
        var boundingRect = aboutEl.getBoundingClientRect();
        var shouldToggle = (boundingRect.top < Math.round(Constants.header.pinnedHeight / 2));
        $headerEl.toggleClass(Constants.classes.headerPinned, shouldToggle);
    };

    $windowEl.on('scroll', _.throttle(function() {
        //console.count("scroll");
        togglePinnedHeader();
    }, 200));
    togglePinnedHeader();


    var $navEl = $('[data-site-region="nav"]');
    var scrollToSection = function(region) {
        if (!region) {
            return;
        }

        if (region.indexOf('#') > -1) {
            region = region.substring(region.lastIndexOf('#') + 1,region.length);
        }

        var $targetEl = $('#' + region);
        if (!$targetEl.length) {
            return;
        }

        var targetEl = $targetEl[0];
        if (window.location.hash === '#' + region && targetEl.getBoundingClientRect().top === 0) {
            return;
        }

        $bodyEl.stop().animate({'scrollTop': $targetEl.offset().top },'slow', 'linear',function () {
            window.location.hash = region;
        });

    };
    $navEl.on('click', 'a', function(e) {
        e.preventDefault();
        scrollToSection(this.href);
    });

    $windowEl.load(function() {
        //scrollToSection(window.location.hash);
    });


})(window, document, window.jQuery, window._, window.mixpanel);