# frozen_string_literal: true
class Api::V1::DashboardsController < ApplicationController

  def data
    users = User.all
    tickets = Ticket.all

    @data = {
      customers_count: users.customer.size,
      agents_count:    users.agent.size,
      tickets_count:   tickets.size,
      closed_tickets_count: tickets.closed.size
    }
  end

end
