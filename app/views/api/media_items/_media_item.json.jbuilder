json.id m.id
json.scene_association m.scene_association
json.bell_labs_people m.bell_labs_people
json.top_level_category m.top_level_category
json.keywords m.keywords
json.additional_metadata m.additional_metadata
json.description m.description

if !m.image.file.nil?
  json.filename m.image.file.filename
  json.url m.image.small_thumb.url
  json.media_type 'image'
elsif !m.video.file.nil?
  json.filename m.video.file.filename
  json.url m.video.thumb.url
  json.media_type 'video'
end
