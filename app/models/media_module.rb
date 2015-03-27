class MediaModule < ActiveRecord::Base
  validates :name, :weight, presence: true
  validates :weight, inclusion: { in: 0..1 }
  validate :weight_total

  before_update :activate_callback

  has_many :media_items

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

  def movie_duration
    total_duration = 0 #seconds

    self.videos.each do |video|
      next if video.nil?
      total_duration += video.video_duration
    end

    total_minutes = total_duration / 60

    total_minutes
  end

  def images
    self.media_items.with_image.collect do |m|
      m.image
    end.compact
  end

  def videos
    self.media_items.with_video.collect do |m|
      m.video
    end.compact
  end

  def all_media
    self.images.concat(self.videos)
  end

  def underscore_name
    self.name.parameterize.underscore
  end

  private

  def weight_total
    if (other_modules.sum(:weight) + self.weight) > 1
      errors.add(:base, "Total sum of weight must not exceed 100%")
    end
  end
end
