'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state, toaster) {
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function(){
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    };
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      // $http.get('http://188.131.148.208:8087/users/login',
      //     {
      //         username: $scope.user.username,
      //         password: $scope.user.password
      //     })
      // .then(function(response) {
      //     console.log(response.data);
      //   if ( !response.data.user ) {
      //     $scope.authError = '用户名或密码错误';
      //   }else{
      //     $state.go('app.table.footable');
      //   }
      // }, function(x) {
      //   $scope.authError = '网络连接错误，请检查网络连接';
      // });
      //   $state.go('app.table.grid');
        $http.get("http://192.168.0.4:8080/user/login",
            {
                params: {
                    username: $scope.user.username,
                    password: $scope.user.password
                }
            })
            .success(function (data, header, config, status) {
                console.log(data);
                if (data.ErrorCode == 0){
                    window.localStorage.setItem('username', data.Data.name);
                    window.localStorage.setItem('password', data.Data.password);
                    $state.go('app.table.grid');
                }else {
                    $scope.authError = '用户名或密码错误';
                }
            })
            .error(function (data, header, config, status) {
                console.log(data);
                $scope.authError = '网络连接错误，请检查网络连接';
            }) ;
    };
  }])
;