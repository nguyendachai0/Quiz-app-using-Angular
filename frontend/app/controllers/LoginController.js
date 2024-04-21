quizApp.controller('LoginController', ['$scope','$rootScope', 'AuthService', '$location', '$http','$window', function($scope, $rootScope, AuthService, $location, $http, $window) {
    $scope.credentials = {
        email: '',
        password: ''
    };

    $scope.login = function() {
        let formData = new FormData();
        formData.append('email', $scope.user.email);
        formData.append('password', $scope.user.Password);
        $http.post('http://localhost:3000/api/login', formData, {
          headers: {
              'Content-Type': undefined,
          }
          
        }).then(function(response){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user-email', response.data.email);
            $window.sessionStorage.setItem('token', response.data.token);
            $location.path('/');
          $scope.user = {}; 
        }), function(error){
          console.error('Error Login credentials', error);
        }
      };
}]);
