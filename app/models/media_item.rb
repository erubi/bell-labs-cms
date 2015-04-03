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
  before_destroy :subtract_video_length

  scope :with_image, -> {where.not(image: nil)}
  scope :with_video, -> {where.not(video: nil)}

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
    unless self.video.file.nil? || (self.media_module.name != "Video Player")
      video_duration = (self.video.video_duration / 60)
      Rails.application.config.video_player_duration -= video_duration
    end
  end

end
