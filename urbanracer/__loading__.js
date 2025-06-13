pc.script.createLoadingScreen(function (app) {

    app.p = true;
    app.skip = false;
    
    if('localStorage' in window && window['localStorage'] !== null)
    {
        if(window.localStorage.hasOwnProperty("from_reset"))
        {
            app.skip = true;
            window.localStorage.clear();
        }
    }
    
    window.addEventListener('keydown', ev => {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(ev.key)) {
        ev.preventDefault();
    }
    });
    window.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });

    if (app.p && !app.skip) {
        PokiSDK.init().then(
            () => {
                app.ab = false;
            }
        ).catch(
            () => {
                app.ab = true;
            }
        );

        PokiSDK.gameLoadingStart();
    }

    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'data:image/png;base64,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';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #000;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #000;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(45% - 28px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',
            '',
            '#application-splash img {',
            '    width: 100%;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #fff;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        if (app.p && !app.skip) {
            PokiSDK.gameLoadingFinished();
        }
        app.off('preload:progress');
    });

    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});