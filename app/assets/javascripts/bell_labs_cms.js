var BellLabsCMS = Marionette.Application.extend({
  initialize: function(options){
  }
});

BellLabsCMS.on('start', function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});

$(document).ready(function(){
  var bellCMS = new BellLabsCMS({});
  bellCMS.start();
});
