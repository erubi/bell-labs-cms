class MediaItem < ActiveRecord::Base
  belongs_to :media_module

  mount_uploader :image, ImageUploader
  mount_uploader :video, VideoUploader

  scope :with_image, -> {where.not(image: nil)}
  scope :with_video, -> {where.not(video: nil)}
end
