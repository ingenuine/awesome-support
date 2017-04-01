# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  # Initialize the test data

  let!(:customer) { create(:customer) }
  let!(:users) { create_list(:user, 10) }
  let(:user_id) { users.first.id }

  # Authenticate
  before { sign_in customer }

  # Test suite for GET /users
  describe 'GET /users' do
    before { get '/api/v1/users' }

    it 'returns users' do
      expect(json).not_to be_empty
      expect(json['users'].size).to eq(11)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /users/:id
  describe 'GET /users/:id' do
    before { get "/api/v1/users/#{user_id}" }

    context 'when the record exists' do
      it 'returns the user' do
        expect(json).not_to be_empty
        expect(json['user']['id']).to eq(user_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:user_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  # Test suite for POST /users
  describe 'POST /users' do
    let(:valid_attributes) do
      { user: { name: 'John Doe', email: 'user@example.com',
                password: 'password', password_confirmation: 'password' } }
    end

    context 'when the request is valid' do
      before { post '/api/v1/users', params: valid_attributes }

      it 'creates a user' do
        expect(json['user']['name']).to eq('John Doe')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/users', params: { user: { name: 'Foo Bar' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['errors']['email'].first)
          .to match(/can't be blank/)
      end
    end
  end

  # Test suite for PUT /users/:id
  describe 'PUT /users/:id' do
    let(:valid_attributes) do
      { user: { name: 'Jolly Name', email: 'name@example.com' } }
    end

    context 'when the record exists' do
      before { put "/api/v1/users/#{user_id}", params: valid_attributes }

      it 'updates the record' do
        expect(json['user']['name']).to match(/Jolly Name/)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Test suite for DELETE /users/:id
  describe 'DELETE /users/:id' do
    before { delete "/api/v1/users/#{user_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
