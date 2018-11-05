app.controller('GridDemoCtrl', ['$scope', '$http', '$modal', '$state', function($scope, $http, $modal, $state) {

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
                $http.get("http://192.168.0.4:8080/commodity/select",
                    {
                        params: {
                            shopname: searchText
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
                $http.get("http://192.168.0.4:8080/commodity/select",
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
        columnDefs: [{field: 'shopname', displayName: '商品名称'},
            {field:'fenlei', displayName:'类别'},
            {field:'guige', displayName:'规格'},
            {field:'jiage', displayName:'价格'},
            {field:'username', displayName:'上传人'},
            {
                field: 'id',
                displayName: '操作',
                enableCellEdit: false,
                sortable: false,
                pinnable: false,
                cellTemplate: '<div><button class="btn-primary" ng-click="detailClick(row.entity)">详情</button></div>'
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

    $scope.product = {
        productName: '',
        productCategory: '',
        productGuige: '',
        productJiaGe: '',
        file: ''
    };
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'modalCtrl',
            size: size,
            resolve: {
                product: function () {
                    return $scope.product;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $state.reload();
        });
    };

    app.controller('modalCtrl', function($scope, $modalInstance, product) {
        $scope.product= product;

        //在这里处理要进行的操作
        $scope.add = function() {
            console.log($scope.product);
            var fileInput = document.querySelector("#fileInput").files[0];
            var reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = function (evt) {
                console.log(evt)
                console.log(evt.target.result)
                $scope.product.file = evt.target.result + '';
                var param = {
                    tupian: $scope.product.file,
                    shopname: $scope.product.productName,
                    guige: $scope.product.productGuige,
                    jiage: $scope.product.productJiaGe,
                    fenlei: $scope.product.productCategory,
                    username: window.localStorage.getItem('username')
                }

                $http({
                    method: 'POST',
                    url: 'http://192.168.0.4:8080/commodity/insert',
                    data: param,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
                }).success(function (data) {
                    console.log(data);
                }).error(function (data, header, config, status) {
                    console.log(data);
                    $scope.authError = '网络连接错误，请检查网络连接';
                }) ;
            }

            $modalInstance.close();
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });

    $scope.detailClick = function (row) {
        console.log(row);
        console.log(typeof(row));
        $scope.product.productCategory = row.fenlei;
        $scope.product.productJiaGe = row.jiage;
        $scope.product.productGuige = row.guige;
        $scope.product.productName = row.shopname;
        $scope.product.file = row.tupian;
        $scope.product.username = row.username;

        $scope.openDetail();
    }
    $scope.openDetail = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myDetailModalContent.html',
            controller: 'detailModalCtrl',
            size: size,
            resolve: {
                product: function () {
                    return $scope.product;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
        });
    };

    app.controller('detailModalCtrl', function($scope, $modalInstance, product) {

        $scope.product= product;

        //在这里处理要进行的操作
        $scope.add = function() {
            $modalInstance.close();
        };
    });

}]);