BellCMS.Views.EventNewView = Marionette.ItemView.extend({
  template: 'events/new',

  initialize: function(){
    this.model = new BellCMS.Models.Event();
    this.listenTo(this.model, "invalid", this.showError);
  },

  events: {
    'click #save-new-event' : 'createEvent'
  },

  createEvent: function(event){
    event.preventDefault();

    var attrs = this.$el.find('form').serializeJSON();
    this.model.set(attrs);

    if (this.model.isValid()){
      this.removeError();
      BellCMS.Collections.events.unshift(this.model);
      // on success re render and create new js model
      this.model.save([], {
        success: function(){
          this.model = new BellCMS.Models.Event();
        }
      });
    }
  },

  showError: function(event){
    var error = this.model.validationError;
    this.removeError();
    this.$el.prepend('<div class="alert alert-warning">'+error+'</div>');
  },

  removeError: function(){
    this.$el.find('.alert').remove();
  }


});
