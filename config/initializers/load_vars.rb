SETTINGS = YAML.load_file("#{Rails.root}/config/config.yml")[Rails.env]

# SETTINGS['VIDEO_PLAYER_DURATION'] = MediaModule.find_by(name: "Video Player").movie_duration

