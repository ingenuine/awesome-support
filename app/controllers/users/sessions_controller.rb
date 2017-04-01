# frozen_string_literal: true
class Users::SessionsController < Devise::SessionsController

  def create
    super
    flash.delete(:notice)
    flash.delete(:error)
  end

  def destroy
    super
    flash.delete(:notice)
  end
end
