class Event < ActiveRecord::Base

  validates :name, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :valid_end_date

  def self.current_and_upcoming_events
    Event.where('end_time > ?', DateTime.now)
  end

  private

  def event_attrs
  end

  def valid_end_date
  end

end
