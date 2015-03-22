# mm1 = MediaModule.create!(name: "nobel_ghosts")
# mm1.images = [File.open("#{Rails.root}/spec/fixtures/images/sample1.jpg")]
# mm1.save!

# mm2 = MediaModule.create!(name: "bell_labs_heroes")
# mm2.videos = [File.open("#{Rails.root}/spec/fixtures/videos/sample1.mp4")]
# mm2.save!

MediaModule.create!([
  {name: "Video Player", scene_type: "code"},
  {name: "Bell Labs Heroes", scene_type: "code"},
  {name: "Network", scene_type: "code"},
  {name: "Physics", scene_type: "code"},
  {name: "Software", scene_type: "code"},
  {name: "Entrance Cue", scene_type: "video"},
  {name: "Starfield Welcome", scene_type: "video"},
  {name: "Media Library", scene_type: "video"}
])

events = Event.create!([
  {header: 'Event 1 Header', subheader: 'Event 2 subheader', event_text: "Test Event 1", start_time: DateTime.now.tomorrow, event_time: DateTime.now + 2, end_time: DateTime.now + 3, countdown_hours: 3},
  {header: 'Event 2 header', subheader: 'Event 2 subheader', event_text: "Test Event 2", start_time: DateTime.now + 8, event_time: DateTime.now + 10, end_time: DateTime.now + 20, countdown_hours: 2}])

users = User.create([
  {email: 'dude@example.com', password: 'password', admin: true},
  {email: 'dude2@example.com', password: 'password'},
  {email: 'guild@example.com', password: 'password', admin: true}])
