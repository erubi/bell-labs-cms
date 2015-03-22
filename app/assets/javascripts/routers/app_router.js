BellCMS.Routers.AppRouter = Backbone.Marionette.AppRouter.extend({

  // uses app_controller.js

  appRoutes: {
    '' : 'root',
    'exterior_modules' : 'exteriorModules',
    'media' : 'media',
    'tablet' : 'tablet'
  }
});

