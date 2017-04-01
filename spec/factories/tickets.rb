# frozen_string_literal: true

# == Schema Information
#
# Table name: tickets
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  title       :string(255)
#  description :text(65535)
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

# frozen_string_literal: true

FactoryGirl.define do
  factory :ticket do
    title { Faker::Lorem.word }
    description { Faker::Lorem.paragraph(15, false, 10) }
    association :user, factory: :customer, strategy: :build
  end
end
