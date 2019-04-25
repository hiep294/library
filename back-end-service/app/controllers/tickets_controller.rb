class TicketsController < ApiController
  before_action :require_login
  
  def index
    tickets = Ticket.getAll(params[:page], params[:ticketsPerPage], params[:start_date], params[:end_date], params[:keyword])
    res = {
      "tickets": tickets,
      "total": Ticket.getTotalResults()
    }
    render json: {status: 'SUCCESS', message: 'Loaded tickets', data: res}
  end

  def show
    #ticket details
    ticketDetails = TicketDetail.findTicketDetailsWithBookInfoByTicket(params[:id])
    ticket = {
      "ticketDetails": ticketDetails
    }
    render json: {status: 'SUCCESS', message: 'Loaded ticket', data: ticket}
  end

  def create
    begin
      # validate student
      student = Student.find(params[:student_id]) 
      # validate books
      params[:books].each do |book|
        currentBook = Book.find(book[:id])
        if currentBook[:available_quantity] < 1
          render json: {status: 'ERROR', message: 'Invalid chosen book', data: 'There is not a book whose ID: ' + book[:id].to_s}
          #note: return here
          return
        end
      end

      # # create ticket
      ticket = Ticket.new(:student_id => params[:student_id])
      if ticket.save 
        due_days_of_reference_book = DueDay.find(1)
        due_days_of_text_book = DueDay.find(2)       

        params[:books].each do |book|
          #decrease available_quantity of book, actually, just get ids in params[:books]
          currentBook = Book.find(book[:id])
          decreaseOne = currentBook[:available_quantity] - 1 
          currentBook.update_attributes available_quantity: decreaseOne
          # set due_date, based on due_days of current book 
          due_days = 0
          if currentBook[:is_text_book]
            due_days = due_days_of_text_book[:due_days]
          else
            due_days = due_days_of_reference_book[:due_days]
          end
          due_date = ticket[:created_at] + due_days * 24 * 3600
          # push book to ticket details
          ticket.ticket_details.create(:book_id => book[:id], :due_date => due_date, :student_id => params[:student_id])
        end
        res = {
          ticket: ticket,
          ticket_details: ticket.ticket_details
        }
        render json: {status: 'SUCCESS', message: 'Created Ticket', data: res}
      else
        render json: {status: 'ERROR', message: 'Ticket is not created', data: "*Pls refresh the page"}
      end

    rescue Exception => e
      render json: {status: 'ERROR', message: 'Ticket is not created', data: e.message}
    end
  end

end