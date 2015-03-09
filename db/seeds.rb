mm1 = MediaModule.create!(name: "Lulz module", active_interval: 20, active_time: 4)
mm1.images = [File.open("#{Rails.root}/spec/fixtures/images/sample1.jpg")]
mm1.save!

mm2 = MediaModule.create!(name: "Doge party", active_interval: 20, active_time: 4)
mm2.videos = [File.open("#{Rails.root}/spec/fixtures/videos/sample1.mp4")]
mm2.save!

events = Event.create!([
  {name: "Test Event 1", description: "This is a test event", start_time: DateTime.now.tomorrow, end_time: DateTime.now + 3, countdown_begin: DateTime.now.tomorrow - 3.hours},
  {name: "Test Event 2", description: "This is a second test event", start_time: DateTime.now + 8, end_time: DateTime.now + 20, countdown_begin: DateTime.now - 2.hours }])

users = User.create([{email: 'dude@example.com', password: 'password'}])
