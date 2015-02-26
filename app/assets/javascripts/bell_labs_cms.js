var BellCMS = Marionette.Application.extend({
  initialize: function(options){
    this.mergeOptions(options);
  }
});

var BellCMS = new BellCMS({
  Container: '#app-container',
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
});

BellCMS.on('start', function(options){
  if (Backbone.history){
    Backbone.history.start();
  }

  // initialize app router
  new BellCMS.Routers.RootRouter({
    controller: BellCMS.Controllers.RootController
  });

  // initialize root layout view
  new BellCMS.Layouts.RootLayoutView();
});

$(function(){
  // can pass options to start event callbacks here
  BellCMS.start({});
});
