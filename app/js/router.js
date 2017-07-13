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
            .state("login", {
                url: "/login",
                templateUrl: "app/views/Admin/login.html",
                controller: "loginCtrl"
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
            .state('CCAdmin.createBanner', {
                url: '/createBanner',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/banner/createBanner.html',
                        controller: 'bannerCtrl'
                    }
                }
            })
            .state('CCAdmin.showBanner', {
                url: '/showBanner',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/banner/show.html',
                        controller: 'bannerCtrl'
                    }
                }
            })
            .state('CCAdmin.createIcoList', {
                url: '/createIcoList',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/icoList/createIcoList.html',
                        controller: 'icoListCtrl'
                    }
                }
            })
            .state('CCAdmin.showIcoList', {
                url: '/showIcoList',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/icoList/showIcoList.html',
                        controller: 'icoListCtrl'
                    }
                }
            })
            .state('CCAdmin.createIcoDetails', {
                url: '/createIcoDetails',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/icoDetails/createIcoDetails.html',
                        controller: 'icoDetailCtrl'
                    }
                }
            })
            .state('CCAdmin.showIcoDetails', {
                url: '/showIcoDetails',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/icoDetails/showIcoDetails.html',
                        controller: 'icoDetailCtrl'
                    }
                }
            })
            .state('CCAdmin.createEventList', {
                url: '/createEventList',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/eventList/createEventList.html',
                        controller: 'eventListCtrl'
                    }
                }
            })
            .state('CCAdmin.showEventList', {
                url: '/showEventList',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/eventList/showEventList.html',
                        controller: 'eventListCtrl'
                    }
                }
            })
            .state('CCAdmin.articleEditor', {
                url: '/articleEditor',
                views: {
                    "content": {
                        templateUrl: 'app/views/Admin/articles/article.html',
                        controller: 'articleEditor'
                    }
                }
            })
            
            
            
    })