BellCMS.Views.MediaUploadView = Marionette.ItemView.extend({
  className: 'media-upload-ctr',
  template: 'media/upload',

  ui: {
    progressPercentage: '#progress-percentage'
  },

  onShow: function(){
    this.configureUpload();
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
      }
    });

    $('#upload-media').bind('fileuploadprogress', function (e, data) {
      // Log the current bitrate for this upload:
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
