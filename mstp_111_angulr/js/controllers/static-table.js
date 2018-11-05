app.controller('GridDemoCtrl', ['$scope', '$http', '$modal','$state', function($scope, $http, $modal, $state) {

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [20, 50, 100],
        pageSize: 10,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize){
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var largedata;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get("http://192.168.0.4:8080/news/select",
                    {
                        params: {
                            biaoti: searchText
                        }
                    })
                    .success(function (data, header, config, status) {
                        console.log(data);
                        if (data.ErrorCode == 0){
                            console.log("查询成功");
                            largedata = data.Data;
                            $scope.setPagingData(largedata,page,pageSize);
                        }else {
                            console.log("查询失败");
                        }
                    })
                    .error(function (data, header, config, status) {
                        console.log(data);
                    }) ;
            } else {
                $http.get("http://192.168.0.4:8080/news/select",
                    {
                        params: {
                            // shopname: ''
                        }
                    })
                    .success(function (data, header, config, status) {
                        console.log(data);
                        if (data.ErrorCode == 0){
                            console.log("查询成功");
                            largedata = data.Data;
                            $scope.setPagingData(largedata,page,pageSize);
                        }else {
                            console.log("查询失败");
                        }
                    })
                    .error(function (data, header, config, status) {
                        console.log(data);
                    }) ;
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{field: 'biaoti', displayName: '标题'},
            {field:'neirong', displayName:'内容'},
            {field:'username', displayName:'上传人'},
            {
                field: 'id',
                displayName: '操作',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                cellTemplate: '<div><button class="btn-primary" ng-click="detailClick(row.entity)">详情</button>' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                '<button class="btn-danger" ng-click="deleteClick(row.entity.id)">删除</button></div>'
            }
        ],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };

    $scope.addBtnClick = function () {
        $scope.open();
    };

    $scope.news = {
        biaoti: '',
        neirong: '',
        chuangjianren: window.localStorage.getItem('username')
    };
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'modalCtrl',
            size: size,
            resolve: {
                news: function () {
                    return $scope.news;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            // $scope.selected = selectedItem;
            // $scope.getPagedDataAsync();
            $state.reload();
        });
    };

    app.controller('modalCtrl', function($scope, $modalInstance, news) {
        $scope.news= news;

        //在这里处理要进行的操作
        $scope.add = function() {
            console.log($scope.news);
            var param = {
                biaoti: $scope.news.biaoti,
                neirong: $scope.news.neirong,
                chuangjianren: window.localStorage.getItem('username')
            }

            $http({
                method: 'POST',
                url: 'http://192.168.0.4:8080/news/insert',
                data: param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
            }).success(function (data) {
                console.log(data);
            }).error(function (data, header, config, status) {
                console.log(data);
                $scope.authError = '网络连接错误，请检查网络连接';
            }) ;

            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });



    $scope.detailClick = function (row) {
        console.log(row);
        console.log(typeof(row));
        $scope.news.biaoti = row.biaoti;
        $scope.news.neirong = row.neirong;
        $scope.news.chuangjianren = row.chuangjianren;

        $scope.openDetail();
    }
    $scope.openDetail = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myDetailModalContent.html',
            controller: 'detailModalCtrl',
            size: size,
            resolve: {
                news: function () {
                    return $scope.news;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            // $scope.selected = selectedItem;
            // $scope.getPagedDataAsync();
            // $scope.news.biaoti = '';
            // $scope.news.neirong = '';
            // $scope.news.chuangjianren = window.localStorage.getItem('username');
            $state.reload();
        });
    };

    app.controller('detailModalCtrl', function($scope, $modalInstance, news) {

        $scope.news= news;

        //在这里处理要进行的操作
        $scope.add = function() {
            $modalInstance.close();
        };
        // $scope.cancel = function() {
        //     $modalInstance.dismiss('cancel');
        // };
    });

    $scope.deleteClick = function (id) {
        console.log(id);
        var param = {id: id};
        $http({
            method: 'POST',
            url: 'http://192.168.0.4:8080/news/delete',
            data: param,
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function (data) {
            console.log(data);
            $state.reload();
        }).error(function (data, header, config, status) {
            console.log(data);
        }) ;
    }

}]);