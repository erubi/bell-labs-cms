require 'rails_helper'
require 'rspec_api_documentation/dsl'
# require File.join(Rails.root, 'spec/support/sign_in_support.rb')

# def sign_in_as_a_valid_user
#   @user ||= FactoryGirl.create :user
#   post_via_redirect Rails.application.routes.url_helpers.user_session_path, 'user[email]' => @user.email, 'user[password]' => @user.password
# end

resource "MediaModules", type: :controller do
  get "/api/media_modules" do
    example "Get a list of all modules" do
      do_request
      expect(status).to eq(200)
    end
  end

  # need to make hidden from generated docs
  post "/api/media_modules" do
    example "Creating a module", :document => false do
      do_request(
        name: "Bell Labs Module 1",
        active_interval: 20
      )
    end
  end
end

