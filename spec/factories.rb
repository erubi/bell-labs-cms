require 'faker'
require 'carrierwave/orm/activerecord'

# This will guess the User class
FactoryGirl.define do

  # factory :media_item do
  #   image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec', 'fixtures', 'images', 'sample1.jpg')) }
  # end

  factory :media_module do
    name { Faker::Lorem.sentence }
    active { true }
    scene_type { "code" }
    weight { 0.12 }
    # media_item
  end

  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end

  factory :event do
    event_text { Faker::Lorem.sentence }
    header { Faker::Lorem.sentence }
    subheader { Faker::Lorem.sentence }
    start_time { Faker::Time.backward(14, :evening) }
    end_time { Faker::Time.forward(23, :morning) }
    event_time { Faker::Time.forward(18, :morning) }
    countdown_hours { Random.new.rand(1..6) }
  end
end
