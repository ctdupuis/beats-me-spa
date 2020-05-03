Rails.application.routes.draw do
  resources :albums do 
    resources :songs
  end

  get '/songs' => 'songs#index'
  get '/genres' => 'genres#index'
  resources :artists
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
