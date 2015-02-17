class MediaModule < ActiveRecord::Base
  validates :name, presence: true
end
