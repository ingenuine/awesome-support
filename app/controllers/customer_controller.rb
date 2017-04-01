# frozen_string_literal: true
class CustomerController < ApplicationController
  layout "react"
  def show
    redirect_to root_path unless current_user.customer?
  end
end
