json.calendar_events(@calendar_events) do |calendar_event|
  json.partial!("calendar", calendar_event: calendar_event)
end
