BellCMS.Routers.MediaRouter = Backbone.Marionette.AppRouter.extend({

  // uses media_controller.js

  appRoutes: {
    'image_library' : 'imageLibrary',
    'media_library' : 'mediaLibrary'
  }
});

