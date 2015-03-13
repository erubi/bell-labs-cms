BellCMS.Routers.AppRouter = Backbone.Marionette.AppRouter.extend({

  // uses app_controller.js

  appRoutes: {
    '' : 'root',
    'exterior_modules' : 'exteriorModules',
    'presentation_modes' : 'presentationModes',
    'media' : 'media',
    'tablet' : 'tablet'
  }
});

