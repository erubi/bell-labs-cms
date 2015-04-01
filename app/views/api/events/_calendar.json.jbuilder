json.calendar_event do
  json.header calendar_event.header
  json.subheader calendar_event.subheader
  json.countdown_timer calendar_event.countdown_begin
  json.display_start_time calendar_event.display_start_time
  json.event_start_time calendar_event.event_start_time
  json.event_end_time calendar_event.event_end_time
  json.visible calendar_event.visible
  json.event_id calendar_event.id
end
