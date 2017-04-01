# frozen_string_literal: true
class AgentController < ApplicationController
  layout "react"
  def show
    redirect_to root_path unless current_user.agent?
  end
end
