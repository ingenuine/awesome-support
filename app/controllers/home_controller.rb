# frozen_string_literal: true
class HomeController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    redirect_to customer_path if user_signed_in? && current_user.customer?
    redirect_to agent_path if user_signed_in? && current_user.agent?
    redirect_to admin_path if user_signed_in? && current_user.admin?
  end
end
