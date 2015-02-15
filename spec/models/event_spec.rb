require 'rails_helper'

RSpec.describe Event, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:event)).to be_valid
  end

  it { should validate_presence_of :start_time }
  it { should validate_presence_of :end_time }

end
