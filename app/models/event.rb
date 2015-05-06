class Event < ActiveRecord::Base

  validates :header, presence: true, length: {maximum: 20}
  validates :subheader, length: {maximum: 100}
  validates :display_start_time, presence: true
  validates :event_start_time, presence: true
  validates :event_end_time, presence: true
  validates :countdown_hours, numericality: { only_integer: true }

  def self.current_and_upcoming_events
    Event.where('event_end_time > ?', DateTime.now)
  end

  def display_start_time_ms
    self.display_start_time.to_datetime.strftime('%Q')
  end

  def event_end_time_ms
    self.event_end_time.to_datetime.strftime('%Q')
  end

  def event_start_time_ms
    self.event_start_time.to_datetime.strftime('%Q')
  end

  def display_start_time_ms=(val)
    val = val.to_i
    d_time = Time.at(val/1000)
    self.display_start_time = d_time
  end

  def event_end_time_ms=(val)
    val = val.to_i
    d_time = Time.at(val/1000)
    self.event_end_time = d_time
  end

  def event_start_time_ms=(val)
    val = val.to_i
    d_time = Time.at(val/1000)
    self.event_start_time = d_time
  end

  def countdown_begin
    return nil if self.countdown_hours.nil?
    self.display_start_time - self.countdown_hours.hours
  end

  def countdown_begin_ms
    return nil if self.countdown_hours.nil?
    countdown_begin.to_datetime.strftime('%Q')
  end

  private

  # def valid_countdown_begin
  # end

  # def valid_end_date
  # end

end
