require 'faker'
require 'carrierwave/orm/activerecord'

# This will guess the User class
FactoryGirl.define do

  factory :media_module do
    name { Faker::Lorem.sentence }
    active_interval { rand(100) }
    # active_time { rand * 24 }
    active { true }
  end

  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end

  factory :event do
    name { Faker::Lorem.sentence }
    start_time { Faker::Time.backward(14, :evening) }
    end_time { Faker::Time.forward(23, :morning) }
  end
end
