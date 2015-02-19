class Api::EventsController < ApplicationController
  before_action :require_signed_in

  def index
    @events = Event.current_and_upcoming_events
  end

  def create
  end

  def update
  end

  private

  def event_params
    params.require(:event).permit(:name, :description, :start_time, :end_time)
  end
end
