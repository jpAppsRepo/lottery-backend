Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  resources :lotteries
  resources :items
  resources :items_imports, only: [:new, :create]
  resources :archives, only: [:index, :new, :create, :destroy]

  namespace :api do
    namespace :v1 do
      get 'lotteries/:phone_number', to: 'api#lotteries_by_phone_number', :as => 'lotteries_by_phone_number'
    end
  end

  get 'dataset', to: 'pages#get_dataset'
  post 'dataset', to: 'pages#post_dataset'
  put 'dataset', to: 'pages#put_dataset'
  delete 'dataset', to: 'pages#remove_dataset'

  get 'pages', to: 'pages#home', :as => 'pages'
end
