/**(function () {
  'use strict';

  angular
  .module('app')
  .component('dialog', {
    templateUrl: 'app/components/dialog/dialog.html',
    controller: dialogCtrl,
    controllerAs: 'vm',
    parent: angular.element(document.body),
    targetEvent: ev,
    clickOutsideToClose:true,
    fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
  });

  dialogCtrl.$inject = ['$mdDialog'];

  function dialogCtrl($mdDialog) {
    var vm = this;

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
})();*/