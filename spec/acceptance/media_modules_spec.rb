require 'rails_helper'
require 'rspec_api_documentation/dsl'
# require File.join(Rails.root, 'spec/support/sign_in_support.rb')

# def sign_in_as_a_valid_user
#   @user ||= FactoryGirl.create :user
#   post_via_redirect Rails.application.routes.url_helpers.user_session_path, 'user[email]' => @user.email, 'user[password]' => @user.password
# end

resource "MediaModules", type: :controller do
  user = FactoryGirl.create :user

  parameter :email, "email"
  parameter :password, "password"

  # let (:user) { FactoryGirl.create :user}
  let (:email) {user.email}
  let (:password) {user.password}


  post 'api/auth/sign_in' do
    parameter :email, user.email
    parameter :password, user.password
    it "requires a signed in user" do
      binding.pry
      # puts User.all
      do_request
    end
  end

  get "api/media_modules" do
    example "Get a list of all events" do
      binding.pry
      puts params
      # do_request
      # expect(status).to eq(200)
    end
  end

  post "/api/media_modules" do
    example "Creating a media_module" do
      sign_in_as_a_valid_user
      do_request(
        name: "Bell Labs Module 1",
        active_interval: 20
      )
    end
  end
end

