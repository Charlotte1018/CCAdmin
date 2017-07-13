angular.module('controllerModule', [])
    .controller('mainCtrl', function ($translate, $scope, $http, $rootScope, $state) {
    })
    .controller('loginCtrl', function ($scope, $http, $rootScope, $state) {
        $scope.username = "user1";
        $scope.password = "abc123";
        $scope.params = {
            "name": $scope.username,
            "password": $scope.password
        };

        // console.log($scope.username);
        // console.log($scope.password);
        $scope.login = function () {
            $http.post("http://106.15.62.222:3001" + "/userApi/login", $scope.params).then(function (result) {
                //console.log(result.data);
                //alert("hello");
                if (result) {
                    console.log($scope.username);
                    console.log($scope.password);
                    console.log(result.data);
                    $state.go("CCAdmin.home");
                } else {
                    alert("您输入的用户名或密码有误！")
                }
            })

        }
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
            $http.post("http://106.15.62.222:3001" + "/bannerApi/create", $scope.params).then(function (result) {
                console.log(result);
            })
        }
        $http.get("http://106.15.62.222:3001" + "/bannerApi").then(function (result) {
            $scope.banners = result.data;
        })
    })
    .controller('icoListCtrl', function ($translate, $state, $rootScope, $scope, $http) {
        $scope.lastModifyDate = new Date();
        $scope.icoLists = [];
        $scope.createIcoList = function () {
            if (confirm("您是否确定提交本页？")) {
                alert("提交并填写详情页");
                $scope.params = [
                    {
                        "logoPath": $scope.logoPath,
                        "icoName": $scope.icoName,
                        "status": $scope.statuss,
                        "isRecommended": $scope.isRecommended,
                        "startDate": $scope.startDate,
                        "endDate": $scope.endDate,
                        "description": $scope.description,
                        "lastModifyDate": $scope.lastModifyDate,
                        "lastModifyUser": $scope.name
                    }
                ]
                $http.post("http://106.15.62.222:3001" + "/icoListApi/create", $scope.params).then(function (result) {
                    // $scope.banners.push = $scope.params;
                    console.log(result);
                })
                $state.go("CCAdmin.createIcoDetails");
            }
            else {
                alert("重新检查信息");
            }
        }
        $http.get("http://106.15.62.222:3001" + "/icoListApi").then(function (result) {
            $scope.icoLists = result.data;

            //console.log($scope.icoLists);
            return $scope.icoLists;
        })
        // httpPromise.then(
        //     // function save(icoLists) {
        //     //     $scope.edit = false;
        //     //     console.log(icoLists);
        //     // }
        //     $scope.save = function (icoLists) { console.log(icoLists); $scope.edit = false; }
        // )
        //console.log($scope.icoLists);
        $scope.edit = false;
        $scope.editor = function () { $scope.edit = true; }
        $scope.save = function () { $scope.edit = false; }


        //datePicker
        $scope.today = function () {
            $scope.startDate = new Date();
            $scope.endDate = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.startDate = null;
            $scope.endDate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    })
    .controller('icoDetailCtrl', function ($translate, $scope, $rootScope, $http, $log) {
        $scope.icoDetails = [];
        $scope.lastModifyDate = new Date().toUTCString();
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
            $http.post("http://106.15.62.222:3001" + "/icoDetailsApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get("http://106.15.62.222:3001" + "/icoDetailsApi").then(function (result) {
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
            $http.post("http://106.15.62.222:3001" + "/eventListApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result);
            })
        }
        $http.get("http://106.15.62.222:3001" + "/eventListApi").then(function (result) {
            $scope.eventList = result.data;
        })
    })
    .controller('articleEditor', ['$scope', 'textAngularManager', function articleEditor($scope, textAngularManager, $http) {
        $scope.htmlcontent = "<p>在此编辑你的文章!</p>";
        $scope.createArticle = function () {
            $scope.params = [
                {
                    "title": $scope.title,
                    "author": $scope.author,
                    "time": $scope.time,
                    "htmlcontent": $scope.htmlcontent,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser
                }
            ]
            $http.post("http://106.15.62.222:3001" + "/eventListApi/create", $scope.params).then(function (result) {
                console.log(result);
            })
        }
    }]);
