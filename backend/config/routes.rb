Rails.application.routes.draw do
  resources :property_images, except: [:new, :edit]
  resources :properties, except: [:new, :edit]

  post '/properties/create' => 'properties#create'

end
