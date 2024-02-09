Rails.application.routes.draw do
  get "/api/places", to: "api/places#index"

  get "*path", to: "react#home"
  root "react#home"
end
