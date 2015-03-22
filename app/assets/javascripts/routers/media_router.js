BellCMS.Routers.MediaRouter = Backbone.Marionette.AppRouter.extend({

  // uses media_controller.js

  appRoutes: {
    'image_library' : 'imageLibrary',
    'video_library' : 'videoLibrary',
    'video_player_media' : 'videoPlayerMedia',
    'bell_labs_heroes_media' : 'bellHeroesMedia'
  }
});

