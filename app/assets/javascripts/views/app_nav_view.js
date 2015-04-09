BellCMS.Views.AppNavView = Marionette.ItemView.extend({
  tagName: 'nav',
  className: 'app-navbar-ctr',
  template: 'app/nav_bar',

  initialize: function(){
    var that = this;

    this.navChannel = Backbone.Radio.channel('appNavChannel');
    this.navChannel.comply('updateActiveNav', function(linkName){
      this.updateActive(linkName);
    }, this);
  },

  ui: {
    'exteriorModulesLink': '.exterior-modules-link-ctr',
    'mediaGalleryLink': '.media-gallery-link-ctr'
  },

  styleNav: function(navEl){
    this.$el.find('.navbar-app-link-ctr').removeClass('active');
    navEl.addClass('active');
  },

  updateActive: function(linkName){
    if (linkName == 'exteriorModules'){
      this.styleNav(this.ui.exteriorModulesLink);
    } else if (linkName == 'mediaGallery'){
      this.styleNav(this.ui.mediaGalleryLink);
    }
  }
});
