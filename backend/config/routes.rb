Rails.application.routes.draw do
  devise_for :users
  resources :albums do 
    resources :songs
  end
  root to: "home#index"
  get '/songs' => 'songs#index'
  get '/genres' => 'genres#index'
  post '/signup' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logged_in' => 'sessions#logged_in'
  get '/logout' => 'sessions#destroy'
  resources :artists

  devise_for :users,
            path: ' ',
            path_names: {
              sign_in: 'login',
              sign_out: 'logout',
              registration: 'signup'
            },
            controllers: {
              sessions: 'sessions',
              registrations: 'registrations'
            }
end
