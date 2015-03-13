Rails.application.routes.draw do
  root to: "home#root"
  get 'landing',  to: "home#landing", as: :landing

  devise_for :users, controllers: { sessions: "users/sessions" }

  namespace :api, defaults: { format: :json } do
    get 'scene_weight', to: 'media_modules#scene_weight'
    get 'scene_override', to: 'media_modules#scene_override'
    resources :events, except: [:new, :edit]
    resources :media_modules, except: [:new, :edit]
  end
end
