BellCMS.Views.MediaUploadView = Marionette.ItemView.extend({
  className: 'media-upload-ctr',
  template: 'media/upload',

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
        $('#upload-btn').on('click', function(){
          data.submit();
        });
      },

      submit: function(e, data){
        data.formData = that.grabFormData(data);
      },

      done: function(e, data){
      }
    });
  },

  grabFormData: function(data){
    var metadataHash;
    var fileTypeStr;
    var fileType;

    metadataHash= $('#metadata-form').serializeJSON();
    metadataHash['module_name'] = this.model.get('name');
    fileTypeStr = data.files[0].type;

    if ((/\/(gif|jpg|jpeg|tiff|png)$/i).test(fileTypeStr)) {
      fileType = 'image';
    } else if ((/\/(mov|mp4|mkv|avi)$/i).test(fileTypeStr)){
      fileType = 'video';
    }

    metadataHash['file_type'] = fileType;
    return metadataHash;
  }
});
