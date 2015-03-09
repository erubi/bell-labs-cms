BellCMS.Layouts.AppLayoutView = Marionette.LayoutView.extend({
  el: '#app-container',

  template: 'app/layout',

  regions: {
    appNav: "#app-nav",
    contentContainer: "#content-container"
  },

  // https://github.com/marionettejs/backbone.marionette/issues/2227
  onRender:  function(){
    // sugar for layoutView.getRegion('menu').show(new MenuView());
    this.showChildView('appNav', new BellCMS.Views.AppNavView());
    // might want to show first tab view here by default
  }
});
