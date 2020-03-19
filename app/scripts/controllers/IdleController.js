'use strict';

angular.module('upsConsole')
  .controller('IdleController', function (Keepalive, Idle, $rootScope, $scope, $log, appConfig, Auth) {

    var self = this;

    self.config = appConfig;

    // No need for idling when no authentication is used
    if (Auth && Auth.keycloak) {
      Idle.watch();
    }

    /**
     * idle service, keepalive, auth token refresh
     */
    self.idleCountdown = appConfig.idleWarningDuration + 1;
    $rootScope.$on('KeepaliveResponse', function () {
      Auth.keycloak.updateToken(45).then(function (refreshed) {
        if (refreshed) {
          $log.debug('token was successfully refreshed');
        } else {
          $log.debug('token is still valid');
        }
      }).catch(function () {
        $log.debug('failed to refresh the token, or the session has expired');
      });
    });

    $rootScope.$on('IdleStart', function () {
      $log.debug('idleStart');

    });
    $rootScope.$on('IdleWarn', function () {
      $log.debug('idleWarn');
      $scope.$apply(function () {
        self.idleCountdown = self.idleCountdown - 1;
      });
    });
    $rootScope.$on('IdleEnd', function () {
      $log.debug('idleEnd');
      $scope.$apply(function () {
        self.idleCountdown = appConfig.idleWarningDuration + 1;
      });

    });
    $rootScope.$on('IdleTimeout', function () {
      $log.debug('idleTimeout');
      Auth.logout();
    });
  })

  .config(function (KeepaliveProvider, IdleProvider, appConfigProvider) {
    var appConfig = appConfigProvider.$get();
    IdleProvider.idle(appConfig.idleDuration);
    IdleProvider.timeout(appConfig.idleWarningDuration);
    KeepaliveProvider.interval(appConfig.keepaliveInterval);
  });
