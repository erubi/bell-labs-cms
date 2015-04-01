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
  # before_destroy :delete_thumbs

  scope :with_image, -> {where.not(image: nil)}
  scope :with_video, -> {where.not(video: nil)}

  private

  def update_media_attrs
    if image.present? && image_changed?
      self.file_type = image.file.content_type
    elsif video.present? && video_changed?
      self.file_type = video.file.content_type
    end
  end

  def delete_thumbs
    path = self.image.thumb.current_path
    binding.pry
    File.delete(path) if File.exists?(path.to_s)
  end
end
