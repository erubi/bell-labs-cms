BellCMS.Views.ModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul',
  template: 'exterior_modules/module_composite',
  childView: BellCMS.Views.ModuleItemView
});
