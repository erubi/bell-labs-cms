BellCMS.Views.MediaNavView = Marionette.ItemView.extend({
  tagName: 'nav',
  className: 'media-nav-ctr clearfix',
  template: 'media/nav_bar',

  initialize: function(){
    var that = this;
    this.navChannel = Backbone.Radio.channel('mediaNavChannel');

    this.navChannel.comply('updateActiveNav', function(moduleName, mediaType){
      that.updateActive(moduleName, mediaType);
    }, this);
  },

  ui: {
    'videoPlayerLink': '#video-player-link',
    'bellLabsHeroesLink': '#bell-labs-heroes-link',
    'mediaLibraryVideoLink': '#media-library-video-link',
    'mediaLibraryImageLink': '#media-library-image-link'
  },

  styleNav: function(navEl){
    this.$el.find('li').removeClass('active');
    navEl.addClass('active');
  },

  updateActive: function(moduleName, mediaType){
    if (moduleName == 'Video Player'){
      this.styleNav(this.ui.videoPlayerLink);
    } else if (moduleName == 'Bell Labs Heroes'){
      this.styleNav(this.ui.bellLabsHeroesLink);
    } else if (moduleName == 'Media Library' && mediaType == 'video'){
      this.styleNav(this.ui.mediaLibraryVideoLink);
    } else if (moduleName == 'Media Library' && mediaType == 'image'){
      this.styleNav(this.ui.mediaLibraryImageLink);
    }
  }
});
