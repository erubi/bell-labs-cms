BellCMS.Views.EventItemView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'event-view-li',
  template: 'events/event_item',

  templateHelpers: function(){
    return {
      startISO: this.model.startISO(),
      endISO: this.model.endISO(),
      eventISO: this.model.eventISO()
    }
  },

  events: {
    'click .delete-event-btn' : 'deleteEvent',
    'change input' : 'updateEvent'
  },

  modelEvents: {
    'destroy' : 'modelDestroyed',
    'invalid' : 'showError'
  },

  modelDestroyed: function(){
    this.destroy();
  },

  deleteEvent: function(event){
    event.preventDefault();
    this.model.destroy();
  },

  updateEvent: function(event){
    event.preventDefault();
    var that = this;

    var attrs = this.$el.find('form').serializeJSON();
    attrs = this.model.handleAttrConv(attrs);
    this.model.set(attrs);

    if (this.model.isValid()){
      this.removeError();
      this.model.save();
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
