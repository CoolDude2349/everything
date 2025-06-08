window.ConstructCrazySDK = {
  isInitialized: false,
  ensureInitialized: function () {
    if (!window.ConstructCrazySDK.isInitialized) {
      throw new Error('CrazySDK is not initialized');
    }
  },
  init: function () {
    return new Promise((resolve, reject) => {
      const sdkScript = document.createElement('script');
      sdkScript.type = 'text/javascript';
      sdkScript.src = 'crazygames-sdk-v3-edit2.js';
      sdkScript.onload = function () {
        window.CrazyGames.SDK.init({
          wrapper: {
            engine: 'construct3',
            sdkVersion: '3.0.0',
          },
        })
          .then(function () {
            window.ConstructCrazySDK.isInitialized = true;
            resolve();
          })
          .catch(function (e) {
            reject(console.error('Failed to initialize CrazySDK' + e));
          });
      };
      sdkScript.onerror = function () {
        console.error('Failed to load CrazySDK script.');
      };
      document.body.appendChild(sdkScript);
    });
  },
};

Object.defineProperty(window.ConstructCrazySDK, 'ad', {
  get: function () {
    window.ConstructCrazySDK.ensureInitialized();
    return {
      async requestAd(type) {
        return new Promise((resolve, reject) => {
          const callbacks = {
            adFinished: () => {
              resolve();
            },
            adError: (error) => {
              reject('Failed to display ' + type + ' ad, error: ', error);
            },
            adStarted: () => {},
          };
          window.CrazyGames.SDK.ad.requestAd(type, callbacks);
        });
      },
      hasAdblock() {
        return window.CrazyGames.SDK.ad.hasAdblock();
      },
    };
  },
});

Object.defineProperty(window.ConstructCrazySDK, 'banner', {
  get: function () {
    window.ConstructCrazySDK.ensureInitialized();
    return {
      async requestBanners(banners) {
        if (!banners || !Array.isArray(banners)) {
          console.error('requestBanners function is taking an array of banners as parameter.');
          return;
        }

        const invalidBanners = banners.some(
          (banner) => !banner.id || !banner.width || !banner.height || banner.x === undefined || banner.y === undefined
        );

        if (invalidBanners) {
          console.error('Some properties are missing in your banner objects, a banner requires: "x", "y", "width", "height" and "id"');
          return;
        }

        const requestBanners = banners.map((banner) => ({
          id: banner.id,
          position: { x: banner.x, y: banner.y },
          anchor: { x: 0, y: 0 }, // banners will be positioned from the bottom left of the screen
          pivot: { x: 0, y: 0 }, // banner pivot is in the bottom left of the container
          size: banner.width + 'x' + banner.height,
        }));

        window.CrazyGames.SDK.banner.requestOverlayBanners(requestBanners, function (bannerId, message, error) {
          if (message === 'bannerError') {
            console.error('Failed to render ' + bannerId + ' error: ', error);
          }
        });
      },
      async hideAllBanners() {
        window.CrazyGames.SDK.banner.requestOverlayBanners([], function () {});
      },
    };
  },
});

Object.defineProperty(window.ConstructCrazySDK, 'game', {
  get: function () {
    window.ConstructCrazySDK.ensureInitialized();
    return window.CrazyGames.SDK.game;
  },
});

Object.defineProperty(window.ConstructCrazySDK, 'user', {
  get: function () {
    window.ConstructCrazySDK.ensureInitialized();
    return window.CrazyGames.SDK.user;
  },
});

Object.defineProperty(window.ConstructCrazySDK, 'data', {
  get: function () {
    window.ConstructCrazySDK.ensureInitialized();
    return window.CrazyGames.SDK.data;
  },
});
