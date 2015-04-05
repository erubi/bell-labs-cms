json.(media_module, :id, :name, :weight, :scene_type, :active)

unless media_module.media_items.length == 0
  json.media_items media_module.media_items do |m|
    json.partial!("media_item", m: m)
  end
end
