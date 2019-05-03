class FeedbacksController < ApiController
  def create
    feedback = Feedback.new(feedback_params)
    if feedback.save
      render json: {status: 'SUCCESS', message: 'Created feedback'}
    else
      render json: {status: 'ERROR', message: 'Feedback is not saved', data: feedback.errors}
    end
  end

  private
    def feedback_params
      return params.require(:feedback).permit(:name, :meet_requirement, :usability, :improvement_comment)
    end
end