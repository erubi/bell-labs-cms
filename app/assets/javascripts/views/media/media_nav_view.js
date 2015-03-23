BellCMS.Views.MediaNavView = Marionette.ItemView.extend({
  tagName: 'nav',
  className: 'top-media-nav navbar navbar-default navbar-app',
  template: 'media/nav_bar',

  events: {
    'click li': 'styleNav'
  },

  styleNav: function(event){
    this.$el.find('li').removeClass('active');
    $(event.target.closest('li')).addClass('active');
  }
});
