Rails.application.routes.draw do
  root to: "home#root"
  get 'landing',  to: "home#landing", as: :landing

  devise_for :users, controllers: { sessions: "users/sessions" }
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, defaults: { format: :json } do
    resources :events, except: [:new, :edit]
    resources :media_modules, except: [:new, :edit]
  end
end
