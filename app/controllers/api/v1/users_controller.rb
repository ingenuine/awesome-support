# frozen_string_literal: true

# Users Api
class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i(show update destroy)

  def index
    @users = User.order(created_at: :desc).search(params[:query])
  end

  def show; end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show, status: :created
    else
      render_errors(@user)
    end
  end

  def update
    if @user.update(user_params)
      render :show
    else
      render_errors(@user)
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :role, :password, :password_confirmation)
  end
end
