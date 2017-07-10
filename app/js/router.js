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
            
            
            
    })