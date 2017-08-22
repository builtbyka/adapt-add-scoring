define([
    'coreJS/adapt'
], function(Adapt) {

    var ScoringHandler = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, {
                "app:dataReady": this.onAppDataReady
            });
        },

        onAppDataReady: function() {
            Adapt.course.set("_allQuestionsScore", 0);
            this.setupRender();
        },

        setupRender: function() {
            Adapt.on('componentView:preRender', this.onComponentPreRender);
            Adapt.on('componentView:postRender', this.onComponentPostRender);
        },

        onComponentPreRender: function(view) {
            if (view.model.get('_questionScore')) {
                view.model.set({'_questionScoreResult': 0});
            }
            
        },

        onComponentPostRender: function(view) {
            if(view.model.get('_questionScore')){
                view.listenTo(view.model, "change:_isInteractionComplete", ScoringHandler.addScore);
            }
        },

        addScore: function(vm){
            //sum to determine how many attempts have been made
            var attempts = vm.get('_attempts') - vm.get('_attemptsLeft'),
            //get answer when either correct or all attempts used
            ansIndex = vm.get('_selectedItems'),
            ansIndex = ansIndex[0]._index,
            //get the scoring for this question
            qScore = vm.get('_questionScore'),
            //get score from all questions regardless of assessment - based on course
            prevScore = Adapt.course.get('_allQuestionsScore');
            //add score for this question to question model
            //vm.set("_questionScoreResult", qScore[ansIndex][attempts]);
            //add score for this question to all question scores for this course
            Adapt.course.set('_allQuestionsScore', (prevScore + qScore[ansIndex][attempts]));
            //if(Adapt.config.shouldSubmitQuestionScore) Adapt.offlineStorage.set('questionScore', (prevScore + qScore[ansIndex][attempts]));
        }

    }, Backbone.Events);

    ScoringHandler.initialize();

    return ScoringHandler;
});


