class Api::EventsController < ApplicationController
  wrap_parameters :event, include: [:event_text, :countdown_hours, :start_time_ms, :end_time_ms]

  def index
    @events = Event.current_and_upcoming_events
  end

  def create
    @event = Event.create(event_params)

    if @event.save
      render "show"
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      render "show"
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def show
    @event = Event.find(params[:id])
    render "show"
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy!
    render json: true
  end

  private

  def event_params
    params.require(:event).permit(:event_text, :start_time_ms, :end_time_ms, :countdown_hours)
  end
end
