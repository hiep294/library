class ReportController < ApiController
  before_action :require_login
  def total_of_students
    total_of_students = Report.get_total_of_students(params[:start_date], params[:end_date])
    render json: {status: 'SUCCESS', message: 'Loaded total of students', data: total_of_students}
  end

  def total_of_tickets
    total_of_tickets = Report.get_total_of_tickets(params[:start_date], params[:end_date])
    render json: {status: 'SUCCESS', message: 'Loaded total of tickets', data: total_of_tickets}
  end

  def total_of_books
    total_of_books = Report.get_total_of_books(params[:start_date], params[:end_date])
    render json: {status: 'SUCCESS', message: 'Loaded total of books', data: total_of_books}
  end

  def top_students
    top_students = Report.get_top_students(params[:present], params[:start_date], params[:end_date], params[:limit_number])
    render json: {status: 'SUCCESS', message: 'Loaded top students', data: top_students}
  end

end