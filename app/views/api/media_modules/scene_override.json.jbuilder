json.active_scene @active_module_name

json.scene_weights(@media_modules) do |media_module|
	json.partial!("scene_override", media_module: media_module)
end
