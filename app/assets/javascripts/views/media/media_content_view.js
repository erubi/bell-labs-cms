BellCMS.Views.MediaContentView = Marionette.CompositeView.extend({
  className: 'media-content-ctr',
  template: 'media/content',
  childViewContainer: '#media-item-views-ctr',

  initialize: function(options){
    this.contentType = options.contentType;
    this.childView = BellCMS.Views.MediaItemView;
    this.mediaType = options.mediaType;
    // this.originalCollection = this.collection;
    // this.collection = this.originalCollection.getFirstPage();
  },

  childViewOptions: {
    contentType: this.contentType
  },

  filter: function (child, index, collection) {
    return child.get('media_type') == this.mediaType;
  },

  ui: {
    searchbox: '#media-search-input',
    searchform: '#media-search-form',
    prevPage: '#media-prev-page',
    nextPage: '#media-next-page'
  },

  events: {
    'submit #media-search-form' : 'searchMedia',
    'click #media-search-btn' : 'searchMedia',
    'click @ui.prevPage': 'prevPage',
    'click @ui.nextPage': 'nextPage'
  },

  currentPage: function(){
    return this.collection.state.currentPage;
  },

  prevPage: function(event){
    event.preventDefault();
    if (this.currentPage() > 1){
      this.collection.getPreviousPage();
      this.render();
    }
  },

  nextPage: function(event){
    event.preventDefault();
    if (this.currentPage() < this.collection.state.lastPage){
      this.collection.getNextPage();
      this.render();
    }
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
