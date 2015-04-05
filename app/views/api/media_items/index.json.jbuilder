json.array!(@media_items) do |media_item|
	json.partial!("media_item", m: media_item)
end
