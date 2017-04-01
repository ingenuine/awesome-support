# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Comments API', type: :request do
  # Initialize the test data
  let!(:customer) { create(:customer) }
  let!(:ticket) { create(:ticket, user: customer) }
  let!(:comments) { create_list(:comment, 20, ticket: ticket, user: customer) }
  let(:id) { comments.first.id }

  # Authenticate
  before { sign_in customer }

  # Test suite for GET /comments
  describe 'GET /comments' do
    before { get '/api/v1/comments' }

    it 'returns all comments' do
      expect(json).not_to be_empty
      expect(json['comments'].size).to eq(20)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /comments/:id
  describe 'GET /comments/:id' do
    before { get "/api/v1/comments/#{id}" }

    context 'when comment exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the comment' do
        expect(json['comment']['id']).to eq(id)
      end
    end

    context 'when comment does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Comment/)
      end
    end
  end

  # Test suite for POST /comments
  describe 'POST /comments' do
    let(:valid_attributes) do
      { comment: { content: 'Visit Narnia', ticket_id: ticket.id } }
    end

    context 'when request attributes are valid' do
      before do
        post '/api/v1/comments', params: valid_attributes
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post '/api/v1/comments', params: { comment: { content: '' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(json['errors']['content'].first).to match(/can't be blank/)
      end
    end
  end

  # Test suite for PUT /comments/:id
  describe 'PUT /comments/:id' do
    let(:valid_attributes) do
      { comment: { content: 'Mozart', ticket_id: ticket.id } }
    end

    before do
      put "/api/v1/comments/#{id}",
          params: valid_attributes
    end

    context 'when comment exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'updates the comment' do
        expect(json['comment']['content']).to match(/Mozart/)
      end
    end

    context 'when the comment does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Comment/)
      end
    end
  end

  # Test suite for DELETE /comments/:id
  describe 'DELETE /comments/:id' do
    before { delete "/api/v1/comments/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
