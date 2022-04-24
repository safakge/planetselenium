window.radioplayer || (window.radioplayer = radioplayer), window.console || (window.console = {
    log: function() {},
    dir: function() {}
});
var radioplayer = {
    config_opts: {
        prod_api: {
            stationList: "//static.radioplayer.co.uk/v1/json/StationList",
            init: "//cookie.radioplayer.co.uk/cm/",
            search: "//search.radioplayer.co.uk/qp/v3/search",
            suggest: "//search.radioplayer.co.uk/qp/v3/suggest",
            onAir: "//search.radioplayer.co.uk/qp/v3/onair",
            pollOnAir: "//np.radioplayer.co.uk/qp/v3/onair",
            nowNext: "//np.radioplayer.co.uk/qp/v3/events",
            onDemand: "//search.radioplayer.co.uk/qp/v3/oditem",
            recommend: "//search.radioplayer.co.uk/qp/v3/recommend",
            az: "//search.radioplayer.co.uk/qp/v3/stations"
        },
        dev_api: {
            stationList: "/v1/json/StationList",
            init: "/cm/",
            search: "/qp/v3/search",
            suggest: "/qp/v3/suggest",
            onAir: "/qp/v3/onair",
            pollOnAir: "/qp/v3/onair",
            nowNext: "/qp/v3/events",
            onDemand: "/qp/v3/oditem",
            recommend: "/qp/v3/recommend",
            az: "/qp/v3/stations"
        }
    },
    consts: {
        consolelog: !0,
        is_responsive: !1,
        block_now_next: !1,
        is_iOS: !1,
        is_Android: !1,
        reduced_func: !1,
        assetBaseUrl: "",
        force_reduced_func: !1,
        show_cookie_anno: !0,
        show_cookie_demo: !1,
        use_global_cookie_settings: !0,
        cookie_anno_ttl: 31536e4,
        api: {},
        iframe: {
            analytics: "//static.radioplayer.co.uk/v3/analytics.html"
        }
    },
    services: {},
    emp: {},
    controls: {},
    playing: {},
    overlay: {},
    mystations: {},
    history: {},
    search: {},
    lang: {},
    utils: {},
    adswizz: {},
    vast: {},
    settings: {
        lastplayed: currentStationID,
        presets: [],
        history: [],
        stationlistprefix: "",
        guid: ""
    },
    stnList: {},
    querystring: {},
    initFailTimeout: null,
    startAtSeconds: 0,
    themeColour: "dark",
    mouseActive: !1,
    objs: {
        body: null,
        searchBox: null,
        searchInput: null,
        overlayContainer: null,
        stickyLetterDivide: null,
        suggestContainer: null,
        searchContainer: null,
        searchKeywords: null,
        searchResults: null,
        searchAllContainer: null,
        searchLiveContainer: null,
        searchODContainer: null,
        nowPlayingStrip: null,
        scrollingContainer: null,
        scrollingText: null
    }
};
radioplayer.initPlayback = function() {
    radioplayer.initFailTimeout = setTimeout(function() {
        radioplayer.services.alerts.init(), vastAds.enabled || (window.audioArray && window.audioArray.length && radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady())
    }, 5e3);
    var a = "?callback=radioplayer.services.receiveInit";
    radioplayer.querystring.stationlistprefix && (a += "&stationlistprefix=" + radioplayer.querystring.stationlistprefix.toLowerCase()), radioplayer.consts.force_reduced_func ? radioplayer.services.getAPI(radioplayer.consts.api.init + "init/" + currentStationID + a) : radioplayer.services.saveCookie("primed/s", "primed", "true", function() {
        radioplayer.services.getAPI(radioplayer.consts.api.init + "init/" + currentStationID + a)
    })
}, radioplayer.init = function() {
    document.documentElement.setAttribute("data-useragent", navigator.userAgent), radioplayer.querystring = radioplayer.utils.getQueryStringObj(), radioplayer.consts.is_responsive = isResponsive || !1, radioplayer.consts.use_global_cookie_settings = useGlobalCookieSettings || !1, radioplayer.consts.assetBaseUrl = assetBaseUrl || radioplayer.consts.assetBaseUrl, radioplayer.consts.flashToUseAssetBaseUrl = flashToUseAssetBaseUrl || !1, radioplayer.querystring.devapi ? (radioplayer.config_opts.dev_api.stationList = "//" + radioplayer.querystring.devapi + "/v1/json/StationList", radioplayer.config_opts.dev_api.init = "//" + radioplayer.querystring.devapi + "/cm/", radioplayer.config_opts.dev_api.search = "//" + radioplayer.querystring.devapi + "/qp/v3/search", radioplayer.config_opts.dev_api.suggest = "//" + radioplayer.querystring.devapi + "/qp/v3/suggest", radioplayer.config_opts.dev_api.onAir = "//" + radioplayer.querystring.devapi + "/qp/v3/onair", radioplayer.config_opts.dev_api.pollOnAir = "//" + radioplayer.querystring.devapi + "/qp/v3/onair", radioplayer.config_opts.dev_api.nowNext = "//" + radioplayer.querystring.devapi + "/qp/v3/events", radioplayer.config_opts.dev_api.onDemand = "//" + radioplayer.querystring.devapi + "/qp/v3/oditem", radioplayer.config_opts.dev_api.recommend = "//" + radioplayer.querystring.devapi + "/qp/v3/recommend", radioplayer.config_opts.dev_api.az = "//" + radioplayer.querystring.devapi + "/qp/v3/stations", radioplayer.consts.api = radioplayer.config_opts.dev_api) : radioplayer.consts.api = radioplayer.config_opts.prod_api, radioplayer.consts.is_responsive && $("body").addClass("responsive-on"), radioplayer.consts.is_iOS = /(iPad|iPhone|iPod)/.test(navigator.userAgent), radioplayer.consts.is_Android = /(Android)/.test(navigator.userAgent), radioplayer.consts.is_Android && $("body").addClass("isAndroid"), -1 != navigator.userAgent.indexOf("Safari") && -1 == navigator.userAgent.indexOf("Chrome") && $("body").addClass("isSafari"), window.force_reduced_func && (radioplayer.consts.force_reduced_func = !0), radioplayer.consts.force_reduced_func && (radioplayer.consts.reduced_func = !0), radioplayer.consts.reduced_func && (radioplayer.consts.reduced_func = !0, $("#toggle-mystations").remove(), $(".menu-container .tabs ul li").eq(0).hide().removeClass("first"), $(".menu-container .tabs ul li").eq(1).hide(), $(".menu-container .tabs ul li").eq(2).css("width", "50%").addClass("first"), $(".menu-container .tabs ul li").eq(3).css("width", "50%")), $(".radioplayer-globalnav .rp-logo-container .accessibility-text").html(radioplayer.lang.general.radioplayer), $(".radioplayer-globalnav .menu-btn").attr("title", radioplayer.lang.general.open_menu).find(".menu-btn-accessible").html(radioplayer.lang.general.open_menu), radioplayer.querystring.debug ? (radioplayer.consts.consolelog = !0, "true" === radioplayer.querystring.debug.replace("/", "") && (radioplayer.adswizz.DEBUG = !0), "true" === radioplayer.querystring.debug.replace("/", "") && (radioplayer.emp.DEBUG = !0)) : window.console = {
        log: function() {},
        dir: function() {}
    };
    var a = {
        version: "3.1.2"
    };
    if (console.log("Version: " + a.version), $(".radioplayer").hasClass("light-theme") && (radioplayer.consts.themeColour = "light"), radioplayer.objs.body = $("body"), radioplayer.querystring.rpAodUrl && (audioLive = !1, audioArray = [{
            audioType: "http",
            audioUrl: radioplayer.querystring.rpAodUrl
        }], nowPlayingSource = "OD"), radioplayer.querystring["force-onboarding"] && (radioplayer.consts.show_cookie_demo = radioplayer.querystring["force-onboarding"].replace("/", "")), radioplayer.querystring.t && !audioLive && (radioplayer.startAtSeconds = radioplayer.utils.convertTimeToSeconds(radioplayer.querystring.t), radioplayer.utils.output("start at " + radioplayer.startAtSeconds + " seconds into OD audio"), $(radioplayer.emp).on("loaded", function() {
            radioplayer.startAtSeconds > 0 && radioplayer.startAtSeconds <= radioplayer.controls.rawDuration / 1e3 && (radioplayer.emp.seek(radioplayer.startAtSeconds), radioplayer.startAtSeconds = 0)
        })), vastAds.enabled && radioplayer.vast.init(), adsWizz.enabled && radioplayer.adswizz.init(), radioplayer.controls.init(), radioplayer.mystations.init(), audioLive ? radioplayer.playing.init() : radioplayer.services.getAPI(radioplayer.consts.api.onDemand + "?odUrl=" + document.location.href + "&nameSize=200&descriptionSize=200&callback=radioplayer.playing.receiveOD"), radioplayer.overlay.init(), radioplayer.search.init(), radioplayer.services.analytics.init(), !radioplayer.consts.is_responsive) {
        var b = function() {
            var a = radioplayer.utils.getViewportWidth();
            if (a < 360 && a >= 320) {
                var b = a / 360;
                $(".radioplayer-plugin").css("transform", "scale(" + b + ")")
            } else a >= 360 && $(".radioplayer-plugin").css("transform", "scale(1)")
        };
        radioplayer.utils && b()
    }
    if ($(window).on("resize", function() {
            if (radioplayer.consts.is_responsive || b(), $("html").hasClass("ie8")) {
                var a = radioplayer.utils.getViewportWidth();
                a < 340 ? ($(".stn-logo").addClass("stn-logo-ie8-xs"), $(".stn-logo").removeClass("stn-logo-ie8")) : a < 390 ? ($(".stn-logo").addClass("stn-logo-ie8"), $(".stn-logo").removeClass("stn-logo-ie8-xs")) : ($(".stn-logo").removeClass("stn-logo-ie8"), $(".stn-logo").removeClass("stn-logo-ie8-xs"))
            }
            radioplayer.overlay.resizeMenuTabs()
        }), $("html").hasClass("ie8") && $(".stn-logo").css("background-image") && $(".stn-logo").css("background-image").indexOf("url(") > -1) {
        var c = $(".stn-logo").css("background-image").split("url(")[1].split(")")[0],
            c = c.replace(/"/g, "");
        $(".stn-logo").html("<img src='" + c + "' />"), $(".stn-logo").css("background-image", "none")
    }
    if ($("html").hasClass("ie8")) {
        var d = radioplayer.utils.getViewportWidth();
        d < 340 ? $(".stn-logo").addClass("stn-logo-ie8-xs") : d < 390 && $(".stn-logo").addClass("stn-logo-ie8")
    }
    $(document).on("mousedown", function() {
        radioplayer.mouseActive || (radioplayer.mouseActive = !0, radioplayer.objs.body.addClass("rp-mouseactivity"))
    }).on("keydown", function() {
        radioplayer.mouseActive && (radioplayer.mouseActive = !1, radioplayer.objs.body.removeClass("rp-mouseactivity"))
    }), $(".radioplayer-plugin").on("click", "a[data-newstationid]", function() {
        var a = $(this).attr("data-newstationid"),
            b = $(this).attr("href");
        radioplayer.overlay.sidewaysNavigate("Plugin Space", a, b)
    }), radioplayer.initPlayback();
    var e = ".jgz";
    $.browser.msie && 6 == $.browser.version && (e = ".js"), radioplayer.services.getAPI(radioplayer.consts.api.stationList + e), $("html").addClass("rp-js")
}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a, b) {
    for (var c = b || 0, d = this.length; c < d; c++)
        if (this[c] === a) return c;
    return -1
}), radioplayer.utils = {
    output: function(a) {
        radioplayer.consts.consolelog && console.log(a)
    },
    setSelectionRange: function(a, b, c) {
        if (a.setSelectionRange) a.focus(), a.setSelectionRange(b, c);
        else if (a.createTextRange) {
            var d = a.createTextRange();
            d.collapse(!0), d.moveEnd("character", c), d.moveStart("character", b), d.select()
        }
    },
    setCaretToPos: function(a, b) {
        radioplayer.utils.setSelectionRange(a, b, b)
    },
    getQueryStringObj: function() {
        return this.getQueryStringObjFromUrl(String(location.search))
    },
    getQueryStringObjFromUrl: function(a) {
        for (var b = a.replace("?", "").split("&"), c = {}, d = 0; d < b.length; d++) {
            var e = b[d].split("=")[0],
                f = b[d].split("=")[1];
            c[e] = f
        }
        return c
    },
    getLocalCookie: function(a) {
        var b = "";
        return navigator.cookieEnabled && (b = document.cookie.match(a + "=([^;]*)"), b = b && unescape(b[1]) || ""), b
    },
    setLocalCookie: function(a, b, c, d, e, f) {
        var g = "";
        navigator.cookieEnabled && (g = a + "=" + b, void 0 !== c && null !== c && "" !== c && (g += "; expires=" + c), void 0 !== d && null !== d && "" !== d && (g += "; path=" + d), void 0 !== e && null !== e && "" !== e && (g += "; domain=" + e), f && (g += "; secure"), document.cookie = g)
    },
    convertTimeToSeconds: function(a) {
        var b, c, d = "g",
            e = "[0-9]+[HMShms]{1}",
            f = new RegExp(e, d),
            g = a.match(f),
            h = 0;
        if ($.isArray(g))
            for (var i = 0; i < g.length; i++) b = g[i].charAt(g[i].length - 1), c = g[i].substr(0, g[i].length - 1), "h" == b ? h += parseInt(60 * c * 60) : "m" == b ? h += parseInt(60 * c) : "s" == b && (h += parseInt(c));
        return h
    },
    windowWidth: function() {
        return void 0 !== window.outerWidth ? window.outerWidth : 396
    },
    windowHeight: function() {
        return void 0 !== window.outerHeight ? window.outerHeight : 730
    },
    getViewportWidth: function() {
        var a = window,
            b = "inner";
        return "innerWidth" in window || (b = "client", a = document.documentElement || document.body), a[b + "Width"]
    },
    resizeViewPort: function(a, b) {
        var c = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            d = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        window.resizeBy(a - c, b - d)
    }
}, radioplayer.exceptions = {
    decorateStreamURLException: function() {
        return {
            name: "decorateStreamURLException",
            message: "Could not decorate stream URL."
        }
    }
}, radioplayer.services = {
    unmuteAfterOverlay: !1,
    heartbeatCounter: 0,
    heartbeatTimeout: null,
    annoInterval: null,
    annoTimeout: null,
    annoShowing: !1,
    queuedAnnos: [],
    cookieTimeout: null,
    cookieShownInSession: !1,
    cookieInterval: null,
    saveCookie: function(a, b, c, d) {
        if (!radioplayer.consts.reduced_func) {
            var e = radioplayer.consts.api.init + a;
            e += "?" + b + "=" + c, radioplayer.services.getAPI(e, d)
        }
    },
    receiveInit: function(a) {
        if (clearTimeout(radioplayer.initFailTimeout), a.dead) return radioplayer.services.analytics.sendEvent("Errors", "Static Station", currentStationID, null, null), setTimeout(function() {
            window.location.href = a.dead.url
        }, 100), !1;
        if (a.redirect) return window.location.href = a.redirect.url, !1;
        if (a.primed || (radioplayer.consts.reduced_func = !0, $("#toggle-mystations").remove(), $(".menu-container .tabs ul li").eq(0).hide().removeClass("first"), $(".menu-container .tabs ul li").eq(1).hide(), $(".menu-container .tabs ul li").eq(2).css("width", "50%").addClass("first"), $(".menu-container .tabs ul li").eq(3).css("width", "50%")), !radioplayer.consts.reduced_func) {
            var b = a.interstitial && a.interstitial.seen;
            if (!b && (window.initOptions && window.initOptions.interstitial && window.initOptions.interstitial.enabled && (a.interstitial = initOptions.interstitial), !b && a.interstitial && a.interstitial.url && "" != a.interstitial.url)) return radioplayer.services.saveCookie("interstitial/s", "interstitial", "true"), setTimeout(function() {
                var b = document.location.href,
                    c = a.interstitial.url;
                c += (c.indexOf("?") > 0 ? "&" : "?") + "playerUrl=" + encodeURIComponent(b), window.location.href = c
            }, 200), !1
        }
        if (a.volume && "" != a.volume && (radioplayer.controls.currentVolume = a.volume), a.seencookieanno && radioplayer.consts.use_global_cookie_settings && (radioplayer.services.alerts.cookies.shown = !0), !radioplayer.consts.reduced_func) {
            var c = !1;
            if (a.presets)
                for (var d = 0; d < a.presets.length; d++) {
                    var e = a.presets[d].split(":");
                    radioplayer.settings.presets.push(e[1]), e[1] + "" == currentStationID + "" && (c = !0)
                }
            c ? ($("#toggle-mystations").children(".icon-heart").addClass("no-animation"), $("#toggle-mystations").addClass("in-mystations").attr("title", radioplayer.lang.mystations.remove_this).find(".accessibility-text").html(radioplayer.lang.mystations.remove_this)) : $("#toggle-mystations").attr("title", radioplayer.lang.mystations.add_this).find(".accessibility-text").html(radioplayer.lang.mystations.add_this)
        }
        if ($(radioplayer.services).trigger("gotPresets"), a.lastplayed && "" != a.lastplayed && (radioplayer.settings.lastplayed = a.lastplayed), a.history && (radioplayer.settings.history = a.history), $(radioplayer.services).trigger("gotMyStationsAndHistory"), a.stationlistprefix && (radioplayer.settings.stationlistprefix = a.stationlistprefix), a.guid && (radioplayer.settings.guid = a.guid), window.initOptions && window.initOptions.songaction && window.initOptions.songaction.enabled && (a.songaction = initOptions.songaction), a.songaction && (radioplayer.playing.songAction = a.songaction, $(radioplayer.services).trigger("gotSongAction")), a.scripts && $.each(a.scripts, function(a, b) {
                radioplayer.services.getAPI(b)
            }), window.audioLive && a.overridestream && ("rtmp" == a.overridestream.type ? window.audioArray = [{
                audioType: a.overridestream.type,
                audioServer: a.overridestream.server,
                audioEndpoint: a.overridestream.endpoint
            }] : window.audioArray = [{
                audioType: a.overridestream.type,
                audioUrl: a.overridestream.url
            }], window.bufferTime = a.overridestream.buffer), window.audioLive && a.html5stream && !a.overridestream) {
            var f = "";
            f = void 0 !== a.html5stream.type ? a.html5stream.type : "http", radioplayer.emp.player.html.audioHTMLFallback = [{
                audioType: f,
                audioUrl: a.html5stream.url
            }]
        }
        void 0 === window.audioArray && (window.audioArray = []), vastAds.enabled || (radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady()), window.initOptions && window.initOptions.overlay && window.initOptions.overlay.enabled && (a.overlay = initOptions.overlay), a.overlay && radioplayer.services.overlay.queue(a.overlay.url, a.overlay.mute), a.announcement ? radioplayer.services.alerts.anno.queue(a.announcement.text) : radioplayer.consts.reduced_func && radioplayer.services.alerts.anno.queue(radioplayer.lang.general.reduced_func_anno), radioplayer.services.alerts.init()
    },
    alerts: {
        showing: !1,
        interval: null,
        init: function() {
            var a = !1;
            if (adsWizz.enabled && (radioplayer.controls.streamHasStarted && !$(".radioplayer").hasClass("has-promo-overlay") || (a = !0)), a || vastAds.enabled && !vastAds.shownVideo || $("body").hasClass("showing-overlay")) clearInterval(radioplayer.services.alerts.interval), radioplayer.services.alerts.interval = setInterval(function() {
                clearInterval(radioplayer.services.alerts.interval), radioplayer.services.alerts.init()
            }, 1500);
            else if (clearInterval(radioplayer.services.alerts.interval), radioplayer.services.alerts.anno.pending.length > 0) {
                var b = radioplayer.services.alerts.anno.pending.shift();
                radioplayer.services.alerts.anno.show(b)
            } else radioplayer.services.alerts.cookies.shown || ($(".radioplayer-anno").length && $(".radioplayer-anno").remove(), radioplayer.services.alerts.cookies.show())
        },
        cookies: {
            showing: !1,
            shown: !1,
            show: function() {
                if (radioplayer.consts.reduced_func) return !1;
                if (radioplayer.consts.show_cookie_anno && !radioplayer.services.alerts.cookies.shown && -1 == document.cookie.indexOf("rp-seen-cookie-anno") && -1 == document.cookie.indexOf("seencookieanno") || radioplayer.consts.show_cookie_demo) {
                    if (radioplayer.services.alerts.cookies.shown) return !1;
                    document.cookie = "rp-seen-cookie-anno=yes;expires=" + new Date((new Date).getTime() + radioplayer.consts.cookie_anno_ttl).toGMTString(), radioplayer.services.saveCookie("seencookieanno/s", "seencookieanno", "true"), radioplayer.services.alerts.cookies.showing = !0, radioplayer.services.alerts.cookies.shown = !0, $(".cookie-demo-message").html(radioplayer.lang.general.cookie_message), $(".cookie-heart-text").html(radioplayer.lang.general.cookie_favourites_message), $(".cookie-menu-text").html(radioplayer.lang.general.cookie_menu_message), $(".cookie-demo").addClass("cookie-demo-on"), $(".cookie-close-js").on("click", function() {
                        $(".cookie-demo").addClass("cookie-demo--no-animation"), radioplayer.services.cookieTimeout && clearTimeout(radioplayer.services.cookieTimeout), radioplayer.services.alerts.cookies.showing = !1, $(".cookie-demo").removeClass("cookie-demo-on")
                    }), radioplayer.services.cookieTimeout = setTimeout(function() {
                        radioplayer.services.alerts.cookies.showing = !1, $(".cookie-demo").removeClass("cookie-demo-on"), clearTimeout(radioplayer.services.cookieTimeout)
                    }, 1e4)
                }
            }
        },
        anno: {
            showing: !1,
            pending: [],
            queue: function(a) {
                radioplayer.services.alerts.anno.pending.push(a)
            },
            show: function(a, b) {
                radioplayer.services.alerts.showing = "anno", $(".radioplayer-anno").length ? ($(".radioplayer-anno .anno-text").html(a), $(".radioplayer-anno").animate({
                    top: "0px"
                }, 600)) : ($(".radioplayer").append('<div class="radioplayer-anno"><div class="text-container"><p class="anno-text">' + a + '</p></div><div class="logo-container"><i class="rp-logo"></i></div><div class="close-anno-tab"><a href="#" class="hide-anno">Hide this message</a></div></div>'), $(".radioplayer-anno").on("click", "a.hide-anno", radioplayer.services.alerts.anno.hide)), b || (radioplayer.services.annoTimeout = setTimeout(function() {
                    radioplayer.services.alerts.anno.hide()
                }, 15e3))
            },
            hide: function() {
                radioplayer.services.alerts.showing = !1, clearTimeout(radioplayer.services.annoTimeout), radioplayer.services.saveCookie("announcement/s", "announcement", "true"), $(".radioplayer-anno").animate({
                    top: "-900px"
                }, 600, function() {
                    radioplayer.services.alerts.init()
                })
            }
        }
    },
    overlay: {
        showing: !1,
        initTimeout: null,
        pending: [],
        volumeControl: {
            onOpen: function(a) {
                radioplayer.services.unmuteAfterOverlay = a, a && (radioplayer.controls.volumeLocked = !0, radioplayer.consts.is_iOS ? (radioplayer.controls.isPlaying && radioplayer.emp.stop(), radioplayer.controls.showPressPlayPrompt()) : (radioplayer.controls.savedVolume = radioplayer.controls.currentVolume, radioplayer.emp.ready ? radioplayer.emp.setVolume(0) : (radioplayer.controls.currentVolume = 0, radioplayer.controls.onVolumeUpdate("", {
                    volume: 0
                }))))
            },
            onClose: function() {
                radioplayer.services.unmuteAfterOverlay && (radioplayer.controls.volumeLocked = !1, radioplayer.consts.is_iOS ? radioplayer.emp.resume() : (radioplayer.controls.currentVolume = radioplayer.controls.savedVolume, radioplayer.emp.setVolume(Math.round(radioplayer.controls.savedVolume))))
            }
        },
        queue: function(a, b) {
            var c = !1;
            adsWizz.enabled && (radioplayer.controls.streamHasStarted && !$(".radioplayer").hasClass("has-promo-overlay") || (c = !0)), c || vastAds.enabled && !vastAds.shownVideo || radioplayer.services.overlay.showing ? (radioplayer.services.overlay.pending.length || radioplayer.services.overlay.pending.push({
                type: "init",
                params: {
                    url: a,
                    mute: b || !1
                }
            }), clearInterval(radioplayer.services.overlay.interval), radioplayer.services.overlay.interval = setInterval(function() {
                clearInterval(radioplayer.services.overlay.interval), radioplayer.services.overlay.queue(a, b)
            }, 4e3)) : (clearInterval(radioplayer.services.overlay.interval), radioplayer.services.overlay.showInit(a, b))
        },
        showInit: function(a, b) {
            radioplayer.services.overlay.showing = "fromInit";
            var c = (xDomainProxyUrl, '<div class="radioplayer-prerolloverlay radioplayer-prerolloverlay-contained"><iframe class="iframe-preroll" src="' + a + '" scrolling="no" seamless="seamless"></iframe><div class="radioplayer-preroll-close-frominit"><a href="#"><span class="close">&times;</span><span class="close-text">Close</span></a></div></div>');
            $(".radioplayer-body").append(c), radioplayer.services.overlay.volumeControl.onOpen(b), radioplayer.overlay.initTimeout = setTimeout(function() {
                radioplayer.services.overlay.hide()
            }, 6e4), $(".radioplayer-preroll-close-frominit").on("click", function(a) {
                a.preventDefault(), radioplayer.services.overlay.hide()
            })
        },
        adswizz: function(a, b) {
            "adswizz" === radioplayer.services.overlay.showing && radioplayer.services.overlay.hide(), radioplayer.services.overlay.showing = "adswizz", $(".radioplayer").addClass("has-promo-overlay"), $(".radioplayer").addClass("adswizz-companion-showing"), $(".radioplayer-body").append('<div class="radioplayer-prerolloverlay"></div>'), $(".radioplayer").append('<div class="radioplayer-preroll-iframe-container"><iframe class="radioplayer-preroll-iframe" src="' + a + '" scrolling="no" seamless="seamless"></iframe></div><div class="radioplayer-preroll-close"><a href="#"><span class="close">&times;</span><span class="close-text">Close advert</span></a></div>'), $(".radioplayer-localwrapper").append('<div class="adswizz-control-blocker"></div>');
            var c = $(".radioplayer-localwrapper").css("background");
            $(".radioplayer-prerolloverlay").css("background", c), radioplayer.adswizz.overlayTimeout = setTimeout(function() {
                radioplayer.services.overlay.hide(), radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] Hiding companion ad in overlay.")
            }, b + 1e3), radioplayer.services.overlay.volumeControl.onOpen(!1), $(".radioplayer-preroll-close").on("click", function(a) {
                a.preventDefault(), radioplayer.services.overlay.hide()
            }), $(".adswizz-control-blocker").on("click", function(a) {
                a.preventDefault(), radioplayer.services.overlay.hide()
            })
        },
        vast: function(a) {
            radioplayer.services.overlay.showing = "vast";
            $(".radioplayer").addClass("has-promo-overlay"), $(".radioplayer-localwrapper").append('<div class="adswizz-control-blocker"></div>'), $(".radioplayer-body").append('<div class="radioplayer-prerolloverlay">' + a + "</div>"), radioplayer.emp.attemptedInit && radioplayer.services.overlay.volumeControl.onOpen(!0)
        },
        hide: function() {
            radioplayer.services.overlay.showing = !1, null !== radioplayer.adswizz.overlayTimeout && clearTimeout(radioplayer.adswizz.overlayTimeout), null !== radioplayer.overlay.initTimeout && clearTimeout(radioplayer.overlay.initTimeout), (radioplayer.emp.attemptedInit && !radioplayer.emp.player.flash.used || radioplayer.emp.player.flash.empswf) && radioplayer.services.overlay.volumeControl.onClose(!1), $(".radioplayer").removeClass("adswizz-companion-showing"), $(".radioplayer").removeClass("has-promo-overlay"), $(".radioplayer-prerolloverlay").remove(), $(".radioplayer-preroll-close").remove(), $(".radioplayer-preroll-iframe-container").remove(), $(".adswizz-control-blocker").remove()
        }
    },
    xDomainIframeCallback: function(a) {
        "post-preroll-proceed" == jQuery.parseJSON(a).method && radioplayer.services.overlay.hide()
    },
    saveMyStationsOrder: function() {
        for (var a = "", b = 0; b < radioplayer.settings.presets.length; b++) a += ("" == a ? "" : ",") + b + ":" + radioplayer.settings.presets[b];
        radioplayer.services.saveCookie("ms/s", "ms", a)
    },
    getAPI: function(a, b) {
        $.ajax({
            url: a,
            dataType: "script",
            cache: !1,
            success: function() {
                void 0 !== b && b()
            }
        })
    },
    analytics: {
        loaded: !1,
        $iframe: null,
        init: function() {
            radioplayer.services.analytics.$iframe = $("<iframe />", {
                src: radioplayer.consts.iframe.analytics + "?rpid=" + currentStationID + "&cType=" + (audioLive ? "live" : "od&odUrl=" + audioArray[0].audioUrl),
                name: "GAAnalytics",
                id: "GAAnalytics",
                class: "crossdomain-iframe",
                load: function() {
                    window.postMessage && (radioplayer.services.analytics.loaded = !0, setTimeout(function() {
                        radioplayer.services.analytics.heartbeat()
                    }, 2e4), $("html").hasClass("ie8") ? window.onunload = function() {
                        radioplayer.services.analytics.heartbeat()
                    } : window.onbeforeunload = function(a) {
                        radioplayer.services.analytics.heartbeat()
                    })
                }
            }), radioplayer.objs.body.append(radioplayer.services.analytics.$iframe)
        },
        sendEvent: function(a, b, c, d, e) {
            radioplayer.services.analytics.loaded && !$("html").hasClass("ie7") && (radioplayer.utils.output("iframe loaded"), $("#GAAnalytics")[0].contentWindow.postMessage(JSON.stringify({
                type: "Event",
                category: a,
                action: b,
                label: c,
                value: d,
                noninteraction: e
            }), "*"))
        },
        sendPageview: function(a) {
            radioplayer.services.analytics.loaded && $("#GAAnalytics")[0].contentWindow.postMessage(JSON.stringify({
                type: "Pageview",
                reason: a
            }), "*")
        },
        heartbeat: function() {
            radioplayer.services.analytics.loaded && $("#GAAnalytics")[0].contentWindow.postMessage(JSON.stringify({
                type: "Heartbeat"
            }), "*")
        }
    },
    CrossDomain: {
        prototype: {
            _processData: function(a) {
                radioplayer.stnList = a, $(radioplayer.services).trigger("stationListSet")
            }
        }
    }
}, radioplayer.emp = {
    DEBUG: !1,
    player: {},
    ready: !1,
    id: "empv3",
    preferredPlayer: "flash",
    currentPlayer: "flash",
    retryCount: 5,
    audioArrayInteger: 0,
    audioPreference: 0,
    event: {
        mode: "mode",
        loadProgress: "loadProgress",
        startPlaying: "startPlaying",
        pausePlaying: "pausePlaying",
        resumed: "resumed",
        stopped: "stopped",
        cleanedup: "cleanedup",
        durationSet: "durationSet",
        ended: "ended",
        update: "update",
        volumeSet: "volumeSet",
        securityError: "securityError",
        error: "error",
        noSupport: "noSupport",
        attemptedInit: !1
    },
    init: function(a, b, c, d) {
        this.attemptedInit || vastAds.enabled || !radioplayer.utils || radioplayer.utils.resizeViewPort(380, 665), this.attemptedInit = !0;
        var e = [],
            d = d || null;
        radioplayer.emp.player.flash && radioplayer.emp.player.flash.blocked || (radioplayer.emp.player.flash.available = swfobject.hasFlashPlayerVersion(radioplayer.emp.player.flash.flashVersion)), this.determinePlayer(d);
        var f = d ? d[0] : a[radioplayer.emp.audioArrayInteger];
        e.push(f), void 0 !== e && e.length ? (radioplayer.utils.output(typeof e), radioplayer.utils.output(e.length), radioplayer.utils.output(e[0])) : $(this).trigger(this.event.error, {}), this.solution("setAudioParams", e, b, c), "flash" === radioplayer.emp.currentPlayer && this.player.flash.createObject()
    },
    determinePlayer: function(a) {
        this.preferredPlayer = preferredPlaybackMethod || "flash", "html" === this.preferredPlayer && radioplayer.emp.audioPreference < 1 || "flash" === this.preferredPlayer && radioplayer.emp.audioPreference > 0 || a ? (radioplayer.emp.currentPlayer = "html", this.DEBUG && radioplayer.utils.output("[EMP]: Trying HTML player"), this.player.html && this.player.html.initialisedOnce || this.initHTMLPlayer(), this.player.html.available || (this.DEBUG && radioplayer.utils.output("[EMP]: We have tried the HTML player, and failed"), radioplayer.emp.audioPreference > 0 ? (radioplayer.emp.currentPlayer = null, radioplayer.emp.currentPlayer = null, this.triggerNoSupportedPlayerError()) : (radioplayer.emp.audioPreference++, radioplayer.emp.determinePlayer()))) : (radioplayer.emp.currentPlayer = "flash", this.DEBUG && radioplayer.utils.output("[EMP]: Trying Flash player"), this.player.flash && this.player.flash.blocked || this.initFlashPlayer(), this.player.flash.available || (this.DEBUG && radioplayer.utils.output("[EMP]: We have tried the flash player, and failed. " + radioplayer.emp.audioPreference), radioplayer.emp.audioPreference > 0 ? (radioplayer.emp.currentPlayer = null, this.triggerNoSupportedPlayerError()) : (radioplayer.emp.audioPreference++, radioplayer.emp.determinePlayer()))), this.DEBUG && this.eventInspector()
    },
    initFlashPlayer: function() {
        this.player.flash.init(this), this.player.flash.available && (this.player.flash.used = !0, this.DEBUG && radioplayer.utils.output("[EMP]: Flash Player used."))
    },
    initHTMLPlayer: function() {
        this.player.html.init(this), this.player.html.available && (this.player.html.used = !0, this.DEBUG && radioplayer.utils.output("[EMP]: HTML5 Player used."))
    },
    triggerNoSupportedPlayerError: function() {
        $(this).trigger(this.event.noSupport, {}), this.DEBUG && radioplayer.utils.output("[EMP]: No Player available for this browser")
    },
    dataReady: function() {
        this.solution("dataReady")
    },
    eventInspector: function() {
        var a = this;
        $.each(this.event, function(b, c) {
            $(a).bind(c, function(a, d) {
                radioplayer.utils.output("emp: " + b + ' event: "' + c + '" : %o | custom: %o', a, d)
            })
        })
    },
    setParams: function(a, b, c, d, e, f) {
        this.init(), this.solution("setParams", a, b, c, d, e, f), "flash" === radioplayer.emp.currentPlayer && this.player.flash.createObject()
    },
    resetAttemptCount: function() {
        this.solution("resetAttemptCount")
    },
    solution: function(a) {
        var b, c = Array.prototype.slice.call(arguments, 1);
        if ("flash" === radioplayer.emp.currentPlayer ? b = this.player.flash : "html" === radioplayer.emp.currentPlayer ? b = this.player.html : $(this).trigger(this.event.noSupport, {}), b && "function" == typeof b[a]) return b[a].apply(b, c)
    },
    loadRTMPStream: function(a, b) {
        this.solution("loadRTMPStream", a, b)
    },
    loadHTTPStream: function(a) {
        this.solution("loadHTTPStream", a)
    },
    loadHTTPMP4M4AStream: function(a) {
        this.solution("loadHTTPMP4M4AStream", a)
    },
    loadPlaylist: function(a) {
        this.solution("loadPlaylist", a)
    },
    resume: function() {
        this.ready && (this.errorCount = 0, this.solution("resume"))
    },
    pause: function() {
        this.solution("pause")
    },
    stop: function() {
        this.solution("stop")
    },
    cleanup: function() {
        this.solution("cleanup")
    },
    getPosition: function() {
        return this.solution("getPosition")
    },
    getDuration: function() {
        return this.solution("getDuration")
    },
    seek: function(a) {
        this.solution("seek", a)
    },
    setVolume: function(a) {
        this.solution("setVolume", a)
    },
    setBufferTime: function(a) {
        this.solution("setBufferTime", a)
    },
    setPlaybackMode: function(a) {
        this.solution("setPlaybackMode", a)
    },
    getPlaybackMode: function() {
        return this.solution("getPlaybackMode")
    },
    getVersion: function() {
        return this.solution("getVersion")
    },
    memoryreset: function() {
        return this.solution("memoryreset")
    },
    setMemoryLimit: function(a) {
        this.solution("setMemoryLimit", a)
    },
    setStallTimeout: function(a) {
        this.solution("setStallTimeout", a)
    }
}, radioplayer.emp.player.flash = {
    ready: !1,
    waitingForReady: !1,
    swfname: null,
    api: null,
    $api: null,
    available: !1,
    used: !1,
    audioType: "http",
    audioUrl: "",
    audioServer: "",
    audioEndpoint: "",
    audioLive: !0,
    ioErrorCount: 0,
    ioErrorTimeout: null,
    waitingForReady: null,
    flashVersion: "10.0.0",
    audioFlash: [],
    init: function(a) {
        this.api = a, this.$api = $(a)
    },
    createObject: function(a, b) {
        var c = radioplayer.consts.flashToUseAssetBaseUrl ? radioplayer.consts.assetBaseUrl : "",
            d = this;
        null == a && (a = "EMP3.2.1.swf"), this.swfname = a.split(".swf")[0];
        var e = {},
            f = {
                menu: "false",
                scale: "noScale",
                allowFullscreen: "false",
                allowScriptAccess: "always",
                bgcolor: "0x000000"
            },
            g = {
                id: this.swfname,
                name: this.swfname
            };
        null == b && (b = "0"), swfobject.embedSWF(c + "flash/" + a, this.api.id, b, b, this.flashVersion, null, e, f, g, function(a) {
            0 == a.success && d.$api.trigger(d.api.event.noSupport, d.getEventObject())
        })
    },
    dataReady: function() {
        this.api.DEBUG && radioplayer.utils.output("flash: Try to initialize the EMP SWF, if it is ready"), this.ready ? (this.api.DEBUG && radioplayer.utils.output("flash: EMP SWF ALREADY READY"), this.passParamsToEMP()) : (this.api.DEBUG && radioplayer.utils.output("flash: EMP SWF NOT READY"), this.waitingForReady = !0, this.waitingTimeout = setTimeout($.proxy(function() {
            this.waitingForReady && (this.waitingForReady = !1, radioplayer.emp.player.ready = !1, radioplayer.emp.player.flash.available = !1, radioplayer.emp.player.flash.used = !1, radioplayer.emp.player.flash.blocked = !0, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady())
        }, this), 1500))
    },
    empReady: function() {
        this.api.DEBUG && radioplayer.utils.output("flash: EMP SWF REPORTS READY"), this.ready = !0, this.api.ready = !0, this.empswf = document.getElementById(this.swfname), this.respondToEmp("empReady"), this.waitingForReady && (this.waitingForReady = !1, clearTimeout(this.waitingTimeout), this.api.DEBUG && radioplayer.utils.output("flash: EMP SWF is now ready to begin receiving parameters"), this.passParamsToEMP())
    },
    setParams: function(a, b, c, d, e, f) {
        this.audioType = a, this.audioUrl = b, this.audioServer = c, this.audioEndpoint = d, this.audioLive = e, this.bufferTime = f
    },
    setAudioParams: function(a, b, c) {
        this.audioFlash = a && a.length ? a : [], this.audioLive = b, this.bufferTime = c
    },
    passParamsToEMP: function() {
        this.api.DEBUG && this.empswf.emp_setDebugMode(!0), this.api.DEBUG && radioplayer.utils.output("flash: Passing parameters to EMP SWF object"), this.audioFlash[0].hasOwnProperty("cacheKiller") && (radioplayer.utils.output("Set cache killer to: " + (this.audioFlash[0].cacheKiller ? "true" : "false")),
            this.empswf.emp_setUseCacheKiller(this.audioFlash[0].cacheKiller)), this.audioFlash.length ? this.setAudio(this.audioFlash) : "rtmp" === this.audioType ? this.loadRTMPStream(this.audioServer, this.audioEndpoint) : "http" === this.audioType ? this.loadHTTPStream(this.audioUrl) : "httpmp4m4a" === this.audioType || "httpaac" === this.audioType || "aac" === this.audioType ? this.loadHTTPMP4M4AStream(this.audioUrl) : "playlist" === this.audioType ? this.loadPlaylist(this.audioUrl) : "hls" === this.audioType ? this.loadHLSStream(this.audioUrl) : this.$api.trigger(this.api.event.noSupport, this.getEventObject());
        var a = this.audioLive ? "live" : "od";
        this.setPlaybackMode(a), this.setVolume(radioplayer.controls.currentVolume), this.empswf.emp_setBufferTime(this.bufferTime)
    },
    setAudio: function(a) {
        var b;
        this.cleanup(), this.audioFlash = a && a.length ? a : [], b = !!this.audioFlash.length && this.audioFlash[0], b ? this.passSetAudio(b) : this.$api.trigger(this.api.event.noSupport, this.getEventObject())
    },
    passSetAudio: function(a) {
        "rtmp" === a.audioType ? this.loadRTMPStream(a.audioServer, a.audioEndpoint) : "http" === a.audioType ? this.loadHTTPStream(a.audioUrl) : "httpmp4m4a" === a.audioType || "httpaac" === this.audioType || "aac" === this.audioType ? this.loadHTTPMP4M4AStream(a.audioUrl) : "playlist" === a.audioType ? this.loadPlaylist(a.audioUrl) : "hls" === a.audioType ? this.loadHLSStream(a.audioUrl) : this.$api.trigger(this.api.event.noSupport, this.getEventObject())
    },
    respondToEmp: function(a) {
        this.empswf.emp_reportResponse(a)
    },
    empPlaylistLoaded: function() {
        this.respondToEmp("radioplayer.emp.empPlaylistLoaded")
    },
    testRunnerRun: function(a) {
        this[a]()
    },
    testRunnerLoadPlaylist: function() {
        this.empswf.emp_loadPlaylist("testplaylists/testXSPF.xspf")
    },
    loadRTMPStream: function(a, b) {
        this.empswf.emp_loadRTMPStream(a, b)
    },
    loadHTTPStream: function(a) {
        this.empswf.emp_loadHTTPStream(a)
    },
    loadHTTPMP4M4AStream: function(a) {
        this.empswf.emp_loadHTTPMP4M4AStream(a)
    },
    loadPlaylist: function(a) {
        this.empswf.emp_loadPlaylist(a)
    },
    loadHLSStream: function(a) {
        this.empswf.emp_loadHLSStream(a)
    },
    resume: function() {
        this.empswf.emp_resume()
    },
    pause: function() {
        this.empswf.emp_pause()
    },
    stop: function() {
        this.empswf.emp_stop()
    },
    cleanup: function() {
        this.empswf.emp_cleanup()
    },
    getPosition: function() {
        return this.empswf.emp_getPosition()
    },
    getDuration: function() {
        return this.empswf.emp_getDuration()
    },
    seek: function(a) {
        this.empswf.emp_seek(a)
    },
    setVolume: function(a) {
        this.empswf.emp_setVolume(a)
    },
    setBufferTime: function(a) {
        this.empswf.emp_setBufferTime(a)
    },
    setPlaybackMode: function(a) {
        this.audioLive = "live" == a, this.empswf.emp_setPlaybackMode(a)
    },
    getPlaybackMode: function() {
        return this.audioLive ? "live" : "od"
    },
    getVersion: function() {
        return this.empswf.emp_getVersion()
    },
    memoryreset: function() {
        return this.empswf.emp_memoryreset()
    },
    setMemoryLimit: function(a) {
        this.empswf.emp_setMemoryLimit(a)
    },
    setStallTimeout: function(a) {
        this.empswf.emp_setStallTimeout(a)
    },
    reportEMPOutput: function(a) {
        var b = $.parseJSON(a);
        this.$api.trigger(b.type, b)
    },
    reportEMPError: function(a) {
        var b = $.parseJSON(a);
        102 === b.code ? this.$api.trigger(this.api.event.securityError, b) : this.$api.trigger(this.api.event.error, b)
    },
    resetAttemptCount: function() {},
    getEventObject: function() {
        return {
            mode: this.audioLive ? "live" : "od"
        }
    }
}, radioplayer.emp.player.html = {
    version: "1.0 of the HTML5 Audio player for EMP V3",
    ready: !1,
    available: !1,
    used: !1,
    supported: !1,
    monitoring: !1,
    disconnected: !0,
    firstConnection: !0,
    ignoringCommands: /(iphone|ipad|ipod|android|blackberry|playbook|windows phone)/i.test(navigator.userAgent),
    seekTimeoutId: null,
    stallTime: 5e3,
    stallTimeoutId: null,
    errorTimeoutId: null,
    errorCount: 0,
    waitingCount: 0,
    api: null,
    $api: null,
    autoplay: !0,
    aborted: !1,
    duration: 0,
    audioType: "http",
    audioUrl: "",
    audioServer: "",
    audioEndpoint: "",
    audioLive: !0,
    initialisedOnce: !1,
    audioHTML: [],
    audioHTMLFallback: null,
    formats: {
        mp3: ["audio/mpeg"],
        mp4: ["audio/mp4", "audio/x-m4a"],
        aac: ["audio/aac", "audio/x-aac"],
        hls: ["application/vnd.apple.mpegurl", "application/x-mpegURL", "application/vnd.apple.mpegURL", "audio/mpegurl"],
        m3u: ["audio/mpegurl", "audio/x-mpegurl"],
        pls: ["audio/x-scpls"]
    },
    canPlay: {},
    audioElem: null,
    $audio: null,
    init: function(a) {
        var b = this;
        if (this.api = a, this.$api = $(a), this.audioElem = document.createElement("audio"), this.$audio = $(this.audioElem), this.available = !!this.audioElem.canPlayType, this.initialisedOnce = !0, this.available) {
            var c = !1;
            $.each(this.formats, function(a, d) {
                $.each(d, function(d, e) {
                    if (b.canPlay[a] = b.available && b.audioElem.canPlayType(e), b.api.DEBUG && radioplayer.utils.output("html: audio.canPlayType(" + e + ") = " + b.canPlay[a]), b.canPlay[a]) return c = a, !1
                })
            }), this.audioElem.preload = "none", this.attachEvents(), radioplayer.emp.player.html.firstConnection = !0, $("#" + this.api.id).append(this.audioElem), this.ready = !0, this.api.ready = !0, Modernizr.on("videoautoplay", function(a) {
                a || !radioplayer.consts.is_iOS && !radioplayer.consts.is_Android || (radioplayer.controls.showPressPlayPrompt(), radioplayer.controls.userPaused = !0)
            })
        }
    },
    setAudioParams: function(a, b, c) {
        if (this.audioHTML = a && a.length ? $.extend(!0, [], a) : [], this.audioHTML.length && this.audioHTML[0].audioType && "httpmp4m4a" === this.audioHTML[0].audioType) {
            var d = this.audioHTML[0].audioUrl.indexOf("?type=.flv");
            d > -1 && (this.audioHTML[0].audioUrl = this.audioHTML[0].audioUrl.substr(0, d))
        }
        this.aborted = !1, this.audioLive = b, this.bufferTime = c
    },
    dataReady: function() {
        this.api.DEBUG && radioplayer.utils.output("html: dataReady()"), this.passParamsToHTML()
    },
    passParamsToHTML: function() {
        this.api.DEBUG && radioplayer.utils.output("Passing parameters to HTML audio"), this.audioHTML.length ? this.setAudio(this.audioHTML) : "rtmp" === this.audioType ? this.loadRTMPStream(this.audioServer, this.audioEndpoint) : "http" === this.audioType ? this.loadHTTPStream(this.audioUrl) : "aac" === this.audioType ? this.loadAACStream(this.audioUrl) : "httpmp4m4a" === this.audioType ? this.loadHTTPMP4M4AStream(this.audioUrl) : "hls" === this.audioType ? this.loadHLSStream(this.audioUrl) : "playlist" === this.audioType ? this.loadPlaylist(this.audioUrl) : this.noSupport();
        var a = this.audioLive ? "live" : "od";
        this.setPlaybackMode(a), this.setVolume(radioplayer.controls.currentVolume), this.$api.trigger(this.api.event.volumeSet, this.getEventObject())
    },
    setAudio: function(a) {
        var b, c, d = this;
        this.reset(), this.audioHTML = a && a.length ? a : [], $.each(this.audioHTML, function(a, b) {
            if (d.canPlayAudio(b)) return c = b, !1
        }), b = c, b ? this.passSetAudio(b) : this.noSupport()
    },
    canPlayAudio: function(a) {
        if ("rtmp" === a.audioType) return !1;
        if ("http" === a.audioType) return this.canPlay.mp3;
        if ("aac" === a.audioType) return this.canPlay.aac;
        if ("httpmp4m4a" === a.audioType) return this.canPlay.mp4;
        if ("hls" === a.audioType) return this.canPlay.hls;
        if ("playlist" === a.audioType) {
            var b = this.detectPlaylistType(a.audioUrl);
            return b && this.canPlay[b]
        }
    },
    passSetAudio: function(a) {
        "rtmp" === a.audioType ? this.loadRTMPStream(a.audioServer, a.audioEndpoint) : "http" === a.audioType ? this.loadHTTPStream(a.audioUrl) : "aac" === a.audioType ? this.loadAACStream(a.audioUrl) : "httpmp4m4a" === a.audioType ? this.loadHTTPMP4M4AStream(a.audioUrl) : "hls" === a.audioType ? this.loadHLSStream(a.audioUrl) : "playlist" === a.audioType && this.loadPlaylist(a.audioUrl)
    },
    setAudioUrl: function(a) {
        this.reset(), this.supported = !0, this.firstConnection = !0, this.audioUrl = a, this.autoplay && this.resume()
    },
    reset: function() {
        clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), this.disconnected || this.disconnectStream(), this.monitoring = !1, this.supported = !1, this.duration = 0
    },
    connectStream: function() {
        this.supported && (this.firstConnection && (this.firstConnection = !1, this.$api.trigger(this.api.event.stopped, {}), this.$api.trigger(this.api.event.cleanedup, {})), this.disconnected = !1, this.audioElem.src = this.audioUrl, this.audioElem.load())
    },
    disconnectStream: function() {
        this.disconnected = !0, this.audioElem.src = "about:blank", this.audioElem.load()
    },
    refreshConnection: function() {
        this.api.DEBUG && radioplayer.utils.output("html: refreshConnection()"), clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), this.supported && !this.disconnected && (this.disconnectStream(), this.connectStream(), this.resume())
    },
    noSupport: function() {
        this.supported = !1, this.$api.trigger(this.api.event.noSupport, this.getEventObject())
    },
    detectPlaylistType: function(a) {
        var b = a && a.split && a.split("."),
            c = b.length > 1 ? b[b.length - 1] : "";
        return !!c && ("m3u8" === c ? "hls" : "hls" === c ? "hls" : "m3u" === c ? "m3u" : "pls" === c ? "pls" : void 0)
    },
    loadRTMPStream: function(a, b) {
        this.noSupport()
    },
    loadHTTPStream: function(a) {
        this.canPlay.mp3 ? this.setAudioUrl(a) : this.noSupport()
    },
    loadAACStream: function(a) {
        this.canPlay.aac ? this.setAudioUrl(a) : this.noSupport()
    },
    loadHTTPMP4M4AStream: function(a) {
        this.canPlay.mp4 ? this.setAudioUrl(a) : this.noSupport()
    },
    loadHLSStream: function(a) {
        this.canPlay.hls ? this.setAudioUrl(a) : this.noSupport()
    },
    loadPlaylist: function(a) {
        var b = this.detectPlaylistType(a);
        b && this.canPlay[b] ? this.setAudioUrl(a) : this.noSupport()
    },
    pause: function() {
        clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), this.audioElem.pause()
    },
    stop: function() {
        clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), this.audioElem.pause()
    },
    resume: function() {
        clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), this.disconnected && this.connectStream(), this.supported ? this.audioElem.play() : this.noSupport()
    },
    cleanup: function() {
        this.reset(), this.$api.trigger(this.api.event.cleanedup, this.getEventObject())
    },
    getPosition: function() {
        return 1e3 * this.audioElem.currentTime
    },
    getDuration: function() {
        var a = this.audioElem;
        return 1e3 * (isFinite(a.duration) ? a.duration : 0)
    },
    seek: function(a) {
        var b = this,
            c = this.audioElem;
        if (clearTimeout(this.stallTimeoutId), clearTimeout(this.errorTimeoutId), !this.audioLive && !this.disconnected)
            if (this.supported) {
                this.ignoringCommands && c.play();
                try {
                    if (c.seekable && !("object" == typeof c.seekable && c.seekable.length > 0)) throw 1;
                    c.currentTime = a, c.play()
                } catch (d) {
                    this.seekTimeoutId = setTimeout(function() {
                        b.seek(a)
                    }, 250)
                }
            } else this.noSupport()
    },
    setVolume: function(a) {
        this.audioElem.volume = a / 100, this.$api.trigger(this.api.event.volumeSet, this.getEventObject())
    },
    setBufferTime: function(a) {
        return !1
    },
    setPlaybackMode: function(a) {
        this.audioLive = "live" == a, this.$api.trigger(this.api.event.mode, this.getEventObject())
    },
    getPlaybackMode: function() {
        return this.audioLive ? "live" : "od"
    },
    getVersion: function() {
        return this.version
    },
    memoryreset: function() {
        return !1
    },
    setMemoryLimit: function(a) {
        return !1
    },
    setStallTimeout: function(a) {
        "number" == typeof a && (this.stallTime = a < 2e3 ? 2e3 : a)
    },
    attachEvents: function() {
        var a = this;
        this.audioElem.addEventListener("progress", function() {
            a.audioLive || a.$api.trigger(a.api.event.loadProgress, a.getEventObject())
        }, !1), this.audioElem.addEventListener("timeupdate", function() {
            var b = a.getDuration();
            a.duration !== b && (a.duration = b, a.$api.trigger(a.api.event.durationSet, a.getEventObject())), a.audioLive || a.$api.trigger(a.api.event.update, a.getEventObject())
        }, !1), this.audioElem.addEventListener("play", function() {
            clearTimeout(a.stallTimeoutId), clearTimeout(a.errorTimeoutId), a.ignoringCommands = !1, a.audioLive && (a.monitoring = !0), a.$api.trigger(a.api.event.resumed, a.getEventObject())
        }, !1), this.audioElem.addEventListener("playing", function() {
            radioplayer.controls.noSupportShowing = !1, radioplayer.controls.hideErrorMsg(), !radioplayer.objs.body.hasClass("showing-overlay") && audioLive && radioplayer.playing.startUpdating(), clearTimeout(a.stallTimeoutId), a.$api.trigger(a.api.event.startPlaying, a.getEventObject()), radioplayer.emp.player.html.errorCount = 0, radioplayer.emp.player.html.waitingCount = 0
        }, !1), this.audioElem.addEventListener("waiting", function() {
            radioplayer.emp.player.html.waitingCount++, a.audioLive && a.monitoring && (clearTimeout(a.stallTimeoutId), radioplayer.emp.player.html.waitingCount < radioplayer.emp.retryCount ? a.stallTimeoutId = setTimeout(function() {
                a.refreshConnection()
            }, a.stallTime) : (clearTimeout(a.stallTimeoutId), radioplayer.emp.player.html.errorCount = 0, radioplayer.emp.player.html.waitingCount = 0, radioplayer.emp.player.html.cleanup(), a.aborted = !0, radioplayer.emp.player.html.noSupport()))
        }, !1), this.audioElem.addEventListener("pause", function() {
            clearTimeout(a.stallTimeoutId), clearTimeout(a.errorTimeoutId), a.audioLive ? (a.monitoring = !1, this.disconnected || a.disconnectStream(), a.$api.trigger(a.api.event.stopped, a.getEventObject())) : a.$api.trigger(a.api.event.pausePlaying, a.getEventObject())
        }, !1), this.audioElem.addEventListener("ended", function() {
            a.$api.trigger(a.api.event.ended, a.getEventObject())
        }, !1), this.audioElem.addEventListener("volumechange", function() {
            a.$api.trigger(a.api.event.volumeSet, a.getEventObject())
        }, !1), this.audioElem.addEventListener("durationchange", function() {
            a.duration = a.getDuration(), a.$api.trigger(a.api.event.durationSet, a.getEventObject())
        }, !1), this.audioElem.addEventListener("error", function() {
            radioplayer.emp.player.html.errorCount++;
            a.audioElem.error.code;
            a.aborted || (clearTimeout(a.stallTimeoutId), clearTimeout(a.errorTimeoutId), radioplayer.emp.player.html.errorCount < radioplayer.emp.retryCount ? a.errorTimeoutId = setTimeout(function() {
                a.refreshConnection()
            }, a.stallTime / 2) : (radioplayer.emp.player.html.errorCount = 0, radioplayer.emp.player.html.waitingCount = 0, radioplayer.emp.player.html.cleanup(), a.aborted = !0, radioplayer.emp.player.html.noSupport()))
        }, !1)
    },
    resetAttemptCount: function() {
        return !1
    },
    getEventObject: function() {
        var a = this.audioElem,
            b = a.seekable && a.seekable.length ? 1 : 0;
        return {
            position: this.getPosition(),
            duration: this.getDuration(),
            volume: Math.round(100 * a.volume),
            mode: this.audioLive ? "live" : "od",
            loadProgress: b,
            bytesLoaded: 100 * b,
            bytesTotal: 100
        }
    }
}, radioplayer.controls = {
    rawDuration: 0,
    duration: "00:00",
    muted: !1,
    currentVolume: 100,
    savedVolume: 0,
    currentPosition: 0,
    volumeLocked: !1,
    volumeScrubHeight: 44,
    progressScrubWidth: 262,
    volumeScrubOffsetY: 5,
    dragging: !1,
    isAllLoaded: !1,
    isLoading: !1,
    insertedODButtons: !1,
    isPlaying: !1,
    userClickedControls: !1,
    userPaused: !1,
    isListening: !1,
    mouseOverProgress: !1,
    volControlLeft: 0,
    volControlWidth: 0,
    muteThres: 15,
    topEndThres: 6,
    volWavesWidth: 0,
    volumeHover: 0,
    mouseDownOnVolume: !1,
    pressPlayPromptShowing: !1,
    streamHasStarted: !1,
    noSupportShowing: !1,
    showPressPlayPrompt: function() {
        if (!radioplayer.controls.pressPlayPromptShowing) {
            $("#volume-control").addClass("disabled"), $("#live-strip").removeClass("loading"), $("#live-strip").addClass("live-play-prompt");
            var a = $(".icon-play");
            $(".icon-play").addClass("play-prompt"), radioplayer.controls.pressPlayPromptShowing = !0, a.on("click", function() {
                radioplayer.controls.hidePressPlayPrompt()
            }), this.hideLoader(), $(radioplayer.emp).on("startPlaying.hidePlayPrompt", function() {
                radioplayer.controls.hidePressPlayPrompt(), $(radioplayer.emp).off("startPlaying.hidePlayPrompt")
            })
        }
    },
    hidePressPlayPrompt: function() {
        radioplayer.controls.pressPlayPromptShowing && (radioplayer.controls.pressPlayPromptShowing = !1, $(".icon-play").removeClass("play-prompt"), $("#live-strip").removeClass("live-play-prompt"))
    },
    formatPosition: function(a) {
        a < 0 && (a = 0);
        var b = Math.floor(a / 1e3 % 60),
            c = Math.floor(a / 6e4 % 60),
            d = Math.floor(a / 36e5 % 24);
        return String(c).length < 2 && (c = "0" + c), String(b).length < 2 && (b = "0" + b), d + ":" + c + ":" + b
    },
    cleanup: function() {
        this.isAllLoaded = !1, this.isLoading = !1
    },
    mute: function() {
        this.muted = !this.muted, this.muted ? (this.savedVolume = this.currentVolume, this.currentVolume = 0, (radioplayer.emp.player.flash && radioplayer.emp.player.flash.used || radioplayer.emp.player.html && radioplayer.emp.player.html.used) && radioplayer.emp.setVolume(0)) : radioplayer.emp.setVolume(Math.round(this.savedVolume))
    },
    onVolumeUpdate: function(a, b) {
        this.currentVolume = b.volume, radioplayer.utils.output("on volume update: " + b.volume);
        var c = "";
        0 == b.volume ? this.isListening && this.isPlaying && (radioplayer.controls.onSilent("mute"), this.isListening = !1) : !this.isListening && this.isPlaying && (radioplayer.controls.onAudible(), this.isListening = !0), c = 0 == b.volume ? "muted" : b.volume < 20 ? "p20" : b.volume < 40 ? "p40" : b.volume < 60 ? "p60" : b.volume < 80 ? "p80" : "p100", $("#volume-control").removeClass("muted p20 p40 p60 p80 p100").addClass(c)
    },
    volumeIconMouseEnter: function() {
        (radioplayer.consts.is_iOS || this.volumeLocked) && (radioplayer.consts.is_Android || this.volumeLocked) || (this.volControlLeft = $("#volume-control").offset().left, this.volControlWidth = $("#volume-control").outerWidth(), this.volWavesWidth = this.volControlWidth - this.muteThres - this.topEndThres, $("#volume-control").addClass("hover"))
    },
    volumeIconMouseLeave: function() {
        (radioplayer.consts.is_iOS || this.volumeLocked) && (radioplayer.consts.is_Android || this.volumeLocked) || ($("#volume-control").removeClass("hover muted p20 p40 p60 p80 p100"), radioplayer.controls.muted ? $("#volume-control").addClass("muted") : radioplayer.controls.currentVolume < 20 ? $("#volume-control").addClass("p20") : radioplayer.controls.currentVolume < 40 ? $("#volume-control").addClass("p40") : radioplayer.controls.currentVolume < 60 ? $("#volume-control").addClass("p60") : radioplayer.controls.currentVolume < 80 ? $("#volume-control").addClass("p80") : $("#volume-control").addClass("p100"))
    },
    volumeIconMouseMove: function(a) {
        if (!radioplayer.consts.is_iOS && !this.volumeLocked || !radioplayer.consts.is_Android && !this.volumeLocked) {
            var b = a.pageX - radioplayer.controls.volControlLeft,
                c = "";
            b < radioplayer.controls.muteThres ? radioplayer.controls.mouseDownOnVolume ? (c = "muted", $("#volume-control").attr("title", radioplayer.lang.controls.unmute)) : radioplayer.controls.muted ? (c = "muted", $("#volume-control").attr("title", radioplayer.lang.controls.unmute)) : radioplayer.controls.currentVolume < 20 ? (c = "p20", $("#volume-control").attr("title", radioplayer.lang.controls.mute)) : radioplayer.controls.currentVolume < 40 ? (c = "p40", $("#volume-control").attr("title", radioplayer.lang.controls.mute)) : radioplayer.controls.currentVolume < 60 ? (c = "p60", $("#volume-control").attr("title", radioplayer.lang.controls.mute)) : radioplayer.controls.currentVolume < 80 ? (c = "p80", $("#volume-control").attr("title", radioplayer.lang.controls.mute)) : (c = "p100", $("#volume-control").attr("title", radioplayer.lang.controls.mute)) : b >= radioplayer.controls.volControlWidth - radioplayer.controls.topEndThres ? (c = "p100", radioplayer.controls.volumeHover = 100, $("#volume-control").attr("title", radioplayer.lang.controls.set_volume_100)) : (radioplayer.controls.volumeHover = Math.round((b - radioplayer.controls.muteThres) / radioplayer.controls.volWavesWidth * 100), c = radioplayer.controls.volumeHover < 20 ? "p20" : radioplayer.controls.volumeHover < 40 ? "p40" : radioplayer.controls.volumeHover < 60 ? "p60" : radioplayer.controls.volumeHover < 80 ? "p80" : "p100", $("#volume-control").attr("title", radioplayer.lang.controls.set_volume)), $("#volume-control").removeClass("muted p20 p40 p60 p80 p100").addClass(c)
        }
    },
    volumeIconMouseDown: function(a) {
        (radioplayer.consts.is_iOS || this.volumeLocked) && (radioplayer.consts.is_Android || this.volumeLocked) || (a.originalEvent.preventDefault ? a.originalEvent.preventDefault() : a.originalEvent.returnValue = !1, 1 === a.which && (radioplayer.controls.mouseDownOnVolume = !0))
    },
    volumeIconMouseUp: function(a) {
        (radioplayer.consts.is_iOS || this.volumeLocked) && (radioplayer.consts.is_Android || this.volumeLocked) || 1 === a.which && (radioplayer.controls.mouseDownOnVolume = !1)
    },
    volumeIconClick: function(a) {
        if (radioplayer.consts.is_iOS || radioplayer.consts.is_Android) $("#volume-controls").hasClass("showing-prompt") || (radioplayer.controls.hidePressPlayPrompt(), $("#volume-controls").addClass("showing-prompt").append('<div class="point-prompt volume-prompt" id="volume-prompt">' + radioplayer.lang.controls.use_device_controls + '<span class = "icon-info_outline"></span><div class="point-prompt-arrow"></div></div>'), $("#volume-prompt").on("click", function() {
            $("#volume-controls").removeClass("showing-prompt"), $("#volume-prompt").remove()
        }), setTimeout(function() {
            $("#volume-controls").removeClass("showing-prompt"), $("#volume-prompt").remove()
        }, 4e3));
        else if (!this.volumeLocked) {
            var b = a.pageX - radioplayer.controls.volControlLeft;
            b < radioplayer.controls.muteThres ? (radioplayer.utils.output("clicked mute"), radioplayer.controls.mute()) : (radioplayer.utils.output("SET TO " + radioplayer.controls.volumeHover), radioplayer.controls.muted && radioplayer.controls.mute(), radioplayer.emp.setVolume(radioplayer.controls.volumeHover), radioplayer.services.saveCookie("vl/s", "vl", radioplayer.controls.volumeHover))
        }
    },
    setVolumeTo: function(a) {
        radioplayer.utils.output("access log " + a), this.muted && this.mute(), radioplayer.emp.setVolume(Math.round(a)), radioplayer.services.saveCookie("vl/s", "vl", a)
    },
    showPlay: function(a, b) {
        $("#pause").is(":visible") && $("#pause").hide(), $("#stop").is(":visible") && $("#stop").hide(), $("#play").is(":visible") || ($("#play").show(), $.browser.msie && $("#play").css("display", "block")), this.userClickedControls && $("#play").focus(), this.userClickedControls = !1
    },
    hidePlay: function(a, b) {
        this.isLive() ? ($("#pause").is(":visible") && $("#pause").hide(), $("#stop").is(":visible") || ($("#stop").show(), $.browser.msie && $("#stop").css("display", "block")), $("#progress-scrubber-load-bar").is(":visible") && $("#progress-scrubber-load-bar").hide()) : ($("#pause").is(":visible") || ($("#pause").show(), $.browser.msie && $("#pause").css("display", "block")), $("#stop").is(":visible") && $("#stop").hide(), $("#progress-scrubber-load-bar").is(":visible") || $("#progress-scrubber-load-bar").show()), $("#play").is(":visible") && $("#play").hide(), this.userClickedControls && (audioLive ? $("#stop").focus() : $("#pause").focus()), this.userClickedControls = !1
    },
    toggleMyStations: function(a) {
        a.preventDefault(), $("#toggle-mystations").hasClass("in-mystations") ? radioplayer.mystations.remove(currentStationID, "head-controls") : $("#toggle-mystations").hasClass("animating") || radioplayer.mystations.add(currentStationID, "head-controls")
    },
    onPositionUpdate: function(a, b, c) {
        this.currentPosition = c ? this.currentPosition : b.position / 1e3;
        var d = c ? 1e3 * this.currentPosition : b.position;
        this.isAllLoaded ? ($("#progress-scrubber-load-bar").width($("#progress-scrubber-background").width() + "px"), $("#duration").html(this.formatPosition(d) + "/" + this.duration)) : $("#progress-scrubber-handle").is(":visible") && $("#progress-scrubber-handle").hide();
        var e = d / this.rawDuration,
            f = e * $("#progress-scrubber-background").width();
        this.dragging || $("#progress-scrubber-handle").css("left", f + "px");
        var g = e * $("#progress-scrubber-background").outerWidth();
        $("#progress-scrubber-playback-bar").width(g)
    },
    onLoadProgressUpdate: function(a, b) {
        if (this.isLive()) return $("#progress-scrubber-load-bar").width("0px"), this.isLoading = !1, void($("#duration").is(":visible") && $("#duration").hide());
        $("#progress-scrubber-load-bar").width($("#progress-scrubber-background").width() * b.loadProgress + "px"), b.loadProgress >= .99 ? (this.isAllLoaded = !0, radioplayer.utils.output("fire emp loaded event"), $(radioplayer.emp).trigger("loaded"), $("#progress-scrubber-load-bar").width($("#progress-scrubber-background").width() + "px")) : this.isAllLoaded = !1
    },
    hideLoaderOnStart: function(a, b) {
        this.hideLoader(), radioplayer.utils.output(" begin "), this.isLive() && (this.isAllLoaded = !0)
    },
    hideLoader: function(a, b) {
        this.isLoading = !1, this.isLive() ? ($("#live-strip").removeClass("loading"), $("#live-strip").removeClass("play-prompt-indicator")) : ($("#od-strip #duration").show(), $("#progress-scrubber-playback-bar").is(":visible") || $("#progress-scrubber-playback-bar").show())
    },
    showLoader: function(a, b) {
        this.isLoading = !0, this.isLive() ? $("#live-strip").addClass("loading") : ($("#progress-scrubber-handle").is(":visible") && $("#progress-scrubber-handle").hide(), $("#duration").html(radioplayer.lang.controls.loading), "none" === $("#duration").css("display") && $("#duration").show())
    },
    setDuration: function(a, b) {
        if (!audioLive) {
            this.rawDuration = b.duration, this.duration = this.formatPosition(this.rawDuration), this.checkDuration();
            var c = Math.floor(b.duration / 1e3);
            if (0 == this.insertedODButtons) {
                var d = '<button type="button" class="access od-skip" data-offset="5" tabindex="0">' + radioplayer.lang.controls.skip_forward_5_seconds + '</button><button type="button" class="access od-skip" data-offset="-5" tabindex="0">' + radioplayer.lang.controls.skip_back_5_seconds + "</button>",
                    e = '<button type="button" class="access od-skip" data-offset="30" tabindex="0">' + radioplayer.lang.controls.skip_forward_30_seconds + '</button><button type="button" class="access od-skip" data-offset="-30" tabindex="0">' + radioplayer.lang.controls.skip_back_30_seconds + "</button>",
                    f = '<button type="button" class="access od-skip" data-offset="60" tabindex="0">' + radioplayer.lang.controls.skip_forward_1_minute + '</button><button type="button" class="access od-skip" data-offset="-60" tabindex="0">' + radioplayer.lang.controls.skip_back_1_minute + "</button>",
                    g = '<button type="button" class="access od-skip" data-offset="300" tabindex="0">' + radioplayer.lang.controls.skip_forward_5_minutes + '</button><button type="button" class="access od-skip" data-offset="-300" tabindex="0">' + radioplayer.lang.controls.skip_back_5_minutes + "</button>",
                    h = '<button type="button" class="access od-skip" data-offset="600" tabindex="0">' + radioplayer.lang.controls.skip_forward_10_minutes + '</button><button type="button" class="access od-skip" data-offset="-600" tabindex="0">' + radioplayer.lang.controls.skip_back_10_minutes + "</button>",
                    i = '<button type="button" class="access od-skip" data-offset="1800" tabindex="0">' + radioplayer.lang.controls.skip_forward_30_minutes + '</button><button type="button" class="access od-skip" data-offset="-1800" tabindex="0">' + radioplayer.lang.controls.skip_forward_30_minutes + "</button>";
                c > 3600 ? $("#od-strip").append(f + h + i) : c > 600 ? $("#od-strip").append(e + f + g) : c > 120 ? $("#od-strip").append(d + e + f) : c > 30 ? $("#od-strip").append(d + e) : $("#od-strip").append(d), this.insertedODButtons = !0
            }
        }
    },
    checkDuration: function() {
        this.isLive() ? ($("#live-strip").show(), $("#od-strip").hide()) : ($("#live-strip").hide(), $("#od-strip").show(), this.isAllLoaded ? "none" === $("#progress-scrubber-playback-bar").css("display") && $("#progress-scrubber-playback-bar").show() : ($("#progress-scrubber-handle").is(":visible") && $("#progress-scrubber-handle").hide(), $("#progress-scrubber-playback-bar").is(":visible") && $("#progress-scrubber-playback-bar").hide(), $("#duration").html(radioplayer.lang.controls.loading)), $(window).on("resize", function() {
            radioplayer.controls.isPlaying || radioplayer.controls.onPositionUpdate(null, null, !0)
        })), this.isPlaying && this.hidePlay(), this.isLoading && $("#duration").html(radioplayer.lang.controls.loading)
    },
    isLive: function() {
        0 === this.rawDuration || this.rawDuration;
        return radioplayer.emp.ready && radioplayer.emp.currentPlayer ? "live" === radioplayer.emp.getPlaybackMode() : 0 === this.rawDuration || null == this.rawDuration
    },
    resetDuration: function(a, b) {
        this.rawDuration = 0, this.duration = this.formatPosition(0), this.onPositionUpdate(null, {
            position: 0
        }), this.checkDuration()
    },
    seek: function(a) {
        if (this.lastPosition !== $("#progress-scrubber-handle").offset().left) {
            $("html").hasClass("ie8") && (9, 0);
            var b = $("#progress-scrubber-handle").position().left,
                c = b;
            this.lastPosition = c;
            var d = $("#progress-scrubber-background").width(),
                e = b / d,
                f = e * this.rawDuration;
            $("#duration").html(this.formatPosition(f) + "/" + this.duration), $("#progress-scrubber-playback-bar").outerWidth(e * $("#progress-scrubber-background").width())
        }
    },
    seekStart: function() {
        this.dragging = !0, radioplayer.emp.pause()
    },
    seekStop: function(a) {
        this.dragging = !1, this.updateSeekPosition(a), $("#progress-scrubber-handle").is(":visible") && !this.mouseOverProgress && ($("#progress-scrubber-handle").fadeOut(200), $("#od-title").fadeIn(200)), radioplayer.services.analytics.sendEvent("Navigation", "On Demand Slider", window.location.href, null, null)
    },
    seekOffset: function(a) {
        var b = this.currentPosition + parseInt(a),
            c = this.rawDuration / 1e3;
        b > c && (b = c), radioplayer.emp.seek(b)
    },
    updateSeekPosition: function(a) {
        var b = $("#progress-scrubber-background").width(),
            c = this.lastPosition / b,
            d = c * this.rawDuration / 1e3;
        d = Math.max(d, 0), radioplayer.emp.seek(d)
    },
    progressBarClick: function(a) {
        if (!this.isLive() && this.isAllLoaded) {
            var b = a.pageX - $("#progress-scrubber-background").offset().left,
                c = $("#progress-scrubber-handle").outerWidth() / 2,
                d = $("#progress-scrubber-background").outerWidth() - $("#progress-scrubber-handle").outerWidth() / 2,
                e = 0;
            e = b < c ? 0 : b > d ? 1 : b / $("#progress-scrubber-background").outerWidth();
            var f = e * this.rawDuration / 1e3;
            radioplayer.emp.seek(f), radioplayer.services.analytics.sendEvent("Navigation", "On Demand Slider", window.location.href, null, null)
        }
    },
    mouseEnterProgress: function() {
        !this.isLive() && this.isAllLoaded && (this.mouseOverProgress = !0, $("#progress-scrubber-handle").stop(!0, !0).fadeIn(200), $("#od-title").stop(!0, !0).fadeOut(200))
    },
    mouseLeaveProgress: function() {
        !this.isLive() && this.isAllLoaded && (this.mouseOverProgress = !1, this.dragging || ($("#progress-scrubber-handle").stop(!0, !0).fadeOut(200), $("#od-title").stop(!0, !0).fadeIn(200)))
    },
    logSecurityError: function(a, b) {
        radioplayer.utils.output("EMP has encountered a security error, audio may not play."), "flash" === radioplayer.emp.currentPlayer && "hls" === window.audioArray[radioplayer.emp.audioArrayInteger].audioType && (radioplayer.emp.player.flash.ioErrorCount = 0, clearTimeout(radioplayer.emp.player.flash.ioErrorTimeout), radioplayer.emp.player.flash.stop(), radioplayer.emp.player.flash.cleanup(), $.proxy(this.onNoSupport, this)())
    },
    onEnd: function(a, b) {
        radioplayer.utils.output("end"), this.onPositionUpdate(null, {
            position: this.rawDuration
        })
    },
    onAudible: function() {
        0 == this.isListening && this.currentVolume > 0 && (radioplayer.services.analytics.sendPageview(""), this.isListening = !0)
    },
    onSilent: function(a) {
        1 == this.isListening && (radioplayer.services.analytics.sendPageview("/" + a), this.isListening = !1)
    },
    onStart: function() {
        this.isPlaying = !0, this.hideLoader(), this.hideErrorMsg()
    },
    onStop: function() {
        this.isPlaying = !1, audioLive && "stream" == nowPlayingSource && radioplayer.playing.updateText(currentStationName, "")
    },
    onClickPause: function() {
        this.userClickedControls = !0, this.userPaused = !0
    },
    onClickPlay: function() {
        radioplayer.adswizz.enabled && radioplayer.adswizz.decorateAllStreamUrls(), this.showLoader(), this.userClickedControls = !0
    },
    onClickStop: function() {
        this.hideLoader(), this.userClickedControls = !0
    },
    onNoSupport: function() {
        if (radioplayer.utils.output("The EMP player does not support the audio format. (Varies by browser and whether Flash available.). Just tried using " + radioplayer.emp.currentPlayer), this.hideLoader(), radioplayer.emp.audioArrayInteger < window.audioArray.length - 1) radioplayer.emp.audioArrayInteger++, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady();
        else if (radioplayer.emp.audioPreference < 1) radioplayer.emp.audioPreference++, radioplayer.emp.audioArrayInteger = 0, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady();
        else if (radioplayer.emp.player.html.audioHTMLFallback) {
            var a = $.extend(!0, [], radioplayer.emp.player.html.audioHTMLFallback);
            radioplayer.emp.player.html.audioHTMLFallback = null, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime, a), radioplayer.emp.dataReady()
        } else {
            if (this.showPlay(), this.noSupportShowing) return !1;
            this.noSupportShowing = !0, radioplayer.playing.stopUpdating(), radioplayer.playing.showFailMsg(), this.showErrorMsg(radioplayer.lang.stream_error.device_incompatible), radioplayer.services.analytics.sendEvent("Error", "Device Incompatible", null, null, null)
        }
    },
    ioError: function() {
        radioplayer.emp.player.flash.ioErrorCount++, radioplayer.emp.player.flash.ioErrorTimeout && clearTimeout(radioplayer.emp.player.flash.ioErrorTimeout), radioplayer.emp.player.flash.ioErrorTimeout = setTimeout(function() {
            radioplayer.emp.player.flash.ioErrorCount = 0
        }, 6e4), radioplayer.emp.player.flash.ioErrorCount >= 3 && (radioplayer.emp.player.flash.ioErrorCount = 0, clearTimeout(radioplayer.emp.player.flash.ioErrorTimeout), radioplayer.emp.player.flash.stop(), radioplayer.emp.player.flash.cleanup(), $.proxy(this.onNoSupport, this)())
    },
    onError: function() {
        this.hideLoader(), this.showPlay(), radioplayer.emp.resetAttemptCount(), radioplayer.services.analytics.sendEvent("Error", "Stream Unavailable", rpId, null, null), this.showErrorMsg(radioplayer.lang.stream_error.unavailable)
    },
    showErrorMsg: function(a) {
        $(".radioplayer-body").append('<div class="radioplayer-erroroverlay">' + a + "</div>")
    },
    hideErrorMsg: function() {
        $(".radioplayer-erroroverlay").remove()
    },
    startPlayingInit: function(a) {
        if (vastAds && vastAds.enabled && !vastAds.shownVideo) return audioLive ? radioplayer.emp.stop() : radioplayer.emp.pause(), !1;
        $.proxy(this.hidePlay, this)(), $.proxy(this.hideLoaderOnStart, this)(), $.proxy(this.onStart, this)(), $.proxy(this.onAudible, this)(),
            this.streamHasStarted = !0
    },
    resumeInit: function(a) {
        if (vastAds && vastAds.enabled && !vastAds.shownVideo) return audioLive ? radioplayer.emp.stop() : radioplayer.emp.pause(), !1;
        this.isLive() && ($("#progress-scrubber-playback-bar").is(":visible") || $("#progress-scrubber-playback-bar").show()), $.proxy(this.hidePlay, this)(), $.proxy(this.onAudible, this)()
    },
    resumeProxy: function() {
        (this.isLive() || this.isAllLoaded || this.userPaused) && !this.noSupportShowing ? (this.userPaused = !1, $.proxy(radioplayer.emp.resume, radioplayer.emp)()) : (radioplayer.emp.audioArrayInteger = 0, radioplayer.emp.audioPreference = 0, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady())
    },
    init: function() {
        $("#controls h2").html(radioplayer.lang.controls.player_controls), $("#controls #play .accessibility-text").html(radioplayer.lang.controls.play), $("#controls #play").attr("title", radioplayer.lang.controls.play), $("#controls #pause .accessibility-text").html(radioplayer.lang.controls.pause), $("#controls #pause").attr("title", radioplayer.lang.controls.pause), $("#controls #stop .accessibility-text").html(radioplayer.lang.controls.stop), $("#controls #stop").attr("title", radioplayer.lang.controls.stop), $("#controls #duration").html(radioplayer.lang.controls.loading), $("#volume-1").html(radioplayer.lang.controls.set_volume_20), $("#volume-2").html(radioplayer.lang.controls.set_volume_40), $("#volume-3").html(radioplayer.lang.controls.set_volume_60), $("#volume-4").html(radioplayer.lang.controls.set_volume_80), $("#volume-5").html(radioplayer.lang.controls.set_volume_100), $(".loading-indicator").html(radioplayer.lang.controls.loading), $(".play-prompt-indicator").html(radioplayer.lang.controls.play_prompt), (radioplayer.consts.is_Android || radioplayer.consts.is_iOS) && $("#volume-control").addClass("disabled"), $(radioplayer.emp).on("update", $.proxy(this.onPositionUpdate, this)).on("volumeSet", $.proxy(this.onVolumeUpdate, this)).on("pausePlaying", $.proxy(this.showPlay, this)).on("ended", $.proxy(this.showPlay, this)).on("ended", $.proxy(this.onEnd, this)).on("stopped", $.proxy(this.showPlay, this)).on("cleanedup", $.proxy(this.resetDuration, this)).on("cleanedup", $.proxy(this.showLoader, this)).on("startPlaying", $.proxy(this.startPlayingInit, this)).on("resumed", $.proxy(this.resumeInit, this)).on("durationSet", $.proxy(this.setDuration, this)).on("loadProgress", $.proxy(this.onLoadProgressUpdate, this)).on("securityError", $.proxy(this.logSecurityError, this)).on("pausePlaying", $.proxy(this.onSilent, this, "pause")).on("stopped", $.proxy(this.onSilent, this, "stop")).on("ended", $.proxy(this.onSilent, this, "stop")).on("pausePlaying", $.proxy(this.onStop, this)).on("stopped", $.proxy(this.onStop, this)).on("ended", $.proxy(this.onStop, this)).on("error", $.proxy(this.onError, this)).on("noSupport", $.proxy(this.onNoSupport, this)).on("ioError", $.proxy(this.ioError, this)).on("metadata", $.proxy(radioplayer.playing.metadataReceived, this)).on("id3", $.proxy(radioplayer.playing.id3Received, this)).on("header", $.proxy(radioplayer.playing.headerReceived, this)), $("#pause").on("click", $.proxy(this.onClickPause, this)), $("#play").on("click", $.proxy(this.onClickPlay, this)), $("#stop").on("click", $.proxy(this.onClickStop, this)), $("#pause").on("click", $.proxy(radioplayer.emp.pause, radioplayer.emp)), $("#play").on("click", $.proxy(this.resumeProxy, this)), $("#stop").on("click", $.proxy(radioplayer.emp.stop, radioplayer.emp)), $("#volume-mute").on("click", $.proxy(this.mute, this)), $("#volume-1").on("click", $.proxy(this, "setVolumeTo", 20)), $("#volume-2").on("click", $.proxy(this, "setVolumeTo", 40)), $("#volume-3").on("click", $.proxy(this, "setVolumeTo", 60)), $("#volume-4").on("click", $.proxy(this, "setVolumeTo", 80)), $("#volume-5").on("click", $.proxy(this, "setVolumeTo", 100)), $("#volume-control").on("mouseenter", $.proxy(this.volumeIconMouseEnter, this)).on("mouseleave", $.proxy(this.volumeIconMouseLeave, this)).on("mousemove", $.proxy(this.volumeIconMouseMove, this)).on("mousedown", $.proxy(this.volumeIconMouseDown, this)).on("mouseup", $.proxy(this.volumeIconMouseUp, this)).on("click", $.proxy(this.volumeIconClick, this)), $("#toggle-mystations").on("click", $.proxy(this.toggleMyStations, this)), $("#progress-scrubber-handle").draggable({
            axis: "x",
            containment: "#progress-scrubber-container"
        }).on("drag", $.proxy(this.seek, this)).on("dragstart", $.proxy(this.seekStart, this)).on("dragstop", $.proxy(this.seekStop, this)), $("#progress-scrubber-background").on("click", $.proxy(this.progressBarClick, this)), $("#progress-scrubber-container").on("mouseenter", $.proxy(this.mouseEnterProgress, this)).on("mouseleave", $.proxy(this.mouseLeaveProgress, this)), (radioplayer.consts.is_iOS || radioplayer.consts.is_Android) && $("#progress-scrubber-handle").addClass("progress-scrubber-handle-on"), $("#od-strip").on("click", "button.od-skip", function() {
            var a = $(this).attr("data-offset");
            radioplayer.controls.showLoader(), radioplayer.controls.seekOffset(a)
        }), $(document).bind("contextmenu", function(a) {
            radioplayer.utils.output("version:" + radioplayer.emp.getVersion())
        })
    }
}, radioplayer.overlay = {
    inactivityTimer: null,
    inactivityCount: 45e3,
    scrollSettleTimer: null,
    openedOnce: !1,
    inViewThreshold: 100,
    detectScrolling: !0,
    tabShowingName: "",
    azDivideHeight: 0,
    requestFailTimer: null,
    requestFailed: !1,
    currentDivideLetter: null,
    init: function() {
        radioplayer.objs.overlayContainer = $(".overlay-container"), $(".radioplayer").on("click", ".menu-btn", function(a) {
            if (a.preventDefault(), radioplayer.services.alerts.cookies.showing) return !1;
            radioplayer.objs.overlayContainer.is(":visible") ? (radioplayer.overlay.hide(), radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "Close Menu Button", null, null)) : (radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "Menu button", null, null), radioplayer.overlay.show(radioplayer.lang.general.close_menu), radioplayer.objs.body.addClass("showing-menu"), radioplayer.overlay.openedOnce ? ($prevSelTab = $(".menu-container .tabs li.on"), $prevSelTab.removeClass("on"), radioplayer.overlay.selectTab($prevSelTab)) : (radioplayer.overlay.openedOnce = !0, radioplayer.settings.presets.length > 0 ? radioplayer.overlay.selectTab($(".menu-container .tabs li:eq(0)")) : radioplayer.overlay.selectTab($(".menu-container .tabs li:eq(3)"))))
        }).on("click", ".tabs li a", function(a) {
            a.preventDefault(), radioplayer.overlay.selectTab($(this).parent())
        }).on("click", "#station-logo-link", function(a) {
            if (radioplayer.objs.body.hasClass("showing-overlay")) return a.preventDefault(), radioplayer.overlay.hide(), !1
        }), radioplayer.objs.body.on("keyup", function(a) {
            27 == a.which && radioplayer.objs.body.hasClass("showing-overlay") && radioplayer.overlay.hide()
        }), radioplayer.objs.overlayContainer.on("click", ".menu-container .alphabet li a", function(a) {
            a.preventDefault();
            var b, c = $(this),
                d = c.parent();
            tabIndex = $(".menu-container .alphabet li").index(d), letter = c.html(), radioplayer.utils.output("clicked letter " + letter), $(this).parent("li").parent("ul").hasClass("alphabet--minimised") ? (letter = "0" === letter[0] ? "#" : letter[0].toLowerCase(), b = "#" === letter ? "num" : letter) : (letter = letter.toLowerCase(), b = "#" === letter ? "num" : letter), radioplayer.overlay.detectScrolling = !1, $("#azlist-container").scrollTo("#letter-divide-" + b, {
                axis: "y",
                duration: 500,
                onAfter: function() {
                    radioplayer.overlay.detectScrolling = !0, radioplayer.overlay.lazyLoad($("#azlist-container")), $("#azlist-container").data("scrollpos", $("#azlist-container").scrollTop())
                }
            }), d.hasClass("on") || ($(".menu-container .alphabet li").removeClass("on"), d.addClass("on"), radioplayer.services.saveCookie("stationlistprefix/s", "stationlistprefix", letter))
        }).on("click", ".toggle-mystations button:not(.animating)", function(a) {
            a.preventDefault();
            var b = $(this).parent(),
                c = b.parents(".overlay-item"),
                d = c.data("stationid"),
                e = c.parent().attr("id");
            c.hasClass("in-mystations") ? radioplayer.mystations.remove(d, e, b) : radioplayer.mystations.add(d, e, b)
        }).on("click", ".more-toggle", function(a) {
            a.preventDefault();
            var b = $(this).parent().parent();
            if (b.hasClass("expanded")) b.removeClass("expanded").prev().removeClass("prevExpanded"), b.children(".overlay-item-extra-cont").slideUp(250), $(this).attr("title", radioplayer.lang.search.show_information).html("<span>" + radioplayer.lang.search.show_information + "</span>"), $.browser.msie && 7 == $.browser.version && b.next().hide().show();
            else {
                radioplayer.overlay.collapseResult(), b.addClass("expanded").prev().addClass("prevExpanded");
                var c = b.is(":last-child");
                b.children(".overlay-item-extra-cont").slideDown(250, function() {
                    c && b.parent().scrollTo("100%", {
                        axis: "y",
                        duration: 200
                    })
                }), $(this).attr("title", radioplayer.lang.search.hide_information).html("<span>" + radioplayer.lang.search.hide_information + "</span>")
            }
        }).on("click", ".overlay-item-link", function(a) {
            a.preventDefault();
            var b = $(this).parents(".overlay-item").data("section"),
                c = "",
                d = $(this).parents(".overlay-item").data("stationid"),
                e = $(this).attr("href");
            "recommend" == b ? c = "Recommended" : "history" == b ? c = "Recent Menu" : "az" == b ? (c = "A-Z Menu", e += (e.indexOf("?") > 0 ? "&" : "?") + "stationletterprefix=" + $(this).data("letter")) : "search" == b ? c = "search" : "mystations" == b && (c = "Favourites"), radioplayer.overlay.sidewaysNavigate(c, d, e)
        }), $(".menu-container .tabs ul li").eq(0).find("a span").html(radioplayer.lang.menu_tabs.tab_1_text), $(".menu-container .tabs ul li").eq(1).find("a span").html(radioplayer.lang.menu_tabs.tab_2_text), $(".menu-container .tabs ul li").eq(2).find("a span").html(radioplayer.lang.menu_tabs.tab_3_text), $(".menu-container .tabs ul li").eq(3).find("a span").html(radioplayer.lang.menu_tabs.tab_4_text), radioplayer.overlay.resizeMenuTabs()
    },
    resizeMenuTabs: function() {
        if (!radioplayer.consts.reduced_func) {
            var a = $(".menu-container .tabs ul li").length;
            if (a) {
                for (var b = radioplayer.utils.getViewportWidth(), c = radioplayer.lang.menu_tabs.sizing.length, d = !1, e = 0; e < c; e++)
                    if (b <= radioplayer.lang.menu_tabs.sizing[e].maxViewport) {
                        d = !0;
                        for (var f = 0, g = 0; g < a; g++) {
                            var h;
                            if ("manual" === radioplayer.lang.menu_tabs.sizing[e].mode)
                                if (g === a - 1) var i = 100 - f,
                                    h = i + "%";
                                else {
                                    var i = Math.floor(radioplayer.lang.menu_tabs.sizing[e].tabSizes[g] / radioplayer.lang.menu_tabs.sizing[e].maxViewport * 100);
                                    f = Math.floor(f + i);
                                    var h = i + "%"
                                }
                            else h = "25%";
                            $(".menu-container .tabs ul li").eq(g).css("width", h)
                        }
                        break
                    } if (d) return !1;
                for (var g = 0; g < a; g++) $(".menu-container .tabs ul li").eq(g).css("width", "25%")
            }
        }
    },
    sidewaysNavigate: function(a, b, c) {
        "search" == a ? radioplayer.services.analytics.sendEvent("Search", "Full Search", b.toString(), null, null) : radioplayer.services.analytics.sendEvent("Navigation", a, b.toString(), null, null), setTimeout(function() {
            window.location.href = c
        }, 100)
    },
    show: function(a) {
        var b = !1;
        radioplayer.mystations.menuBtnNotificationTimeout && (clearTimeout(radioplayer.mystations.menuBtnNotificationTimeout), $(".menu-btn-notification").removeClass("menu-btn-notification--active")), radioplayer.mystations.menuBtnNotificationTimeoutSub && clearTimeout(radioplayer.mystations.menuBtnNotificationTimeoutSub), radioplayer.objs.body.hasClass("showing-overlay") && (b = !0, radioplayer.objs.body.removeClass("showing-menu showing-search showing-suggest"), radioplayer.overlay.hidingTab()), radioplayer.objs.body.addClass("showing-overlay"), $(".radioplayer-globalnav .menu-btn").attr("title", a).find(".menu-btn-accessible").html(a), $(".radioplayer-globalnav .menu-btn-icon").addClass("icon-chevron-left"), $("#station-logo-link").attr("title", a), clearTimeout(radioplayer.inactivityTimer), radioplayer.inactivityTimer = setTimeout(radioplayer.overlay.hide, radioplayer.overlay.inactivityCount), radioplayer.playing.stopUpdating(), b || (radioplayer.objs.overlayContainer.on("click.activity", function() {
            radioplayer.overlay.resetInactivity()
        }), radioplayer.objs.overlayContainer.find(".scrollable-wrapper").on("scroll.scroll-overlays", function() {
            if (radioplayer.overlay.detectScrolling) {
                var a = $(this);
                a.data("scrollpos", a.scrollTop()), clearTimeout(radioplayer.overlay.scrollSettleTimer), radioplayer.overlay.scrollSettleTimer = setTimeout(function() {
                    radioplayer.overlay.lazyLoad(a), radioplayer.overlay.resetInactivity(), radioplayer.overlay.currentDivideLetter && radioplayer.services.saveCookie("stationlistprefix/s", "stationlistprefix", radioplayer.overlay.currentDivideLetter)
                }, 250)
            }
        }))
    },
    hide: function() {
        radioplayer.objs.overlayContainer.off("click.activity"), radioplayer.objs.overlayContainer.find(".scrollable-wrapper").off("scroll.scroll-overlays"), $.browser.msie && 7 == $.browser.version && radioplayer.objs.body.hasClass("showing-search") && radioplayer.objs.searchContainer.find(".tab-container").html("").removeClass("loaded has-error"), radioplayer.objs.body.removeClass("showing-menu showing-search showing-suggest showing-overlay"), $(".radioplayer-globalnav .menu-btn").attr("title", radioplayer.lang.general.open_menu).find(".menu-btn-accessible").html(radioplayer.lang.general.open_menu), $(".radioplayer-globalnav .menu-btn-icon").removeClass("icon-chevron-left"), $("#station-logo-link").removeAttr("title"), clearTimeout(radioplayer.inactivityTimer), radioplayer.playing.startUpdating(), $("#search-clear").is(":visible") && ($("#search-clear").hide(), $("#search-button").show()), radioplayer.overlay.hidingTab(), $.browser.msie && 7 == $.browser.version && $(".radioplayer-body").hide().show()
    },
    resetInactivity: function() {
        clearTimeout(radioplayer.inactivityTimer), radioplayer.inactivityTimer = setTimeout(radioplayer.overlay.hide, radioplayer.overlay.inactivityCount)
    },
    lazyLoad: function(a) {
        var b = a.scrollTop(),
            c = a.height(),
            d = a.scrollTop() + c + this.inViewThreshold,
            e = [];
        if (a.find(".overlay-item.not-loaded-img").each(function(a, c) {
                $overlayItem = $(this);
                var f = b + $overlayItem.position().top,
                    g = b + $overlayItem.position().top + $overlayItem.outerHeight();
                if (f < d && f >= b || g > b && g < d) {
                    $overlayItem.removeClass("not-loaded-img");
                    var h = $overlayItem.find(".overlay-item-img img");
                    h.data("src") && h.attr("src", h.data("src")).removeAttr("data-src"), $overlayItem.hasClass("not-loaded-meta") && !$overlayItem.hasClass("checking-for-meta") && (e.push($overlayItem.attr("data-stationid")), $overlayItem.removeClass("not-loaded-meta").addClass("checking-for-meta"))
                }
            }), e.length > 0) {
            var f = e.join(",");
            radioplayer.services.getAPI(radioplayer.consts.api.onAir + "?rpIds=" + f + "&descriptionSize=70&callback=radioplayer.overlay.receiveStnNowInfo")
        }
    },
    selectTab: function(a) {
        var b = a.data("content"),
            c = a.parent(),
            d = c.children().index(a),
            e = c.parent(),
            f = e.next(),
            g = f.children(".tab-container");
        if (!a.hasClass("on")) {
            c.children("li").removeClass("on no-divide"), a.addClass("on").next().addClass("no-divide"), g.removeClass("showing");
            var h = g.eq(d);
            h.addClass("showing"), e.css("border-bottom-color", a.data("color")), this.hideMenuSpinner(), "" != radioplayer.overlay.tabShowingName && this.hidingTab(), this.showingTab(b, h)
        }
    },
    showingTab: function(a, b) {
        this.tabShowingName = a, "azlist" == a ? (radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "A - Z List", null, null), b.hasClass("loaded") ? $.browser.msie && $("#azlist-container").scrollTop($("#azlist-container").data("scrollpos")) : (b.addClass("loaded"), radioplayer.overlay.requestAZList())) : "mystations" == a ? (radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "My Stations", null, null), b.hasClass("loaded") || (b.addClass("loaded"), radioplayer.mystations.populateList(radioplayer.settings.presets, "mystations"))) : "history" == a ? (radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "Recent", null, null), b.hasClass("loaded") || (b.addClass("loaded"), radioplayer.mystations.populateList(radioplayer.settings.history, "history"))) : "recommended" == a ? (b.removeClass("has-error"), radioplayer.overlay.requestRecommend(), radioplayer.services.analytics.sendEvent("Navigation", "Main Menu", "Recommended", null, null)) : "searchlive" != a || b.hasClass("loaded") ? "searchod" != a || b.hasClass("loaded") || (b.addClass("loaded"), radioplayer.search.tabRequest("od")) : (b.addClass("loaded"), radioplayer.search.tabRequest("live"))
    },
    hidingTab: function() {
        radioplayer.utils.output("hiding tab " + radioplayer.overlay.tabShowingName), "mystations" == radioplayer.overlay.tabShowingName && radioplayer.mystations.purgeRemovedMyStations(), radioplayer.overlay.tabShowingName = ""
    },
    showMenuSpinner: function() {
        $(".menu-container .tabs-wrapper .spinner").show()
    },
    hideMenuSpinner: function() {
        $(".menu-container .tabs-wrapper .spinner").hide()
    },
    requestAZList: function() {
        this.showMenuSpinner(), this.requestFailed = !1, this.requestFailTimer = setTimeout(function() {
            radioplayer.overlay.showFailMsg("azlist")
        }, 15e3), radioplayer.services.getAPI(radioplayer.consts.api.az + "/?callback=radioplayer.overlay.receiveAZList")
    },
    highlightMinimisedAlphabetTab: function(a) {
        if ("num" === a) $("#letter-min-" + a).addClass("on");
        else
            for (var b = radioplayer.lang.azlist.alphabet_minimised_array, c = b.length, d = 0; d < c; d++)
                if ($.inArray(a, b[d].letters) > -1) {
                    $("#letter-min-" + b[d].displayText[0]).addClass("on");
                    break
                }
    },
    receiveAZList: function(a) {
        if (clearTimeout(this.requestFailTimer), !this.requestFailed) {
            var b = radioplayer.lang.azlist.alphabet_array,
                c = radioplayer.lang.azlist.alphabet_minimised_array,
                d = '<h2 class="access">' + radioplayer.lang.menu_tabs.tab_4_text + "</h2>",
                e = [];
            $.each(b, function(b, c) {
                var f = c.toUpperCase();
                if (a.stations[c]) {
                    d += '<div class="letter-divide" data-letter="' + f + '" id="letter-divide-' + ("#" == c ? "num" : c) + '">' + f + "</div>", e.push(c);
                    var g = a.stations[c];
                    d += radioplayer.overlay.iterateResults(g, "az", c)
                } else d += '<div class="letter-divide" data-letter="' + f + '" id="letter-divide-' + ("#" == c ? "num" : c) + '">' + f + '</div><div class="no-stations-item">' + radioplayer.lang.azlist.no_stations + "</div>"
            });
            var f = "",
                g = "",
                h = !1,
                i = "";
            $.each(b, function(a, b) {
                h = e.indexOf(b) > -1, i = h ? radioplayer.lang.azlist.view_stations_beginning : radioplayer.lang.azlist.no_stations_beginning, i = i.replace("{letter}", "#" == b ? radioplayer.lang.azlist.a_number : b.toUpperCase()), f += '<li id="letter-' + ("#" == b ? "num" : b) + '" class="' + (h ? "" : "no-stations") + '"><a href="#" title="' + i + '">' + b.toUpperCase() + "</a></li>"
            }), $.each(c, function(a, b) {
                i = radioplayer.lang.azlist.view_stations_from, i += b.displayText.replace("-", " to ");
                var c = "0" === b.displayText[0] ? "num" : b.displayText[0];
                g += '<li id="letter-min-' + c + '"><a href="#" title="' + i + '">' + b.displayText.toUpperCase() + "</a></li>"
            }), this.hideMenuSpinner(), $(".alphabet ul.alphabet--regular").html(f), $(".alphabet ul.alphabet--minimised").html(g), $("#azlist-container").html(d), $.browser.msie && 7 == $.browser.version ? $(".sticky-divide").remove() : (radioplayer.objs.stickyLetterDivide = $(".sticky-divide"), radioplayer.objs.stickyLetterDivide.css({
                display: "block",
                width: $("#letter-divide-num").width() + "px"
            }), $(window).on("resize", function() {
                radioplayer.objs.stickyLetterDivide.css({
                    width: $("#letter-divide-num").width() + "px"
                })
            }), this.azDivideHeight = radioplayer.objs.stickyLetterDivide.outerHeight(), $("#azlist-container").on("scroll.update-sticky-divide", function() {
                radioplayer.overlay.updateStickyDivide($(this))
            }));
            var j = !1;
            if ("" != radioplayer.settings.stationlistprefix) var k = "#" === radioplayer.settings.stationlistprefix ? "num" : radioplayer.settings.stationlistprefix;
            else {
                j = !0;
                var l = currentStationName.substr(0, 1).toLowerCase(),
                    k = "#" === l ? "num" : l
            }
            radioplayer.utils.output("we have the letter " + k), radioplayer.overlay.currentDivideLetter = k, this.detectScrolling = !1, setTimeout(function() {
                $("#azlist-container").scrollTo("#letter-divide-" + k, {
                    axis: "y",
                    duration: 10,
                    onAfter: function() {
                        radioplayer.utils.output("completed initial scroll"), radioplayer.overlay.detectScrolling = !0
                    }
                })
            }, 100), $("#letter-" + k).addClass("on"), radioplayer.overlay.highlightMinimisedAlphabetTab(k), j && radioplayer.services.saveCookie("stationlistprefix/s", "stationlistprefix", l)
        }
    },
    updateStickyDivide: function(a) {
        var b = a.scrollTop(),
            c = !1,
            d = "";
        a.find(".letter-divide").each(function(a, e) {
            $divideItem = $(this);
            var f = b + $divideItem.position().top;
            $divideItem.position().top, $divideItem.outerHeight();
            if (f <= b) d = $divideItem.data("letter");
            else if (!c)
                if (c = !0, f < b + radioplayer.overlay.azDivideHeight) {
                    var g = $divideItem.position().top;
                    radioplayer.objs.stickyLetterDivide.css("top", "-" + (radioplayer.overlay.azDivideHeight - g) + "px")
                } else radioplayer.objs.stickyLetterDivide.css("top", "0")
        }), radioplayer.overlay.currentDivideLetter = d.toLowerCase(), radioplayer.objs.stickyLetterDivide.html(d)
    },
    requestRecommend: function() {
        $("#recom-container").html(""), this.showMenuSpinner(), this.requestFailed = !1, this.requestFailTimer = setTimeout(function() {
            radioplayer.overlay.showFailMsg("recom")
        }, 15e3);
        var a = "?callback=radioplayer.overlay.receiveRecommend&locale=" + radioplayer.lang.recommendations.locale;
        radioplayer.settings.history.length > 0 && (a += "&historyRpIds=" + radioplayer.settings.history.join(",")), radioplayer.settings.presets.length > 0 && (a += "&presetRpIds=" + radioplayer.settings.presets.join(",")), "" != radioplayer.settings.guid && (a += "&guid=" + radioplayer.settings.guid), radioplayer.services.getAPI(radioplayer.consts.api.recommend + a)
    },
    receiveRecommend: function(a) {
        if (clearTimeout(this.requestFailTimer), !this.requestFailed) {
            var b = '<h2 class="access">' + radioplayer.lang.menu_tabs.tab_3_text + "</h2>" + this.iterateResults(a.recommendations, "recommend");
            this.hideMenuSpinner(), $("#recom-container").html(b), this.lazyLoad($("#recom-container"))
        }
    },
    showFailMsg: function(a) {
        this.requestFailed = !0, this.hideMenuSpinner();
        var b = '<div class="error-message fail">' + radioplayer.lang.general.fail_message + "</div>";
        $("#" + a + "-container").addClass("has-error").html(b), radioplayer.services.analytics.sendEvent("Errors", "Failed Message", a, null, null)
    },
    iterateResults: function(a, b, c) {
        var d = "",
            e = new Date,
            f = Math.round(.001 * e.getTime());
        return $.each(a, function(a, e) {
            if ("search" == b && e.results[2]) d += '<div data-brand="' + e.groupID + '" class="station-group collapsed">', $.each(e.results, function(a, c) {
                var g = radioplayer.overlay.oneResult(b, c, a, e.groupID, f);
                d += (2 == a ? '<div class="station-group-hidden">' : "") + g
            }), d += "</div></div>";
            else {
                if ("search" == b) var g = radioplayer.overlay.oneResult(b, e.results[1], 0, "", f);
                else if ("az" == b) var g = radioplayer.overlay.oneResult(b, e, 0, "", f, c);
                else var g = radioplayer.overlay.oneResult(b, e, 0, "", f);
                d += g
            }
        }), d
    },
    oneResult: function(a, b, c, d, e, f) {
        var g = b.rpId,
            h = b.imageUrl ? b.imageUrl : radioplayer.consts.assetBaseUrl + "img/result-placeholder.png",
            i = b.serviceName,
            j = "",
            k = "",
            l = "SI",
            m = b.consoleUrl,
            n = null,
            o = !0;
        "search" == a ? (j = radioplayer.overlay.getSubtitle(b), k = b.description, l = b.type, n = radioplayer.overlay.calculateStationStatus(b, e)) : "recommend" == a ? (j = "ONDEMAND" == b.type ? b.name : "", k = b.description ? b.description : "", l = "SERVICE" == b.type ? "SI" : "OD", n = radioplayer.overlay.calculateStationStatus(b, e)) : "mystations" != a && "history" != a && "az" != a || (n = {
            stationType: radioplayer.lang.search.live,
            timeToBroadcast: ""
        }, o = !1);
        var p = "SI" == l || "PI" == l || "PE_E" == l || "PI_E" == l,
            q = p ? "not-loaded-meta" : "",
            r = "",
            s = "";
        p && !radioplayer.consts.reduced_func && (-1 != $.inArray(b.rpId, radioplayer.settings.presets) ? (r = "in-mystations", s = '<span class="toggle-mystations" title="' + radioplayer.lang.mystations.remove_this + '">                            <button type="button" title="' + radioplayer.lang.mystations.remove_this + '" class="heart-container">                            \t\t<span class="heart-container-ie8"></span>                                <span class="accessibility-text">' + radioplayer.lang.mystations.remove_this + '</span>                                <span class="icon-heart">                                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span>                                </span>                            </button>                        </span>') : s = '<span class="toggle-mystations" title="' + radioplayer.lang.mystations.add_this + '">                            <button type="button" title="' + radioplayer.lang.mystations.add_this + '" class="heart-container">                            \t\t<span class="heart-container-ie8"></span>                                 <span class="accessibility-text">' + radioplayer.lang.mystations.add_this + '</span>                                <span class="icon-heart">                                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span>                                </span>                            </button>                        </span>');
        var t = radioplayer.lang.search.show_more_stations,
            t = t.replace("{group}", d);
        if ("recommend" == a) var u = b.factors.join(", ");
        var v = '<div href="' + m + '"' + ("az" == a ? ' data-letter="' + f + '"' : "") + ' data-stationid="' + g + '" data-type="' + l + '" data-statustype="' + n.stationType + '" data-section="' + a + '" class="overlay-item ' + l + " " + r + " not-loaded-img " + q + '"><div class="overlay-item-initial ' + ("recommend" == a ? "overlay-item-rec" : "") + '"><a class="overlay-item-link" href="' + m + '"' + ("az" == a ? ' data-letter="' + f + '"' : "") + '><span class="overlay-item-img"><span class="play-icon"></span><img src="' + radioplayer.consts.assetBaseUrl + 'img/result-placeholder.png" data-src="' + h + '" width="86" height="48" alt="" /></span><span class="title">' + i + '</span></a><p class="' + ("OD" == l || "PI_OD" == l ? "programme-title" : "subtitle") + ' truncate">' + j + '</p><p class="description">' + k + "</p>" + (o ? '<p class="broadcast-info"><span class="status">' + n.stationType + '</span> <span class="broadcast-time">' + n.timeToBroadcast + "</span> " + ("recommend" == a ? '<span class="recommend-factors"><span class="icon-tag"></span>' + u + "</span>" : "") + "</p>" : "") + s + "</div>";
        return v += (1 == c ? '<a href="#" class="station-group-toggle" role="button"><i></i>' + t + "</a>" : "") + "</div>"
    },
    receiveStnNowInfo: function(a) {
        "SUCCESS" == a.responseStatus && a.total > 0 && ($.each(a.results, function(a, b) {
            radioplayer.objs.overlayContainer.find(".overlay-item.checking-for-meta[data-stationid='" + a + "']").each(function(a, c) {
                $overlayItem = $(c), $overlayItem.removeClass("checking-for-meta");
                var d, e = 1,
                    f = [],
                    g = [],
                    h = [],
                    i = [],
                    j = [],
                    k = $overlayItem.attr("data-type"),
                    l = $.inArray($overlayItem.data("section"), ["mystations", "history", "recommend", "az"]) > -1,
                    m = "",
                    n = "",
                    o = "";
                h[0] = $(".overlay-item-initial .overlay-item-img img", c).attr("src"), i[0] = $(".overlay-item-initial .overlay-item-data .description", c).html(), j[0] = k;
                var p = $(".overlay-item-initial .overlay-item-link", c).attr("href");
                if ($.each(b, function(a, b) {
                        "SI" != b.type || "mystations" != $overlayItem.data("section") && "history" != $overlayItem.data("section") || ($overlayItem.find(".overlay-item-img img").attr("src", b.imageUrl), $overlayItem.find(".title").html(b.serviceName)), $.inArray(b.type, ["SI", "PI", "PE_E", "PI_E"]) > -1 && (d = radioplayer.overlay.getSubtitle(b), b.type != k && (-1 != $.inArray(b.imageUrl, h) ? b.imageUrl = "" : h[e] = b.imageUrl, -1 != $.inArray(b.description, i) ? b.description = "" : i[e] = b.description, j[e] = b.type, (d || b.description) && (!b.song || "PE_E" != b.type && "PI_E" != b.type ? (f.push('<div class="overlay-item-extra' + (b.imageUrl ? " hasImage" : "") + ("recommend" !== $overlayItem.data("section") && 0 == f.length ? " no-top-border" : "") + '">' + (b.imageUrl ? '<a class="overlay-item-link" href="' + p + '"><span class="overlay-item-img"><span class="play-icon"></span><img width="86" height="48" alt="" src="' + b.imageUrl + '"></span></a>' : "") + '<div class="overlay-item-data"><p class="subtitle">' + d + '</p><p class="description">' + b.description + "</p></div></div>"), g.push(b.type)) : (f.push('<div class="overlay-item-song' + ("recommend" !== $overlayItem.data("section") && 0 == f.length ? " no-top-border" : "") + '"><i></i>' + d + "</div>"), g.push("song"))), e++), l && (d || b.description) && (!b.song || "PE_E" != b.type && "PI_E" != b.type ? "PE_E" == b.type || "PI_E" == b.type ? "song" != m && (m = b.type, n = d, o = b.description) : "PI" == b.type ? -1 == $.inArray(m, ["song", "PE_E", "PI_E"]) && (m = b.type, n = d, o = b.description) : "SI" == b.type && -1 == $.inArray(m, ["song", "PE_E", "PI_E", "PI"]) && (m = b.type, n = d, o = b.description) : (m = "song", n = d, o = b.description)))
                    }), "" != m && ($overlayItem.find(".overlay-item-initial .subtitle").html(n), $overlayItem.find(".overlay-item-initial .description").html(o), "song" == m && $overlayItem.find(".overlay-item-initial .subtitle").removeClass("truncate"), f.length > 0)) {
                    var q = $.inArray(m, g);
                    q > -1 && f.splice(q, 1)
                }
                $overlayItem.addClass("no-meta-available")
            })
        }), "az" == $overlayItem.data("section") && ($.browser.msie && 7 == $.browser.version || radioplayer.overlay.updateStickyDivide($("#azlist-container"))))
    },
    collapseResult: function() {
        if (1 == radioplayer.objs.overlayContainer.find(".overlay-item.expanded").length) {
            var a = radioplayer.objs.overlayContainer.find(".overlay-item.expanded");
            a.children(".overlay-item-extra-cont").slideUp(250, function() {
                $(this).hide()
            }), a.find(".more-toggle").attr("title", radioplayer.lang.search.show_information).html("<span>" + radioplayer.lang.search.show_information + "</span>"), a.removeClass("expanded").prev().removeClass("prevExpanded")
        }
    },
    calculateStationStatus: function(a, b) {
        var c = {},
            d = null,
            e = null;
        if (a.startTime && "" != a.startTime && a.stopTime && "" != a.stopTime && (d = a.startTime - b, e = a.stopTime - b), a.startTime && "" != a.startTime && d > 0) c.stationType = radioplayer.lang.search.coming_up, c.timeToBroadcast = this.getTimeBeforeBroadcast(d);
        else if (a.stopTime && "" != a.stopTime && e < 0) {
            c.stationType = radioplayer.lang.search.broadcast;
            var f = b - a.stopTime;
            c.timeToBroadcast = this.getTimePastSinceBroadcast(f)
        } else a.odStartTime && "" != a.odStartTime ? (c.stationType = radioplayer.lang.search.broadcast, c.timeToBroadcast = "") : (c.stationType = radioplayer.lang.search.live, c.timeToBroadcast = "");
        return c
    },
    divideAndRound: function(a, b) {
        return timeReturned = a / b, timeReturned >= 1 ? (timeReturned = Math.round(timeReturned), timeReturned) : 1
    },
    getTimeBeforeBroadcast: function(a) {
        var b = a / 60;
        if (0 == (b = Math.round(b))) return " " + radioplayer.lang.search.in_seconds;
        if (1 == b) return " " + radioplayer.lang.search.in_minute;
        var c = radioplayer.lang.search.in_minutes;
        return " " + (c = c.replace("{n}", b))
    },
    getTimePastSinceBroadcast: function(a) {
        var b, c, d, e, f, g, h;
        if (c = 31556926, d = 2629743, e = 604800, f = 86400, g = 3600, h = 60, a >= e) {
            if (a >= c) {
                if (b = this.divideAndRound(a, c)) return this.getTimePastString(b, radioplayer.lang.search.year_ago, radioplayer.lang.search.years_ago)
            } else if (a >= d) {
                if (b = this.divideAndRound(a, d)) return this.getTimePastString(b, radioplayer.lang.search.month_ago, radioplayer.lang.search.months_ago)
            } else if (a >= e && (b = this.divideAndRound(a, e))) return this.getTimePastString(b, radioplayer.lang.search.week_ago, radioplayer.lang.search.weeks_ago)
        } else if (a >= f) {
            if (b = this.divideAndRound(a, f)) return this.getTimePastString(b, radioplayer.lang.search.day_ago, radioplayer.lang.search.days_ago)
        } else if (a >= g) {
            if (b = this.divideAndRound(a, g)) return this.getTimePastString(b, radioplayer.lang.search.hour_ago, radioplayer.lang.search.hours_ago)
        } else if (a >= h && (b = this.divideAndRound(a, h))) return this.getTimePastString(b, radioplayer.lang.search.minute_ago, radioplayer.lang.search.minutes_ago);
        return this.getTimePastString(a, radioplayer.lang.search.second_ago, radioplayer.lang.search.seconds_ago)
    },
    getTimePastString: function(a, b, c) {
        return 1 == a ? b : c = c.replace("{n}", a)
    },
    getSubtitle: function(a) {
        return "PE_E" != a.type && "PI_E" != a.type || !a.artistName ? a.name : a.artistName + " - " + a.name
    }
}, radioplayer.playing = {
    requestFailTimer: null,
    requestPlayingSecs: 8e3,
    requestPlayingTimer: null,
    requestPlayingSecs_Song: 15e4,
    showingPlayingType: "",
    showingText: "",
    playingArtist: "",
    playingTitle: "",
    animateEasing: "swing",
    pxPerSecond: 90,
    scrollingContainerWidth: 0,
    scrollTimeout: null,
    scrollDirection: "l",
    endPos: 0,
    nowPlayingStripWidth: 0,
    nowPlayingID3: "",
    receivedStreamData: !1,
    songAction: null,
    terminateUpdating: !1,
    windowHasFocus: !0,
    nowNextToggleTiming: 7e3,
    init: function() {
        radioplayer.objs.nowPlayingStrip = $(".now-playing-strip"), radioplayer.objs.scrollingContainer = $(".scrolling-container"), radioplayer.objs.scrollerText = {
            now: $(".scrolling-text-now"),
            next: $(".scrolling-text-next")
        }, radioplayer.playing.isScrolling = "next", $("#live-strip .live-indicator").html(radioplayer.lang.playing.live), this.nowPlayingStripWidth = radioplayer.objs.nowPlayingStrip.width() - 20, radioplayer.objs.scrollingContainer.on("mouseenter.start-scroller", function() {
            radioplayer.objs.nowPlayingStrip.addClass("mouse-over"), radioplayer.playing.startScrolling()
        }).on("mouseleave.reset-scroller", function() {
            radioplayer.playing.resetScroller(!0)
        }).on("focus", function() {
            radioplayer.mouseActive || radioplayer.objs.scrollingContainer.trigger("mouseenter.start-scroller")
        }).on("blur", function() {
            radioplayer.mouseActive || radioplayer.objs.scrollingContainer.trigger("mouseleave.reset-scroller")
        }), $(window).on("blur", function() {
            radioplayer.playing.windowHasFocus && (radioplayer.playing.windowHasFocus = !1, radioplayer.playing.stopUpdating())
        }).on("focus", function() {
            radioplayer.playing.windowHasFocus || (radioplayer.playing.windowHasFocus = !0, !radioplayer.objs.body.hasClass("showing-overlay") && audioLive && radioplayer.playing.startUpdating())
        }), $(radioplayer.services).on("gotSongAction", function() {
            "" != radioplayer.playing.showingText && (radioplayer.utils.output("update text late with song action"), radioplayer.playing.updateText(radioplayer.playing.showingText, radioplayer.playing.showingPlayingType))
        }), this.startUpdating()
    },
    startUpdating: function() {
        audioLive && "stream" != nowPlayingSource && (this.requestFailTimer = setTimeout(function() {
            radioplayer.playing.showFailMsg(), nowPlayingSource = "stream"
        }, 1e3), this.requestPlaying(), radioplayer.playing.artist_next && (clearTimeout(radioplayer.playing.nowNextToggleTimeout), radioplayer.playing.nowNextToggleTimeout = setTimeout(radioplayer.playing.toggleNowNext, radioplayer.playing.nowNextToggleTiming)))
    },
    stopUpdating: function(a) {
        void 0 !== a && 1 == a && (this.terminateUpdating = !0), clearTimeout(this.requestPlayingTimer), clearTimeout(this.requestFailTimer), clearTimeout(this.nowNextToggleTimeout), this.showingPlayingType = "", this.showingText = ""
    },
    startScrolling: function() {
        if (clearTimeout(radioplayer.playing.nowNextToggleTimeout), clearTimeout(radioplayer.playing.scrollTimeout), $(".scrolling-text").hasClass("scrolling-text--showing-next") ? radioplayer.playing.isScrolling = "next" : radioplayer.playing.isScrolling = "now", $.browser.msie && 7 == $.browser.version) {
            $tempObj = $('<div style="position:absolute;top:-999px;font-size:11px;">' + radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").html() + "</div>"), radioplayer.objs.body.append($tempObj);
            var a = $tempObj.outerWidth();
            $tempObj.remove()
        } else var a = radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").outerWidth();
        this.nowPlayingStripWidth = radioplayer.objs.nowPlayingStrip.width() - 20, this.scrollingContainerWidth = this.nowPlayingStripWidth - radioplayer.lang.playing.live_width, $(".song-action--" + radioplayer.playing.isScrolling).length && (this.scrollingContainerWidth -= $(".song-action--" + radioplayer.playing.isScrolling).outerWidth() + 5), a > this.scrollingContainerWidth && (this.endPos = a - this.scrollingContainerWidth + 10, this.nextScroll())
    },
    nextScroll: function() {
        var a = radioplayer.playing.calcDuraToAnimate(radioplayer.playing.endPos);
        "l" == radioplayer.playing.scrollDirection ? (radioplayer.utils.output("animate to the left"), radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").animate({
            left: "-" + radioplayer.playing.endPos + "px"
        }, a, radioplayer.playing.animateEasing), radioplayer.playing.scrollDirection = "r", radioplayer.playing.scrollTimeout = setTimeout(radioplayer.playing.nextScroll, a + 3e3)) : (radioplayer.utils.output("animate to the right (and reset)"), radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").animate({
            left: "0"
        }, a, radioplayer.playing.animateEasing, function() {
            radioplayer.objs.nowPlayingStrip.removeClass("mouse-over")
        }), radioplayer.playing.scrollDirection = "l")
    },
    resetScroller: function(a) {
        if (radioplayer.utils.output("reset the scroller"), clearTimeout(radioplayer.playing.scrollTimeout), this.scrollDirection = "l", a) {
            var b = this.calcDuraToAnimate(4 - radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").position().left);
            radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").stop(!0).animate({
                left: "0"
            }, b, radioplayer.playing.animateEasing, function() {
                radioplayer.objs.nowPlayingStrip.removeClass("mouse-over"), radioplayer.playing.artist_next && (clearTimeout(radioplayer.playing.nowNextToggleTimeout), radioplayer.playing.nowNextToggleTimeout = setTimeout(radioplayer.playing.toggleNowNext, radioplayer.playing.nowNextToggleTiming))
            })
        } else radioplayer.objs.scrollerText[radioplayer.playing.isScrolling].children(".song-text").stop(!0).css({
            left: "0"
        }), radioplayer.objs.nowPlayingStrip.removeClass("mouse-over"), radioplayer.playing.artist_next && (clearTimeout(radioplayer.playing.nowNextToggleTimeout), radioplayer.playing.nowNextToggleTimeout = setTimeout(radioplayer.playing.toggleNowNext, radioplayer.playing.nowNextToggleTiming))
    },
    calcDuraToAnimate: function(a) {
        return Math.floor(a / (this.pxPerSecond / 1e3))
    },
    requestPlaying: function() {
        if (!radioplayer.consts.block_now_next) {
            var a = radioplayer.consts.api.nowNext + "?rpId=" + currentStationID + "&descriptionSize=200&callback=radioplayer.playing.receiveNowNext";
            radioplayer.services.getAPI(a), clearTimeout(this.requestPlayingTimer), this.requestPlayingTimer = setTimeout(function() {
                radioplayer.playing.requestPlaying()
            }, radioplayer.playing.requestPlayingSecs)
        }
    },
    receiveNowNext: function(a) {
        if (clearTimeout(this.requestFailTimer), radioplayer.controls.noSupportShowing) return !1;
        if (a.results.now) {
            var b = {},
                c = null,
                d = null,
                e = null,
                f = null;
            if (a && a.results && a.results.now) {
                var g = a.results.now;
                "PE_E" == g.type || "PI_E" == g.type && a.results.now.song ? (b.PEText = g.artistName + " - " + g.name, radioplayer.playing.artist = g.artistName, radioplayer.playing.title = g.name, c = b.PEText, d = "PE") : "PI" == g.type ? (b.PIText = g.programmeName, c = b.PIText, d = "PI") : "SI" == g.type && (b.PIText = g.name, g.serviceDescription ? (b.SIDesc = g.serviceDescription, c = b.SIDesc) : (b.SITitle = g.serviceName, c = b.SITitle), d = "SI")
            }
            if (a && a.results && a.results.next && a.results.next[0]) {
                var g = a.results.next[0];
                ("PE_E" == g.type || "PI_E" == g.type && a.results.now.song) && (radioplayer.playing.artist_next = g.artistName, radioplayer.playing.title_next = g.name, e = "NEXT: " + g.artistName + " - " + g.name, f = "PE", d && "PE" === d && (c = "NOW: " + c))
            }
            c !== this.showingText && this.updateText(c, d), e && e !== this.showingNextText ? this.updateNextText(e, f) : e || (clearTimeout(radioplayer.playing.nowNextToggleTimeout), $(".scrolling-text").removeClass("scrolling-text--showing-next"), radioplayer.playing.artist_next = null, radioplayer.playing.title_next = null, this.showingNextText = null)
        } else radioplayer.playing.showFailMsg(), nowPlayingSource = "stream"
    },
    receive: function(a) {},
    updateText: function(a, b) {
        if (audioLive) {
            if ($(".song-action--now").remove(), "PE" == b) {
                if (this.songAction) {
                    var c = radioplayer.playing.songAction.baseurl;
                    c = c.replace(/\[\[artist\]\]/gi, encodeURIComponent(encodeURIComponent(radioplayer.playing.artist))), c = c.replace(/\[\[title\]\]/gi, encodeURIComponent(encodeURIComponent(radioplayer.playing.title))), c = c.replace(/\[artist\]/gi, encodeURIComponent(radioplayer.playing.artist)), c = c.replace(/\[title\]/gi, encodeURIComponent(radioplayer.playing.title)), $songAction = $('<a class="song-action song-action--now" href="' + c + '" target="_blank">' + radioplayer.playing.songAction.type + "</a>"), $(".scrolling-text").append($songAction), !0, radioplayer.objs.scrollerText.now.css("right", $(".song-action--now").outerWidth() + 10 + "px")
                } else radioplayer.objs.scrollerText.now.css("right", "0px");
                "PE" != this.showingPlayingType && "" != this.showingPlayingType && (radioplayer.utils.output("now waiting long for now playing as this is a song"), clearTimeout(this.requestPlayingTimer), this.requestPlayingTimer = setTimeout(function() {
                    radioplayer.playing.requestPlaying()
                }, radioplayer.playing.requestPlayingSecs_Song))
            }
            radioplayer.objs.scrollerText.now.children(".song-text").html(a), this.resetScroller(!1)
        } else $("#od-title").html(a);
        this.showingPlayingType = b, this.showingText = a
    },
    updateNextText: function(a, b) {
        if (audioLive) {
            if ($(".song-action--next").remove(), radioplayer.objs.scrollerText.next.children(".song-text").html(a), clearTimeout(radioplayer.playing.nowNextToggleTimeout), radioplayer.playing.artist_next && (radioplayer.playing.nowNextToggleTimeout = setTimeout(radioplayer.playing.toggleNowNext, radioplayer.playing.nowNextToggleTiming)), "PE" == b)
                if (this.songAction) {
                    var c = radioplayer.playing.songAction.baseurl;
                    c = c.replace(/\[\[artist\]\]/gi, encodeURIComponent(encodeURIComponent(radioplayer.playing.artist_next))), c = c.replace(/\[\[title\]\]/gi, encodeURIComponent(encodeURIComponent(radioplayer.playing.title_next))), c = c.replace(/\[artist\]/gi, encodeURIComponent(radioplayer.playing.artist_next)), c = c.replace(/\[title\]/gi, encodeURIComponent(radioplayer.playing.title_next)), $songAction = $('<a class="song-action song-action--next" href="' + c + '" target="_blank">' + radioplayer.playing.songAction.type + "</a>"), $(".scrolling-text").append($songAction), !0, radioplayer.objs.scrollerText.next.css("right", $(".song-action--next").outerWidth() + 10 + "px")
                } else radioplayer.objs.scrollerText.next.css("right", "0px");
            this.showingNextText = a
        }
    },
    toggleNowNext: function() {
        if (radioplayer.controls.noSupportShowing) return $(".scrolling-text").removeClass("scrolling-text--showing-next"), clearTimeout(radioplayer.playing.nowNextToggleTimeout), !1;
        $(".scrolling-text").toggleClass("scrolling-text--showing-next"), radioplayer.playing.artist_next && (clearTimeout(radioplayer.playing.nowNextToggleTimeout), radioplayer.playing.nowNextToggleTimeout = setTimeout(radioplayer.playing.toggleNowNext, radioplayer.playing.nowNextToggleTiming))
    },
    receiveOD: function(a) {
        var b = !1;
        "SUCCESS" == a.responseStatus && a.total > 0 && $.each(a.results, function(a, c) {
            "PI_OD" != c[0].type && "OD" != c[0].type || !c[0].name || "" == c[0].name || (b = !0, radioplayer.playing.updateText(c[0].name, "OD"))
        }), b || (nowPlayingSource = "stream", radioplayer.playing.receivedStreamData && this.updateText(radioplayer.playing.nowPlayingID3, "OD"))
    },
    showFailMsg: function() {
        this.updateText(currentStationName, "fallback")
    },
    metadataReceived: function(a, b) {
        if (radioplayer.utils.output("Stream metadata received."), radioplayer.consts.consolelog && console.dir(b), "metadata" == b.type)
            if (radioplayer.playing.receivedStreamData = !0, void 0 !== b.data.TIT2 || void 0 !== b.data.songName) {
                radioplayer.utils.output("id3 received"), b.data.TIT2 ? radioplayer.playing.title = b.data.TIT2 : b.data.songName && (radioplayer.playing.title = b.data.songName), b.data.TPE1 ? radioplayer.playing.artist = b.data.TPE1 : b.data.artist && (radioplayer.playing.artist = b.data.artist);
                var c = radioplayer.playing.swapPlaceholdersForSong();
                radioplayer.playing.nowPlayingID3 = c, "stream" == nowPlayingSource && radioplayer.playing.updateText(c, audioLive ? "" : "OD")
            } else if (radioplayer.utils.output("StreamTitle: " + b.data.StreamTitle), radioplayer.utils.output("StreamUrl: " + b.data.StreamUrl), radioplayer.utils.output("Name: " + b.data.name), "stream" == nowPlayingSource) {
            var d = b.data.StreamTitle.split("~");
            if ("MUSIC" == d[4]) {
                radioplayer.playing.artist = d[0], radioplayer.playing.title = d[1];
                var c = radioplayer.playing.swapPlaceholdersForSong();
                radioplayer.playing.nowPlayingID3 = c, radioplayer.playing.updateText(c, audioLive ? "" : "OD")
            } else radioplayer.playing.updateText(currentStationName, audioLive ? "" : "OD")
        }
    },
    swapPlaceholdersForSong: function() {
        var a = radioplayer.lang.playing.format;
        return a = a.replace("{artist}", radioplayer.playing.artist), a = a.replace("{track}", radioplayer.playing.title)
    },
    headerReceived: function(a, b) {
        radioplayer.utils.output("header received"), radioplayer.consts.consolelog && console.dir(b)
    }
}, radioplayer.mystations = {
    received: !1,
    gotStnList: !1,
    maxStations: 15,
    menuBtnNotificationTimeout: null,
    menuBtnNotificationTimeoutSub: null,
    init: function() {
        $(radioplayer.services).on("gotMyStationsAndHistory", function() {
            radioplayer.mystations.received = !0, radioplayer.mystations.gotStnList && radioplayer.mystations.initPopulate()
        }), $(radioplayer.services).on("stationListSet", function() {
            radioplayer.mystations.gotStnList = !0, radioplayer.mystations.received && radioplayer.mystations.initPopulate()
        })
    },
    initPopulate: function() {
        radioplayer.utils.output("checking if my stations is already loaded"), $("#mystations-container").hasClass("loaded") && (radioplayer.utils.output("loading in my stations late!"), radioplayer.mystations.populateList(radioplayer.settings.presets, "mystations")), $("#history-container").hasClass("loaded") && radioplayer.mystations.populateList(radioplayer.settings.history, "history")
    },
    populateList: function(a, b) {
        if (0 == a.length) "mystations" == b && $("#" + b + "-container").addClass("has-no-items").html('<div class="no-overlay-items">' + radioplayer.lang.mystations.no_items + "</div>");
        else {
            var c = [];
            $.each(a, function(a, b) {
                if (radioplayer.stnList[b]) {
                    var d = radioplayer.stnList[b];
                    c.push({
                        rpId: b,
                        serviceName: "",
                        consoleUrl: d.playerUrl,
                        imageUrl: ""
                    })
                } else radioplayer.utils.output("Cant add station " + b + " to mystns list, not found in station list")
            });
            var d = '<h2 class="access">' + ("mystations" == b ? radioplayer.lang.menu_tabs.tab_1_text : radioplayer.lang.menu_tabs.tab_2_text) + "</h2>" + radioplayer.overlay.iterateResults(c, b);
            $("#" + b + "-container").html(d), radioplayer.overlay.lazyLoad($("#" + b + "-container"))
        }
    },
    add: function(a, b, c) {
        a = a.toString(), radioplayer.services.analytics.sendEvent("Navigation", "Add to Favourites", a, null, null);
        var d = radioplayer.settings.presets.length;
        if (radioplayer.settings.presets.length == radioplayer.mystations.maxStations) {
            var e = radioplayer.settings.presets.pop();
            $("#mystations-container").hasClass("loaded") && $('#mystations-container .overlay-item[data-stationid="' + e + '"]').remove(), radioplayer.objs.overlayContainer.find('.overlay-item[data-stationid="' + e + '"]').removeClass("in-mystations").find(".toggle-mystations button").attr("title", radioplayer.lang.mystations.add_this).find(".accessibility-text").html(radioplayer.lang.mystations.add_this), e == currentStationID && ($("#toggle-mystations").removeClass("in-mystations").attr("title", radioplayer.lang.mystations.add_this).find(".accessibility-text").html(radioplayer.lang.mystations.add_this), radioplayer.mystations.menuBtnNotificationTimeout && (clearTimeout(radioplayer.mystations.menuBtnNotificationTimeout), $(".menu-btn-notification").removeClass("menu-btn-notification--active")), radioplayer.mystations.menuBtnNotificationTimeoutSub && clearTimeout(radioplayer.mystations.menuBtnNotificationTimeoutSub))
        }
        if (radioplayer.settings.presets.unshift(a), "head-controls" == b && $('#mystations-container .overlay-item[data-stationid="' + a + '"]:not(.in-mystations)').length > 0) radioplayer.utils.output("dont add it again");
        else if ($("#mystations-container").hasClass("loaded") && "mystations-container" !== b) {
            var f = radioplayer.stnList[a],
                g = [{
                    rpId: a,
                    serviceName: f.name,
                    consoleUrl: f.playerUrl,
                    imageUrl: f.logoUrl
                }],
                h = radioplayer.overlay.iterateResults(g, "mystations");
            0 == d && $("#mystations-container").removeClass("has-no-items").html(""), $("#mystations-container").prepend(h), radioplayer.overlay.lazyLoad($("#mystations-container"))
        }
        if (radioplayer.objs.overlayContainer.find('.overlay-item[data-stationid="' + a + '"]').addClass("in-mystations").find(".toggle-mystations button").attr("title", radioplayer.lang.mystations.remove_this).find(".accessibility-text").html(radioplayer.lang.mystations.remove_this), c) {
            new radioplayer.mystations.heartAnimation(c.find("button"), !1);
            a == currentStationID && $("#toggle-mystations").addClass("in-mystations").attr("title", radioplayer.lang.mystations.remove_this).find(".accessibility-text").html(radioplayer.lang.mystations.remove_this)
        } else if ("head-controls" == b) {
            new radioplayer.mystations.heartAnimation($("#toggle-mystations"), !0)
        }
        radioplayer.services.saveMyStationsOrder()
    },
    remove: function(a, b, c) {
        a = a.toString(), radioplayer.settings.presets = jQuery.grep(radioplayer.settings.presets, function(b) {
            return b != a
        }), radioplayer.services.analytics.sendEvent("Navigation", "Remove from Favourites", a, null, null), !$("#mystations-container").hasClass("loaded") || "mystations-container" === b || $("#mystations-container").hasClass("showing") && $("body").hasClass("showing-menu") || ($('#mystations-container .overlay-item[data-stationid="' + a + '"]').remove(), 0 == radioplayer.settings.presets.length && $("#mystations-container").addClass("has-no-items").html('<div class="no-overlay-items">' + radioplayer.lang.mystations.no_items + "</div>")), radioplayer.objs.overlayContainer.find('.overlay-item[data-stationid="' + a + '"]').removeClass("in-mystations").find(".toggle-mystations button").attr("title", radioplayer.lang.mystations.add_this).find(".accessibility-text").html(radioplayer.lang.mystations.add_this), a == currentStationID && ($("#toggle-mystations").removeClass("in-mystations").attr("title", radioplayer.lang.mystations.add_this).find(".accessibility-text").html(radioplayer.lang.mystations.add_this), radioplayer.mystations.menuBtnNotificationTimeout && (clearTimeout(radioplayer.mystations.menuBtnNotificationTimeout), $(".menu-btn-notification").removeClass("menu-btn-notification--active")), radioplayer.mystations.menuBtnNotificationTimeoutSub && clearTimeout(radioplayer.mystations.menuBtnNotificationTimeoutSub)), radioplayer.services.saveMyStationsOrder()
    },
    purgeRemovedMyStations: function() {
        radioplayer.utils.output("purge my stations"), $("#mystations-container .overlay-item:not(.in-mystations)").remove(), 0 == radioplayer.settings.presets.length && $("#mystations-container").addClass("has-no-items").html('<div class="no-overlay-items">' + radioplayer.lang.mystations.no_items + "</div>")
    },
    heartAnimation: function(a, b) {
        if (b && ($("#toggle-mystations").addClass("in-mystations"), !$("body").hasClass("showing-overlay"))) {
            var c = 2e3;
            $("html").hasClass("ie8") && (c = 6e3), $(".menu-btn-notification").show(), $(".menu-btn-notification").addClass("menu-btn-notification--active"), radioplayer.mystations.menuBtnNotificationTimeout = setTimeout(function() {
                $(".menu-btn-notification").removeClass("menu-btn-notification--active")
            }, c)
        }
    }
}, radioplayer.search = {
    lastSuggestQ: "",
    q: "",
    requestFailTimer: null,
    requestFailed: !1,
    suggestQueryDelay: null,
    init: function() {
        radioplayer.objs.searchBox = $(".search-box"), radioplayer.objs.searchInput = $("#search-input"), radioplayer.objs.searchContainer = $(".search-container"), radioplayer.objs.searchResults = $(".search-container .scrollable-wrapper"), radioplayer.objs.suggestContainer = $(".suggest-container"), radioplayer.objs.searchAllContainer = $("#search-all-cont"), radioplayer.objs.searchLiveContainer = $("#search-live-cont"), radioplayer.objs.searchODContainer = $("#search-od-cont"), setTimeout(function() {
            radioplayer.objs.searchInput.val(radioplayer.lang.search.search_radioplayer), $(".mirrored-input").html(radioplayer.lang.search.search_radioplayer)
        }, 100), $(".search-box h2").html(radioplayer.lang.search.search), $(".search-box #search-button").attr("title", radioplayer.lang.search.search).find(".search-btn-accessible").html(radioplayer.lang.search.search), $(".search-box #search-clear").attr("title", radioplayer.lang.search.clear).find(".search-btn-accessible").html(radioplayer.lang.search.clear), $(".search-container .tabs ul li").eq(0).find("a span").html(radioplayer.lang.search.tab_all), $(".search-container .tabs ul li").eq(1).find("a span").html(radioplayer.lang.search.tab_live), $(".search-container .tabs ul li").eq(2).find("a span").html(radioplayer.lang.search.tab_catchup), radioplayer.objs.searchInput.on("focus click", function() {
            radioplayer.objs.searchInput.val() != radioplayer.lang.search.search_radioplayer || radioplayer.objs.searchBox.hasClass("active") ? "" != radioplayer.objs.searchInput.val() && radioplayer.objs.searchBox.hasClass("active") && radioplayer.objs.suggestContainer.data("results") > 0 && !radioplayer.objs.body.hasClass("showing-overlay") && (radioplayer.overlay.show(radioplayer.lang.general.close_search), radioplayer.objs.body.addClass("showing-suggest"), radioplayer.search.lastSuggestQ != radioplayer.objs.searchInput.val() && radioplayer.search.execSuggest()) : (radioplayer.utils.setCaretToPos(document.getElementById("search-input"), 0), radioplayer.objs.searchInput.val(""))
        }).on("blur", function() {
            "" == radioplayer.objs.searchInput.val() && radioplayer.objs.searchInput.val(radioplayer.lang.search.search_radioplayer), radioplayer.objs.searchBox.hasClass("active") && "" == radioplayer.objs.searchInput.val() && (radioplayer.objs.body.hasClass("showing-suggest") ? radioplayer.search.clearAndCloseSuggestResults() : radioplayer.search.resetSearchInput())
        }).on("keydown", function(a) {
            13 == a.which && a.preventDefault(), 9 == a.which || ("" != radioplayer.objs.searchInput.val() || radioplayer.objs.searchBox.hasClass("active") ? "" === radioplayer.objs.searchInput.val() || radioplayer.objs.body.hasClass("showing-search") || radioplayer.objs.body.hasClass("showing-suggest") || (radioplayer.overlay.show(radioplayer.lang.general.close_search), radioplayer.objs.body.addClass("showing-suggest")) : -1 !== $.inArray(a.which, [8, 13, 16, 17, 18, 19, 20, 27, 32, 35, 36, 37, 38, 39, 40, 46, 91, 93, 224]) ? a.preventDefault() : (radioplayer.objs.searchInput.val("").enableSelection(), radioplayer.objs.searchBox.addClass("active"), radioplayer.objs.body.hasClass("showing-search") || radioplayer.objs.body.hasClass("showing-suggest") || (radioplayer.overlay.show(radioplayer.lang.general.close_search), radioplayer.objs.body.addClass("showing-suggest"))))
        }).on("keyup", function(a) {
            13 == a.which && a.preventDefault(), radioplayer.overlay.resetInactivity();
            var b = radioplayer.objs.suggestContainer;
            if (38 == a.which && radioplayer.objs.body.hasClass("showing-suggest"))
                if (0 == b.find(".suggest-item.on").length) b.find(".suggest-item:last").addClass("on kb-focus");
                else {
                    var c = b.find(".suggest-item").index(b.find(".suggest-item.on"));
                    b.find(".suggest-item.on").removeClass("on kb-focus"), b.find(".suggest-item").eq(c - 1).addClass("on kb-focus")
                }
            else if (40 == a.which && radioplayer.objs.body.hasClass("showing-suggest"))
                if (0 == b.find(".suggest-item.on").length) b.find(".suggest-item:first").addClass("on kb-focus");
                else if (b.find(".suggest-item:last").hasClass("on")) b.find(".suggest-item:last").removeClass("on kb-focus"), b.find(".suggest-item:first").addClass("on kb-focus");
            else {
                var c = b.find(".suggest-item").index(b.find(".suggest-item.on"));
                b.find(".suggest-item.on").removeClass("on kb-focus"), b.find(".suggest-item").eq(c + 1).addClass("on kb-focus")
            } else if (13 == a.which)
                if (radioplayer.objs.body.hasClass("showing-suggest")) {
                    var d = b.find(".suggest-item.on.kb-focus");
                    if (1 == d.length)
                        if (d.hasClass("show-all")) radioplayer.search.execFull();
                        else {
                            var e = d.find("a").attr("href");
                            window.location.href = e
                        }
                    else radioplayer.search.execFull()
                } else radioplayer.objs.body.hasClass("showing-search") && radioplayer.search.execFull();
            else -1 == $.inArray(a.which, [9, 13, 16, 17, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 91, 93, 224]) && ($(".mirrored-input").html(radioplayer.objs.searchInput.val()), $("#search-clear").hide(), $("#search-button").show(), radioplayer.objs.body.hasClass("showing-suggest") ? (b.find(".suggest-item.show-all").removeClass("on kb-focus"), "" === radioplayer.objs.searchInput.val() ? radioplayer.search.clearAndCloseSuggestResults() : radioplayer.search.execSuggest()) : "" === radioplayer.objs.searchInput.val() && radioplayer.search.resetSearchInput())
        }).disableSelection(), radioplayer.objs.suggestContainer.on("click touchstart touchend", ".suggest-item.show-all a", function(a) {
            a.preventDefault(), a.stopPropagation(), radioplayer.search.execFull()
        }).on("click", "#suggest-results .suggest-item a", function(a) {
            a.preventDefault();
            var b = $(this).parent().data("rpid"),
                c = $(this).attr("href");
            radioplayer.services.analytics.sendEvent("Search", "Autosuggest", b.toString(), null, null), setTimeout(function() {
                window.location.href = c
            }, 100)
        }).on("mouseenter", ".suggest-item", function() {
            radioplayer.objs.suggestContainer.find(".suggest-item").removeClass("on kb-focus"), $(this).addClass("on")
        }).on("mouseleave", ".suggest-item", function() {
            $(this).removeClass("on kb-focus")
        }), $("#search-button").on("click", function(a) {
            radioplayer.objs.searchInput.val() && radioplayer.objs.searchInput.val() !== radioplayer.lang.search.search_radioplayer && radioplayer.search.execFull()
        }), $("#search-clear").on("click", function(a) {
            radioplayer.search.resetSearchInput()
        }), $("#search-all-cont, #search-live-cont, #search-od-cont").on("click", ".station-group a.station-group-toggle", function(a) {
            a.preventDefault();
            var b = $(this),
                c = b.parent().parent(),
                d = c.attr("data-brand");
            if (c.hasClass("collapsed")) {
                c.removeClass("collapsed");
                var e = radioplayer.lang.search.show_fewer_stations;
                e = e.replace("{group}", d), b.html("<i></i>" + e), $parentContainer = c.parent(), radioplayer.overlay.lazyLoad($parentContainer)
            } else {
                c.addClass("collapsed");
                var f = radioplayer.lang.search.show_more_stations;
                f = f.replace("{group}", d), b.html("<i></i>" + f)
            }
        })
    },
    execSuggest: function() {
        var a = $.trim(radioplayer.objs.searchInput.val());
        regex = /(<([^>]+)>)/gi, a = a.replace(regex, "");
        var b = radioplayer.lang.search.show_all_results_for.replace("{terms}", "<strong>" + a + "</strong>");
        $(".suggest-item.show-all a").html(b), clearTimeout(radioplayer.search.suggestQueryDelay), radioplayer.search.suggestQueryDelay = setTimeout(function() {
            "" != a && a != radioplayer.search.lastSuggestQ && (radioplayer.search.lastSuggestQ = a, radioplayer.services.getAPI(radioplayer.consts.api.suggest + "?query=" + encodeURIComponent(a) + "&callback=radioplayer.search.receiveSuggest"))
        }, 150)
    },
    receiveSuggest: function(a) {
        var b = '<h2 class="access">' + radioplayer.lang.search.suggested_title + "</h2>",
            c = 0;
        a.live.length > 0 && (b += '<div class="suggest-divider">' + radioplayer.lang.search.suggested_stations + "</div>", $.each(a.live, function(a, d) {
            b += '<div class="suggest-item' + (d.name ? " has-prog-name" : "") + '" data-rpid="' + d.rpId + '"><a href="' + d.url + '"><img class="image" src="' + d.imageUrl + '" alt="" /><span class="name">' + d.serviceName + "</span>" + (d.name ? '<span class="prog-name">' + d.name + "</span>" : "") + "</a></div>", c++
        })), a.onDemand.length > 0 && (b += '<div class="suggest-divider">' + radioplayer.lang.search.suggested_catch_up + "</div>", $.each(a.onDemand, function(a, d) {
            b += '<div class="suggest-item has-prog-name" data-rpid="' + d.rpId + '"><a href="' + d.url + '"><img class="image" src="' + d.imageUrl + '" alt="" /><span class="name">' + d.serviceName + '</span><span class="prog-name">' + d.name + "</span></a></div>", c++
        })), radioplayer.objs.suggestContainer.data("results", c), $("#suggest-results").html(b)
    },
    resetSearchInput: function() {
        $("#search-clear").hide(), $("#search-button").show(), radioplayer.objs.searchBox.removeClass("active"), radioplayer.objs.searchInput.val(radioplayer.lang.search.search_radioplayer).disableSelection().focus(), $(".mirrored-input").html(radioplayer.lang.search.search_radioplayer), radioplayer.utils.setCaretToPos(document.getElementById("search-input"), 0)
    },
    clearAndCloseSuggestResults: function() {
        $("#suggest-results").html(""), $(".suggest-item.show-all a").html(""), radioplayer.search.lastSuggestQ = "", radioplayer.overlay.hide(), radioplayer.search.resetSearchInput()
    },
    execFull: function() {
        var a = $.trim(radioplayer.objs.searchInput.val()),
            b = /(<([^>]+)>)/gi,
            a = a.replace(b, "");
        if ("" != a) {
            radioplayer.objs.body.hasClass("showing-search") || radioplayer.objs.body.addClass("showing-search"), radioplayer.objs.searchContainer.off(), radioplayer.objs.searchContainer.find(".tab-container").html("").removeClass("loaded has-error"), $prevSelTab = $(".search-container .tabs li.on"), $prevSelTab.removeClass("on"), radioplayer.overlay.selectTab(radioplayer.objs.searchContainer.find(".tabs li").eq(0)), radioplayer.search.showTabSpinner(), radioplayer.consts.is_iOS || radioplayer.objs.searchInput.focus(), $("#search-button").hide(), $("#search-clear").show(), radioplayer.search.requestFailed = !1, radioplayer.search.requestFailTimer = setTimeout(function() {
                radioplayer.search.showFailMsg("all")
            }, 15e3);
            var c = "?query=" + encodeURIComponent(a) + "&descriptionSize=70&rpId=" + currentStationID + "&callback=radioplayer.search.receiveall";
            "" != radioplayer.settings.guid && (c += "&guid=" + radioplayer.settings.guid), radioplayer.services.getAPI(radioplayer.consts.api.search + c), radioplayer.search.q = a
        } else radioplayer.consts.is_iOS || radioplayer.objs.searchInput.focus()
    },
    tabRequest: function(a) {
        this.showTabSpinner(), radioplayer.search.requestFailed = !1, radioplayer.search.requestFailTimer = setTimeout(function() {
            radioplayer.search.showFailMsg(a)
        }, 15e3);
        var b = "?query=" + encodeURIComponent(radioplayer.search.q) + "&descriptionSize=70&rpId=" + currentStationID + "&callback=radioplayer.search.receive" + a;
        "" != radioplayer.settings.guid && (b += "&guid=" + radioplayer.settings.guid), radioplayer.services.getAPI(radioplayer.consts.api.search + "/" + a + b)
    },
    receiveall: function(a) {
        this.receiveParse("all", a)
    },
    receivelive: function(a) {
        this.receiveParse("live", a)
    },
    receiveod: function(a) {
        this.receiveParse("od", a)
    },
    showTabSpinner: function() {
        radioplayer.objs.searchContainer.find(".tabs-wrapper .spinner").show()
    },
    hideTabSpinner: function() {
        radioplayer.objs.searchContainer.find(".tabs-wrapper .spinner").hide()
    },
    receiveParse: function(a, b) {
        if (clearTimeout(this.requestFailTimer), !this.requestFailed)
            if ("SUCCESS" == b.responseStatus) {
                var c = '<h2 class="access">' + radioplayer.lang.search["tab_" + a + "_title"] + "</h2>";
                0 == b.total ? (c = this.noResultsMsg(a, radioplayer.search.q), $("#search-" + a + "-cont").addClass("has-error")) : c += radioplayer.overlay.iterateResults(b.results, "search"), this.hideTabSpinner(), $("#search-" + a + "-cont").html(c), $("#search-" + a + "-cont").scrollTop(0), radioplayer.overlay.lazyLoad($("#search-" + a + "-cont"))
            } else this.showFailMsg(a)
    },
    noResultsMsg: function(a, b) {
        if ("live" == a) var c = radioplayer.lang.search.no_live_results;
        else if ("od" == a) var c = radioplayer.lang.search.no_od_results;
        else var c = radioplayer.lang.search.no_all_results;
        return c = '<div class="error-message no-results">' + c.replace("{terms}", b) + "</div>", radioplayer.services.analytics.sendEvent("Search", "Zero Results", b, null, null), c
    },
    showFailMsg: function(a) {
        this.requestFailed = !0, this.hideTabSpinner();
        var b = '<div class="error-message fail">' + radioplayer.lang.general.fail_message + "</div>";
        $("#search-" + a + "-cont").addClass("has-error").html(b), radioplayer.services.analytics.sendEvent("Errors", "Failed Search", currentStationID, null, null)
    }
};
var com_adswizz_synchro_decorateUrl = !1;
radioplayer.adswizz = {
    DEBUG: !1,
    overlayTimeout: null,
    enabled: !1,
    playerId: "UKRP",
    adswizzDomain: "",
    prerollZoneId: 0,
    midrollZoneId: 0,
    adswizzCookie: {
        name: "adswizz_oaid",
        path: "/",
        secure: !1
    },
    init: function() {
        this.enabled = adsWizz.enabled || !1, this.enabled && (this.DEBUG && radioplayer.utils.output("[adswizz] Initialising adswizz."), this.playerId = adsWizz.playerId || "UKRP", this.adswizzDomain = adsWizz.domain || "demo", this.prerollZoneId = adsWizz.prerollZoneId || 0, this.midrollZoneId = adsWizz.midrollZoneId || 0, this.DEBUG && radioplayer.utils.output("[adswizz] playerId: " + this.playerId + "\n          domain: " + this.adswizzDomain + "\n          preroll zone Id: " + this.prerollZoneId + "\n          midroll zone Id: " + this.midrollZoneId), this.decorateAllStreamUrls() || (this.enabled = !1), this.DEBUG && radioplayer.utils.output("[adswizz] AdsWizz " + (this.enabled ? "enabled." : "disabled.")))
    },
    decorateAllStreamUrls: function() {
        var a = -1,
            b = !1;
        if (!com_adswizz_synchro_decorateUrl) return !1;
        for (var c = 0; c < audioArray.length; c++) try {
            audioArray[c].audioUrl = this.decorateStreamUrl(audioArray[c].audioUrl), a = c, this.DEBUG && radioplayer.utils.output("[adswizz] Decorated stream: " + audioArray[c].audioUrl)
        } catch (d) {
            radioplayer.utils.output("[adswizz] Stream decoration failed: " + d.message)
        }
        return -1 === a ? (b = !1, radioplayer.utils.output("[adswizz] All streams failed to decorate.")) : (b = !0, this.DEBUG && radioplayer.utils.output("[adswizz] Stream(s) decorated. ListenerId: " + this.getListenerId())), b
    },
    decorateStreamUrl: function(a) {
        var b = String(parseInt((new Date).getTime() / 1e3)),
            c = encodeURIComponent("aw_0_1st.skey=" + b + "&amsparams=playerid:" + this.playerId + ";skey:" + b);
        a += (a.indexOf("?") > 0 ? "&" : "?") + c;
        try {
            a = com_adswizz_synchro_decorateUrl(a)
        } catch (e) {
            radioplayer.utils.output("[adswizz] Could not decorate stream " + a + "\n          Error [" + e.name + "]: " + e.message);
            var d = new radioplayer.exceptions.decorateStreamURLException;
            throw d.message = "Could not decorate stream URL (" + a + ").", d
        }
        return a
    },
    setListenerId: function(a) {
        var b = new Date(2030, 31, 11, 0, 0, 0, 0).toUTCString();
        radioplayer.utils.setLocalCookie(this.adswizzCookie.name, a, b, this.adswizzCookie.path, this.adswizzCookie.domain, this.adswizzCookie.secure), this.DEBUG && radioplayer.utils.output("[adswizz] Persisted listenerId: " + a)
    },
    getListenerId: function() {
        var a = radioplayer.utils.getLocalCookie(this.adswizzCookie.name);
        return "" === a && (a = this.generateListenerId(), this.setListenerId(a)), this.DEBUG && radioplayer.utils.output("[adswizz] Retrieved listenerId: " + a), a
    },
    generateListenerId: function() {
        var a = com_adswizz_synchro_listenerid;
        return null !== a && void 0 !== a || (a = (new Date).getTime() + "_" + Math.random()), this.DEBUG && radioplayer.utils.output("[adswizz] Generated new listenerId: " + a), a
    },
    parseMetadata: function(a, b) {
        if (radioplayer.adswizz.enabled && "metadata" == b.type) {
            var c = b.data;
            if (void 0 !== c.durationMilliseconds && void 0 !== c.insertionType && void 0 !== c.metadata && (radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] Adswizz metadata received. Data:"), radioplayer.adswizz.DEBUG && radioplayer.utils.output(c), -1 !== c.metadata.indexOf("adswizzContext="))) {
                null !== radioplayer.adswizz.overlayTimeout && clearTimeout(radioplayer.adswizz.overlayTimeout);
                var d = parseInt(c.durationMilliseconds),
                    e = c.metadata.replace("adswizzContext=", "");
                if (!e) return void(radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] Did not receive AdsWizz Context within metadata."));
                radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] AdsWizz Context: ", e);
                var f = "zoneid=";
                "midroll" === c.insertionType ? f += radioplayer.adswizz.midrollZoneId : f += radioplayer.adswizz.prerollZoneId;
                var g = "cb=" + String((new Date).getTime()),
                    h = "//" + radioplayer.adswizz.adswizzDomain + ".adswizz.com/www/delivery/afr.php?" + f + "&playerid=" + radioplayer.adswizz.playerId + "&context=" + e + "&" + g;
                radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] Showing companion ad in overlay. Resource URL: " + h), radioplayer.services.overlay.adswizz(h, d), radioplayer.adswizz.DEBUG && radioplayer.utils.output("[adswizz] AdsWizz Duration: " + d / 1e3 + "sec")
            }
        }
    }
}, $(radioplayer.emp).on("metadata", radioplayer.adswizz.parseMetadata), radioplayer.vast = {
    DEBUG: !0,
    enabled: !1,
    vastTag: "",
    videoPlayerId: "vast-video",
    timeout: 5e3,
    failTimeoutTime: 1e4,
    closeTimeout: null,
    vastSize: {
        width: 720,
        height: radioplayer.utils.windowHeight()
    },
    rpSize: {
        width: radioplayer.utils.windowWidth(),
        height: radioplayer.utils.windowHeight()
    },
    isPlaying: !1,
    vjsSkin: "vjs-tech",
    probablyFiles: [],
    maybeFiles: [],
    flashFiles: [],
    response: null,
    maxAdSize: {
        width: 640,
        height: 480
    },
    maxCompanionSize: {
        width: 700,
        height: 100
    },
    init: function() {
        if (this.enabled = vastAds.enabled || !1, this.enabled) {
            if (this.vastTag = vastAds.vastTag || "", void 0 === this.vastTag || "" === this.vastTag) return void(this.DEBUG && radioplayer.utils.output("[VAST] VAST URL not specified, disabling VAST."));
            this.DEBUG && radioplayer.utils.output("[VAST] Initialising VAST."), this.vjsSkin = vastAds.vjsSkin || "vjs-tech", this.getContentAndPlay(this.vastTag)
        }
    },
    canPlayVideo: function(a, b) {
        var c = "no",
            d = document.createElement("video");
        return c = "function" != typeof d.canPlayType ? "no" : null === b || "" === b || void 0 === b ? d.canPlayType(a) : d.canPlayType(a + ';codecs="' + b + '"'), d = null, "" === c && (c = "no"), radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Testing video playback capabilities. mimeType: " + a + ", codec: " + b + " result: " + c), c
    },
    getContentAndPlay: function(a) {
        function b() {
            var b = $.Deferred();
            radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Retrieved VAST content");
            setTimeout(function() {
                b.reject()
            }, 5e3);
            return DMVAST.client.get(a, function(a) {
                b.resolve(a)
            }), b.promise()
        }
        DMVAST.timeout = this.timeout, radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Retrieving VAST content. Timeout: " + String(this.timeout / 1e3) + " sec."), b().done(function(a) {
            if (radioplayer.vast.response = a, !a || !a.ads) return radioplayer.vast.dispose(), !1;
            var b = {};
            b.ad = "", b.adType = "", b.creative = "", b.companion = "", b.companionType = "";
            for (var c = 0; c < radioplayer.vast.response.ads.length; c++)
                for (var d = radioplayer.vast.response.ads[c], e = 0; e < d.creatives.length; e++) {
                    var f = d.creatives[e];
                    switch (f.type) {
                        case "linear":
                            for (var g = 0; g < f.mediaFiles.length; g++) {
                                var h = f.mediaFiles[g];
                                if (h.width <= radioplayer.vast.maxAdSize.width && h.height <= radioplayer.vast.maxAdSize.height) {
                                    if ("application/x-shockwave-flash" === h.mimeType) {
                                        b.ad = d, b.mediaFile = h, b.creative = f, b.adType = "flash";
                                        break
                                    }
                                    if ("probably" === radioplayer.vast.canPlayVideo(h.mimeType, h.codec) || "maybe" === radioplayer.vast.canPlayVideo(h.mimeType, h.codec)) {
                                        b.ad = d, b.mediaFile = h, b.creative = f, b.adType = "video";
                                        break
                                    }
                                }
                            }
                            break;
                        case "non-linear":
                            break;
                        case "companion":
                            for (var i = 0; i < f.variations.length; i++) {
                                var j = f.variations[i];
                                if (j.width <= radioplayer.vast.maxCompanionSize.width && j.height <= radioplayer.vast.maxCompanionSize.height) switch (j.type) {
                                    case "image/gif":
                                    case "image/png":
                                    case "image/jpg":
                                    case "image/jpeg":
                                        b.companion = j, b.companionType = "image";
                                        break;
                                    case "text/html":
                                        b.companion = j, b.companionType = "html";
                                        break;
                                    default:
                                        b.companion = j, b.companionType = "iframe"
                                }
                            }
                    }
                }
            "" !== b.ad ? (radioplayer.vast.startPlayer(b), "" !== b.companion && radioplayer.vast.startCompanion(b)) : radioplayer.vast.dispose()
        }).fail(function() {
            radioplayer.vast.dispose("video")
        })
    },
    startPlayer: function(a) {
        var b = "";
        if ("video" === a.adType) {
            radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Creating overlay code for VAST player."), b = '<div class="vast-container" id="vast-container">\t\t\t\t<div id="vast-video-container">\t\t\t\t\t<video id="' + this.videoPlayerId + '" class="video-js ' + this.vjsSkin + ' vjs-big-play-centered">\t\t\t\t\t</video>\t\t\t\t</div>\t\t\t\t<div id="vast-companion-container" class="companion-container">\t\t\t\t</div>\t\t\t</div>', radioplayer.services.overlay.vast(b), $("video").on("contextmenu", function() {
                return !1
            }), this.isPlaying = !0;
            var c = document.getElementById(this.videoPlayerId),
                d = null;
            d = (radioplayer.consts.is_iOS || radioplayer.consts.is_Android, videojs(c, {
                preload: "auto",
                width: null,
                height: null,
                controls: !1,
                autoplay: !0,
                techOrder: ["html5", "flash"]
            })), d.ads(), d.vast({
                url: radioplayer.vast.vastTag,
                skip: -1,
                ads: {}
            }), d.vastTracker = new DMVAST.tracker(a.ad, a.creative), d.on("adend", function() {
                radioplayer.vast.dispose("video"), d.vastTracker.complete(), d.vastTracker.stop()
            }), d.on("adclick", function() {}), d.src({
                type: a.mimeType,
                src: a.mediaFile.fileURL
            }), window.resizeTo(this.vastSize.width, this.vastSize.height), window.setTimeout($.proxy(function() {
                (radioplayer.consts.is_iOS || radioplayer.consts.is_Android) && d.paused() && d.bigPlayButton.show(), d.on("play", function() {
                    d.bigPlayButton.hide()
                })
            }, d), 1e3), null !== d && (d.href = a.mediaFile.fileURL), d.vastTracker || DMVAST.util.track(a.ad.errorURLTemplates, {
                ERRORCODE: 403
            })
        } else if ("flash" === a.adType) {
            window.resizeTo(this.vastSize.width, this.vastSize.height);
            var e = (this.vastSize.width - a.mediaFile.width) / 2;
            b = '<div class="vast-container" id="vast-container">', b += '<div class="close-vast-btn-container"><button class="close-vast-btn" id="closeVASTBtn"><span>&times;</span><label class="close-vast-btn-label accessibility-text" for="closeVASTBtn">Close Ad</label></button></div>', b += '<div class="vast-flash-container">', b += '<object class="vast-flash-obj" id="vastAdObj" style="width: ' + a.mediaFile.width + "px; height: " + a.mediaFile.height + "px; margin: 0 " + e + 'px;">', b += '<param name="movie" value="' + a.mediaFile.fileURL + '" />', b += '<embed class="vast-flash-embed" id="' + this.videoPlayerId + '" src="' + a.mediaFile.fileURL + '" style="width: ' + a.mediaFile.width + "px; height: " + a.mediaFile.height + "px; margin: 0 " + e + 'px;" type="application/x-shockwave-flash"></embed>', b += "</object>", b += "</div>", b += "</div>", b += '<div id="vast-companion-container" class="companion-container"></div>', radioplayer.services.overlay.vast(b), $("#closeVASTBtn").on("click", function() {
                radioplayer.vast.closeTimeout && clearTimeout(radioplayer.vast.closeTimeout), radioplayer.vast.dispose("flash")
            })
        }
        void 0 === a.creative.duration && (duration = 30, radioplayer.vast.closeTimeout = setTimeout(function() {
            radioplayer.vast.dispose("flash")
        }, 1e3 * duration))
    },
    startCompanion: function(a) {
        var b = document.getElementById("vast-companion-container"),
            c = document.createElement("div");
        if ("image" === a.companionType) {
            var d = document.createElement("a"),
                e = new Image;
            d.setAttribute("target", "_blank"), e.src = a.companion.staticResource, e.width = a.companion.width, e.height = a.companion.height, d.href = a.companion.companionClickThroughURLTemplate, d.appendChild(e), c.appendChild(d), b.appendChild(c)
        } else if ("text" === a.companionType) c.innerHTML = a.companion.htmlResource, b.appendChild(c);
        else if (a.companion.iframeResource) {
            var d = document.createElement("iframe");
            d.src = a.companion.staticResource, d.width = a.companion.width, d.height = a.companion.height, c.appendChild(d), b.appendChild(c)
        }
    },
    dispose: function(a) {
        if ("video" === a) {
            radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Disposing of video player instance.");
            try {
                var b = videojs(this.videoPlayerId);
                void 0 !== b && (radioplayer.overlay.hide(), b.pause(), b.dispose())
            } catch (c) {}
            radioplayer.utils.resizeViewPort(380, 665), radioplayer.services.overlay.hide()
        } else "flash" === a && (radioplayer.vast.DEBUG && radioplayer.utils.output("[VAST] Disposing of flash player instance."), $("#vast-container").remove(), radioplayer.utils.resizeViewPort(380, 665), radioplayer.services.overlay.hide());
        vastAds.shownVideo = !0, radioplayer.emp.init(window.audioArray, window.audioLive, window.bufferTime), radioplayer.emp.dataReady(), this.isPlaying = !1
    }
}, radioplayer.lang = {
    general: {
        radioplayer: "Radioplayer",
        open_menu: "Open Radioplayer Menu",
        close_menu: "Close Radioplayer Menu",
        close_search: "Close Radioplayer Search",
        fail_message: "<h1>We have a problem...</h1><p><strong>Sorry</strong>, there's a temporary glitch. Please check your internet connection.</p><p>If the problem's at our end, we'll have spotted it already, and we'll be working on it.<br />Try again shortly.</p>",
        reduced_func_anno: 'You\'re not getting the full Radioplayer experience in this browser. <a href="http://www.radioplayer.co.uk/cookiehelp/?mob=false" target="_blank">Change cookie settings</a>, or <a href="http://www.radioplayer.co.uk/apps" target="_blank">upgrade to our app.</a>',
        cookie_anno: 'Radioplayer uses cookies to enhance your experience.<br />To find out how, <a href="http://www.radioplayer.co.uk/" target="_blank">click here</a>. If you continue, we\'ll assume you\'re happy to receive all Radioplayer cookies.',
        cookie_message: 'These features, and others, are powered by <a href="http://www.radioplayer.co.uk/cookies" target="_blank">cookies</a>. Keep listening if this is OK.',
        cookie_favourites_message: "Add this station to your favourites",
        cookie_menu_message: "View your favourites here"
    },
    controls: {
        loading: "Loading...",
        play_prompt: "Click on the play button to start listening",
        player_controls: "Player Controls",
        play: "Play",
        pause: "Pause",
        stop: "Stop",
        mute: "Mute",
        unmute: "Unmute",
        set_volume: "Set volume",
        set_volume_20: "Set volume to 20%",
        set_volume_40: "Set volume to 40%",
        set_volume_60: "Set volume to 60%",
        set_volume_80: "Set volume to 80%",
        set_volume_100: "Set volume to 100%",
        use_device_controls: "Please use the volume controls on your device.",
        press_play_prompt: "Press play to start listening",
        skip_forward_5_seconds: "Skip forward 5 seconds",
        skip_back_5_seconds: "Skip back 5 seconds",
        skip_forward_30_seconds: "Skip forward 30 seconds",
        skip_back_30_seconds: "Skip back 30 seconds",
        skip_forward_1_minute: "Skip forward 1 minute",
        skip_back_1_minute: "Skip back 1 minute",
        skip_forward_5_minutes: "Skip forward 5 minutes",
        skip_back_5_minutes: "Skip back 5 minutes",
        skip_forward_10_minutes: "Skip forward 10 minutes",
        skip_back_10_minutes: "Skip back 10 minutes",
        skip_forward_30_minutes: "Skip forward 30 minutes",
        skip_back_30_minutes: "Skip back 30 minutes"
    },
    playing: {
        live: "Live",
        live_width: 34,
        format: "{artist} - {track}"
    },
    menu_tabs: {
        sizing: [{
            maxViewport: 320,
            mode: "auto"
        }, {
            maxViewport: 380,
            mode: "manual",
            tabSizes: [107, 75, 120, 78]
        }, {
            maxViewport: 580,
            mode: "manual",
            tabSizes: [157, 125, 170, 128]
        }],
        tab_1_text: "My Stations",
        tab_2_text: "Recent",
        tab_3_text: "Recommended",
        tab_4_text: "A-Z List"
    },
    recommendations: {
        locale: "en_GB"
    },
    azlist: {
        alphabet_array: ["#", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        alphabet_minimised_array: [{
            displayText: "0-9"
        }, {
            displayText: "a-c",
            letters: ["a", "b", "c"]
        }, {
            displayText: "d-f",
            letters: ["d", "e", "f"]
        }, {
            displayText: "g-i",
            letters: ["g", "h", "i"]
        }, {
            displayText: "j-l",
            letters: ["j", "k", "l"]
        }, {
            displayText: "m-o",
            letters: ["m", "n", "o"]
        }, {
            displayText: "p-s",
            letters: ["p", "q", "r", "s"]
        }, {
            displayText: "t-v",
            letters: ["t", "u", "v"]
        }, {
            displayText: "w-z",
            letters: ["w", "x", "y", "z"]
        }],
        no_stations_beginning: "There are no stations beginning with {letter}",
        view_stations_beginning: "View stations beginning with {letter}",
        view_stations_from: "View stations from ",
        a_number: "a number",
        no_stations: "No stations for this letter"
    },
    mystations: {
        add_this: "Add this station to My Stations",
        remove_this: "Remove this station from My Stations",
        no_items: "<h1>Add to My Stations</h1><p>You haven't saved any stations yet.<br />Click the grey heart icon next to your favourite stations to save them here.</p>"
    },
    search: {
        search: "Search",
        clear: "Clear search terms",
        search_radioplayer: "Search UK Radio",
        suggested_title: "Suggested Search Results",
        suggested_stations: "Suggested Stations",
        suggested_catch_up: "Suggested Catch Up",
        show_all_results_for: "Show all results for {terms}",
        tab_all: "All",
        tab_all_title: "All Search Results",
        tab_live: "Live",
        tab_live_title: "Live Search Results",
        tab_catchup: "Catch Up",
        tab_catchup_title: "Catch Up Search Results",
        show_fewer_stations: "Show fewer {group} stations",
        show_more_stations: "Show more {group} stations",
        show_information: "Show Information",
        hide_information: "Hide Information",
        no_all_results: '<h1>No Results</h1><p>We can\'t find any stations or programmes relating to <br /><span class="terms">{terms}</span></p><p>Please check your spelling - or try searching again, using a <strong>station name</strong>, a <strong>programme name</strong>, or a <strong>place</strong>.</p>',
        no_live_results: '<h1>No Results</h1><p>We can\'t find any stations relating to <br /><span class="terms">{terms}</span></p><p>Please check your spelling - or try searching again, using a <strong>station name</strong>, a <strong>programme name</strong>, or a <strong>place</strong>.</p>',
        no_od_results: '<h1>No Results</h1><p>We can\'t find any programmes relating to <br /><span class="terms">{terms}</span></p><p>Please check your spelling - or try searching again, using a <strong>station name</strong>, a <strong>programme name</strong>, or a <strong>place</strong>.</p>',
        live: "Live",
        coming_up: "Coming Up",
        broadcast: "Catch Up",
        in_seconds: "in seconds",
        in_minute: "in 1 minute",
        in_minutes: "in {n} minutes",
        second_ago: "1 second ago",
        seconds_ago: "{n} seconds ago",
        minute_ago: "1 minute ago",
        minutes_ago: "{n} minutes ago",
        hour_ago: "1 hour ago",
        hours_ago: "{n} hours ago",
        day_ago: "1 day ago",
        days_ago: "{n} days ago",
        week_ago: "1 week ago",
        weeks_ago: "{n} weeks ago",
        month_ago: "1 month ago",
        months_ago: "{n} months ago",
        year_ago: "1 year ago",
        years_ago: "{n} years ago"
    },
    stream_error: {
        unavailable: '<h1>The sound of silence</h1><p>We\'re trying to play this station, but we\'re having problems. Apologies.</p><p>The station\'s stream may be broken, or there may be a mis-match between this stream, and your device.</p><p>You can try <a href="https://get.adobe.com/flashplayer/" target="_blank">updating Flash</a> or using a different browser but if your device doesn\'t support this, why not <a href="http://www.radioplayer.co.uk/apps" target="_blank">download our free app</a> for phones and tablet.</p>',
        device_incompatible: '<h1>The sound of silence</h1><p>Radioplayer\'s trying to play this station, but there may be a mis-match between this stream, and your device.</p><p>You can try <a href="https://get.adobe.com/flashplayer/" target="_blank">updating Flash</a> or using a different browser but if your device doesn\'t support this, why not <a href="http://www.radioplayer.co.uk/apps" target="_blank">download our free app</a> for phones and tablet.</p>'
    }
};