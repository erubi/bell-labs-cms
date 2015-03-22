BellCMS.Views.EventNewView = Marionette.ItemView.extend({
  template: 'events/new',
  className: 'events-new-ctr',

  initialize: function(){
    this.model = new BellCMS.Models.Event();
    this.listenTo(this.model, "invalid", this.showError);
  },

  events: {
    'click #save-new-event' : 'createEvent',
  },

  createEvent: function(event){
    event.preventDefault();
    var that = this;

    var attrs = this.$el.find('form').serializeJSON();
    attrs = this.model.handleAttrConv(attrs);

    this.model.save(attrs, {
      success: function(){
          that.removeError();
          BellCMS.Collections.events.unshift(that.model);
          that.model = new BellCMS.Models.Event();
          that.render();
      }
    });
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
