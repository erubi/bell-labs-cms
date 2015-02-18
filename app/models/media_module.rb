class MediaModule < ActiveRecord::Base
  validates :name, presence: true

  mount_uploaders :images, ImageUploader
  mount_uploaders :videos, VideoUploader
end
