BellCMS.Views.MediaContentView = Marionette.CompositeView.extend({
  className: 'media-content-ctr',
  template: 'media/content',
  childViewContainer: '#media-item-views-ctr',

  initialize: function(options){
    this.contentType = options.contentType;
    this.childView = BellCMS.Views.MediaItemView;
    this.mediaType = options.mediaType;
  },

  childViewOptions: {
    contentType: this.contentType
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
    'click @ui.nextPage': 'nextPage',
    'click .media-box' : 'highlightMediaBox'
  },

  modelEvents: {
    'sync' : 'updateView'
  },

  highlightMediaBox: function(event){
    event.preventDefault();

    this.$el.find('.media-box').removeClass('media-box-highlighted');
    $(event.currentTarget).closest('.media-box').addClass('media-box-highlighted');
  },

  currentPage: function(){
    return this.collection.state.currentPage;
  },

  prevPage: function(event){
    event.preventDefault();
    if (this.currentPage() > this.collection.state.firstPage){
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

    if (searchStr.length == 0){
      var results = this.originalCollection;
    } else {
      var results = this.searchedSubset(searchStr);
    }

    if (results){
      this.collection = results;
      this.updateView();
    } else {
      this.showError();
    }
  },

  searchedSubset: function(str){

    var results = this.originalCollection.fullCollection.filter(function(m){
      if (m.hasInFilename(str)){
        return true;
      } else if (m.hasInMetadata(str)){
        return true;
      }
    });

    if (results.length){
      return new Backbone.PageableCollection(results, {
        mode: 'client',
        state: {
          pageSize: 12
        }
      });
    } else {
      return false;
    }

  },

  updateView: function(){
    this.render();
  },

  showError: function(event){
    var error = this.model.validationError;
    this.removeError();
    this.$el.prepend('<div class="alert alert-warning">No results</div>');
  },

  removeError: function(){
    this.$el.find('.alert').remove();
  },

  showSpinner: function(){
    this.$el.find('.media-spinner').removeClass('no-display');
  },

  hideSpinner: function(){
    this.$el.find('.media-spinner').addClass('no-display');
  }

});
