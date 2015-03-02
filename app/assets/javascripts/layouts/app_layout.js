BellCMS.Layouts.AppLayoutView = Marionette.LayoutView.extend({
  el: BellCMS.Container,

  template: 'app/layout',

  regions: {
    appNav: "#app-nav",
    contentContainer: "#content-container"
  }
});
