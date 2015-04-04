class Api::ConfigModelController < ApplicationController

  before_action :require_admin, except: [:show]

  def update

    Rails.application.config.cycle_duration = params[:cycle_duration]
    Rails.application.config.total_cycle_duration = Rails.application.config.cycle_duration

    if (params[:video_player_enabled]!= Rails.application.config.video_player_enabled)
      Rails.application.config.video_player_enabled = params[:video_player_enabled]

      if Rails.application.config.video_player_duration == 0
        Rails.application.config.video_player_duration = MediaModule.find_by(name: "Video Player").movie_duration
      end

      if (Rails.application.config.video_player_enabled)
        Rails.application.config.total_cycle_duration = (
          Rails.application.config.cycle_duration -
          Rails.application.config.video_player_duration
        )
      end

    end

    if (params[:event_freq] != Rails.application.config.event_frequency)
      Rails.application.config.event_frequency= params[:event_freq]
    end

    render 'show'
  end

  def show
  end

end
