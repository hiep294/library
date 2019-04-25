class ProceduresController < ApiController
  before_action :require_login
  def index
    #insert student_id to ticket details id
    books = Book.all
    # two loops \
    
    books.each do |book|
      if book.is_text_book == true
        book.due_days = 62
      else
        book.due_days = 14
      end
      book.save
    end
    render json: {data: books}
    #update when create ticket
  end

end