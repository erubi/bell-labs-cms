# create_table "media_items", force: :cascade do |t|
#   t.string   "file_name"
#   t.string   "file_type"
#   t.datetime "date_uploaded"
#   t.string   "scene_association"
#   t.string   "bell_labs_people"
#   t.string   "top_level_category"
#   t.string   "keywords"
#   t.string   "additional_metadata"
#   t.datetime "created_at",          null: false
#   t.datetime "updated_at",          null: false
#   t.integer  "media_module_id"
#   t.string   "image"
#   t.string   "video"
# end

class MediaItem < ActiveRecord::Base
  belongs_to :media_module

  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  before_save :update_media_attrs
  before_save :process_video_thumbnails
  before_destroy :subtract_video_length

  scope :with_image, -> {where.not(image: nil)}
  scope :with_video, -> {where.not(video: nil)}

  def filename_from_files
    return self.image.file.filename unless self.image.file.nil?
    return self.video.file.filename unless self.video.file.nil?
  end

  def base_image_name
    unless self.image.file.nil?
      return File.basename(self.image.file.filename, '.*')
    end

    nil
  end

  def base_video_name
    unless self.video.file.nil?
      return File.basename(self.video.file.filename, '.*')
    end

    nil
  end

  private

  def update_media_attrs
    if image.present? && image_changed?
      self.file_type = image.file.content_type
      self.file_name = File.basename(image.file.filename, '.*')
    elsif video.present? && video_changed?
      self.file_type = video.file.content_type
      self.file_name = File.basename(video.file.filename, '.*')
    end
  end

  def subtract_video_length
    begin
      unless self.video.file.nil? || (self.media_module.name != "Video Player")
        video_duration = (self.video.video_duration / 60)
        Rails.application.config.video_player_duration -= video_duration
      end
    rescue
      nil
    end
  end

  def process_video_thumbnails
    if video.present?
      self.video.convert_video_thumbnails
    end
  end

end
