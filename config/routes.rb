# frozen_string_literal: true

Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  devise_for :users, controllers: {
    sessions: 'users/sessions', registrations: 'users/registrations'
  }, path: 'auth', path_names: {
    sign_in: 'login', sign_out: 'logout', password: 'secret',
    registration: 'register', sign_up: 'cmon_let_me_in'
  }

  root to: 'home#index'

  get 'admin', to: 'admin#show', as: :admin
  get 'agent', to: 'agent#show', as: :agent
  get 'customer', to: 'customer#show', as: :customer

  get 'admin/*path', to: 'admin#show', constraints: { format: 'html' }
  get 'agent/*path', to: 'agent#show', constraints: { format: 'html' }
  get 'customer/*path', to: 'customer#show', constraints: { format: 'html' }

  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :tickets, only: %i(index show create update destroy) do
        get :report, on: :collection
        get :download_pdf, on: :collection
        get :close, on: :member
      end
      resources :comments, only: %i(index show create update destroy)
      resources :users, only: %i(index show create update destroy)
      resources :dashboards do
        get :data, on: :collection
      end
      resources :charts do
        collection do
          get :last_month_closed_tickets
          get :last_month_closed_tickets_for_user
        end
      end
    end
  end
end
