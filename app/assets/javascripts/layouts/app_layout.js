BellCMS.Layouts.AppLayoutView = Marionette.LayoutView.extend({
  el: BellCMS.Container,

  regions: {
    appNav: "#app-nav",
    contentContainer: "#content-container"
  }
});
