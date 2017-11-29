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
    //vm.dialog = dialog;
    vm.prueba = 'prueba';
    
    NoticiasService.query().$promise.then(function (data) {
      vm.noticias = data;
    });

    vm.leer = function($event, noticia) {
      $mdDialog.show({
        templateUrl: 'app/components/dialog/dialog.html',
        controller: dialogCtrl,
        controllerAs: 'vm',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true,
        locals: {
          noticia: noticia,
        },
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    

    function dialogCtrl($mdDialog, noticia) {
      var vm = this;
      vm.texto = 'funciona';
      vm.noticia = noticia;
      vm.color = '';

      switch (vm.noticia.categoria.descripcion) {
        case 'fútbol':
          vm.color = 'red';
          break;
        case 'básquetbol':
          vm.color = 'orange';
          break;
        case 'voleibol':
          vm.color = 'lightblue';
          break;
        case 'tenis':
          vm.color = 'green';
          break;
        case 'automovilismo':
          vm.color = 'gray';
          break;
      }

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
