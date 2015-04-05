BellCMS.Views.MediaUploadView = Marionette.ItemView.extend({
  className: 'media-upload-ctr',
  template: 'media/upload',

  ui: {
    progressPercentage: '#progress-percentage',
    bellLabsPeople: '#meta1',
    topLevelCategory: '#meta2',
    keywords: '#meta3',
    additionalMetadata: '#meta4',
  },

  initialize: function(){
    this.mediaChannel = Backbone.Radio.channel('mediaUpload');
    this.mediaChannel.comply({
      'showMetadata': this.showMetadata
    }, this)
  },

  onShow: function(){
    this.configureUpload();
  },

  showMetadata: function(mediaItemId){
    var mediaItem = this.model.mediaItems().getOrFetch(mediaItemId);
    this.ui.bellLabsPeople.val(mediaItem.get('bell_labs_people'));
    this.ui.topLevelCategory.val(mediaItem.get('top_level_category'));
    this.ui.keywords.val(mediaItem.get('keywords'));
    this.ui.additionalMetadata.val(mediaItem.get('additional_metadata'));
  },

  configureUpload: function(){
    var that = this;
    // need to pass in media type(image or video) w/ formData
    $('#upload-media').fileupload({
      url: 'api/upload_media',
      type: 'put',
      dataType: 'json',

      add: function(e, data){
        $('.file-name-text').val(data.files[0].name);
        $('#upload-btn').on('click', function(){
          data.submit();
        });
      },

      submit: function(e, data){
        data.formData = that.grabFormData(data);
      },

      done: function(e, data){
        that.render();
        that.model.fetch();
        that.configureUpload();
        // that.mediaChannel
      }
    });

    $('#upload-media').bind('fileuploadprogress', function (e, data) {
      var percent = (data.loaded/data.total);
      that.ui.progressPercentage.text(percent);
    });
  },

  grabFormData: function(data){
    var formDataHash = {};
    var metadata = {};
    var fileTypeStr;
    var fileType;

    metadata= $('#metadata-form').serializeJSON();
    formDataHash['module_name'] = this.model.get('name');
    fileTypeStr = data.files[0].type;


    if ((/\/(gif|jpg|jpeg|tiff|png)$/i).test(fileTypeStr)) {
      fileType = 'image';
    } else if ((/\/(mov|mp4|mkv|avi)$/i).test(fileTypeStr)){
      fileType = 'video';
    }

    formDataHash['metadata'] = JSON.stringify(metadata);
    formDataHash['file_type'] = fileType;
    return formDataHash;
  }
});
