json.cycle_duration Rails.application.config.total_cycle_duration

json.scene_weights(@media_modules) do |media_module|
	json.partial!("scene_weight", media_module: media_module)
end
