require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "MediaModules" do
  let(:auth_token) { current_user.authentication_token }

  get "api/media_modules" do
    example "Get a list of all events" do
      do_request
      expect(status).to eq(200)
    end
  end

  post "/api/media_modules" do
    example "Creating a media_module" do
      do_request(
        name: "Bell Labs Module 1",
        active_interval: 20
      )
    end
  end
end

