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
    attrs = this.model.handleAttrConv(attrs);
    // this.model.set(attrs);

    // if (this.model.isValid()){
    //   this.removeError();
    //   // on success re render and create new js model
    //   this.model.save({}, {
    //     success: function(){
    //       BellCMS.Collections.events.unshift(this.model);
    //       that.model = new BellCMS.Models.Event();
    //       that.render();
    //     }
    //   });
    // }

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
