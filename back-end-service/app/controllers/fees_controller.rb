class FeesController < ApiController
  before_action :require_login
  def update
    the_object = Fee.find(params[:id])
    the_object.update_attributes fee_per_day: params[:updated_value]
    render json: {status: 'SUCCESS', message: 'Update fee'}
  end
end
