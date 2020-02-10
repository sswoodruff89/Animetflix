Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:create]

    resources :programs, only: [:index, :show] do
      resources :watchlists, only: [:create, :destroy]
      resources :likes, only: [:create, :destroy]

      collection do
        get 'search'
        get 'watchlist'
      end
    end

    resources :genres, only: :index do
      # resources :programs, only: :index
    end
 
    resources :profiles, only: [:index, :show, :create, :update, :destroy]

    resources :watchlists, only: [:index, :destroy] do
      resources :programs, only: :index;
    end
 
    
  end
end
