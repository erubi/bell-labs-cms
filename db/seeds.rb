# mm1 = MediaModule.create!(name: "nobel_ghosts")
# mm1.images = [File.open("#{Rails.root}/spec/fixtures/images/sample1.jpg")]
# mm1.save!

# mm2 = MediaModule.create!(name: "bell_labs_heroes")
# mm2.videos = [File.open("#{Rails.root}/spec/fixtures/videos/sample1.mp4")]
# mm2.save!

MediaModule.create!([
  {name: "nobel_ghosts", scene_type: "code"},
  {name: "bell_labs_heroes", scene_type: "code"},
  {name: "network", scene_type: "code"},
  {name: "physics", scene_type: "code"},
  {name: "software", scene_type: "code"},
  {name: "entrance_cue", scene_type: "video"},
  {name: "starfield", scene_type: "video"},
  {name: "media_library", scene_type: "video"},
  {name: "none", scene_type: "video"},
])

events = Event.create!([
  {event_text: "Test Event 1", start_time: DateTime.now.tomorrow, end_time: DateTime.now + 3, countdown_hours: 3},
  {event_text: "Test Event 2", start_time: DateTime.now + 8, end_time: DateTime.now + 20, countdown_hours: 2}])

users = User.create([
  {email: 'dude@example.com', password: 'password'},
  {email: 'guild@example.com', password: 'password'}])
