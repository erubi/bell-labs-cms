if Rails.env.development? || Rails.env.production?
  ENV.update YAML.load_file("#{Rails.root}/config/application.yml")[Rails.env]
  ENV['VIDEO_PLAYER_DURATION'] = MediaModule.find_by(name: "Video Player").movie_duration.to_s
end

