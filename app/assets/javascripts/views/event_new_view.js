BellCMS.Views.EventNewView = Marionette.ItemView.extend({
  template: 'events/new',

  initialize: function(){
    this.model = new BellCMS.Models.Event();
  },

  events: {
    'click #save-new-event' : 'createEvent'
  },

  createEvent: function(event){
    event.preventDefault();

    var attrs = this.$el.find('form').serializeJSON();
    this.model.set(attrs);

    if (this.model.isValid()){
      BellCMS.Collections.events.unshift(this.model);
      // on success re render and create new js model
      this.model.save([], {
        success: function(){
          this.model = new BellCMS.Models.Event();
          this.render();
        }
      });
    }
  }


});
