# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  ticket_id  :integer
#  user_id    :integer
#  content    :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
  belongs_to :ticket, touch: true
  belongs_to :user

  validates :content, presence: true

  after_save :update_ticket_status
  after_destroy :revert_ticket_status

  def update_ticket_status
    ticket.update_attribute(:status, 1) if user.agent?
    ticket.update_attribute(:status, 0) if user.customer? &&
                                           !content.include?('Marked as done.')
  end

  def revert_ticket_status
    ticket.update_attribute(:status, 0) if user.agent?
  end

  def self.search(query)
    where('content LIKE :search', search: "%#{query}%")
  end
end
