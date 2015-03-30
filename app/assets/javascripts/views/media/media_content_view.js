BellCMS.Views.MediaContentView = Marionette.CompositeView.extend({
  className: 'media-content-ctr',
  template: 'media/content',
  childViewContainer: '#media-item-views-ctr',

  initialize: function(options){
    this.contentType = options.contentType;
    this.childView = BellCMS.Views.MediaItemView;
  },

  ui: {
    searchbox: '#media-search-input',
    searchform: '#media-search-form'
  },

  events: {
    'submit #media-search-form' : 'searchMedia',
    'click #media-search-btn' : 'searchMedia'
  },

  searchMedia: function(event){
    event.preventDefault();
    var searchStr = this.ui.searchbox.val();

    if (!this.originalCollection){
      this.originalCollection = this.collection;
    }

    this.collection = this.originalCollection.searchedSubset(searchStr);
    this.updateView();
  },

  modelEvents: {
    'sync' : 'updateView'
  },

  updateView: function(){
    this.render();
  }

});
