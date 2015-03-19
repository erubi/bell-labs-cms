class Event < ActiveRecord::Base

  validates :name, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  # validates :countdown_begin,
  validate :valid_end_date

  def self.current_and_upcoming_events
    Event.where('end_time > ?', DateTime.now)
  end

  def start_time_ms
    self.start_time.to_datetime.strftime('%Q')
  end

  def end_time_ms
    self.end_time.to_datetime.strftime('%Q')
  end

  def countdown_ms
    unless self.countdown_begin.nil?
      self.countdown_begin.to_datetime.strftime('%Q')
    end
  end

  def start_time_ms=(val)
    d_time = Time.at(val/1000)
    self.start_time = d_time
  end

  def end_time_ms=(val)
    d_time = Time.at(val/1000)
    self.end_time = d_time
  end

  def countdown_ms=(val)
    return nil if val == ""
    d_time = Time.at(val/1000)
    self.countdown_begin = d_time
  end

  private

  def valid_countdown_begin
  end

  def valid_end_date
  end

end
