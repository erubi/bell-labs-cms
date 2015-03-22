class Api::ConfigModelController < ApplicationController

  def update
    SETTINGS['CYCLE_DURATION'] = params[:cycle_duration]

    if (params[:video_player_enabled] != SETTINGS['VIDEO_PLAYER_ENABLED'])
      SETTINGS['VIDEO_PLAYER_ENABLED'] = params[:video_player_enabled]
      if (SETTINGS['VIDEO_PLAYER_ENABLED'])
        SETTINGS['CYCLE_DURATION'] -= SETTINGS['VIDEO_PLAYER_DURATION']
      else
        SETTINGS['CYCLE_DURATION'] += SETTINGS['VIDEO_PLAYER_DURATION']
      end
    end

    if (params[:event_freq] != SETTINGS['EVENT_FREQUENCY'])
      SETTINGS['EVENT_FREQUENCY'] = params[:event_freq]
    end

    render 'show'
  end

  def show
  end

end
