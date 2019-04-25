class Dashboard < ApplicationRecord

  @@sql = ''
  
  #select students who has not been returning book on time, order by due_date ASC
  def self.getStudentsLate keyword, page, studentsPerPage, present
    firstStudentInPage = (page.to_i - 1) * studentsPerPage.to_i
    sql = "SELECT `id`, `email`, `name`, `avatar` 
          FROM (SELECT d.*, c.`due_date` FROM
            (SELECT `student_id`, `due_date` 
            FROM `ticket_details` 
            WHERE (`return_date` IS NULL and due_date < ?)) as c
            INNER JOIN `students` as d
            ON d.`id`=c.`student_id`) as a 
          GROUP BY `id`
          ORDER BY min(`due_date`)" + " LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s
    sql = sanitize_sql([sql, present])
    #find students as Keyword, who has not been returning book on time, order by due_date ASC, 
    if keyword != nil
      keyword = keyword.strip
      if keyword != ''
        sql = "SELECT `id`, `email`, `name`, `avatar` 
              FROM (SELECT d.*, c.`due_date` FROM
                (SELECT `student_id`, `due_date` 
                FROM `ticket_details` 
                WHERE (`return_date` IS NULL and due_date < ?)) as c
                INNER JOIN 
                  (SELECT 1 as rank, `students`.*
                    FROM `students`
                    WHERE `email` like ?
                  UNION
                    SELECT 2 as rank, `students`.*
                    FROM `students`
                    WHERE `name` like ?) as d
                ON d.`id`=c.`student_id`) as a 
              GROUP BY `id`
              ORDER BY min(`due_date`)"  + " LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s     
        sql = sanitize_sql([sql, present, "%"+keyword+"%", "%"+keyword+"%"])
      end
    end
    conn = Dashboard.connection
    res = conn.exec_query(sql)
    conn.close

    sql.slice! "LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s
    @@sql = "SELECT count(*) as `total` FROM (" + sql + ") as s"
    return res

  end

  
  #borrowing include overdue
  def self.getStudentsBorrowing keyword, page, studentsPerPage    
    firstStudentInPage = (page.to_i - 1) * studentsPerPage.to_i

    sql = "SELECT `id`, `email`, `name`, `avatar` 
          FROM (SELECT d.*, c.`due_date` FROM
            (SELECT `student_id`, `due_date` 
            FROM `ticket_details` 
            WHERE (`return_date` IS NULL)) as c
            INNER JOIN `students` as d
            ON d.`id`=c.`student_id`) as a 
          GROUP BY `id`
          ORDER BY min(`due_date`)" + " LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s

    if keyword != nil
      keyword = keyword.strip
      if keyword != ''
        sql = "SELECT `id`, `email`, `name`, `avatar` 
              FROM (SELECT d.*, c.`due_date` FROM
                (SELECT `student_id`, `due_date` 
                FROM `ticket_details` 
                WHERE (`return_date` IS NULL)) as c
                INNER JOIN 
                  (SELECT `students`.*
                    FROM `students`
                    WHERE `email` like ?
                  UNION
                    SELECT `students`.*
                    FROM `students`
                    WHERE `name` like ?) as d
                ON d.`id`=c.`student_id`) as a 
              GROUP BY `id`
              ORDER BY min(`due_date`)" + " LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s 
        sql = sanitize_sql([sql, "%"+keyword+"%", "%"+keyword+"%"])
      end
    end
    conn = Dashboard.connection
    res = conn.exec_query(sql)
    conn.close

    sql.slice! " LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s
    @@sql = "SELECT count(*) as `total` FROM (" + sql + ") as s"
    return res
  end
  #https://weblogs.sqlteam.com/jeffs/2007/12/13/select-distinct-order-by-error/

  def self.getTotalResults
    conn = Dashboard.connection
    res = HashWithIndifferentAccess.new(conn.exec_query(@@sql)[0])[:total]
    conn.close
    return res
  end

end