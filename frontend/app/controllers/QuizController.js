quizApp.controller('QuizController', ['$scope', 'QuizService', '$routeParams','$location','$rootScope', 'QuizStateService', function($scope, QuizService, $routeParams,$location, $rootScope, QuizStateService ) {
    $scope.quizQuestions = [];
    $scope.courseId = $routeParams.courseId;
    $scope.subjectId = $routeParams.subjectId; 
    $scope.testId = parseInt($routeParams.testId);
    $scope.quizId = parseInt($routeParams.quizId);
    $scope.selectedAnswer = null;
    var state = QuizStateService.getState();
    $scope.currentQuestionIndex = state.currentQuestionIndex;
    $rootScope.points = state.points;
    QuizService.getQuizQuestions($scope.subjectId).then(function(data) {
       $scope.quizQuestions = data;
       $scope.tests = QuizService.getTests(data);
       $scope.quiz = $scope.tests[$scope.testId - 1][$scope.quizId - 1];
       console.log($scope.quiz);
    });
    $scope.nextQuestion = function() {
        if ($scope.currentQuestionIndex < $scope.quizQuestions.length - 1) {
            $scope.currentQuestionIndex++;
            console.log($scope.currentQuestionIndex);
            $scope.quiz = $scope.tests[$scope.testId - 1][$scope.quizId - 1];
            $scope.changeQuiz('right');
        }
    };

    $scope.prevQuestion = function() {
        console.log($scope.currentQuestionIndex);
        if ($scope.currentQuestionIndex > 0) {
            $scope.currentQuestionIndex--;
            $scope.quiz = $scope.tests[$scope.testId - 1][$scope.quizId - 1];
            console.log($scope.quiz);
            $scope.changeQuiz('left');

        }
    };

    $scope.changeQuiz = function(direction) {
        console.log(direction);
        if (direction === 'right') {
            if ($scope.quizId < $scope.tests[$scope.testId].length) {
                $scope.quizId += 1;
            } else {
                // Handle case when no more quizzes in the test
            }
        } else if (direction === 'left') {
            if ($scope.quizId > 1) {
                $scope.quizId -= 1;
            } else {
                // Handle case when already at the first quiz
            }
        }
      
        QuizStateService.setCurrentQuestionIndex($scope.currentQuestionIndex);
        QuizStateService.setPoints($rootScope.points);
        console.log($scope.currentQuestionIndex);
        console.log($rootScope.points);
        // Update route parameters with new quizId
        $location.path(`/course/${$scope.courseId}/subject/${$scope.subjectId}/test/${$scope.testId}/quiz/${$scope.quizId}`);
    }
    $scope.checkAnswer = function() {
        var correctAnswer = $scope.quiz.AnswerId;
        console.log(correctAnswer);
        console.log($scope.selectedAnswer);
        console.log('h');
        if ($scope.selectedAnswer === correctAnswer) {
            $rootScope.points += 1;
            console.log("Đúng!");
        } else {
            console.log("Sai!");
        }
    };
    $scope.finishQuiz = function() {
            
            $location.path(`/course/${$scope.courseId}/subject/${$scope.subjectId}/test/${$scope.testId}/result`);
            
       
    };
    
    
    
}]);
