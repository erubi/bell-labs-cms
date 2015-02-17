class MediaModule < ActiveRecord::Base
  validates :name, presence: true

  mount_uploaders :images, ImageUploader
end
