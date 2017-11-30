(function () {
  'use strict';

  angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/login.html',
    controller: loginCtrl,
    controllerAs: 'vm'
  });

  loginCtrl.$inject = ['LoginService', 'CredentialsService', '$state', '$rootScope'];

  function loginCtrl(LoginService, CredentialsService, $state, $rootScope) {
    var vm = this;

    vm.credentials = {};

    vm.login = function (credentials) {
      LoginService.save(credentials, function (data) {
        CredentialsService.setToken(data.token);
        CredentialsService.setUser(data.email);
        $rootScope.$emit('isLogin');
        $state.go('noticias', ({id: ''}));
      }, function (error) {
        console.log(error);
      });
    };
  }
})();
