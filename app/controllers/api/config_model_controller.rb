class Api::ConfigModelController < ApplicationController

  def update
    SETTINGS['CYCLE_DURATION'] = params[:cycle_duration]

    if (params[:video_player_enabled] != SETTINGS['VIDEO_PLAYER_ENABLED'])
      SETTINGS['VIDEO_PLAYER_ENABLED'] = params[:video_player_enabled]
      video_minutes = MediaModule.find_by(name: "Video Player").movie_duration.to_i
      if (SETTINGS['VIDEO_PLAYER_ENABLED'])
        SETTINGS['CYCLE_DURATION'] -= video_minutes
      else
        SETTINGS['CYCLE_DURATION'] += video_minutes
      end
    end

    render 'show'
  end

  def show
      @video_minutes = MediaModule.find_by(name: "Video Player").movie_duration.to_i
  end

end
