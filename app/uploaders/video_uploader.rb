# encoding: utf-8
class VideoUploader < CarrierWave::Uploader::Base
  include CarrierWave::Video
  include CarrierWave::Video::Thumbnailer
  include CarrierWave::MiniMagick

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # being called more than once for single upload(need different cb)
  # after :store, :update_video_player_duration

  # Choose what kind of storage to use for this uploader:
  # if Rails.env.staging?
  #   storage :fog
  # else
  #   storage :file
  # end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.media_module.name}/#{mounted_as}/full"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end
  #
  version :thumb do
    def store_dir
      "uploads/#{model.media_module.name}/#{mounted_as}/thumb"
    end

    process thumbnail: [{format: 'png', quality: 10, size: 800}]
    process :resize_to_fill => [512, 512]

    def full_filename for_file
      png_name for_file, version_name
    end
  end

  version :small_thumb do
    def store_dir
      "uploads/#{model.media_module.name}-internal/#{mounted_as}/thumb"
    end

    process thumbnail: [{format: 'png', quality: 10, size: 800}]
    process :resize_to_fill => [200, 200]

    def full_filename for_file
      png_name for_file, version_name
    end
  end

  def png_name for_file, version_name
    %Q{#{version_name}_#{for_file.chomp(File.extname(for_file))}.png}
  end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process :resize_to_fit => [50, 50]
  # end

  def extension_white_list
    %w(mp4 avi mkv)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
  #

  def video_duration
   # video duration in seconds
   FFMPEG::Movie.new(file.file).duration
  end

  # def update_video_player_duration(file)
    # binding.pry
    # SETTINGS['VIDEO_PLAYER_DURATION'] += (video_duration/60)
  # end
end
