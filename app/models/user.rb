# frozen_string_literal: true

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
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable

  has_many :tickets

  enum role: %i(customer agent admin)

  before_create :set_default_role

  validates :name, :email, presence: true
  validates :email, uniqueness: { case_sensitive: true }
  validates :password, :password_confirmation, presence: true, on: :create

  def self.search(query)
    where('name LIKE :search OR email LIKE :search', search: "%#{query}%")
  end

  private

  def set_default_role
    self.role = 0
  end
end
