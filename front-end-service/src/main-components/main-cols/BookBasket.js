import React, { Component } from 'react'
import Book from '../objects/Book'
import axios from 'axios'
import Auth from './../../modules/Auth'
import BorrowingBooks from '../objects/Student.BorrowingBooks'

/**this class to create Book Basket component */
export default class BookBasket extends Component {

  printAlertMessage = (errs) => {
    let message = ""
    for (let x in errs) {
      message += x + ": " + errs[x].join(", ") + '\n'
    }
    alert(message)
  }

  createTicketRequest = async () => {
    const {chosenStudent, chosenBooks} = this.props.bookBasket
    if(!chosenStudent.id){
      alert("* Pls Choose A Student!")
    } else if (!chosenBooks.length) {
      alert("* Pls Choose Any Book!")
    } else {
      //do sth here
      await axios({
        url: Auth.getUrl() + "/tickets",
        method: "post",
        data: {
          student_id: chosenStudent.id,
          books: chosenBooks
        },
        headers: {
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`
        }
      }).then(res => {
        if(res.data.status === 'SUCCESS'){
          //clear basket
          this.props.onClearBasket()
          this.props.onRemoveStudent()
          alert("Created ticket Id: " + res.data.data.ticket.id)
        }
      }).catch( errs => console.log(errs))
    }
  }

  /**clear student UI */
  ClearStudentIcon = () => {
    return (
      <i 
        className="fa fa-trash fa-fw" 
        onClick={this.props.onRemoveStudent}
      />
    )
  }
  /**clear all books in basket UI */
  ClearBasketIcon = () => {
    return (
      <i 
        className="fa fa-trash-o fa-lg" 
        title="Clear All Book?"
        onClick={this.props.onClearBasket}
      />  
    )
  }
  /**Student UI */
  Student = () => {
    const chosenStudent = this.props.bookBasket.chosenStudent
    let clearStudentIcon = <span></span>
    let avatarComponent = <span></span>
    if(chosenStudent.id){
      clearStudentIcon = this.ClearStudentIcon()
      const avatarLink = "/uploads/student/avatar/" + chosenStudent.id + "/" + chosenStudent.avatar
      avatarComponent = (
        <div className="avatar-manager">
          <div 
            className="avatar avatar-more" 
            style={{backgroundImage: "url("+avatarLink+")", margin: "auto"}}
            >
          </div>
        </div>
      )
    } 
    
    return (
      <div id="book-basket" className="user" style={{marginBottom: "6px", display: "flex", flexDirection: "column"}}>
        <div id="student-name" style={{fontWeight: "bold", fontSize: "30px"}}>
          {chosenStudent.name ? chosenStudent.name : "No Student"}
        </div>
        <div>        
          <span id="student-email">
            {`ID: ${chosenStudent.id}`} &nbsp;- &nbsp;
            {chosenStudent.email}
          </span> 
          {clearStudentIcon}
          {avatarComponent}
        </div>
        
        {chosenStudent.id? <BorrowingBooks studentId={chosenStudent.id} /> : <div></div>}
      </div>
    )
  }
  /**book in basket UI */
  Books = () => {
    return (
      <div id="books">            
      { this.props.bookBasket.chosenBooks.map( item => {
          return <Book
                  inBookBasket={true}
                  key={item.id} 
                  book={item}
                  onRemoveBookInBasket={this.props.onRemoveBookInBasket}
                />
      })}     
      </div>
    )
  }

  /**
   * 
   */
  render() {    
    return (
      <div>
        <h1 className="page-title">Book Basket&nbsp;
          {this.props.bookBasket.chosenBooks.length ? this.ClearBasketIcon() : <span></span>}
        </h1>
        <div>{this.Student()}</div>
        <div>{this.Books()}</div>
        <div style={{textAlign: "center"}}>
          <button className="button_1" onClick={this.createTicketRequest}>Create Ticket</button>
        </div>
      </div> 
    )
  }
}
