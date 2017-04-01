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
class Ticket < ApplicationRecord
  belongs_to :user

  has_many :comments, -> { order(created_at: :asc) }, dependent: :destroy
  accepts_nested_attributes_for :comments, allow_destroy: true

  enum status: %i(active replied closed)

  before_validation :set_default_status, on: :create

  validates :title, :description, presence: true

  def participants
    ([user.name] + (comments.map { |c| c.user.name })).uniq
  end

  def self.search(query)
    where('title LIKE :search OR description LIKE :search',
          search: "%#{query}%")
  end

  def close!
    comments.build(content: 'Marked as done.', user: user)
    self.status = 2
    save!
  end

  private

  def set_default_status
    self.status = 0
  end
end
