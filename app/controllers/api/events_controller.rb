class Api::EventsController < ApplicationController
  wrap_parameters :event, include: [:header, :subheader, :visible, :countdown_hours, :display_start_time_ms, :event_end_time_ms, :event_start_time_ms]

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

  def calendar
    @calendar_events = Event.all
  end

  private

  def event_params
    params.require(:event).permit(:header, :visible, :subheader, :event_start_time_ms, :event_end_time_ms, :display_start_time_ms, :countdown_hours)
  end
end
