angular
.module('app')
.config(routesConfig)
.run(middlewareConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('app', {
    url: '/',
    template: '<center><h1>Revista de deportes</h1><center>',
    isPrivate: false
  })
  .state('login', {
    url: '/login',
    component: 'login',
    isPrivate: false
  })
  .state('noticias', {
    url: '/noticias',
    component: 'noticias',
    isPrivate: true
  });

  $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  $transitions.onStart({},function (trans) {
    var isPrivate = trans.$to().isPrivate;
    var to = trans.$to().name;

    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    if (to === 'login' && CredentialsService.isLogged()){
      $state.go('noticias');
    }
  });
}
