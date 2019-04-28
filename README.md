## Demo
https://youtu.be/zAin4nqD7_4

## Scenario
Open university would like to have library website. 
1. Student: can view and search books, view books in detail, view number of quantity
2. Librarian: can manage books, students (creating, updating, reading, and deleting); create and update ticket when students borrow books and return books; manage fine and report each month

## Product specification
1. The app is responsive in mobile and desktop devices.
2. When list objects(book, student), there needs to make paginations
3. Book and student infomation include image
4. In book management, each book should need the due days. due days means the number of days which the student has to return book.
5. The app supports creating and updating tickets. When the student borrows book, there needs to minus 1 of book quantity. When the student returns book, if the book is still good, plus 1 of this book quantity; if the book is not good, this book quantity will not change.
6. In policy of library, each student can hold a limit of books, so there needs to define how many books which the students has been borrowing, also has been borrowing but over due date.

## Technologies

* Back end service applies MySQL as Database Management System, Ruby On Rails as Application Programming Interface

* Front end service applies ReactJS.

## System Requirements:

* Ruby version: 2.5.3

* Rails version: 5.2.3

* NodeJS: 8.15.1 or more

* MySQL: 14.4

* Browser: Google Chrome

## Installation

### Download gems
In folder 'back_end_service', run this command:
```
bundle install
```

### Download node modules
In folder 'front_end_service', run this command:
```
npm install
```
## Configuration
### Set up database
In back_end_service>config>database.yml, config the database.
There should use MySQL because this app uses RAW sql queries of MySQL. Then run the following commands in main folder: 
```
rails db:create
rails db:migrate
```

### Create a user, due days
In folder 'back_end_service', run commands:
```
rails c
User.create(email: 'youremail@gmail.com', password: 'yourpassword')
DueDay.create(type_of_book: "Reference Book", due_days: 14)
DueDay.create(type_of_book: "Text Book", due_days: 62)
Fee.create(type_of_book: "Reference Book", fee_per_day:2000)
Fee.create(type_of_book: "Text Book", fee_per_day:1000)
```
In this table, due day is set in default, each book can set its own due days
## Start App in development mode
1. Start Database Management System (MySQL)
2. Start Rails API. In folder 'back_end_service', run this command:
```
rails s
```
3. Start front-end service (ReactJS). In folder 'front_end_service', run this command:
```
npm start
```

