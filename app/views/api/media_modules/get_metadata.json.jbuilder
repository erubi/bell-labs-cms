json.metadata do
  unless @media_module.images.length == 0
    json.media_items @media_module.media_items do |media_item|
      json.filename media_item.filename_from_files
      json.date_uploaded media_item.created_at
      json.file_type media_item.file_type
      json.scene_association @media_module.underscore_name
      json.BellLabsPeople media_item.bell_labs_people
      json.TopLevelCategory media_item.top_level_category
      json.keywords media_item.keywords
      json.description media_item.description
      json.additional_metadata media_item.additional_metadata
    end
  end
end
