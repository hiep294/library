#black_books: returned books
#green_books: borrowing books and NOT overdue
#red_books: borrowing books but OVERDUE

#black_students: students who have returned that book
#green_books: students who have been borrowing that book and NOT overdue
#red_books: students who have been borrowing that book but OVERDUE

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

  def self.get_top_objects sql, start_date, end_date, limit_number, present1, present2, start_date2, end_date2
    sql = sanitize_sql([sql, start_date, end_date,limit_number, present1, present2, start_date2, end_date2])
    conn = Report.connection
    res = conn.exec_query(sql)
    conn.close
    return res
  end

  def self.get_top_students present ,start_date, end_date, limit_number
    #find top scores
    #join to main table
    #join to students
    limit_number = limit_number.to_i
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
         sum(`return_date` is not null) as 'total_of_black_books', 
         sum(`return_date` is null AND `due_date` < ?) as 'total_of_red_books',
         sum(`return_date` is null AND `due_date` >= ?) as 'total_of_green_books',
         `student_id`
    FROM `ticket_details` 
    WHERE `created_at` 
    between ? and ?
    GROUP BY `student_id`) d
    ON c.`total_of_borrowed_books` = d.`total_of_borrowed_books`) b
    INNER JOIN `students` as a
    ON a.`id`=b.`student_id`"
    res = Report.get_top_objects(sql, start_date, end_date,limit_number, present, present, start_date, end_date)
    return res
  end

  def self.get_top_books present ,start_date, end_date, limit_number
    #find top scores
    #join to main table
    #join to books
    limit_number = limit_number.to_i
    sql = "SELECT b.*, a.`id`, a.`title`, a.`authors`, a.`available_quantity`, a.`is_text_book`, a.`book_image`, a.`location`
    FROM
    `books` as a
    JOIN
    (SELECT d.* FROM
    (SELECT DISTINCT count(student_id) as 'total_of_students'
    FROM `ticket_details` 
    WHERE `created_at` 
    between ? and ?
    GROUP BY `book_id`
    ORDER BY `total_of_students` DESC
    LIMIT 0,?) as c
    JOIN
    (SELECT count(student_id) as 'total_of_students',
     sum(`return_date` is not null) as 'total_of_black_students',
     sum(`return_date` is null and `due_date` < ?) as 'total_of_red_students',
     sum(`return_date` is null and `due_date` >= ?) as 'total_of_green_students',
     `book_id`
    FROM `ticket_details`
    WHERE `created_at` 
    between ? and ?
    GROUP BY `book_id`) as d
    ON c.`total_of_students`=d.`total_of_students`) b
    ON a.`id` = b.`book_id`
    ORDER BY `total_of_students` DESC"
    res = Report.get_top_objects(sql, start_date, end_date, limit_number, present, present, start_date, end_date)
    return res
  end
end
