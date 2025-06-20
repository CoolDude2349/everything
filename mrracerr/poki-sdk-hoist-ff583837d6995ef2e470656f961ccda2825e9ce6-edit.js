( () => {
    "use strict";
    const e = {
        ready: "pokiAppReady",
        adblocked: "pokiAppAdblocked",
        startLoading: "pokiAppStartLoading",
        ads: {
            startTimer: "pokiStartTimer",
            completed: "pokiAdsCompleted",
            error: "pokiAdsError",
            impression: "pokiAdsImpression",
            durationChange: "pokiAdsDurationChange",
            limit: "pokiAdsLimit",
            ready: "pokiAdsReady",
            requested: "pokiAdsRequested",
            prebidRequested: "pokiAdsPrebidRequested",
            skipped: "pokiAdsSkipped",
            started: "pokiAdsStarted",
            stopped: "pokiAdsStopped",
            busy: "pokiAdsBusy",
            loaded: "pokiAdsLoaded",
            position: {
                preroll: "PP",
                midroll: "PM",
                rewarded: "PR",
                display: "DP"
            },
            video: {
                clicked: "pokiVideoAdsClicked",
                firstQuartile: "pokiVideoAdsFirstQuartile",
                midPoint: "pokiVideoAdsMidPoint",
                thirdQuartile: "pokiVideoAdsThirdQuartile",
                error: "pokiVideoAdsError",
                loaderError: "pokiVideoAdsLoaderError",
                paused: "pokiVideoAdsPauseTriggered",
                resumed: "pokiVideoAdsResumedTriggered",
                progress: "pokiVideoAdsProgress",
                buffering: "pokiVideoAdsBuffering",
                startHouseAdFlow: "pokiVideoAdsStartHouseAdFlow"
            },
            display: {
                error: "pokiDisplayAdsError"
            },
            extendedVideoError: "pokiAdsExtendedVideoError",
            debugging: "pokiAdsDebugging"
        },
        info: {
            messages: {
                timeLimit: "The ad-request was not processed, because of a time constraint",
                prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll (PokiSDK.commercialBreak before PokiSDK.gameplayStart)",
                disabled: "The ad-request was cancelled, because we've disabled this format for this specific configuration"
            }
        },
        playtest: {
            startVideo: "pokiPlaytestStartVideo",
            stopVideo: "pokiPlaytestStopVideo"
        },
        message: {
            event: "pokiMessageEvent",
            sdkDetails: "pokiMessageSdkDetails",
            setPokiURLParams: "pokiMessageSetPokiURLParams",
            sendGameScreenshot: "pokiMessageSendScreenshot",
            sendGameRawScreenshot: "pokiMessageSendRawScreenshot",
            sendUploadScreenshot: "pokiMessageSendUploadScreenshot",
            sendCommand: "pokiMessageSendCommand",
            sendInspectorEvent: "pokiMessageInspectorEvent",
            sendInspectorCookies: "pokiMessageSendInspectorCookies",
            sendInspectorConsole: "pokiMessageSendInspectorConsole",
            sendInspectorBadBehavior: "pokiMessageSendInspectorBadBehavior"
        },
        tracking: {
            custom: "pokiTrackingCustom",
            debugTrueInProduction: "pokiMessageDebugTrueProduction",
            screen: {
                gameplayStart: "pokiTrackingScreenGameplayStart",
                gameplayStop: "pokiTrackingScreenGameplayStop",
                gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                commercialBreak: "pokiTrackingScreenCommercialBreak",
                rewardedBreak: "pokiTrackingScreenRewardedBreak",
                firstRound: "pokiTrackingScreenFirstRound",
                displayAd: "pokiTrackingScreenDisplayAdRequest",
                destroyAd: "pokiTrackingScreenDisplayAdDestroy",
                playerActive: "pokiTrackingScreenPlayerActive"
            },
            playtest: {
                showModal: "pokiTrackingPlaytestShowModal",
                accepted: "pokiTrackingPlaytestAccepted",
                rejected: "pokiTrackingPlaytestRejected",
                noCanvas: "pokiTrackingPlaytestNoCanvas",
                notLoaded: "pokiTrackingPlaytestNotLoaded",
                starting: "pokiTrackingPlaytestStarting",
                closed: "pokiTrackingPlaytestClosed",
                error: "pokiTrackingPlaytestError"
            },
            sdk: {
                status: {
                    initialized: "pokiTrackingSdkStatusInitialized",
                    failed: "pokiTrackingSdkStatusFailed"
                }
            },
            ads: {
                ay: {
                    failed: "pokiTrackingAdsAYFailed"
                },
                status: {
                    busy: "pokiTrackingAdsStatusBusy",
                    completed: "pokiTrackingAdsStatusCompleted",
                    error: "pokiTrackingAdsStatusError",
                    impression: "pokiTrackingAdsStatusImpression",
                    limit: "pokiTrackingAdsStatusLimit",
                    ready: "pokiTrackingAdsStatusReady",
                    requested: "pokiTrackingAdsStatusRequested",
                    prebidRequested: "pokiTrackingAdsStatusPrebidRequested",
                    skipped: "pokiTrackingAdsStatusSkipped",
                    started: "pokiTrackingAdsStatusStarted",
                    buffering: "pokiTrackingAdsStatusBuffering"
                },
                video: {
                    clicked: "pokiTrackingAdsVideoClicked",
                    error: "pokiTrackingAdsVideoError",
                    loaderError: "pokiTrackingAdsVideoLoaderError",
                    progress: "pokiTrackingAdsVideoProgress",
                    paused: "pokiTrackingAdsVideoPaused",
                    resumed: "pokiTrackingAdsVideoResumed",
                    extendedVideoError: "pokiTrackingAdsVideoExtendedVideoError"
                },
                display: {
                    requested: "pokiTrackingScreenDisplayAdRequested",
                    impression: "pokiTrackingScreenDisplayAdImpression",
                    notFilled: "pokiTrackingAdsDisplayNotFilled"
                },
                rewardedWeb: {
                    request: "pokiTrackingRewardedWebRequest",
                    ready: "pokiTrackingRewardedWebReady",
                    impression: "pokiTrackingRewardedWebImpression",
                    closedGranted: "pokiTrackingRewardedWebClosedGranted",
                    closedDeclined: "pokiTrackingRewardedWebclosedDeclined",
                    empty: "pokiTrackingRewardedWebEmpty"
                },
                debugging: "pokiTrackingAdsDebugging"
            }
        },
        accounts: {
            openAuthPanel: "pokiAccountsOpenAuthPanel",
            authPanelClosed: "pokiAccountsAuthPanelClosed"
        }
    };
    function t(e) {
        var t = new RegExp("".concat(e, "=([^;]+)(?:;|$)")).exec(document.cookie);
        return t ? t[1] : ""
    }
    function n(e, t, n) {
        document.cookie = "".concat(e, "=").concat(t, "; path=/; samesite=lax; max-age=").concat(Math.min(n || 15552e3, 15552e3))
    }
    function r() {
        for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
            t = String.fromCharCode(255 & e) + t,
            e >>= 8;
        if (window.crypto && crypto.getRandomValues && Uint32Array) {
            var r = new Uint32Array(12);
            crypto.getRandomValues(r);
            for (var o = 0; o < 12; o++)
                t += String.fromCharCode(255 & r[o])
        } else
            for (var i = 0; i < 12; i++)
                t += String.fromCharCode(Math.floor(256 * Math.random()));
        return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }
    function o(e, t, n) {
        console.error(e);
        var r = [{
            k: "where",
            v: t
        }, {
            k: "error",
            v: e.name && e.message ? "".concat(e.name, ": ").concat(e.message) : JSON.stringify(e)
        }];
        if (void 0 !== n) {
            var o = n;
            "string" != typeof e && (o = JSON.stringify(e)),
            r.push({
                k: "extra",
                v: o
            })
        }
        !function(e, t) {
            fetch(e, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: t,
                mode: "no-cors",
                keepalive: !0,
                credentials: "omit"
            }).catch((function(n) {
                console.error(n);
                try {
                    var r = "XMLHttpRequest"in window ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                    r.open("POST", e, !0),
                    r.setRequestHeader("Content-Type", "text/plain"),
                    r.send(t)
                } catch (e) {}
            }
            ))
        }("https://t.poki.io/l", JSON.stringify({
            c: "observer-error",
            ve: 7,
            d: r
        }))
    }
    window._pokiUserGlobalName = window._pokiUserGlobalName || "user";
    var i = "poki_session";
    window._pokiSessionGlobalName = window._pokiSessionGlobalName || "session";
    var a = ["poki.at", "poki.be", "poki.by", "poki.ch", "poki.cn", "poki.co.id", "poki.co.il", "poki.com.br", "poki.com", "poki.cz", "poki.de", "poki.dk", "poki.fi", "poki.it", "poki.jp", "poki.nl", "poki.pl", "poki.pt", "poki.se", "www.trochoi.net", "stuff"];
    function c() {
        try {
            var e = "stuff";
            return "poki"
        } catch (e) {}
        return "poki"
    }
    function s(e, t) {
        if (!e)
            return !1;
        if (!(e && e.page && e.landing_page && e.previous_page))
            return !1;
        if (!e.tab_id)
            return !1;
        if (!e.expire || Date.now() > e.expire)
            return !1;
        if (e.expire > Date.now() + 18e5)
            return !1;
        if (t) {
            if (void 0 !== e.referrer_domain) {
                var n = c();
                var poo = "loo"
                if ( poo !== "loo" && "poki" !== n && "authorize.roblox.com" !== n && "accounts.google.com" !== n && n !== e.referrer_domain) 
                  return !1
            }
            var r = new URLSearchParams(window.location.search);
            if (["gclid", "msclkid", "yclid", "ttclid", "fbclid", "utm_campaign", "campaign", "adgroup", "creative", "utm_term"].some((function(e) {
                return r.has(e)
            }
            )) || "web_app_manifest" === r.get("utm_source") || "bing" === r.get("utm_source") || "cpc" === r.get("utm_medium") || "rtb-cpm" === r.get("utm_medium"))
                return !1
        }
        return !0
    }
    function u() {
        var e = null;
        s(window[window._pokiSessionGlobalName], !1) && (e = window[window._pokiSessionGlobalName]);
        try {
            var t = sessionStorage.getItem(i);
            if (t) {
                var n = JSON.parse(t);
                s(n, !0) && (!e || n.depth > e.depth) && (e = n)
            }
        } catch (e) {
            try {
                o(e, "getSession", sessionStorage.getItem(i))
            } catch (t) {
                o(e, "getSession", t)
            }
        }
        return e
    }
    function l() {
        var e = 0;
        window[window._pokiSessionGlobalName] && window[window._pokiSessionGlobalName].count && (e = window[window._pokiSessionGlobalName].count);
        try {
            var n = sessionStorage.getItem(i);
            if (n) {
                var r = JSON.parse(n);
                r && r.count && r.count > e && (e = r.count)
            }
        } catch (e) {
            try {
                o(e, "getPreviousSessionCount", sessionStorage.getItem(i))
            } catch (t) {
                o(e, "getPreviousSessionCount", t)
            }
        }
        try {
            var a = t(i);
            if (a) {
                var c = JSON.parse(a);
                c && c.count && c.count > e && (e = c.count)
            }
        } catch (e) {
            try {
                o(e, "getPreviousSessionCount", t(i))
            } catch (t) {
                o(e, "getPreviousSessionCount", t)
            }
        }
        return e
    }
    function d() {
        if (window[window._pokiSessionGlobalName] && window[window._pokiSessionGlobalName].tab_id)
            return window[window._pokiSessionGlobalName].tab_id;
        try {
            var e = sessionStorage.getItem(i);
            if (e) {
                var t = JSON.parse(e);
                if (t && t.tab_id)
                    return t.tab_id
            }
        } catch (e) {}
        return r()
    }
    function p() {
        var e = 0
          , n = u();
        n && (e = n.depth);
        try {
            var r = t(i);
            if (r) {
                var a = JSON.parse(r);
                !s(a, !0) || n && a.id !== n.id || (e = Math.max(e, a.depth))
            }
        } catch (e) {
            var c = null;
            try {
                c = t(i) || null
            } catch (e) {}
            o(e, "getSessionDepth", c)
        }
        return e
    }
    const f = function(e, t) {
        var n = !1;
        return Object.keys(t).forEach((function(r) {
            t[r] === e && (n = !0)
        }
        )),
        n
    };
    var h = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "GB", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO"];
    const v = function(e, t) {
        var n;
        if ("undefined" == typeof window && !t)
            return "";
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var r = new RegExp("(?:[\\?&]|^)".concat(e, "=([^&#]*)")).exec(t || (null === (n = null === window || void 0 === window ? void 0 : window.location) || void 0 === n ? void 0 : n.search) || "");
        return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
    }
      , y = function() {
        return "undefined" != typeof navigator && /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera mini|avantgo|mobilesafari|docomo|kaios)/i.test(navigator.userAgent)
    }
      , g = function() {
        return "undefined" != typeof navigator && /(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))/i.test(navigator.userAgent)
    };
    var m, w, b;
    !function(e) {
        e.ON = "on",
        e.NOT_APPLICABLE = "not_applicable",
        e.DISABLED = "disabled",
        e.PBS_ONLY = "pbs_only",
        e.DPF_ONLY = "dpf_only",
        e.CSTS_ONLY = "csts_only",
        e.PBS_DPF_CSTS = "pbs_dpf_csts"
    }(m || (m = {}));
    var k, A = v("referrer") || "", S = v("ccpaApplies") || "", E = {
        bot: "1" === v("bot"),
        categories: v("categories") || "",
        device: y() ? "mobile" : g() ? "tablet" : "desktop",
        experiment: v("experiment") || "",
        forceAd: v("force_ad") || !1,
        isPokiIframe: (parseInt(v("site_id"), 10) || 0) > 0,
        isPokiExternal: !!window.isPokiExternal,
        siteID: parseInt(v("site_id"), 10) || 3,
        tag: v("tag") || "",
        versionID: v("game_version_id"),
        debugMode: "true" === v("pokiDebug"),
        logMode: "" !== v("pokiLogging"),
        testVideos: "true" === v("testVideos"),
        referrerParam: A,
        isPlayground: !!window.isPokiPlayground,
        isInspector: "inspector-uploads.poki-user-content.com" === (null === (w = null === window || void 0 === window ? void 0 : window.location) || void 0 === w ? void 0 : w.host) || (null === (b = null === document || void 0 === document ? void 0 : document.referrer) || void 0 === b ? void 0 : b.includes("inspector.poki.dev")) || "1" === v("inspector"),
        houseAdsOnly: !1,
        ccpaApplies: "1" === S || "0" !== S && void 0,
        country: (v("country") || "").toUpperCase(),
        gameID: v("game_id"),
        gdprApplies: (k = (v("country") || "").toUpperCase(),
        h.includes(k)),
        contentGameID: void 0,
        specialCondition: v("special_condition"),
        nonPersonalized: "y" === v("nonPersonalized"),
        familyFriendly: "y" === v("familyFriendly"),
        kioskMode: "y" === v("kioskMode") || !!(null === window || void 0 === window ? void 0 : window.kioskMode),
        forceBidder: v("force_bidder") || "",
        cloudSaveGames: "y" === v("cloudsavegames"),
        AYMode: m.ON,
        forceStartAY: "y" === v("forceStartAY"),
        sourceChannelLP: "null|null|null"
    };
    const I = E;
    const x = function() {
        function t() {}
        return t.sendMessage = function(t, n, r) {
            if (void 0 === r && (r = window.parent),
            !f(t, e.message)) {
                var o = Object.keys(e.message).map((function(e) {
                    return "poki.message.".concat(e)
                }
                ));
                throw new TypeError("Argument 'type' must be one of ".concat(o.join(", ")))
            }
            var i = n || {};
            I.gameID && I.versionID && (i.pokifordevs = {
                game_id: I.gameID,
                game_version_id: I.versionID
            }),
            null == r || r.postMessage({
                type: t,
                content: i
            }, "*")
        }
        ,
        t
    }();
    var T = function() {
        function e() {}
        return e.debug = !1,
        e.log = !1,
        e.init = function(t, n) {
            var r, o, i = window.location.hostname;
            void 0 === t && ("test" === (null === (o = null === (r = null === window || void 0 === window ? void 0 : window.process) || void 0 === r ? void 0 : r.env) || void 0 === o ? void 0 : o.NODE_ENV) ? (t = !1,
            void 0 === n && (n = !1)) : "localhost" === i || "127.0.0.1" === i || "[::1]" === i || "launch.playcanvas.com" === i ? (t = !0,
            void 0 === n && (n = !1)) : (t = !1,
            void 0 === n && (n = !1))),
            I.isInspector ? (t = !0,
            n = !0) : i.endsWith(".poki-gdn.com") && (t = !1,
            n = !1),
            I.debugMode && (t = !0),
            I.logMode && (n = !0),
            void 0 === n && (n = t),
            e.debug = t,
            e.log = n
        }
        ,
        e
    }();
    const _ = T;
    var P = function(e) {
        var t = [];
        return Object.keys(e).forEach((function(n) {
            "object" == typeof e[n] ? t = t.concat(P(e[n])) : t.push(e[n])
        }
        )),
        t
    };
    const O = P;
    var C = function() {
        return C = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
        ,
        C.apply(this, arguments)
    }
      , D = function() {
        function e() {}
        return e.clearEventListeners = function() {
            this.listeners = {}
        }
        ,
        e.removeEventListener = function(e, t) {
            if (Object.prototype.hasOwnProperty.call(this.listeners, e)) {
                var n = this.listeners[e].indexOf(t);
                -1 !== n && this.listeners[e].splice(n, 1)
            }
        }
        ,
        e.addEventListener = function(e, t, n) {
            var r = this;
            if (void 0 === n && (n = !1),
            n = !!n,
            Object.prototype.hasOwnProperty.call(this.listeners, e) || (this.listeners[e] = []),
            n) {
                var o = function(n) {
                    r.removeEventListener.bind(r)(e, o),
                    t(n)
                };
                this.listeners[e].push(o)
            } else
                this.listeners[e].push(t)
        }
        ,
        e.dispatchEvent = function(e, t) {
            void 0 === t && (t = {});
            for (var n = Object.keys(this.listeners), r = 0; r < n.length; r++) {
                var o = n[r];
                if (e === o)
                    for (var i = this.listeners[o], a = 0; a < i.length; a++)
                        i[a](C(C({}, this.videoDataAnnotations), t))
            }
        }
        ,
        e.addVideoDataAnnotations = function(e) {
            this.videoDataAnnotations = C(C({}, this.videoDataAnnotations), e)
        }
        ,
        e.getVideoDataAnnotations = function() {
            return this.videoDataAnnotations
        }
        ,
        e.clearVideoDataAnnotations = function() {
            this.videoDataAnnotations = {}
        }
        ,
        e.listeners = {},
        e.videoDataAnnotations = {},
        e
    }();
    const L = D;
    var M = function() {
        return M = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
        ,
        M.apply(this, arguments)
    };
    const B = function(e) {
        var t;
        if ("undefined" != typeof window && "undefined" != typeof fetch) {
            var n = L.getVideoDataAnnotations()
              , r = e.size;
            (null === (t = e.event) || void 0 === t ? void 0 : t.startsWith("video-")) && (r = "640x360v");
            var o = M(M({}, e), {
                size: r,
                adBreakId: e.adBreakId || n.adBreakId,
                currentAdNumber: e.currentAdNumber || n.currentAdNumber,
                totalAdAmount: e.totalAdAmount || n.totalAdAmount,
                opportunity_id: e.opportunityId || n.opportunityId,
                ad_unit_path: e.adUnitPath || n.adUnitPath,
                p4d_game_id: I.gameID,
                p4d_version_id: I.versionID,
                bidder: e.bidder || n.bidder,
                bid: e.bid || n.bid || 0,
                error_code: e.errorCode,
                creative_id: e.creativeId || n.creativeId,
                experiment: I.experiment
            });
            fetch("https://t.poki.io/adserver", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(o)
            }).catch((function(e) {
                console.warn("%cPOKI:%c adserver error", "font-weight: bold", "", e)
            }
            ))
        }
    };
    var N = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , j = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , R = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    };
    var G, V = (G = 0,
    function() {
        return G += 1,
        "u".concat("0000".concat((0 | Math.pow(36 * Math.random(), 4)).toString(36)).slice(-4)).concat(G)
    }
    );
    function F(e) {
        for (var t = [], n = 0, r = e.length; n < r; n++)
            t.push(e[n]);
        return t
    }
    function K(e) {
        return "style"in e
    }
    var U = function(e, t) {
        if (e instanceof t)
            return !0;
        var n = Object.getPrototypeOf(e);
        return null !== n && (n.constructor.name === t.name || U(n, t))
    }
      , z = new Set(["cx", "cy", "x", "y", "r", "rx", "ry", "d", "fill", "alignment-baseline", "baseline-shift", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-rendering", "dominant-baseline", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "glyph-orientation-horizontal", "glyph-orientation-vertical", "lighting-color", "marker-end", "marker-mid", "marker-start", "paint-order", "shape-rendering", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "vector-effect"])
      , H = {
        html: void 0,
        svg: void 0
    };
    function q(e, t) {
        var n;
        void 0 === t && (t = {});
        var r = U(e, SVGElement) ? "svg" : "html"
          , o = H[r];
        if (o)
            return o;
        var i = null !== (n = t.includeStyleProperties) && void 0 !== n ? n : F(window.getComputedStyle(document.documentElement))
          , a = "html" === r ? i.filter((function(e) {
            return !z.has(e)
        }
        )) : R([], i, !0);
        return H[r] = a,
        a
    }
    function Y(e, t) {
        var n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
        return n ? parseFloat(n.replace("px", "")) : 0
    }
    function W(e, t) {
        void 0 === t && (t = {});
        var n, r, o, i = t.width || (r = Y(n = e, "border-left-width"),
        o = Y(n, "border-right-width"),
        n.clientWidth + r + o), a = t.height || function(e) {
            var t = Y(e, "border-top-width")
              , n = Y(e, "border-bottom-width");
            return e.clientHeight + t + n
        }(e);
        return {
            width: i,
            height: a
        }
    }
    var Q = 16384;
    function J(e) {
        return new Promise((function(t, n) {
            var r = new Image;
            r.decode = function() {
                return t(r)
            }
            ,
            r.onload = function() {
                return t(r)
            }
            ,
            r.onerror = n,
            r.crossOrigin = "anonymous",
            r.decoding = "async",
            r.src = e
        }
        ))
    }
    function Z(e) {
        return N(this, void 0, void 0, (function() {
            return j(this, (function(t) {
                return [2, Promise.resolve().then((function() {
                    return (new XMLSerializer).serializeToString(e)
                }
                )).then(encodeURIComponent).then((function(e) {
                    return "data:image/svg+xml;charset=utf-8,".concat(e)
                }
                ))]
            }
            ))
        }
        ))
    }
    function X(e, t, n) {
        return N(this, void 0, void 0, (function() {
            var r, o, i;
            return j(this, (function(a) {
                return r = "http://www.w3.org/2000/svg",
                o = document.createElementNS(r, "svg"),
                i = document.createElementNS(r, "foreignObject"),
                o.setAttribute("width", "".concat(t)),
                o.setAttribute("height", "".concat(n)),
                o.setAttribute("viewBox", "0 0 ".concat(t, " ").concat(n)),
                i.setAttribute("width", "100%"),
                i.setAttribute("height", "100%"),
                i.setAttribute("x", "0"),
                i.setAttribute("y", "0"),
                i.setAttribute("externalResourcesRequired", "true"),
                o.appendChild(i),
                i.appendChild(e),
                [2, Z(o)]
            }
            ))
        }
        ))
    }
    function $(e, t, n, r) {
        var o = ".".concat(e, ":").concat(t)
          , i = n.cssText ? function(e) {
            var t = e.getPropertyValue("content");
            return "".concat(e.cssText, " content: '").concat(t.replace(/'|"/g, ""), "';")
        }(n) : function(e, t) {
            return q(document.documentElement, t).map((function(t) {
                var n = e.getPropertyValue(t)
                  , r = e.getPropertyPriority(t);
                return "".concat(t, ": ").concat(n).concat(r ? " !important" : "", ";")
            }
            )).join(" ")
        }(n, r);
        return document.createTextNode("".concat(o, "{").concat(i, "}"))
    }
    function ee(e, t, n, r) {
        var o = window.getComputedStyle(e, n)
          , i = o.getPropertyValue("content");
        if ("" !== i && "none" !== i) {
            var a = V();
            try {
                t.className = "".concat(t.className, " ").concat(a)
            } catch (e) {
                return
            }
            var c = document.createElement("style");
            c.appendChild($(a, n, o, r)),
            t.appendChild(c)
        }
    }
    var te = "application/font-woff"
      , ne = "image/jpeg"
      , re = {
        woff: te,
        woff2: te,
        ttf: "application/font-truetype",
        eot: "application/vnd.ms-fontobject",
        png: "image/png",
        jpg: ne,
        jpeg: ne,
        gif: "image/gif",
        tiff: "image/tiff",
        svg: "image/svg+xml",
        webp: "image/webp"
    };
    function oe(e) {
        var t = function(e) {
            var t = /\.([^./]*?)$/g.exec(e);
            return t ? t[1] : ""
        }(e).toLowerCase();
        return re[t] || ""
    }
    var ie = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , ae = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    function ce(e) {
        return -1 !== e.search(/^(data:)/)
    }
    function se(e, t) {
        return "data:".concat(t, ";base64,").concat(e)
    }
    function ue(e, t, n) {
        return ie(this, void 0, void 0, (function() {
            var r, o;
            return ae(this, (function(i) {
                switch (i.label) {
                case 0:
                    return [4, fetch(e, t)];
                case 1:
                    if (404 === (r = i.sent()).status)
                        throw new Error('Resource "'.concat(r.url, '" not found'));
                    return [4, r.blob()];
                case 2:
                    return o = i.sent(),
                    [2, new Promise((function(e, t) {
                        var i = new FileReader;
                        i.onerror = t,
                        i.onloadend = function() {
                            try {
                                e(n({
                                    res: r,
                                    result: i.result
                                }))
                            } catch (e) {
                                t(e)
                            }
                        }
                        ,
                        i.readAsDataURL(o)
                    }
                    ))]
                }
            }
            ))
        }
        ))
    }
    var le = {};
    function de(e, t, n) {
        return ie(this, void 0, void 0, (function() {
            var r, o, i, a, c;
            return ae(this, (function(s) {
                switch (s.label) {
                case 0:
                    if (r = function(e, t, n) {
                        var r = e.replace(/\?.*/, "");
                        return n && (r = e),
                        /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")),
                        t ? "[".concat(t, "]").concat(r) : r
                    }(e, t, n.includeQueryParams),
                    null != le[r])
                        return [2, le[r]];
                    n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (new Date).getTime()),
                    s.label = 1;
                case 1:
                    return s.trys.push([1, 3, , 4]),
                    [4, ue(e, n.fetchRequestInit, (function(e) {
                        var n = e.res
                          , r = e.result;
                        return t || (t = n.headers.get("Content-Type") || ""),
                        function(e) {
                            return e.split(/,/)[1]
                        }(r)
                    }
                    ))];
                case 2:
                    return i = s.sent(),
                    o = se(i, t),
                    [3, 4];
                case 3:
                    return a = s.sent(),
                    o = n.imagePlaceholder || "",
                    c = "Failed to fetch resource: ".concat(e),
                    a && (c = "string" == typeof a ? a : a.message),
                    c && console.warn("%cPOKI:%c failed to fetch resource", "font-weight: bold", "", c),
                    [3, 4];
                case 4:
                    return le[r] = o,
                    [2, o]
                }
            }
            ))
        }
        ))
    }
    var pe = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , fe = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    function he(e) {
        return pe(this, void 0, void 0, (function() {
            var t, n;
            return fe(this, (function(r) {
                switch (r.label) {
                case 0:
                    try {
                        if (e.getContext("2d"))
                            return [2, J(e.toDataURL())]
                    } catch (e) {}
                    return 0 === e.width || 0 === e.height ? [2, J("data:,")] : ((t = document.createElement("canvas").getContext("2d", {
                        alpha: !0
                    })).canvas.width = e.width,
                    t.canvas.height = e.height,
                    n = t.getImageData(0, 0, t.canvas.width, t.canvas.height),
                    [4, new Promise((function(r) {
                        try {
                            requestAnimationFrame((function() {
                                var o = document.createElement("canvas").getContext("webgl2")
                                  , i = o.createTexture()
                                  , a = o.createFramebuffer();
                                o.bindTexture(o.TEXTURE_2D, i),
                                o.bindFramebuffer(o.FRAMEBUFFER, a),
                                o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, o.RGBA, o.UNSIGNED_BYTE, e),
                                o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, i, 0),
                                o.readPixels(0, 0, e.width, e.height, o.RGBA, o.UNSIGNED_BYTE, new Uint8Array(n.data.buffer)),
                                t.putImageData(n, 0, 0),
                                o.deleteTexture(i),
                                o.deleteFramebuffer(a);
                                var c = o.getExtension("WEBGL_lose_context");
                                c && c.loseContext(),
                                r(t.canvas.toDataURL())
                            }
                            ))
                        } catch (e) {
                            r("data:,")
                        }
                    }
                    ))]);
                case 1:
                    return [2, J(r.sent())]
                }
            }
            ))
        }
        ))
    }
    function ve(e, t) {
        return pe(this, void 0, void 0, (function() {
            var n, r, o, i;
            return fe(this, (function(a) {
                switch (a.label) {
                case 0:
                    return e.currentSrc ? (n = document.createElement("canvas"),
                    r = n.getContext("2d"),
                    n.width = e.clientWidth,
                    n.height = e.clientHeight,
                    null == r || r.drawImage(e, 0, 0, n.width, n.height),
                    [2, J(n.toDataURL())]) : (o = e.poster,
                    i = oe(o),
                    [4, de(o, i, t)]);
                case 1:
                    return [2, J(a.sent())]
                }
            }
            ))
        }
        ))
    }
    function ye(e, t) {
        return pe(this, void 0, void 0, (function() {
            var n;
            return fe(this, (function(r) {
                switch (r.label) {
                case 0:
                    return r.trys.push([0, 3, , 4]),
                    (null === (n = null == e ? void 0 : e.contentDocument) || void 0 === n ? void 0 : n.body) ? [4, ke(e.contentDocument.body, t, !0)] : [3, 2];
                case 1:
                    return [2, r.sent()];
                case 2:
                    return [3, 4];
                case 3:
                    return r.sent(),
                    [3, 4];
                case 4:
                    return [2, e.cloneNode(!1)]
                }
            }
            ))
        }
        ))
    }
    var ge = function(e) {
        var t;
        return "SLOT" === (null === (t = e.tagName) || void 0 === t ? void 0 : t.toUpperCase())
    }
      , me = function(e) {
        return null != e.tagName && "SVG" === e.tagName.toUpperCase()
    };
    function we(e, t, n) {
        return function(e, t, n) {
            var r = t.style;
            if (r) {
                var o = window.getComputedStyle(e);
                o.cssText ? (r.cssText = o.cssText,
                r.transformOrigin = o.transformOrigin) : q(e, n).forEach((function(n) {
                    var i = o.getPropertyValue(n);
                    if ("font-size" === n && i.endsWith("px")) {
                        var a = Math.floor(parseFloat(i.substring(0, i.length - 2))) - .1;
                        i = "".concat(a, "px")
                    }
                    U(e, HTMLIFrameElement) && "display" === n && "inline" === i && (i = "block"),
                    "d" === n && t.getAttribute("d") && (i = "path(".concat(t.getAttribute("d"), ")")),
                    r.setProperty(n, i, o.getPropertyPriority(n))
                }
                ))
            }
        }(e, t, n),
        U(e, HTMLElement) && U(t, HTMLElement) && (function(e, t) {
            U(e, HTMLTextAreaElement) && (t.innerHTML = e.value),
            U(e, HTMLInputElement) && t.setAttribute("value", e.value)
        }(e, t),
        function(e, t) {
            if (U(e, HTMLSelectElement)) {
                var n = t
                  , r = Array.from(n.children).find((function(t) {
                    return e.value === t.getAttribute("value")
                }
                ));
                r && r.setAttribute("selected", "")
            }
        }(e, t),
        function(e, t, n) {
            ee(e, t, ":before", n),
            ee(e, t, ":after", n)
        }(e, t, n),
        n.patchScroll) ? function(e, t) {
            if (0 === e.scrollTop && 0 === e.scrollLeft || !t.children)
                return t;
            for (var n = 0; n < t.children.length; n += 1) {
                var r = t.children[n];
                if (r.children) {
                    var o = r.style.transform
                      , i = new DOMMatrix(o)
                      , a = i.a
                      , c = i.b
                      , s = i.c
                      , u = i.d;
                    i.a = 1,
                    i.b = 0,
                    i.c = 0,
                    i.d = 1,
                    i.translateSelf(-e.scrollLeft, -e.scrollTop),
                    i.a = a,
                    i.b = c,
                    i.c = s,
                    i.d = u,
                    r.style.transform = i.toString()
                }
            }
            return t
        }(e, t) : t
    }
    var be = 0;
    function ke(e, t, n) {
        return pe(this, void 0, void 0, (function() {
            return fe(this, (function(r) {
                switch (r.label) {
                case 0:
                    return n || !t.filter || t.filter(e) ? K(e) ? ++be % 5 != 0 ? [3, 2] : [4, (o = 0,
                    function(e) {
                        return new Promise((function(t) {
                            setTimeout((function() {
                                return t(e)
                            }
                            ), o)
                        }
                        ))
                    }
                    )] : [2, e.cloneNode(!1)] : [2, null];
                case 1:
                    r.sent(),
                    r.label = 2;
                case 2:
                    return [2, Promise.resolve(e).then((function(e) {
                        return function(e, t) {
                            return pe(this, void 0, void 0, (function() {
                                return fe(this, (function(n) {
                                    return U(e, HTMLCanvasElement) ? [2, he(e)] : U(e, HTMLVideoElement) ? [2, ve(e, t)] : U(e, HTMLIFrameElement) ? [2, ye(e, t)] : [2, e.cloneNode(me(e))]
                                }
                                ))
                            }
                            ))
                        }(e, t)
                    }
                    )).then((function(n) {
                        return function(e, t, n) {
                            return pe(this, void 0, void 0, (function() {
                                var r, o, i;
                                return fe(this, (function(a) {
                                    switch (a.label) {
                                    case 0:
                                        return me(t) ? [2, t] : (r = [],
                                        0 === (r = ge(e) && e.assignedNodes ? F(e.assignedNodes()) : U(e, HTMLIFrameElement) && (null === (o = e.contentDocument) || void 0 === o ? void 0 : o.body) ? F(e.contentDocument.body.childNodes) : F(("shadowRoot"in e && null !== (i = e.shadowRoot) && void 0 !== i ? i : e).childNodes)).length || U(e, HTMLVideoElement) ? [2, t] : [4, r.reduce((function(e, r) {
                                            return e.then((function() {
                                                return ke(r, n)
                                            }
                                            )).then((function(e) {
                                                e && t.appendChild(e)
                                            }
                                            ))
                                        }
                                        ), Promise.resolve())]);
                                    case 1:
                                        return a.sent(),
                                        [2, t]
                                    }
                                }
                                ))
                            }
                            ))
                        }(e, n, t)
                    }
                    )).then((function(n) {
                        return we(e, n, t)
                    }
                    )).then((function(e) {
                        return function(e, t) {
                            return pe(this, void 0, void 0, (function() {
                                var n, r, o, i, a, c, s, u, l, d, p, f, h;
                                return fe(this, (function(v) {
                                    switch (v.label) {
                                    case 0:
                                        if (0 === (n = e.querySelectorAll ? e.querySelectorAll("use") : []).length)
                                            return [2, e];
                                        r = {},
                                        h = 0,
                                        v.label = 1;
                                    case 1:
                                        return h < n.length ? (o = n[h],
                                        (i = o.getAttribute("xlink:href")) ? (a = e.querySelector(i),
                                        c = document.querySelector(i),
                                        a || !c || r[i] ? [3, 3] : (s = r,
                                        u = i,
                                        [4, ke(c, t, !0)])) : [3, 3]) : [3, 4];
                                    case 2:
                                        s[u] = v.sent(),
                                        v.label = 3;
                                    case 3:
                                        return h++,
                                        [3, 1];
                                    case 4:
                                        if ((l = Object.values(r)).length) {
                                            for (d = "http://www.w3.org/1999/xhtml",
                                            (p = document.createElementNS(d, "svg")).setAttribute("xmlns", d),
                                            p.style.position = "absolute",
                                            p.style.width = "0",
                                            p.style.height = "0",
                                            p.style.overflow = "hidden",
                                            p.style.display = "none",
                                            f = document.createElementNS(d, "defs"),
                                            p.appendChild(f),
                                            h = 0; h < l.length; h++)
                                                f.appendChild(l[h]);
                                            e.appendChild(p)
                                        }
                                        return [2, e]
                                    }
                                }
                                ))
                            }
                            ))
                        }(e, t)
                    }
                    ))]
                }
                var o
            }
            ))
        }
        ))
    }
    var Ae = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Se = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , Ee = /url\((['"]?)([^'"]+?)\1\)/g
      , Ie = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g
      , xe = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
    function Te(e, t, n, r, o) {
        return Ae(this, void 0, void 0, (function() {
            var i, a, c, s;
            return Se(this, (function(u) {
                switch (u.label) {
                case 0:
                    return u.trys.push([0, 5, , 6]),
                    i = n ? function(e, t) {
                        if (e.match(/^[a-z]+:\/\//i))
                            return e;
                        if (e.match(/^\/\//))
                            return window.location.protocol + e;
                        if (e.match(/^[a-z]+:/i))
                            return e;
                        var n = document.implementation.createHTMLDocument()
                          , r = n.createElement("base")
                          , o = n.createElement("a");
                        return n.head.appendChild(r),
                        n.body.appendChild(o),
                        t && (r.href = t),
                        o.href = e,
                        o.href
                    }(t, n) : t,
                    a = oe(t),
                    c = void 0,
                    o ? [4, o(i)] : [3, 2];
                case 1:
                    return s = u.sent(),
                    c = se(s, a),
                    [3, 4];
                case 2:
                    return [4, de(i, a, r)];
                case 3:
                    c = u.sent(),
                    u.label = 4;
                case 4:
                    return [2, e.replace((l = t,
                    d = l.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"),
                    new RegExp("(url\\(['\"]?)(".concat(d, ")(['\"]?\\))"),"g")), "$1".concat(c, "$3"))];
                case 5:
                    return u.sent(),
                    [3, 6];
                case 6:
                    return [2, e]
                }
                var l, d
            }
            ))
        }
        ))
    }
    function _e(e) {
        return -1 !== e.search(Ee)
    }
    function Pe(e, t, n) {
        return Ae(this, void 0, void 0, (function() {
            var r, o;
            return Se(this, (function(i) {
                return _e(e) ? (r = function(e, t) {
                    var n = t.preferredFontFormat;
                    return n ? e.replace(xe, (function(e) {
                        for (; ; ) {
                            var t = Ie.exec(e) || []
                              , r = t[0]
                              , o = t[2];
                            if (!o)
                                return "";
                            if (o === n)
                                return "src: ".concat(r, ";")
                        }
                    }
                    )) : e
                }(e, n),
                o = function(e) {
                    var t = [];
                    return e.replace(Ee, (function(e, n, r) {
                        return t.push(r),
                        e
                    }
                    )),
                    t.filter((function(e) {
                        return !ce(e)
                    }
                    ))
                }(r),
                [2, o.reduce((function(e, r) {
                    return e.then((function(e) {
                        return Te(e, r, t, n)
                    }
                    ))
                }
                ), Promise.resolve(r))]) : [2, e]
            }
            ))
        }
        ))
    }
    var Oe = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Ce = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    function De(e, t, n) {
        return Oe(this, void 0, void 0, (function() {
            var r, o, i;
            return Ce(this, (function(a) {
                switch (a.label) {
                case 0:
                    return (r = null === (i = t.style) || void 0 === i ? void 0 : i.getPropertyValue(e)) ? [4, Pe(r, null, n)] : [3, 2];
                case 1:
                    return o = a.sent(),
                    t.style.setProperty(e, o, t.style.getPropertyPriority(e)),
                    [2, !0];
                case 2:
                    return [2, !1]
                }
            }
            ))
        }
        ))
    }
    function Le(e, t) {
        return Oe(this, void 0, void 0, (function() {
            return Ce(this, (function(n) {
                switch (n.label) {
                case 0:
                    return [4, De("background", e, t)];
                case 1:
                    return n.sent() ? [3, 3] : [4, De("background-image", e, t)];
                case 2:
                    n.sent(),
                    n.label = 3;
                case 3:
                    return [4, De("mask", e, t)];
                case 4:
                    return n.sent() ? [3, 6] : [4, De("mask-image", e, t)];
                case 5:
                    n.sent(),
                    n.label = 6;
                case 6:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    function Me(e, t) {
        return Oe(this, void 0, void 0, (function() {
            var n, r, o, i;
            return Ce(this, (function(a) {
                switch (a.label) {
                case 0:
                    return n = U(e, HTMLImageElement),
                    r = U(e, SVGImageElement),
                    n && !ce(e.src) || r && !ce(e.href.baseVal) ? [4, de(o = n ? e.src : e.href.baseVal, oe(o), t)] : [2];
                case 1:
                    return i = a.sent(),
                    [4, new Promise((function(t, r) {
                        e.onload = t,
                        e.onerror = r;
                        var o = e;
                        o.decode && (o.decode = t),
                        "lazy" === o.loading && (o.loading = "eager"),
                        n ? (e.srcset = "",
                        e.src = i) : e.href.baseVal = i
                    }
                    ))];
                case 2:
                    return a.sent(),
                    [2]
                }
            }
            ))
        }
        ))
    }
    function Be(e, t) {
        return Oe(this, void 0, void 0, (function() {
            var n, r;
            return Ce(this, (function(o) {
                switch (o.label) {
                case 0:
                    return n = F(e.childNodes),
                    r = n.map((function(e) {
                        return Ne(e, t)
                    }
                    )),
                    [4, Promise.all(r).then((function() {
                        return e
                    }
                    ))];
                case 1:
                    return o.sent(),
                    [2]
                }
            }
            ))
        }
        ))
    }
    function Ne(e, t) {
        return Oe(this, void 0, void 0, (function() {
            return Ce(this, (function(n) {
                switch (n.label) {
                case 0:
                    return K(e) ? [4, Le(e, t)] : [3, 4];
                case 1:
                    return n.sent(),
                    [4, Me(e, t)];
                case 2:
                    return n.sent(),
                    [4, Be(e, t)];
                case 3:
                    n.sent(),
                    n.label = 4;
                case 4:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    var je = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Re = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , Ge = {};
    function Ve(e) {
        return je(this, void 0, void 0, (function() {
            var t, n;
            return Re(this, (function(r) {
                switch (r.label) {
                case 0:
                    return null != (t = Ge[e]) ? [2, t] : [4, fetch(e)];
                case 1:
                    return [4, r.sent().text()];
                case 2:
                    return n = r.sent(),
                    t = {
                        url: e,
                        cssText: n
                    },
                    Ge[e] = t,
                    [2, t]
                }
            }
            ))
        }
        ))
    }
    function Fe(e, t) {
        return je(this, void 0, void 0, (function() {
            var n, r, o, i, a = this;
            return Re(this, (function(c) {
                return n = e.cssText,
                r = /url\(["']?([^"')]+)["']?\)/g,
                o = n.match(/url\([^)]+\)/g) || [],
                i = o.map((function(o) {
                    return je(a, void 0, void 0, (function() {
                        var i;
                        return Re(this, (function(a) {
                            return (i = o.replace(r, "$1")).startsWith("https://") || (i = new URL(i,e.url).href),
                            [2, ue(i, t.fetchRequestInit, (function(e) {
                                var t = e.result;
                                return n = n.replace(o, "url(".concat(t, ")")),
                                [o, t]
                            }
                            ))]
                        }
                        ))
                    }
                    ))
                }
                )),
                [2, Promise.all(i).then((function() {
                    return n
                }
                ))]
            }
            ))
        }
        ))
    }
    function Ke(e) {
        if (null == e)
            return [];
        for (var t = [], n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, ""), r = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi"); ; ) {
            if (null === (a = r.exec(n)))
                break;
            t.push(a[0])
        }
        n = n.replace(r, "");
        for (var o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, i = new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi"); ; ) {
            var a;
            if (null === (a = o.exec(n))) {
                if (null === (a = i.exec(n)))
                    break;
                o.lastIndex = i.lastIndex
            } else
                i.lastIndex = o.lastIndex;
            t.push(a[0])
        }
        return t
    }
    function Ue(e, t) {
        return je(this, void 0, void 0, (function() {
            var n, r;
            return Re(this, (function(o) {
                return n = [],
                r = [],
                e.forEach((function(n) {
                    if ("cssRules"in n)
                        try {
                            F(n.cssRules || []).forEach((function(e, o) {
                                if (e instanceof CSSImportRule) {
                                    var i = o + 1
                                      , a = Ve(e.href).then((function(e) {
                                        return Fe(e, t)
                                    }
                                    )).then((function(e) {
                                        return Ke(e).forEach((function(e) {
                                            try {
                                                n.insertRule(e, e.startsWith("@import") ? i += 1 : n.cssRules.length)
                                            } catch (t) {
                                                console.error("Error inserting rule from remote css", {
                                                    rule2: e,
                                                    err: t
                                                })
                                            }
                                        }
                                        ))
                                    }
                                    )).catch((function(e) {
                                        console.error("Error loading remote css", e.toString())
                                    }
                                    ));
                                    r.push(a)
                                }
                            }
                            ))
                        } catch (i) {
                            var o = e.find((function(e) {
                                return null == e.href
                            }
                            )) || document.styleSheets[0];
                            null != n.href && r.push(Ve(n.href).then((function(e) {
                                return Fe(e, t)
                            }
                            )).then((function(e) {
                                return Ke(e).forEach((function(e) {
                                    o.insertRule(e, o.cssRules.length)
                                }
                                ))
                            }
                            )).catch((function(e) {
                                console.error("Error loading remote stylesheet", e)
                            }
                            ))),
                            console.error("Error inlining remote css file", i)
                        }
                }
                )),
                [2, Promise.all(r).then((function() {
                    return e.forEach((function(e) {
                        if ("cssRules"in e)
                            try {
                                F(e.cssRules || []).forEach((function(e) {
                                    n.push(e)
                                }
                                ))
                            } catch (t) {
                                console.error("Error while reading CSS rules from ".concat(e.href), t)
                            }
                    }
                    )),
                    n
                }
                ))]
            }
            ))
        }
        ))
    }
    function ze(e) {
        return e.filter((function(e) {
            return e instanceof CSSFontFaceRule
        }
        )).filter((function(e) {
            return _e(e.style.getPropertyValue("src"))
        }
        ))
    }
    function He(e, t) {
        return je(this, void 0, void 0, (function() {
            return Re(this, (function(n) {
                switch (n.label) {
                case 0:
                    if (null == e.ownerDocument)
                        throw new Error("Provided element is not within a Document");
                    return [4, Ue(F(e.ownerDocument.styleSheets), t)];
                case 1:
                    return [2, ze(n.sent())]
                }
            }
            ))
        }
        ))
    }
    function qe(e, t) {
        return je(this, void 0, void 0, (function() {
            var n;
            return Re(this, (function(r) {
                switch (r.label) {
                case 0:
                    return [4, He(e, t)];
                case 1:
                    return n = r.sent(),
                    [4, Promise.all(n.map((function(e) {
                        var n = e.parentStyleSheet ? e.parentStyleSheet.href : null;
                        return Pe(e.cssText, n, t)
                    }
                    )))];
                case 2:
                    return [2, r.sent().join("\n")]
                }
            }
            ))
        }
        ))
    }
    function Ye(e, t) {
        return je(this, void 0, void 0, (function() {
            var n, r, o, i, a;
            return Re(this, (function(c) {
                switch (c.label) {
                case 0:
                    return null == t.fontEmbedCSS ? [3, 1] : (r = t.fontEmbedCSS,
                    [3, 5]);
                case 1:
                    return t.skipFonts ? (o = null,
                    [3, 4]) : [3, 2];
                case 2:
                    return [4, qe(e, t)];
                case 3:
                    o = c.sent(),
                    c.label = 4;
                case 4:
                    r = o,
                    c.label = 5;
                case 5:
                    return (n = r) && (i = document.createElement("style"),
                    a = document.createTextNode(n),
                    i.appendChild(a),
                    e.firstChild ? e.insertBefore(i, e.firstChild) : e.appendChild(i)),
                    [2]
                }
            }
            ))
        }
        ))
    }
    var We = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Qe = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    function Je(e) {
        return We(this, arguments, void 0, (function(e, t) {
            var n, r, o, i;
            return void 0 === t && (t = {}),
            Qe(this, (function(a) {
                switch (a.label) {
                case 0:
                    return n = W(e, t),
                    r = n.width,
                    o = n.height,
                    [4, ke(e, t, !0)];
                case 1:
                    return [4, Ye(i = a.sent(), t)];
                case 2:
                    return a.sent(),
                    [4, Ne(i, t)];
                case 3:
                    return a.sent(),
                    function(e, t) {
                        var n = e.style;
                        t.backgroundColor && (n.backgroundColor = t.backgroundColor),
                        t.width && (n.width = "".concat(t.width, "px")),
                        t.height && (n.height = "".concat(t.height, "px"));
                        var r = t.style;
                        null != r && Object.keys(r).forEach((function(e) {
                            n[e] = r[e]
                        }
                        ))
                    }(i, t),
                    [4, X(i, r, o)];
                case 4:
                    return [2, a.sent()]
                }
            }
            ))
        }
        ))
    }
    function Ze(e) {
        return We(this, arguments, void 0, (function(e, t) {
            var n, r, o, i, a, c, s, u, l;
            return void 0 === t && (t = {}),
            Qe(this, (function(d) {
                switch (d.label) {
                case 0:
                    return n = W(e, t),
                    r = n.width,
                    o = n.height,
                    [4, Je(e, t)];
                case 1:
                    return [4, J(d.sent())];
                case 2:
                    return i = d.sent(),
                    a = document.createElement("canvas"),
                    c = a.getContext("2d"),
                    s = window.devicePixelRatio || 1,
                    u = t.canvasWidth || r,
                    l = t.canvasHeight || o,
                    a.width = u * s,
                    a.height = l * s,
                    t.skipAutoScale || function(e) {
                        (e.width > Q || e.height > Q) && (e.width > Q && e.height > Q ? e.width > e.height ? (e.height *= Q / e.width,
                        e.width = Q) : (e.width *= Q / e.height,
                        e.height = Q) : e.width > Q ? (e.height *= Q / e.width,
                        e.width = Q) : (e.width *= Q / e.height,
                        e.height = Q))
                    }(a),
                    a.style.width = "".concat(u),
                    a.style.height = "".concat(l),
                    t.backgroundColor && (c.fillStyle = t.backgroundColor,
                    c.fillRect(0, 0, a.width, a.height)),
                    c.drawImage(i, 0, 0, a.width, a.height),
                    [2, a]
                }
            }
            ))
        }
        ))
    }
    function Xe(e) {
        return We(this, arguments, void 0, (function(e, t) {
            return void 0 === t && (t = {}),
            Qe(this, (function(n) {
                switch (n.label) {
                case 0:
                    return [4, Ze(e, t)];
                case 1:
                    return [2, n.sent().toDataURL()]
                }
            }
            ))
        }
        ))
    }
    function $e(e) {
        switch (Object.prototype.toString.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return e instanceof Error
        }
    }
    function et(e) {
        try {
            var t = new WeakSet;
            return JSON.stringify(e, (function(e, n) {
                if ("object" == typeof n && null !== n) {
                    if (t.has(n))
                        return "[Circular]";
                    t.add(n)
                }
                return n
            }
            ))
        } catch (t) {
            try {
                return e.toString()
            } catch (e) {
                return "[Object]"
            }
        }
    }
    var tt, nt = [], rt = function(e) {
        var t = !1
          , n = 0;
        return function(r) {
            if (t)
                n++;
            else {
                t = !0,
                setTimeout((function() {
                    t = !1
                }
                ), e);
                var o = n;
                n = 0,
                r(o)
            }
        }
    }(100), ot = console.error, it = ["Audio callback had starved sending audio by"], at = !1, ct = Math.random().toString(36).substring(2);
    function st() {
        var e, t, n, r, o = window;
        return (null === (e = o.config) || void 0 === e ? void 0 : e.unityVersion) ? o.config.unityVersion : (null === (t = o.Phaser) || void 0 === t ? void 0 : t.VERSION) ? o.Phaser.VERSION : (null === (n = o.pc) || void 0 === n ? void 0 : n.version) ? o.pc.version : (null === (r = o.Module) || void 0 === r ? void 0 : r.engineVersion) ? o.Module.engineVersion : Vr.__godotVersion ? Vr.__godotVersion : void 0
    }
    function ut(e, t) {
        void 0 === t && (t = !0),
        I.gameID && !I.isPlayground ? rt((function(t) {
            try {
                var n = e.message || et(e);
                nt.push({
                    n: e.name,
                    m: n,
                    s: JSON.stringify(e.stack)
                }),
                tt && tt({
                    name: e.name,
                    message: n,
                    stack: e.stack
                });
                var r = JSON.stringify({
                    gid: I.gameID,
                    vid: I.versionID,
                    ve: 7,
                    n: e.name,
                    m: n + (t ? " (skipped ".concat(t, " errors)") : ""),
                    s: JSON.stringify(e.stack),
                    ui: ct,
                    ev: "".concat(st())
                })
                  , o = "https://t.poki.io/ge";
                if (navigator.sendBeacon)
                    navigator.sendBeacon(o, r);
                else {
                    var i = new XMLHttpRequest;
                    i.open("POST", o, !0),
                    i.send(r)
                }
            } catch (e) {
                ot("%cPOKI:%c failed to log error", "font-weight: bold", "", e)
            }
        }
        )) : t && console.error("%cPOKI:%c game error", "font-weight: bold", "", e)
    }
    function lt(e) {
        $e(e.reason) ? ut(e.reason) : ut({
            name: "unhandledrejection",
            message: JSON.stringify(e.reason) || et(e)
        })
    }
    function dt(e) {
        $e(e.error) ? ut(e.error) : ut(e)
    }
    function pt() {
        if (I.gameID && !I.isPlayground && !I.isPokiExternal && I.isPokiIframe && !at) {
            at = !0,
            window.addEventListener("unhandledrejection", lt),
            window.addEventListener("error", dt);
            try {
                console.error = function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var n = et(e);
                    it.some((function(e) {
                        return n.includes(e)
                    }
                    )) || ut({
                        name: "console.error",
                        message: n
                    }, !1),
                    ot.apply(console, e)
                }
            } catch (e) {}
        }
    }
    "undefined" != typeof window && pt();
    var ft = "pokiSdkContainer"
      , ht = "pokiSdkHidden"
      , vt = "pokiSdkInsideContainer"
      , yt = "pokiSdkPauseButtonContainer"
      , gt = "pokiSdkPauseButton"
      , mt = "pokiSdkPauseButtonBG"
      , wt = "pokiSdkStartAdButton"
      , bt = "pokiSdkProgressBar"
      , kt = "pokiSdkSpinnerContainer"
      , At = "pokiSdkVisible"
      , St = "pokiSDKAdContainer"
      , Et = "pokiSDKNrAdsContainer"
      , It = ("\n.".concat(ft, " {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 99999;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.").concat(ft, ".").concat("pokiSdkFixed", " {\n\tposition: fixed;\n}\n\n.").concat(ft, ".").concat(At, " {\n\tdisplay: block;\n}\n\n.").concat(ft, ".").concat(ht, ",\n.").concat(kt, ".").concat(ht, " {\n\tdisplay: none;\n}\n\n.").concat(ft, ".").concat(ht, ",\n.").concat(kt, " {\n\tpointer-events: none;\n}\n\n.").concat(kt, " {\n\tz-index: 10;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url('https://a.poki-cdn.com/images/thumb_anim_2x.gif') 50% 50% no-repeat;\n\tuser-select: none;\n}\n\n.").concat(vt, " {\n\tbackground: #000;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\n\topacity: 0;\n\t-webkit-transition: opacity 0.5s ease-in-out;\n\t-moz-transition: opacity 0.5s ease-in-out;\n\t-ms-transition: opacity 0.5s ease-in-out;\n\t-o-transition: opacity 0.5s ease-in-out;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.").concat(ft, ".").concat(At, " .").concat(vt, " {\n\topacity: 1;\n}\n\n.").concat(St, ", .").concat("pokiSdkVideoContainer", " {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.").concat(wt, " {\n\tposition: absolute;\n\tz-index: 9999;\n\ttop: 0;\n\n\tpadding-top: 10%;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tcolor: #FFF;\n\n\tfont: 700 15pt 'Arial', sans-serif;\n\tfont-weight: bold;\n\tletter-spacing: 1px;\n\ttransition: 0.1s ease-in-out;\n\tline-height: 1em;\n}\n\n.").concat(yt, " {\n\tcursor:pointer;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 10;\n}\n\n.").concat(mt, " {\n    content: '';\n    background: rgba(0, 43, 80, 0.5);\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n\tz-index: 11;\n}\n\n.").concat(yt, ":hover .").concat(mt, " {\n\tbackground: rgba(0, 43, 80, 0.7);\n}\n\n.").concat(gt, " {\n\tposition: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 12;\n}\n\n.").concat(gt, ":before {\n\tcontent: '';\n\tposition: absolute;\n\twidth: 100px;\n\theight: 100px;\n\tdisplay: block;\n\tborder: 2px solid #fff;\n\tborder-radius: 50%;\n\tuser-select: none;\n\tbackground-color: rgba(0, 0, 0, 0.6);\n\ttransition: background-color 0.5s ease;\n\tanimation: 1s linear infinite pokiPulse;\n\tz-index: 12;\n}\n\n.").concat(gt, ":after {\n\tcontent: '';\n\tposition: absolute;\n\tdisplay: block;\n\tbox-sizing: border-box;\n\tborder-color: transparent transparent transparent #fff;\n\tborder-style: solid;\n\tborder-width: 26px 0 26px 40px;\n\tpointer-events: none;\n\tanimation: 1s linear infinite pokiPulse;\n\tleft: 6px;\n\tz-index: 12;\n}\n\n@keyframes pokiPulse {\n\t0% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n\t70% {\n\t\ttransform: translate(-50%, -50%) scale(1.1);\n\t}\n\t100% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n}\n\n.").concat("pokiSdkProgressContainer", " {\n\tbackground: #B8C7DD;\n\twidth: 100%;\n\theight: 5px;\n\tposition: absolute;\n\tbottom: 0;\n\tz-index: 9999;\n}\n\n.").concat(bt, " {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #FFDC00;\n\theight: 100%;\n\twidth: 0%;\n\ttransition: width 0.5s;\n\ttransition-timing-function: linear;\n}\n\n.").concat(bt, ".").concat(At, ", .").concat(yt, ".").concat(At, ", .").concat(wt, ".").concat(At, " {\n\tdisplay: block;\n\tpointer-events: auto;\n}\n\n.").concat(bt, ".").concat(ht, ", .").concat(yt, ".").concat(ht, ", .").concat(wt, ".").concat(ht, ", .").concat(Et, ".").concat(ht, " {\n\tdisplay: none;\n\tpointer-events: none;\n}\n\n.").concat(St, " .").concat("pokiSDKHouseAdContainer", " {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 99999;\n\tcursor: pointer;\n}\n\n.").concat(Et, " {\n\tbottom: 10px;\n\tposition: absolute;\n\tleft: 10px;\n\tz-index: 9999;\n\tcolor: #FFF;\n\tfont: 700 9pt 'Arial', sans-serif;\n\tfilter: drop-shadow(0 0 0.2rem black);\n}\n\n"),
    function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
    )
      , xt = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , Tt = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    }
      , _t = function(e) {
        return It(void 0, void 0, void 0, (function() {
            var t, n, r, o;
            return xt(this, (function(i) {
                switch (i.label) {
                case 0:
                    return t = e.screenshot,
                    n = "https://poki-user-content.com/",
                    [4, fetch("https://api.poki.io/screenshot", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            data: t,
                            p4d_game_id: I.gameID,
                            p4d_version_id: I.versionID
                        })
                    })];
                case 1:
                    r = i.sent(),
                    i.label = 2;
                case 2:
                    return i.trys.push([2, 5, , 6]),
                    200 !== r.status ? [3, 4] : [4, r.json()];
                case 3:
                    return o = i.sent(),
                    [2, n + o.source];
                case 4:
                    return [3, 6];
                case 5:
                    return i.sent(),
                    [3, 6];
                case 6:
                    return [2, null]
                }
            }
            ))
        }
        ))
    }
      , Pt = function() {
        return It(void 0, void 0, void 0, (function() {
            var e, t, n, r, o;
            return xt(this, (function(i) {
                switch (i.label) {
                case 0:
                    return e = function(e) {
                        var t;
                        return !["VIDEO", "TEXTAREA", "SCRIPT", "NOSCRIPT", "INPUT", "IFRAME"].includes(e.nodeName) && (!("IMG" === e.nodeName && !e.getAttribute("src")) && !(null === (t = e.classList) || void 0 === t ? void 0 : t.contains(ft)))
                    }
                    ,
                    t = document.body.style.minWidth,
                    n = document.body.style.minHeight,
                    document.body.style.minWidth = "100%",
                    document.body.style.minHeight = "100%",
                    [4, Xe(document.body, {
                        filter: e,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: "#fff"
                    })];
                case 1:
                    return (r = i.sent()) && r.length < 10 ? (o = document.body.style.position,
                    document.body.style.position = "fixed",
                    [4, Xe(document.body, {
                        filter: e,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: "#fff"
                    })]) : [3, 3];
                case 2:
                    r = i.sent(),
                    document.body.style.position = o,
                    i.label = 3;
                case 3:
                    return document.body.style.minWidth = t,
                    document.body.style.minHeight = n,
                    [2, r]
                }
            }
            ))
        }
        ))
    }
      , Ot = function(e, t) {
        return It(void 0, void 0, void 0, (function() {
            var n, r, o, i, a, c, s, u, l, d, p, f, h, v, y, g, m, w, b, k, A, S, E;
            return xt(this, (function(I) {
                switch (I.label) {
                case 0:
                    return n = t.title,
                    r = t.thumbnail,
                    (o = new Image).crossOrigin = "Anonymous",
                    i = new Promise((function(e) {
                        o.onload = function() {
                            return e(o)
                        }
                    }
                    )),
                    o.src = e,
                    (a = new Image).crossOrigin = "Anonymous",
                    c = new Promise((function(e) {
                        a.onload = function() {
                            return e(a)
                        }
                    }
                    )),
                    a.src = "https://a.poki-cdn.com/images/screenshot-frame.png",
                    (s = new Image).crossOrigin = "Anonymous",
                    u = new Promise((function(e) {
                        s.onload = function() {
                            return e(s)
                        }
                    }
                    )),
                    s.src = "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=".concat(128, ",height=").concat(128, ",fit=cover,f=auto/").concat(r),
                    l = new FontFace("TorusBold","url(https://a.poki-cdn.com/fonts/torus-bold-latin.woff2)"),
                    d = l.load(),
                    [4, Promise.all([i, c, u, d])];
                case 1:
                    return p = I.sent(),
                    f = p[0],
                    h = p[1],
                    v = p[2],
                    y = p[3],
                    (g = document.createElement("canvas")).width = f.width,
                    g.height = f.height,
                    (m = g.getContext("2d")).drawImage(f, 0, 0),
                    w = g.width / h.width,
                    b = h.height * w,
                    k = g.height - b,
                    m.drawImage(h, 0, k, g.width, b),
                    A = v.height * w,
                    function(e, t, n, r, o, i, a) {
                        e.save(),
                        e.beginPath();
                        var c = n + o
                          , s = r + i;
                        e.moveTo(n + a, r),
                        e.lineTo(c - a, r),
                        e.quadraticCurveTo(c, r, c, r + a),
                        e.lineTo(c, s - a),
                        e.quadraticCurveTo(c, s, c - a, s),
                        e.lineTo(n + a, s),
                        e.quadraticCurveTo(n, s, n, s - a),
                        e.lineTo(n, r + a),
                        e.quadraticCurveTo(n, r, n + a, r),
                        e.closePath(),
                        e.clip(),
                        e.drawImage(t, n, r, o, i),
                        e.restore()
                    }(m, v, 64 * w, k + 20 * w, A, A, 24 * w),
                    document.fonts.add(y),
                    S = 226 * w,
                    E = k + 68 * w,
                    m.textAlign = "left",
                    m.textBaseline = "top",
                    m.fillStyle = "#002b50",
                    m.font = "700 ".concat(56 * w, "px TorusBold,sans-serif"),
                    m.fillText(n, S, E),
                    [2, g.toDataURL()]
                }
            }
            ))
        }
        ))
    }
      , Ct = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return It(void 0, Tt([], e, !0), void 0, (function(e) {
            var t;
            return void 0 === e && (e = null),
            xt(this, (function(n) {
                switch (n.label) {
                case 0:
                    return [4, Pt()];
                case 1:
                    return (t = n.sent()) && t.length > 10 ? e ? [4, Ot(t, e)] : [3, 3] : [3, 5];
                case 2:
                    t = n.sent(),
                    n.label = 3;
                case 3:
                    return [4, _t({
                        screenshot: t
                    })];
                case 4:
                    return [2, n.sent()];
                case 5:
                    return [2, null]
                }
            }
            ))
        }
        ))
    }
      , Dt = function(e) {
        return It(void 0, void 0, void 0, (function() {
            var t, n, r, o, i, a, c;
            return xt(this, (function(s) {
                switch (s.label) {
                case 0:
                    t = ["VIDEO", "TEXTAREA", "SCRIPT", "NOSCRIPT", "INPUT", "IFRAME"],
                    e || t.push("CANVAS"),
                    n = function(e) {
                        var n, r;
                        return !t.includes(e.nodeName) && (!("IMG" === e.nodeName && !e.getAttribute("src")) && (!(null === (n = e.classList) || void 0 === n ? void 0 : n.contains(ft)) && "true" !== (null === (r = e.getAttribute) || void 0 === r ? void 0 : r.call(e, "data-poki-playtest-skip"))))
                    }
                    ,
                    r = document.body.style.minWidth,
                    o = document.body.style.minHeight,
                    i = document.body.style.backgroundColor,
                    document.body.style.minWidth = "100%",
                    document.body.style.minHeight = "100%",
                    e || (document.body.style.backgroundColor = "transparent"),
                    s.label = 1;
                case 1:
                    return s.trys.push([1, 3, , 4]),
                    [4, Je(document.body, {
                        filter: n,
                        width: window.innerWidth,
                        height: window.innerHeight
                    })];
                case 2:
                    return a = s.sent(),
                    [3, 4];
                case 3:
                    return c = s.sent(),
                    console.warn("%cPOKI:%c failed to generate svg", "font-weight: bold", "", c),
                    [3, 4];
                case 4:
                    return document.body.style.minWidth = r,
                    document.body.style.minHeight = o,
                    document.body.style.backgroundColor = i,
                    [2, a]
                }
            }
            ))
        }
        ))
    };
    var Lt = "MacIntel" === window.navigator.platform && void 0 !== window.navigator.standalone && navigator.maxTouchPoints > 1
      , Mt = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var Bt = y() || g() || Lt
      , Nt = !1
      , jt = new Image;
    jt.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAdCAYAAACqhkzFAAADE2lDQ1BJQ0MgcHJvZmlsZQAAeNp9kk9s21Qcxz+2X92qCh4qYRqoqnIAKqoNma6gbkAhadI/tOuyJB1t4IDrOHUSx7ZsZyw9IuAIk+AAJ1BXCQ4cOMDWgZDQDttlEoi/EkIc0DQuO1ExTYIqHOKsOfEu7/s++r7v7/d+eiB2DN93BNB0o6Awn0mtrZdTg38i8TAjPMghwwz9dD6/DNDb+5YEd35GAvjhmOH7zpWvPt3rnJoYe2f/8/GxV3N3+f81XLFCE/gX5C9NP4hA2QXyr0V+BGIISAZr62UQo0Bys6t1ILnR1VkgGZQKsyDWgJRpGxUQ54GjG318s083nZYZ9zAGJIJWYRXQQDofNopLsX7LNHJF4H6Q3rOtxWVAgLTjR5lC7PmkGsytxp5Ldmuhl3OtFi2WYv1jw1sqAMMg/WGGs+XeXXdj5TSQAOl2q7GajvndipXN9TyBV4g9srpll14CVJBHwnPFHDAC8pEte3Yl5hN148V87NctZz6uKz/rR/nT9+o6K8vAYZDnrPDgjZFdWuhq+ZUoKPXuOtXa3GKcec4OFgqxft138su9TCPIzQNJkN+23NVil8vbFSO7FOd8JkbFjHhOTIuMmBEvkKVGiI+DRZ08Bi4RBg4OxsCtge85hYdLjQiPoO9k0SJgiRp1LBy2pDMUMbGxCGjifZG8uvNTYnfoekSRBvUuF0kxLdLiefGMeEqcIE2VmvwQBvX3vfbJszYZajhUCGlwk4BmdaZ98qytX9cv6lf0X/Tb+o7yobKr3FC+Vi6TwcKK/fdqa0PaMS2tTWhJbVAb1R4lR4MAA5cVbtImIuIOZQxCHDxcdUodV6fUx0mp42pWPaE+qT7dNxuDNkUa3CKgCX1/VwIS8ayngFFm8fBpE1BjE5uIFGn8eMYpFnExeYKjpJhEZ5Lja+vlVDdu7wwSIB2+ccC8bZj+G5QLB2zjA7j8Jhz59YA98hEcegMufesbgQGAAsjVKvz1Mdy3Dg98B8Mvh9Xjk93uExkY+L3T2XsMBt+F/Qudzj/bnc7+RVB+g2/c/wD2jOYIAU+O+QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQpSURBVHjapFZLLFx9FD9z74x2COod72eQUCLSSGhrPOoRFhY23xcaYtdWx6O0lSbNJxQpY6ZtpG2w6aIWFgRhiIVHLBoiLLxJBB2PIMSMx2B6zr+9k2lSH6Mnubn/3HPv75zzO68rSklJKQoPD1fs7u6CwWCAs7MzEIlExvv5+Tl7TufT09PfdPSc9CR6vR54ngd+YWFhxMrK6lZgYKBaq9UaPza9kwjgpjoSQU86juOAx/PLxcXFu9bW1qd+fn5DBwcHfw0ox8tyfn4+3tLSUu/v7z+k0+n+CvA5AdJD9DQBPT1B0GFTT80B5PAsIWVcXBxT9PT0vJmYmHjh5OQE1xEC5MlKU1MTtLa2sofd3d1Vk5OT1wJlScHLIicnB+Lj45nrg4ODFH6ira2tztvbe4Q4NYfDMgJMS0uDoKAgFvrx8TEMDw8DJuqBjY2NlkAPDw+vxqHol0YsFhvdrqqqguLiYnZWq9Vvp6ennzk4OFwpZPFFitraWmakpqaGEvWWnMDiV+zs7FyalAuluroaioqKhOzXzczMFF/mKXdZCHV1dcbwe3t7a+fm5uT/B8pdhRcKv6CgQCgp5ezsbAGBCgkxG5Ckvr4eCgsL2bmvr68eh0r+nzzlzClahUIBcrlc8PQdltVTe3v73zzlzO0EpVIJZWVlAqeqpaWlJ6aectfp18rKSmhoaBDq9D2CPrazs2Oeii/7mKY01SMNX+qWlZUV2NzcBBx1gF0E+/v7BPohNjZWjFNKJaZO+VO2BNne3obk5GRYX1/Xb2xsSC56b2BgQImGpRd6mJeXB1lZWay3iSMcaQxMKpVuHx0d6XASLXt6eq7iLllFL1fRO42Hh8eeEVBYNjQYSktLobm5Gdra2piH7e3tgIOXNT/2eTb2dndXVxckJSXByckJ0Nnd3R0QEHiM+BWGLFGpVGBhYQGRkZFnHR0dLFnEGYWL1mFtbQ3GxsaIT9uKioqvBI4UgEajgeXlZXB1dWW8klUt0djS0mJITEzU0UTCLaiJiIhQ0xmtGkhwJRDR7GpsbJRRcvAbyM/PBy8vL2a4pKSEVin/HN+/QdMa0y9BS98x5HsxMTHv+vv7X+N0EaWmpoKvry84OjpSQdPwvY27/DNFEBAQwAAp20QbhVyKBymFiB98y8jIuB8VFbVKSxvJd8a+vYOh6mUyGd/Z2Qmjo6OwtbXlhpwthYWFTe7t7TFKcAX/nIf4F8DA0tPTW3De/Yt8GMgaJSchIeE/9OjR+Pi4JDg42FgBPj4+A7gevru4uBj/LJydnRmPRP5NtP6xvLz8H+KSwCg5tEcwlE38VWkQgHBFDGVnZydlZmbK3Nzc+smoRCJh7wuVIs7NzX2IJfEFC5d1A2WPSoE2A/3vREdHv5+amgoPCQn5FBoa+oWooMzSu6blJsgPAQYACgtfMJolu7EAAAAASUVORK5CYII=",
    jt.onload = function() {
        Nt = !0
    }
    ;
    var Rt = function() {
        function e(e) {
            var t = this;
            this.image = null,
            this.ready = !1,
            this.drawSize = 0,
            this.previousMouseDown = !1,
            this.mouseDrawSizeClickIncrease = 20,
            this.minimumClickSize = 60,
            this.maximumClickSize = 100,
            this.holdMouseSize = 40,
            this.sizeDecrease = 2,
            this.image = new Image,
            this.image.src = e,
            this.image.onload = function() {
                t.ready = !0
            }
        }
        return e.prototype.update = function(e) {
            e && !this.previousMouseDown && (this.drawSize += this.mouseDrawSizeClickIncrease,
            this.drawSize = Math.min(Math.max(this.drawSize, this.minimumClickSize), this.maximumClickSize)),
            this.drawSize -= this.sizeDecrease,
            this.drawSize = e ? Math.max(this.drawSize, this.holdMouseSize) : Math.max(this.drawSize, 0),
            this.previousMouseDown = e
        }
        ,
        e.prototype.draw = function(e, t, n) {
            var r = this.drawSize / 2
              , o = t - r
              , i = n - r;
            e.drawImage(this.image, 0, 0, this.image.width, this.image.height, o, i, this.drawSize, this.drawSize)
        }
        ,
        e.prototype.destroy = function() {
            this.image = null,
            this.ready = !1
        }
        ,
        e
    }()
      , Gt = new Rt("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAtCAYAAADV2ImkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAArGSURBVHgBvVlbbFxHGZ451z273rXXsWt7k5RESpwoJqQpqdI2hTiNeQDaB0COoAIkHgolECQuEpc+eA0SD6ihBKrmIU+FloK3SJFIoWpDurmASy5qIbEJJaI0TryRb3vzXs5lZpg5O7N79vTs2gkVRxrP8dkzM9988/3/P/MfCN6HixACxwGA6fFxaXB2AGYTGRgfGCCJTIak6e/DY2N4jL4GISTgf7wguMPLBTk+rloj39srK+TDsqrvkSD4kARAlyTBGHsHYVKg1bsIo+sEgb+Zjnk69NpT6bGxMftOwd8uYDg6OiGte2Rdf2zLzq+rmv7VkAI7dRkAnSJVaJFpjxDWOsYUEqLFocVEAFRpMR0yYznOmepy/kfvHD14LZVKodsCsNoXk8mkZO38Yq/Wn0jquv5EhwpAWAHAoGBDtGgcsMTBuoABB0xvLFpMWioOAGValmkxbfRCaak0/pOPxa6tlvFVAR4dHZW3fOdX3zI07cmYBjujFGwHBRumdYiC1ChglQGGNcCssNEJqRXGsM0BM5ZLTq0ULQAKJpkplys/3jH78rEDBw6wObYFLq+AFY4mk9rWL/z0F7Gw/v3eEAytCQHQrQMQp6VTqxXGdkSpMS5Yd5mn9zpfAVYb/H+2GkxC7qrIsBMo6iMzxqa7doTzr50/fx7dMcMHJ6b6ezZseSluyHsYyC4OMMLlwICotAdVrmlXsCs6xi7NVBagJgvBNJMFY5rJokBZztGyWAUga5LL5euXR5769I550ILplgx//NAhffPw5891h+VdvQYAPXqNWQY6ptZYDQewyKShcj2L2r3nE2OyYc9lLiGhe9mdKOxD4Z4HNtrSr996K+2sGvBwMqk8+JkfHuky1E/2UgkIGXTREuXLz5aXgW3Sr0fHopa55xC1EgBWGCq7MJDu1u55oGertP7VS5dO4BUBM2/QP/Ltx2ORcJKB7WaAuV5jQgqcVTG4cGWilribgJ7/pdqjOpveNl4ZMR04UNklDW0v7V+vTKbT6SZpSH7A5d1f2xwNh5+Mc8NiEohyw3KXXeHG4mERegYVF/QVwbbCQbJVMbiBshWLcfvo4mNGdPUHc9tG72rLMIteZ7Pqkbih7OkJNQAzZusS4Iyy5YewMePV+EfxjggsQRMl9WADdWB0Rfete/iVdPo5HMjwd19ZGDQ09TGmU1Ei3BsIrfo1J4Bwh9A8OAgA7fEmjC3GuM7dYJgbc5TXRkj9SnnnQBPLdYZZcOjf/9jPug15O9Nt3OMNDG5cXgmIpfaChh6g0PM88PL2ARvtGLuI8mkTHh2VCHp4vXpKaLnOcGRoSA2p8kfrzt/HrOwDKwZYiVHiK8A3QcmjaTegcFfJXCbDoemhJ2ZnQUi0cwEz7fbu/+awpkjrhCGISCTACqtuB84Lxg/MvyLiR2EHwuUJ0AKHocJY52e/MSyau4BpDJc0Rd/nuivJEwA8EQy2AbaaXUugnnkteXy3CDgMeIgTF1LVe9kusQ44Hh+hgOXtutTQapMMQINdYWBwFYDagfdKRLDslYcqN4DLurYHgJRcB2xZGVmSpbvr4RQ2bxWF028FFraZAPG1IZ42TX1AT1AB3INwPJKifDA+NKQIwLAUpr9BuF4WeuKmKGbNem9lUN77dtolvucAtJ64N6TzQ0Gnc92oMUwNDkQ7DLp/hjExQxjQcdAgQfekRd3Kvb1nHNh8X6ulKI4xsQLocqlAIonO60voj0ABdStDCvLDrdqRoPehry17IefucyBVAqRGF2cPC6wl9rzkB+kH1I61Vs/aaZk9E3voZsPERTleI9WVxI3LGYIIKSB+pMEcuDjigIBBVvIK7TTvBS2eYX5D+NiYRzy28ScI3SyULPck4jKsrzUItsyr7EebnwzYy8g361ZAVgIV9E5QMHHDMmicThx+gLVtdCPqQHfxXYaL9i3HqZYnTX66tXkRcd0rj1aurRW4VvJo0jRp7CNEaoDxyQrDhBxryrYlTPMZhDFMPrJxIzaXly9XnVr+wEaN8xebsVgiQIINxg+ulYG289WINFICgjA3j0FLeSn35677hhymBlfIV65cwfN/+O3ZKiIFdkCs8KQHA25zHQWdv4MMDwYw6H/WBJo0ki0if8HGrojioNm5l58/t2bpPDUzUrO8kZER3KWp1Uoh/8syT3SwRlVcWxaHNJaLkGbWWmnar9GgwFI3cB9YttIlm+Oomn9VwnZlamobqTNM98L4JlxrLr155liRJzlYA3EcdyWCm0G3c2sk4N4vF+zVqwDryQq5iRaKIf/23w+jxWV7aGjUbeoCZsiHOqfR8tU3b5XzhefzVu1l0bDMDUB4EOxjO4jdoPv6JDyuU2zUKx6i2NgFNn5x+bhz5dy/jIc2WzRmNACzPijlCKugeuPsH58uWKSYt2tJDgG6ghryEKD9xuVn2c+0mCTyMGsKCXBm2biMsEIFZUrvTB2WOsLl7MmTdROqnzhSqQO4e3O36czM3MgvLjyTM2kmxuKN+azLvHObH2H8bo+A1qHXm2dzSLMEirx/NibLArE6v3DrmcKFU/+UF5FNM5z1Q2jTqfkTu3eTTNkG5uULU/qmnX1QD233bobYwFLAqYPwP36JEM/yuwHBA9bkXsCbrlriKaulbO6F2d8ffTrioOLc3EVreno6GHA6/ToY2nAawA6dZKcuToa37dpDZCUBAxgTGhQ+2vvMGwAcn8uyUEOvQqtsJZcoqwsMbMW+OvObZ7/s2FK+uICqqdSzTclBX+ZnHExNvY5PXPwTcYhBUG7+jDQwuJemj3oIbA0Ke4Ah3ABqc6AmB1oVYBH3ABYHW60xu1iqXpw7ffxLShXMgUKuPDgIbH/mJ9AzTUxMyJOTQFuQ342qNo4PfOrxsc7u+Ofco7/G8wbisKo0En1iww89Pgx5tO5Pahc8oPNUBjd/d2y8RJxc3FxTymbjJrWr96Re5RaAwRtvvESyloZVrOH8Py5Mgrs+sOBoka0OkKLu8nIGhbsTcd/yhlSnsfxMq0WnIYGsWZPBYoUUc/PzR/59/OhhyVYLSlguL9/qDwTbkmFxDQ8nlegg0DpoigCqSiR+z0ODXVvvPRSJRh+N8sRgmKda6+cv2JyBr8sDNyYh/G0pl31x8dyrP89nrmWIHSo5EakEbqyzJiZGcatPCG0Bs50cTQHILMlCd/whyTHCCFpGdNv9m2Lb7z8YNoz7dFUeMDzfOLzZSKZ1sVW0kPAMpFjJzr84/5dTz+HZ/8zZGFUcKJcH+8wKfZ0GiCRuh6ktYHGxFOzs7ICsKI5ekfOGBSxdMWXdArLat//RB8Nr+ncrhrFFUZS1sqr2Q0nqcAFjvEwwKdpm9W2rlL9YzeamF0+fmEQEm1CRLGsZmdFeuarkuqqJRAatBHbVgNlVYzsl9/ffUkpGRSPzuZDd2aE4FlEMIqsEO7Ij0f21ItOUgUwwYlxbQCUAOxg6qgYwItDBFWRLKrSUSJ+F52bsDRv2OsnkPnFWWPFaNWAPcjiaSknxk1kqgIyapXkZQ8UKMVSZFCzXiE2JSPQrA7AUh4QwBYojGMo2QpJlR0zgZBPAAXQrkEqNUkZv7wPj7QOu46ZeezwppdNAGhychYnECLw0O+0mO7oqkVq/ffTbCJKx4yjYNK/gRCLhWj5den8E//9fLKHI2Gd6Z4U+ce8BK+y39+n6L5YV4ArrvzyVAAAAAElFTkSuQmCC")
      , Vt = new Rt("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADBSURBVHgBvdZdEcIwDAfwZAqQgAQs4AAHIAEHzAlSWgfMARZAQUjZ9rDbR5M22f+uzdaX30OvaREUIaIDlxuPVCMiRrAOIw+a5zngrsiYlwmWQWwwIVKHKZEyrBDRYZWIDDNCtjFjZBlzQsaEZCB/HLm+wTfnhqcT+OfawD75Jijy+IBvuv/M+3Qnv4QJyQst2Wf1LFli2e5ggYn7XQ2m7uAlWPGdpMGqb1kJZvZuaN2RDBakCIIi1Hf6y/DbaR6QP+1P5pe98AyNAAAAAElFTkSuQmCC");
    function Ft(e, t, n, r, o, i) {
        if (Nt && i && jt) {
            var a = Math.max(r, o);
            if (function(e, t, n, r, o, i) {
                [Gt, Vt].forEach((function(a) {
                    if (a.ready && i) {
                        var c = a === Gt ? t : n;
                        a.update(c);
                        var s = e.x * r
                          , u = e.y * o;
                        a.draw(i, s, u)
                    }
                }
                ))
            }(e, t, n, r, o, i),
            !Bt) {
                var c = .5 * a;
                i.drawImage(jt, 0, 0, jt.width, jt.height, e.x * r, e.y * o, jt.width * c, jt.height * c)
            }
        }
    }
    var Kt = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Ut = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , zt = "Game tab in background"
      , Ht = !0
      , qt = []
      , Yt = null
      , Wt = document.createElement("canvas")
      , Qt = null
      , Jt = null
      , Zt = null
      , Xt = 0
      , $t = []
      , en = []
      , tn = []
      , nn = []
      , rn = 24;
    (y() || g() || Lt) && (rn = 12),
    Wt.setAttribute("data-poki-no-playtest", "true"),
    Wt.addEventListener("webglcontextlost", (function() {
        console.info("%cPOKI_PLAYTEST:%c streamCanvas context lost", "font-weight: bold", ""),
        Wt = document.createElement("canvas"),
        Qt = null
    }
    ));
    var on = {
        x: 0,
        y: 0
    }
      , an = !1
      , cn = !1
      , sn = !1
      , un = !1
      , ln = ""
      , dn = 1
      , pn = 1
      , fn = -1
      , hn = -1;
    function vn(e) {
        if (null !== Yt && qt.length) {
            var t = qt[0]
              , n = t.width / Yt.width
              , r = t.height / Yt.height
              , o = (e.clientX - Yt.left) * n
              , i = (e.clientY - Yt.top) * r;
            on.x = Math.max(0, Math.min(o, t.width)),
            on.y = Math.max(0, Math.min(i, t.height))
        }
    }
    var yn = function(e) {
        qt.length && Wt && vn(e)
    }
      , gn = function(e) {
        qt.length && Wt && (0 === e.button ? (an = !0,
        cn = !1) : 2 === e.button ? (sn = !0,
        un = !1) : 1 === e.button && (an = !0,
        cn = !1,
        sn = !0,
        un = !1),
        vn(e))
    }
      , mn = function(e) {
        0 === e.button ? cn = !0 : 2 === e.button ? un = !0 : 1 === e.button && (cn = !0,
        un = !0)
    };
    function wn() {
        var e = ln;
        e && Wt && Qt && (Qt.fillStyle = "rgba(255, 255, 255, 0.5)",
        Qt.fillRect(0, 0, Wt.width, Wt.height),
        Qt.font = "48px Arial",
        Qt.fillStyle = "#009cff",
        Qt.textAlign = "center",
        Qt.fillText(e, Wt.width / 2, Wt.height / 2))
    }
    function bn(e) {
        if (Wt && qt.length) {
            var t = qt[0]
              , n = t.width
              , r = t.height;
            if (n !== fn || r !== hn || e) {
                fn = n,
                hn = r;
                var o = (Yt = t.getBoundingClientRect()).width
                  , i = Yt.height;
                0 !== o && 0 !== i || (o = n,
                i = r);
                var a = y() || g()
                  , c = Lt ? 1024 : a ? 640 : 1280
                  , s = Math.min(c / o, c / i, 1);
                o = Math.round(o * s),
                i = Math.round(i * s),
                dn = o / n,
                pn = i / r,
                e || Wt.width !== o || Wt.height !== i ? (Wt.width = o,
                Wt.height = i,
                console.info("%cPOKI_PLAYTEST:%c capturing at ".concat(o, "x").concat(i, " (").concat(n, "x").concat(r, ")"), "font-weight: bold", "")) : console.info("%cPOKI_PLAYTEST:%c resize but video unchanged ".concat(o, "x").concat(i, " (").concat(n, "x").concat(r, ")"), "font-weight: bold", "")
            }
        }
    }
    function kn(e) {
        for (var t, n = null, r = 0; r < e.length; r++)
            if (!document.body.contains(e[r])) {
                if (e[r].pokiHtmlDummyCanvas)
                    continue;
                if (n || (n = document.getElementsByTagName("flt-glass-pane")),
                n) {
                    for (var o = !1, i = 0; i < n.length; i++)
                        (null === (t = n[i].shadowRoot) || void 0 === t ? void 0 : t.contains(e[r])) && (o = !0);
                    if (o)
                        continue
                }
                return !1
            }
        return !0
    }
    function An(e) {
        return Kt(this, void 0, void 0, (function() {
            var t, n, r;
            return Ut(this, (function(o) {
                switch (o.label) {
                case 0:
                    if (!Wt)
                        return [2];
                    if (Jt || (Jt = document.createElement("canvas"),
                    0 === qt.length ? (Jt.width = Wt.width,
                    Jt.height = Wt.height) : (Jt.width = qt[0].width,
                    Jt.height = qt[0].height),
                    Jt.addEventListener("contextlost", (function() {
                        Jt = null,
                        Zt = null
                    }
                    ))),
                    !Zt && !(Zt = Jt.getContext("2d")))
                        return [2];
                    o.label = 1;
                case 1:
                    return o.trys.push([1, 5, , 6]),
                    performance.now(),
                    [4, Dt(e)];
                case 2:
                    return (t = o.sent()) && t.length > 10 ? [4, new Promise((function(e, n) {
                        var r = new Image;
                        r.decode = function() {
                            return e(r)
                        }
                        ,
                        r.onload = function() {
                            return e(r)
                        }
                        ,
                        r.onerror = n,
                        r.crossOrigin = "anonymous",
                        r.decoding = "async",
                        r.src = t
                    }
                    ))] : [3, 4];
                case 3:
                    n = o.sent(),
                    requestAnimationFrame((function() {
                        Jt && Zt && (Zt.clearRect(0, 0, Jt.width, Jt.height),
                        Zt.drawImage(n, 0, 0, n.width, n.height, 0, 0, Jt.width, Jt.height),
                        Xt = 0)
                    }
                    )),
                    o.label = 4;
                case 4:
                    return [3, 6];
                case 5:
                    return r = o.sent(),
                    console.warn("%cPOKI_PLAYTEST:%c ui canvas error", "font-weight: bold", "", r.name, r.message, r.stack),
                    Xt++,
                    (Vr.__playtestCaptureHTML === jr || Vr.__playtestCaptureHTML === Nr) && Xt > 10 && (Ht = !0),
                    [3, 6];
                case 6:
                    return [2]
                }
            }
            ))
        }
        ))
    }
    function Sn(e) {
        ln = e
    }
    function En(e) {
        return Kt(this, void 0, void 0, (function() {
            var t, n, r;
            return Ut(this, (function(o) {
                if (Ht)
                    return [2];
                for (qt = e,
                r = 0; r < $t.length; r++)
                    $t[r].stop();
                for (r = 0; r < en.length; r++)
                    en[r].readable.cancel();
                for (r = 0; r < tn.length; r++)
                    tn[r].cancel();
                for (r = 0; r < nn.length; r++)
                    nn[r].close();
                $t = [],
                en = [],
                tn = [],
                nn = [];
                try {
                    if (Mt)
                        for (t = function(e) {
                            if (qt[e].pokiHtmlDummyCanvas)
                                return "continue";
                            var t = qt[e].captureStream(rn).getVideoTracks()[0];
                            $t.push(t),
                            nn.push(null);
                            var n = new Blob(["self.onmessage=(async({data:{track:e}})=>{if(!e)return;const a=new MediaStreamTrackProcessor({track:e}).readable.getReader(),s=()=>{a.read().then(({done:e,value:a})=>{e?a.close():(postMessage(a),a.close(),s())})};s()});"],{
                                type: "application/javascript"
                            })
                              , r = new Worker(URL.createObjectURL(n));
                            r.onmessage = function(t) {
                                var n = t.data;
                                nn.length <= e || (null !== nn[e] && nn[e].close(),
                                nn[e] = n)
                            }
                            ;
                            try {
                                r.postMessage({
                                    track: t
                                })
                            } catch (e) {
                                console.warn("%cPOKI_PLAYTEST:%c worker error", "font-weight: bold", "", e),
                                Ht = !0
                            }
                        }
                        ,
                        r = 0; r < qt.length; r++)
                            t(r);
                    else
                        for (n = function(e) {
                            if (qt[e].pokiHtmlDummyCanvas)
                                return "continue";
                            var t = qt[e].captureStream(rn).getVideoTracks()[0]
                              , n = new window.MediaStreamTrackProcessor(t)
                              , r = n.readable.getReader();
                            $t.push(t),
                            en.push(n),
                            tn.push(r),
                            nn.push(null);
                            var o = function() {
                                r.read().then((function(t) {
                                    var n = t.done
                                      , r = t.value;
                                    n ? Ht = !0 : nn.length <= e ? r.close() : (null !== nn[e] && nn[e].close(),
                                    nn[e] = r,
                                    o())
                                }
                                ))
                            };
                            o()
                        }
                        ,
                        r = 0; r < qt.length; r++)
                            n(r);
                    bn(!0)
                } catch (e) {
                    console.warn("%cPOKI_PLAYTEST:%c setPlaytestSoureCanvasses error", "font-weight: bold", "", e),
                    Ht = !0
                }
                return [2]
            }
            ))
        }
        ))
    }
    function In() {
        var e = Vr.__playtestCanvas;
        if ((null == e ? void 0 : e.length) && kn(e))
            return e;
        if (Vr.__playtestCaptureHTML === Nr)
            return (a = document.createElement("canvas")).width = window.innerWidth,
            a.height = window.innerHeight,
            a.setAttribute("data-poki-html-canvas", "true"),
            a.pokiHtmlDummyCanvas = !0,
            [a];
        var t = 0
          , n = Array.from(document.getElementsByTagName("canvas"));
        if (0 === n.length)
            for (var r = document.getElementsByTagName("flt-glass-pane"), o = 0; o < r.length; o++) {
                var i = r[o].shadowRoot;
                i && (n = n.concat(Array.from(i.querySelectorAll("canvas"))))
            }
        var a, c = [];
        return n.forEach((function(e) {
            if ("true" !== e.getAttribute("data-poki-no-playtest")) {
                var n = getComputedStyle(e)
                  , r = n.width
                  , o = n.height
                  , i = parseInt(r, 10) * parseInt(o, 10);
                i >= t && function(e) {
                    if (!e)
                        return !1;
                    for (var t = e, n = !0; t && t !== document.body; ) {
                        var r = window.getComputedStyle(t);
                        if ("none" === r.display)
                            return !1;
                        if ("hidden" === r.visibility)
                            return !1;
                        if (n && (0 === t.offsetWidth || 0 === t.offsetHeight))
                            return !1;
                        "absolute" === r.position && (n = !1),
                        t = t.parentElement
                    }
                    var o = e.getBoundingClientRect()
                      , i = window.innerHeight || document.documentElement.clientHeight
                      , a = window.innerWidth || document.documentElement.clientWidth;
                    return !(o.right < 0 || o.bottom < 0 || o.left > a || o.top > i)
                }(e) && (i > t && (c = []),
                c.push({
                    canvas: e,
                    style: n,
                    index: c.length
                }),
                t = i)
            }
        }
        )),
        0 === c.length ? Vr.__playtestCaptureHTML === jr ? ((a = document.createElement("canvas")).width = window.innerWidth,
        a.height = window.innerHeight,
        a.setAttribute("data-poki-html-canvas", "true"),
        a.pokiHtmlDummyCanvas = !0,
        [a]) : [] : (c.sort((function(e, t) {
            var n = parseInt(e.style.zIndex, 10) || 0
              , r = parseInt(t.style.zIndex, 10) || 0;
            return n < r ? -1 : n > r ? 1 : e.index - t.index
        }
        )),
        c.map((function(e) {
            return e.canvas
        }
        )))
    }
    function xn(e) {
        if (!Wt)
            return null;
        Ht = !1,
        En(e),
        bn(!0);
        var t, n = Wt.captureStream(rn);
        window.addEventListener("pointermove", yn, {
            capture: !0,
            passive: !0
        }),
        window.addEventListener("pointerdown", gn, {
            capture: !0,
            passive: !0
        }),
        window.addEventListener("pointerup", mn, {
            capture: !0,
            passive: !0
        }),
        window.addEventListener("contextmenu", mn, {
            capture: !0,
            passive: !0
        });
        var r, o = 0;
        if (Vr.__playtestCaptureHTML === jr || Vr.__playtestCaptureHTML === Nr) {
            var i = 0;
            t = setInterval((function() {
                if (Wt) {
                    var e = !!qt[0].pokiHtmlDummyCanvas;
                    !e || qt[0].width === window.innerWidth && qt[0].height === window.innerHeight || (qt[0].width = window.innerWidth,
                    qt[0].height = window.innerHeight);
                    var t = !1;
                    if (e && document.getElementsByTagName("canvas").length > 0 && (t = !0),
                    !t) {
                        var n = function(e) {
                            for (var t = 3 & e.length, n = e.length - t, r = 3432918353, o = 461845907, i = 0, a = 0, c = 0; c < n; )
                                a = 255 & e.charCodeAt(c) | (255 & e.charCodeAt(++c)) << 8 | (255 & e.charCodeAt(++c)) << 16 | (255 & e.charCodeAt(++c)) << 24,
                                ++c,
                                i = 5 * (i = (i ^= a = (65535 & (a = (a = (65535 & a) * r + (((a >>> 16) * r & 65535) << 16) & 4294967295) << 15 | a >>> 17)) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295) << 13 | i >>> 19) + 3864292196 & 4294967295;
                            switch (a = 0,
                            t) {
                            case 3:
                                a ^= (255 & e.charCodeAt(c + 2)) << 16;
                            case 2:
                                a ^= (255 & e.charCodeAt(c + 1)) << 8;
                            case 1:
                                i ^= a = (65535 & (a = (a = (65535 & (a ^= 255 & e.charCodeAt(c))) * r + (((a >>> 16) * r & 65535) << 16) & 4294967295) << 15 | a >>> 17)) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295
                            }
                            return i ^= e.length,
                            i = 2246822507 * (65535 & (i ^= i >>> 16)) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295,
                            i = 3266489909 * (65535 & (i ^= i >>> 13)) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295,
                            (i ^= i >>> 16) >>> 0
                        }(document.body.innerHTML);
                        i !== n && (i = n,
                        t = !0)
                    }
                    t && An(e)
                }
            }
            ), 1e3)
        }
        return r = setInterval((function() {
            if (Ht || !Wt || !qt.length || o > 10)
                return console.info("%cPOKI_PLAYTEST:%c crashed", "font-weight: bold", "", Ht, !Wt, !qt.length, o),
                window.removeEventListener("pointermove", yn),
                window.removeEventListener("pointerdown", gn),
                window.removeEventListener("pointerup", mn),
                window.removeEventListener("contextmenu", mn),
                clearInterval(t),
                Vr.__playtestCaptureHTML = "",
                Wt = null,
                Qt = null,
                Jt = null,
                Zt = null,
                En([]),
                Gt.destroy(),
                Vt.destroy(),
                void clearInterval(r);
            if (kn(qt)) {
                if (!Qt && !(Qt = Wt.getContext("2d")))
                    return console.info("%cPOKI_PLAYTEST:%c streamCanvas context creation failed", "font-weight: bold", ""),
                    void o++;
                o = 0,
                bn(!1),
                Vr.__playtestCaptureHTML === Br ? (Vr.__playtestCaptureHTML = "",
                An(!1)) : Vr.__playtestCaptureHTML === Rr && (Vr.__playtestCaptureHTML = "",
                Jt = null,
                Zt = null),
                Qt.clearRect(0, 0, Wt.width, Wt.height);
                for (var e = 0; e < nn.length; e++) {
                    var n = nn[e];
                    null !== n && Qt.drawImage(n, 0, 0, n.displayWidth, n.displayHeight, 0, 0, Wt.width, Wt.height)
                }
                Jt && Qt.drawImage(Jt, 0, 0, Jt.width, Jt.height, 0, 0, Wt.width, Wt.height),
                Ft(on, an, sn, dn, pn, Qt),
                an && cn && (an = !1,
                cn = !1),
                sn && un && (sn = !1,
                un = !1),
                wn()
            } else {
                console.info("%cPOKI_PLAYTEST:%c source canvasses not in DOM", "font-weight: bold", "");
                var i = In();
                i.length ? En(i) : (console.info("%cPOKI_PLAYTEST:%c no source canvasses found", "font-weight: bold", ""),
                o++)
            }
        }
        ), 1e3 / rn),
        window.addEventListener("visibilitychange", (function() {
            console.info("%cPOKI_PLAYTEST:%c visibility change", "font-weight: bold", "", document.visibilityState),
            "visible" === document.visibilityState ? ln === zt && (ln = "") : (ln = zt,
            wn())
        }
        )),
        window.addEventListener("resize", (function() {
            console.info("%cPOKI_PLAYTEST:%c resize", "font-weight: bold", "", window.innerWidth, window.innerHeight)
        }
        )),
        window.addEventListener("orientationchange", (function(e) {
            var t, n, r;
            console.info("%cPOKI_PLAYTEST:%c orientationchange", "font-weight: bold", "", null === (r = null === (n = null === (t = null == e ? void 0 : e.target) || void 0 === t ? void 0 : t.screen) || void 0 === n ? void 0 : n.orientation) || void 0 === r ? void 0 : r.type)
        }
        )),
        window.screen.orientation.addEventListener("change", (function(e) {
            var t;
            console.info("%cPOKI_PLAYTEST:%c orientation change", "font-weight: bold", "", null === (t = e.target) || void 0 === t ? void 0 : t.type)
        }
        )),
        n
    }
    var Tn = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , _n = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    function Pn() {
        var e, t, n, r = document.getElementById("poki-playtest-popup-reject"), o = document.getElementById("poki-playtest-popup-resolve");
        null == r || r.removeEventListener("pointerdown", Pn),
        null == o || o.removeEventListener("pointerdown", Pn),
        null === (e = document.getElementById("poki-playtest-popup-wrapper")) || void 0 === e || e.remove(),
        null === (t = document.getElementById("poki-playtest-template-markup")) || void 0 === t || t.remove(),
        null === (n = document.getElementById("poki-playtest-template-style")) || void 0 === n || n.remove()
    }
    function On(e) {
        e.stopImmediatePropagation()
    }
    function Cn(e) {
        var t = e.gameTitle
          , n = e.rejectCallback
          , r = e.resolveCallback
          , o = document.body;
        !function(e) {
            var t = document.createElement("template");
            t.innerHTML = '\n\t<template id="poki-playtest-template-markup">\n\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup-wrapper" id="poki-playtest-popup-wrapper">\n\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup">\n\t\t\t\t<header class="poki-playtest-popup-scope-reset poki-playtest-popup__header">\n\t\t\t\t\t<img class="poki-playtest-popup-scope-reset poki-playtest-popup__header__img" width="36" height="36" src="https://a.poki-cdn.com/playtest/playtest-icon.svg" alt="Lab icon">\n\t\t\t\t\t<h2 class="poki-playtest-popup-scope-reset poki-playtest-popup__header__title">Hey there, adventurer</h2>\n\t\t\t\t</header>\n\n\t\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup__content">\n\t\t\t\t\t<p>You found a mystery game and have been selected to test it out! When you join the playtest, we&apos;ll record your gameplay to see all the fun (and maybe some goofy) moments you encounter. This helps the developer figure out what rocks and what needs a little extra magic in their game. Don&apos;t worry, your gameplay recording will be deleted after 30 days.</p>\n\t\t\t\t\t<p>And hey, if you&apos;re not feeling it, no biggie - you can refuse the playtest and still play the game just like normal. For more information, please read our <a href="https://a.poki-cdn.com/playtest/2024.05.08_Poki_Playtest_Privacy_Statement.pdf" download="2024-05-08 Poki Playtest Privacy Statement.pdf" target="_blank">Privacy Statement Playtest</a>.</p>\n\t\t\t\t\t<h3>Do you consent to join the playtest of <span id="poki-playtest-popup-game-title">%GAME_TITLE%</span>?</h3>\n\t\t\t\t\t<p><small>Please note that this game has been uploaded independently by this game&apos;s developer and has not yet been verified by the Poki team. If you run into any trouble, contact us at <strong><a href="mailto:hello@poki.com">hello@poki.com</a></strong></small></p>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="poki-playtest-popup-scope-reset poki-playtest-popup__actions">\n\t\t\t\t\t<button type="button" id="poki-playtest-popup-reject" class="poki-playtest-popup-scope-reset poki-playtest-popup__button">No, thanks</button>\n\t\t\t\t\t<button type="button" id="poki-playtest-popup-resolve" class="poki-playtest-popup-scope-reset poki-playtest-popup__button">Yes, let\'s go</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</template>\n',
            e.appendChild(t.content);
            var n = document.createElement("style");
            n.innerHTML = '\n\t.poki-playtest-popup {\n\t\tall: unset;\n\n\t\t& *,\n\t\t& *::before,\n\t\t& *::after {\n\t\t\tbox-sizing: border-box;\n\t\t}\n\t}\n\n\t.poki-playtest-popup {\n\t\tborder-radius: 16px;\n\t\tbackground: #FFF;\n\t\tbox-shadow: 0px 60px 24px 0px rgba(93, 107, 132, 0.03), 0px 34px 20px 0px rgba(93, 107, 132, 0.09), 0px 15px 15px 0px rgba(93, 107, 132, 0.15), 0px 4px 8px 0px rgba(93, 107, 132, 0.18);\n\n\t\tdisplay: flex;\n\t\tmax-width: 480px;\n\t\tmin-width: 320px;\n\t\twidth: 100%;\n\t\tpadding: 8px 0 16px 0;\n\t\tflex-direction: column;\n\t\talign-items: flex-start;\n\t\tgap: 16px;\n\t\tcolor: #002B50;\n\n\t\tposition: fixed;\n\t\tz-index: 99999;\n\t\ttop: 50%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, -50%);\n\t}\n\n\t.poki-playtest-popup__header {\n\t\t\tdisplay: flex;\n\t\t\twidth: 100%;\n\t\t\tpadding: 8px 16px 16px;\n\t\t\talign-items: center;\n\t\t\tgap: 12px;\n\t\t\tborder-bottom: 2px solid #F0F5FC;\n\t}\n\n\t.poki-playtest-popup__header__img {\n\t\tall: unset;\n\t}\n\n\t.poki-playtest-popup__header__title {\n\t\tfont: 700 24px/1.16 Torus, sans-serif;\n\t\tmargin: 0;\n\t}\n\n\t.poki-playtest-popup__content {\n\t\tfont: 400 14px/1.57 "Proxima Nova", sans-serif;\n\t\tpadding: 0 16px;\n\n\t\ta {\n\t\t\tcolor: #0074E0;\n\t\t\tpointer-events: auto;\n\n\t\t\t&:hover {\n\t\t\t\tcolor: #009CFF;\n\t\t\t}\n\t\t}\n\n\t\tp {\n\t\t\tmargin: 8px 0 0;\n\n\t\t\t&:first-child {\n\t\t\t\tmargin-top: 0;\n\t\t\t}\n\n\t\t\tsmall {\n\t\t\t\tall: unset;\n\t\t\t}\n\n\t\t\t&:has(small) {\n\t\t\t\tcolor: #5D6B84;\n\t\t\t\tfont-size: 12px;\n\t\t\t\tline-height: 1.33;\n\t\t\t\tletter-spacing: 0.3px;\n\t\t\t}\n\t\t}\n\n\t\th3 {\n\t\t\tfont-weight: 700;\n\t\t\tfont-size: 16px;\n\t\t\tline-height: 1.5;\n\t\t\tmargin: 16px 0 14px;\n\t\t}\n\t}\n\n\t.poki-playtest-popup__actions {\n\t\tdisplay: flex;\n\t\twidth: 100%;\n\t\tpadding: 8px 16px 0;\n\t\tgap: 16px;\n\t\tjustify-content: center;\n\t}\n\n\t.poki-playtest-popup__button {\n\t\tdisplay: flex;\n\t\tpadding: 7px 24px 9px;\n\t\tborder: none;\n\t\tmargin: 0;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex: 1 0 0;\n\t\tborder-radius: 24px;\n\t\tbackground: #009CFF;\n\t\tcursor: pointer;\n\t\tpointer-events: auto;\n\n\t\tcolor: #FFF;\n\t\tfont: 700 16px/1.25 Torus, sans-serif;\n\n\t\t&:hover {\n\t\t\tbackground-color: #0074E0;\n\t\t}\n\t}\n\n\t.poki-playtest-popup-wrapper {\n\t\tall: unset;\n\t\tposition: fixed;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tbackground: #002B50AF;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tz-index: 99998;\n\t}\n\n\t.poki-playtest-popup-scope-reset {\n\t\tletter-spacing: normal;\n\t\ttext-align: left;\n\t\ttext-decoration: none;\n\t\ttext-indent: 0;\n\t\ttext-shadow: none;\n\t\ttext-transform: none;\n\t\twhite-space: normal;\n\t\tword-spacing: normal;\n\t}\n',
            n.id = "poki-playtest-template-style",
            e.appendChild(n)
        }(o);
        var i = document.getElementById("poki-playtest-template-markup").content.cloneNode(!0);
        i.querySelector("#poki-playtest-popup-game-title").textContent = t,
        function() {
            return Tn(this, void 0, void 0, (function() {
                var e, t, n, r, o, i, a;
                return _n(this, (function(c) {
                    switch (c.label) {
                    case 0:
                        return e = new FontFace("ProximaNova","url(https://a.poki-cdn.com/fonts/proxima-nova-regular-latin.woff2)").load(),
                        t = new FontFace("ProximaNova","url(https://a.poki-cdn.com/fonts/proxima-nova-bold-latin.woff2)",{
                            weight: "bold"
                        }).load(),
                        n = new FontFace("Torus","url(https://a.poki-cdn.com/fonts/torus-bold-latin.woff2)").load(),
                        [4, Promise.all([e, t, n])];
                    case 1:
                        return r = c.sent(),
                        o = r[0],
                        i = r[1],
                        a = r[2],
                        document.fonts.add(o),
                        document.fonts.add(i),
                        document.fonts.add(a),
                        [2]
                    }
                }
                ))
            }
            ))
        }().then((function() {
            o.appendChild(i),
            function(e) {
                var t = e.rejectCallback
                  , n = e.resolveCallback
                  , r = document.getElementById("poki-playtest-popup-reject")
                  , o = document.getElementById("poki-playtest-popup-resolve");
                null == r || r.addEventListener("pointerup", (function() {
                    setTimeout(Pn, 10),
                    t()
                }
                )),
                null == o || o.addEventListener("pointerup", (function() {
                    setTimeout(Pn, 10),
                    n()
                }
                ));
                var i = document.getElementById("poki-playtest-popup-wrapper");
                i && ["pointerdown", "pointerup", "pointermove", "click", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove", "contextmenu", "dragstart"].forEach((function(e) {
                    return i.addEventListener(e, On)
                }
                ))
            }({
                rejectCallback: n,
                resolveCallback: r
            })
        }
        ))
    }
    var Dn = window.requestAnimationFrame;
    function Ln(e) {
        return Math.round(100 * e) / 100
    }
    var Mn = function() {
        function e(e) {
            var t = this;
            this.seconds = [],
            this.frameCounter = 0,
            Math.random() > e || (this.nextSecond = performance.now() + 1e3,
            Dn((function() {
                t.frame()
            }
            )))
        }
        return e.prototype.frame = function() {
            for (var e = this, t = performance.now(); t >= this.nextSecond; )
                this.seconds.unshift(this.frameCounter),
                this.seconds.length > 10 && this.seconds.pop(),
                this.frameCounter = 0,
                this.nextSecond += 1e3;
            this.frameCounter++,
            Dn((function() {
                e.frame()
            }
            ))
        }
        ,
        e.prototype.stats = function() {
            var e = this;
            if (0 !== this.seconds.length) {
                var t = Math.min.apply(Math, this.seconds)
                  , n = Math.max.apply(Math, this.seconds)
                  , r = Ln(this.seconds.reduce((function(e, t) {
                    return e + t
                }
                ), 0) / this.seconds.length)
                  , o = Ln(this.seconds.slice(1).map((function(t, n) {
                    return Math.abs(t - e.seconds[n])
                }
                )).reduce((function(e, t) {
                    return e + t
                }
                ), 0) / (this.seconds.length - 1));
                return Number.isNaN(o) && (o = 0),
                "".concat(t, "|").concat(n, "|").concat(r, "|").concat(o)
            }
        }
        ,
        e
    }();
    function Bn(e) {
        for (var t = [], n = 0, r = 0; r < e.length; r++)
            if (n > 0)
                n--;
            else {
                var o = e[r];
                if ("string" == typeof o)
                    n = (o.match(/%c/g) || []).length,
                    t.push(o.replace(/%c/g, ""));
                else
                    try {
                        t.push(String(o))
                    } catch (e) {
                        t.push("<".concat(e.message, ">"))
                    }
            }
        return t.join(" ")
    }
    var Nn = window.requestAnimationFrame;
    function jn(e) {
        fetch("https://mystery-game-tile.poki.io/v0/metric", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(e)
        })
    }
    function Rn(e) {
        var t = Math.random().toString(36).substring(2)
          , n = null
          , r = 0
          , o = 0
          , i = 0
          , a = []
          , c = function() {
            i++,
            Nn(c)
        };
        c(),
        setInterval((function() {
            a.push(i),
            i = 0
        }
        ), 1e3);
        var s = function() {
            var n = nr() > 0
              , i = a;
            a = [],
            jn({
                metrictest_id: e.metrictestID,
                play_id: t,
                started: n,
                duration: performance.now(),
                timed_out: !0,
                sdk_version: "ff583837d6995ef2e470656f961ccda2825e9ce6",
                fpss: i,
                upvotes: r,
                downvotes: o
            })
        };
        window.addEventListener("beforeunload", s);
        var u = function(e) {
            e.data && "vote" === e.data.type && (e.data.direction < 0 ? o++ : e.data.direction > 0 && r++)
        };
        window.addEventListener("message", u);
        n = setInterval((function() {
            var i = nr() > 0
              , c = Math.max(Qn, Vr.lastInteractionTime)
              , l = performance.now() - c > 6e4
              , d = a;
            a = [],
            l && (clearInterval(n),
            window.removeEventListener("beforeunload", s),
            window.removeEventListener("message", u)),
            jn({
                metrictest_id: e.metrictestID,
                play_id: t,
                started: i,
                duration: c,
                timed_out: l,
                sdk_version: "ff583837d6995ef2e470656f961ccda2825e9ce6",
                fpss: d,
                upvotes: r,
                downvotes: o
            })
        }
        ), 1e4)
    }
    function Gn() {
        var e;
        try {
            e = performance.getEntriesByType("resource").map((function(e) {
                return e.encodedBodySize
            }
            )).reduce((function(e, t) {
                return e + t
            }
            )),
            e += performance.getEntriesByType("navigation")[0].encodedBodySize
        } catch (e) {}
        return e
    }
    var Vn = !1;
    try {
        "1" === localStorage.getItem("poki_pbf") ? Vn = !0 : I.isPlayground || "GB" === I.country || localStorage.setItem("poki_pbf", "1")
    } catch (w) {}
    function Fn() {
        if (void 0 !== window.MediaRecorder) {
            var e = 'video/webm;codecs="vp9"';
            if (("undefined" != typeof navigator && /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) || Lt || Mt) && (e = 'video/mp4;codecs="avc1.42000d"'),
            MediaRecorder.isTypeSupported(e))
                return e
        }
    }
    var Kn, Un = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    }, zn = function(e, t) {}, Hn = [], qn = null, Yn = 0, Wn = 0, Qn = 0, Jn = Un(Un([], Object.values(e.tracking.screen), !0), [e.tracking.ads.status.completed, e.tracking.ads.status.error, e.tracking.ads.status.limit, e.tracking.ads.video.progress], !1), Zn = ((Kn = {})[e.tracking.screen.commercialBreak] = "commercialBreak",
    Kn[e.tracking.screen.gameLoadingFinished] = "gameLoadingFinished",
    Kn[e.tracking.screen.gameplayStart] = "gameplayStart",
    Kn[e.tracking.screen.gameplayStop] = "gameplayStop",
    Kn[e.tracking.screen.rewardedBreak] = "rewardedBreak",
    Kn), Xn = [], $n = [];
    try {
        var er = function(e) {
            var t = console[e];
            console[e] = function() {
                for (var n = [], r = 0; r < arguments.length; r++)
                    n[r] = arguments[r];
                t.apply(console, n),
                $n && $n.push({
                    timeMs: performance.now(),
                    level: e,
                    message: Bn(n)
                })
            }
            ,
            Xn.push((function() {
                console[e] = t
            }
            ))
        };
        I.gameID && !I.isPlayground && !I.isPokiExternal && I.isPokiIframe && (er("log"),
        er("info"),
        er("warn"),
        er("error"))
    } catch (b) {}
    function tr() {
        Hn = null,
        Xn.forEach((function(e) {
            return e()
        }
        )),
        Xn = [],
        $n = null
    }
    function nr() {
        return Wn
    }
    function rr(t, n) {
        console.info("%cPOKI_PLAYTEST:%c start recording using codec", "font-weight: bold", "", n);
        var r = xn(t);
        r && ((qn = new WebSocket("wss://playtest-recorder.poki.io/ws")).addEventListener("error", (function() {
            fr.track(e.tracking.playtest.error, {
                message: "websocket error"
            }),
            console.info("%cPOKI_PLAYTEST:%c error", "font-weight: bold", "")
        }
        )),
        qn.addEventListener("open", (function() {
            if (qn) {
                if (qn.readyState === qn.OPEN) {
                    var o = void 0;
                    try {
                        var i = document.createElement("canvas")
                          , a = {
                            powerPreference: "high-performance",
                            failIfMajorPerformanceCaveat: !1
                        }
                          , c = i.getContext("webgl2", a);
                        if (c || (c = i.getContext("webgl", a)) || (c = i.getContext("experimental-webgl", a)),
                        c) {
                            var s = c
                              , u = s.getExtension("WEBGL_debug_renderer_info");
                            u && (o = s.getParameter(u.UNMASKED_RENDERER_WEBGL)),
                            o || (o = s.getParameter(s.RENDERER))
                        }
                    } catch (e) {}
                    var l = JSON.stringify({
                        type: "save",
                        game_id: I.gameID,
                        version_id: I.versionID,
                        webgl_renderer: o,
                        sdk_version: "ff583837d6995ef2e470656f961ccda2825e9ce6",
                        cpus: navigator.hardwareConcurrency,
                        device_pixel_ratio: window.devicePixelRatio || 1,
                        canvasses: t.length
                    });
                    qn.send(l),
                    console.info("%cPOKI_PLAYTEST:%c websocket open", "font-weight: bold", "", l)
                }
                var d = new MediaRecorder(r,{
                    mimeType: n,
                    videoBitsPerSecond: 5e5
                })
                  , p = performance.now()
                  , f = function(e) {
                    return Math.round((e || performance.now()) - p)
                };
                d.addEventListener("stop", (function() {
                    console.info("%cPOKI_PLAYTEST:%c recording stopped", "font-weight: bold", "")
                }
                )),
                d.addEventListener("error", (function(e) {
                    console.warn("%cPOKI_PLAYTEST:%c", "font-weight: bold", "", e.error)
                }
                )),
                d.addEventListener("dataavailable", (function(e) {
                    e.data.size > 0 && (qn && qn.readyState === qn.OPEN && qn.send(e.data))
                }
                )),
                d.start(250);
                var h = {}
                  , v = !1;
                document.addEventListener("keydown", (function(e) {
                    h[e.code] || (h[e.code] = !0,
                    v = !0)
                }
                )),
                document.addEventListener("keyup", (function(e) {
                    h[e.code] && (h[e.code] = !1,
                    v = !0)
                }
                ));
                var y = setInterval((function() {
                    var e = Object.keys(h);
                    v && e.length > 0 && qn && qn.readyState === qn.OPEN && qn.send(JSON.stringify({
                        type: "keyboard",
                        offset: f(),
                        keys: h
                    })),
                    v = !1,
                    e.forEach((function(e) {
                        h[e] || delete h[e]
                    }
                    ))
                }
                ), 50);
                zn = function(e, t) {
                    if (qn && qn.readyState === qn.OPEN) {
                        qn.send(et({
                            type: "sdk-event",
                            offset: f(t),
                            event: e
                        }));
                        var n = Zn[e];
                        n && qn.send(et({
                            type: "console",
                            offset: f(t),
                            level: "log",
                            message: "PokiSDK.".concat(n, "()")
                        }))
                    }
                }
                ,
                null !== Hn && (Hn.forEach((function(e) {
                    zn(e.event, e.timeMs)
                }
                )),
                Hn = null),
                tt = function(e) {
                    qn && qn.readyState === qn.OPEN && qn.send(JSON.stringify({
                        type: "error",
                        offset: f(),
                        error: e
                    }))
                }
                ,
                Xn.forEach((function(e) {
                    return e()
                }
                )),
                Xn = [];
                try {
                    var g = function(e) {
                        var t = console[e];
                        console[e] = function() {
                            for (var n = [], r = 0; r < arguments.length; r++)
                                n[r] = arguments[r];
                            t.apply(console, n),
                            qn && qn.readyState === qn.OPEN && qn.send(JSON.stringify({
                                type: "console",
                                offset: f(),
                                level: e,
                                message: Bn(n)
                            }))
                        }
                        ,
                        Xn.push((function() {
                            console[e] = t
                        }
                        ))
                    };
                    g("log"),
                    g("info"),
                    g("warn"),
                    g("error")
                } catch (e) {}
                $n && ($n.forEach((function(e) {
                    qn && qn.readyState === qn.OPEN && qn.send(JSON.stringify({
                        type: "console",
                        offset: f(e.timeMs),
                        level: e.level,
                        message: e.message
                    }))
                }
                )),
                $n = null),
                Vr.__playtestCaptureHTML === Nr && qn.send(JSON.stringify({
                    type: "console",
                    offset: f(),
                    level: "log",
                    message: "No canvas found, using HTML capture"
                }));
                var m = function(t) {
                    var n = t.position;
                    if (qn && qn.readyState === qn.OPEN) {
                        var r = e.tracking.screen.commercialBreak
                          , o = "Commercial Break";
                        n === e.ads.position.rewarded && (r = e.tracking.screen.rewardedBreak,
                        o = "Rewarded Break"),
                        Sn(o),
                        qn.send(JSON.stringify({
                            type: "sdk-event",
                            offset: f(),
                            event: r
                        }))
                    }
                };
                L.addEventListener(e.playtest.startVideo, m);
                var w = function() {
                    Sn("")
                };
                L.addEventListener(e.playtest.stopVideo, w);
                var b = new Mn(1)
                  , k = setInterval((function() {
                    qn && qn.readyState === qn.OPEN && qn.send(JSON.stringify({
                        type: "fps",
                        offset: f(),
                        stats: b.stats()
                    }))
                }
                ), 1e3);
                qn.addEventListener("close", (function(t) {
                    console.info("%cPOKI_PLAYTEST:%c websocket closed", "font-weight: bold", "", t),
                    zn = function() {}
                    ,
                    L.removeEventListener(e.playtest.startVideo, m),
                    L.removeEventListener(e.playtest.stopVideo, w),
                    clearInterval(y),
                    clearInterval(k),
                    d.stop(),
                    Ht = !0,
                    qn = null,
                    tr(),
                    fr.track(e.tracking.playtest.closed, {
                        reason: "".concat(t.reason, ":").concat(t.code, ":").concat(t.wasClean)
                    })
                }
                ))
            }
        }
        )))
    }
    function or(t) {
        var n, r = function(e) {
            if ("1" === v("playtest"))
                return !0;
            if (!I.country)
                return !1;
            if (!I.isPokiIframe)
                return !1;
            if (!e.playtestRecord)
                return !1;
            if (e.playtestVersion && e.playtestVersion !== I.versionID)
                return !1;
            if (e.playtestNewUser && Vn)
                return !1;
            var t = y() || g() || Lt;
            if ("desktop" === e.playtestDeviceCategory && t)
                return !1;
            if ("mobile" === e.playtestDeviceCategory && !t)
                return !1;
            if (["GB", "NL", "CA"].includes(I.country))
                return !1;
            var n = navigator;
            if (n.connection && n.connection.effectiveType && "4g" !== n.connection.effectiveType)
                return !1;
            if ((null == n ? void 0 : n.hardwareConcurrency) < 8)
                return !1;
            if (!document.createElement("canvas").getContext("webgl2", {
                failIfMajorPerformanceCaveat: !0
            }))
                return !1;
            if (Mt) {
                var r = n.userAgent.match(/Version\/([\d]+)/);
                if (!r || parseInt(r[1], 10) < 18)
                    return !1
            } else if (void 0 === window.MediaStreamTrackProcessor)
                return !1;
            return !0
        }(t), o = Fn(), i = "1" === v("playerfittest");
        if (!r || !o || i)
            return (i || t.metrictestID && I.isPokiIframe) && Rn(t),
            void tr();
        fr.track(e.tracking.playtest.showModal, {
            show: !0
        }),
        console.info("%cPOKI_PLAYTEST:%c init", "font-weight: bold", "", o),
        (n = (null == t ? void 0 : t.gameTitle) || "this game",
        new Promise((function(e, t) {
            console.info("%cPOKI_PLAYTEST:%c showing consent screen", "font-weight: bold", ""),
            Cn({
                rejectCallback: t,
                resolveCallback: e,
                gameTitle: n
            })
        }
        ))).then((function() {
            fr.track(e.tracking.playtest.accepted);
            var t = performance.now() + 6e4
              , n = 0
              , r = performance.now()
              , i = setInterval((function() {
                var a = performance.now();
                if (!function() {
                    var e = window;
                    return !!(e.pc && (e.pc.app || e.pc.AppBase) || e.c3_runtimeInterface || e._dmJSDeviceShared || e.g_WebAudioContext || e.unityGame)
                }()) {
                    var c = Gn() || 0;
                    c !== n && (n = c,
                    r = a),
                    (Yn && a - Yn > 1e4 || a - r > 1e4) && (fr.track(e.tracking.playtest.noCanvas),
                    console.info("%cPOKI_PLAYTEST:%c no canvas found, switch to HTML capture", "font-weight: bold", ""),
                    Vr.__playtestCaptureHTML = Nr)
                }
                var s = In();
                if (s.length) {
                    clearInterval(i),
                    fr.track(e.tracking.playtest.starting);
                    try {
                        rr(s, o)
                    } catch (e) {}
                }
                a > t && (fr.track(e.tracking.playtest.notLoaded),
                clearInterval(i),
                console.info("%cPOKI_PLAYTEST:%c no gameLoadingFinished within 2 minutes", "font-weight: bold", ""),
                tr())
            }
            ), 1e3)
        }
        )).catch((function(t) {
            fr.track(e.tracking.playtest.rejected),
            console.info("%cPOKI_PLAYTEST:%c rejected", "font-weight: bold", "", t),
            tr()
        }
        ))
    }
    var ir = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    };
    function ar(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
        console.info.apply(console, ir(["%cPOKI:%c ".concat(e), "background-color: green; border-radius: 3px; color: white; padding: 1px 5px", ""], t, !1))
    }
    function cr(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
        console.warn.apply(console, ir(["%cPOKI:%c ".concat(e), "background-color: red; border-radius: 3px; color: white; padding: 1px 5px", ""], t, !1))
    }
    const sr = function(e, t) {
        return void 0 === t && (t = !1),
        new Promise((function(n, r) {
            var o = document.createElement("script");
            o.type = t ? "module" : "text/javascript",
            o.async = !0,
            o.src = e;
            var i = function() {
                o.readyState && "loaded" !== o.readyState && "complete" !== o.readyState || (n(),
                o.onload = null,
                o.onreadystatechange = null)
            };
            o.onload = i,
            o.onreadystatechange = i,
            o.onerror = r,
            document.head.appendChild(o)
        }
        ))
    };
    var ur = function() {
        return ur = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
        ,
        ur.apply(this, arguments)
    }
      , lr = O(e.tracking)
      , dr = window
      , pr = function() {
        function a() {}
        return a.track = function(t, n) {
            var r, o;
            void 0 === n && (n = {});
            try {
                var i = ur({}, n);
                if (-1 === lr.indexOf(t))
                    throw new TypeError("Invalid 'event', must be one of ".concat(lr.join(", ")));
                if ("object" != typeof i)
                    throw new TypeError("Invalid data, must be an object");
                var c = L.getVideoDataAnnotations();
                if (null == c ? void 0 : c.pokiAdServer)
                    switch (t) {
                    case e.tracking.ads.status.started:
                        var s = c.creativeId;
                        L.addVideoDataAnnotations({
                            houseAdId: s
                        }),
                        i.houseAdId = s;
                        break;
                    case e.tracking.ads.status.impression:
                        s = null == i ? void 0 : i.creativeId;
                        B(ur(ur({}, i), {
                            event: "video-impression",
                            creativeId: s
                        })),
                        L.addVideoDataAnnotations({
                            houseAdId: s
                        }),
                        i.houseAdId = s;
                        break;
                    case e.tracking.ads.video.error:
                        B(ur(ur({}, i), {
                            event: "video-error",
                            errorCode: null == i ? void 0 : i.errorCode
                        }));
                        break;
                    case e.tracking.ads.video.loaderError:
                        B(ur(ur({}, i), {
                            event: "video-adsloader-error",
                            errorCode: null == i ? void 0 : i.errorCode
                        }));
                        break;
                    case e.tracking.ads.status.completed:
                        B(ur(ur({}, i), {
                            event: "video-complete"
                        }))
                    }
                if (t.includes("pokiTrackingRewardedWeb") && (i = c),
                _.log) {
                    if ("test" === (null === (o = null === (r = null === window || void 0 === window ? void 0 : window.process) || void 0 === r ? void 0 : r.env) || void 0 === o ? void 0 : o.NODE_ENV))
                        return;
                    Object.keys(i).length ? console.info("%cPOKI_TRACKER:%c Tracked event '".concat(t, "' with data:"), "font-weight: bold", "", i) : console.info("%cPOKI_TRACKER:%c Tracked event '".concat(t, "'"), "font-weight: bold", "")
                }
                if (function(t) {
                    if (Qn = performance.now(),
                    t.event === e.tracking.screen.gameLoadingFinished ? Yn = performance.now() : t.event === e.tracking.screen.gameplayStart && (Wn = performance.now()),
                    Jn.includes(t.event))
                        try {
                            zn(t.event),
                            null !== Hn && Hn.push({
                                event: t.event,
                                timeMs: performance.now()
                            })
                        } catch (e) {
                            console.warn("%cPOKI_PLAYTEST:%c", "font-weight: bold", "", e)
                        }
                }({
                    event: t,
                    data: i
                }),
                x.sendMessage(e.message.event, {
                    event: t,
                    data: i
                }),
                !(I.isPokiIframe || I.isInspector || I.isPlayground || I.isPokiExternal)) {
                    var u = "message"
                      , l = {
                        content: {
                            event: t,
                            data: i,
                            pokifordevs: {
                                game_id: I.gameID,
                                game_version_id: void 0
                            }
                        },
                        type: e.message.event
                    };
                    a.logToObserver ? a.pushEvent("sdk", u, l) : (a.eventQueue.push(["sdk", u, l]),
                    a.eventQueue.length > 100 && a.eventQueue.shift())
                }
            } catch (e) {
                !function(e) {
                    for (var t = [], n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                    console.error.apply(console, ir(["%cPOKI:%c ".concat(e), "background-color: red; border-radius: 3px; color: white; padding: 1px 5px", ""], t, !1))
                }("error while tracking event", e)
            }
        }
        ,
        a.setupDefaultEvents = function() {
            var t, n = ((t = {})[e.ready] = e.tracking.sdk.status.initialized,
            t[e.adblocked] = e.tracking.sdk.status.failed,
            t[e.ads.busy] = e.tracking.ads.status.busy,
            t[e.ads.completed] = e.tracking.ads.status.completed,
            t[e.ads.error] = e.tracking.ads.status.error,
            t[e.ads.impression] = e.tracking.ads.status.impression,
            t[e.ads.limit] = e.tracking.ads.status.limit,
            t[e.ads.ready] = e.tracking.ads.status.ready,
            t[e.ads.requested] = e.tracking.ads.status.requested,
            t[e.ads.prebidRequested] = e.tracking.ads.status.prebidRequested,
            t[e.ads.skipped] = e.tracking.ads.status.skipped,
            t[e.ads.started] = e.tracking.ads.status.started,
            t[e.ads.video.clicked] = e.tracking.ads.video.clicked,
            t[e.ads.video.error] = e.tracking.ads.video.error,
            t[e.ads.video.loaderError] = e.tracking.ads.video.loaderError,
            t[e.ads.video.buffering] = e.tracking.ads.status.buffering,
            t[e.ads.video.progress] = e.tracking.ads.video.progress,
            t[e.ads.video.paused] = e.tracking.ads.video.paused,
            t[e.ads.video.resumed] = e.tracking.ads.video.resumed,
            t[e.ads.extendedVideoError] = e.tracking.ads.video.extendedVideoError,
            t);
            Object.keys(n).forEach((function(e) {
                L.addEventListener(e, (function(t) {
                    a.track(n[e], t)
                }
                ))
            }
            ))
        }
        ,
        a.pushEvent = function(e, t, n) {
            dr.pokiGTM.push({
                event: "".concat(e, "-").concat(t),
                eventNoun: e,
                eventVerb: t,
                eventData: n || {}
            })
        }
        ,
        a.setRequireConsent = function(e) {
            a.cmpRequired = e,
            a.setupObserverIfCMP()
        }
        ,
        a.setupObserverWithCMP = function(e) {
            a.cmpIndex = e,
            a.setupObserverIfCMP()
        }
        ,
        a.setupObserverIfCMP = function() {
            if (void 0 !== a.cmpRequired && void 0 !== a.cmpIndex)
                if (a.cmpRequired) {
                    if (!window.__tcfapi)
                        return void console.error("%cPOKI:%c PokiSDK.enableEventTracking() was called but no CMP is present.", "font-weight: bold", "");
                    window.__tcfapi("addEventListener", 2, (function(e, t) {
                        !t || "tcloaded" !== e.eventStatus && "useractioncomplete" !== e.eventStatus || (window.__tcfapi("getNonIABVendorConsents", 2, (function(e) {
                            e && e.nonIabVendorConsents && e.nonIabVendorConsents[a.cmpIndex || 0] && a.setupObserver()
                        }
                        )),
                        window.__tcfapi("removeEventListener", 2, (function() {}
                        ), e.listenerId))
                    }
                    ))
                } else
                    a.setupObserver()
        }
        ,
        a.setupObserver = function() {
            for (dr._pokiSessionGlobalName = "pokiSession",
            dr._pokiUserGlobalName = "pokiUser",
            dr._pokiContextGlobalName = "pokiContext",
            dr._pokiTrackerGlobalName = "pokiTracker",
            function(e, a, f) {
                var h = null;
                try {
                    (h = u()) ? (h.previous_page.path = h.page.path,
                    h.previous_page.type = h.page.type,
                    h.previous_page.id = h.page.id,
                    h.previous_page.start = h.page.start,
                    h.previous_page.pageview_id = h.page.pageview_id,
                    h.page.path = e,
                    h.page.type = a,
                    h.page.id = f,
                    h.page.start = Date.now(),
                    h.page.pageview_id = r(),
                    h.depth = p() + 1,
                    h.expire = Date.now() + 18e5) : h = function(e, a, u) {
                        try {
                            var f = t(i);
                            if (f) {
                                var h = JSON.parse(f);
                                if (s(h, !0))
                                    return h.previous_page.path = h.page.path,
                                    h.previous_page.type = h.page.type,
                                    h.previous_page.id = h.page.id,
                                    h.previous_page.start = h.page.start,
                                    h.previous_page.pageview_id = h.page.pageview_id,
                                    h.page.path = e,
                                    h.page.type = a,
                                    h.page.id = u,
                                    h.page.start = Date.now(),
                                    h.page.pageview_id = r(),
                                    h.depth = p() + 1,
                                    h.expire = Date.now() + 18e5,
                                    h.tab_id = d(),
                                    n(i, JSON.stringify(h)),
                                    h
                            }
                        } catch (e) {
                            var v = null;
                            try {
                                v = t(i) || null
                            } catch (e) {}
                            o(e, "getSessionDepth", v)
                        }
                        var y = r();
                        return {
                            id: r(),
                            expire: Date.now() + 18e5,
                            tab_id: d(),
                            depth: 1,
                            count: l() + 1,
                            page: {
                                path: e,
                                type: a,
                                id: u,
                                start: Date.now(),
                                pageview_id: y
                            },
                            previous_page: {},
                            landing_page: {
                                path: e,
                                type: a,
                                id: u,
                                start: Date.now(),
                                pageview_id: y
                            },
                            referrer_domain: c()
                        }
                    }(e, a, f),
                    h.count > 1 && (n("poki_uid_new", "0", parseInt(t("poki_uid_ttl"), 10) || 15552e3),
                    window[window._pokiUserGlobalName] && (window[window._pokiUserGlobalName].is_new = !1));
                    var v = JSON.stringify(h);
                    try {
                        sessionStorage.setItem(i, v)
                    } catch (e) {
                        o(e, "updateSession-1")
                    }
                    window[window._pokiSessionGlobalName] = h;
                    try {
                        n(i, v)
                    } catch (e) {
                        o(e, "updateSession-4")
                    }
                } catch (e) {
                    o(e, "updateSession-2")
                }
            }(window.location.pathname, "external", I.contentGameID),
            function() {
                var e, o, i, a, c = null === (e = window[window._pokiUserGlobalName]) || void 0 === e ? void 0 : e.id, s = (null === (o = window[window._pokiUserGlobalName]) || void 0 === o ? void 0 : o.is_new) || !1, u = (null === (i = window[window._pokiUserGlobalName]) || void 0 === i ? void 0 : i.version) || 0, l = (null === (a = window[window._pokiUserGlobalName]) || void 0 === a ? void 0 : a.ttl) || 15552e3;
                c || (c = t("poki_uid"),
                s = "1" === t("poki_uid_new"),
                u = parseInt(t("poki_uid_version"), 10) || 0,
                l = parseInt(t("poki_uid_ttl"), 10) || l),
                c && function(e) {
                    if (!/^[A-Za-z0-9-_]+$/.test(e))
                        return !1;
                    try {
                        return 16 === atob(e.replace(/-/g, "+").replace(/_/g, "/")).length
                    } catch (e) {
                        return !1
                    }
                }(c) || (c = r(),
                s = !0,
                u = 1,
                l = 15552e3),
                n("poki_uid", c, l),
                n("poki_uid_new", s ? "1" : "0", l),
                n("poki_uid_version", u, l),
                n("poki_uid_ttl", l, l),
                window[window._pokiUserGlobalName] = {
                    id: c,
                    is_new: s,
                    version: u,
                    ttl: l
                }
            }(),
            dr[dr._pokiSessionGlobalName].referrer = I.referrerParam,
            dr[dr._pokiContextGlobalName] = {
                tag: null,
                site: {
                    id: null,
                    domain: window.location.hostname,
                    prefix: ""
                },
                page: {
                    id: I.contentGameID,
                    type: "external",
                    path: window.location.pathname,
                    pageview_id: r()
                },
                user: dr[dr._pokiUserGlobalName],
                session: dr[dr._pokiSessionGlobalName]
            },
            dr.pokiGTM = dr.pokiGTM || [],
            sr("https://a.poki-cdn.com/t2.js"),
            a.logToObserver = !0; a.eventQueue.length; ) {
                var e = a.eventQueue.shift()
                  , f = e[0]
                  , h = e[1]
                  , v = e[2];
                a.pushEvent(f, h, v)
            }
        }
        ,
        a.logToObserver = !1,
        a.cmpRequired = void 0,
        a.cmpIndex = void 0,
        a.eventQueue = [],
        a
    }();
    const fr = pr;
    const hr = function() {
        for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
            t = String.fromCharCode(255 & e) + t,
            e >>= 8;
        if (window.crypto && crypto.getRandomValues && Uint32Array) {
            var r = new Uint32Array(12);
            crypto.getRandomValues(r);
            for (n = 0; n < 12; n++)
                t += String.fromCharCode(255 & r[n])
        } else
            for (n = 0; n < 12; n++)
                t += String.fromCharCode(Math.floor(256 * Math.random()));
        return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    };
    var vr;
    !function(e) {
        e.SMALL = "small",
        e.MEDIUM = "medium",
        e.LARGE = "large"
    }(vr || (vr = {}));
    var yr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , gr = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , mr = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    }
      , wr = Math.random().toString(36).substring(2);
    function br() {
        return yr(this, void 0, void 0, (function() {
            var e, t, n;
            return gr(this, (function(r) {
                switch (r.label) {
                case 0:
                    return [4, window.cookieStore.getAll()];
                case 1:
                    return e = r.sent(),
                    window.indexedDB.databases ? [4, window.indexedDB.databases()] : [3, 3];
                case 2:
                    return n = r.sent(),
                    [3, 4];
                case 3:
                    n = [],
                    r.label = 4;
                case 4:
                    return t = n,
                    [2, mr(mr(mr([], e.map((function(e) {
                        return {
                            name: e.name,
                            expire_seconds: Math.round((e.expires - Date.now()) / 1e3),
                            type: "cookie",
                            domain: e.domain
                        }
                    }
                    )), !0), Object.keys(window.localStorage).map((function(e) {
                        return {
                            name: e,
                            expire_seconds: 15552e3,
                            type: "localStorage"
                        }
                    }
                    )), !0), t.map((function(e) {
                        return {
                            name: e.name,
                            expire_seconds: 0,
                            type: "idb"
                        }
                    }
                    )), !0)]
                }
            }
            ))
        }
        ))
    }
    var kr = function() {
        function e() {}
        return e.collectAndLog = function() {
            return yr(this, void 0, void 0, (function() {
                var e, t;
                return gr(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return n.trys.push([0, 2, , 3]),
                        t = {},
                        [4, br()];
                    case 1:
                        return t.cookies = n.sent(),
                        t.p4d_game_id = I.gameID,
                        t.user_id = wr,
                        e = t,
                        window.fetch("https://t.poki.io/game-cookies", {
                            method: "post",
                            body: JSON.stringify(e)
                        }).catch(),
                        [3, 3];
                    case 2:
                        return n.sent(),
                        [3, 3];
                    case 3:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.trackSavegames = function() {
            window.cookieStore && window.cookieStore.getAll && I.gameID && (Math.random() > .01 || navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1 || (e.collectAndLog(),
            setInterval(e.collectAndLog, 12e4)))
        }
        ,
        e
    }();
    const Ar = kr;
    var Sr = new RegExp("(".concat(["WebView", "(iPhone|iPod|iPad)(?!.*Safari)", "Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})", "Linux; U; Android"].join("|"), ")"),"ig");
    function Er() {
        window.navigator.userAgent.match(Sr) && !I.isPlayground && document.addEventListener("touchmove", (function(e) {
            return e.preventDefault(),
            e.returnValue = !1,
            !1
        }
        ), {
            passive: !1
        })
    }
    function Ir(e) {
        return "Poki_".concat(function(e) {
            for (var t = 0, n = 0; n < e.length; n++)
                t = 31 * t + e.charCodeAt(n) >>> 0;
            return t % 1e9 + 1
        }(e))
    }
    var xr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Tr = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , _r = "".concat("https://poki-auth.poki.com/", "sessions/whoami");
    var Pr = function() {
        var t = this;
        this.user = null,
        this.getUser = function() {
            return xr(t, void 0, void 0, (function() {
                var e;
                return Tr(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return _.debug ? [2, {
                            id: "2ea1243e-2df1-4633-a1fd-1df63c25598b",
                            username: "Poki_TEST123456789",
                            avatarUrl: "https://a.poki-cdn.com/images/favicon.png"
                        }] : this.user ? [2, this.user] : (e = this,
                        [4, this.fetchUser()]);
                    case 1:
                        return e.user = t.sent(),
                        [2, this.user]
                    }
                }
                ))
            }
            ))
        }
        ,
        this.login = function() {
            return xr(t, void 0, void 0, (function() {
                return Tr(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return _.debug ? [2] : [4, this.getUser()];
                    case 1:
                        return t.sent() ? [2] : [2, new Promise((function(t, n) {
                            var r;
                            function o(t) {
                                t.data.type === e.accounts.authPanelClosed && (window.removeEventListener("message", o),
                                n(new Error("User closed the auth panel without signing in.")))
                            }
                            null === (r = null === window || void 0 === window ? void 0 : window.top) || void 0 === r || r.postMessage({
                                type: e.accounts.openAuthPanel
                            }, "*"),
                            window.addEventListener("message", o),
                            setTimeout((function() {
                                window.removeEventListener("message", o),
                                n(new Error("Login timeout. User took too long to complete the action."))
                            }
                            ), 45e3)
                        }
                        ))]
                    }
                }
                ))
            }
            ))
        }
        ,
        this.fetchUser = function() {
            return xr(t, void 0, void 0, (function() {
                var e, t, n, r, o, i, a;
                return Tr(this, (function(c) {
                    switch (c.label) {
                    case 0:
                        return c.trys.push([0, 4, , 5]),
                        [4, fetch(_r, {
                            credentials: "include"
                        })];
                    case 1:
                        return (e = c.sent()).ok ? [4, e.json()] : [3, 3];
                    case 2:
                        return t = c.sent(),
                        [2, {
                            id: n = null === (o = null == t ? void 0 : t.identity) || void 0 === o ? void 0 : o.id,
                            username: (null === (i = null == t ? void 0 : t.identity) || void 0 === i ? void 0 : i.username) || Ir(n),
                            avatarUrl: (null === (a = null == t ? void 0 : t.identity) || void 0 === a ? void 0 : a.avatarUrl) || "https://a.poki-cdn.com/images/favicon.png"
                        }];
                    case 3:
                        return [3, 5];
                    case 4:
                        return r = c.sent(),
                        console.warn("%cPOKI:%c failed to fetch user info", "font-weight: bold", "", r),
                        [3, 5];
                    case 5:
                        return [2, null]
                    }
                }
                ))
            }
            ))
        }
    };
    const Or = Pr;
    var Cr = function() {
        return Cr = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
        ,
        Cr.apply(this, arguments)
    }
      , Dr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Lr = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , Mr = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    }
      , Br = "once"
      , Nr = "force"
      , jr = "on"
      , Rr = "off"
      , Gr = function() {
        function t(n) {
            var r = this;
            this.gameStarted = !1,
            this.runningAsInGameHoistingSDK = !1,
            this.duringGameplay = !1,
            this.fpsStats = new Mn(.01),
            this.lastGamePlayStop = 0,
            this.badEventsCounter = 0,
            this.commercialBreaks = 0,
            this.rewardedBreaks = 0,
            this.account = new Or,
            this.asyncScreenshotLoader = function() {
                window.addEventListener("message", (function(t) {
                    return Dr(r, void 0, void 0, (function() {
                        var n;
                        return Lr(this, (function(r) {
                            switch (r.label) {
                            case 0:
                                return "pokiGenerateScreenshot" !== t.data.type ? [3, 1] : (o = t.data,
                                It(void 0, void 0, void 0, (function() {
                                    var t, n, r, i, a;
                                    return xt(this, (function(c) {
                                        switch (c.label) {
                                        case 0:
                                            return t = o.hasFrame,
                                            n = null,
                                            t ? (r = o.title,
                                            i = o.thumbnail,
                                            [4, Ct({
                                                title: r,
                                                thumbnail: i
                                            })]) : [3, 2];
                                        case 1:
                                            return n = c.sent(),
                                            [3, 4];
                                        case 2:
                                            return [4, Ct()];
                                        case 3:
                                            n = c.sent(),
                                            c.label = 4;
                                        case 4:
                                            return a = {
                                                screenshot: n,
                                                errors: nt
                                            },
                                            o.callback && (a.callback = o.callback),
                                            x.sendMessage(e.message.sendGameScreenshot, {
                                                data: a
                                            }),
                                            [2]
                                        }
                                    }
                                    ))
                                }
                                )),
                                [3, 4]);
                            case 1:
                                return "pokiGenerateRawScreenshot" !== t.data.type ? [3, 2] : (It(void 0, void 0, void 0, (function() {
                                    var t;
                                    return xt(this, (function(n) {
                                        switch (n.label) {
                                        case 0:
                                            return [4, Pt()];
                                        case 1:
                                            return t = n.sent(),
                                            x.sendMessage(e.message.sendGameRawScreenshot, {
                                                data: {
                                                    screenshot: t
                                                }
                                            }),
                                            [2]
                                        }
                                    }
                                    ))
                                }
                                )),
                                [3, 4]);
                            case 2:
                                return "pokiUploadScreenshot" !== t.data.type ? [3, 4] : [4, _t(t.data)];
                            case 3:
                                n = r.sent(),
                                x.sendMessage(e.message.sendUploadScreenshot, {
                                    data: {
                                        screenshot: n
                                    }
                                }),
                                r.label = 4;
                            case 4:
                                return [2]
                            }
                            var o
                        }
                        ))
                    }
                    ))
                }
                ), !1)
            }
            ,
            this.setupInspector = function() {
                var t = 0;
                if (window.addEventListener("message", (function(n) {
                    return Dr(r, void 0, void 0, (function() {
                        return Lr(this, (function(r) {
                            var o, i;
                            return "pokiInspectorRequestCookies" === n.data.type ? br().then((function(t) {
                                x.sendMessage(e.message.sendInspectorCookies, {
                                    data: {
                                        cookies: t
                                    }
                                }),
                                x.sendMessage(e.message.sendInspectorEvent, {
                                    event: "cookies",
                                    data: {
                                        cookies: t
                                    }
                                })
                            }
                            )) : "pokiInspectorSetFPS" === n.data.type && (t = n.data.fps || 0) && (o = performance.now(),
                            i = function() {
                                if (t) {
                                    for (var e = o + 1e3 / t; !((o = performance.now()) >= e); )
                                        ;
                                    requestAnimationFrame(i)
                                }
                            }
                            ,
                            requestAnimationFrame(i)),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ), !1),
                "desktop" !== I.device)
                    try {
                        var n = function(t) {
                            var n = console[t];
                            console[t] = function() {
                                for (var r = [], o = 0; o < arguments.length; o++)
                                    r[o] = arguments[o];
                                x.sendMessage(e.message.sendInspectorConsole, {
                                    data: {
                                        level: t,
                                        args: et(r)
                                    }
                                }),
                                x.sendMessage(e.message.sendInspectorEvent, {
                                    event: "console",
                                    data: {
                                        level: t,
                                        args: et(r)
                                    }
                                }),
                                n.apply(console, r)
                            }
                        };
                        n("log"),
                        n("warn"),
                        n("error")
                    } catch (e) {}
            }
            ,
            this.initWithVideoHB = function() {
                return r.init()
            }
            ,
            this.setDebug = function(t) {
                void 0 === t && (t = !0),
                r.__logCall("setDebug", t),
                window.location.hostname.endsWith("poki-gdn.com") ? t && fr.track(e.tracking.debugTrueInProduction) : (_.debug = t,
                _.log = null != t ? t : _.log,
                t ? function() {
                    if (at) {
                        at = !1,
                        window.removeEventListener("unhandledrejection", lt),
                        window.removeEventListener("error", dt);
                        try {
                            console.error = ot
                        } catch (e) {}
                    }
                }() : pt())
            }
            ,
            this.setLogging = function(e) {
                r.__logCall("setLogging", e),
                _.log = e
            }
            ,
            this.gameLoadingFinished = function() {
                var t, n, o, i;
                r.__logCall("gameLoadingFinished"),
                clearInterval(window.pokiCancelProgressInterval),
                fr.track(e.tracking.screen.gameLoadingFinished, {
                    transferSize: Gn(),
                    trackers: (o = window,
                    i = [],
                    "function" != typeof o.ga && "function" != typeof o.gtag || i.push("ga"),
                    o.mixpanel && "function" == typeof o.mixpanel.track && i.push("mixpanel"),
                    "function" == typeof o.GameAnalytics && i.push("gameanalytics"),
                    (o.kongregateAPI || o.kongregate) && i.push("kongregate"),
                    o.FlurryAgent && i.push("flurry"),
                    o.Countly && i.push("countly"),
                    o.amplitude && i.push("amplitude"),
                    i).join(","),
                    error_session_id: ct,
                    now: Math.round(null === (n = null === (t = window.performance) || void 0 === t ? void 0 : t.now) || void 0 === n ? void 0 : n.call(t)) || void 0
                });
                var a = window.pokiMeasureBuildin;
                window.PokiSDK.measure("game", "loading", "complete"),
                window.pokiMeasureBuildin = a
            }
            ,
            this.gameplayStart = function(n) {
                if (r.__logCall("gameplayStart", n),
                r.ignoreEvents())
                    cr("PokiSDK.gameplayStart() ignored because of too many events");
                else {
                    r.duringGameplay = !0,
                    r.gameStarted || (r.gameStarted = !0,
                    fr.track(e.tracking.screen.firstRound),
                    r.monetization.startStartAdsAfterTimer());
                    var o = r.badEventsCounter;
                    setTimeout((function() {
                        var i;
                        performance.now() - t.lastInteractionTime < 5e3 && (i = r.lastInteractionEvent),
                        fr.track(e.tracking.screen.gameplayStart, Cr(Cr({}, n), {
                            fps: r.fpsStats.stats(),
                            badEvents: o,
                            interaction: i
                        }))
                    }
                    ), 0),
                    clearTimeout(r.playerActiveTimeout),
                    r.playerActiveTimeout = setTimeout((function() {
                        window.addEventListener("pointermove", r.__playerIsActiveEvent),
                        document.addEventListener("keydown", r.__playerIsActiveEvent)
                    }
                    ), 6e5),
                    r.lastGamePlayStop && (r.lastGamePlayStop > performance.now() - 50 && r.badEventsCounter++,
                    r.lastGamePlayStop = 0)
                }
            }
            ,
            this.gameplayStop = function(t) {
                r.__logCall("gameplayStop", t),
                r.ignoreEvents() ? cr("PokiSDK.gameplayStart() ignored because of too many events") : (r.duringGameplay = !1,
                fr.track(e.tracking.screen.gameplayStop, Cr(Cr({}, t), {
                    fps: r.fpsStats.stats()
                })),
                clearTimeout(r.playerActiveTimeout),
                window.removeEventListener("pointermove", r.__playerIsActiveEvent),
                document.removeEventListener("keydown", r.__playerIsActiveEvent),
                r.lastGamePlayStop = performance.now())
            }
            ,
            this.customEvent = function(t, n, o) {
                void 0 === o && (o = {}),
                r.__logCall("customEvent", t, n, o),
                t && n ? (t = String(t),
                n = String(n),
                o = Cr({}, o),
                "game" === t && "segment" === n && o.segment || fr.track(e.tracking.custom, {
                    eventNoun: t,
                    eventVerb: n,
                    eventData: o
                })) : console.error("%cPOKI:%c PokiSDK.customEvent() needs at least a noun and a verb", "font-weight: bold", "")
            }
            ,
            this.commercialBreak = function(t) {
                return new Promise((function(n) {
                    if (r.__logCall("commercialBreak", t),
                    r.ignoreEvents())
                        return cr("PokiSDK.commercialBreak() ignored because of too many calls"),
                        void n();
                    var o = r.gameStarted ? e.ads.position.midroll : e.ads.position.preroll
                      , i = !1;
                    r.runVideoAd({
                        amount: 1,
                        position: o,
                        onStart: function() {
                            if (r.commercialBreaks++,
                            i = !0,
                            window.pokiMeasureBuildin && window.PokiSDK.measure("midroll", "start", r.commercialBreaks),
                            "function" == typeof t)
                                try {
                                    t()
                                } catch (e) {
                                    cr("error in onStart callback of PokiSDK.commercialBreak()", e)
                                }
                        }
                    }).then((function() {
                        i && window.pokiMeasureBuildin && window.PokiSDK.measure("midroll", "complete", r.commercialBreaks),
                        n()
                    }
                    ))
                }
                ))
            }
            ,
            this.rewardedBreak = function(t) {
                return new Promise((function(n) {
                    r.__logCall("rewardedBreak", t);
                    var o, i = 1;
                    if ("function" == typeof t)
                        o = t;
                    else if ("object" == typeof t) {
                        t.onStart && (o = t.onStart);
                        var a = (null == t ? void 0 : t.size) || vr.SMALL;
                        a === vr.SMALL ? i = 1 : a === vr.MEDIUM ? i = 2 : a === vr.LARGE && (i = 3)
                    }
                    var c = !1;
                    setTimeout((function() {
                        r.runVideoAd({
                            position: e.ads.position.rewarded,
                            amount: i,
                            onStart: function() {
                                if (r.rewardedBreaks++,
                                c = !0,
                                window.pokiMeasureBuildin && window.PokiSDK.measure("rewarded", "start", r.rewardedBreaks),
                                "function" == typeof o)
                                    try {
                                        o()
                                    } catch (e) {
                                        cr("error in onStart callback of PokiSDK.rewardedBreak()", e)
                                    }
                            }
                        }).then((function(e) {
                            c && window.pokiMeasureBuildin && window.PokiSDK.measure("rewarded", "complete", r.rewardedBreaks),
                            n(e)
                        }
                        ))
                    }
                    ), 0)
                }
                ))
            }
            ,
            this.displayAd = function(t, n, o, i) {
                r.__logCall("displayAd", t, n, o, i);
                var a = hr();
                fr.track(e.tracking.screen.displayAd, {
                    size: n,
                    opportunityId: a,
                    duringGameplay: r.duringGameplay
                });
                var c = {
                    container: t,
                    opportunityId: a,
                    size: n,
                    duringGameplay: r.duringGameplay,
                    onCanDestroy: o,
                    onDisplayRendered: i,
                    headerBiddingAllowed: !0
                };
                r.monetization.displayAd(c)
            }
            ,
            this.isAdBlocked = function() {
                return !1
            }
            ,
            this.muteAd = function() {
                r.__logCall("muteAd"),
                r.monetization.muteAd()
            }
            ,
            this.logError = function(e) {
                r.captureError(e)
            }
            ,
            this.setPlaytestCanvas = function(e) {
                r.__logCall("setPlaytestCanvas", e),
                r.playtestSetCanvas(e)
            }
            ,
            this.playtestSetCanvas = function(e) {
                r.__logCall("playtestSetCanvas", e),
                e ? (t.__playtestCanvas = [].concat(e),
                En(t.__playtestCanvas)) : t.__playtestCanvas = []
            }
            ,
            this.playtestCaptureHtmlOnce = function() {
                r.__logCall("playtestCaptureHtmlOnce"),
                t.__playtestCaptureHTML = Br
            }
            ,
            this.playtestCaptureHtmlForce = function() {
                r.__logCall("playtestCaptureHtmlForce"),
                t.__playtestCaptureHTML = Nr
            }
            ,
            this.playtestCaptureHtmlOn = function() {
                r.__logCall("playtestCaptureHtmlOn"),
                t.__playtestCaptureHTML = jr
            }
            ,
            this.playtestCaptureHtmlOff = function() {
                r.__logCall("playtestCaptureHtmlOff"),
                t.__playtestCaptureHTML = Rr
            }
            ,
            this.getIsoLanguage = function() {
                return v("iso_lang")
            }
            ,
            this.shareableURL = function(t) {
                return void 0 === t && (t = {}),
                new Promise((function(n, o) {
                    r.__logCall("shareableURL", t);
                    var i = new URLSearchParams
                      , a = Object.keys(t);
                    if (I.isPokiIframe || I.isInspector) {
                        var c = v("poki_url");
                        a.forEach((function(e) {
                            void 0 !== t[e] && null !== t[e] && i.set("gd".concat(e), t[e])
                        }
                        )),
                        n("".concat(c, "?").concat(i.toString())),
                        x.sendMessage(e.message.setPokiURLParams, {
                            params: t
                        })
                    } else
                        window.self === window.top ? (a.forEach((function(e) {
                            void 0 !== t[e] && null !== t[e] && i.set("".concat(e), t[e])
                        }
                        )),
                        n("".concat(window.location.origin).concat(window.location.pathname, "?").concat(i.toString()))) : o(new Error("shareableURL only works on Poki or a top level frame"))
                }
                ))
            }
            ,
            this.getURLParam = function(e) {
                return v("gd".concat(e)) || v(e)
            }
            ,
            this.captureError = function(e) {
                r.__logCall("captureError", e),
                ut(e)
            }
            ,
            this.getLanguage = function() {
                return navigator.language.toLowerCase().split("-")[0]
            }
            ,
            this.generateScreenshot = function() {
                return Dr(r, void 0, void 0, (function() {
                    return Lr(this, (function(e) {
                        return this.__logCall("generateScreenshot"),
                        [2, Ct()]
                    }
                    ))
                }
                ))
            }
            ,
            this.enableEventTracking = function(e) {
                var t;
                r.__logCall("enableEventTracking", e),
                I.isPlayground || I.isPokiIframe || I.isInspector || (null === (t = null === document || void 0 === document ? void 0 : document.referrer) || void 0 === t ? void 0 : t.includes("games.poki.com")) || fr.setupObserverWithCMP(e || 0)
            }
            ,
            this.__playerIsActiveEvent = function() {
                window.removeEventListener("pointermove", r.__playerIsActiveEvent),
                document.removeEventListener("keydown", r.__playerIsActiveEvent),
                fr.track(e.tracking.screen.playerActive),
                r.playerActiveTimeout = setTimeout((function() {
                    window.addEventListener("pointermove", r.__playerIsActiveEvent),
                    document.addEventListener("keydown", r.__playerIsActiveEvent)
                }
                ), 6e5)
            }
            ,
            this.__interactionEvent = function(e) {
                "pointerdown" === e.type ? r.lastInteractionEvent = "pointerdown" : "keydown" === e.type ? r.lastInteractionEvent = "keydown-".concat(e.code) : r.lastInteractionEvent = "unknown",
                t.lastInteractionTime = performance.now()
            }
            ,
            this.__logCall = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                for (var r = 0; r < t.length; r++)
                    void 0 === t[r] && (t[r] = "");
                ar.apply(void 0, Mr(Mr(["PokiSDK.".concat(e, "(")], t, !1), [")"], !1))
            }
            ,
            this.setDebugTouchOverlayController = function() {}
            ,
            this.gameInteractive = function() {}
            ,
            this.gameLoadingProgress = function() {}
            ,
            this.gameLoadingStart = function() {}
            ,
            this.getLeaderboard = function() {
                return Promise.resolve([])
            }
            ,
            this.happyTime = function() {}
            ,
            this.sendHighscore = function() {}
            ,
            this.setPlayerAge = function() {}
            ,
            this.roundStart = function() {}
            ,
            this.roundEnd = function() {}
            ,
            this.getUser = function() {
                return Dr(r, void 0, void 0, (function() {
                    return Lr(this, (function(e) {
                        return [2, this.account.getUser()]
                    }
                    ))
                }
                ))
            }
            ,
            this.login = function() {
                return Dr(r, void 0, void 0, (function() {
                    return Lr(this, (function(e) {
                        return [2, this.account.login()]
                    }
                    ))
                }
                ))
            }
            ,
            this.monetization = n,
            this.SDK = this.monetization,
            Er(),
            setInterval((function() {
                r.badEventsCounter = Math.max(r.badEventsCounter - 1, 0)
            }
            ), 1e3)
        }
        return t.prototype.init = function(n) {
            var r, o, i = this;
            void 0 === n && (n = {}),
            this.__logCall("init", n),
            window.addEventListener("pointerdown", this.__interactionEvent),
            document.addEventListener("keydown", this.__interactionEvent);
            var a = window;
            if (null === (o = null === (r = a.engine) || void 0 === r ? void 0 : r.config) || void 0 === o ? void 0 : o.onPrint) {
                var c = a.engine.config.onPrint;
                a.engine.config.onPrint = function() {
                    for (var e, n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                    c.apply(void 0, n);
                    var o = null === (e = n[0]) || void 0 === e ? void 0 : e.match(/Godot Engine (.+)/);
                    o && o[1] && (t.__godotVersion = o[1],
                    a.engine.config.onPrint = c)
                }
            }
            return new Promise((function(t) {
                i.monetization.init(Cr({
                    onReady: function() {
                        v("preroll") && i.monetization.forcePreroll(),
                        t()
                    }
                }, n)),
                i.asyncScreenshotLoader(),
                I.isInspector && i.setupInspector(),
                document.location.search.length <= 1 && (x.sendMessage(e.message.sendInspectorBadBehavior, {
                    data: {
                        behavior: "rewrite_query_params"
                    }
                }),
                x.sendMessage(e.message.sendInspectorEvent, {
                    event: "bad-behavior",
                    data: {
                        behavior: "rewrite_query_params"
                    }
                })),
                x.sendMessage(e.message.sdkDetails, {
                    version: "ff583837d6995ef2e470656f961ccda2825e9ce6"
                })
            }
            ))
        }
        ,
        t.prototype.ignoreEvents = function() {
            return this.badEventsCounter >= 10
        }
        ,
        t.prototype.destroyAd = function(e) {
            this.__logCall("destroyAd", e),
            this.monetization.destroyAd(e)
        }
        ,
        t.prototype.setVolume = function(e) {
            this.__logCall("setVolume", e),
            this.monetization.setVolume(e)
        }
        ,
        t.prototype.runVideoAd = function(t) {
            var n = this
              , r = t.position
              , o = t.amount
              , i = t.onStart
              , a = t.timeBetweenAds;
            return new Promise((function(t) {
                var c = 1;
                n.monetization.setNrAds(c, o);
                var s = hr()
                  , u = function(i) {
                    setTimeout((function() {
                        if ((null == i ? void 0 : i.type) !== e.ads.limit && (null == i ? void 0 : i.type) !== e.ads.busy) {
                            if (c === o || n.runningAsInGameHoistingSDK)
                                return L.dispatchEvent(e.ads.startTimer, {
                                    overwriteTimeBetweenAds: a
                                }),
                                void t(!!(null == i ? void 0 : i.rewardAllowed));
                            var l = L.getVideoDataAnnotations();
                            if ("poki" === (null == l ? void 0 : l.bidder))
                                return L.dispatchEvent(e.ads.startTimer, {
                                    overwriteTimeBetweenAds: a
                                }),
                                void t(!0);
                            c++,
                            L.clearVideoDataAnnotations(),
                            L.addVideoDataAnnotations({
                                adBreakId: s,
                                position: r,
                                opportunityId: hr(),
                                currentAdNumber: c,
                                totalAdAmount: o
                            }),
                            n.monetization.setNrAds(c, o),
                            n.monetization.requestAd({
                                position: r,
                                onFinish: u
                            })
                        } else
                            t(!1)
                    }
                    ), 0)
                };
                L.clearVideoDataAnnotations(),
                L.addVideoDataAnnotations({
                    adBreakId: s,
                    position: r,
                    opportunityId: hr(),
                    currentAdNumber: 1,
                    totalAdAmount: o
                }),
                n.monetization.requestAd({
                    position: r,
                    onFinish: u,
                    onStart: function() {
                        if (n.SDK.setNrAds(c, o),
                        "function" == typeof i)
                            try {
                                i()
                            } catch (e) {
                                console.error("%cPOKI:%c error in onStart callback of PokiSDK.runVideoAd()", "font-weight: bold", "", e)
                            }
                    }
                })
            }
            ))
        }
        ,
        t.lastInteractionTime = 0,
        t.__playtestCaptureHTML = "",
        t.__godotVersion = void 0,
        t
    }();
    const Vr = Gr;
    var Fr = 21682198607;
    const Kr = {
        adTagUrl: "//pubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/1053551/Pub-Poki-Generic&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}&nofb=1",
        adTiming: {
            preroll: !1,
            timeBetweenAds: 12e4,
            timePerTry: 7e3,
            startAdsAfter: 12e4
        },
        waterfallRetries: 2
    };
    function Ur(e) {
        var t = "/".concat(Fr, "/debug-display/debug-display-").concat(e);
        return _.debug || (t = I.isPokiIframe ? "/".concat(Fr, "/").concat(I.device, "_ingame_").concat(e, "/").concat(I.siteID, "_").concat(I.device, "_ingame_").concat(e) : I.isPokiExternal ? "/".concat(Fr, "/external_").concat(I.device, "_display_platform") : "/".concat(Fr, "/external_").concat(I.device, "_display_ingame/external_").concat(I.device, "_ingame_").concat(e)),
        t
    }
    var zr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Hr = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    };
    const qr = function() {
        var e = window.location.pathname;
        "/" !== e[0] && (e = "/".concat(e));
        var t = "";
        window.top !== window && (t = encodeURIComponent(document.referrer));
        var n = encodeURIComponent("".concat(window.location.protocol, "//").concat(window.location.host).concat(e).concat(window.location.search))
          , r = "https://devs-api.poki.com/gameinfo/@sdk?href=".concat(n, "&referrer=").concat(t);
        return fetch(r, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then((function(e) {
            return zr(void 0, void 0, void 0, (function() {
                var t;
                return Hr(this, (function(n) {
                    switch (n.label) {
                    case 0:
                        return e.status >= 200 && e.status < 400 ? [4, e.json()] : [3, 2];
                    case 1:
                        return (t = n.sent()).game_id ? [2, {
                            gameID: t.game_id,
                            gameTitle: t.game_name,
                            playtestRecord: t.playtest_record,
                            playtestVersion: t.playtest_version,
                            playtestDeviceCategory: t.playtest_device_category,
                            playtestNewUser: t.playtest_new_user,
                            metrictestID: t.metrictest_id,
                            metrictestVersion: t.metrictest_version,
                            metrictestDeviceCategory: t.metrictest_device_category,
                            cachedContentGameID: t.cached_content_game_id,
                            specialConditions: t.ad_settings.special_conditions,
                            adTiming: {
                                preroll: t.ad_settings.preroll,
                                timePerTry: t.ad_settings.time_per_try,
                                timeBetweenAds: t.ad_settings.time_between_ads,
                                startAdsAfter: t.ad_settings.start_ads_after
                            }
                        }] : [2, void 0];
                    case 2:
                        throw e
                    }
                }
                ))
            }
            ))
        }
        )).catch((function(e) {
            return function(e) {
                return zr(this, void 0, void 0, (function() {
                    var t, n, r, o, i, a, c, s, u, l, d, p;
                    return Hr(this, (function(f) {
                        switch (f.label) {
                        case 0:
                            console.warn("%cPOKI:%c failed request p4d info", "font-weight: bold", "", e),
                            f.label = 1;
                        case 1:
                            return f.trys.push([1, 4, , 5]),
                            "/" !== (t = window.location.pathname)[0] && (t = "/".concat(t)),
                            o = (r = JSON).stringify,
                            l = {
                                c: "sdk-p4d-error",
                                ve: 7
                            },
                            d = {
                                k: "error"
                            },
                            a = (i = JSON).stringify,
                            p = {
                                status: e.status
                            },
                            (c = e.json) ? [4, e.json()] : [3, 3];
                        case 2:
                            c = f.sent(),
                            f.label = 3;
                        case 3:
                            if (n = o.apply(r, [(l.d = [(d.v = a.apply(i, [(p.json = c,
                            p.body = JSON.stringify({
                                href: "".concat(window.location.protocol, "//").concat(window.location.host).concat(t).concat(window.location.search)
                            }),
                            p.name = e.name,
                            p.message = e.message,
                            p)]),
                            d)],
                            l)]),
                            s = "https://t.poki.io/l",
                            navigator.sendBeacon)
                                navigator.sendBeacon(s, n);
                            else
                                try {
                                    (u = new XMLHttpRequest).open("POST", s, !0),
                                    u.send(n)
                                } catch (e) {}
                            return [3, 5];
                        case 4:
                            return f.sent(),
                            [3, 5];
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }(e)
        }
        ))
    };
    var Yr = function() {
        function t(t) {
            void 0 === t && (t = {}),
            this.setTimings(t),
            this.timers = {
                timePerTry: void 0,
                timeBetweenAds: void 0,
                startAdsAfter: void 0
            },
            (null == t ? void 0 : t.fake) || L.addEventListener(e.ads.startTimer, this.startTimeBetweenAdsTimer.bind(this))
        }
        return t.prototype.setTimings = function(e) {
            var t = Kr.adTiming
              , n = e.preroll
              , r = void 0 === n ? t.preroll : n
              , o = e.timePerTry
              , i = void 0 === o ? t.timePerTry : o
              , a = e.timeBetweenAds
              , c = void 0 === a ? t.timeBetweenAds : a
              , s = e.startAdsAfter
              , u = void 0 === s ? t.startAdsAfter : s;
            this.timings = {
                preroll: !1 !== r,
                timePerTry: i,
                timeBetweenAds: c,
                startAdsAfter: u
            }
        }
        ,
        t.prototype.resetAll = function() {
            this.stopTimer("timePerTry"),
            this.stopTimer("timeBetweenAds"),
            this.stopTimer("startAdsAfter")
        }
        ,
        t.prototype.startTimeBetweenAdsTimer = function(e) {
            (null == e ? void 0 : e.overwriteTimeBetweenAds) ? this.startTimer("timeBetweenAds", (function() {}
            ), e.overwriteTimeBetweenAds) : this.startTimer("timeBetweenAds")
        }
        ,
        t.prototype.startStartAdsAfterTimer = function() {
            this.startTimer("startAdsAfter")
        }
        ,
        t.prototype.requestPossible = function() {
            return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
        }
        ,
        t.prototype.startWaterfallTimer = function(e) {
            this.startTimer("timePerTry", e)
        }
        ,
        t.prototype.stopWaterfallTimer = function() {
            this.stopTimer("timePerTry")
        }
        ,
        t.prototype.stopTimer = function(e) {
            this.timers[e] && (clearTimeout(this.timers[e]),
            this.timers[e] = void 0)
        }
        ,
        t.prototype.startTimer = function(e, t, n) {
            var r = this;
            void 0 === t && (t = function() {}
            );
            var o = n || this.timings[e];
            o <= 0 ? t() : (this.timers[e] && clearTimeout(this.timers[e]),
            this.timers[e] = window.setTimeout((function() {
                r.stopTimer(e),
                t()
            }
            ), o))
        }
        ,
        t.prototype.prerollPossible = function() {
            return this.timings.preroll
        }
        ,
        t
    }();
    const Wr = Yr;
    function Qr(e) {
        if (document.body && document.body.appendChild) {
            var t = document.createElement("iframe");
            t.style.display = "none",
            document.body.appendChild(t),
            t.contentWindow && (t.contentWindow.document.open(),
            t.contentWindow.document.write("<script>".concat(e, "<\/script>")),
            t.contentWindow.document.close())
        } else
            document.addEventListener("DOMContentLoaded", (function() {
                Qr(e)
            }
            ))
    }
    var Jr = function() {
        I.isPokiIframe && (setTimeout(Ar.trackSavegames, 1e4),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && Qr("\nwindow.addEventListener('storage', function(event) {\n\ttry {\n\t\tconst key = event.key;\n\n\t\t// key is null when localStorage.clear() is called.\n\t\tif (key === null) {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'clear',\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t\treturn;\n\t\t}\n\n\t\t// newValue is null when localStorage.removeItem() is called.\n\t\tif (event.newValue === null) {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'delete',\n\t\t\t\t\tkey,\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t} else {\n\t\t\twindow.top.postMessage({\n\t\t\t\ttype: 'mutateSaveGame',\n\t\t\t\tcontent: {\n\t\t\t\t\taction: 'set',\n\t\t\t\t\tkey,\n\t\t\t\t\tvalue: event.newValue,\n\t\t\t\t},\n\t\t\t}, '*');\n\t\t}\n\t} catch { }\n});\n"))
    }
      , Zr = function() {
        return Zr = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }
        ,
        Zr.apply(this, arguments)
    }
      , Xr = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , $r = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , eo = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    };
    function to(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }
            ))),
            n.push.apply(n, r)
        }
        return n
    }
    function no(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? to(Object(n), !0).forEach((function(t) {
                ao(e, t, n[t])
            }
            )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : to(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }
            ))
        }
        return e
    }
    function ro(e) {
        return ro = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ,
        ro(e)
    }
    function oo(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
    function io(e, t, n) {
        return t && function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, lo(r.key), r)
            }
        }(e.prototype, t),
        Object.defineProperty(e, "prototype", {
            writable: !1
        }),
        e
    }
    function ao(e, t, n) {
        return (t = lo(t))in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n,
        e
    }
    function co(e, t) {
        return function(e) {
            if (Array.isArray(e))
                return e
        }(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [], s = !0, u = !1;
                try {
                    if (i = (n = n.call(e)).next,
                    0 === t) {
                        if (Object(n) !== n)
                            return;
                        s = !1
                    } else
                        for (; !(s = (r = i.call(n)).done) && (c.push(r.value),
                        c.length !== t); s = !0)
                            ;
                } catch (e) {
                    u = !0,
                    o = e
                } finally {
                    try {
                        if (!s && null != n.return && (a = n.return(),
                        Object(a) !== a))
                            return
                    } finally {
                        if (u)
                            throw o
                    }
                }
                return c
            }
        }(e, t) || so(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function so(e, t) {
        if (e) {
            if ("string" == typeof e)
                return uo(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? uo(e, t) : void 0
        }
    }
    function uo(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++)
            r[n] = e[n];
        return r
    }
    function lo(e) {
        var t = function(e, t) {
            if ("object" != typeof e || null === e)
                return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != typeof r)
                    return r;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === t ? String : Number)(e)
        }(e, "string");
        return "symbol" == typeof t ? t : String(t)
    }
    var po = io((function e(t) {
        oo(this, e),
        this.p = new Promise(t)
    }
    ));
    po.__typeson__type__ = "TypesonPromise",
    "undefined" != typeof Symbol && Object.defineProperty(po.prototype, Symbol.toStringTag, {
        get: function() {
            return "TypesonPromise"
        }
    }),
    po.prototype.then = function(e, t) {
        var n = this;
        return new po((function(r, o) {
            n.p.then((function(t) {
                r(e ? e(t) : t)
            }
            )).catch((function(e) {
                return t ? t(e) : Promise.reject(e)
            }
            )).then(r, o)
        }
        ))
    }
    ,
    po.prototype.catch = function(e) {
        return this.then((function() {}
        ), e)
    }
    ,
    po.resolve = function(e) {
        return new po((function(t) {
            t(e)
        }
        ))
    }
    ,
    po.reject = function(e) {
        return new po((function(t, n) {
            n(e)
        }
        ))
    }
    ,
    po.all = function(e) {
        return new po((function(t, n) {
            Promise.all(e.map((function(e) {
                return null != e && e.constructor && "__typeson__type__"in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e
            }
            ))).then(t, n)
        }
        ))
    }
    ,
    po.race = function(e) {
        return new po((function(t, n) {
            Promise.race(e.map((function(e) {
                return null != e && e.constructor && "__typeson__type__"in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e
            }
            ))).then(t, n)
        }
        ))
    }
    ,
    po.allSettled = function(e) {
        return new po((function(t, n) {
            Promise.allSettled(e.map((function(e) {
                return null != e && e.constructor && "__typeson__type__"in e.constructor && "TypesonPromise" === e.constructor.__typeson__type__ ? e.p : e
            }
            ))).then(t, n)
        }
        ))
    }
    ;
    var fo = Object.hasOwn
      , ho = Object.getPrototypeOf;
    function vo(e, t) {
        return bo(e) && "function" == typeof e.then && (!t || "function" == typeof e.catch)
    }
    function yo(e) {
        return Object.prototype.toString.call(e).slice(8, -1)
    }
    function go(e, t) {
        if (!e || "object" !== ro(e))
            return !1;
        var n = ho(e);
        if (!n)
            return null === t;
        var r = fo(n, "constructor") && n.constructor;
        return "function" != typeof r ? null === t : t === r || null !== t && Function.prototype.toString.call(r) === Function.prototype.toString.call(t) || "function" == typeof t && "string" == typeof r.__typeson__type__ && r.__typeson__type__ === t.__typeson__type__
    }
    function mo(e) {
        return !(!e || "Object" !== yo(e)) && (!ho(e) || go(e, Object))
    }
    function wo(e) {
        if (!e || "Object" !== yo(e))
            return !1;
        var t = ho(e);
        return !t || go(e, Object) || wo(t)
    }
    function bo(e) {
        return null !== e && "object" === ro(e)
    }
    function ko(e) {
        return e.replaceAll("''", "''''").replace(/^$/, "''").replaceAll("~", "~0").replaceAll(".", "~1")
    }
    function Ao(e) {
        return e.replaceAll("~1", ".").replaceAll("~0", "~").replace(/^''$/, "").replaceAll("''''", "''")
    }
    function So(e, t) {
        if ("" === t)
            return e;
        if (null === e || "object" !== ro(e))
            throw new TypeError("Unexpected non-object type");
        var n = t.indexOf(".");
        if (n > -1) {
            var r = e[Ao(t.slice(0, n))];
            return void 0 === r ? void 0 : So(r, t.slice(n + 1))
        }
        return e[Ao(t)]
    }
    function Eo(e, t, n) {
        if ("" === t)
            return n;
        if (!e || "object" !== ro(e))
            throw new TypeError("Unexpected non-object type");
        var r = t.indexOf(".");
        return r > -1 ? Eo(e[Ao(t.slice(0, r))], t.slice(r + 1), n) : (e[Ao(t)] = n,
        e)
    }
    function Io(e) {
        return null === e ? "null" : Array.isArray(e) ? "array" : ro(e)
    }
    function xo(e, t, n) {
        return e && e.then || (e = Promise.resolve(e)),
        t ? e.then(t) : e
    }
    var To = Object.keys
      , _o = Object.hasOwn
      , Po = Array.isArray
      , Oo = ["type", "replaced", "iterateIn", "iterateUnsetNumeric", "addLength"];
    function Co(e) {
        return function() {
            for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
            try {
                return Promise.resolve(e.apply(this, t))
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
    function Do(e, t) {
        var n, r;
        if ("" === e.keypath)
            return -1;
        var o = null !== (n = e.keypath.match(/\./g)) && void 0 !== n ? n : 0
          , i = null !== (r = t.keypath.match(/\./g)) && void 0 !== r ? r : 0;
        return o && (o = o.length),
        i && (i = i.length),
        o > i ? -1 : o < i ? 1 : e.keypath < t.keypath ? -1 : e.keypath > t.keypath ? 1 : 0
    }
    var Lo = function() {
        function e(t) {
            oo(this, e),
            this.options = t,
            this.plainObjectReplacers = [],
            this.nonplainObjectReplacers = [],
            this.revivers = {},
            this.types = {}
        }
        return io(e, [{
            key: "stringify",
            value: function(e, t, n, r) {
                r = no(no(no({}, this.options), r), {}, {
                    stringification: !0
                });
                var o = this.encapsulate(e, null, r);
                return Po(o) ? JSON.stringify(o[0], t, n) : o.then((function(e) {
                    return JSON.stringify(e, t, n)
                }
                ))
            }
        }, {
            key: "stringifySync",
            value: function(e, t, n, r) {
                return this.stringify(e, t, n, no(no({
                    throwOnBadSyncType: !0
                }, r), {}, {
                    sync: !0
                }))
            }
        }, {
            key: "stringifyAsync",
            value: function(e, t, n, r) {
                return this.stringify(e, t, n, no(no({
                    throwOnBadSyncType: !0
                }, r), {}, {
                    sync: !1
                }))
            }
        }, {
            key: "parse",
            value: function(e, t, n) {
                return n = no(no(no({}, this.options), n), {}, {
                    parse: !0
                }),
                this.revive(JSON.parse(e, t), n)
            }
        }, {
            key: "parseSync",
            value: function(e, t, n) {
                return this.parse(e, t, no(no({
                    throwOnBadSyncType: !0
                }, n), {}, {
                    sync: !0
                }))
            }
        }, {
            key: "parseAsync",
            value: function(e, t, n) {
                return this.parse(e, t, no(no({
                    throwOnBadSyncType: !0
                }, n), {}, {
                    sync: !1
                }))
            }
        }, {
            key: "specialTypeNames",
            value: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return n.returnTypeNames = !0,
                this.encapsulate(e, t, n)
            }
        }, {
            key: "rootTypeName",
            value: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return n.iterateNone = !0,
                this.encapsulate(e, t, n)
            }
        }, {
            key: "encapsulate",
            value: function(e, t, n) {
                var r = this
                  , o = no(no({
                    sync: !0
                }, this.options), n)
                  , i = o.sync
                  , a = {}
                  , c = []
                  , s = []
                  , u = []
                  , l = !("cyclic"in o) || o.cyclic
                  , d = o.encapsulateObserver
                  , p = function(e) {
                    var t = Object.values(a);
                    if (o.iterateNone)
                        return t.length ? t[0] : Io(e);
                    if (t.length) {
                        if (o.returnTypeNames)
                            return function(e) {
                                return function(e) {
                                    if (Array.isArray(e))
                                        return uo(e)
                                }(e) || function(e) {
                                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                                        return Array.from(e)
                                }(e) || so(e) || function() {
                                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }()
                            }(new Set(t));
                        e && mo(e) && !_o(e, "$types") ? e.$types = a : e = {
                            $: e,
                            $types: {
                                $: a
                            }
                        }
                    } else
                        bo(e) && _o(e, "$types") && (e = {
                            $: e,
                            $types: !0
                        });
                    return !o.returnTypeNames && e
                }
                  , f = Co((function(e, t) {
                    return xo(Promise.all(t.map((function(e) {
                        return e[1].p
                    }
                    ))), (function(n) {
                        return xo(Promise.all(n.map(Co((function(n) {
                            var r = !1
                              , o = []
                              , i = co(t.splice(0, 1), 1)
                              , a = co(i[0], 7)
                              , c = a[0]
                              , s = a[2]
                              , u = a[3]
                              , l = a[4]
                              , d = a[5]
                              , p = a[6]
                              , h = v(c, n, s, u, o, !0, p)
                              , y = go(h, po);
                            return function(e, t) {
                                var n = e();
                                return n && n.then ? n.then(t) : t(n)
                            }((function() {
                                if (c && y)
                                    return xo(h.p, (function(t) {
                                        l[d] = t;
                                        var n = f(e, o);
                                        return r = !0,
                                        n
                                    }
                                    ))
                            }
                            ), (function(t) {
                                return r ? t : (c ? l[d] = h : e = y ? h.p : h,
                                f(e, o))
                            }
                            ))
                        }
                        )))), (function() {
                            return e
                        }
                        ))
                    }
                    ))
                }
                ))
                  , h = function(e, t, n) {
                    Object.assign(e, t);
                    var r = Oo.map((function(t) {
                        var n = e[t];
                        return delete e[t],
                        n
                    }
                    ));
                    n(),
                    Oo.forEach((function(t, n) {
                        e[t] = r[n]
                    }
                    ))
                }
                  , v = function e(t, n, i, u, l, p, f) {
                    var v, g = {}, m = ro(n), w = d ? function(e) {
                        var r, o = null !== (r = null != f ? f : u.type) && void 0 !== r ? r : Io(n);
                        d(Object.assign(null != e ? e : g, {
                            keypath: t,
                            value: n,
                            cyclic: i,
                            stateObj: u,
                            promisesData: l,
                            resolvingTypesonPromise: p,
                            awaitingTypesonPromise: go(n, po)
                        }, {
                            type: o
                        }))
                    }
                    : null;
                    if (["string", "boolean", "number", "undefined"].includes(m))
                        return void 0 === n || Number.isNaN(n) || n === Number.NEGATIVE_INFINITY || n === Number.POSITIVE_INFINITY || 0 === n ? (v = u.replaced ? n : y(t, n, u, l, !1, p, w)) !== n && (g = {
                            replaced: v
                        }) : v = n,
                        w && w(),
                        v;
                    if (null === n)
                        return w && w(),
                        n;
                    if (i && !u.iterateIn && !u.iterateUnsetNumeric && n && "object" === ro(n)) {
                        var b = c.indexOf(n);
                        if (!(b < 0))
                            return a[t] = "#",
                            w && w({
                                cyclicKeypath: s[b]
                            }),
                            "#" + s[b];
                        !0 === i && (c.push(n),
                        s.push(t))
                    }
                    var k, A, S = mo(n), E = Po(n), I = (S || E) && (!r.plainObjectReplacers.length || u.replaced) || u.iterateIn ? n : y(t, n, u, l, S || E, null, w);
                    if (I !== n ? (v = I,
                    g = {
                        replaced: I
                    }) : "" === t && go(n, po) ? (l.push([t, n, i, u, void 0, void 0, u.type]),
                    v = n) : E && "object" !== u.iterateIn || "array" === u.iterateIn ? (k = new Array(n.length),
                    g = {
                        clone: k
                    }) : (["function", "symbol"].includes(ro(n)) || "toJSON"in n || go(n, po) || go(n, Promise) || go(n, ArrayBuffer)) && !S && "object" !== u.iterateIn ? v = n : (k = {},
                    u.addLength && (k.length = n.length),
                    g = {
                        clone: k
                    }),
                    w && w(),
                    o.iterateNone)
                        return null !== (A = k) && void 0 !== A ? A : v;
                    if (!k)
                        return v;
                    if (u.iterateIn) {
                        var x = function(r) {
                            var o = {
                                ownKeys: _o(n, r)
                            };
                            h(u, o, (function() {
                                var o = t + (t ? "." : "") + ko(r)
                                  , a = e(o, n[r], Boolean(i), u, l, p);
                                go(a, po) ? l.push([o, a, Boolean(i), u, k, r, u.type]) : void 0 !== a && (k[r] = a)
                            }
                            ))
                        };
                        for (var T in n)
                            x(T);
                        w && w({
                            endIterateIn: !0,
                            end: !0
                        })
                    } else
                        To(n).forEach((function(r) {
                            var o = t + (t ? "." : "") + ko(r);
                            h(u, {
                                ownKeys: !0
                            }, (function() {
                                var t = e(o, n[r], Boolean(i), u, l, p);
                                go(t, po) ? l.push([o, t, Boolean(i), u, k, r, u.type]) : void 0 !== t && (k[r] = t)
                            }
                            ))
                        }
                        )),
                        w && w({
                            endIterateOwn: !0,
                            end: !0
                        });
                    if (u.iterateUnsetNumeric) {
                        for (var _ = n.length, P = function(r) {
                            if (!(r in n)) {
                                var o = "".concat(t).concat(t ? "." : "").concat(r);
                                h(u, {
                                    ownKeys: !1
                                }, (function() {
                                    var t = e(o, void 0, Boolean(i), u, l, p);
                                    go(t, po) ? l.push([o, t, Boolean(i), u, k, r, u.type]) : void 0 !== t && (k[r] = t)
                                }
                                ))
                            }
                        }, O = 0; O < _; O++)
                            P(O);
                        w && w({
                            endIterateUnsetNumeric: !0,
                            end: !0
                        })
                    }
                    return k
                }
                  , y = function(e, t, n, o, c, s, u) {
                    for (var d = c ? r.plainObjectReplacers : r.nonplainObjectReplacers, p = d.length; p--; ) {
                        var f = d[p];
                        if (f.test(t, n)) {
                            var h = f.type;
                            if (r.revivers[h]) {
                                var y = a[e];
                                a[e] = y ? [h].concat(y) : h
                            }
                            if (Object.assign(n, {
                                type: h,
                                replaced: !0
                            }),
                            (i || !f.replaceAsync) && !f.replace)
                                return u && u({
                                    typeDetected: !0
                                }),
                                v(e, t, l && "readonly", n, o, s, h);
                            u && u({
                                replacing: !0
                            });
                            var g = void 0;
                            if (i || !f.replaceAsync) {
                                if (void 0 === f.replace)
                                    throw new TypeError("Missing replacer");
                                g = f.replace(t, n)
                            } else
                                g = f.replaceAsync(t, n);
                            return v(e, g, l && "readonly", n, o, s, h)
                        }
                    }
                    return t
                }
                  , g = v("", e, l, null != t ? t : {}, u);
                if (u.length)
                    return i && o.throwOnBadSyncType ? function() {
                        throw new TypeError("Sync method requested but async result obtained")
                    }() : Promise.resolve(f(g, u)).then(p);
                if (!i && o.throwOnBadSyncType)
                    throw new TypeError("Async method requested but sync result obtained");
                return o.stringification && i ? [p(g)] : i ? p(g) : Promise.resolve(p(g))
            }
        }, {
            key: "encapsulateSync",
            value: function(e, t, n) {
                return this.encapsulate(e, t, no(no({
                    throwOnBadSyncType: !0
                }, n), {}, {
                    sync: !0
                }))
            }
        }, {
            key: "encapsulateAsync",
            value: function(e, t, n) {
                return this.encapsulate(e, t, no(no({
                    throwOnBadSyncType: !0
                }, n), {}, {
                    sync: !1
                }))
            }
        }, {
            key: "revive",
            value: function(e, t) {
                var n = this
                  , r = no(no({
                    sync: !0
                }, this.options), t)
                  , o = r.sync;
                function i(e) {
                    if (o)
                        return e;
                    if (r.throwOnBadSyncType)
                        throw new TypeError("Async method requested but sync result obtained");
                    return Promise.resolve(e)
                }
                if (!e || "object" !== ro(e) || Array.isArray(e))
                    return i(e);
                var a = e.$types;
                if (!0 === a)
                    return i(e.$);
                if (!a || "object" !== ro(a) || Array.isArray(a))
                    return i(e);
                var c = []
                  , s = {}
                  , u = !0;
                a.$ && mo(a.$) && (e = e.$,
                a = a.$,
                u = !1);
                var l = function(e, t) {
                    var r, i = co(null !== (r = n.revivers[e]) && void 0 !== r ? r : [], 1)[0];
                    if (!i)
                        throw new Error("Unregistered type: " + e);
                    if (o && !("revive"in i))
                        return t;
                    if (!o && i.reviveAsync)
                        return i.reviveAsync(t, s);
                    if (i.revive)
                        return i.revive(t, s);
                    throw new Error("Missing reviver")
                }
                  , d = [];
                function p(e) {
                    return go(e, Mo) ? void 0 : e
                }
                var f, h = function() {
                    var t = [];
                    if (!a)
                        throw new Error("Found bad `types`");
                    if (Object.entries(a).forEach((function(e) {
                        var r = co(e, 2)
                          , o = r[0]
                          , i = r[1];
                        "#" !== i && [].concat(i).forEach((function(e) {
                            var r;
                            co(null !== (r = n.revivers[e]) && void 0 !== r ? r : [null, {}], 2)[1].plain && (t.push({
                                keypath: o,
                                type: e
                            }),
                            delete a[o])
                        }
                        ))
                    }
                    )),
                    t.length)
                        return t.sort(Do).reduce((function t(n, r) {
                            var o = r.keypath
                              , i = r.type;
                            if (vo(n))
                                return n.then((function(e) {
                                    return t(e, {
                                        keypath: o,
                                        type: i
                                    })
                                }
                                ));
                            var a = So(e, o);
                            if (go(a = l(i, a), po))
                                return a.then((function(t) {
                                    var n = Eo(e, o, t);
                                    n === t && (e = n)
                                }
                                ));
                            var c = Eo(e, o, a);
                            c === a && (e = c)
                        }
                        ), void 0)
                }();
                return go(h, po) ? f = h.then((function() {
                    return e
                }
                )) : (f = function e(t, n, r, o, i) {
                    if (!u || "$types" !== t) {
                        var s = a[t]
                          , p = Po(n);
                        if (p || mo(n)) {
                            var f = p ? new Array(n.length) : {};
                            for (To(n).forEach((function(o) {
                                var i = e(t + (t ? "." : "") + ko(o), n[o], null != r ? r : f, f, o)
                                  , a = function(e) {
                                    return go(e, Mo) ? f[o] = void 0 : void 0 !== e && (f[o] = e),
                                    e
                                };
                                go(i, po) ? d.push(i.then((function(e) {
                                    return a(e)
                                }
                                ))) : a(i)
                            }
                            )),
                            n = f; c.length; ) {
                                var h = co(c[0], 4)
                                  , v = h[0]
                                  , y = h[1]
                                  , g = h[2]
                                  , m = h[3]
                                  , w = So(v, y);
                                if (void 0 === w)
                                    break;
                                g[m] = w,
                                c.splice(0, 1)
                            }
                        }
                        if (!s)
                            return n;
                        if ("#" === s) {
                            var b = So(r, n.slice(1));
                            return void 0 === b && c.push([r, n.slice(1), o, i]),
                            b
                        }
                        return [].concat(s).reduce((function e(t, n) {
                            if (go(t, po))
                                return t.then((function(t) {
                                    return e(t, n)
                                }
                                ));
                            if ("string" != typeof n)
                                throw new TypeError("Bad type JSON");
                            return l(n, t)
                        }
                        ), n)
                    }
                }("", e, null),
                d.length && (f = po.resolve(f).then((function(e) {
                    return po.all([e].concat(d))
                }
                )).then((function(e) {
                    return co(e, 1)[0]
                }
                )))),
                vo(f) ? o && r.throwOnBadSyncType ? function() {
                    throw new TypeError("Sync method requested but async result obtained")
                }() : go(f, po) ? f.p.then(p) : f : !o && r.throwOnBadSyncType ? function() {
                    throw new TypeError("Async method requested but sync result obtained")
                }() : o ? p(f) : Promise.resolve(p(f))
            }
        }, {
            key: "reviveSync",
            value: function(e, t) {
                return this.revive(e, no(no({
                    throwOnBadSyncType: !0
                }, t), {}, {
                    sync: !0
                }))
            }
        }, {
            key: "reviveAsync",
            value: function(e, t) {
                return this.revive(e, no(no({
                    throwOnBadSyncType: !0
                }, t), {}, {
                    sync: !1
                }))
            }
        }, {
            key: "register",
            value: function(e, t) {
                var n = this
                  , r = null != t ? t : {}
                  , o = function e(t) {
                    Po(t) ? t.forEach((function(t) {
                        return e(t)
                    }
                    )) : To(t).forEach((function(e) {
                        var o;
                        if ("#" === e)
                            throw new TypeError("# cannot be used as a type name as it is reserved for cyclic objects");
                        if (Bo.includes(e))
                            throw new TypeError("Plain JSON object types are reserved as type names");
                        var i = t[e]
                          , a = i && "function" != typeof i && !Array.isArray(i) && i.testPlainObjects ? n.plainObjectReplacers : n.nonplainObjectReplacers
                          , c = a.filter((function(t) {
                            return t.type === e
                        }
                        ));
                        if (c.length && (a.splice(a.indexOf(c[0]), 1),
                        delete n.revivers[e],
                        delete n.types[e]),
                        "function" == typeof i) {
                            var s = i;
                            i = {
                                test: function(e) {
                                    return e && e.constructor === s
                                },
                                replace: function(e) {
                                    return no({}, e)
                                },
                                revive: function(e) {
                                    return Object.assign(Object.create(s.prototype), e)
                                }
                            }
                        } else if (Po(i)) {
                            var u = co(i, 3);
                            i = {
                                test: u[0],
                                replace: u[1],
                                revive: u[2]
                            }
                        }
                        if (null !== (o = i) && void 0 !== o && o.test) {
                            var l = {
                                type: e,
                                test: i.test.bind(i)
                            };
                            i.replace && (l.replace = i.replace.bind(i)),
                            i.replaceAsync && (l.replaceAsync = i.replaceAsync.bind(i));
                            var d = "number" == typeof r.fallback ? r.fallback : r.fallback ? 0 : Number.POSITIVE_INFINITY;
                            if (i.testPlainObjects ? n.plainObjectReplacers.splice(d, 0, l) : n.nonplainObjectReplacers.splice(d, 0, l),
                            i.revive || i.reviveAsync) {
                                var p = {};
                                i.revive && (p.revive = i.revive.bind(i)),
                                i.reviveAsync && (p.reviveAsync = i.reviveAsync.bind(i)),
                                n.revivers[e] = [p, {
                                    plain: i.testPlainObjects
                                }]
                            }
                            n.types[e] = i
                        }
                    }
                    ))
                };
                return [].concat(e).forEach((function(e) {
                    return o(e)
                }
                )),
                this
            }
        }]),
        e
    }()
      , Mo = io((function e() {
        oo(this, e)
    }
    ));
    Mo.__typeson__type__ = "TypesonUndefined";
    for (var Bo = ["null", "boolean", "number", "string", "array", "object"], No = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", jo = new Uint8Array(256), Ro = 0; Ro < 64; Ro++)
        jo[No.codePointAt(Ro)] = Ro;
    var Go = function(e, t, n) {
        null == n && (n = e.byteLength);
        for (var r = new Uint8Array(e,0,n), o = r.length, i = "", a = 0; a < o; a += 3)
            i += No[r[a] >> 2],
            i += No[(3 & r[a]) << 4 | r[a + 1] >> 4],
            i += No[(15 & r[a + 1]) << 2 | r[a + 2] >> 6],
            i += No[63 & r[a + 2]];
        return o % 3 == 2 ? i = i.slice(0, -1) + "=" : o % 3 == 1 && (i = i.slice(0, -2) + "=="),
        i
    }
      , Vo = function(e, t) {
        var n = e.length;
        if (n % 4)
            throw new Error("Bad base64 length: not divisible by four");
        var r, o, i, a, c = .75 * e.length, s = 0;
        "=" === e[e.length - 1] && (c--,
        "=" === e[e.length - 2] && c--);
        for (var u = new ArrayBuffer(c,t), l = new Uint8Array(u), d = 0; d < n; d += 4)
            r = jo[e.codePointAt(d)],
            o = jo[e.codePointAt(d + 1)],
            i = jo[e.codePointAt(d + 2)],
            a = jo[e.codePointAt(d + 3)],
            l[s++] = r << 2 | o >> 4,
            l[s++] = (15 & o) << 4 | i >> 2,
            l[s++] = (3 & i) << 6 | 63 & a;
        return u
    }
      , Fo = {
        arraybuffer: {
            test: function(e) {
                return "ArrayBuffer" === yo(e)
            },
            replace: function(e, t) {
                t.buffers || (t.buffers = []);
                var n = t.buffers.indexOf(e);
                return n > -1 ? {
                    index: n
                } : (t.buffers.push(e),
                {
                    s: Go(e),
                    maxByteLength: e.maxByteLength,
                    resizable: e.resizable
                })
            },
            revive: function(e, t) {
                if (t.buffers || (t.buffers = []),
                Object.hasOwn(e, "index"))
                    return t.buffers[e.index];
                var n = Vo(e.s, e.resizable ? {
                    maxByteLength: e.maxByteLength
                } : void 0);
                return t.buffers.push(n),
                n
            }
        }
    }
      , Ko = {
        bigintObject: {
            test: function(e) {
                return "object" == typeof e && go(e, BigInt)
            },
            replace: String,
            revive: function(e) {
                return new Object(BigInt(e))
            }
        }
    }
      , Uo = {
        bigint: {
            test: function(e) {
                return "bigint" == typeof e
            },
            replace: String,
            revive: function(e) {
                return BigInt(e)
            }
        }
    };
    function zo(e) {
        return new Uint8Array(e).reduce((function(e, t) {
            return e + String.fromCodePoint(t)
        }
        ), "")
    }
    function Ho(e) {
        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
            t[n] = e.charCodeAt(n);
        return t.buffer
    }
    var qo = {
        blob: {
            test: function(e) {
                return "Blob" === yo(e)
            },
            replace: function(e) {
                var t = new XMLHttpRequest;
                if (t.overrideMimeType("text/plain; charset=x-user-defined"),
                t.open("GET", URL.createObjectURL(e), !1),
                t.send(),
                200 !== t.status && 0 !== t.status)
                    throw new Error("Bad Blob access: " + t.status);
                return {
                    type: e.type,
                    stringContents: t.responseText
                }
            },
            revive: function(e) {
                var t = e.type
                  , n = e.stringContents;
                return new Blob([Ho(n)],{
                    type: t
                })
            },
            replaceAsync: function(e) {
                return new po((function(t, n) {
                    var r = new FileReader;
                    r.addEventListener("load", (function() {
                        t({
                            type: e.type,
                            stringContents: zo(r.result)
                        })
                    }
                    )),
                    r.addEventListener("error", (function() {
                        n(r.error)
                    }
                    )),
                    r.readAsArrayBuffer(e)
                }
                ))
            }
        }
    };
    var Yo = {
        cryptokey: {
            test: function(e) {
                return "CryptoKey" === yo(e) && e.extractable
            },
            replaceAsync: function(e) {
                return new po((function(t, n) {
                    return Xr(void 0, void 0, void 0, (function() {
                        var r, o;
                        return $r(this, (function(i) {
                            switch (i.label) {
                            case 0:
                                return i.trys.push([0, 2, , 3]),
                                [4, crypto.subtle.exportKey("jwk", e)];
                            case 1:
                                return r = i.sent(),
                                [3, 3];
                            case 2:
                                return o = i.sent(),
                                [2, void n(o)];
                            case 3:
                                return t({
                                    jwk: r,
                                    algorithm: e.algorithm,
                                    usages: e.usages
                                }),
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ))
            },
            revive: function(e) {
                var t = e.jwk
                  , n = e.algorithm
                  , r = e.usages;
                return crypto.subtle.importKey("jwk", t, n, !0, r)
            }
        }
    }
      , Wo = {
        dataview: {
            test: function(e) {
                return "DataView" === yo(e)
            },
            replace: function(e, t) {
                var n = e.buffer
                  , r = e.byteOffset
                  , o = e.byteLength;
                t.buffers || (t.buffers = []);
                var i = t.buffers.indexOf(n);
                return i > -1 ? {
                    index: i,
                    byteOffset: r,
                    byteLength: o
                } : (t.buffers.push(n),
                {
                    encoded: Go(n),
                    maxByteLength: n.maxByteLength,
                    resizable: n.resizable,
                    byteOffset: r,
                    byteLength: o
                })
            },
            revive: function(e, t) {
                t.buffers || (t.buffers = []);
                var n, r = e.byteOffset, o = e.byteLength, i = e.encoded, a = e.index, c = e.maxByteLength, s = e.resizable;
                return "index"in e ? n = t.buffers[a] : (n = Vo(i, s ? {
                    maxByteLength: c
                } : c),
                t.buffers.push(n)),
                new DataView(n,r,o)
            }
        }
    }
      , Qo = {
        date: {
            test: function(e) {
                return "Date" === yo(e)
            },
            replace: function(e) {
                var t = e.getTime();
                return Number.isNaN(t) ? "NaN" : t
            },
            revive: function(e) {
                return "NaN" === e ? new Date(Number.NaN) : new Date(e)
            }
        }
    }
      , Jo = {
        domexception: {
            test: function(e) {
                return "DOMException" === yo(e)
            },
            replace: function(e) {
                return {
                    name: e.name,
                    message: e.message
                }
            },
            revive: function(e) {
                var t = e.message
                  , n = e.name;
                return new DOMException(t,n)
            }
        }
    }
      , Zo = {};
    function Xo(e) {
        Zo[e.name.toLowerCase()] = {
            test: function(t) {
                return yo(t) === e.name
            },
            replace: function(e) {
                return e.is2D ? {
                    a: e.a,
                    b: e.b,
                    c: e.c,
                    d: e.d,
                    e: e.e,
                    f: e.f
                } : {
                    m11: e.m11,
                    m12: e.m12,
                    m13: e.m13,
                    m14: e.m14,
                    m21: e.m21,
                    m22: e.m22,
                    m23: e.m23,
                    m24: e.m24,
                    m31: e.m31,
                    m32: e.m32,
                    m33: e.m33,
                    m34: e.m34,
                    m41: e.m41,
                    m42: e.m42,
                    m43: e.m43,
                    m44: e.m44
                }
            },
            revive: function(t) {
                return Object.hasOwn(t, "a") ? new e([t.a, t.b, t.c, t.d, t.e, t.f]) : new e([t.m11, t.m12, t.m13, t.m14, t.m21, t.m22, t.m23, t.m24, t.m31, t.m32, t.m33, t.m34, t.m41, t.m42, t.m43, t.m44])
            }
        }
    }
    "undefined" != typeof DOMMatrix && Xo(DOMMatrix),
    "undefined" != typeof DOMMatrixReadOnly && Xo(DOMMatrixReadOnly);
    var $o = {};
    function ei(e) {
        $o[e.name.toLowerCase()] = {
            test: function(t) {
                return yo(t) === e.name
            },
            replace: function(e) {
                return {
                    x: e.x,
                    y: e.y,
                    z: e.z,
                    w: e.w
                }
            },
            revive: function(t) {
                var n = t.x
                  , r = t.y
                  , o = t.z
                  , i = t.w;
                return new e(n,r,o,i)
            }
        }
    }
    "undefined" != typeof DOMPoint && ei(DOMPoint),
    "undefined" != typeof DOMPointReadOnly && ei(DOMPointReadOnly);
    var ti = {
        domquad: {
            test: function(e) {
                return "DOMQuad" === yo(e)
            },
            replace: function(e) {
                return {
                    p1: e.p1,
                    p2: e.p2,
                    p3: e.p3,
                    p4: e.p4
                }
            },
            revive: function(e) {
                var t = e.p1
                  , n = e.p2
                  , r = e.p3
                  , o = e.p4;
                return new DOMQuad(t,n,r,o)
            }
        }
    }
      , ni = {};
    function ri(e) {
        ni[e.name.toLowerCase()] = {
            test: function(t) {
                return yo(t) === e.name
            },
            replace: function(e) {
                return {
                    x: e.x,
                    y: e.y,
                    width: e.width,
                    height: e.height
                }
            },
            revive: function(t) {
                var n = t.x
                  , r = t.y
                  , o = t.width
                  , i = t.height;
                return new e(n,r,o,i)
            }
        }
    }
    "undefined" != typeof DOMRect && ri(DOMRect),
    "undefined" != typeof DOMRectReadOnly && ri(DOMRectReadOnly);
    var oi = {
        error: {
            test: function(e) {
                return "Error" === yo(e)
            },
            replace: function(e) {
                return {
                    name: e.name,
                    message: e.message,
                    cause: e.cause,
                    stack: e.stack,
                    fileName: e.fileName,
                    lineNumber: e.lineNumber,
                    columnNumber: e.columnNumber
                }
            },
            revive: function(e) {
                var t = new Error(e.message);
                return t.name = e.name,
                t.cause = e.cause,
                t.stack = e.stack,
                t.fileName = e.fileName,
                t.lineNumber = e.lineNumber,
                t.columnNumber = e.columnNumber,
                t
            }
        }
    }
      , ii = {};
    function ai(e) {
        ii[e.name.toLowerCase()] = {
            test: function(t) {
                return go(t, e)
            },
            replace: function(e) {
                return {
                    name: e.name,
                    message: e.message,
                    cause: e.cause,
                    stack: e.stack,
                    fileName: e.fileName,
                    lineNumber: e.lineNumber,
                    columnNumber: e.columnNumber,
                    errors: e.errors
                }
            },
            revive: function(t) {
                var n = "undefined" != typeof AggregateError && e === AggregateError ? new e(t.errors,t.message) : new e(t.message);
                return n.name = t.name,
                n.cause = t.cause,
                n.stack = t.stack,
                n.fileName = t.fileName,
                n.lineNumber = t.lineNumber,
                n.columnNumber = t.columnNumber,
                n
            }
        }
    }
    [TypeError, RangeError, SyntaxError, ReferenceError, EvalError, URIError].forEach((function(e) {
        return ai(e)
    }
    )),
    "undefined" != typeof AggregateError && ai(AggregateError),
    "function" == typeof InternalError && ai(InternalError);
    var ci = {
        file: {
            test: function(e) {
                return "File" === yo(e)
            },
            replace: function(e) {
                var t = new XMLHttpRequest;
                if (t.overrideMimeType("text/plain; charset=x-user-defined"),
                t.open("GET", URL.createObjectURL(e), !1),
                t.send(),
                200 !== t.status && 0 !== t.status)
                    throw new Error("Bad File access: " + t.status);
                return {
                    type: e.type,
                    stringContents: t.responseText,
                    name: e.name,
                    lastModified: e.lastModified
                }
            },
            revive: function(e) {
                var t = e.name
                  , n = e.type
                  , r = e.stringContents
                  , o = e.lastModified;
                return new File([Ho(r)],t,{
                    type: n,
                    lastModified: o
                })
            },
            replaceAsync: function(e) {
                return new po((function(t, n) {
                    var r = new FileReader;
                    r.addEventListener("load", (function() {
                        t({
                            type: e.type,
                            stringContents: zo(r.result),
                            name: e.name,
                            lastModified: e.lastModified
                        })
                    }
                    )),
                    r.addEventListener("error", (function() {
                        n(r.error)
                    }
                    )),
                    r.readAsArrayBuffer(e)
                }
                ))
            }
        }
    }
      , si = {
        file: ci.file,
        filelist: {
            test: function(e) {
                return "FileList" === yo(e)
            },
            replace: function(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t[n] = e.item(n);
                return t
            },
            revive: function(e) {
                var t = function() {
                    function e() {
                        this._files = arguments[0],
                        this.length = this._files.length
                    }
                    return e.prototype.item = function(e) {
                        return this._files[e]
                    }
                    ,
                    Object.defineProperty(e.prototype, Symbol.toStringTag, {
                        get: function() {
                            return "FileList"
                        },
                        enumerable: !1,
                        configurable: !0
                    }),
                    e
                }();
                return new t(e)
            }
        }
    }
      , ui = {
        imagebitmap: {
            test: function(e) {
                return "ImageBitmap" === yo(e) || e && e.dataset && "ImageBitmap" === e.dataset.toStringTag
            },
            replace: function(e) {
                var t = document.createElement("canvas");
                return t.getContext("2d").drawImage(e, 0, 0),
                {
                    width: e.width,
                    height: e.height,
                    dataURL: t.toDataURL()
                }
            },
            revive: function(e) {
                var t = "undefined" == typeof OffscreenCanvas ? document.createElement("canvas") : new OffscreenCanvas(e.width,e.height)
                  , n = t.getContext("2d")
                  , r = document.createElement("img");
                return r.addEventListener("load", (function() {
                    n.drawImage(r, 0, 0)
                }
                )),
                r.src = e.dataURL,
                "undefined" == typeof OffscreenCanvas ? t : t.transferToImageBitmap()
            },
            reviveAsync: function(e) {
                var t = this
                  , n = document.createElement("canvas")
                  , r = n.getContext("2d")
                  , o = document.createElement("img");
                return o.addEventListener("load", (function() {
                    r.drawImage(o, 0, 0)
                }
                )),
                o.src = e.dataURL,
                new po((function(e, r) {
                    return Xr(t, void 0, void 0, (function() {
                        var t, o;
                        return $r(this, (function(i) {
                            switch (i.label) {
                            case 0:
                                return i.trys.push([0, 2, , 3]),
                                t = e,
                                [4, createImageBitmap(n)];
                            case 1:
                                return t.apply(void 0, [i.sent()]),
                                [3, 3];
                            case 2:
                                return o = i.sent(),
                                r(o),
                                [3, 3];
                            case 3:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ))
            }
        }
    }
      , li = {
        imagedata: {
            test: function(e) {
                return "ImageData" === yo(e)
            },
            replace: function(e) {
                return {
                    array: eo([], e.data, !0),
                    width: e.width,
                    height: e.height
                }
            },
            revive: function(e) {
                return new ImageData(new Uint8ClampedArray(e.array),e.width,e.height)
            }
        }
    }
      , di = {
        infinity: {
            test: function(e) {
                return e === Number.POSITIVE_INFINITY
            },
            replace: function() {
                return "Infinity"
            },
            revive: function() {
                return Number.POSITIVE_INFINITY
            }
        }
    }
      , pi = {
        test: function(e) {
            return go(e, Intl.Collator)
        },
        replace: function(e) {
            return e.resolvedOptions()
        },
        revive: function(e) {
            return new Intl.Collator(e.locale,e)
        }
    }
      , fi = {
        IntlCollator: pi,
        IntlDateTimeFormat: {
            test: function(e) {
                return go(e, Intl.DateTimeFormat)
            },
            replace: function(e) {
                return e.resolvedOptions()
            },
            revive: function(e) {
                return new Intl.DateTimeFormat(e.locale,e)
            }
        },
        IntlNumberFormat: {
            test: function(e) {
                return go(e, Intl.NumberFormat)
            },
            replace: function(e) {
                return e.resolvedOptions()
            },
            revive: function(e) {
                return new Intl.NumberFormat(e.locale,e)
            }
        }
    }
      , hi = {
        map: {
            test: function(e) {
                return "Map" === yo(e)
            },
            replace: function(e) {
                return eo([], e.entries(), !0)
            },
            revive: function(e) {
                return new Map(e)
            }
        }
    }
      , vi = {
        nan: {
            test: function(e) {
                return Number.isNaN(e)
            },
            replace: function() {
                return "NaN"
            },
            revive: function() {
                return Number.NaN
            }
        }
    }
      , yi = {
        negativeInfinity: {
            test: function(e) {
                return e === Number.NEGATIVE_INFINITY
            },
            replace: function() {
                return "-Infinity"
            },
            revive: function() {
                return Number.NEGATIVE_INFINITY
            }
        }
    }
      , gi = {
        negativeZero: {
            test: function(e) {
                return Object.is(e, -0)
            },
            replace: function() {
                return 0
            },
            revive: function() {
                return -0
            }
        }
    }
      , mi = {
        StringObject: {
            test: function(e) {
                return "String" === yo(e) && "object" == typeof e
            },
            replace: String,
            revive: function(e) {
                return new String(e)
            }
        },
        BooleanObject: {
            test: function(e) {
                return "Boolean" === yo(e) && "object" == typeof e
            },
            replace: function(e) {
                return e.valueOf()
            },
            revive: function(e) {
                return new Boolean(e)
            }
        },
        NumberObject: {
            test: function(e) {
                return "Number" === yo(e) && "object" == typeof e
            },
            replace: Number,
            revive: function(e) {
                return new Number(e)
            }
        }
    }
      , wi = {
        regexp: {
            test: function(e) {
                return "RegExp" === yo(e)
            },
            replace: function(e) {
                return {
                    source: e.source,
                    flags: (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "")
                }
            },
            revive: function(e) {
                var t = e.source
                  , n = e.flags;
                return new RegExp(t,n)
            }
        }
    }
      , bi = {
        set: {
            test: function(e) {
                return "Set" === yo(e)
            },
            replace: function(e) {
                return eo([], e.values(), !0)
            },
            revive: function(e) {
                return new Set(e)
            }
        }
    }
      , ki = {};
    "function" == typeof Int8Array && eo([Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], "function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [], !0).forEach((function(e) {
        return function(e) {
            var t = e.name;
            ki[t.toLowerCase()] = {
                test: function(e) {
                    return yo(e) === t
                },
                replace: function(e) {
                    return (0 === e.byteOffset && e.byteLength === e.buffer.byteLength ? e : e.slice(0)).buffer
                },
                revive: function(t) {
                    return "ArrayBuffer" === yo(t) ? new e(t) : t
                }
            }
        }(e)
    }
    ));
    var Ai = {};
    "function" == typeof Int8Array && eo([Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], "function" == typeof BigInt64Array ? [BigInt64Array, BigUint64Array] : [], !0).forEach((function(e) {
        return function(e) {
            var t = e.name;
            Ai[t.toLowerCase()] = {
                test: function(e) {
                    return yo(e) === t
                },
                replace: function(e, t) {
                    var n = e.buffer
                      , r = e.byteOffset
                      , o = e.length;
                    t.buffers || (t.buffers = []);
                    var i = t.buffers.indexOf(n);
                    return i > -1 ? {
                        index: i,
                        byteOffset: r,
                        length: o
                    } : (t.buffers.push(n),
                    {
                        maxByteLength: n.maxByteLength,
                        resizable: n.resizable,
                        encoded: Go(n),
                        byteOffset: r,
                        length: o
                    })
                },
                revive: function(t, n) {
                    n.buffers || (n.buffers = []);
                    var r, o = t.byteOffset, i = t.length, a = t.encoded, c = t.index, s = t.maxByteLength, u = t.resizable;
                    return "index"in t ? r = n.buffers[c] : (r = Vo(a, u ? {
                        maxByteLength: s
                    } : void 0),
                    n.buffers.push(r)),
                    new e(r,o,i)
                }
            }
        }(e)
    }
    ));
    var Si = {
        undef: {
            test: function(e, t) {
                return void 0 === e && (t.ownKeys || !("ownKeys"in t))
            },
            replace: function() {
                return 0
            },
            revive: function() {
                return new Mo
            }
        }
    }
      , Ei = {
        userObject: {
            test: function(e) {
                return wo(e)
            },
            replace: function(e) {
                return Zr({}, e)
            },
            revive: function(e) {
                return e
            }
        }
    }
      , Ii = [{
        arrayNonindexKeys: {
            testPlainObjects: !0,
            test: function(e, t) {
                return !!Array.isArray(e) && (Object.keys(e).some((function(e) {
                    return String(Number.parseInt(e)) !== e
                }
                )) && (t.iterateIn = "object",
                t.addLength = !0),
                !0)
            },
            replace: function(e, t) {
                return t.iterateUnsetNumeric = !0,
                e
            },
            revive: function(e) {
                if (Array.isArray(e))
                    return e;
                var t = [];
                return Object.entries(e).forEach((function(e) {
                    var n = e[0]
                      , r = e[1];
                    t[n] = r
                }
                )),
                t
            }
        }
    }, {
        sparseUndefined: {
            test: function(e, t) {
                return void 0 === e && !1 === t.ownKeys
            },
            replace: function() {
                return 0
            },
            revive: function() {}
        }
    }]
      , xi = [vi, di, yi, gi]
      , Ti = ([Si, Ii, mi, xi, Qo, oi, ii, wi].concat("function" == typeof Map ? hi : [], "function" == typeof Set ? bi : [], "function" == typeof ArrayBuffer ? Fo : [], "function" == typeof Uint8Array ? Ai : [], "function" == typeof DataView ? Wo : [], "undefined" != typeof Intl ? fi : [], "undefined" != typeof BigInt ? [Uo, Ko] : []),
    [Ei, Si, Ii, mi, xi, Qo, wi, li, ui, ci, si, qo, oi, ii].concat("function" == typeof Map ? hi : [], "function" == typeof Set ? bi : [], "function" == typeof ArrayBuffer ? Fo : [], "function" == typeof Uint8Array ? Ai : [], "function" == typeof DataView ? Wo : [], "undefined" != typeof crypto ? Yo : [], "undefined" != typeof BigInt ? [Uo, Ko] : [], "undefined" != typeof DOMException ? Jo : [], "undefined" != typeof DOMRect ? ni : [], "undefined" != typeof DOMPoint ? $o : [], "undefined" != typeof DOMQuad ? ti : [], "undefined" != typeof DOMMatrix ? Zo : []));
    Ti.concat({
        checkDataCloneException: {
            test: function(e) {
                var t = {}.toString.call(e).slice(8, -1);
                if (["symbol", "function"].includes(typeof e) || ["Arguments", "Module", "Promise", "WeakMap", "WeakSet", "Event", "MessageChannel"].includes(t) || e && "object" == typeof e && "number" == typeof e.nodeType && "function" == typeof e.insertBefore)
                    throw new DOMException("The object cannot be cloned.","DataCloneError");
                return !1
            }
        }
    });
    function _i(e, t, n) {
        var r, o;
        return void 0 === t && (t = 300),
        void 0 === n && (n = 1e3),
        function() {
            for (var i = [], a = 0; a < arguments.length; a++)
                i[a] = arguments[a];
            var c = this
              , s = function() {
                clearTimeout(r),
                clearTimeout(o),
                r = void 0,
                o = void 0,
                e.apply(c, i)
            };
            clearTimeout(r),
            r = setTimeout(s, t),
            o || (o = setTimeout(s, n))
        }
    }
    function Pi(e, t, n, r, o, i) {
        return Mi(function(e, t) {
            return e << t | e >>> 32 - t
        }(Mi(Mi(t, e), Mi(r, i)), o), n)
    }
    function Oi(e, t, n, r, o, i, a) {
        return Pi(t & n | ~t & r, e, t, o, i, a)
    }
    function Ci(e, t, n, r, o, i, a) {
        return Pi(t & r | n & ~r, e, t, o, i, a)
    }
    function Di(e, t, n, r, o, i, a) {
        return Pi(t ^ n ^ r, e, t, o, i, a)
    }
    function Li(e, t, n, r, o, i, a) {
        return Pi(n ^ (t | ~r), e, t, o, i, a)
    }
    function Mi(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
    }
    var Bi, Ni = "";
    try {
        var ji = window.location.href.split("?")[0].replace(/\/[^/]*$/, "");
        Ni = function(e) {
            var t = function(e) {
                for (var t, n = "0123456789ABCDEF", r = "", o = 0; o < e.length; o++)
                    t = e.charCodeAt(o),
                    r += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
                return r
            }(function(e) {
                for (var t = "", n = 0; n < 32 * e.length; n += 8)
                    t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
                return t
            }(function(e, t) {
                e[t >> 5] |= 128 << t % 32,
                e[14 + (t + 64 >>> 9 << 4)] = t;
                for (var n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, a = 0; a < e.length; a += 16) {
                    var c = n
                      , s = r
                      , u = o
                      , l = i;
                    r = Li(r = Li(r = Li(r = Li(r = Di(r = Di(r = Di(r = Di(r = Ci(r = Ci(r = Ci(r = Ci(r = Oi(r = Oi(r = Oi(r = Oi(r, o = Oi(o, i = Oi(i, n = Oi(n, r, o, i, e[a + 0], 7, -680876936), r, o, e[a + 1], 12, -389564586), n, r, e[a + 2], 17, 606105819), i, n, e[a + 3], 22, -1044525330), o = Oi(o, i = Oi(i, n = Oi(n, r, o, i, e[a + 4], 7, -176418897), r, o, e[a + 5], 12, 1200080426), n, r, e[a + 6], 17, -1473231341), i, n, e[a + 7], 22, -45705983), o = Oi(o, i = Oi(i, n = Oi(n, r, o, i, e[a + 8], 7, 1770035416), r, o, e[a + 9], 12, -1958414417), n, r, e[a + 10], 17, -42063), i, n, e[a + 11], 22, -1990404162), o = Oi(o, i = Oi(i, n = Oi(n, r, o, i, e[a + 12], 7, 1804603682), r, o, e[a + 13], 12, -40341101), n, r, e[a + 14], 17, -1502002290), i, n, e[a + 15], 22, 1236535329), o = Ci(o, i = Ci(i, n = Ci(n, r, o, i, e[a + 1], 5, -165796510), r, o, e[a + 6], 9, -1069501632), n, r, e[a + 11], 14, 643717713), i, n, e[a + 0], 20, -373897302), o = Ci(o, i = Ci(i, n = Ci(n, r, o, i, e[a + 5], 5, -701558691), r, o, e[a + 10], 9, 38016083), n, r, e[a + 15], 14, -660478335), i, n, e[a + 4], 20, -405537848), o = Ci(o, i = Ci(i, n = Ci(n, r, o, i, e[a + 9], 5, 568446438), r, o, e[a + 14], 9, -1019803690), n, r, e[a + 3], 14, -187363961), i, n, e[a + 8], 20, 1163531501), o = Ci(o, i = Ci(i, n = Ci(n, r, o, i, e[a + 13], 5, -1444681467), r, o, e[a + 2], 9, -51403784), n, r, e[a + 7], 14, 1735328473), i, n, e[a + 12], 20, -1926607734), o = Di(o, i = Di(i, n = Di(n, r, o, i, e[a + 5], 4, -378558), r, o, e[a + 8], 11, -2022574463), n, r, e[a + 11], 16, 1839030562), i, n, e[a + 14], 23, -35309556), o = Di(o, i = Di(i, n = Di(n, r, o, i, e[a + 1], 4, -1530992060), r, o, e[a + 4], 11, 1272893353), n, r, e[a + 7], 16, -155497632), i, n, e[a + 10], 23, -1094730640), o = Di(o, i = Di(i, n = Di(n, r, o, i, e[a + 13], 4, 681279174), r, o, e[a + 0], 11, -358537222), n, r, e[a + 3], 16, -722521979), i, n, e[a + 6], 23, 76029189), o = Di(o, i = Di(i, n = Di(n, r, o, i, e[a + 9], 4, -640364487), r, o, e[a + 12], 11, -421815835), n, r, e[a + 15], 16, 530742520), i, n, e[a + 2], 23, -995338651), o = Li(o, i = Li(i, n = Li(n, r, o, i, e[a + 0], 6, -198630844), r, o, e[a + 7], 10, 1126891415), n, r, e[a + 14], 15, -1416354905), i, n, e[a + 5], 21, -57434055), o = Li(o, i = Li(i, n = Li(n, r, o, i, e[a + 12], 6, 1700485571), r, o, e[a + 3], 10, -1894986606), n, r, e[a + 10], 15, -1051523), i, n, e[a + 1], 21, -2054922799), o = Li(o, i = Li(i, n = Li(n, r, o, i, e[a + 8], 6, 1873313359), r, o, e[a + 15], 10, -30611744), n, r, e[a + 6], 15, -1560198380), i, n, e[a + 13], 21, 1309151649), o = Li(o, i = Li(i, n = Li(n, r, o, i, e[a + 4], 6, -145523070), r, o, e[a + 11], 10, -1120210379), n, r, e[a + 2], 15, 718787259), i, n, e[a + 9], 21, -343485551),
                    n = Mi(n, c),
                    r = Mi(r, s),
                    o = Mi(o, u),
                    i = Mi(i, l)
                }
                return Array(n, r, o, i)
            }(function(e) {
                for (var t = Array(e.length >> 2), n = 0; n < t.length; n++)
                    t[n] = 0;
                for (n = 0; n < 8 * e.length; n += 8)
                    t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
                return t
            }(e), 8 * e.length)));
            return t.toLowerCase()
        }(ji),
        Bi = localStorage.getItem("savegame_idbfs_hash")
    } catch (w) {}
    function Ri(e) {
        if (!Bi)
            return e;
        try {
            return e.replace(Ni, Bi)
        } catch (t) {
            return e
        }
    }
    var Gi = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Vi = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , Fi = []
      , Ki = Date.now();
    function Ui() {
        return Gi(this, void 0, void 0, (function() {
            var e, t, n, r = this;
            return Vi(this, (function(o) {
                switch (o.label) {
                case 0:
                    return "databases"in indexedDB ? [4, indexedDB.databases()] : (console.warn("%cPOKI_SAVEGAME:%c indexedDB.databases() is not supported in this browser.", "font-weight: bold", ""),
                    [2, []]);
                case 1:
                    return 0 === (e = o.sent()).length && (console.info("%cPOKI_SAVEGAME:%c No databases found, using IDBDatabaseInfos", "font-weight: bold", "", Fi.map((function(e) {
                        return e.name
                    }
                    ))),
                    e.push.apply(e, Fi)),
                    t = [],
                    e.forEach((function(e) {
                        return Gi(r, void 0, void 0, (function() {
                            return Vi(this, (function(n) {
                                return (r = e.name) && "UnityCache" !== r ? (t.push(function(e, t) {
                                    return new Promise((function(n, r) {
                                        if (e) {
                                            var o = indexedDB.open(e, t);
                                            o.onsuccess = function(t) {
                                                var r = t.target.result
                                                  , o = Array.from(r.objectStoreNames)
                                                  , i = {
                                                    name: e,
                                                    version: r.version,
                                                    objectStores: []
                                                }
                                                  , a = o.length;
                                                if (0 === a)
                                                    return r.close(),
                                                    void n(i);
                                                o.forEach((function(t) {
                                                    var o = r.transaction(t, "readonly").objectStore(t)
                                                      , c = Array.from(o.indexNames)
                                                      , s = []
                                                      , u = {
                                                        name: t,
                                                        keyPath: o.keyPath,
                                                        autoIncrement: o.autoIncrement,
                                                        indexes: [],
                                                        data: []
                                                    };
                                                    c.forEach((function(e) {
                                                        var t = o.index(e)
                                                          , n = {
                                                            name: e,
                                                            keyPath: t.keyPath,
                                                            unique: t.unique,
                                                            multiEntry: t.multiEntry
                                                        };
                                                        u.indexes.push(n)
                                                    }
                                                    ));
                                                    var l = o.openCursor();
                                                    l.onerror = function() {
                                                        console.warn("%cPOKI_SAVEGAME:%c error fetching data from object store ".concat(t), "font-weight: bold", ""),
                                                        0 == --a && (r.close(),
                                                        n(i))
                                                    }
                                                    ,
                                                    l.onsuccess = function(o) {
                                                        var c = o.target;
                                                        if (c) {
                                                            var l = c.result;
                                                            if (null === l)
                                                                return u.data = s,
                                                                i.objectStores.push(u),
                                                                void (0 == --a && (r.close(),
                                                                n(i)));
                                                            !function(e, t, n) {
                                                                return "string" == typeof n && !("/data" !== e || "FILE_DATA" !== t || !n.endsWith(".zip") && !n.includes("liveupdate.arc"))
                                                            }(e, t, l.primaryKey) ? s.push({
                                                                k: Ri(l.primaryKey),
                                                                v: l.value
                                                            }) : console.info("%cPOKI_SAVEGAME:%c Skipping row ".concat(l.primaryKey), "font-weight: bold", ""),
                                                            l.continue()
                                                        }
                                                    }
                                                }
                                                ))
                                            }
                                            ,
                                            o.onerror = function(e) {
                                                console.warn("%cPOKI_SAVEGAME:%c error opening database", "font-weight: bold", "", e.target.error),
                                                r(e.target.error)
                                            }
                                        } else
                                            r(new Error("Cannot export database without a name"))
                                    }
                                    ))
                                }(e.name || "", e.version)),
                                [2]) : [2];
                                var r
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    [4, Promise.allSettled(t)];
                case 2:
                    return [2, null == (n = o.sent()) ? void 0 : n.map((function(e) {
                        return "fulfilled" === e.status ? e.value : null
                    }
                    ))]
                }
            }
            ))
        }
        ))
    }
    var zi = function(e, t, n, r) {
        return new (n || (n = Promise))((function(o, i) {
            function a(e) {
                try {
                    s(r.next(e))
                } catch (e) {
                    i(e)
                }
            }
            function c(e) {
                try {
                    s(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }
            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value,
                t instanceof n ? t : new n((function(e) {
                    e(t)
                }
                ))).then(a, c)
            }
            s((r = r.apply(e, t || [])).next())
        }
        ))
    }
      , Hi = function(e, t) {
        var n, r, o, i = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        }, a = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a.next = c(0),
        a.throw = c(1),
        a.return = c(2),
        "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }
        ),
        a;
        function c(c) {
            return function(s) {
                return function(c) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; a && (a = 0,
                    c[0] && (i = 0)),
                    i; )
                        try {
                            if (n = 1,
                            r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r),
                            0) : r.next) && !(o = o.call(r, c[1])).done)
                                return o;
                            switch (r = 0,
                            o && (c = [2 & c[0], o.value]),
                            c[0]) {
                            case 0:
                            case 1:
                                o = c;
                                break;
                            case 4:
                                return i.label++,
                                {
                                    value: c[1],
                                    done: !1
                                };
                            case 5:
                                i.label++,
                                r = c[1],
                                c = [0];
                                continue;
                            case 7:
                                c = i.ops.pop(),
                                i.trys.pop();
                                continue;
                            default:
                                if (!(o = i.trys,
                                (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                    i = 0;
                                    continue
                                }
                                if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                    i.label = c[1];
                                    break
                                }
                                if (6 === c[0] && i.label < o[1]) {
                                    i.label = o[1],
                                    o = c;
                                    break
                                }
                                if (o && i.label < o[2]) {
                                    i.label = o[2],
                                    i.ops.push(c);
                                    break
                                }
                                o[2] && i.ops.pop(),
                                i.trys.pop();
                                continue
                            }
                            c = t.call(e, i)
                        } catch (e) {
                            c = [6, e],
                            r = 0
                        } finally {
                            n = o = 0
                        }
                    if (5 & c[0])
                        throw c[1];
                    return {
                        value: c[0] ? c[1] : void 0,
                        done: !0
                    }
                }([c, s])
            }
        }
    }
      , qi = function(e, t, n) {
        if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)),
                r[o] = t[o]);
        return e.concat(r || Array.prototype.slice.call(t))
    }
      , Yi = "none"
      , Wi = "requesting"
      , Qi = function() {
        function t() {
            var t = this;
            this.callbacks = {},
            this.adTiming = Kr.adTiming,
            this.mutationChecker = new MutationObserver(this.mutationObserved.bind(this)),
            this.videoState = Yi,
            this.adTimings = new Wr({
                fake: !0
            }),
            this.initializing = !1,
            this.init = function(e) {
                if (!t.initializing) {
                    t.initializing = !0;
                    var n = e.onReady
                      , r = void 0 === n ? null : n;
                    Jr(),
                    I.cloudSaveGames && function() {
                        var e = this;
                        console.info("%cPOKI_SAVEGAME:%c setupCloudSaveExports", "font-weight: bold", "");
                        var t = (new Lo).register([Ti])
                          , n = function() {
                            var e = Date.now()
                              , n = Math.ceil((e - Ki) / 1e3);
                            Ki = e;
                            try {
                                var r = {};
                                Object.keys(localStorage).forEach((function(e) {
                                    var t = localStorage.getItem(e);
                                    null !== t && (r[e] = t)
                                }
                                )),
                                Ui().then((function(e) {
                                    var o, i = {
                                        ls: JSON.stringify(r),
                                        idb: t.stringify(e),
                                        playtimeInterval: n
                                    };
                                    console.info("%cPOKI_SAVEGAME:%c Sending export", "font-weight: bold", "", i),
                                    null === (o = null === window || void 0 === window ? void 0 : window.top) || void 0 === o || o.postMessage({
                                        type: "mutateSaveGame",
                                        content: i
                                    }, "*")
                                }
                                ))
                            } catch (e) {
                                console.warn("%cPOKI_SAVEGAME:%c savegame error", "font-weight: bold", "", e)
                            }
                        };
                        function r(e, t) {
                            var n = {
                                name: e,
                                version: t
                            };
                            Fi.find((function(n) {
                                return n.name === e && n.version === t
                            }
                            )) || Fi.push(n)
                        }
                        var o = "(".concat(function() {
                            window.addEventListener("storage", (function() {
                                var e;
                                null === (e = null === window || void 0 === window ? void 0 : window.parent) || void 0 === e || e.postMessage({
                                    type: "LocalStorageChanged"
                                }, "*")
                            }
                            ))
                        }
                        .toString(), ")();");
                        Qr(o);
                        var i = _i((function() {
                            console.info("%cPOKI_SAVEGAME:%c Local Storage changed", "font-weight: bold", ""),
                            n()
                        }
                        ), 5e3, 15e3);
                        window.addEventListener("message", (function(t) {
                            return Gi(e, void 0, void 0, (function() {
                                var e;
                                return Vi(this, (function(n) {
                                    return "LocalStorageChanged" === (null === (e = null == t ? void 0 : t.data) || void 0 === e ? void 0 : e.type) && i(),
                                    [2]
                                }
                                ))
                            }
                            ))
                        }
                        ));
                        var a = _i((function() {
                            console.info("%cPOKI_SAVEGAME:%c IDB Pulse", "font-weight: bold", ""),
                            n()
                        }
                        ), 5e3, 15e3)
                          , c = window.IDBObjectStore.prototype.put;
                        window.IDBObjectStore.prototype.put = function() {
                            for (var e = [], t = 0; t < arguments.length; t++)
                                e[t] = arguments[t];
                            r(this.transaction.db.name, this.transaction.db.version);
                            var n = c.apply(this, e);
                            return console.info("%cPOKI_SAVEGAME:%c IDB Put", "font-weight: bold", "", e),
                            a(),
                            n
                        }
                        ;
                        var s = window.IDBObjectStore.prototype.add;
                        window.IDBObjectStore.prototype.add = function() {
                            for (var e = [], t = 0; t < arguments.length; t++)
                                e[t] = arguments[t];
                            r(this.transaction.db.name, this.transaction.db.version);
                            var n = s.apply(this, e);
                            return console.info("%cPOKI_SAVEGAME:%c IDB add", "font-weight: bold", "", e),
                            a(),
                            n
                        }
                        ;
                        var u = window.IDBObjectStore.prototype.delete;
                        window.IDBObjectStore.prototype.delete = function() {
                            for (var e = [], t = 0; t < arguments.length; t++)
                                e[t] = arguments[t];
                            r(this.transaction.db.name, this.transaction.db.version);
                            var n = u.apply(this, e);
                            return console.info("%cPOKI_SAVEGAME:%c IDB delete", "font-weight: bold", "", e),
                            a(),
                            n
                        }
                        ;
                        var l = window.IDBObjectStore.prototype.clear;
                        window.IDBObjectStore.prototype.clear = function() {
                            for (var e = [], t = 0; t < arguments.length; t++)
                                e[t] = arguments[t];
                            r(this.transaction.db.name, this.transaction.db.version);
                            var n = l.apply(this, e);
                            return console.info("%cPOKI_SAVEGAME:%c IDB clear", "font-weight: bold", "", e),
                            a(),
                            n
                        }
                    }(),
                    I.kioskMode && document.addEventListener("keydown", (function(e) {
                        "Escape" === e.key && t.postSDKMessage("keydownEscape")
                    }
                    ));
                    var o = function() {
                        var e, n = 1;
                        t.callbacks.playgroundInit = function() {
                            clearTimeout(e),
                            null == r || r()
                        }
                        ;
                        var o = function() {
                            t.postSDKMessage("adTiming", {
                                adTiming: t.adTiming,
                                specialConditions: t.specialConditions
                            }),
                            n++,
                            e = setTimeout(o, 100 * n)
                        };
                        e = setTimeout(o, 100 * n)
                    };
                    if (I.forceAd)
                        return t.adTiming = {
                            preroll: !0,
                            timeBetweenAds: 12e4,
                            timePerTry: 7e3,
                            startAdsAfter: 0
                        },
                        void o();
                    if (_.debug)
                        o();
                    else
                        0,
                        qr().then((function(e) {
                            if (t.adTiming = (null == e ? void 0 : e.adTiming) || Kr.adTiming,
                            t.specialConditions = (null == e ? void 0 : e.specialConditions) || [],
                            y() || g() ? t.adTiming = {
                                startAdsAfter: 36e4,
                                timeBetweenAds: 36e4
                            } : t.adTiming = {
                                startAdsAfter: 12e4,
                                timeBetweenAds: 18e4
                            },
                            o(),
                            e)
                                try {
                                    or(e)
                                } catch (e) {
                                    console.warn("%cPOKI:%c error in maybeStartPlaytest", "font-weight: bold", "", e)
                                }
                        }
                        )).catch((function() {
                            o()
                        }
                        ))
                }
            }
            ,
            this.isAdBlocked = function() {
                return !1
            }
            ,
            this.postSDKMessage = function(n) {
                for (var r = [], o = 1; o < arguments.length; o++)
                    r[o - 1] = arguments[o];
                return zi(t, qi([n], r, !0), void 0, (function(t, n) {
                    return void 0 === n && (n = {}),
                    Hi(this, (function(r) {
                        return x.sendMessage(e.message.sendCommand, {
                            event: t,
                            data: n
                        }, window.top),
                        [2]
                    }
                    ))
                }
                ))
            }
            ,
            this.handleMessageReceived = function(n) {
                var r, o, i, a, c, s, u, l, d, p, f, h;
                switch (null === (r = null == n ? void 0 : n.data) || void 0 === r ? void 0 : r.type) {
                case "hoist_displayAd_onDisplayRendered":
                    if (S = null === (o = null == n ? void 0 : n.data) || void 0 === o ? void 0 : o.data) {
                        var v = S.opportunityId
                          , y = S.isEmpty;
                        null === (a = null === (i = t.callbacks[v]) || void 0 === i ? void 0 : i.onDisplayRendered) || void 0 === a || a.call(i, y)
                    }
                    break;
                case "hoist_displayAd_onCanDestroy":
                    if (S = null === (c = null == n ? void 0 : n.data) || void 0 === c ? void 0 : c.data) {
                        v = S.opportunityId;
                        null === (u = null === (s = t.callbacks[v]) || void 0 === s ? void 0 : s.onCanDestroy) || void 0 === u || u.call(s)
                    }
                    break;
                case "hoist_videoAd_onStart":
                    if (S = null === (l = null == n ? void 0 : n.data) || void 0 === l ? void 0 : l.data) {
                        v = S.opportunityId;
                        if (t.videoState !== Wi)
                            return;
                        if (!t.callbacks[v])
                            return;
                        var g = t.callbacks[v]
                          , m = g.onStart
                          , w = g.position;
                        m && m(),
                        L.dispatchEvent(e.playtest.startVideo, {
                            position: w
                        }),
                        t.videoState = "playing"
                    }
                    break;
                case "hoist_videoAd_onFinish":
                    if (S = null === (d = null == n ? void 0 : n.data) || void 0 === d ? void 0 : d.data) {
                        v = S.opportunityId;
                        var b = S.rewardAllowed;
                        if (!t.callbacks[v])
                            return;
                        var k = t.callbacks[v]
                          , A = k.onFinish;
                        w = k.position;
                        if (t.videoState === Wi) {
                            if (A)
                                try {
                                    w === e.ads.position.rewarded ? A(!!b) : A()
                                } catch (e) {
                                    console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                                }
                            return t.videoState = Yi,
                            void delete t.callbacks[v]
                        }
                        if (A)
                            try {
                                A(b)
                            } catch (e) {
                                console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                            }
                        L.dispatchEvent(e.playtest.stopVideo),
                        t.videoState = Yi,
                        delete t.callbacks[v]
                    }
                    break;
                case "hoist_playgroundInit":
                    null === (f = (p = t.callbacks).playgroundInit) || void 0 === f || f.call(p),
                    delete t.callbacks.playgroundInit;
                    break;
                case "hoist_displayAd_destroy":
                    var S;
                    if (S = null === (h = null == n ? void 0 : n.data) || void 0 === h ? void 0 : h.data) {
                        var E = S.containerID;
                        t.cleanAdContainer(E)
                    }
                    break;
                case "hoist_refocus_game":
                    var I = new Event("focus");
                    window.dispatchEvent(I)
                }
            }
            ,
            this.cleanAdContainer = function(e) {
                var t = document.querySelector('*[data-poki-ad-container-id="'.concat(e, '"]'));
                if (t) {
                    for (; t.lastChild; )
                        t.removeChild(t.lastChild);
                    t.removeAttribute("data-poki-opportunity-id"),
                    t.removeAttribute("data-poki-ad-container-id")
                }
            }
        }
        return t.prototype.forcePreroll = function() {
            this.postSDKMessage("forcePreroll")
        }
        ,
        t.prototype.startStartAdsAfterTimer = function() {
            this.postSDKMessage("startStartAdsAfterTimer")
        }
        ,
        t.prototype.muteAd = function() {
            this.postSDKMessage("muteAd")
        }
        ,
        t.prototype.setVolume = function(e) {
            this.postSDKMessage("setVolume", {
                volume: e || 1
            })
        }
        ,
        t.prototype.requestAd = function(t) {
            var n = t.onStart
              , r = t.onFinish
              , o = t.position
              , i = t.customCriteria
              , a = hr();
            if (this.videoState === Yi)
                this.videoState = Wi,
                this.callbacks[a] = {
                    position: o,
                    onStart: function() {
                        if (n && "function" == typeof n)
                            try {
                                n()
                            } catch (e) {
                                console.error("%cPOKI:%c error in onStart callback", "font-weight: bold", "", e)
                            }
                    },
                    onFinish: function(e) {
                        if (r && "function" == typeof r)
                            try {
                                r({
                                    rewardAllowed: e
                                })
                            } catch (e) {
                                console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                            }
                    }
                },
                this.postSDKMessage("requestVideoAd", {
                    position: o,
                    customCriteria: i,
                    opportunityId: a
                });
            else if (r)
                try {
                    o === e.ads.position.rewarded ? r({
                        rewardAllowed: !1
                    }) : r()
                } catch (e) {
                    console.error("%cPOKI:%c error in onFinish callback", "font-weight: bold", "", e)
                }
        }
        ,
        t.prototype.displayAd = function(e) {
            if (I.kioskMode)
                return !1;
            var t = e.container
              , n = e.size
              , r = e.opportunityId
              , o = e.onCanDestroy
              , i = e.onDisplayRendered;
            if (!t)
                return console.error("%cPOKI:%c PokiSDK.displayAd() given container does not exist", "font-weight: bold", ""),
                !1;
            var a = t.getAttribute("data-poki-ad-container-id") || hr();
            this.cleanAdContainer(a),
            t.setAttribute("data-poki-ad-container-id", a),
            t.setAttribute("data-poki-opportunity-id", r);
            var c = n.split("x").map((function(e) {
                return parseInt(e, 10)
            }
            ))
              , s = c[0]
              , u = c[1]
              , l = document.createElement("div");
            l.style.width = "".concat(s, "px"),
            l.style.height = "".concat(u, "px"),
            l.style.overflow = "hidden",
            l.style.position = "relative",
            l.style.pointerEvents = "none",
            t.appendChild(l);
            var d = t.getBoundingClientRect()
              , p = {
                x: (null == d ? void 0 : d.x) || 0,
                y: (null == d ? void 0 : d.y) || 0,
                w: s || 0,
                h: u || 0
            };
            return this.callbacks[r] = {
                onCanDestroy: function() {
                    o && "function" == typeof o && o()
                },
                onDisplayRendered: function(e) {
                    i && "function" == typeof i && i(e)
                }
            },
            this.mutationChecker.observe(t.parentElement || document.body, {
                childList: !0
            }),
            this.mutationChecker.observe(t, {
                attributes: !0,
                attributeFilter: ["style"]
            }),
            this.postSDKMessage("displayAd", {
                containerID: a,
                adUnitPath: Ur(n),
                size: e.size,
                opportunityId: r,
                duringGameplay: e.duringGameplay,
                location: p
            }),
            !0
        }
        ,
        t.prototype.destroyAd = function(e) {
            if (e) {
                var t = e.getAttribute("data-poki-opportunity-id")
                  , n = e.getAttribute("data-poki-ad-container-id");
                n && (delete this.callbacks[t],
                this.cleanAdContainer(n),
                this.postSDKMessage("destroyAd", {
                    containerID: n,
                    opportunityId: t
                }))
            } else
                console.error("%cPOKI:%c PokiSDK.destroyAd() given container does not exist", "font-weight: bold", "")
        }
        ,
        t.prototype.mutationObserved = function(e) {
            var t = this;
            e.forEach((function(e) {
                var n, r, o, i, a;
                "childList" === (null == e ? void 0 : e.type) && (null === (r = null === (n = e.removedNodes) || void 0 === n ? void 0 : n.forEach) || void 0 === r || r.call(n, (function(e) {
                    var n;
                    (null === (n = null == e ? void 0 : e.getAttribute) || void 0 === n ? void 0 : n.call(e, "data-poki-ad-container-id")) && t.destroyAd(e)
                }
                ))),
                "attributes" === (null == e ? void 0 : e.type) && (null === (i = null === (o = null == e ? void 0 : e.target) || void 0 === o ? void 0 : o.getAttribute) || void 0 === i ? void 0 : i.call(o, "data-poki-ad-container-id")) && ("none" === (null == (a = e.target) ? void 0 : a.style.display) || parseInt(a.style.opacity, 10) < 1 || "hidden" === a.style.visibility) && t.destroyAd(e.target)
            }
            ))
        }
        ,
        t.prototype.stopVideoAd = function() {}
        ,
        t.prototype.resizeVideoAd = function() {}
        ,
        t.prototype.setAdTimings = function(e) {}
        ,
        t.prototype.setSpecialConditions = function(e) {}
        ,
        t.prototype.setNrAds = function(e) {}
        ,
        t
    }();
    const Ji = Qi;
    var Zi, Xi = (Zi = function(e, t) {
        return Zi = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        ,
        Zi(e, t)
    }
    ,
    function(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function n() {
            this.constructor = e
        }
        Zi(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), $i = function(e) {
        function t() {
            var t = this
              , n = new Ji;
            return (t = e.call(this, n) || this).SDK = n,
            t.runningAsInGameHoistingSDK = !0,
            window.addEventListener("message", t.monetization.handleMessageReceived),
            t
        }
        return Xi(t, e),
        t
    }(Vr);
    var ea = new $i;
    for (var ta in ea)
        window.PokiSDK[ta] = ea[ta]
}
)();
