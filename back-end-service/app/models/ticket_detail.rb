class TicketDetail < ApplicationRecord
  belongs_to :ticket
  belongs_to :book
 
  def self.findTicketDetailsWithBookInfoByTicket id
    sql = "SELECT a.*, b.`title` as 'book_title' 
          FROM (SELECT * FROM `ticket_details` WHERE `ticket_id`="+id.to_s+") AS a
          INNER JOIN `books` AS b
          ON a.book_id = b.id"
    conn = TicketDetail.connection
    res = conn.exec_query(sql + " ORDER BY `id` DESC")
    conn.close
    return res
  end
end
