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
            this.setupRender();
        },

        setupRender: function() {
            Adapt.on('componentView:preRender', this.onPreRender);
            Adapt.on('componentView:postRender', this.onComponentPostRender);
        },

        onPreRender: function(view) {
            if (view.model.get('_questionScore')) {
                view.model.set({'score': 0});
            }
            
        },

        onComponentPostRender: function(view) {
            if(view.model.get('_questionScore')){
                view.listenTo(view.model, "change:_isComplete", ScoringHandler.addScore);
            }
        },

        addScore: function(vm){
            let attempts = vm.get('_attempts') - vm.get('_attemptsLeft'),
            ansIndex = vm.get('_selectedItems'),
            qScore = vm.get('_questionScore');
            ansIndex = ansIndex[0]._index;
            vm.set("score", qScore[ansIndex][attempts]);
        }

    }, Backbone.Events);

    ScoringHandler.initialize();

    return ScoringHandler;
});


