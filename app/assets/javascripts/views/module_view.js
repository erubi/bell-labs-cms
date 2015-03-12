BellCMS.Views.ModuleItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'module-view-li',
  template: 'exterior_modules/module_item',

  initialize: function(){
    // this.listenTo(this.model, "sync", this.render)
  },

  events: {
    'change .weight-input' : 'updateModelWeight'
  },

  updateModelWeight: function(event){
    var weight = event.target.value / 100;
    this.model.set('weight', weight);

    if (this.model.isValid()){
      this.model.save();
    }
  }

});
