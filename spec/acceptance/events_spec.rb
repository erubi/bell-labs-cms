require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Events", type: :controller do
  let (:event) { FactoryGirl.create :event }
  let (:id) { event.id }

  get "/api/events" do
    example "Get a list of all events", :document => false do
      do_request
      expect(status).to eq(200)
    end
  end

  get "/api/events/:id" do
    example "Get an event by id", :document => false do
      do_request
      expect(path).to eq "/api/events/#{id}"
    end
  end

  post "/api/events" do
    example "Creating an event", :document => false do
      do_request(
        start_time: event.start_time,
        end_time: event.end_time,
        event_time: event.event_time,
        countdown_hours: event.countdown_hours
      )
    end
  end

  put "api/events/:id" do
    example "Update an event", :document => false do
      do_request
      expect(path).to eq "api/events/#{id}"
    end
  end

  delete "api/events/:id" do
    example "Delete an event", :document => false do
      do_request
      expect(path).to eq "api/events/#{id}"
    end
  end

  get "api/calendar" do
    example "Get calendar json" do
      do_request
      expect(path).to eq "api/calendar"
    end
  end

end

