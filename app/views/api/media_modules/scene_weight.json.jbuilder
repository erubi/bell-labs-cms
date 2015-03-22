json.cycle_duration SETTINGS['CYCLE_DURATION']

json.scene_weights(@media_modules) do |media_module|
	json.partial!("scene_weight", media_module: media_module)
end
