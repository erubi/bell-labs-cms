require 'rails_helper'

RSpec.describe MediaModule, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:media_module)).to be_valid
  end
end
