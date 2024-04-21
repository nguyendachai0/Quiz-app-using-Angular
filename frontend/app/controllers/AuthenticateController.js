quizApp.controller('AuthenticateController', ['$scope', function($scope) {
    $scope.isAuthenticated = function() {
        return localStorage.getItem('token') !== null;
    };
    $scope.getUserEmail = function() {
        const token = localStorage.getItem('token');
       var email = localStorage.getItem('user-email');
       var parts = email.split('@');
       var username = parts[0];
        return username;
    };
}]);
