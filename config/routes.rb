Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]

  delete "/logout", to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  get "/api/places", to: "api/places#index"
  post "/api/internet_speed", to: "api/internet_speeds#create"

  get "*path", to: "react#home"
  root "react#home"
end
