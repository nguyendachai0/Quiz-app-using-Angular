
angular.module('quizApp')
    .controller('RegisterController', ['$scope', 'AuthService', '$location','$http', function($scope, AuthService, $location, $http) {
        // $scope.user = {
        //     username: '',
        //     password: ''
        // };
        $scope.register = function() {
          let formData = new FormData();
          formData.append('email', $scope.user.Email);
          formData.append('password', $scope.user.Password);
       
          $http.post('http://localhost:3000/api/register', formData, {
            headers: {
                'Content-Type': undefined,
            }
          }).then(function(response){
            console.log('Registered successfully', response);
            $scope.user = {}; 
          }), function(error){
            console.error('Error registering user', error);
          }
        };
    }]);
