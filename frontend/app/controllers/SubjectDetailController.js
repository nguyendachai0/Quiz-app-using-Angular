quizApp
    .controller('SubjectDetailController', ['$scope','$routeParams', 'SubjectsService', function ($scope,$routeParams, SubjectsService) {
        var courseId = $routeParams.id;
        $scope.subject = [];
        SubjectsService.getSubjectById(courseId).then(function(data) {
            $scope.subject = data;
            console.log($scope.subject)
        });
     
            
    
    }]);