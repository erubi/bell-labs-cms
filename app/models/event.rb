class Event < ActiveRecord::Base

  validates :event_text, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :valid_end_date
  validates :countdown_hours, numericality: { only_integer: true }

  def self.current_and_upcoming_events
    Event.where('end_time > ?', DateTime.now)
  end

  def start_time_ms
    self.start_time.to_datetime.strftime('%Q')
  end

  def end_time_ms
    self.end_time.to_datetime.strftime('%Q')
  end

  def start_time_ms=(val)
    d_time = Time.at(val/1000)
    self.start_time = d_time
  end

  def end_time_ms=(val)
    d_time = Time.at(val/1000)
    self.end_time = d_time
  end

  def countdown_begin
    return nil if self.countdown_hours.nil?
    self.start_time - self.countdown_hours.hours
  end

  def countdown_begin_ms
    return nil if self.countdown_hours.nil?
    countdown_begin.to_datetime.strftime('%Q')
  end

  private

  def valid_countdown_begin
  end

  def valid_end_date
  end

end
