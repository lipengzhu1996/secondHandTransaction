'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {
        username: '',
        password: ''
    };
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      if ($scope.user.password != $scope.user.againpassword){
          $scope.authError = '两次密码输入不一致';
          return;
      }
        $http.get("http://192.168.0.4:8080/user/createUser",
            {
                params: {
                    username: $scope.user.username,
                    password: $scope.user.password
                }
            })
            .success(function (data, header, config, status) {
                console.log(data);
                if (data.ErrorCode == 0){
                    window.localStorage.setItem('username', data.config.username);
                    window.localStorage.setItem('password', data.config.password);
                    $state.go('app.table.grid');
                }else {
                    $scope.authError = '注册失败';
                }
            })
            .error(function (data, header, config, status) {
                console.log(data);
                $scope.authError = '网络连接错误，请检查网络连接';
            }) ;
    };
  }])
 ;