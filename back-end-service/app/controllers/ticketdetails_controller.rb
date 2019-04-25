class TicketdetailsController < ApiController
  before_action :require_login
  def update
    ticketDetail = TicketDetail.find(params[:id])
    #test route
    if ticketDetail.return_date == nil
      #increase book in lib
      book = Book.find(params[:book_id])
      check = true
      if params[:book_is_good] == "true"
        newQuantity = book.available_quantity + 1
        book.update_attributes available_quantity: newQuantity
      else
        check = false
      end
      #set return date
      ticketDetail.update_attributes return_date: params[:return_date], note: params[:note], is_good: check
      render json: {status: 'SUCCESS', message: 'Returned Book', data: ticketDetail}, status: :ok

      
    else
      #update note
      ticketDetail.update_attributes note: params[:note]
      render json: {status: 'SUCCESS', message: 'Updated note', data: ticketDetail}
    end
  end

  private
    def true?(obj)
      return obj.to_s == "true"
    end
end
