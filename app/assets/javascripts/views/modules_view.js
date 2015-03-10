BellCMS.Views.ModuleLayoutView = Marionette.CompositeView.extend({
  tagName: 'ul',
  template: 'exterior_modules/module_layout',
  childView: BellCMS.Views.ModuleItemView
});
