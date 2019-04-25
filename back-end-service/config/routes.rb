Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "welcome#index"
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"

  resources :users, only: [:index, :create, :update, :destroy]
  resources :books
  resources :students
  resources :tickets, only: [:index, :show, :create]
  resources :ticketdetails

  get "/dashboard" => "dashboard#index"
  get "/procedures" => "procedures#index"

  resources :duedays, only: [:update]

end
