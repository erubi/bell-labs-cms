class Api::ConfigModelController < ApplicationController

  before_action :require_admin, except: [:show]

  def update

    ENV['CYCLE_DURATION'] = params[:cycle_duration].to_s

    if (params[:video_player_enabled].to_s != ENV['VIDEO_PLAYER_ENABLED'])
      ENV['VIDEO_PLAYER_ENABLED'] = params[:video_player_enabled].to_s

      if (ENV['VIDEO_PLAYER_ENABLED'].to_bool)
        num = ENV['CYCLE_DURATION'].to_i - ENV['VIDEO_PLAYER_DURATION'].to_i
        ENV['CYCLE_DURATION'] = num.to_s
      else
        num = ENV['CYCLE_DURATION'].to_i + ENV['VIDEO_PLAYER_DURATION'].to_i
        ENV['CYCLE_DURATION'] = num.to_s
      end
    end

    if (params[:event_freq].to_s != ENV['EVENT_FREQUENCY'])
      ENV['EVENT_FREQUENCY'] = params[:event_freq].to_s
    end

    render 'show'
  end

  def show
  end

end
