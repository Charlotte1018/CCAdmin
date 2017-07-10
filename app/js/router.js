angular.module('routerModule', [
'controllerModule'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state("CCAdmin", {
                url: "/CCAdmin",
                templateUrl: "app/views/main.html",
                controller: "mainCtrl"
            })
            .state('CCAdmin.home', {
                url: '/home',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/home.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            
            
            
    })