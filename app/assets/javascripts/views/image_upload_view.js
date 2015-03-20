BellCMS.Views.ImageUploadView = Marionette.ItemView.extend({
  className: 'image-upload-ctr',
  template: 'media/image_upload',

  onShow: function(){
    this.configureDropzone();
  },

  configureDropzone: function(){
    var imageDropzone = new Dropzone('#image-dz-ctr', {
      url: 'api/upload_images',
      previewsContainer: null,
      method: 'put',
      params: {
        module_name: 'nobel_ghosts'
      }
    });

    imageDropzone.on('success', function(file, resp, data){
    });
  }
});
