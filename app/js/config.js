angular
    .module('CCAdmin', [
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate',
        'directiveModule',
        'routerModule',
        'textAngular'
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when("/", "login");
        $urlRouterProvider.otherwise('login');
    });