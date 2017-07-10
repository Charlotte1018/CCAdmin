angular
    .module('CCAdmin', [
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate',
        'directiveModule',
        'routerModule'
    ])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when("/", "CCAdmin");
        $urlRouterProvider.otherwise('CCAdmin');
    });