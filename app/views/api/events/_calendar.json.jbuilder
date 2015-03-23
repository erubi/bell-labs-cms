json.calendar_event do
  json.header calendar_event.header
  json.subheader calendar_event.subheader
  json.countdown_timer calendar_event.countdown_begin
  json.start_time calendar_event.start_time
  json.end_time calendar_event.end_time
  json.event_time calendar_event.event_time
  json.visible calendar_event.visible
  json.event_id calendar_event.id
end
