quizApp.controller('SubjectsController', ['$scope', '$routeParams', 'SubjectsService', function ($scope, $routeParams, SubjectsService) {
    $scope.subjects = [];
    $scope.filteredSubjects = [];
    $scope.courses = [
            
        {
            name: 'Khóa học Android',
            slug: 'khoa-hoc-android',
            subjects: ['Lập trình Android nâng cao', 'Lập trình Android cơ bản', 'Kiểm thử và triển khai ứng dụng Android', 'Thiết kế giao diện trên Android']
        },
        {
            name: 'Khóa học DotNet',
            slug: 'khoa-hoc-dotnet',
            subjects: ['Lập trình ASP.NET', 'Lập trình VB.NET', 'Điện toán đám mây']
        },
        {
            name: 'Khóa học Dữ liệu',
            slug: 'khoa-hoc-du-lieu',
            subjects: ['SQL Server', 'Cơ sở dữ liệu']
        },
        {
            name: 'Khóa học Game',
            slug: 'khoa-hoc-game',
            subjects: ['Lập trình game 2D', 'Quản lý dự án với Agile']
        },
        {
            name: 'Khóa học Java',
            slug: 'khoa-hoc-java',
            subjects: ['Lập trình hướng đối tượng với Java', 'Lập trình Java nâng cao']
        },
        {
            name: 'Khóa học Lập trình Web',
            slug: 'khoa-hoc-lap-trinh-web',
            subjects: ['HTML5 và CSS3', 'Internet Marketing', 'Lập trình JavaScript', 'Thiết kế layout', 'Thiết kế web cho điện thoại di động', 'Lập trình PHP', 'Xây dựng trang web']
        }
];

    SubjectsService.getSubjects().then(function(data) {
        var slug = $routeParams.slug;
            $scope.subjects = data;
            $scope.filteredSubjects = $scope.courses.filter(function(course) {
                return course.slug === slug;
            });
            $scope.subjects = $scope.subjects.filter(function(subject) {
                return $scope.filteredSubjects[0].subjects.includes(subject.Name);
            });
            console.log($scope.subjects);
            if($routeParams.id){
                $scope.subjects = $scope.subjects.filter(function(subject) {
                    return subject.Id === $routeParams.id;
                });
            }
        });
         
       
    }]);
  
