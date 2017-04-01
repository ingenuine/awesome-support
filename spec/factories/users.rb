# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  name                   :string(255)
#  role                   :integer
#

# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    name Faker::StarWars.character
    sequence(:email){|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    role 0
  end

  factory :customer, class: User do
    name 'Customer User'
    email 'customer@example.com'
    password 'password'
    password_confirmation 'password'
    role 0
  end

  factory :agent, class: User do
    name 'Agent User'
    email 'agent@example.com'
    password 'password'
    password_confirmation 'password'
    role 1
  end

  factory :admin, class: User do
    name 'Admin User'
    email 'admin@example.com'
    password 'password'
    password_confirmation 'password'
    role 2
  end
end
