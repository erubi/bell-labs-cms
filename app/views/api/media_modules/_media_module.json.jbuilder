json.(media_module, :id, :name, :weight, :scene_type, :active)

unless media_module.media_items.length == 0
  json.media_items media_module.media_items do |m|
    if !m.image.file.nil?
      json.id m.id
      json.filename m.image.file.filename
      json.url m.image.small_thumb.url
      json.media_type 'image'
    elsif !m.video.file.nil?
      json.id m.id
      json.filename m.video.file.filename
      json.url m.video.small_thumb.url
      json.media_type 'video'
    end
  end
end
