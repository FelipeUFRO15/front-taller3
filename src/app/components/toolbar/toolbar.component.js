(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject = ['CredentialsService', '$state', '$rootScope'];

  function toolbarCtrl(CredentialsService, $state, $rootScope) {
    var vm = this;

    vm.isLogged = CredentialsService.isLogged();

    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });
  }
})();
