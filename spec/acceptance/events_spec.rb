require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Events", type: :controller do
  let (:event) { FactoryGirl.create :event }
  let (:id) { event.id }

  get "/api/events" do
    example "Get a list of all events" do
      do_request
      expect(status).to eq(200)
    end
  end

  get "/api/events/:id" do
    example "Get an event by id" do
      do_request
      expect(path).to eq "/api/events/#{id}"
    end
  end

  post "/api/events" do
    example "Creating an event", :document => false do
      do_request(
        name: event.name,
        start_time: event.start_time,
        end_time: event.end_time,
        countdown_begin: event.countdown_begin
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

end

