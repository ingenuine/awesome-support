# frozen_string_literal: true

json.comments(@comments) do |comment|
  json.id comment.id
  json.content comment.content
  json.created_at time_ago_in_words(comment.created_at)
  json.author comment.user.name
end
