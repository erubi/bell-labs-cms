require 'rails_helper'

RSpec.describe MediaModule, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:media_module)).to be_valid
  end

  it "can have images" do
    media_module = FactoryGirl.create(:media_module)
    media_module.images = [Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'fixtures', 'images', 'Bell_Labs_Holmdel.jpg' ))]

    expect(media_module.images.length).to equal(1)
  end
end
