class Event < ActiveRecord::Base

  validates :name, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :valid_end_date


  private

  def event_attrs
  end

  def valid_end_date
  end

end
