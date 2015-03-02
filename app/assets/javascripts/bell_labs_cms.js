Backbone.Marionette.Renderer.render = function(template, data){
  return JST[template](data);
};

var BellCMS = Marionette.Application.extend({
  initialize: function(options){
    this.mergeOptions(options);
  }
});

var BellCMS = new BellCMS({
  Container: $('#app-container'),
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

  BellCMS.Collections.events.fetch();
  BellCMS.Collections.modules.fetch();
});

BellCMS.on('start', function(options){

  // initialize app router
  new BellCMS.Routers.AppRouter({
    controller: BellCMS.Controllers.AppController
  });

  // initialize root layout view
  new BellCMS.Layouts.AppLayoutView();

  if (Backbone.history){
    Backbone.history.start();
  }
});

$(function(){
  // can pass options to start event callbacks here
  BellCMS.start({});
});
