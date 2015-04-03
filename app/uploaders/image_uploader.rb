# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

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

  process :convert => 'png'

  def filename
    base_name = File.basename(original_filename, '.*')
    "#{base_name}.png"
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

  # Create different versions of your uploaded files:
  version :thumb do

    def store_dir
      "uploads/#{model.media_module.name}/#{mounted_as}/thumb"
    end

    process :thumb_conversion => [512, 512]

    # def full_filename(for_file=model.image.file)
    #   base_name = File.basename(for_file, '.*')
    #   "#{base_name}.png"
    # end

    # def full_filename(for_file)
    #   super(for_file)
    # end

    def full_filename(for_file)
      parent_name = super(for_file)
      ext         = File.extname(parent_name)
      base_name   = parent_name.chomp(ext)
      # [version_name, base_name].compact.join('_') + ".png"
      base_name + ".png"
    end
  end

  version :small_thumb do

    def store_dir
      "uploads/#{model.media_module.name}-internal/#{mounted_as}/thumb"
    end

    process :thumb_conversion => [200, 200]

    # def full_filename(for_file=model.image.file)
    #   base_name = File.basename(for_file, '.*')
    #   "#{base_name}.png"
    # end

    # def full_filename(for_file)
    #   super(for_file)
    # end

    def full_filename(for_file)
      parent_name = super(for_file)
      ext         = File.extname(parent_name)
      base_name   = parent_name.chomp(ext)
      # [version_name, base_name].compact.join('_') + ".png"
      base_name + ".png"
    end
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
    %w(jpg jpeg gif png)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.

  private

  def thumb_conversion(width, height)
    manipulate! do |img|
      img.format("png") do |c|
        c.resize      "#{width}x#{height}>"
        c.resize      "#{width}x#{height}<"
      end
      img
    end
  end

end
