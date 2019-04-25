class UsersController < ApiController
  before_action :require_login
  def index
    # # user = require_login
    # user = authenticate_token
    # # render json: {t: user}
    # # scenario: if user is admin, return all user who not admin
    # if user.is_admin
    #   staffs = User.getStaffs(params[:keyword], params[:page], params[:staffsPerPage])
    #   render json: {staffs: staffs}
    # else
    #   render_unauthorized("Pls login by admin account")
    # end
  end

  def update
    user = require_login
    if user.authenticate(params[:current_password])
      if params[:new_password] != params[:password_confirmation]
        render json: {status: 'ERROR', message: 'Password has not been changed', data: 'Password confirmation is wrong'}
        return
      end
      # ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$
      check = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/.match(params[:new_password])
      if check == nil
        render json: {status: 'ERROR', message: 'Password has not been changed', data: 'Password has 6 characters at least, include 1 letter at least'}
      else
        user.update_attributes password: params[:new_password]
        render json: {status: 'SUCCESS', message: 'Password has changed'}, status: :ok
      end
    else
      render json: {status: 'ERROR', message: 'Password has not been changed', data: 'Wrong current password!'}
    end

    
  end
end