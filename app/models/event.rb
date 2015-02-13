class Event < ActiveRecord::Base

  validates :name, presence: true
  validates :datetime, presence: true


  private

  def event_attrs

  end
end
