BellCMS.Views.MediaUploadView = Marionette.ItemView.extend({
  className: 'media-upload-ctr',
  template: 'media/upload',

  ui: {
    progressPercentage: '#progress-percentage',
    bellLabsPeople: '#meta1',
    topLevelCategory: '#meta2',
    keywords: '#meta3',
    additionalMetadata: '#meta4',
    metadataForm: '#metadata-form'
  },

  events: {
    'click #media-upload-input-ctr':'disableMetadataEdit'
  },

  initialize: function(options){
    this.mediaType = options.mediaType;

    this.mediaChannel = Backbone.Radio.channel('mediaUpload');

    this.mediaChannel.comply({
      'showMetadata': this.showMetadata
    }, this)
  },

  onShow: function(){
    this.configureUpload();
  },

  onBeforeShow: function(){
    Backbone.Radio.channel('mediaNavChannel').command('updateActiveNav', this.model.get('name'), this.mediaType);
  },

  templateHelpers: function(){
    return {
      metadataVisibleClass: this.metadataVisible(),
      fileConstraintData: this.fileConstraintData()
    };
  },

  fileConstraintData: function(){
    var modelName = this.model.get('name');
    if (modelName == 'Media Library' && this.mediaType == 'video'){
      return {
        format: 'Format: MPEG4, H264 high L5.1, yuv420p',
        resolution: 'Resolution: 3840x1080 pixels' ,
        max_bitrate: 'Max Bitrate: 70Mpbs',
        audio: 'Audio: AAC lc, 48kHz'
      }
    } else if (modelName == 'Media Library' && this.mediaType == 'image'){
      return {
        format: 'Format: PNG',
        notes: 'Notes: Images at least 1080 pixels high recommended'
      }
    } else if (modelName == 'Bell Labs Heroes'){
      return {
        format: 'Format: PNG',
        resolution: 'Resolution: 1620x1080 pixels',
        notes: 'Notes: Heroes should be keyed-out over a transparent background'
      };
    } else if (modelName == 'Video Player'){
      return {
        format: 'Format: MPEG4, H264 high L5.1, yuv420p',
        resolution: 'Resolution: 3566x1080 pixels',
        max_bitrate: 'Max Bitrate: 70Mbps',
        audio: 'Audio: AAC lc, 48kHz'
      }
    }
  },

  metadataVisible: function(){
    if (this.model.get('name') != 'Media Library'){
      return 'no-display';
    } else {
      return '';
    }
  },

  showMetadata: function(mediaItemId){
    this.disableMetadataEdit();

    var mediaItem = this.model.mediaItems().getOrFetch(mediaItemId);
    this.ui.bellLabsPeople.val(mediaItem.get('bell_labs_people'));
    this.ui.topLevelCategory.val(mediaItem.get('top_level_category'));
    this.ui.keywords.val(mediaItem.get('keywords'));
    this.ui.additionalMetadata.val(mediaItem.get('additional_metadata'));

    this.setUpMetadataEdit(mediaItemId);
  },

  setUpMetadataEdit: function(mediaItemId){
    var that = this;

    this.ui.metadataForm.on('change', function(){
      var data = that.ui.metadataForm.serializeJSON();
      that.mediaChannel.command('updateMetadata' + mediaItemId, mediaItemId, data);
    });
  },

  disableMetadataEdit: function(){
    this.ui.metadataForm.unbind('change');
    this.mediaChannel.command('unhighlightMediaBox');
    this.ui.metadataForm.find('input[type="text"]').val('');
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

      stop: function(e, data){
        that.render();
        that.model.fetch();
        that.configureUpload();
      },

      progressall: function(e, data){
        var percent = parseInt(data.loaded / data.total * 100, 10);
        that.ui.progressPercentage.text(percent + '%');
      }
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
