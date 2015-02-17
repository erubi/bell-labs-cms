var bellCMS = new Marionette.Application();

bellCMS.on('start', function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});

$(function(){
  bellCMS.start();
});
