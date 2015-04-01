json.metadata do
  unless @media_module.images.length == 0
    json.media_items @media_module.all_media do |media_item|
      next if media_item.nil?
      json.filename media_item.file.filename
      json.date_uploaded media_item.model.created_at
      json.file_type media_item.model.file_type
      json.scene_association @media_module.underscore_name
      json.BellLabsPeople media_item.model.bell_labs_people
      json.TopLevelCategory media_item.model.top_level_category
      json.keywords media_item.model.keywords
      json.additional_metadata media_item.model.additional_metadata
    end
  end
end
