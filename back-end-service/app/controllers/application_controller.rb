class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  #has method: authenticate_with_http_token
end
