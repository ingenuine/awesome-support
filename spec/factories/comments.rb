# frozen_string_literal: true

FactoryGirl.define do
  factory :comment do
    content { Faker::Lorem.paragraph(15, false, 10) }
    association :user, factory: :customer, strategy: :build
  end
end
