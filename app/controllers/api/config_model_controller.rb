class Api::ConfigModelController < ApplicationController

  def update
    Rails.application.config.cycle_duration = params[:cycle_duration]
    Rails.application.config.video_player_enabled = params[:video_player_enabled]
    render 'show'
  end

  def show
  end

end
