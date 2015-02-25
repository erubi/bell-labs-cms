require 'rails_helper'
require 'rspec_api_documentation/dsl'
# require File.join(Rails.root, 'spec/support/sign_in_support.rb')

# def sign_in_as_a_valid_user
#   @user ||= FactoryGirl.create :user
#   post_via_redirect Rails.application.routes.url_helpers.user_session_path, 'user[email]' => @user.email, 'user[password]' => @user.password
# end

resource "MediaModules", type: :controller do
  let (:media_module) { FactoryGirl.create :media_module }
  let (:id) { media_module.id }

  get "/api/media_modules" do
    example "Get a list of all modules" do
      do_request
      expect(status).to eq(200)
    end
  end

  # might want to switch to using slugs with module names
  get "/api/media_modules/:id" do
    example "Get a module by id" do
      expect(path).to eq "/api/media_modules/#{id}"
    end
  end

  post "/api/media_modules" do
    example "Creating a module", :document => false do
      do_request(
        name: "Bell Labs Module 1",
        active_interval: 20
      )
    end
  end

  put "api/media_modules/:id" do
    example "Update a module", :document => false do
      expect(path).to eq "api/media_modules/#{id}"
    end
  end

  delete "api/media_modules/:id" do
    example "Delete a module", :document => false do
      expect(path).to eq "api/media_modules/#{id}"
    end
  end

end

