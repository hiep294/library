Rails.application.routes.draw do
  get 'fees/update'
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

  get "/report/total-of-students" => "report#total_of_students"
  get "/report/total-of-tickets" => "report#total_of_tickets"
  get "/report/total-of-books" => "report#total_of_books"
  get "/report/top-students" => "report#top_students"
  get "/report/top-books" => "report#top_books"

  resources :fees, only: [:update]
end
