BellCMS.Views.ModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul',
  template: 'exterior_modules/module_composite',
  initialize: function(){
    this.childView = BellCMS.Views.ModuleItemView;
  }
});
