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
    auth.loggedIn = false;
    keycloak.init({onLoad: 'login-required'}).success(function () {
      auth.loggedIn = true;
      auth.keycloak = keycloak;
      auth.logout = function () {
        auth.loggedIn = false;
        auth.keycloak = null;
        window.location = keycloak.createLogoutUrl();
      };
      app.factory('Auth', function () {
        return auth;
      });
    }).error(function () {
      window.location.reload();
    });
  }

  function initUi() {
    return fetch(UI_CONFIG_PATH).then(function(response){
      return response.json();
    }).then(function (config) {
      app.value('ui_conifg',config);
    });
  }

  function configureAuth() {
    app.factory('Auth', function () {
      return auth;
    });

    app.factory('authInterceptor', function ($q, Auth) {
      return {
        request: function (config) {
          var deferred = $q.defer();

          // Those endpoints are never protected on the server regardless of the
          // auth library in use
          if (config.url === 'rest/sender' || config.url === 'rest/registry/device/importer') {
            return config;
          }

          if (Auth.keycloak && Auth.keycloak.token) {
            Auth.keycloak.updateToken(5).success(function () {
              config.headers = config.headers || {};
              config.headers.Authorization = 'Bearer ' + Auth.keycloak.token;

              deferred.resolve(config);
            }).error(function () {
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
        initKeycloak();
        configureAuth();
      } else {
        // Auth disabled on the server
        // Default to logged in and do nothing on logout
        app.factory('Auth', function () {
          auth.loggedIn = true;
          auth.logout = function () {
          };
          return auth;
        });
      }
    }).then(function(){
      return initUi();
    }).then(function() {
      angular.bootstrap(document, ['upsConsole']);
    });
  });
})();
