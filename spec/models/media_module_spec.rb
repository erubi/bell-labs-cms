require 'rails_helper'

RSpec.describe MediaModule, type: :model do
  subject(:media_module) { FactoryGirl.create(:media_module)}

  it "has a valid factory" do
    expect(media_module).to be_valid
  end

  it "can have images" do
    media_module.images = [Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'fixtures', 'images', 'sample1.jpg' ))]

    expect(media_module.images.length).to equal(1)
  end

  it "can have videos" do
    media_module.videos = [Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'fixtures', 'videos', 'sample1.mp4' ))]

    expect(media_module.videos.length).to equal(1)
  end

end
