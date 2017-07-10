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
