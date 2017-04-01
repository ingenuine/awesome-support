# frozen_string_literal: true

require 'prawn'
# Tickets
class Api::V1::TicketsController < ApplicationController
  before_action :set_ticket, only: %i(show update close destroy)

  def index
    @tickets = Ticket.includes(:user, comments: :user)
                     .order(created_at: :desc).search(params[:query])
  end

  def show
    @ticket
  end

  def create
    @ticket = current_user.tickets.new(ticket_params)
    if @ticket.save
      render :show, status: :created
    else
      render_errors(@ticket)
    end
  end

  def update
    if @ticket.update(ticket_params)
      render :show
    else
      render_errors(@ticket)
    end
  end

  def destroy
    @ticket.destroy
    head :no_content
  end

  def close
    if @ticket.close!
      render :show
    else
      render_errors(@ticket)
    end
  end

  def report
    @tickets = Ticket.closed
                     .includes(:user, comments: :user).order(created_at: :desc)
    render json: @tickets
  end

  def download_pdf
    tickets = Ticket.closed
                    .includes(:user, comments: :user).order(created_at: :desc)
    pdf = ReportPdf.new(tickets)
    send_data pdf.render, filename: 'ticket_report', type: 'application/pdf'
  end

  private

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end

  def ticket_params
    params.require(:ticket).permit(:title, :description, :status)
  end
end
