class Report < ApplicationRecord
  #get_total_of_students
  def self.get_total_of_objects sql, start_date, end_date
    sql = sanitize_sql([sql, start_date, end_date])
    conn = Report.connection
    res = HashWithIndifferentAccess.new(conn.exec_query(sql)[0])[:total]
    conn.close
    return res
  end

  def self.get_total_of_students start_date, end_date
    sql = "SELECT count(*) as `total` 
          FROM 
            (SELECT `student_id` 
            FROM `ticket_details` 
            WHERE `created_at` between ? and ?
            GROUP BY `student_id`            
            ) a"    
    res = Report.get_total_of_objects(sql, start_date, end_date)
    return res
  end

  def self.get_total_of_tickets start_date, end_date
    sql = "SELECT count(*) as `total`
          FROM `tickets`
          WHERE `created_at` between ? and ?"
    res = Report.get_total_of_objects(sql, start_date, end_date)
    return res
  end

  def self.get_total_of_books start_date, end_date
    #number of borrowed books = number of ticket details
    sql = "SELECT count(*) as `total`
          FROM `ticket_details`
          WHERE `created_at` between ? and ?"
    res = Report.get_total_of_objects(sql, start_date, end_date)
    return res
  end

  def self.get_top_students present ,start_date, end_date, limit_number
    #find top scores
    #join to main table
    #join to students
    sql = "SELECT b.*, a.`avatar`, a.`email`, a.`name`
    FROM
    (SELECT d.*
    FROM
    (SELECT DISTINCT count(id) as 'total_of_borrowed_books'
    FROM `ticket_details` 
    WHERE `created_at` 
    between ? and ?
    GROUP BY `student_id`
    ORDER BY `total_of_borrowed_books` DESC
    LIMIT 0,?) c 
    INNER JOIN
    (SELECT count(id) as 'total_of_borrowed_books',
         sum(`return_date` is not null) as 'total_of_returned_books', 
         sum(`return_date` is null AND `due_date` < ?) as 'total_of_overdue_books',
         `student_id`
    FROM `ticket_details` 
    WHERE `created_at` 
    between ? and ?
    GROUP BY `student_id`) d
    ON c.`total_of_borrowed_books` = d.`total_of_borrowed_books`) b
    INNER JOIN `students` as a
    ON a.`id`=b.`student_id`"
    sql = sanitize_sql([sql, start_date, end_date,limit_number.to_i, present, start_date, end_date])
    conn = Report.connection
    res = conn.exec_query(sql)
    conn.close
    return res
  end
end
