class Ticket < ApplicationRecord
  belongs_to :student
  has_many :ticket_details
  has_many :books, :through => :ticket_details

  @@sql = '' #source: book model

  def self.getAll page, ticketsPerPage, startDate, endDate, keyword
    firstTicketInPage = (page.to_i - 1) * ticketsPerPage.to_i
    
    sql = "SELECT a.*,b.`name`,b.`email` 
          FROM (SELECT `tickets`.`id`, `tickets`.`student_id`, `tickets`.`created_at` 
            FROM `tickets` 
            WHERE (created_at >= ? AND CREATED_AT <= ?)) as a 
          INNER JOIN students as b 
          ON b.`id`=a.`student_id` 
          ORDER BY `id` DESC
          LIMIT " + firstTicketInPage.to_s + ", " + ticketsPerPage.to_s
    sql = sanitize_sql([sql, startDate, endDate])
    

    if keyword != nil
      keyword = keyword.strip
      if keyword != ''
        sql = "SELECT a.*,b.`name`,b.`email` 
              FROM (SELECT `tickets`.`id`, `tickets`.`student_id`, `tickets`.`created_at` 
                FROM `tickets` 
                WHERE (created_at >= ? AND CREATED_AT <= ?)) as a 
              INNER JOIN 
                (SELECT `students`.*
                  FROM `students`
                  WHERE `email` like ?
                UNION
                  SELECT `students`.*
                  FROM `students`
                  WHERE `name` like ?) as b 
              ON b.`id`=a.`student_id` 
              ORDER BY `id` DESC
              LIMIT " + firstTicketInPage.to_s + ", " + ticketsPerPage.to_s
        sql = sanitize_sql([sql, startDate, endDate, "%"+keyword+"%", "%"+keyword+"%"])
      end
    end
    conn = Ticket.connection
    res = conn.exec_query(sql)
    conn.close

    sql.slice! "LIMIT " + firstTicketInPage.to_s + ", " + ticketsPerPage.to_s
    @@sql = "SELECT count(*) as `total` FROM (" + sql + ") as s"
    return res
  end

  def self.getTotalResults
    conn = Ticket.connection
    res = HashWithIndifferentAccess.new(conn.exec_query(@@sql)[0])[:total]
    conn.close
    return res
  end
end
