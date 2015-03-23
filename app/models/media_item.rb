class MediaItem < ActiveRecord::Base
  belongs_to :media_module

  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  before_save :update_media_attrs

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
end
