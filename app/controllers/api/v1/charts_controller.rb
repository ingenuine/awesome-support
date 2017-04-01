# frozen_string_literal: true
class Api::V1::ChartsController < ApplicationController

  def last_month_closed_tickets
    render json: Ticket.closed.group_by_day(:created_at, range: 1.month.ago.midnight..Time.now).count
  end

  def last_month_closed_tickets_for_user
    user = User.find(params[:user_id])
    render json: user.tickets.closed.group_by_day(:created_at, range: 1.month.ago.midnight..Time.now).count
  end
end
