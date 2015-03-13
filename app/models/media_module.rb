class MediaModule < ActiveRecord::Base
  validates :name, :weight, presence: true
  validates :weight, inclusion: { in: 0..1 }
  validate :weight_total

  before_update :activate_callback

  mount_uploaders :images, ImageUploader
  mount_uploaders :videos, VideoUploader

  scope :active, -> {where(active: true)}

  def other_modules
    MediaModule.where.not(id: self.id)
  end

  def activate_callback
    if self.active
      deactivate_other_modules
    end
  end

  def deactivate_other_modules
    other_modules.update_all(active: false)
  end

  private

  def weight_total
    if (other_modules.sum(:weight) + self.weight) > 1
      errors.add(:base, "Total sum of weight must not exceed 100%")
    end
  end
end
