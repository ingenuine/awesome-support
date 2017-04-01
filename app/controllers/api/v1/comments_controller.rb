# frozen_string_literal: true

# Comments
class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i(show update destroy)

  def index
    @comments = Comment.order(created_at: :desc).search(params[:query])
  end

  def show
    @comment
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show, status: :created
    else
      render_errors(@comment)
    end
  end

  def update
    if @comment.update(comment_params)
      render :show
    else
      render_errors(@comment)
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_author
    current_user.admin? ? @comment.user_id : current_user.id
  end

  def comment_params
    params.require(:comment).permit(:content, :ticket_id)
          .merge(user_id: set_author)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
