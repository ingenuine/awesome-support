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

require 'rails_helper'

RSpec.describe Ticket, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:comments).dependent(:destroy) }

  it { should respond_to :title }
  it { should validate_presence_of :title }
  it { should respond_to :description }
  it { should validate_presence_of :description }
  it { should respond_to :status }
end
