require 'faker'

# This will guess the User class
FactoryGirl.define do
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
