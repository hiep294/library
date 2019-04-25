class DashboardController < ApiController
  before_action :require_login
  def index
    if(params[:getStudentsLate] == "true")  
      students = Dashboard.getStudentsLate(params[:keyword], params[:page], params[:studentsPerPage], params[:present])
      res = {
        "students": students,
        "total": Dashboard.getTotalResults()
      }   
      render json: {data: res, status: 'SUCCESS', message: 'students who are late'}
      return
    end

    if(params[:getStudentsBorrowing] == "true")    
      students = Dashboard.getStudentsBorrowing(params[:keyword], params[:page], params[:studentsPerPage])  
      res = {
        "students": students,
        "total": Dashboard.getTotalResults()
      }
      render json: {data: res, status: 'SUCCESS', message: 'Loaded students'}
      return
    end
  end
end