class MediaModule < ActiveRecord::Base
  validates :name, :weight, presence: true
  validates :weight, inclusion: { in: 0..1 }

  mount_uploaders :images, ImageUploader
  mount_uploaders :videos, VideoUploader
end
