angular.module('controllerModule', [])
    .controller('mainCtrl', function ($translate, $scope, $http, $rootScope, $state) {
        //$rootScope.lastModifyUser = username;

    })
    .controller('loginCtrl', function ($scope, $http, $rootScope, $state) {
        $rootScope.lastModifyUser = $scope.username;
        $scope.login = function () {
            $scope.params = {
                "name": $scope.username,
                "password": $scope.password
            };
            $http.post("http://106.15.62.222:3001" + "/userApi/login", $scope.params).then(function (result) {
                if (result) {
                    console.log(result.data);
                    $state.go("CCAdmin.home");
                } else {
                    alert("您输入的用户名或密码有误！")
                }
            })
        }
    })
    .controller('homeCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.host = [
            "localhost:3000",
            "http://106.15.62.222:3001"
        ];
        $scope.Host = function () {
            $rootScope.Host = $scope.seclect;
            console.log($scope.seclect);
        }




        //图片加载
        $scope.reader = new FileReader();   //创建一个FileReader接口
        $scope.form = {     //用于绑定提交内容，图片或其他数据
            image: {},
        };
        $scope.thumb = {};      //用于存放图片的base64
        $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
            1111: {}
        };

        $scope.img_upload = function (files) {       //单次提交图片的函数
            $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
            $scope.reader = new FileReader();
            $scope.reader.readAsDataURL(files[0]);
            console.log(files[0]);
            $scope.files = files[0];
            //FileReader的方法，把图片转成base64
            $scope.reader.onload = function (ev) {
                $scope.$apply(function () {
                    $scope.thumb[$scope.guid] = {
                        imgSrc: ev.target.result,  //接收base64
                    }
                    console.log($scope.thumb[$scope.guid]);
                });
            };
            var data = new FormData();      //以下为像后台提交图片数据
            data.append('image', files[0]);
            data.append('guid', $scope.guid);
            console.log(data);
        };

    })
    .controller('bannerCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.banners = [];
        $scope.lastModifyDate = new Date().toUTCString();
        $scope.createBanner = function () {
            $scope.params = [
                {
                    "name": $scope.name,
                    "path": $scope.path,
                    "location": $scope.location,
                    "status": $scope.statuss,
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
        // 更新，编辑，删除
        $scope.edits = []; //控制编辑状态
        //获取数据
        $http.get("http://106.15.62.222:3001" + "/bannerApi").then(function (result) {
            $scope.banners = result.data;
        })
        //编辑
        $scope.editor = function (index) {
            $scope.edits = [];
            $scope.edits[index] = true;
        }
        //保存
        $scope.save = function (index) {
            $scope.edits = [];
            $scope.index = index + 1;
            console.log($scope.index);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/bannerApi/update/" + $scope.index, $scope.banners[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.banners.splice(index, 1)
        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;

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
    .controller('icoListCtrl', function ($translate, $state, $rootScope, $scope, $http) {
        $scope.lastModifyDate = new Date().toUTCString();
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
        // 更新，编辑，删除
        $scope.edits = []; //控制编辑状态
        //获取数据
        $http.get("http://106.15.62.222:3001" + "/icoListApi").then(function (result) {
            $scope.icoLists = result.data;
            console.log($scope.icoLists)
        })
        //编辑
        $scope.editor = function (index) {
            $scope.edits = [];
            $scope.edits[index] = true;
        }
        //保存
        $scope.save = function (index) {
            $scope.edits = [];
            $scope.index = index + 1;
            console.log($scope.index);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/icoListApi/update/" + $scope.index, $scope.icoLists[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.icoLists.splice(index, 1)
        }



        //分页
        // $scope.totalItems = 64;
        // $scope.currentPage = 4;

        // $scope.pageChanged = function () {
        //     $log.log('Page changed to: ' + $scope.currentPage);
        // };

        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;





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
        // $http.get("http://106.15.62.222:3001" + "/icoDetailsApi").then(function (result) {
        //     $scope.icoDetails = result.data;
        // })
        // 更新，编辑，删除
        $scope.edits = []; //控制编辑状态
        //获取数据
        $http.get("http://106.15.62.222:3001" + "/icoDetailsApi").then(function (result) {
            $scope.icoDetails = result.data;
        })
        //编辑
        $scope.editor = function (index) {
            $scope.edits = [];
            $scope.edits[index] = true;
        }
        //保存
        $scope.save = function (index) {
            $scope.edits = [];
            $scope.index = index + 1;
            console.log($scope.index);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/bannerApi/update/" + $scope.index, $scope.icoDetails[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.icoDetails.splice(index, 1)
        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;
    })
    .controller('eventListCtrl', function ($translate, $scope, $rootScope, $http) {
        $scope.eventList = [];
        $scope.lastModifyDate = new Date().toUTCString();
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
        // 更新，编辑，删除
        $scope.edits = []; //控制编辑状态
        //获取数据
        // $http.get("http://106.15.62.222:3001" + "/eventListApi").then(function (result) {
        //     $scope.eventList = result.data;
        // })
        //编辑
        $scope.editor = function (index) {
            $scope.edits = [];
            $scope.edits[index] = true;
        }
        //保存
        $scope.save = function (index) {
            $scope.edits = [];
            $scope.index = index + 1;
            console.log($scope.index);
            console.log($scope.eventList[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/eventListApi/update/" + $scope.index, $scope.eventList[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.eventListApi.splice(index, 1)
        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;


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
