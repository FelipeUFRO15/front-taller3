(function () {
  'use strict';

  angular
  .module('app')
  .service('NoticiasService', noticiasService);

  noticiasService.$inject = ['$resource', 'API'];

  function noticiasService($resource, API) {
    return $resource(API + 'noticias/:id', {id: '@id'});
  }
})();
