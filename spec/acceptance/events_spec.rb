require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Events", type: :controller do
  let (:event) { FactoryGirl.create :media_module }
  let (:id) { event.id }

  get "/api/events" do
    example "Get a list of all events" do
      do_request
      expect(status).to eq(200)
    end
  end

  get "/api/event/:id" do
    example "Get an event by id" do
      expect(path).to eq "/api/event/#{id}"
    end
  end

  post "/api/events" do
    example "Creating an event", :document => false do
      do_request(
        name: "Bell Labs Presenter 2",
        start_time: Date.today,
        end_time: Date.tomorrow
      )
    end
  end

  put "api/events/:id" do
    example "Update an event", :document => false do
      expect(path).to eq "api/events/#{id}"
    end
  end

  delete "api/events/:id" do
    example "Delete an event", :document => false do
      expect(path).to eq "api/events/#{id}"
    end
  end

end

