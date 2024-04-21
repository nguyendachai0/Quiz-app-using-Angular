var quizApp = angular.module('quizApp', ['ngRoute']);
quizApp.config(['$locationProvider', function($locationProvider) {  
    $locationProvider.hashPrefix('');
}]);
quizApp.config([`$routeProvider`, function ($routeProvider) {
   
    $routeProvider
        .when('/', {
            templateUrl: 'frontend/views/client/static/home.html'
        })
        .when('/about', {
            templateUrl: 'frontend/views/client/static/about.html'
        })
        .when('/contact', {
            templateUrl: 'frontend/views/client/static/contact.html'
        })
        .when('/course', {
            templateUrl: 'frontend/views/client/courses/courses.html',
            controller: 'CourseController',
        })
        .when('/course/:slug', {
            templateUrl: 'frontend/views/client/subjects/subjects.html',
            controller: 'SubjectsController',
        })
        .when('/course/:slug/subject/:id', {
            templateUrl: 'frontend/views/client/subjects/subject-detail.html',
            controller: 'SubjectsController',
        })
        .when('/course/:slug/subject/:subjectId/test', {
            templateUrl: 'frontend/views/client/tests/quiz.html',
            controller: 'QuizController',
        })
        .when('/course/:courseId/subject/:subjectId/test/:testId/quiz/:quizId', {
            templateUrl: 'frontend/views/client/tests/doQuiz.html',
            controller: 'QuizController',
        })
       
        .when('/course/:courseId/subject/:subjectId/test/:testId/result', {
            templateUrl: 'frontend/views/client/tests/result.html',
            controller: 'QuizController',
        })
       
        .when('/login', {
            templateUrl: 'frontend/views/auth/login.html',
            controller: 'LoginController'

        })
        .when('/register', {
            templateUrl: 'frontend/views/auth/register.html',
            controller: 'RegisterController'
        })
        .when('/resetpassword', {
            templateUrl: 'frontend/views/auth/reset-password.html'
        })
        .when('/profile', {
            templateUrl: 'frontend/views/auth/profile.html'
        })
        .when('/quiz', {
            templateUrl: 'frontend/views/client/tests/quiz.html'
        })
        .when('/result', {
            templateUrl: 'frontend/views/client/tests/result.html'
        })
        .when('/q&a', {
            templateUrl: 'frontend/views/client/static/q&a.html'
        })

       
       
}])

