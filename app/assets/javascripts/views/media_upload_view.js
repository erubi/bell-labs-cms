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
        data.formData = that.grabFormData();
      },

      done: function(e, data){
      }
    });
  },

  grabFormData: function(){
    var metadataHash = $('#metadata-form').serializeJSON();
    metadataHash['module_name'] = this.model.get('name');
    return metadataHash;
  }
});
