BellCMS.Views.TabletModuleCompositeView = Marionette.CompositeView.extend({
  tagName: 'ul',
  className: 'module-view-ul',
  template: 'tablet/module_composite',
  childView: BellCMS.Views.TabletModuleItemView
});
