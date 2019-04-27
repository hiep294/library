class BooksController < ApiController
  before_action :require_login, except: [:index]
  def index
    # aBook = Book.new 
    books = Book.searchManyFields(params[:keyword], params[:page], params[:booksPerPage])
    
    total = Book.getTotalResults()
    due_days = DueDay.all
    res = {
      "books": books,
      "total": total,
      "dueDays": due_days
    }

    render json: {status: 'SUCCESS', message: 'Loaded books', data: res}, status: :ok
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: {status: 'SUCCESS', message: 'Created book', data: book}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Book not saved', data: book.errors}
    end
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: {status: 'SUCCESS', message: 'Updated book', data: book}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Book not updated', data: book.errors}
    end
  end

  def destroy
    begin
      book = Book.find(params[:id])
      if book.destroy
        render json: {status: 'SUCCESS', message: 'Deleted book', data: book}, status: :ok
      else
        render json: {status: 'ERROR', message: 'Book not deleted', data: book.errors}
      end

    rescue Exception => e
      res = {
        Notification: [e.message]
      }
      render json: {status: 'ERROR', message: 'Book is not deleted', data: res}
    end
  end

  private
    def book_params
      params.require(:book).permit(:title,:authors,:tags,:available_quantity,:is_text_book,:book_image,:review,:location,:call_number,:publisher,:year_of_publication,:price)
    end

end