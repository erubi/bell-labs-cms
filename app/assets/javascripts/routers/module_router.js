BellCMS.Routers.ModuleRouter = Backbone.Marionette.AppRouter.extend({
  controller: BellCMS.Controllers.ModuleController,

  appRoutes: {
    'edit_modules' : 'editModules'
  }
});
