(function (window, document, mixpanel) {
    (function(location) {
        if (location.href.indexOf('keithdaulton.com') === -1) {
            return;
        }
        mixpanel.register_once({
            "init visit": (new Date()).toDateString()
        });
        mixpanel.track("site loaded", {
            "site version": "3.1.0"
        });

        mixpanel.track_links(".section--portfolio a", "port link click", {
            "referrer": document.referrer
        });
        mixpanel.track_links(".section--contact a", "contact link click", {
            "referrer": document.referrer
        });
    })(window.location);

    const $headerEl = document.querySelector('[data-site-region="header"]');
    const $intro = document.querySelector('[data-site-region="hero"]');
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            $headerEl.classList.toggle('page-header--pinned', !entry.isIntersecting);
        });
    });
    intersectionObserver.observe($intro);
})(window, document, window.mixpanel);
