class Student < ApplicationRecord
  has_many :tickets

  mount_uploader :avatar, BookImageUploader
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}, uniqueness: { case_sensitive: false }

  @@sql = ''
  # search all if keyword is nil, or search based on fiela email, name
  def self.searchManyFields keyword, page, studentsPerPage
    firstStudentInPage = (page.to_i - 1) * studentsPerPage.to_i
    sql = "select `students`.* from `students` ORDER BY `id` DESC  
          LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s

    if keyword != nil
      keyword = keyword.strip
      if keyword != ''
        sql = "SELECT DISTINCT `id`, `name`, `email`, `avatar` 
            FROM (SELECT 1 as rank, `students`.*
              FROM `students`
              WHERE `email` like ?
            UNION
              SELECT 2 as rank, `students`.*
              FROM `students`
              WHERE `name` like ?) a ORDER BY `rank` ASC, `id` DESC
            LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s
        sql = sanitize_sql([sql, "%"+keyword+"%", "%"+keyword+"%"])
      end
    end
    conn = Student.connection
    res = conn.exec_query(sql)
    conn.close

    sql.slice! "LIMIT " + firstStudentInPage.to_s + ", " + studentsPerPage.to_s
    @@sql = "SELECT count(*) as `total` FROM (" + sql + ") as s"
    return res
  end

  def self.getTotalResults
    conn = Student.connection
    res = HashWithIndifferentAccess.new(conn.exec_query(@@sql)[0])[:total]
    conn.close
    return res
  end

  def self.booksWhichHaveBeenBorrowingBy student_id
    #find ticket detail of student, order by due_date ASC
    sql = "SELECT b.`id` AS `ticket_detail_id`,b.`ticket_id`,b.`book_id`,c.`title` AS 'book_title',b.`created_at`,b.`due_date`,b.`return_date`,b.`is_good`,b.`note` 
          FROM `tickets` AS a
          INNER JOIN `ticket_details` AS b ON 
          a.`student_id`="+student_id.to_s+"     
          AND b.`return_date` IS NULL
          AND a.`id`=b.`ticket_id`
          INNER JOIN `books` AS c 
          ON b.`book_id`=c.`id`
          ORDER BY `due_date` ASC"
    conn = Student.connection
    res = conn.exec_query(sql)
    conn.close
    return res
  end

end
