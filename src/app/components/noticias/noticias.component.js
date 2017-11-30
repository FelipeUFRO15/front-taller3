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
          NoticiasService: NoticiasService,
        },
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    

      function dialogCtrl($mdDialog, noticia, NoticiasService) {
        var vm = this;
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

        vm.eliminar = function() {
          NoticiasService.delete({id: vm.noticia.id});
        }

        vm.cancel = function() {
          $mdDialog.cancel();
        };
      }
    };

    vm.agregarNoticia = function ($event) {
      $mdDialog.show({
        templateUrl: 'app/components/form-noticia/form-noticia.html',
        controller: dialogCtrl,
        controllerAs: 'vm',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true,
        locals: {
          NoticiasService: NoticiasService,
        },
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        vm.status = 'You said the information was "' + answer + '".';
      }, function() {
        vm.status = 'You cancelled the dialog.';
      });
    

      function dialogCtrl($mdDialog, NoticiasService) {
        var vm = this;

        vm.agregar = function (noticia) {
          //var fechaReal = noticia.fecha.getFullYear() + '-' + (noticia.fecha.getMonth() + 1) + '-' + noticia.fecha.getDay();
          //console.log('Fecha real: ' + fechaReal);
          //noticia.fecha = '2017-11-29';
          console.log(noticia);
          NoticiasService.save(noticia);
        }

        vm.cancel = function() {
          $mdDialog.cancel();
        };
      }
    } 
  }
})();
