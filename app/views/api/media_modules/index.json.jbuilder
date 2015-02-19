json.array!(@media_modules) do |media_module|
	json.partial!("media_module", media_module: media_module)
end
