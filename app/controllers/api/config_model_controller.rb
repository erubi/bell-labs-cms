class Api::ConfigModelController < ApplicationController

  def update
    Rails.application.config.cycle_duration = params[:cycle_duration]
    render 'show'
  end

  def show
  end

end
