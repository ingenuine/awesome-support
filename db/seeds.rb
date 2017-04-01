# frozen_string_literal: true

require 'faker'

admin = User.create!(
  name: Faker::Name.name,
  email: 'admin@example.com',
  password: 'password',
  password_confirmation: 'password'
)
admin.update role: 2

agent = User.create!(
  name: Faker::Name.name,
  email: 'agent@example.com',
  password: 'password',
  password_confirmation: 'password'
)
agent.update role: 1

customer = User.create!(
  name: Faker::Name.name,
  email: 'customer@example.com',
  password: 'password',
  password_confirmation: 'password'
)
100.times do
  customer.tickets.create!(
    title: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph(15, false, 10),
    created_at: Date.current - rand(0..31),
    updated_at: Date.current - rand(0..31)
  )
end

tickets = Ticket.where(id: Ticket.pluck(:id).sample(30))
tickets.each do |ticket|
  ticket.comments.create!(
    content: Faker::Lorem.paragraph(15, false, 10),
    user_id: agent.id
  )
end

replied_tickets = Ticket.replied.where(id: Ticket.pluck(:id).sample(30))
replied_tickets.each do |ticket|
  ticket.comments.create!(
    content: Faker::Lorem.paragraph(25, true, 5),
    user_id: customer.id
  )
  ticket.update status: 0
end

open_tickets = Ticket.active.where(id: Ticket.pluck(:id).sample(30))
open_tickets.each do |ticket|
  ticket.update status: 2
end
