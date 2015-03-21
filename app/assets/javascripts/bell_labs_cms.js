Backbone.Marionette.Renderer.render = function(template, data){
  return JST[template](data);
};

var BellCMS = Marionette.Application.extend({
  initialize: function(options){
    this.mergeOptions(options);
  }
});

var BellCMS = new BellCMS({
  Routers: {},
  Controllers: {},
  Views: {},
  Models: {},
  Collections: {},
  Behaviors: {},
  Modules: {},
  Layouts: {}
});

BellCMS.on('before:start', function(options){
  // should fetch necessary models/collections here
  BellCMS.Collections.events = new BellCMS.Collections.Events();
  BellCMS.Collections.modules = new BellCMS.Collections.Modules();
  BellCMS.Models.configModel = new BellCMS.Models.ConfigModel();

  BellCMS.Collections.events.fetch();
  BellCMS.Collections.modules.fetch();
  BellCMS.Models.configModel.fetch();
});

BellCMS.on('start', function(options){

  // initialize app router
  new BellCMS.Routers.AppRouter({
    controller: BellCMS.Controllers.AppController
  });

  new BellCMS.Routers.MediaRouter({
    controller: BellCMS.Controllers.MediaController
  });

  // initialize root layout view
  BellCMS.rootView = new BellCMS.Layouts.AppLayoutView();
  BellCMS.rootView.render();

  if (Backbone.history){
    Backbone.history.start();
  }

});

