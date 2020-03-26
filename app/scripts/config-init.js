'use strict';

(function () {
  /**
   * Snippet extracted from Keycloak examples
   */
  var auth = {};
  var app = angular.module('upsConsole');
  var AUTH_CONFIG_PATH = 'rest/auth/config';
  var UI_CONFIG_PATH = 'rest/ui/config';

  function initKeycloak() {
    
    // Ideally we would use the config object retrieved by the fetch call
    // This should work and is described in the keycloak.js documentation
    // but triggers an error here. Possibly a bug in keycloak.js
    var keycloak = new Keycloak(AUTH_CONFIG_PATH);
    console.log('keycloak:', keycloak);
    auth.loggedIn = false;
    keycloak.init({onLoad: 'login-required',    promiseType: 'native',checkLoginIframe: false  }).then(function () {
      auth.loggedIn = true;
      auth.keycloak = keycloak;
      auth.logout = function () {
        auth.loggedIn = false;
        auth.keycloak = null;
        window.location = keycloak.createLogoutUrl();
      };
      app.factory('Auth', function () {
        console.log('Auth is ', auth);
        return auth;
      });
      initUi().then(function(uiConfig) {
        console.log('BOOTSTRAP initKeyCloak!');
        app.value('ui_config',uiConfig);
        angular.bootstrap(document, ['upsConsole']);
      });
    }).catch(function () {
      window.location.reload();
    });
  }

  function initUi() {
    return fetch(UI_CONFIG_PATH).then(function(response){
      return response.json();
    }).then(function (config) {
      config.UPS_DISABLED = (config.UPS_DISABLED || '').split(',').reduce(function(acc, value) {
        acc[value]=true;
        return acc;
      }, {});
      config.DOCS_LINK = config.DOCS_LINK || 'http://aerogear.org';
      return config;
    });
  }

  function configureAuth() {
    app.factory('Auth', function () {
      console.log('Auth is ', auth);
      return auth;
    });

    app.factory('authInterceptor', function ($q, Auth) {
      return {
        request: function (request) {
          console.log('authInterceptor', Auth);
          console.log('authInterceptor', request);
          var deferred = $q.defer();

          // Those endpoints are never protected on the server regardless of the
          // auth library in use
          if (request.url === 'rest/sender' || request.url === 'rest/registry/device/importer' || request.url ===UI_CONFIG_PATH) {
            return request;
          }

          if (Auth.keycloak && Auth.keycloak.token) {
            Auth.keycloak.updateToken(5).then(function () {
              request.headers = request.headers || {};
              request.headers.Authorization = 'Bearer ' + Auth.keycloak.token;

              deferred.resolve(request);
            }).catch(function () {
              window.location.reload();
            });
          }
          return deferred.promise;
        }
      };
    });

    app.config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });
  }

  angular.element(document).ready(function () {
    fetch(AUTH_CONFIG_PATH).then(function (response) {
      return response.json();
    }).then(function (config) {
      if (config['auth-enabled']) {
        initKeycloak(config);
        configureAuth();
      } else {
        // Auth disabled on the server
        // Default to logged in and do nothing on logout
        app.factory('Auth', function () {
          console.log('No auth', auth);
          auth.loggedIn = true;
          auth.logout = function () {
          };
          return auth;
        });
        initUi().then(function(config) {
          console.log('BOOTSTRAP! No auth');
          app.value('ui_config',config);
          angular.bootstrap(document, ['upsConsole']);
        });
      }
    });
  });
})();
