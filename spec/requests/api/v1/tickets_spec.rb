# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tickets API', type: :request do
  # Initialize the test data
  let!(:customer) { create(:customer) }
  let!(:tickets) { create_list(:ticket, 10, user: customer) }
  let(:ticket_id) { tickets.first.id }

  # Authenticate
  before { sign_in customer }

  # Test suite for GET /tickets
  describe 'GET /tickets' do
    before { get '/api/v1/tickets' }

    it 'returns tickets' do
      expect(json).not_to be_empty
      expect(json['tickets'].size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /tickets/:id
  describe 'GET /tickets/:id' do
    before { get "/api/v1/tickets/#{ticket_id}" }

    context 'when the record exists' do
      it 'returns the ticket' do
        expect(json).not_to be_empty
        expect(json['ticket']['id']).to eq(ticket_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:ticket_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Ticket/)
      end
    end
  end

  # Test suite for POST /tickets
  describe 'POST /tickets' do
    # valid payload
    let(:valid_attributes) do
      { ticket: { title: 'Learn Elm', description: 'Some description' } }
    end

    context 'when the request is valid' do
      before { post '/api/v1/tickets', params: valid_attributes }

      it 'creates a ticket' do
        expect(json['ticket']['title']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/tickets', params: { ticket: { title: 'Foobar' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['errors']['description'].first)
          .to match(/can't be blank/)
      end
    end
  end

  # Test suite for PUT /tickets/:id
  describe 'PUT /tickets/:id' do
    let(:valid_attributes) do
      { ticket: { title: 'Shopping', description: 'Testing' } }
    end

    context 'when the record exists' do
      before { put "/api/v1/tickets/#{ticket_id}", params: valid_attributes }

      it 'updates the record' do
        expect(json['ticket']['title']).to match(/Shopping/)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for DELETE /tickets/:id
  describe 'DELETE /tickets/:id' do
    before { delete "/api/v1/tickets/#{ticket_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
