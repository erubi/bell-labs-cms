json.(media_module, :id, :name, :weight, :scene_type, :active)

unless media_module.media_items.length == 0
  json.media_items media_module.media_items do |m|
    if !m.image.file.nil?
      json.id m.id
      json.filename m.image.file.filename
      json.url m.image.thumb.url
      json.media_type 'image'
    elsif !m.video.file.nil?
      json.id m.id
      json.filename m.video.file.filename
      json.url m.video.url
      json.media_type 'video'
    end
  end
end

# unless media_module.images.length == 0
#   json.images media_module.images do |image|
#     next if image.nil?
#     json.filename image.file.filename
#     json.url image.url
#   end
# end

# unless media_module.videos.length == 0
#   json.videos media_module.videos do |video|
#     next if video.nil?
#     json.filename video.file.filename
#     json.url video.url
#   end
# end
