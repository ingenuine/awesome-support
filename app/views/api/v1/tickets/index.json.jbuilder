# frozen_string_literal: true
json.tickets(@tickets) do |ticket|
  json.partial!(ticket)
end
