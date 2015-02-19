mm1 = MediaModule.create(name: "Lulz module", active_interval: 20, active_time: 4)
mm1.images = [File.open("#{Rails.root}/spec/fixtures/images/sample1.jpg")]

mm2 = MediaModule.create(name: "Doge party", active_interval: 20, active_time: 4)
mm2.videos = [File.open("#{Rails.root}/spec/fixtures/videos/sample1.mp4")]

users = User.create([{email: 'dude@example.com', password: 'password'}])
