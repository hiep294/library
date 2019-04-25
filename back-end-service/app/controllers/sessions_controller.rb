class SessionsController < ApiController
  #skip require login with :create
  skip_before_action :require_login, only: [:create], raise: false
  
  def create
    if user = User.validate_login(params[:email], params[:password])
      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    # before do this action, the system has checked user
    logout
    head :ok
  end

  private 
    def allow_token_to_be_used_only_once_for(user)
      #re-generate new token in database
      user.regenerate_auth_token
    end

    def send_token_for_valid_login_of(user)
      #send new token for user# is admin just notify for client
      render json: { token: user.auth_token, admin: user.is_admin, name: user.name }
    end

    def logout
      #call method current_user in api, has @current_user, set @current_user invalidate_auth_token
      current_user.invalidate_token
    end

  

end