class StudentsController < ApiController
  before_action :require_login
  def index
    students = Student.searchManyFields(params[:keyword], params[:page], params[:studentsPerPage])
    res = {
      "students": students,
      "total": Student.getTotalResults()
    }
    render json: {status: 'SUCCESS', message: 'Loaded students', data: res}, status: :ok
  end

  def show
    begin
      #check student
      student = Student.find(params[:id]) # if not, will be caught
      #response is a list of books which has been borrowing
      ticket_details = Student.booksWhichHaveBeenBorrowingBy(student[:id])
      response = {
        "student": student,
        "borrowing_books": ticket_details
      }
      render json: {status: 'SUCCESS', message: 'Loaded books which have been borrowing', data: response}
      
    rescue Exception => e
      res = {
        Notification: [e.message]
      }
      render json: {status: 'ERROR', message: 'Can not response', data: res}
    end
    #check student
    #response: how many book which the student is borrowing
          #how many book which the student over due of returning
  end

  #global variable for get error
  def create
    student = Student.new(student_params)
    if student.save
      render json: {status: 'SUCCESS', message: 'Created student', data: student}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Student not saved', data: student.errors}
    end
  end

  def update
    student = Student.find(params[:id])
    if student.update(student_params)
      render json: {status: 'SUCCESS', message: 'Updated student', data: student}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Student not updated', data: student.errors}
    end
  end

  def destroy
    begin
      student = Student.find(params[:id])
      if student.destroy
        render json: {status: 'SUCCESS', message: 'Deleted student', data: student}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Student not deleted', data: student.error}
      end
    rescue Exception => e
      res = {
        Notification: [e.message]
      }
      render json: {status: 'ERROR', message: 'Student no deleted', data: res}
    end
  end

  private
    def student_params
      params.require(:student).permit(:email, :name, :avatar)
    end
end
