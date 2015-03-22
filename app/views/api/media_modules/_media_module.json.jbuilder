json.(media_module, :id, :name, :weight, :scene_type, :active)

unless media_module.images.length == 0
  json.images media_module.images do |image|
    next if image.nil?
    json.filename image.file.filename
    json.url image.url
  end
end

unless media_module.videos.length == 0
  json.videos media_module.videos do |video|
    next if video.nil?
    json.filename video.file.filename
    json.url video.url
  end
end
