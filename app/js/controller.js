angular.module('controllerModule', [])
    .controller('mainCtrl', function ($translate, $scope, $http, $rootScope, $state) {
        $scope.login = function () {
            $scope.params = {
                "name": $scope.username,
                "password": $scope.password
            };
            localStorage.lastModifyUser = $scope.username;
            //$rootScope.lastModifyUser = $scope.username;
            console.log(localStorage.lastModifyUser);
            //console.log($rootScope.lastModifyUser);
            $http.post("http://106.15.62.222:3001" + "/userApi/login", $scope.params).then(function (result) {
                console.log(result);
                if (result.data) {
                    console.log(result.data);
                    $state.go("CCAdmin.home");
                } else {
                    alert("您输入的用户名或密码有误！");
                }
            })
        }

    })
    .controller('loginCtrl', function ($scope, $http, $rootScope, $state) {
        $rootScope.lastModifyUser = $scope.username;
        $scope.login = function () {
            $scope.params = {
                "name": $rootScope.username,
                "password": $scope.password
            };
            $http.post("http://106.15.62.222:3001" + "/userApi/login", $scope.params).then(function (result) {
                console.log(result);
                if (result.data) {
                    console.log(result.data);
                    $state.go("CCAdmin.home");
                } else {
                    alert("您输入的用户名或密码有误！");
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
        //console.log($rootScope.lastModifyUser);



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
    .controller('bannerCtrl', function ($translate, $scope, $rootScope, $http, $state, $interval) {
        $scope.banners = [];
        $scope.selectLocation = {
            "top": "0",
            "top2": "1",
            "bottom": "2"
        }
        $scope.selectStatus = {
            "offline": "0",
            "online": "1"
        }
        $scope.isDeleted = 0;
        //console.log($rootScope.Host);
        //$scope.lastModifyDate = new Date().toUTCString();
        var date = new Date();
        date.setHours(date.getHours() + 8);
        $scope.lastModifyDate = date;
        $scope.lastModifyUser = localStorage.lastModifyUser;
        console.log($scope.lastModifyDate);
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
                    "lastModifyUser": $scope.lastModifyUser,
                    "isDeleted": $scope.isDeleted
                }
            ]
            console.log($scope.params);
            $http.post("http://106.15.62.222:3001" + "/bannerApi/create", $scope.params).then(function (result) {
                console.log(result.data);
                alert("创建成功！")
                $state.go("CCAdmin.showBanner");
                //console.log(result.data.result[0].lastModifyDate);

            })
            // alert("创建成功！")
        }
        // 更新，编辑，删除
        $scope.edits = []; //控制编辑状态
        //获取数据
        $http.get("http://106.15.62.222:3001" + "/bannerApi").then(function (result) {
            $scope.banners = result.data;
            console.log($scope.banners);
        })
        //编辑
        $scope.editor = function (index) {
            $scope.edits = [];
            $scope.edits[index] = true;
        }
        //保存
        $scope.save = function (index) {
            $scope.edits = [];
            var date = new Date();
            date.setHours(date.getHours() + 8);
            $scope.lastModifyDate = date;
            $scope.id = $scope.banners[index].id;
            console.log($scope.index);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/bannerApi/update/" + $scope.id, $scope.banners[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
            $scope.upDate = {
                "lastModifyDate": $scope.lastModifyDate,
                "lastModifyUser": $scope.lastModifyUser
            }
            $http.post("http://106.15.62.222:3001" + "/bannerApi/update/" + $scope.id, $scope.upDate).then(function (result) {
                console.log(result.data);
                //alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {

            $scope.id = $scope.banners[index].id;
            console.log($scope.id);
            //$scope.banners.splice(index, 1)

            $http.post("http://106.15.62.222:3001" + "/bannerApi/delete/" + $scope.id).then(function (result) {
                console.log(result.data);
                $http.get("http://106.15.62.222:3001" + "/bannerApi").then(function (result) {
                    $scope.banners = result.data;
                    //console.log($scope.banners);
                })
                alert("删除成功！")

            })
            // $http.get("http://106.15.62.222:3001" + "/bannerApi").then(function (result) {
            //     $scope.banners = result.data;
            //     //console.log($scope.banners);
            // })
        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;

        //datePicker

    })
    .controller('icoListCtrl', function ($translate, $state, $rootScope, $scope, $http) {
        //$scope.lastModifyDate = new Date().toUTCString();
        var date = new Date();
        date.setHours(date.getHours() + 8);
        $scope.lastModifyDate = date;
        $scope.lastModifyUser = localStorage.lastModifyUser;
        $scope.selectStatus = {
            "achieved": "0",
            "upcomming": "1",
            "live": "2"
        }
        $scope.selectisRecommended = {
            "noRecommended": "0",
            "Recommended": "1"
        }
        $scope.isDeleted = 0;
        $scope.createIcoList = function () {
            if (confirm("您是否确定提交本页？")) {
                //alert("提交并填写详情页");
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
                        "lastModifyUser": $scope.lastModifyUser,
                        "isDeleted": $scope.isDeleted
                    }
                ]
                $http.post("http://106.15.62.222:3001" + "/icoListApi/create", $scope.params).then(function (result) {
                    // $scope.banners.push = $scope.params;
                    console.log(result.data.result);
                    alert("您创建的ICOID号为："+result.data.result[0].id+",填写详情页");
                    $state.go("CCAdmin.createIcoDetails");
                })
                //$state.go("CCAdmin.createIcoDetails");
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
            var date = new Date();
            date.setHours(date.getHours() + 8);
            $scope.lastModifyDate = date;
            $scope.id = $scope.icoLists[index].id;
            console.log($scope.id);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/icoListApi/update/" + $scope.id, $scope.icoLists[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
            $scope.upDate = {
                "lastModifyDate": $scope.lastModifyDate,
                "lastModifyUser": $scope.lastModifyUser
            }
            $http.post("http://106.15.62.222:3001" + "/icoListApi/update/" + $scope.id, $scope.upDate).then(function (result) {
                console.log(result.data);
                //alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.id = $scope.icoLists[index].id;
            console.log($scope.id);
            //$scope.banners.splice(index, 1)

            $http.post("http://106.15.62.222:3001" + "/icoListApi/delete/" + $scope.id).then(function (result) {
                console.log(result.data);
                $http.get("http://106.15.62.222:3001" + "/icoListApi").then(function (result) {
                    $scope.icoLists = result.data;
                    //console.log($scope.icoLists);
                })
                alert("删除成功！")
            })

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
    })
    .controller('icoDetailCtrl', function ($translate, $scope, $rootScope, $http, $log, $state) {
        $scope.icoDetails = [];
        //$scope.lastModifyDate = new Date().toUTCString();
        var date = new Date();
        date.setHours(date.getHours() + 8);
        $scope.lastModifyDate = date;
        $scope.isDeleted = 0;
        $scope.lastModifyUser = localStorage.lastModifyUser;
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
                    "lastModifyUser": $scope.lastModifyUser,
                    'isDeleted': $scope.isDeleted
                }
            ]
            //alert("创建成功！");
            $http.post("http://106.15.62.222:3001" + "/icoDetailsApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                alert("创建成功！");
                console.log(result.data.result);
            })

        }
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
            $scope.id = $scope.icoDetails[index].id;
            var date = new Date();
            date.setHours(date.getHours() + 8);
            $scope.lastModifyDate = date;
            console.log($scope.id);
            //console.log($scope.icoLists[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/icoDetails/update/" + $scope.id, $scope.icoDetails[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
            $scope.upDate = {
                "lastModifyDate": $scope.lastModifyDate,
                "lastModifyUser": $scope.lastModifyUser
            }
            $http.post("http://106.15.62.222:3001" + "/icoDetails/update/" + $scope.id, $scope.upDate).then(function (result) {
                console.log(result.data);
                //alert("修改成功！")
            })

        }
        //删除
        $scope.delete = function (index) {
            $scope.id = $scope.icoDetails[index].id;
            console.log($scope.id);
            //$scope.banners.splice(index, 1)

            $http.post("http://106.15.62.222:3001" + "/icoDetails/delete/" + $scope.id).then(function (result) {
                console.log(result.data);
                $http.get("http://106.15.62.222:3001" + "/icoDetails").then(function (result) {
                    $scope.icoDetails = result.data;
                    //console.log($scope.icoLists);
                })
                alert("删除成功！")
            })

        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;
    })
    .controller('eventListCtrl', function ($translate, $scope, $rootScope, $http, $state) {
        $scope.eventList = [];
        //$scope.lastModifyDate = new Date().toUTCString();
        var date = new Date();
        date.setHours(date.getHours() + 8);
        $scope.lastModifyDate = date;
        $scope.isDeleted = 0;
        $scope.lastModifyUser = localStorage.lastModifyUser;
        $scope.createEventList = function () {
            $scope.params = [
                {
                    "eventName": $scope.eventName,
                    "eventDate": $scope.eventDate,
                    "eventLocation": $scope.eventLocation,
                    "eventURL": $scope.eventURL,
                    "lastModifyDate": $scope.lastModifyDate,
                    "lastModifyUser": $scope.lastModifyUser,
                    'isDeleted': $scope.isDeleted
                }
            ]
            $http.post("http://106.15.62.222:3001" + "/eventListApi/create", $scope.params).then(function (result) {
                // $scope.banners.push = $scope.params;
                console.log(result.data.result);
                alert("创建成功！")
                $state.go("CCAdmin.showEventList");
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
            var date = new Date();
            date.setHours(date.getHours() + 8);
            $scope.lastModifyDate = date;
            $scope.id = $scope.eventList[index].id;
            console.log($scope.id);
            console.log($scope.eventList[index]) //制定项
            $http.post("http://106.15.62.222:3001" + "/eventListApi/update/" + $scope.id, $scope.eventList[index]).then(function (result) {
                console.log(result.data);
                alert("修改成功！")
            })
            $scope.upDate = {
                "lastModifyDate": $scope.lastModifyDate,
                "lastModifyUser": $scope.lastModifyUser
            }
            $http.post("http://106.15.62.222:3001" + "/eventListApi/update/" + $scope.id, $scope.upDate).then(function (result) {
                console.log(result.data);
                //alert("修改成功！")
            })
        }
        //删除
        $scope.delete = function (index) {
            $scope.id = $scope.eventList[index].id;
            console.log($scope.id);
            //$scope.banners.splice(index, 1)

            $http.post("http://106.15.62.222:3001" + "/eventListApi/delete/" + $scope.id).then(function (result) {
                console.log(result.data);
                $http.get("http://106.15.62.222:3001" + "/eventListApi").then(function (result) {
                    $scope.eventList = result.data;
                })
                alert("删除成功！")
            })



        }

        //分页
        $scope.maxSize = 10;
        $scope.bigTotalItems = 300;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 70;
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
