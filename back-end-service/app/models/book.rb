class Book < ApplicationRecord
  has_many :ticket_details
  has_many :ticket, :through => :ticket_details

  mount_uploader :book_image, BookImageUploader

  validates :title, presence: true, length: { minimum: 6 }
  validates :available_quantity, presence: true, numericality: { only_integer: true , greater_than_or_equal_to: 0}


  #static variable
  @@sql = ""

  # search fields: title, tags, review, authors, location
  def self.searchManyFields keyword, page, booksPerPage
    firstBookInPage = (page.to_i - 1) * booksPerPage.to_i
    
    sql = "SELECT `books`.* 
            FROM `books` 
            ORDER BY `id` DESC 
            LIMIT " + firstBookInPage.to_s + ", " + booksPerPage.to_s

    if keyword != nil
      keyword = keyword.strip
      if keyword != ''
        sql = "SELECT DISTINCT `id`, `title`, `authors`, `tags`, `available_quantity`, `is_text_book`, `book_image`, 
        `review`, `created_at`, `location`, `call_number`, `publisher`, `year_of_publication`, `due_days` FROM (SELECT 1 as rank, `books`.* 
              FROM `books`
              WHERE `title` like ?
            UNION
              SELECT 2 as rank, `books`.* 
              FROM `books`
              WHERE `tags` like ?
            UNION
              SELECT 3 as rank, `books`.* 
              FROM `books`
              WHERE `review` like ?
            UNION
              SELECT 4 as rank, `books`.* 
              FROM `books`
              WHERE `authors` like ?
            UNION
              SELECT 5 as rank, `books`.* 
              FROM `books`
              WHERE `location` like ?) a ORDER BY `rank` ASC,`id` DESC LIMIT "  + firstBookInPage.to_s + ", " + booksPerPage.to_s
        sql = sanitize_sql([sql, "%"+keyword+"%", "%"+keyword+"%", "%" + keyword+"%", "%"+keyword+"%", "%"+keyword+"%"])

      end 
    end

    conn = Book.connection
    res = conn.exec_query(sql)    
    conn.close
    # https://blog.lunarcollective.co/writing-sql-in-rails-speed-vs-convenience-e5d8c0ec25d9
    # # https://stackoverflow.com/questions/18285905/activerecord-execute-sql-need-to-close-connection-deprecation-warning-database

    # setting @@sql remove string
    sql.slice! "LIMIT "  + firstBookInPage.to_s + ", " + booksPerPage.to_s
    @@sql= "SELECT COUNT(*) as `total` FROM (" + sql + ") as s"

    return res
  end

  def self.getTotalResults
    conn = Book.connection
    res = HashWithIndifferentAccess.new(conn.exec_query(@@sql)[0])[:total]
    return res
  end
end
