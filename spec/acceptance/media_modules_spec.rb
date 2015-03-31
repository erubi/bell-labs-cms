require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "MediaModules", type: :controller do
  let (:media_module) { FactoryGirl.create :media_module }
  let (:id) { media_module.id }
  let (:scene_name) { 'video_player'}

  get "/api/media_modules" do
    example "Get a list of all modules", :document => false do
      do_request
      expect(status).to eq(200)
    end
  end

  # might want to switch to using slugs with module names
  get "/api/media_modules/:id" do
    example "Get a module by id", :document => false do
      do_request
      expect(path).to eq "/api/media_modules/#{id}"
    end
  end

  post "/api/media_modules" do
    example "Creating a module", :document => false do
      do_request(
        name: media_module.name,
        weight: media_module.weight
      )
    end
  end

  put "api/media_modules/:id" do
    example "Update a module", :document => false do
      do_request
      expect(path).to eq "api/media_modules/#{id}"
    end
  end

  delete "api/media_modules/:id" do
    example "Delete a module", :document => false do
      do_request
      expect(path).to eq "api/media_modules/#{id}"
    end
  end

  get "/api/scene_weight" do
    example "Get scene weights" do
      do_request
      expect(path).to eq "/api/scene_weight"
    end
  end

  get "/api/scene_override" do
    example "Get scene override" do
      do_request
      expect(path).to eq "/api/scene_override"
    end
  end

  get "/api/get_media/:scene_name" do
    example "Get video player media" do
      do_request
      expect(path).to eq "/api/get_media/video_player"
    end
  end

  get "/api/get_metadata/:scene_name" do
    example "Get video player metadata" do
      do_request
      expect(path).to eq "/api/get_metadata/video_player"
    end
  end

end

