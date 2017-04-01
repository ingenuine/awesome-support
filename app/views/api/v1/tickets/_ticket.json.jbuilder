# frozen_string_literal: true
json.extract!(ticket, :id, :title, :description, :created_at, :status, :participants)

json.comments ticket.comments do |comment|
  json.id comment.id
  json.content comment.content
  json.created_at comment.created_at
  json.author comment.user.name
end
