(function () {
  'use strict';

  angular
  .module('app')
  .component('noticias', {
    templateUrl: 'app/components/noticias/noticias.html',
    controller: noticiasCtrl,
    controllerAs: 'vm'
  });

  noticiasCtrl.$inject = ['NoticiasService', '$mdDialog'];

  function noticiasCtrl(NoticiasService, $mdDialog) {
    var vm = this;

    vm.noticias = [];

    vm.status = '  ';
    vm.customFullscreen = false;
    vm.answer = '';
    
    NoticiasService.query().$promise.then(function (data) {
      vm.noticias = data;
    });

    vm.leer = function() {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: 'App/components/dialog/dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
    });

    function DialogController($mdDialog) {
      var vm = this;
      vm.texto = 'funciona';

      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
      };
  }
  };

  }
})();
