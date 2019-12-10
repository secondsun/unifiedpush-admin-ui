angular.module('upsConsole')
  .controller('SenderController', function( $uibModal, $scope, applicationsEndpoint, ContextProvider ) {

    var self = this;

    this.app = $scope.$parent.$parent.appDetail.app;

    this.contextPath = ContextProvider.contextPath();

    this.renewMasterSecret = function () {
      $uibModal.open({
        templateUrl: 'inline:renew-master-secret.html',
        controller: function( $scope, $uibModalInstance ) {
          $scope.app = self.app;
          $scope.confirm = function() {
            applicationsEndpoint.reset({appId: self.app.pushApplicationID})
              .then(function (application) {
                self.app.masterSecret = application.masterSecret;
                $uibModalInstance.close( application );
              });
          };
          $scope.dismiss = function() {
            $uibModalInstance.dismiss('cancel');
          }
        }
      });
    };
  });
