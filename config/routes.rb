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
      get 'candidates/:lottery_number', to: 'api#candidates_by_lottery_number', :as => 'candidates_by_lottery_number'
      get 'items', to: 'api#items_all', :as => 'items_all'
      get 'lotteries', to: 'api#lotteries_all', :as => 'lotteries_all'
    end
  end

  get 'dataset', to: 'pages#get_dataset'
  post 'dataset', to: 'pages#post_dataset'
  put 'dataset', to: 'pages#put_dataset'
  delete 'dataset', to: 'pages#remove_dataset'

  get 'pages', to: 'pages#home', :as => 'pages'
  get 'fix_lotteries', to: 'lotteries#fix', :as => 'fix_lotteries'
end
