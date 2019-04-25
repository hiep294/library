class DuedaysController < ApiController
  before_action :require_login
  def update
    bookType = DueDay.find(params[:id])
    check = bookType.update_attributes due_days: params[:due_days]
    if check == true
      render json: {status: 'SUCCESS', message: 'Saved'}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Not saved'}, status: :unprocessable_entity
    end
  end
end
