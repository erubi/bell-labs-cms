Rails.application.routes.draw do
  root to: "home#root"
  get 'landing',  to: "home#landing", as: :landing

  devise_for :users, controllers: { sessions: "users/sessions" }

  namespace :users do
    get 'manage_users', to: 'management#show'
    post 'manage_users', to: 'management#create'
    delete 'manage_users', to: 'management#destroy'
  end

  # scope '/admin', controller: :management do
  #   resources :users
  # end

  namespace :api, defaults: { format: :json } do
    get 'scene_weight', to: 'media_modules#scene_weight'
    get 'scene_override', to: 'media_modules#scene_override'
    post 'set_active_scene/:id', to: 'media_modules#set_active_scene'
    put 'upload_media', to: 'media_modules#upload_media'
    get 'get_media/:scene_name', to: 'media_modules#get_media'
    get 'get_metadata/:scene_name', to: 'media_modules#get_metadata'

    get 'calendar', to: 'events#calendar'

    get 'config_model', to: 'config_model#show'
    post 'config_model', to: 'config_model#update'

    resources :events, except: [:new, :edit]
    resources :media_modules, except: [:new, :edit]
    resources :media_items, only: [:destroy, :show, :update, :index]
  end
end
