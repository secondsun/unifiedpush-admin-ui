'use strict';

angular.module('upsConsole').factory('appModal', function ($uibModal, applicationsEndpoint) {
  var service = {

    editName: function (app) {
      return $uibModal.open({
        templateUrl: 'dialogs/edit-app-name.html',
        controller: function ($scope, $uibModalInstance) {
          $scope.app = app;

          $scope.confirm = function () {
            var data = { name: app.name, description: app.description };
            applicationsEndpoint.update({ appId: app.pushApplicationID }, data )
              .then(function ( updatedApp ) {
                $uibModalInstance.close( updatedApp );
              });
          };

          $scope.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      }).result;
    }
  };

  return service;

});
