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
    var that = this;

    var attrs = this.$el.find('form').serializeJSON();
    attrs = this.handleAttrConv(attrs);
    this.model.set(attrs);

    if (this.model.isValid()){
      this.removeError();
      // on success re render and create new js model
      BellCMS.Collections.events.unshift(this.model);
      this.model.save([], {
        success: function(){
          that.model = new BellCMS.Models.Event();
          that.render();
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
  },

  handleAttrConv: function(attrs){
    // should convert iso date attrs to moment dates
    var startAttr = attrs['start_time_ms'];
    var endAttr = attrs['end_time_ms'];

    if ((startAttr == "") || (endAttr == "")){
      return attrs;
    }

    var startMs = this.convertIsoToMs(startAttr);
    var endMs = this.convertIsoToMs(endAttr);

    attrs['start_time_ms'] = startMs;
    attrs['end_time_ms'] = endMs;

    return attrs;
  },

  convertIsoToMs: function(isoString){
    var time = moment(isoString);
    var offset = time.local().utcOffset();
    time.add(offset, 'minutes');
    var ms = time.valueOf();
    return ms;
  }

});
