Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:create]

    resources :movies, only: [:index, :show] do
      resources :watchlists, only: [:create, :destroy]
    end

    resources :genres, only: :index do
      resources :movies, only: :index
    end

    resources :watchlists, only: [:index, :destroy] do
      resources :movies, only: :index;
    end
    
  end
end
