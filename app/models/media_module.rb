class MediaModule < ActiveRecord::Base
  validates :name, :weight, presence: true
  validates :weight, inclusion: { in: 0..1 }
  before_update :activate_callback

  mount_uploaders :images, ImageUploader
  mount_uploaders :videos, VideoUploader

  scope :active, -> {where(active: true)}

  def activate_callback
    if self.active
      deactivate_other_modules
    end
  end

  def deactivate_other_modules
    others = MediaModule.where.not(id: self.id)
    others.update_all(active: false)
  end
end
