angular.module('controllerModule', [])
    .controller('mainCtrl', function ($translate, $scope, $rootScope) {

    })
    .controller('homeCtrl', function ($translate, $scope, $rootScope) {
        $scope.host = [
            "localhost:3000",
            "http://106.15.62.222:3001"
        ];
        $scope.Host = function () {
            $rootScope.Host = $scope.seclect;
            console.log($scope.seclect);
        }
    })
    .controller('bannerCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.banners = [];
        $scope.createBanner = function () {
            $scope.params = [
                {
                    "name": $scope.name,
                    "path": $scope.path,
                    "location": $scope.location,
                    "status": $scope.status,
                    "startDate": $scope.startDate,
                    "endDate": $scope.endDate,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser
                }
            ]
            $http.post($rootScope.Host + "/bannerApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get($rootScope.Host + "/bannerApi").then(function (result) {
            $scope.banners = result.data;
        })
    })
    .controller('icoListCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.icoLists = [];
        $scope.createIcoList = function () {
            $scope.params = [
                {
                    "logoPath": $scope.logoPath,
                    "icoName": $scope.icoName,
                    "status": $scope.status,
                    "isRecommended": $scope.isRecommended,
                    "startDate": $scope.startDate,
                    "endDate": $scope.endDate,
                    "description": $scope.description,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser
                }
            ]
            $http.post($rootScope.Host + "/icoListApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get($rootScope.Host + "/icoListApi").then(function (result) {
            $scope.icoLists = result.data;
        })
    })
    .controller('icoDetailCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.icoDetails = [];
        $scope.createIcoDetail = function () {
            $scope.params = [
                {
                    "icoID": $scope.icoID,
                    "icoPlatform": $scope.icoPlatform,
                    "icoWebSite": $scope.icoWebSite,
                    "icoLocation": $scope.icoLocation,
                    "icoTotalSupply": $scope.icoTotalSupply,
                    "icoWhitePaperPath": $scope.icoWhitePaperPath,
                    "icoDistribution": $scope.icoDistribution,
                    "icoTeamMember": $scope.icoTeamMember,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser
                }
            ]
            $http.post($rootScope.Host + "/icoDetailsApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get($rootScope.Host + "/icoDetailsApi").then(function (result) {
            $scope.icoDetails = result.data;
        })
    })
    .controller('eventListCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.eventList = [];
        $scope.createEventList = function () {
            $scope.params = [
                {
                    "eventName": $scope.eventName,
                    "eventDate": $scope.eventDate,
                    "eventLocation": $scope.eventLocation,
                    "eventURL": $scope.eventURL,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser
                }
            ]
            $http.post($rootScope.Host + "/eventListApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get($rootScope.Host + "/eventListApi").then(function (result) {
            $scope.eventList = result.data;
        })
    })
    .controller('articleEditor', ['$scope', 'textAngularManager', function articleEditor($scope, textAngularManager) {
        $scope.htmlcontent = "<p>在此编辑你的文章!</p>";
    }]);
