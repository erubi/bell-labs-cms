BellCMS.Views.TabletModuleItemView = Marionette.ItemView.extend({
  tagName: 'li',
  // className: 'tablet-module-view-li',
  className: function(){
    var classes = ['tablet-module-view-li'];

    if (this.model.get('active')){
      classes.push('tablet-active-module')
    }

    return classes.join(' ');
  },

  template: 'tablet/module_item',

  initialize: function(){
    this.listenTo(this.model, "invalid", this.showError);
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click' : 'activateModule'
  },

  showError: function(event){
    var error = this.model.validationError;
    this.removeError();
    this.$el.prepend('<div class="alert alert-warning">'+error+'</div>');
  },

  removeError: function(){
    this.$el.find('.alert').remove();
  },

  activateModule: function(event){
    this.model.set('active', true);
    if (this.model.isValid()){
      this.setActiveStyle();
      this.model.collection.setRestInactive(this.model.id);
      this.model.save();
    }
  },

  setActiveStyle: function(){
    $('li').removeClass('tablet-active-module');
    this.$el.addClass('tablet-active-module');
  }

});
