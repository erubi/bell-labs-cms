class MediaModule < ActiveRecord::Base
  validates :name, presence: true
  validates :active_interval, inclusion: { in: 0..100 }

  mount_uploaders :images, ImageUploader
  mount_uploaders :videos, VideoUploader
end
