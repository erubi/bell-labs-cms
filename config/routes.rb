Rails.application.routes.draw do
  root to: "home#root"
  get 'landing',  to: "home#landing", as: :landing

  devise_for :users, controllers: { sessions: "users/sessions" }

  namespace :api, defaults: { format: :json } do
    resources :events, except: [:new, :edit]
  end
end
