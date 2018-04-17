'use strict';

(function () {
  /**
   * Snippet extracted from Keycloak examples
   */
  var auth = {};
  var app = angular.module('upsConsole');

  function initKeycloak() {
    var keycloak = new Keycloak('rest/keycloak/config');
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
      angular.bootstrap(document, ['upsConsole']);
    }).error(function () {
      window.location.reload();
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
    fetch('rest/keycloak/config').then(function (response) {
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

        angular.bootstrap(document, ['upsConsole']);
      }
    });
  });
})();
