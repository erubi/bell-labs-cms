BellCMS.Views.AppNavView = Marionette.ItemView.extend({
  tagName: 'nav',
  className: 'app-navbar-ctr',
  template: 'app/nav_bar',

  events: {
    'click .navbar-app-link-ctr': 'styleNav'
  },

  styleNav: function(event){
    this.$el.find('.navbar-app-link-ctr').removeClass('active');
    $(event.target.closest('.navbar-app-link-ctr')).addClass('active');
  }
});
