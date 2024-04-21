quizApp.service('QuizStateService', function() {
    var state = {
        currentQuestionIndex: 0,
        points: 0
    };

    return {
        getState: function() {
            return state;
        },
        setCurrentQuestionIndex: function(index) {
            state.currentQuestionIndex = index;
        },
        setPoints: function(points) {
            state.points = points;
        }
    };
});
