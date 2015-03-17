BellCMS.Views.AppNavView = Marionette.ItemView.extend({
  tagName: 'nav',
  className: 'navbar navbar-default navbar-app',
  template: 'app/nav_bar',

  events: {
    'click li': 'styleNav'
  },

  styleNav: function(event){
    this.$el.find('li').removeClass('active');
    $(event.target.closest('li')).addClass('active');
  }
});