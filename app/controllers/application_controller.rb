# frozen_string_literal: true

# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def render_errors(record)
    render json: { errors: record.errors.messages },
           status: :unprocessable_entity
  end
end
